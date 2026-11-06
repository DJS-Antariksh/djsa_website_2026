"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Heart,
  House,
  MessageCircle,
  Search,
  Send,
  SquarePlus,
} from "lucide-react"
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL, instagramPosts } from "@/data/site-data"

const MAX_POSTS = 6
const AUTOPLAY_MS = 4000
const SWIPE_THRESHOLD_PX = 40
const AVATAR_SRC = "/brand/AntarikshLogo.png"

const TRANSITION =
  "transition-[transform,opacity,filter] duration-[700ms] ease-[cubic-bezier(.65,.05,.25,1)] motion-reduce:transition-none"

// Post width: big enough that only one post and its neighbours are on screen, and
// capped by screen height so the whole post (header to bottom nav) fits in one view.
// 260px leaves room for the post header, footer and a little breathing space.
const POST_WIDTH = "min(78vw, 360px, calc((100svh - 260px) * 0.8))"

// Depth, matching the About carousel: side posts sit further back, turn towards the
// centre, and are darker and slightly blurred
const DEPTH_PX = 160
const TILT_DEG = 20
const SIDE_BRIGHTNESS = 0.5
const SIDE_BLUR_PX = 2

const tileStyle = (offset: number): React.CSSProperties => {
  if (offset === 0) {
    return { transform: "translateX(0) translateZ(0) rotateY(0deg)", opacity: 1, filter: "brightness(1) blur(0px)", zIndex: 2 }
  }
  const isSide = Math.abs(offset) === 1
  return {
    transform: `translateX(${offset * 100}%) translateZ(-${DEPTH_PX}px) rotateY(${-Math.sign(offset) * TILT_DEG}deg)`,
    opacity: isSide ? 1 : 0,
    filter: `brightness(${SIDE_BRIGHTNESS}) blur(${SIDE_BLUR_PX}px)`,
    zIndex: 1,
  }
}

const posts = instagramPosts.slice(0, MAX_POSTS)
const postCount = posts.length
const half = Math.floor(postCount / 2)

// Signed distance on a loop, e.g. with 6 posts: -3..2
const wrap = (d: number) => ((((d % postCount) + postCount + half) % postCount) - half)

const iconProps = { size: 22, strokeWidth: 1.75, "aria-hidden": true } as const

function Avatar({ size }: { size: number }) {
  return (
    <img
      src={AVATAR_SRC}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full bg-white object-contain ring-1 ring-white/20"
      style={{ width: size, height: size }}
    />
  )
}

export default function Instagram() {
  // `from` is the previous index, used to spot the post that wraps around the loop
  const [{ index, from }, setSlide] = useState({ index: 0, from: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [isPageHidden, setIsPageHidden] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const isHeadingInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const isNearView = useInView(sectionRef, { once: true, margin: "400px" })
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const reducedMotion = useReducedMotion()

  const go = useCallback((delta: number) => {
    if (postCount < 2) return
    setSlide((s) => ({ index: (s.index + delta + postCount) % postCount, from: s.index }))
  }, [])

  const goTo = (target: number) => go(wrap(target - index))

  useEffect(() => {
    const update = () => setIsPageHidden(document.hidden)
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  const isPaused = isHovered || isFocused || isTouching || !isInView || isPageHidden || !!reducedMotion

  // Autoplay: restarts after every slide change
  useEffect(() => {
    if (isPaused || postCount < 2) return
    const timer = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [index, isPaused, go])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(-1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      go(1)
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
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }

  if (postCount === 0) return null

  const steps = wrap(index - from)
  const active = posts[index]

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="relative overflow-hidden px-4 pt-10 pb-24 md:px-8 md:pt-14 md:pb-28 lg:px-16"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center md:mb-8"
        >
          <h2 className="mb-1 text-2xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Follow Our Journey
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Life at DJS Antariksh, on Instagram</p>
        </motion.div>

        {/* Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Instagram posts"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={(e) => e.target.matches(":focus-visible") && setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false)
          }}
          className="rounded-[14px] font-sans text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary"
          style={{ "--post-w": POST_WIDTH } as React.CSSProperties}
        >
          {/* Post header */}
          <div className="mx-auto flex w-[var(--post-w)] items-center gap-3 rounded-t-[14px] border border-b-0 border-white/10 bg-black px-3 py-2.5">
            <Avatar size={32} />
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold hover:text-white/80"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <Ellipsis {...iconProps} size={20} className="ml-auto text-white/90" />
          </div>

          {/* Photo strip: the centre post sits inside the post frame, neighbours run off to the sides */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            <div
              className="relative mx-auto aspect-[4/5] w-[var(--post-w)] touch-pan-y [perspective:1400px]"
              onTouchStart={(e) => {
                const touch = e.touches[0]
                touchStartRef.current = { x: touch.clientX, y: touch.clientY }
                setIsTouching(true)
              }}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => setIsTouching(false)}
            >
              {posts.map((post, i) => {
                const offset = wrap(i - index)
                const prevOffset = wrap(i - from)
                // The post that loops from one end to the other jumps instead of sliding across
                const wrapped = offset - prevOffset !== -steps
                const isActive = offset === 0
                const isSide = Math.abs(offset) === 1
                const image = isNearView && (
                  <img
                    src={post.mediaUrl}
                    alt={isActive ? post.alt : ""}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )

                return (
                  <div
                    key={post.id}
                    aria-hidden={!isActive}
                    onClick={isSide ? () => go(offset) : undefined}
                    className={`absolute inset-0 overflow-hidden bg-zinc-900 ${wrapped ? "transition-none" : TRANSITION} ${isSide ? "cursor-pointer" : ""}`}
                    style={tileStyle(offset)}
                  >
                    {isActive ? (
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open post on Instagram: ${post.caption}`}
                        className="absolute inset-0"
                      >
                        {image}
                      </a>
                    ) : (
                      image
                    )}
                  </div>
                )
              })}

              {postCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous post"
                    className="absolute left-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black transition-colors hover:bg-white md:flex"
                  >
                    <ChevronLeft size={16} strokeWidth={2.25} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next post"
                    className="absolute right-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black transition-colors hover:bg-white md:flex"
                  >
                    <ChevronRight size={16} strokeWidth={2.25} aria-hidden />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Post footer */}
          <div className="mx-auto w-[var(--post-w)] overflow-hidden rounded-b-[14px] border border-t-0 border-white/10 bg-black">
            {/* Action row: icons left, position dots centred, save right */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center px-3 pt-3">
              <div className="flex items-center gap-4">
                <Heart {...iconProps} />
                <MessageCircle {...iconProps} className="-scale-x-100" />
                <Send {...iconProps} />
              </div>
              <div className="flex items-center">
                {postCount > 1 &&
                  posts.map((post, i) => (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to post ${i + 1} of ${postCount}`}
                      aria-current={i === index ? "true" : undefined}
                      className="p-[3px]"
                    >
                      <span
                        className={`block h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-white/30"}`}
                      />
                    </button>
                  ))}
              </div>
              <Bookmark {...iconProps} className="justify-self-end" />
            </div>

            {/* Caption */}
            <p className="line-clamp-2 min-h-[50px] px-3 pt-2.5 text-[13px] leading-5">
              <span className="font-semibold">{INSTAGRAM_HANDLE}</span>{" "}
              <span className="text-white/85">{active.caption}</span>
            </p>

            {/* Bottom navigation */}
            <div aria-hidden className="mt-3 flex items-center justify-around border-t border-white/10 py-2.5">
              <House {...iconProps} />
              <Search {...iconProps} />
              <SquarePlus {...iconProps} />
              <Heart {...iconProps} />
              <Avatar size={24} />
            </div>
          </div>
        </div>

        {/* Follow link */}
        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-primary px-5 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            Follow @{INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  )
}
