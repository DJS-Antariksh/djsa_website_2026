'use client'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

/**
 * Component that pre-uploads a 3D model to GPU without rendering it visibly
 * Eliminates scroll hitching by warming up GPU resources in advance
 */
function WarmModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const { gl, camera } = useThree()
  
  useEffect(() => {
    if (scene && gl && camera) {
      // Force shader compilation to prevent first-frame stutter
      gl.compile(scene, camera)
    }
  }, [scene, gl, camera])
  
  // Render invisibly - GPU still uploads textures and compiles shaders
  return <primitive object={scene} visible={false} />
}

interface GPUWarmupProps {
  models: string[]
}

/**
 * Offscreen Canvas that pre-uploads 3D models to GPU
 * Prevents scroll lag by ensuring models are GPU-ready before user scrolls to them
 * 
 * Usage: Mount after initial page interactivity is achieved
 */
export function GPUWarmup({ models }: GPUWarmupProps) {
  return (
    <Canvas 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
      frameloop="demand"
      gl={{
        powerPreference: 'high-performance',
        antialias: false, // Not needed for invisible canvas
        alpha: false,
        stencil: false,
      }}
    >
      {models.map(url => (
        <WarmModel key={url} url={url} />
      ))}
    </Canvas>
  )
}
