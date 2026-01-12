'use client'

import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function SiteCanvas() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Canvas
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 40, // Ensure it sits above backgrounds but below modals if any
            }}
            eventSource={document.body}
            eventPrefix="client"
            shadows={false} // Disable shadows globally if not critical, or keep on but optimized. User asked to "Reduce model complexity... shadows off for static models". I'll default false here and enable per view if needed? No, Canvas shadows prop enables the map.
            // Let's enable shadows but use basic type
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                powerPreference: 'low-power',
                alpha: true,
                stencil: false,
                depth: true,
                failIfMajorPerformanceCaveat: true, // Safety against crashes? Maybe too aggressive.
            }}
            frameloop="demand"
        >
            <View.Port />
            <Preload all />
        </Canvas>
    )
}
