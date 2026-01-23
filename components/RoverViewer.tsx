"use client"

import { useMemo, Suspense, useRef, useState, useEffect } from "react"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { isIOS } from "@/utils/isIOS"

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

    const clonedScene = useMemo(() => {
        const clone = scene.clone()
        // Manual centering to fix "far off in distance/revolving around viewer" issues
        const box = new THREE.Box3().setFromObject(clone)
        const center = box.getCenter(new THREE.Vector3())
        clone.position.sub(center) // Center the model at (0,0,0) locally
        return clone
    }, [scene])

    return <primitive object={clonedScene} rotation={rotation} position={position} scale={scale} />
}



export default function RoverViewer({ modelPath, rotation, position, scale }: { modelPath: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    const [hasAppeared, setHasAppeared] = useState(false)
    const [isIOSDevice, setIsIOSDevice] = useState(false)

    useEffect(() => {
        setIsIOSDevice(isIOS())
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(([entry]) => {
            const isVisible = entry.isIntersecting
            setInView(isVisible)
            if (isVisible) {
                setHasAppeared(true)
            }
        }, { rootMargin: '200px' })

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className="w-full h-full relative">
            {(isIOSDevice ? inView : hasAppeared) ? (
                <Canvas
                    className="w-full h-full"
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    frameloop={inView ? "always" : "never"}
                >
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                        <Stage key={modelPath} adjustCamera={1.2} intensity={0.5} environment="city" preset="rembrandt">
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
                </Canvas>
            ) : null}
        </div>
    )
}
