"use client"

import TiltedCard from "./card"
import { useEffect, useRef, useState, useMemo } from "react"
import gsap from "gsap"
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import { achievementsData } from "@/data/site-data"

// Types
type VideoSlide = {
  id: string
  type: "video"
  title: string
  videoUrl: string
}

type CardSlide = {
  id: string
  title: string
  description: string
  image: string
}

type SlideItem = VideoSlide | CardSlide

export default function Achievements() {
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [slide, setSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isVideoPlayingRef = useRef(isVideoPlaying)

  // Keep the ref updated
  useEffect(() => {
    isVideoPlayingRef.current = isVideoPlaying
  }, [isVideoPlaying])

  // Video as first slide
  const videoSlide: VideoSlide = useMemo(
    () => ({
      id: "video-card",
      type: "video",
      title: "Watch Our Journey",
      videoUrl:
        "https://www.youtube.com/embed/OEYZWgZUsKU?enablejsapi=1&start=171",
    }),
    []
  )

  // Build slides → first slide is video, then 2 cards per slide
  const slides: SlideItem[][] = useMemo(() => {
    const arr: SlideItem[][] = [[videoSlide]] // first slide is video alone
    for (let i = 0; i < achievementsData.length; i += 2) {
      arr.push([
        achievementsData[i],
        achievementsData[i + 1] ?? achievementsData[0],
      ])
    }
    return arr
  }, [videoSlide])

  // Load YouTube IFrame API
  useEffect(() => {
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.id = "youtube-iframe-api"
      document.body.appendChild(tag)
    }
  }, [])

  // Start or restart autoplay
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isVideoPlayingRef.current) {
        setSlide((prev) => (prev + 1) % slides.length)
      }
    }, 5000)
  }

  // Initialize autoplay
  useEffect(() => {
    startAutoplay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [slides.length])

  // GSAP animation
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
    })
  }, [slide])

  // Navigation handlers
  const handlePrev = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length)
    startAutoplay() // restart interval
  }

  const handleNext = () => {
    setSlide((prev) => (prev + 1) % slides.length)
    startAutoplay() // restart interval
  }

  const handleDotClick = (index: number) => {
    setSlide(index)
    startAutoplay() // restart interval
  }

  // Type guard
  const isVideoSlide = (item: SlideItem): item is VideoSlide =>
    "type" in item && item.type === "video"

  // YouTube player control
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget

    const checkYT = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        new (window as any).YT.Player(iframe, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) setIsVideoPlaying(true) // playing
              if (event.data === 2 || event.data === 0) setIsVideoPlaying(false) // paused or ended
            },
          },
        })
      } else {
        setTimeout(checkYT, 100)
      }
    }

    checkYT()
  }

  return (
    <section
      id="achievements"
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto w-full text-center">
        {/* Title */}
        <div className="mt-8 mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Achievements
            </h2>
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <p className="text-white text-base md:text-lg">
            Our journey of excellence
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-8 h-[600px]">
          {slides[slide].map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el!
              }}
            >
              {isVideoSlide(item) ? (
                <div className="flex flex-col items-center w-[900px]">
                  <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      className="w-full h-full"
                      src={item.videoUrl}
                      title={item.title}
                      onLoad={handleIframeLoad}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-4 text-lg md:text-xl text-white font-semibold text-center drop-shadow-md">
                    Our achievements in ERC remote!
                  </p>
                </div>
              ) : (
                <TiltedCard
                  imageSrc={item.image}
                  captionText={item.title}
                  descriptionText={item.description}
                  containerWidth="400px"
                  containerHeight="600px"
                  imageWidth="400px"
                  imageHeight="380px"
                  rotateAmplitude={12}
                  scaleOnHover={1.06}
                  showTooltip={true}
                  showMobileWarning={false}
                />
              )}
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-white/30 rounded-full hover:bg-white/60 transition"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-white/30 rounded-full hover:bg-white/60 transition"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-3 rounded-full transition-all ${
                slide === i ? "w-8 bg-orange-500" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
