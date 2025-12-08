"use client"

import { useMemo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

// function Model({ url }: { url: string }) {
//     // Clone scene to avoid shared cache issues
//     const { scene } = useGLTF(url)
//     const clonedScene = useMemo(() => scene.clone(), [scene])
//     return <primitive object={clonedScene} />
// }

export default function DroneViewer({ modelPath }: { modelPath: string }) {
    // If it's a placeholder (SVG), render it as a simple image instead of a 3D Canvas
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

    /* 
       TODO: Uncomment this when real GLB models are available.
       Currently commented out to prevent 404 crash on missing files.
    */
    /*
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, preserveDrawingBuffer: true }}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                    <Stage adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
                        <Model url={modelPath} />
                    </Stage>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                </Suspense>
            </Canvas>
        </div>
    ) 
    */

    // Fallback for now if not SVG but model missing
    return (
        <div className="w-full h-full flex items-center justify-center bg-black/20">
            <p className="text-white/50 font-mono text-sm">3D Model Coming Soon</p>
        </div>
    )
}

// Preload drone models - Commented out until files exist
// useGLTF.preload("/models/drone1.glb")
// useGLTF.preload("/models/drone2.glb")
// useGLTF.preload("/models/drone3.glb")
