"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden stars-bg"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-4">
        {/* 3D Model placeholder with parallax */}
        <motion.div
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="relative w-72 h-72 md:w-[400px] md:h-[400px] mx-auto mb-6"
        >
          {/* PLACEHOLDER FOR GLB MODEL - Replace this div with your Three.js canvas */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150" />

              {/* 
                GLB MODEL PLACEHOLDER
                To add your 3D model:
                1. Install @react-three/fiber and @react-three/drei
                2. Import your .glb file
                3. Replace this img with:
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Model url="/models/your-rover.glb" />
                  <OrbitControls enableZoom={false} autoRotate />
                </Canvas>
              */}
              <motion.img
                src="/mars-rover-3d-model-white-background.jpg"
                alt="Mars Rover - Replace with GLB model"
                className="relative w-56 h-56 md:w-80 md:h-80 object-contain"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wider mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DJS Antariksh
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base md:text-lg text-muted-foreground tracking-widest uppercase"
        >
          Too Decipher Unimaginable
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-5 h-8 border-2 border-muted-foreground rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
