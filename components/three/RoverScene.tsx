'use client';
import { useState, useEffect } from 'react';
import { ScrollControls, OrbitControls, Environment } from '@react-three/drei';
import { Rover } from './Rover';

interface RoverSceneProps {
    onLoaded?: () => void;
}

export function RoverScene({ onLoaded }: RoverSceneProps) {
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

            <OrbitControls enableZoom={zoomEnabled} enablePan={false} />

            {/* Pages=2 means the scrollable area is 2x the viewport height. 
          The animation runs through this range. */}
            <ScrollControls pages={2} damping={0.3}>
                <Rover onLoaded={onLoaded} />
            </ScrollControls>
        </>
    );
}
