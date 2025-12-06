"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamic import for the 3D scene
const RoverCanvas = dynamic(
  () => import('../components/three/RoverCanvas').then((mod) => mod.RoverCanvas),
  { ssr: false, loading: () => <div className="w-full h-full bg-black" /> }
)

interface HeroSectionProps {
  onModelLoaded?: () => void;
}

export default function HeroSection({ onModelLoaded }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<{ left: number; top: number; duration: number; delay: number }[]>([])

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Adjusted ranges for the taller section
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[200vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background & 3D Scene */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/90" /> {/* Fallback/Base */}
          <div className="w-full h-full">
            <RoverCanvas onLoaded={onModelLoaded} />
          </div>
        </div>

        {/* Floating particles (preserved from original) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Text Overlay */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-20 h-full flex flex-col items-center justify-end pb-32 md:justify-end md:pb-20 pointer-events-none"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 2.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wider mb-3 text-center text-white drop-shadow-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DJS Antariksh
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 2.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-200 tracking-widest uppercase text-center drop-shadow-md"
          >
            To Decipher Unimaginable
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1.5"
            >
              <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
