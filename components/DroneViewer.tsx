"use client"

import { useMemo, Suspense, useRef } from "react"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from "three"

function Model({ url, rotation, position, scale }: { url: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    const { scene } = useGLTF(url)
    const clonedScene = useMemo(() => scene.clone(), [scene])
    return <primitive object={clonedScene} rotation={rotation} position={position} scale={scale} />
}

export default function DroneViewer({ modelPath, rotation, position, scale }: { modelPath: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    const ref = useRef<HTMLDivElement>(null)

    if (modelPath.endsWith('.svg')) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black/50">
                <img
                    src={modelPath}
                    alt="Drone Placeholder"
                    className="w-[60%] h-[60%] object-contain opacity-50"
                />
            </div>
        )
    }

    return (
        <div ref={ref} className="w-full h-full relative">
            <View track={ref as any} className="w-full h-full">
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                    <Stage adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
                        <Model url={modelPath} rotation={rotation} position={position} scale={scale} />
                    </Stage>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                </Suspense>
            </View>
        </div>
    )
}

// Preload drone models
useGLTF.preload("/models/akshayaan-compressed.glb")
useGLTF.preload("/models/nabhyaan.glb")
useGLTF.preload("/models/jatayu_compressed.glb")
