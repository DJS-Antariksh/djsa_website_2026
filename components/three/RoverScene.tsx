'use client';
import { useState, useEffect } from 'react';
import { ScrollControls, OrbitControls, Environment } from '@react-three/drei';
import { Rover } from './Rover';

export function RoverScene() {
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
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

            {/* Optional: Add environment for better metal reflections */}
            <Environment preset="city" />

            <OrbitControls enableZoom={zoomEnabled} enablePan={false} />

            {/* Pages=2 means the scrollable area is 2x the viewport height. 
          The animation runs through this range. */}
            <ScrollControls pages={2} damping={0.3}>
                <Rover />
            </ScrollControls>
        </>
    );
}
