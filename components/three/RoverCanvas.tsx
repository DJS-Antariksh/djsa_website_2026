'use client';
import { View, PerspectiveCamera } from '@react-three/drei';
import { RoverScene } from './RoverScene';
import { Suspense, useState, useCallback, memo, useEffect, useRef } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

function RoverCanvasComponent({ onLoaded }: RoverCanvasProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-screen sticky top-0"
            onMouseMove={handleMouseMove}
        >
            <View track={containerRef as React.MutableRefObject<HTMLElement>} className="w-full h-full">
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
                    <RoverScene onLoaded={onLoaded} mousePosition={mousePosition} />
                </Suspense>
            </View>
        </div>
    );
}

export const RoverCanvas = memo(RoverCanvasComponent);