"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="about"
      className="relative h-screen flex items-center px-4 md:px-8 lg:px-16 stars-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Title and image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
              About the Team
            </h2>

            <div className="relative aspect-video rounded-xl overflow-hidden glass">
              <img src="/robotics-team-group-photo.jpg" alt="DJS Antariksh Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 glass rounded-lg">
                <div
                  className="text-xl md:text-2xl font-display font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  60+
                </div>
                <div className="text-xs text-muted-foreground">Engineers</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div
                  className="text-xl md:text-2xl font-display font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  5+
                </div>
                <div className="text-xs text-muted-foreground">Years</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div
                  className="text-xl md:text-2xl font-display font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  3x
                </div>
                <div className="text-xs text-muted-foreground">World #1</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
