"use client"

import { useCallback, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

type Slide = {
  src: string
  alt: string
}

// Fixed tilts (instead of Math.random) so server and client render the same markup
const ROTATIONS = [-8, 6, -4, 9, -10, 5, -6, 8]

export function AnimatedTestimonials({
  slides,
  children,
  autoplay = true,
  interval = 5000,
}: {
  slides: Slide[]
  children?: ReactNode
  autoplay?: boolean
  interval?: number
}) {
  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => setActive((prev) => (prev + 1) % slides.length), [slides.length])
  const handlePrev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(handleNext, interval)
    return () => clearInterval(id)
  }, [autoplay, interval, handleNext, active])

  const rotation = (index: number) => ROTATIONS[index % ROTATIONS.length]

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 md:items-stretch">
      {/* Image stack fills the row height on desktop so it lines up with the text beside it */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full">
        <div className="absolute inset-0">
          <AnimatePresence>
            {slides.map((slide, index) => {
              const isActive = index === active
              return (
                <motion.div
                  key={slide.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotation(index) }}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.95,
                    z: isActive ? 0 : -100,
                    rotate: isActive ? 0 : rotation(index),
                    zIndex: isActive ? 40 : slides.length + 2 - index,
                    y: isActive ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotation(index) }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center">{children}</div>
    </div>
  )
}
