'use client';
import { Canvas } from '@react-three/fiber';
import { RoverScene } from './RoverScene';
import { Suspense, useState, useCallback, memo, useEffect, useRef } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

function RoverCanvasComponent({ onLoaded }: RoverCanvasProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    }, []);

    // Pause rendering when hero is scrolled away
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-screen sticky top-0"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                shadows
                dpr={[1, 2]}
                frameloop={isVisible ? "always" : "demand"}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    alpha: true,
                }}
                performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    <RoverScene onLoaded={onLoaded} mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const RoverCanvas = memo(RoverCanvasComponent);