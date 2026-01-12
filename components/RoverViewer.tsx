"use client"

import { useMemo, Suspense, useRef } from "react"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from "three"

function Model({ url, rotation, position, scale }: { url: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    // Critical: Clone the scene to avoid side effects
    const isolatedUrl = useMemo(() => `${url}?isolated=true`, [url])
    const { scene } = useGLTF(isolatedUrl)

    // Dispose of the clone when unmounting to free memory
    useEffect(() => {
        return () => {
            // Optional: clean up materials if needed, but Three.js + useGLTF cache handles most
        }
    }, [])

    const clonedScene = useMemo(() => scene.clone(), [scene])

    return <primitive object={clonedScene} rotation={rotation} position={position} scale={scale} />
}

import { useEffect } from "react"

export default function RoverViewer({ modelPath, rotation, position, scale }: { modelPath: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className="w-full h-full relative">
            <View track={ref as any} className="w-full h-full">
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                    <Stage adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
                        <Model url={modelPath} rotation={rotation} position={position} scale={scale} />
                    </Stage>
                    <OrbitControls
                        makeDefault
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </View>
        </div>
    )
}

// Preload models
useGLTF.preload("/models/prayan_draco.glb?isolated=true")
useGLTF.preload("/models/abhyan_draco.glb?isolated=true")
useGLTF.preload("/models/vidyaanAR-v3_draco.glb?isolated=true")
