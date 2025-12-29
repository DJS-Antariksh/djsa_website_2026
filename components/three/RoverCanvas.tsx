'use client';
import { Canvas } from '@react-three/fiber';
import { RoverScene } from './RoverScene';
import { Suspense, useState, useCallback, Component } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

export function RoverCanvas({ onLoaded }: RoverCanvasProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showFallback, setShowFallback] = useState(() => {
        // Synchronous feature-detect for WebGL availability.
        try {
            const canvas = document.createElement('canvas');
            return !(
                canvas.getContext('webgl2') ||
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl')
            );
        } catch (e) {
            return true;
        }
    });

    // Error boundary to catch runtime errors thrown by <Canvas /> when WebGL
    // context creation fails despite the feature-detect.
    class CanvasErrorBoundary extends Component<{
        children: React.ReactNode;
    }, { hasError: boolean }> {
        constructor(props: any) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError() {
            return { hasError: true };
        }

        componentDidCatch(error: any) {
            // eslint-disable-next-line no-console
            console.warn('RoverCanvas: Canvas rendering error, falling back:', error);
            setShowFallback(true);
        }

        render() {
            if (this.state.hasError) return null;
            return this.props.children;
        }
    }

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Normalize mouse position to -0.5 to 0.5 range
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    }, []);

    if (showFallback) {
        // Simple non-webgl fallback to preserve layout if context cannot be created.
        return (
            <div className="w-full h-screen sticky top-0 hide-inner-scrollbars bg-black" aria-hidden>
                {/* Intentionally empty: keeps layout and avoids WebGL initialization */}
            </div>
        );
    }

    return (
        <div
            className="w-full h-screen sticky top-0 hide-inner-scrollbars"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                shadows
                dpr={[1, 1.5]} // Cap pixel ratio for mobile performance
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
            >
                <CanvasErrorBoundary>
                    <Suspense fallback={null}>
                        <RoverScene onLoaded={onLoaded} mousePosition={mousePosition} />
                    </Suspense>
                </CanvasErrorBoundary>
            </Canvas>
        </div>
    );
}
