'use client';
import { Canvas } from '@react-three/fiber';
import { RoverScene } from './RoverScene';
import { Suspense } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

export function RoverCanvas({ onLoaded }: RoverCanvasProps) {
    return (
        <div className="w-full h-screen sticky top-0 hide-inner-scrollbars">
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
                    <RoverScene onLoaded={onLoaded} />
                </Suspense>
            </Canvas>
        </div>
    );
}
