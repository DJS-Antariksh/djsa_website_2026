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
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [slide, setSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const playerRef = useRef<any>(null) // To store YT Player instance

  // Keep the ref updated for closure access
  const isVideoPlayingRef = useRef(isVideoPlaying)
  useEffect(() => {
    isVideoPlayingRef.current = isVideoPlaying
  }, [isVideoPlaying])

  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches) // or window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reset slide index when view mode changes to avoid out-of-bounds
  useEffect(() => {
    setSlide(0)
  }, [isMobile])

  // Video as first slide
  const videoSlide: VideoSlide = useMemo(
    () => ({
      id: "video-card",
      type: "video",
      title: "Watch Our Journey",
      videoUrl:
        "https://www.youtube.com/embed/AJn-8r4oSOY",
    }),
    []
  )

  // Build slides
  const slides: SlideItem[][] = useMemo(() => {
    const arr: SlideItem[][] = [[videoSlide]]
    if (isMobile) {
      // Mobile: 1 item per slide
      for (let i = 0; i < achievementsData.length; i++) {
        arr.push([achievementsData[i]])
      }
    } else {
      // Desktop: 2 items per slide
      for (let i = 0; i < achievementsData.length; i += 2) {
        arr.push([
          achievementsData[i],
          achievementsData[i + 1] ?? achievementsData[0],
        ])
      }
    }
    return arr
  }, [videoSlide, isMobile])

  // Load YouTube IFrame API
  useEffect(() => {
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.id = "youtube-iframe-api"
      document.body.appendChild(tag)
    }
  }, [])

  // Standard Autoplay: only runs if we are NOT on the video slide (or if video is done)
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    // Only autoplay if we are allowed to (meaning the "intro video" phase is complete)
    intervalRef.current = setInterval(() => {
      // If video is currently playing, don't swap slides (safety check)
      if (!isVideoPlayingRef.current) {
        setSlide((prev) => (prev + 1) % slides.length)
      }
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  // Effect: Handle Video Trigger (No Scroll Lock)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // If >60% visible and we haven't done the "Hero Moment" yet
        if (entry.isIntersecting && !hasPlayedVideo) {

          // Play Video (if player ready)
          // We wait a beat for smoothness, then play
          setTimeout(() => {
            if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
              playerRef.current.playVideo()
            }
          }, 800)
        }
      },
      { threshold: 0.6 } // High threshold to ensure we are mostly seeing it
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasPlayedVideo])


  // Unlock function
  const unlockAndProceed = () => {
    setHasPlayedVideo(true)

    // Move to next slide
    setSlide((prev) => (prev + 1) % slides.length)

    // Start the regular carousel logic
    startAutoplay()
  }


  // GSAP animation for cards
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

  // Lifecycle for autoplay: ONLY start it if we have ALREADY played the video (or if we skipped it)
  // Initially, we do NOT want autoplay to run, because we want to force focus on the video.
  useEffect(() => {
    if (hasPlayedVideo) {
      startAutoplay()
    }
    return () => stopAutoplay()
  }, [hasPlayedVideo, slides.length])


  // Navigation handlers
  const handlePrev = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length)
    if (hasPlayedVideo) startAutoplay()
  }

  const handleNext = () => {
    // If we are currently locked on the video, clicking Next should unlock us.
    if (!hasPlayedVideo) {
      unlockAndProceed()
      return
    }

    setSlide((prev) => (prev + 1) % slides.length)
    startAutoplay()
  }

  const handleDotClick = (index: number) => {
    // If we jump dots while locked, we should probably unlock or treat it as "skipped"
    if (!hasPlayedVideo) {
      unlockAndProceed()
      // We do unlockAndProceed which moves to prev+1. But here we want specific index.
      // So we just override it after:
      setTimeout(() => setSlide(index), 0)
      return
    }

    setSlide(index)
    startAutoplay()
  }

  // Type guard
  const isVideoSlide = (item: SlideItem): item is VideoSlide =>
    "type" in item && item.type === "video"

  // YouTube player control
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget

    const checkYT = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        // Store player instance
        playerRef.current = new (window as any).YT.Player(iframe, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) setIsVideoPlaying(true) // playing
              if (event.data === 2) setIsVideoPlaying(false) // paused
              if (event.data === 0) { // ended
                setIsVideoPlaying(false)
                // Video finished! Unlock and go next.
                if (!hasPlayedVideo) {
                  unlockAndProceed()
                }
              }
            },
            onReady: (event: any) => {
              // Player is ready
            }
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
      ref={sectionRef}
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto w-full text-center pb-24">
        {/* Title */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-center gap-4 mb-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">
              Our Achievements
            </h2>
          </div>
          <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="text-white text-base md:text-lg">
            Our journey of excellence
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-8 h-[500px]">
          {slides[slide].map((item, i) => (
            <div
              key={item.id}
              className="w-[300px] md:w-[600px] aspect-[300/250] md:aspect-[600/400]"
              ref={(el) => {
                cardRefs.current[i] = el!
              }}
            >
              {isVideoSlide(item) ? (
                <div className="flex flex-col items-center w-full max-w-[1100px] px-2 md:px-0">
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                    {/* Note: Added origin to enable JS API in some cases if domain restricted, usually fine local */}
                    <iframe
                      id="achievements-video-iframe"
                      className="w-full h-full"
                      src={`${item.videoUrl}${item.videoUrl.includes('?') ? '&' : '?'}enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                      title={item.title}
                      onLoad={handleIframeLoad}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-4 text-sm md:text-xl text-white font-semibold text-center drop-shadow-md">
                    Our achievements in ERC remote!
                  </p>
                </div>
              ) : (
                <TiltedCard
                  imageSrc={item.image}
                  captionText={item.title}
                  descriptionText={item.description}
                  containerWidth="100%"
                  containerHeight="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.06}
                  showTooltip={true}
                />
              )}
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-[-60px] top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/30 rounded-full hover:bg-white/60 transition z-50"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-black" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-[-60px] top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/30 rounded-full hover:bg-white/60 transition z-50"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-black" />
          </button>

        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-wrap justify-center gap-2 md:gap-4 w-full px-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-3 rounded-full transition-all ${slide === i ? "w-8 bg-primary" : "w-3 bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
