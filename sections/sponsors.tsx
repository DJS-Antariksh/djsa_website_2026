"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { sponsorsData } from "@/data/site-data"

export default function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="sponsors"
      className="relative h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-3">
            <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Sponsors
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">Partners in our journey</p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {sponsorsData.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-xl p-6 flex items-center justify-center h-24 md:h-32 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <img
                  src={sponsor.logo || "/placeholder.svg?height=80&width=160&query=company logo"}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
