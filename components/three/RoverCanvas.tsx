'use client';
import { Canvas } from '@react-three/fiber';
import { RoverScene } from './RoverScene';
import { Suspense, useState, useCallback } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

export function RoverCanvas({ onLoaded }: RoverCanvasProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Normalize mouse position to -0.5 to 0.5 range
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    }, []);

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
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
            >
                <Suspense fallback={null}>
                    <RoverScene onLoaded={onLoaded} mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}
