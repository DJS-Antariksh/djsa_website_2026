"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"


// Dynamic import for the 3D scene
const RoverCanvas = dynamic(
  () => import('../components/three/RoverCanvas').then((mod) => mod.RoverCanvas),
  { ssr: false }
)

interface HeroSectionProps {
  onModelLoaded?: () => void
  enable3D?: boolean
}

export default function HeroSection({ onModelLoaded, enable3D = true }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Antariksh logo (home hero) */}
        <div id="hero-logo-container" className="hidden md:block fixed top-0 left-0 sm:top-3 sm:left-4 md:top-0 md:left-6 z-3-1">
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
          <div className="w-full h-full">
            {enable3D ? (
              <RoverCanvas onLoaded={onModelLoaded} />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src="/side_rover1.png"
                  alt="DJS Antariksh rover"
                  fill
                  priority
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
              </div>
            )}
          </div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center pointer-events-none">

          {/* Title */}
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-25vh", opacity: 1 }}
            transition={{
              y: { duration: 4, ease: "easeOut", delay: 2 },
              opacity: { duration: 0.5 }
            }}
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 16px rgba(90,160,255,0.35)",
            }}
            className="font-bold text-center text-white drop-shadow-xl pointer-events-auto mb-2 md:mb-0.5"
            style={{
              fontFamily: "Rostex, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "0.08em",
              lineHeight: "1.1",
            }}
          >
            DJS Antariksh
          </motion.h1>

          {/* Blue Line */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-25vh", opacity: 1 }}
            transition={{
              y: { duration: 4, ease: "easeOut", delay: 2 },
              opacity: { duration: 0.5, delay: 0.2 }
            }}
            className="h-1 w-24 md:w-48 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-1 md:mb-0.5"
          />

          {/* Tagline */}
          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-25vh", opacity: 1 }}
            transition={{
              y: { duration: 4, ease: "easeOut", delay: 2.3 },
              opacity: { duration: 0.5, delay: 0.3 }
            }}
            whileHover={{
              scale: 1.03,
              textShadow: "0px 0px 12px rgba(255,255,255,0.25)",
            }}
            className="uppercase text-gray-300 text-center pointer-events-auto"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
              letterSpacing: "0.35em",
            }}
          >
            To Decipher Unimaginable
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer"
            onClick={handleScrollToAbout}
          >
            {/* Desktop: Mouse */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex w-5 h-8 border-2 border-white/50 rounded-full justify-center pt-1.5"
            >
              <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>


          </motion.div>

        </div>

      </div>
    </section>
  )
}
