"use client"

import { useMemo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function Model({ url }: { url: string }) {
    // Critical: Clone the scene to avoid side effects from other components (like HeroSection)
    // modifying the same GLTFLoader cache instance (e.g. exploding the model).
    // We append a query param to ensuring we get a distinct cache entry from useGLTF
    // because HeroSection mutates the original cached object directly.
    const isolatedUrl = useMemo(() => `${url}?isolated=true`, [url])
    const { scene } = useGLTF(isolatedUrl)

    const clonedScene = useMemo(() => scene.clone(), [scene])

    return <primitive object={clonedScene} />
}

export default function RoverViewer({ modelPath }: { modelPath: string }) {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, preserveDrawingBuffer: true }}>
                <Suspense fallback={null}>
                    {/* Dark deep space background */}


                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                    <Stage adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
                        <Model url={modelPath} />
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
            </Canvas>
        </div>
    )
}

// Preload models to prevent flickering - must match the query param above!
useGLTF.preload("/models/prayan.glb?isolated=true")
useGLTF.preload("/models/abhyan.glb?isolated=true")
useGLTF.preload("/models/vidyaanAR-v3.glb?isolated=true")
useGLTF.preload("/models/rover-render-compressed.glb?isolated=true")
