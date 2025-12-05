"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { departmentData } from "@/data/site-data"
import { Code2, Cpu, Cog, Megaphone, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react"

const departmentIcons: Record<string, React.ReactNode> = {
  coding: <Code2 className="w-8 h-8" />,
  electronics: <Cpu className="w-8 h-8" />,
  mechanical: <Cog className="w-8 h-8" />,
  marketing: <Megaphone className="w-8 h-8" />,
  science: <FlaskConical className="w-8 h-8" />,
}

export default function Departments() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? departmentData.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === departmentData.length - 1 ? 0 : prev + 1))
  }

  const handleDeptClick = (index: number) => {
    setActiveIndex(index)
  }

  // Calculate positions for the arc layout
  const getCardStyle = (index: number) => {
    const totalCards = departmentData.length
    const diff = index - activeIndex

    // Normalize the difference to handle wrap-around
    let normalizedDiff = diff
    if (diff > totalCards / 2) normalizedDiff = diff - totalCards
    if (diff < -totalCards / 2) normalizedDiff = diff + totalCards

    const isActive = index === activeIndex
    const absOffset = Math.abs(normalizedDiff)

    // Arc positioning
    const baseX = normalizedDiff * 220
    const baseY = Math.abs(normalizedDiff) * 40
    const rotation = normalizedDiff * -8
    const scale = isActive ? 1.1 : Math.max(0.7, 1 - absOffset * 0.15)
    const opacity = Math.max(0.3, 1 - absOffset * 0.25)
    const zIndex = totalCards - absOffset

    return {
      x: baseX,
      y: baseY,
      rotate: rotation,
      scale,
      opacity,
      zIndex,
    }
  }

  return (
    <section
      ref={ref}
      id="departments"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-20 mb-4"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-wide">
          Departments
        </h2>
        <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#c9a23a] to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-zinc-400 text-center max-w-2xl px-4 mb-12"
      >
        Our team is divided into specialized departments, each contributing unique expertise to our mission
      </motion.p>

      {/* Cards Container */}
      <div className="relative z-10 w-full h-[400px] flex items-center justify-center">
        {/* Navigation Arrows */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handlePrev}
          className="absolute left-4 md:left-12 lg:left-24 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          aria-label="Previous department"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleNext}
          className="absolute right-4 md:right-12 lg:right-24 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          aria-label="Next department"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Department Cards in Arc */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          {departmentData.map((dept, index) => {
            const style = getCardStyle(index)
            const isActive = index === activeIndex

            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? {
                        opacity: style.opacity,
                        x: style.x,
                        y: style.y,
                        rotate: style.rotate,
                        scale: style.scale,
                      }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: isInView ? index * 0.1 : 0,
                }}
                onClick={() => handleDeptClick(index)}
                className="absolute cursor-pointer"
                style={{ zIndex: style.zIndex }}
              >
                <div
                  className={`relative w-48 md:w-56 lg:w-64 h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden transition-all duration-500 ${
                    isActive ? "ring-2 ring-[#c9a23a] shadow-2xl shadow-[#c9a23a]/20" : "ring-1 ring-white/10"
                  }`}
                  style={{
                    background: `linear-gradient(180deg, rgba(30,30,30,0.9) 0%, rgba(10,10,10,0.95) 100%)`,
                  }}
                >
                  {/* Glowing top border */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: dept.color }} />

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Icon */}
                    <div
                      className="mb-4 p-4 rounded-xl"
                      style={{
                        background: `${dept.color}20`,
                        color: dept.color,
                      }}
                    >
                      {departmentIcons[dept.id]}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3"
                      style={{ color: isActive ? dept.color : "#ffffff" }}
                    >
                      {dept.name}
                    </h3>

                    {/* Description - only visible when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-zinc-400 text-sm leading-relaxed"
                        >
                          {dept.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Decorative element */}
                    <div
                      className="absolute bottom-4 w-12 h-0.5 rounded-full"
                      style={{ background: `${dept.color}40` }}
                    />
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${dept.color}10 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-20 flex gap-2 mt-8"
      >
        {departmentData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDeptClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-[#c9a23a] w-6" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to department ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-8 right-8 w-4 h-4 rotate-45 border border-[#c9a23a]/30" />
      <div className="absolute top-24 left-8 w-3 h-3 rotate-45 border border-white/20" />
    </section>
  )
}
