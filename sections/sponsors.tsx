"use client"

import { useEffect, useRef, useState } from "react"
import { sponsorsData, sponsorsDataBottom } from "@/data/site-data"
import StarBorder from "@/components/StarBorder"
import LogoLoop from "@/components/LogoLoop"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Pause } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Sponsors() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

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
      className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden py-16 md:py-20 mt-12 md:mt-0"
    >
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-full mx-auto w-full flex flex-col gap-6 items-center">
        {/* Section Title */}
        <div ref={titleRef} className="text-center">
          <div className="inline-block px-6 py-2 rounded-lg ">
            <h2 className="text-2xl md:text-4xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Our Sponsors
            </h2>
          </div>
          <div className=" h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="text-muted-foreground text-sm">Partners in our journey</p>
        </div>

        {/* Logo Loops Container */}
        {/* <div className="w-full flex flex-col gap-0 -mt-2">
          Logo Loop Left
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
          </div> */}

        {/* Logo Loop Right */}
        <div className="w-full overflow-hidden py-5">
          <LogoLoop
            logos={sponsorsDataBottom.map((sponsor) => ({
              node: (
                <div className="w-[300px] mx-4">
                  {sponsor.url ? (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${sponsor.name}`}
                      className="flex items-center justify-center h-[200px]"
                    >
                      <img
                        src={sponsor.logo || "/placeholder.svg?height=80&width=160&query=company logo"}
                        alt={sponsor.name}
                        className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center h-[200px]">
                      <img
                        src={sponsor.logo || "/placeholder.svg?height=80&width=160&query=company logo"}
                        alt={sponsor.name}
                        className="w-full h-full object-contain opacity-90"
                      />
                    </div>
                  )}
                </div>
              ),
            }))}
            speed={isPaused ? 0 : 100}
            direction="right"
            logoHeight={260}
            gap={0}
            pauseOnHover={false}
          />
        </div>
      </div>

      {/* Pause/Unpause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-50 right-10 p-2 text-muted-foreground/70 hover:text-muted-foreground/50 transition-colors z-50"
        aria-label={isPaused ? "Play animation" : "Pause animation"}
      >
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </button>
      {/* </div> */}
    </section>
  )
}
