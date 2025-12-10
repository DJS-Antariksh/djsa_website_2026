'use client';
import { useState, useEffect, useRef } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { Rover } from './Rover';
import { useThree } from '@react-three/fiber';

interface RoverSceneProps {
    onLoaded?: () => void;
    mousePosition?: { x: number; y: number };
}

export function RoverScene({ onLoaded, mousePosition }: RoverSceneProps) {
    const [zoomEnabled, setZoomEnabled] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Control' && setZoomEnabled(true);
        const onKeyUp = (e: KeyboardEvent) => e.key === 'Control' && setZoomEnabled(false);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
            />

            {/* Optional: Add environment for better metal reflections */}
            <Environment preset="city" />

            <OrbitControls enableZoom={zoomEnabled} enablePan={false} enableRotate={false} />

            {/* Rover with time-based animation and cursor following */}
            <Rover onLoaded={onLoaded} mousePosition={mousePosition} />
        </>
    );
}
