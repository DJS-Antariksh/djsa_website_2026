'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

type InitialTransform = { position: THREE.Vector3; rotation: THREE.Euler };

type RoverProps = ThreeElements['group'] & {
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

    const wheelsRef = useRef<THREE.Mesh[]>([]);
    const armsRef = useRef<THREE.Mesh[]>([]);
    const chassisRef = useRef<THREE.Mesh[]>([]);

    useLayoutEffect(() => {
        // Center the model
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);

        // Reset refs
        wheelsRef.current = [];
        armsRef.current = [];
        chassisRef.current = [];
        initialTransforms.current = {};

        // OPTIMIZATION: Traverse once to categorize meshes and store initial transforms
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                // Cache transform
                initialTransforms.current[child.name] = {
                    position: child.position.clone(),
                    rotation: child.rotation.clone(),
                };

                // Categorize
                if (armNames.includes(child.name)) {
                    armsRef.current.push(child as THREE.Mesh);
                } else if (wheelNames.includes(child.name)) {
                    wheelsRef.current.push(child as THREE.Mesh);
                } else {
                    chassisRef.current.push(child as THREE.Mesh);
                }
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

        // Early exit if r is 0 (optional optimization, but good for static state)
        // However, we want to ensure it snaps back if user scrolls up.

        const chassisOffset = r;
        const wheelsOffset = r;
        const armOffset = r;

        // OPTIMIZATION: Iterate over cached arrays instead of full scene traversal

        // 1. Update Arms
        for (let i = 0; i < armsRef.current.length; i++) {
            const child = armsRef.current[i];
            const initial = initialTransforms.current[child.name];
            if (initial) {
                child.position.copy(initial.position).add(new THREE.Vector3(2 * armOffset, 2 * armOffset, 0));
            }
        }

        // 2. Update Wheels
        for (let i = 0; i < wheelsRef.current.length; i++) {
            const child = wheelsRef.current[i];
            const initial = initialTransforms.current[child.name];
            if (initial) {
                const direction = Math.sign(initial.position.x) || 1;
                child.position.copy(initial.position).add(new THREE.Vector3(4 * direction * wheelsOffset, 0, 0));
            }
        }

        // 3. Update Chassis
        for (let i = 0; i < chassisRef.current.length; i++) {
            const child = chassisRef.current[i];
            const initial = initialTransforms.current[child.name];
            if (initial) {
                child.position.copy(initial.position).add(new THREE.Vector3(0, 4 * chassisOffset, 0));
                child.rotation.y = initial.rotation.y + Math.PI * chassisOffset;
            }
        }
    });

    return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/rover-render.glb');
