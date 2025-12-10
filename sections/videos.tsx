"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { videosData } from "@/data/site-data"

export default function Videos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="videos"
      className="relative h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-muted/20 to-background -mt-32"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2
            className="text-2xl md:text-4xl font-display font-bold mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Videos
          </h2>
          <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="text-muted-foreground text-sm">Watch our journey unfold</p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {videosData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-xl overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <h3
                    className="font-display font-semibold text-foreground text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{video.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
