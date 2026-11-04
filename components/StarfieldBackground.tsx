"use client"

import { useEffect, useRef } from "react"

interface StarfieldBackgroundProps {
  className?: string
  /**
   * Approximate number of stars on a 1920x1080 viewport.
   * Scaled up/down with the viewport area and clamped for performance.
   */
  density?: number
  /** Forward speed of the stars, in CSS pixels per second. */
  speed?: number
}

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
  color: string
  size: number
  brightness: number
}

const STAR_COLORS = [
  "rgb(255, 255, 255)", // white
  "rgb(255, 251, 234)", // warm white
  "rgb(198, 238, 238)", // cyan
  "rgb(202, 208, 255)", // blueish
]

const MAX_DPR = 2
const FOV = 320
const REFERENCE_AREA = 1920 * 1080

export default function StarfieldBackground({
  className = "",
  density = 1100,
  speed = 120,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    let reduceMotion = motionQuery?.matches ?? false

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    let stars: Star[] = []
    let frameId = 0
    let lastTime = 0
    let resizePending = false

    const starCount = () => {
      const scaled = density * ((width * height) / REFERENCE_AREA)
      const max = width < 768 ? 650 : 1800
      return Math.round(Math.min(max, Math.max(250, scaled)))
    }

    const spawnStar = (z: number): Star => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z,
      prevZ: z,
      color: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
      size: Math.random() * 1.6 + 0.2,
      brightness: 0.35 + Math.random() * 0.5,
    })

    const syncStarCount = () => {
      const target = starCount()
      while (stars.length < target) {
        stars.push(spawnStar(width + Math.random() * width * 0.5))
      }
      if (stars.length > target) stars.length = target
    }

    const resize = () => {
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight

      // Keep the existing distribution proportional instead of re-seeding.
      if (width > 0 && height > 0) {
        const scaleX = nextWidth / width
        const scaleY = nextHeight / height
        for (const star of stars) {
          star.x *= scaleX
          star.y *= scaleY
        }
      }

      width = nextWidth
      height = nextHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      syncStarCount()
    }

    const drawStaticField = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        // Uniform placement across the screen (no perspective) for a calm,
        // non-moving starfield when the user prefers reduced motion.
        const x = (star.x + width) / 2
        const y = (star.y + height) / 2
        const radius = Math.max(0.4, Math.min(1.6, star.size * 0.8))

        ctx.globalAlpha = star.brightness
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    const drawFrame = (now: number) => {
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0
      lastTime = now
      const travel = speed * delta

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const farPlane = width * 1.5

      ctx.lineCap = "round"

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.prevZ = star.z
        star.z -= travel

        // Recycle stars that pass the camera out to the far plane.
        if (star.z <= 1) {
          const fresh = spawnStar(width + Math.random() * width * 0.5)
          star.x = fresh.x
          star.y = fresh.y
          star.z = fresh.z
          star.prevZ = fresh.z
          star.color = fresh.color
          star.size = fresh.size
          star.brightness = fresh.brightness
          continue
        }

        const scale = FOV / star.z
        const prevScale = FOV / (star.prevZ || star.z)

        const x = star.x * scale + centerX
        const y = star.y * scale + centerY

        // Soft cull with a margin so trails leaving the screen still render.
        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) continue

        const px = star.x * prevScale + centerX
        const py = star.y * prevScale + centerY

        // Fade in from the far plane and fade out just before the camera.
        const depth = Math.max(0, Math.min(1, 1 - star.z / farPlane))
        const nearFade = Math.min(1, star.z / 80)
        const alpha = Math.max(0.05, depth * nearFade * 0.9)

        ctx.globalAlpha = alpha
        ctx.strokeStyle = star.color
        ctx.lineWidth = Math.max(0.6, Math.min(2.2, scale * star.size * 0.6))

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      drawFrame(now)
      frameId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (frameId || reduceMotion || document.hidden) return
      lastTime = 0
      frameId = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (!frameId) return
      cancelAnimationFrame(frameId)
      frameId = 0
    }

    const handleResize = () => {
      if (resizePending) return
      resizePending = true
      requestAnimationFrame(() => {
        resizePending = false
        resize()
        if (reduceMotion) drawStaticField()
      })
    }

    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    const handleMotionPreference = () => {
      reduceMotion = motionQuery?.matches ?? false
      if (reduceMotion) {
        stop()
        drawStaticField()
      } else {
        start()
      }
    }

    // Initial setup
    resize()
    if (reduceMotion) drawStaticField()
    else start()

    window.addEventListener("resize", handleResize)
    document.addEventListener("visibilitychange", handleVisibility)
    motionQuery?.addEventListener("change", handleMotionPreference)

    return () => {
      stop()
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibility)
      motionQuery?.removeEventListener("change", handleMotionPreference)
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 z-0 h-full w-full bg-black pointer-events-none ${className}`}
    />
  )
}
