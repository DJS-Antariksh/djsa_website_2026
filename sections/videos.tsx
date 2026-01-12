"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { videosData } from "@/data/site-data"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Videos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      ref={ref}
      id="videos"
      className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-muted/20 to-background md:-mt-32 -mt-0"
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
        <div className="relative">
          {/* Mobile chevrons */}
          <div className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20">
            <button
              aria-label="Prev"
              onClick={() => {
                if (!containerRef.current) return
                containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: 'smooth' })
              }}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20">
            <button
              aria-label="Next"
              onClick={() => {
                if (!containerRef.current) return
                containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: 'smooth' })
              }}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex flex-col md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none">
            {videosData.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group w-full md:w-auto snap-start md:snap-none"
              >
                <div className="glass rounded-xl overflow-hidden">
                  <div className="relative aspect-video w-full md:h-auto">
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
      </div>
    </section>
  )
}
