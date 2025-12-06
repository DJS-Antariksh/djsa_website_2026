"use client"

import { useEffect, useRef } from "react"
import { sponsorsData, sponsorsDataBottom } from "@/data/site-data"
import StarBorder from "@/components/StarBorder"
import LogoLoop from "@/components/LogoLoop"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Sponsors() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden py-20"
    >
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-full mx-auto w-full flex flex-col gap-16 items-center">
        {/* Section Title */}
        <div ref={titleRef} className="text-center">
          <div className="inline-block px-6 py-2 rounded-lg mb-3">
            <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Sponsors
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">Partners in our journey</p>
        </div>

        {/* Logo Loops Container */}
        <div className="w-full flex flex-col gap-0">
          {/* Logo Loop Left */}
          <div className="w-full overflow-hidden py-1">
            <LogoLoop
              logos={sponsorsData.map((sponsor) => ({
                node: (
                  <div className="w-[400px] mx-4">
                    <StarBorder as="div" className="w-full opacity-70" color="cyan" backgroundColor="bg-white">
                      <div className="flex items-center justify-center h-[200px] bg-white">
                        <img
                          src={sponsor.logo || "/placeholder.svg?height=80&width=160&query=company logo"}
                          alt={sponsor.name}
                          className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </StarBorder>
                  </div>
                ),
              }))}
              speed={100}
              direction="left"
              logoHeight={260}
              gap={0}
            />
          </div>

          {/* Logo Loop Right */}
          <div className="w-full overflow-hidden py-1">
            <LogoLoop
              logos={sponsorsDataBottom.map((sponsor) => ({
                node: (
                  <div className="w-[400px] mx-4">
                    <StarBorder as="div" className="w-full" color="cyan" backgroundColor="bg-transparent">
                      <div className="flex items-center justify-center h-[200px]">
                        <img
                          src={sponsor.logo || "/placeholder.svg?height=80&width=160&query=company logo"}
                          alt={sponsor.name}
                          className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </StarBorder>
                  </div>
                ),
              }))}
              speed={100}
              direction="right"
              logoHeight={260}
              gap={0}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
