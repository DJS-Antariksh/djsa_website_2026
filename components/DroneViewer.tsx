"use client"

import { useMemo, Suspense, useRef, useState, useEffect } from "react"
import { useGLTF, Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { isIOS } from "@/utils/isIOS"

function Model({ url, rotation, position, scale }: { url: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
    const { scene } = useGLTF(url)
    const clonedScene = useMemo(() => {
        const clone = scene.clone()
        // Manual centering
        const box = new THREE.Box3().setFromObject(clone)
        const center = box.getCenter(new THREE.Vector3())
        clone.position.sub(center)
        return clone
    }, [scene])
    return <primitive object={clonedScene} rotation={rotation} position={position} scale={scale} />
}

export default function DroneViewer({ modelPath, rotation, position, scale }: { modelPath: string; rotation?: [number, number, number]; position?: [number, number, number]; scale?: [number, number, number] | number }) {
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
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                    </Suspense>
                </Canvas>
            ) : null}
        </div>
    )
}
