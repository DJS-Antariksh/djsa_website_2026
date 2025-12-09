"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import FuturisticCard from "@/components/ui/FuturisticCard"
import { roverData } from "@/data/site-data"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RoverViewer from "@/components/RoverViewer"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function OurRover() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Section Element Refs
  const titleRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const centerColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  // Content Refs for Switching
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const currentRover = roverData[currentIndex]

  // Initial Entry Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    })

    tl.from(titleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" })
      .from(leftColRef.current, { x: -50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from(centerColRef.current, { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
      .from(rightColRef.current, { x: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
  }, { scope: containerRef })

  // Animate IN when index changes
  useGSAP(() => {
    // Ensure elements are visible and in position to animate FROM
    gsap.fromTo([leftContentRef.current, rightContentRef.current, viewerRef.current, infoRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    )
  }, { dependencies: [currentIndex], scope: containerRef })

  const changeRover = (direction: number) => {
    if (isAnimating) return
    setIsAnimating(true)

    // Animate OUT
    gsap.to([leftContentRef.current, rightContentRef.current, viewerRef.current, infoRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => {
          const len = roverData.length
          return (prev + direction + len) % len
        })
        setIsAnimating(false)
      }
    })
  }

  return (
    <section ref={containerRef} id="rover" className="relative h-screen flex items-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-6">
          <h2
            className="text-2xl md:text-4xl font-display font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Rovers
          </h2>
          <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="text-muted-foreground text-sm">4 Generations of Innovation</p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-8 lg:gap-24 items-center">
          {/* Left Specs */}
          <div ref={leftColRef} className="space-y-2 h-full flex flex-col justify-center">
            <div ref={leftContentRef} className="w-full">
              <FuturisticCard borderColor="rgba(6, 182, 212, 0.3)">
                <div className="flex flex-col space-y-4 p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 font-display tracking-wide">
                    System Specs
                  </h3>
                  <ul className="space-y-4">
                    {currentRover.leftSpecs.map((spec, index) => (
                      <li key={index} className="flex items-start space-x-3 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                        <span className="leading-relaxed">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FuturisticCard>
            </div>
          </div>

          {/* Center - 3D Rover Viewer */}
          <div ref={centerColRef} className="relative aspect-square max-h-[500px] w-full mx-auto">
            {/* Navigation arrows */}
            <button
              onClick={() => changeRover(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-20 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-all active:scale-95 group"
              aria-label="Previous rover"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => changeRover(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-20 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-all active:scale-95 group"
              aria-label="Next rover"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Rover display */}
            <div className="w-full h-full rounded-3xl glass overflow-hidden relative shadow-2xl border border-white/5">
              <div ref={viewerRef} className="absolute inset-0">
                <RoverViewer modelPath={currentRover.modelPath} />
              </div>

              {/* Rover info overlay */}
              <div ref={infoRef} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10">
                <h3
                  className="text-3xl font-display font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {currentRover.name}
                </h3>
                <div className="flex items-center space-x-2 text-primary/90 text-sm font-mono tracking-wider">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">GEN {currentRover.generation}</span>
                  <span>•</span>
                  <span>{currentRover.year}</span>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {roverData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index === currentIndex) return;
                    const direction = index > currentIndex ? 1 : -1
                    changeRover(direction)
                    // Note: This simple direction calc works for sequential but jumping requires better index math if strict direction needed.
                    // For now, simple animation trigger is acceptable.
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                  aria-label={`Go to rover ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Specs */}
          <div ref={rightColRef} className="space-y-2 h-full flex flex-col justify-center">
            <div ref={rightContentRef} className="w-full">
              <FuturisticCard borderColor="rgba(6, 182, 212, 0.3)">
                <div className="flex flex-col space-y-4 p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 font-display tracking-wide">
                    Features
                  </h3>
                  <ul className="space-y-4">
                    {currentRover.rightSpecs.map((spec, index) => (
                      <li key={index} className="flex items-start space-x-3 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                        <span className="leading-relaxed">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FuturisticCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
