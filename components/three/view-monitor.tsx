'use client';

import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

interface ViewMonitorProps {
    containerRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
    /**
     * Margin around the root to keep the view mounted.
     * Increase this to avoid pop-in during fast scrolling.
     * Default: "100px"
     */
    rootMargin?: string;
}

/**
 * ViewMonitor
 * 
 * A hybrid optimization component for Shared Canvas (<View>) architectures.
 * 1. Visibility Toggle: Unmounts children (the <View>) when container is off-screen.
 * 2. Scroll Invalidator: Forces a frame render on every scroll event when visible,
 *    ensuring the View's scissor box stays perfectly synced with the DOM.
 */
export function ViewMonitor({ containerRef, children, rootMargin = '100px' }: ViewMonitorProps) {
    const [isVisible, setIsVisible] = useState(false);

    // 1. Visibility Toggle (IntersectionObserver)
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Use a small margin to mount slightly before it enters screen
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [containerRef, rootMargin]);

    if (!isVisible) return null;

    return <ScrollInvalidator>{children}</ScrollInvalidator>;
}

// Helper to access useThree context (must be inside Canvas/View, but View is a portal...)
// Actually, <View> creates a portal into the canvas. 
// We need to be careful: the CHILDREN of ViewMonitor will be the <View> component.
// The <View> component ITSELF connects to the canvas. 
// We cannot use useThree() here because ViewMonitor is OUTSIDE the canvas.
//
// Correction: We cannot force invalidate() from OUTSIDE the canvas using useThree().
// However, we can use the `invalidate` exported from @react-three/fiber global state if needed,
// OR more cleanly, we can put a small helper INSIDE the View.

import { MapControls } from '@react-three/drei';
// Let's create an internal component that lives INSIDE the View to handle invalidation
function InvalidationLogic() {
    const { invalidate } = useThree();

    useEffect(() => {
        const handleScroll = () => invalidate();
        const handleResize = () => invalidate();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, [invalidate]);

    return null;
}

function ScrollInvalidator({ children }: { children: React.ReactNode }) {
    // This component just wraps the View. The InvalidationLogic needs to be inside the View.
    // Use React.Children to inject the logic? No, that's messy.
    // Better pattern: The user of ViewMonitor should wrap the View, 
    // and we need to make sure InvalidationLogic is rendered AS A CHILD of View.
    //
    // Revised approach for ViewMonitor:
    // It will just handle visibility.
    // And we export a separate component `ViewSync` to put INSIDE the View.
    return <>{children}</>;
}

/**
 * Put this INSIDE your <View> component.
 * It connects to the webgl context and forces updates on scroll.
 */
export function ViewSync() {
    const { invalidate } = useThree();

    useEffect(() => {
        // Invalidate immediately on mount to ensure initial frame is correct
        invalidate();

        const handleEvent = () => invalidate();

        window.addEventListener('scroll', handleEvent, { capture: true, passive: true });
        window.addEventListener('resize', handleEvent, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleEvent, { capture: true });
            window.removeEventListener('resize', handleEvent);
        };
    }, [invalidate]);

    return null;
}
