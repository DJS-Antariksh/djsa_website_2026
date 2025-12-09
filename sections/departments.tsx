"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
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
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const backgroundRefs = useRef<(HTMLDivElement | null)[]>([])

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? departmentData.length - 1 : prev - 1))

  const handleNext = () =>
    setActiveIndex((prev) => (prev === departmentData.length - 1 ? 0 : prev + 1))

  const handleDeptClick = (index: number) => setActiveIndex(index)

  // Initial Entry Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          subtitleRef.current,
          { opacity: 0, duration: 0.8 },
          "-=0.4"
        )
        .from(
          navRef.current,
          { opacity: 0, y: 20, duration: 0.5 },
          "-=0.4"
        )
        .from(
          cardsRef.current,
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6"
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Star generation
  const [stars, setStars] = useState<
    { left: number; top: number; opacity: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    setStars(
      [...Array(100)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      }))
    )
  }, [])

  // Animate Cards & Backgrounds
  useEffect(() => {
    const totalCards = departmentData.length

    departmentData.forEach((dept, index) => {
      const diff = index - activeIndex
      let normalizedDiff = diff

      if (diff > totalCards / 2) normalizedDiff = diff - totalCards
      if (diff < -totalCards / 2) normalizedDiff = diff + totalCards

      const isActive = index === activeIndex
      const absOffset = Math.abs(normalizedDiff)

      const baseX = normalizedDiff * 220
      const baseY = Math.abs(normalizedDiff) * 40
      const rotation = normalizedDiff * -8
      const scale = isActive ? 1.1 : Math.max(0.7, 1 - absOffset * 0.15)
      const opacity = Math.max(0.3, 1 - absOffset * 0.25)
      const zIndex = totalCards - absOffset

      // Card Animation
      gsap.to(cardsRef.current[index], {
        x: baseX,
        y: baseY,
        rotation,
        scale,
        opacity,
        zIndex,
        duration: 0.6,
        ease: "power2.out",
      })

      // Background Video Fade
      gsap.to(backgroundRefs.current[index], {
        opacity: isActive ? 0.5 : 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
    })
  }, [activeIndex])

  return (
    <section
      ref={containerRef}
      id="departments"
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Background Videos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {departmentData.map((dept, index) => {
          const srcMap: any = {
            coding: "/general_photos/coding.mp4",
            electronics: "/general_photos/elecs.mp4",
            mechanical: "/general_photos/mech_dept.mp4",
            science: "/general_photos/science.mp4",
            marketing: "/general_photos/marketing.mp4",
          }

          const src = srcMap[dept.id]
          if (!src) return null

          return (
            <div
              key={dept.id}
              ref={(el) => (backgroundRefs.current[index] = el)}
              className="absolute inset-0 opacity-0"
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

      {/* ⭐ CENTERED CONTENT BLOCK ⭐ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Title */}
        <div ref={titleRef} className="relative z-20 text-center pointer-events-auto">
          <h2 className="text-4xl sm:text-4xl md:text-4xl font-display font-bold text-white">
            Our Departments
          </h2>
          <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="relative z-20 text-zinc-400 text-center max-w-2xl px-4 mb-10 pointer-events-auto mt-2"
        >
          Our team is divided into specialized departments, each contributing unique expertise to our mission.
        </p>

        {/* Cards Block */}
        <div className="relative z-10 w-full h-[400px] flex items-center justify-center pointer-events-auto">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 md:left-12 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 md:right-12 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {departmentData.map((dept, index) => {
              const isActive = index === activeIndex
              const borderColor = isActive ? dept.color : "rgba(255,255,255,0.1)"
              const boxShadow = isActive ? `0 25px 50px -12px ${dept.color}30` : "none"

              const total = departmentData.length
              const diff = index - activeIndex
              let normalizedDiff = diff

              if (diff > total / 2) normalizedDiff = diff - total
              if (diff < -total / 2) normalizedDiff = diff + total

              const absOffset = Math.abs(normalizedDiff)
              const baseX = normalizedDiff * 220
              const baseY = absOffset * 40
              const rotation = normalizedDiff * -8
              const scale = isActive ? 1.1 : Math.max(0.7, 1 - absOffset * 0.15)
              const opacity = Math.max(0.3, 1 - absOffset * 0.25)
              const zIndex = total - absOffset

              return (
                <div
                  key={dept.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={() => handleDeptClick(index)}
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    transform: `translate(${baseX}px, ${baseY}px) rotate(${rotation}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div
                    className="relative w-48 md:w-56 lg:w-64 h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden transition-colors duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(30,30,30,0.9) 0%, rgba(10,10,10,0.95) 100%)",
                      borderWidth: "1px",
                      borderColor,
                      boxShadow,
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: dept.color }} />

                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <div
                        className="mb-4 p-4 rounded-xl"
                        style={{ background: `${dept.color}20`, color: dept.color }}
                      >
                        {departmentIcons[dept.id]}
                      </div>

                      <h3
                        className="text-xl md:text-2xl font-bold mb-3"
                        style={{ color: isActive ? dept.color : "#fff" }}
                      >
                        {dept.name}
                      </h3>

                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          maxHeight: isActive ? "200px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="text-zinc-400 text-sm leading-relaxed">{dept.description}</p>
                      </div>

                      <div
                        className="absolute bottom-4 w-12 h-0.5 rounded-full"
                        style={{ background: `${dept.color}40` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Indicators */}
        <div ref={navRef} className="relative z-20 flex gap-2 mt-6 pointer-events-auto">
          {departmentData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDeptClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6" : "bg-white/30 hover:bg-white/50"
              }`}
              style={{
                backgroundColor: index === activeIndex ? departmentData[index].color : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
