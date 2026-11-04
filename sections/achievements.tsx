"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type React from "react"
import { flushSync } from "react-dom"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { achievementsData, type Achievement } from "@/data/site-data"

// Types
type VideoSlide = {
  id: string
  type: "video"
  title: string
  caption: string
  videoId: string
}

type SlideItem = VideoSlide | Achievement

const isVideoSlide = (item: SlideItem): item is VideoSlide =>
  "type" in item && item.type === "video"

// Video stays the first slide
const videoSlide: VideoSlide = {
  id: "video-card",
  type: "video",
  title: "Watch Our Journey",
  caption: "Our achievements in ERC remote!",
  videoId: "AJn-8r4oSOY",
}

const slides: SlideItem[] = [videoSlide, ...achievementsData]
const slideCount = slides.length

// Last slide cloned at the front, first two at the end, so the loop always moves forward
const trackItems: SlideItem[] = [slides[slideCount - 1], ...slides, slides[0], slides[1]]

const AUTOPLAY_MS = 6000
const LOCK_MS = 900
const MAX_FRAME_DELTA_MS = 100
const SWIPE_THRESHOLD_PX = 40

const TRANSITION = "duration-[850ms] ease-[cubic-bezier(.65,.05,.25,1)] motion-reduce:transition-none"

const cardVisual = (offset: number) => {
  if (offset === 0) return { transform: "scale(1)", opacity: 1 }
  if (offset === 1) return { transform: "scale(0.94)", opacity: 0.55 }
  return { transform: "scale(0.92)", opacity: 0.3 }
}

function CardOverlay({ item }: { item: Achievement }) {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 to-transparent pointer-events-none" />
      <span className="absolute top-3 left-3 rounded-full border border-primary bg-black/60 px-3 py-1 text-[11px] tracking-[0.12em] text-primary">
        {item.badge}
      </span>
      <div className="absolute inset-x-4 bottom-3 text-left">
        <div className="flex items-baseline gap-2">
          <span className="text-[46px] font-medium leading-none text-primary">{item.rank}</span>
          <span className="text-xs text-zinc-300">{item.rankLabel}</span>
        </div>
        {item.award && <div className="mt-1 text-sm font-medium text-white">{item.award}</div>}
        <div className="mt-1 truncate text-xs text-zinc-300">{item.caption}</div>
      </div>
    </>
  )
}

export default function Achievements() {
  const [position, setPosition] = useState(1)
  const [isFocused, setIsFocused] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const positionRef = useRef(1)
  const lockedRef = useRef(false)
  const elapsedRef = useRef(0)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotionRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const activeIndex = (position - 1 + slideCount) % slideCount

  // After landing on a clone, silently jump to the real slide
  const settle = useCallback(() => {
    const current = positionRef.current
    let real = current
    if (current > slideCount) real = current - slideCount
    else if (current < 1) real = current + slideCount

    const track = trackRef.current
    if (real !== current && track) {
      track.classList.add("no-transition")
      positionRef.current = real
      flushSync(() => setPosition(real))
      void track.offsetHeight
      track.classList.remove("no-transition")
    }
    lockedRef.current = false
  }, [])

  const moveTo = useCallback(
    (target: number) => {
      if (lockedRef.current) return false
      lockedRef.current = true
      elapsedRef.current = 0
      positionRef.current = target
      setPosition(target)
      setIsVideoPlaying(false)
      settleTimerRef.current = setTimeout(settle, reducedMotionRef.current ? 0 : LOCK_MS)
      return true
    },
    [settle],
  )

  const handlePrev = () => moveTo(positionRef.current - 1)
  const handleNext = () => moveTo(positionRef.current + 1)

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return
    if (index === (activeIndex + 1) % slideCount) handleNext()
    else if (index === (activeIndex - 1 + slideCount) % slideCount) handlePrev()
    else moveTo(index + 1)
  }

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
    }
  }, [])

  // Respect prefers-reduced-motion
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      reducedMotionRef.current = query.matches
      setReducedMotion(query.matches)
    }
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  // Pause when off-screen
  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) setHasBeenInView(true)
      },
      { threshold: 0.25 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const isPaused = isFocused || isTouching || !isInView || reducedMotion || isVideoPlaying

  // Autoplay and progress bar
  useEffect(() => {
    if (isPaused) return
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      elapsedRef.current += Math.min(now - last, MAX_FRAME_DELTA_MS)
      last = now
      if (elapsedRef.current >= AUTOPLAY_MS && !moveTo(positionRef.current + 1)) {
        elapsedRef.current = AUTOPLAY_MS
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${elapsedRef.current / AUTOPLAY_MS})`
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isPaused, moveTo])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      handlePrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      handleNext()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current
    const touch = e.changedTouches[0]
    touchStartRef.current = null
    setIsTouching(false)
    if (!start || !touch) return
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) handleNext()
      else handlePrev()
    }
  }

  return (
    <section
      id="achievements"
      className="relative flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto w-full text-center pb-8 md:pb-16">
        {/* Title */}
        <div className="mt-4 mb-2 md:mt-8 md:mb-4">
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
        <div
          ref={rootRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Team achievements"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.matches(":focus-visible") && setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false)
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0]
            touchStartRef.current = { x: touch.clientX, y: touch.clientY }
            setIsTouching(true)
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => setIsTouching(false)}
          className="relative mt-4 rounded-[14px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <div className="relative">
            <div className="overflow-hidden touch-pan-y">
              <div
                ref={trackRef}
                className={`flex [--achievement-step:100%] min-[700px]:[--achievement-step:50%] transition-transform ${TRANSITION}`}
                style={{ transform: `translateX(calc(${-position} * var(--achievement-step)))` }}
              >
                {trackItems.map((item, trackIndex) => {
                  const offset = trackIndex - position
                  const isActive = offset === 0
                  const isVisible = isActive || offset === 1
                  const loadNow = hasBeenInView && offset >= -1 && offset <= 2

                  return (
                    <div
                      key={`${item.id}-${trackIndex}`}
                      aria-hidden={!isVisible}
                      className="w-full min-[700px]:w-1/2 shrink-0 px-2"
                    >
                      <div
                        style={cardVisual(offset)}
                        className={`relative aspect-[4/3] overflow-hidden rounded-[14px] border bg-zinc-950 transition-[transform,opacity,border-color] ${TRANSITION} ${isActive ? "border-primary" : "border-white/10"}`}
                      >
                        {isVideoSlide(item) ? (
                          isActive && isVideoPlaying ? (
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
                              title={item.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              <img
                                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                                alt={item.title}
                                loading={loadNow ? "eager" : "lazy"}
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 to-transparent pointer-events-none" />
                              <button
                                type="button"
                                onClick={() => setIsVideoPlaying(true)}
                                tabIndex={isActive ? 0 : -1}
                                aria-label={`Play video: ${item.title}`}
                                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-black/60 text-primary transition-opacity ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                              >
                                <Play className="h-6 w-6 translate-x-0.5" />
                              </button>
                              <div className="absolute inset-x-4 bottom-3 text-left">
                                <div className="text-2xl font-medium text-white">{item.title}</div>
                                <div className="mt-1 truncate text-xs text-zinc-300">{item.caption}</div>
                              </div>
                            </>
                          )
                        ) : (
                          <>
                            <img
                              src={item.image}
                              alt={item.title}
                              loading={loadNow ? "eager" : "lazy"}
                              decoding="async"
                              style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                              className={`absolute inset-0 w-full h-full ${item.imageFit === "contain" ? "object-contain object-top" : "object-cover"}`}
                            />
                            <CardOverlay item={item} />
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous achievement"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 min-[700px]:h-9 min-[700px]:w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:border-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next achievement"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 min-[700px]:h-9 min-[700px]:w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:border-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="mt-4 flex flex-wrap items-center justify-center">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}: ${item.title}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className="p-1.5"
              >
                {i === activeIndex ? (
                  <span className="block h-1.5 w-11 overflow-hidden rounded-full bg-white/15">
                    <span
                      ref={progressRef}
                      className="block h-full w-full origin-left rounded-full bg-primary"
                      style={{ transform: `scaleX(${reducedMotion ? 1 : 0})` }}
                    />
                  </span>
                ) : (
                  <span className="block h-1.5 w-1.5 rounded-full bg-white/30 transition-colors hover:bg-white/60" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
