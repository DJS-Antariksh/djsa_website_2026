"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { roverData } from "@/data/site-data"

export default function OurRover() {
  const [currentIndex, setCurrentIndex] = useState(3)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentRover = roverData[currentIndex]

  const nextRover = () => setCurrentIndex((prev) => (prev + 1) % roverData.length)
  const prevRover = () => setCurrentIndex((prev) => (prev - 1 + roverData.length) % roverData.length)

  return (
    <section ref={ref} id="rover" className="relative h-screen flex items-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2
            className="text-2xl md:text-4xl font-display font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Rovers
          </h2>
          <p className="text-muted-foreground text-sm">4 Generations of Innovation</p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {/* Left Specs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRover.id + "-left"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {currentRover.leftSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="p-3 glass rounded-lg border-l-2 border-primary hover:bg-white/10 transition-colors"
                  >
                    <p className="text-foreground text-sm">{spec}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Center - 3D Rover Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative aspect-square max-h-[350px]"
          >
            {/* Navigation arrows */}
            <button
              onClick={prevRover}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Previous rover"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextRover}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Next rover"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Rover display */}
            <div className="w-full h-full rounded-2xl glass overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRover.id}
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* 
                    GLB MODEL PLACEHOLDER
                    Replace with Three.js canvas:
                    <Canvas><Model url={currentRover.modelPath} /></Canvas>
                  */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                    <motion.img
                      src={`/placeholder.svg?height=300&width=300&query=${currentRover.name} mars rover 3D`}
                      alt={currentRover.name}
                      className="w-3/4 h-3/4 object-contain"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Rover info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                <h3
                  className="text-xl font-display font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {currentRover.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Gen {currentRover.generation} • {currentRover.year}
                </p>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-3">
              {roverData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground"}`}
                  aria-label={`Go to rover ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRover.id + "-right"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {currentRover.rightSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="p-3 glass rounded-lg border-r-2 border-accent hover:bg-white/10 transition-colors"
                  >
                    <p className="text-foreground text-sm">{spec}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
