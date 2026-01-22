'use client';
import React, { useLayoutEffect, useEffect, useRef, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeElements, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type InitialTransform = { position: THREE.Vector3; rotation: THREE.Euler };

type RoverProps = ThreeElements['group'] & {
    onLoaded?: () => void;
    mousePosition?: { x: number; y: number };
    isMobile?: boolean;
    hasInteracted?: boolean; // New prop
}

export function Rover({ onLoaded, mousePosition, isMobile, hasInteracted, ...props }: RoverProps) {
    const { scene } = useGLTF('/models/avyaan_draco.glb');
    const groupRef = useRef<THREE.Group>(null);

    // Store original transforms for each mesh
    const initialTransforms = useRef<Record<string, InitialTransform>>({});
    const explosionOffsets = useRef<Record<string, THREE.Vector3>>({});
    const allMeshesRef = useRef<THREE.Mesh[]>([]);

    // Animation state
    const [phase, setPhase] = useState<'loading' | 'exploded' | 'assembling' | 'complete'>('loading');
    const animationStartTime = useRef<number | null>(null);
    const hasInitialized = useRef(false);

    // Configuration
    const EXPLOSION_DISTANCE = 4;
    const ANIMATION_DURATION = 4;

    // Clone the scene to avoid conflicts - use useMemo to prevent re-cloning on every render
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        return clone;
    }, [scene]);

    useLayoutEffect(() => {
        // Prevent double initialization in strict mode
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        // Rotate to face the screen (-90 degrees) first
        // This ensures the bounding box and center are calculated for the final orientation
        clonedScene.rotation.y = -Math.PI / 2;

        // Center the cloned scene at origin
        const box = new THREE.Box3().setFromObject(clonedScene);
        const center = box.getCenter(new THREE.Vector3());
        clonedScene.position.sub(center);

        // Reset refs
        allMeshesRef.current = [];
        initialTransforms.current = {};
        explosionOffsets.current = {};

        // Traverse and cache all mesh transforms
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                allMeshesRef.current.push(mesh);

                // Store original assembled position
                initialTransforms.current[mesh.uuid] = {
                    position: mesh.position.clone(),
                    rotation: mesh.rotation.clone(),
                };

                // Calculate explosion offset direction
                const worldPos = new THREE.Vector3();
                mesh.getWorldPosition(worldPos);

                // Use the mesh's local position relative to the centered scene
                // to determine direction (this gives us more varied directions)
                let direction = mesh.position.clone().normalize();

                // Add significant variation using the mesh uuid as seed
                // This ensures parts scatter in all directions (left, right, up, down, front, back)
                const seed = mesh.uuid.charCodeAt(0) + mesh.uuid.charCodeAt(1);
                const randomFactor = 0.8; // Increased for more directional variety

                direction.x += Math.sin(seed) * randomFactor;
                direction.y += Math.cos(seed * 2) * randomFactor;
                direction.z += Math.sin(seed * 3) * randomFactor;
                direction.normalize();

                // Fallback if direction is too small - assign random directions
                if (direction.length() < 0.1) {
                    direction = new THREE.Vector3(
                        (Math.sin(seed) * 2 - 1),       // -1 to 1 range
                        (Math.cos(seed) * 2 - 1),       // -1 to 1 range
                        (Math.sin(seed * 2) * 2 - 1)    // -1 to 1 range
                    ).normalize();
                }

                explosionOffsets.current[mesh.uuid] = direction.multiplyScalar(EXPLOSION_DISTANCE);
            }
        });

        // Set initial EXPLODED state
        for (const mesh of allMeshesRef.current) {
            const initial = initialTransforms.current[mesh.uuid];
            const offset = explosionOffsets.current[mesh.uuid];
            if (initial && offset) {
                mesh.position.set(
                    initial.position.x + offset.x,
                    initial.position.y + offset.y,
                    initial.position.z + offset.z
                );
                mesh.rotation.y = initial.rotation.y + Math.PI * 0.2;
            }
        }

        setPhase('exploded');

        if (onLoaded) {
            onLoaded();
        }
    }, [clonedScene, onLoaded]);

    // Start assembly animation after short delay
    useEffect(() => {
        if (phase === 'exploded') {
            const timer = setTimeout(() => {
                setPhase('assembling');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const { invalidate } = useThree();

    useFrame((state) => {
        // Assembly animation
        if (phase === 'assembling') {
            invalidate(); // Force rendering during animation
            if (animationStartTime.current === null) {
                animationStartTime.current = state.clock.getElapsedTime();
            }

            const elapsed = state.clock.getElapsedTime() - animationStartTime.current;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);

            // Animate each mesh from exploded to assembled
            for (const mesh of allMeshesRef.current) {
                const initial = initialTransforms.current[mesh.uuid];
                const offset = explosionOffsets.current[mesh.uuid];
                if (initial && offset) {
                    mesh.position.set(
                        initial.position.x + offset.x * (1 - eased),
                        initial.position.y + offset.y * (1 - eased),
                        initial.position.z + offset.z * (1 - eased)
                    );
                    mesh.rotation.y = initial.rotation.y + Math.PI * 0.2 * (1 - eased);
                }
            }

            // Animation complete - snap to exact positions
            if (progress >= 1) {
                for (const mesh of allMeshesRef.current) {
                    const initial = initialTransforms.current[mesh.uuid];
                    if (initial) {
                        mesh.position.copy(initial.position);
                        mesh.rotation.copy(initial.rotation);
                    }
                }
                setPhase('complete');
            }
        }

        // Mouse following - High sensitivity for quick response
        if (phase === 'complete' && mousePosition && groupRef.current) {
            // Note: Mouse updates trigger React renders which trigger frames in 'demand',
            // but lerping is an animation, so we should invalidate until settled.
            // For simplicity, we just invalidate if there is significant difference, 
            // or we just trust the mouse move events to drive enough frames.
            // But let's invalidate to be smooth.
            invalidate();

            const targetY = mousePosition.x * Math.PI * 0.8;  // Much higher sensitivity
            const targetX = mousePosition.y * Math.PI * 0.4;  // Much higher sensitivity

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.12); // Much faster lerp
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.12); // Much faster lerp
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.3, 0]} {...props}>
            <primitive object={clonedScene} />
        </group>
    );
}

