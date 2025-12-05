"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"
import { achievementsData } from "@/data/site-data"

export default function Achievements() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % achievementsData.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + achievementsData.length) % achievementsData.length)

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff =
      ((diff + achievementsData.length) % achievementsData.length) - Math.floor(achievementsData.length / 2)

    if (normalizedDiff === 0) return { scale: 1.1, x: 0, opacity: 1, zIndex: 10 }
    else if (Math.abs(normalizedDiff) === 1) return { scale: 0.9, x: normalizedDiff * 280, opacity: 0.7, zIndex: 5 }
    else if (Math.abs(normalizedDiff) === 2) return { scale: 0.75, x: normalizedDiff * 200, opacity: 0.4, zIndex: 1 }
    return { scale: 0.6, x: normalizedDiff * 140, opacity: 0, zIndex: 0 }
  }

  return (
    <section
      ref={ref}
      id="achievements"
      className="relative h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Achievements
            </h2>
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-base md:text-lg">Our journey of excellence</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-[450px] flex items-center justify-center">
          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {achievementsData.map((achievement, index) => {
              const style = getCardStyle(index)
              return (
                <motion.div
                  key={achievement.id}
                  animate={style}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-72 md:w-80 h-96 cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden glass group">
                    <img
                      src={achievement.image || "/placeholder.svg?height=500&width=400&query=trophy award ceremony"}
                      alt={achievement.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-primary/90 text-primary-foreground font-display font-bold text-sm">
                      {achievement.rank}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-primary font-semibold">{achievement.year}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{achievement.competition}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-foreground/80 line-clamp-2">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {achievementsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground"}`}
              aria-label={`Go to achievement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
