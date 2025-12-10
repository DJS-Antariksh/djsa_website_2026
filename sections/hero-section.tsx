"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"

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

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Antariksh logo (home hero) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-30">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
            <Image
              src="/brand/AntarikshLogo.png"
              alt="DJS Antariksh"
              fill
              sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 80px"
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>

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

        {/* Text Overlay - Title stays for 2s then moves up over 4s */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center pointer-events-none">
          {/* Title - stays centered for 2s, then animates upward over 4s */}
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-25vh", opacity: 1 }}
            transition={{
              y: { duration: 4, ease: "easeOut", delay: 2 }, // 2s delay, then 4s animation
              opacity: { duration: 0.5 } // Fade in immediately
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wider text-center text-white drop-shadow-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DJS Antariksh
          </motion.h1>

          {/* Tagline - also delays 2s before moving */}
          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-25vh", opacity: 1 }}
            transition={{
              y: { duration: 4, ease: "easeOut", delay: 2.3 }, // 2.3s delay (slightly after title)
              opacity: { duration: 0.5, delay: 0.3 } // Fade in slightly after title
            }}
            className="text-lg md:text-xl text-gray-200 tracking-widest uppercase text-center drop-shadow-md mt-3"
          >
            To Decipher Unimaginable
          </motion.p>

          {/* Scroll Indicator - appears after full animation (2s delay + 4s animation) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5 }} // 2s + 4s + 0.5s buffer
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
        </div>
      </div>
    </section>
  )
}
