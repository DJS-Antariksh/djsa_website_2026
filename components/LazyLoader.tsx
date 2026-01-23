"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoaderProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    unloadOnExit?: boolean;
    placeholder?: ReactNode;
    className?: string;
    minHeight?: string | number;
}

export default function LazyLoader({
    children,
    threshold = 0.05,
    rootMargin = "200px", // Preload 200px before
    unloadOnExit = false,
    placeholder = null,
    className = "",
    minHeight,
}: LazyLoaderProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (unloadOnExit) {
                    setIsVisible(entry.isIntersecting);
                } else {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // Stop observing once loaded (unless we unload on exit)
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, unloadOnExit]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ minHeight: minHeight }}
        >
            {isVisible ? children : placeholder}
        </div>
    );
}
