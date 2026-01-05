"use client"

import { useMemo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function Model({ url, rotation, position, scale }: { url: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    // Clone scene to avoid shared cache issues
    const { scene } = useGLTF(url)
    const clonedScene = useMemo(() => scene.clone(), [scene])
    return <primitive object={clonedScene} rotation={rotation} position={position} scale={scale} />
}

export default function DroneViewer({ modelPath, rotation, position, scale }: { modelPath: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
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
        <div className="w-full h-full">
            <Canvas 
                shadows 
                dpr={[1, 1.5]} 
                gl={{ 
                    antialias: false, 
                    preserveDrawingBuffer: true,
                    powerPreference: 'high-performance',
                    alpha: true,
                    stencil: false,
                }}
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                    <Stage adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
                        <Model url={modelPath} rotation={rotation} position={position} scale={scale} />
                    </Stage>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                </Suspense>
            </Canvas>
        </div>
    )

}

// Preload drone models - Draco compressed versions
useGLTF.preload("/models/akshayaan-compressed.glb")
useGLTF.preload("/models/nabhyaan.glb")
useGLTF.preload("/models/jatayu_compressed.glb")
