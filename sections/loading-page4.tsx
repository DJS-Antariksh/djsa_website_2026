"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Footprint = { x: number; y: number; heading: number; life: number }

interface LoaderProps {
  isLoading: boolean
  onLoadingComplete?: () => void
}

// Simple lemniscate (∞) path helper
const getLemniscatePoint = (a: number, t: number) => {
  const denom = 1 + Math.sin(t) * Math.sin(t)
  const x = (a * Math.SQRT2 * Math.cos(t)) / denom
  const y = (a * Math.SQRT2 * Math.cos(t) * Math.sin(t)) / denom
  return { x, y }
}

export default function LoadingPage4({ isLoading, onLoadingComplete }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prevTimeRef = useRef<number | null>(null)
  const tRef = useRef(0) // param along the lemniscate
  const [showLoader, setShowLoader] = useState(isLoading)

  useEffect(() => {
    setShowLoader(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (!showLoader) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Reset animation clock whenever the loader re-mounts
    prevTimeRef.current = null
    tRef.current = 0


    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Offscreen background for efficiency
    const bgCanvas = document.createElement("canvas")
    const bgCtx = bgCanvas.getContext("2d")
    const footprintCap = 400

    let animationId: number | null = null
    let lastPrintTime = 0
    const footprints: Footprint[] = []

    const renderBackground = () => {
      if (!bgCtx) return
      bgCanvas.width = width
      bgCanvas.height = height

      // Base black background
      bgCtx.fillStyle = "#000000"
      bgCtx.fillRect(0, 0, width, height)

      // Central brown gradient circle fading to black
      const radius = Math.min(width, height) * 0.55
      const grad = bgCtx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius)
      grad.addColorStop(0, "#7a3f2a")
      grad.addColorStop(0.6, "#5b2f22")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      bgCtx.fillStyle = grad
      bgCtx.beginPath()
      bgCtx.arc(width / 2, height / 2, radius, 0, Math.PI * 2)
      bgCtx.fill()
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      renderBackground()
    }

    window.addEventListener("resize", handleResize)

    renderBackground()

    const drawBackground = () => {
      if (bgCtx) {
        ctx.drawImage(bgCanvas, 0, 0)
      }
    }

    const drawFootprints = (centerX: number, centerY: number) => {
      for (const fp of footprints) {
        ctx.save()
        ctx.globalAlpha = fp.life * 0.5
        ctx.translate(centerX + fp.x, centerY + fp.y)
        ctx.rotate(fp.heading)
        ctx.fillStyle = "rgba(255,255,255,0.35)"
        ctx.fillRect(-10, -3, 20, 6)
        ctx.fillRect(-10, 5, 20, 6)
        ctx.restore()
      }
      
    }

    const drawRover = (centerX: number, centerY: number, x: number, y: number, heading: number) => {
      ctx.save()
      ctx.translate(centerX + x, centerY + y)
      // Base rover is drawn facing "up" (-Y); rotate to align with travel direction
      ctx.rotate(heading + Math.PI / 2)

      // Body shell
      ctx.fillStyle = "#f4f4f4"
      ctx.strokeStyle = "rgba(0,0,0,0.25)"
      ctx.lineWidth = 2
      ctx.fillRect(-30, -40, 60, 80)
      ctx.strokeRect(-30, -40, 60, 80)

      // Solar panel details
      ctx.fillStyle = "#d8e5ff"
      ctx.fillRect(-22, -10, 44, 20)
      ctx.fillStyle = "#c7d6f5"
      ctx.fillRect(-22, 12, 44, 10)

      // Wheels with treads
      ctx.fillStyle = "#d9d9d9"
      const wheel = (wx: number, wy: number) => {
        ctx.save()
        ctx.translate(wx, wy)
        ctx.fillRect(-12, -16, 24, 32)
        ctx.fillStyle = "#c0c0c0"
        ctx.fillRect(-12, -2, 24, 4)
        ctx.restore()
      }
      wheel(-40, -44)
      wheel(40, -44)
      wheel(-40, 44)
      wheel(40, 44)

      // Mast and sensors
      ctx.fillStyle = "#e6e6e6"
      ctx.fillRect(-8, -50, 16, 22)
      ctx.fillRect(-4, -76, 8, 28)
      ctx.beginPath()
      ctx.arc(0, -80, 6, 0, Math.PI * 2)
      ctx.fillStyle = "#fefefe"
      ctx.fill()

      // Manipulator arm
      ctx.fillStyle = "#dedede"
      ctx.fillRect(-18, -30, 8, -36)
      ctx.fillRect(-22, -70, 16, 10)

      ctx.restore()
    }

    const loop = (now: number) => {
      const prevTime = prevTimeRef.current
      prevTimeRef.current = now

      // delta in seconds
      const delta = prevTime ? (now - prevTime) / 1000 : 0
      const speed = (2 * Math.PI) / 7.3 // even slower glide (period ~2600ms)

      tRef.current += speed * delta
      const tau = Math.PI * 2
      if (tRef.current > tau) {
        tRef.current -= tau
      }

      const centerX = width / 2
      const centerY = height / 2
      const a = Math.min(width, height) * 0.18

      drawBackground()
      const deltaT = 0.006
      const t = tRef.current
      const { x, y } = getLemniscatePoint(a, t)
      const { x: x2, y: y2 } = getLemniscatePoint(a, (t + deltaT) % (Math.PI * 2))
      const heading = Math.atan2(y2 - y, x2 - x)

      // Seed initial tracks so they appear immediately
      if (footprints.length === 0) {
        const normalX = -Math.sin(heading)
        const normalY = Math.cos(heading)
        const offset = 36
        footprints.push({ x: x + normalX * offset, y: y + normalY * offset, heading, life: 1 })
        footprints.push({ x: x - normalX * offset, y: y - normalY * offset, heading, life: 1 })
        lastPrintTime = now
      }

      if (now - lastPrintTime > 60) {
        // Two wheel tracks with slight lateral offset
        const normalX = -Math.sin(heading)
        const normalY = Math.cos(heading)
        const offset = 36
        footprints.push({ x: x + normalX * offset, y: y + normalY * offset, heading, life: 1 })
        footprints.push({ x: x - normalX * offset, y: y - normalY * offset, heading, life: 1 })
        if (footprints.length > footprintCap) {
          footprints.splice(0, footprints.length - footprintCap)
        }
        lastPrintTime = now
      }

      drawFootprints(centerX, centerY)
      drawRover(centerX, centerY, x, y, heading)

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [showLoader])

  return (
    <AnimatePresence onExitComplete={onLoadingComplete}>
      {showLoader && (
        <motion.div
          key="rover-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[60] bg-black"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
