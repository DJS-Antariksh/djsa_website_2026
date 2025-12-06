'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type InitialTransform = { position: THREE.Vector3; rotation: THREE.Euler };

type RoverProps = JSX.IntrinsicElements['group'] & {
    onLoaded?: () => void;
}

export function Rover({ onLoaded, ...props }: RoverProps) {
    const { scene } = useGLTF('/models/rover-render.glb');
    const scroll = useScroll();
    const initialTransforms = useRef<Record<string, InitialTransform>>({});

    const armNames = [
        'Telemetry_support-1', 'Pakkad-1', 'Telemetry_ka_khamba-1',
        'Mehenga_wala_part-1', 'Khambe_ka_Dost-1', 'Telemetry_support_Btm-1',
        'Khambe_ka_dusra_Dost-1', 'Telemetry_ka_danda-1', 'Pakkad-2'
    ];

    const wheelNames = [
        'wheel_1-1', 'link_leg-1', 'bearing_houdeee-1', '15_BEARING_HOUSE-1',
        'SKF_61811_2RZ_26-8', 'SKF_61811_2RZ_26-1', 'SKF_61811_2RZ_26-2',
        'SKF_61811_2RZ_26-4', 'SKF_61811_2RZ_26-3', 'SKF_61811_2RZ_26-5',
        'SKF_61811_2RZ_26-6', 'SKF_61811_2RZ_26-7'
    ];

    useLayoutEffect(() => {
        // Center the model
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);

        // Capture initial positions and rotations of all relevant nodes
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                initialTransforms.current[child.name] = {
                    position: child.position.clone(),
                    rotation: child.rotation.clone(),
                };
            }
        });

        // Notify parent that model is loaded and prepared
        if (onLoaded) {
            onLoaded();
        }
    }, [scene, onLoaded]);

    useFrame(() => {
        // r is the scroll progress (0 to 1)
        const r = scroll.range(0, 1);

        const chassisOffset = r;
        const wheelsOffset = r;
        const armOffset = r;

        scene.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return;

            const initial = initialTransforms.current[child.name];
            if (!initial) return;

            if (armNames.includes(child.name)) {
                // Arm flies in from top-right (relative to initial)
                child.position.copy(initial.position).add(new THREE.Vector3(2 * armOffset, 2 * armOffset, 0));
                // Optional: Rotation logic if needed, but per snippet we just move it
            } else if (wheelNames.includes(child.name)) {
                // Wheels fly in from sides (expand out)
                const direction = Math.sign(initial.position.x) || 1;
                child.position.copy(initial.position).add(new THREE.Vector3(4 * direction * wheelsOffset, 0, 0));
            } else {
                // Chassis (everything else) falls/moves from top
                child.position.copy(initial.position).add(new THREE.Vector3(0, 4 * chassisOffset, 0));
                child.rotation.y = initial.rotation.y + Math.PI * chassisOffset;
            }
        });
    });

    return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/rover-render.glb');
