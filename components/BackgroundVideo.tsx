"use client"

import { useEffect, useRef, useState } from "react"

type PlaybackStatus = "unknown" | "playing" | "blocked"

interface BackgroundVideoProps {
  src: string
  className?: string
}

export default function BackgroundVideo({ src, className = "" }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [status, setStatus] = useState<PlaybackStatus>("unknown")

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    if (prefersReducedMotion) {
      setStatus("blocked")
      return
    }

    const attemptPlay = async () => {
      try {
        const playResult = video.play()
        if (playResult && typeof playResult.then === "function") {
          await playResult
        }
        if (!cancelled) setStatus("playing")
      } catch {
        if (!cancelled) setStatus("blocked")
      }
    }

    attemptPlay()

    const handlePlay = () => {
      if (!cancelled) setStatus("playing")
    }

    const handleError = () => {
      if (!cancelled) setStatus("blocked")
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("error", handleError)

    return () => {
      cancelled = true
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("error", handleError)
    }
  }, [src])

  if (status === "blocked") {
    return (
      <div
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none ${className}`}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      className={`fixed inset-0 w-full h-full z-0 overflow-hidden object-cover pointer-events-none transition-opacity duration-300 ${status === "playing" ? "opacity-100" : "opacity-0"
        } ${className}`}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
