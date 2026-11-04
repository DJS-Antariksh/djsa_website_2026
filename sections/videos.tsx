"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { videosData } from "@/data/site-data"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

interface YouTubePlayer {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getCurrentTime: () => number
  getPlayerState: () => number
  destroy: () => void
}

interface YouTubeEvent {
  data: number
  target: YouTubePlayer
}

interface YouTubeAPI {
  Player: new (
    element: HTMLElement,
    options: {
      events: {
        onReady: (event: { target: YouTubePlayer }) => void
        onStateChange: (event: YouTubeEvent) => void
      }
      playerVars?: Record<string, number | string>
    }
  ) => YouTubePlayer
}

declare global {
  interface Window {
    YT?: YouTubeAPI
    onYouTubeIframeAPIReady?: () => void
  }
}

interface VideoMemory {
  time: number
  hasPlayed: boolean
  shouldResume: boolean
  manuallyPaused: boolean
}

const createVideoMemory = (): Record<string, VideoMemory> =>
  Object.fromEntries(
    videosData.map((video) => [
      video.id,
      {
        time: 0,
        hasPlayed: false,
        shouldResume: false,
        manuallyPaused: false,
      },
    ])
  )

let youtubeApiPromise: Promise<YouTubeAPI> | null = null

function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires a browser"))
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT)
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.()

      if (window.YT?.Player) {
        resolve(window.YT)
      } else {
        youtubeApiPromise = null
        reject(new Error("YouTube API did not initialise"))
      }
    }

    let script = document.getElementById(
      "youtube-iframe-api"
    ) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement("script")
      script.id = "youtube-iframe-api"
      script.src = "https://www.youtube.com/iframe_api"
      script.async = true

      script.onerror = () => {
        youtubeApiPromise = null
        reject(new Error("YouTube API failed to load"))
      }

      document.head.appendChild(script)
    }
  })

  return youtubeApiPromise
}

function isUsablePlayer(
  player: YouTubePlayer | undefined
): player is YouTubePlayer {
  return Boolean(
    player &&
      typeof player.playVideo === "function" &&
      typeof player.pauseVideo === "function" &&
      typeof player.seekTo === "function" &&
      typeof player.getCurrentTime === "function" &&
      typeof player.getPlayerState === "function"
  )
}

export default function Videos() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const isInView = useInView(sectionRef, {
    margin: "-100px",
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)

  const [readyPlayers, setReadyPlayers] = useState<
    Record<string, boolean>
  >({})

  const [startedVideos, setStartedVideos] = useState<
    Record<string, boolean>
  >({})

  const players = useRef<Record<string, YouTubePlayer>>({})
  const iframeRefs = useRef<
    Record<string, HTMLIFrameElement | null>
  >({})

  const activeIndexRef = useRef(0)
  const isPlayingRef = useRef(false)
  const manuallyPausedRef = useRef(false)

  const pendingPlayRef = useRef<string | null>(null)
  const pendingResumeRef = useRef<string | null>(null)

  // Pauses caused by carousel navigation are not manual pauses.
  const switchingVideosRef = useRef<Record<string, boolean>>({})

  // Each video retains its own playback history.
  const videoMemory = useRef<Record<string, VideoMemory>>(
    createVideoMemory()
  )

  const videoCount = videosData.length

  const updatePlaybackState = useCallback(
    (playing: boolean, paused: boolean) => {
      isPlayingRef.current = playing
      manuallyPausedRef.current = paused

      setIsPlaying(playing)
      setManuallyPaused(paused)
    },
    []
  )

  // Initialise each YouTube player only once it is ready.
  useEffect(() => {
    let cancelled = false
    const createdPlayers: YouTubePlayer[] = []

    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled) return

        videosData.forEach((video, index) => {
          const iframe = iframeRefs.current[video.id]

          if (!iframe || players.current[video.id]) return

          const player = new YT.Player(iframe, {
            playerVars: {
              enablejsapi: 1,
              playsinline: 1,
              autoplay: 0,
              rel: 0,
            },

            events: {
              onReady: (event) => {
                if (cancelled) {
                  event.target.destroy()
                  return
                }

                players.current[video.id] = event.target
                createdPlayers.push(event.target)

                setReadyPlayers((current) => ({
                  ...current,
                  [video.id]: true,
                }))

                const memory = videoMemory.current[video.id]

                if (
                  pendingResumeRef.current === video.id &&
                  activeIndexRef.current === index
                ) {
                  pendingResumeRef.current = null

                  if (memory.shouldResume && !memory.manuallyPaused) {
                    if (memory.time > 0) {
                      event.target.seekTo(memory.time, true)
                    }

                    event.target.playVideo()
                  }
                }

                if (pendingPlayRef.current === video.id) {
                  pendingPlayRef.current = null

                  if (activeIndexRef.current === index) {
                    event.target.playVideo()
                  }
                }
              },

              onStateChange: (event) => {
                if (cancelled) return

                const memory = videoMemory.current[video.id]

                if (event.data === 1) {
                  memory.hasPlayed = true
                  memory.shouldResume = true
                  memory.manuallyPaused = false

                  setStartedVideos((current) => ({
                    ...current,
                    [video.id]: true,
                  }))

                  if (activeIndexRef.current === index) {
                    updatePlaybackState(true, false)
                  }
                }

                if (event.data === 2) {
                  if (switchingVideosRef.current[video.id]) {
                    switchingVideosRef.current[video.id] = false
                    return
                  }

                  memory.time = event.target.getCurrentTime()
                  memory.shouldResume = false
                  memory.manuallyPaused = true

                  if (activeIndexRef.current === index) {
                    updatePlaybackState(false, true)
                  }
                }

                if (event.data === 0) {
                  memory.time = 0
                  memory.shouldResume = false
                  memory.manuallyPaused = false

                  if (activeIndexRef.current === index) {
                    updatePlaybackState(false, false)
                  }
                }
              },
            },
          })

          void player
        })
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("YouTube player initialisation failed:", error)
        }
      })

    return () => {
      cancelled = true

      createdPlayers.forEach((player) => {
        if (isUsablePlayer(player)) {
          player.destroy()
        }
      })

      Object.keys(players.current).forEach((id) => {
        delete players.current[id]
      })
    }
  }, [updatePlaybackState])

  // Safely pause a video before moving away from it.
  const pauseBeforeSwitch = useCallback((videoId: string) => {
    const player = players.current[videoId]
    const memory = videoMemory.current[videoId]

    if (!isUsablePlayer(player) || !memory) return

    let state = -1

    try {
      state = player.getPlayerState()
    } catch {
      return
    }

    if (state !== 1) return

    try {
      memory.time = player.getCurrentTime()
      memory.shouldResume = true

      switchingVideosRef.current[videoId] = true
      player.pauseVideo()
    } catch (error) {
      switchingVideosRef.current[videoId] = false
      console.error("Could not pause YouTube video:", error)
    }
  }, [])

  // Manual selection can resume a previously playing video.
  // Automatic rotation never starts or resumes a video.
  const selectVideo = useCallback(
    (index: number, source: "manual" | "automatic" = "manual") => {
      if (index < 0 || index >= videoCount) return
      if (index === activeIndexRef.current) return

      const previousVideo = videosData[activeIndexRef.current]
      const nextVideo = videosData[index]

      if (previousVideo) {
        pauseBeforeSwitch(previousVideo.id)
      }

      activeIndexRef.current = index
      setActiveIndex(index)

      pendingPlayRef.current = null
      pendingResumeRef.current = null

      const memory = videoMemory.current[nextVideo.id]

      if (source === "automatic") {
        updatePlaybackState(false, false)
        return
      }

      if (memory.manuallyPaused) {
        updatePlaybackState(false, true)
        return
      }

      if (memory.shouldResume && memory.hasPlayed) {
        const player = players.current[nextVideo.id]

        if (isUsablePlayer(player)) {
          try {
            if (memory.time > 0) {
              player.seekTo(memory.time, true)
            }

            player.playVideo()
          } catch (error) {
            console.error("Could not resume YouTube video:", error)
            updatePlaybackState(false, false)
          }
        } else {
          pendingResumeRef.current = nextVideo.id
          updatePlaybackState(false, false)
        }

        return
      }

      updatePlaybackState(false, false)
    },
    [pauseBeforeSwitch, updatePlaybackState, videoCount]
  )

  // Rotate every five seconds only when the section is visible
  // and the active video is neither playing nor manually paused.
  useEffect(() => {
    if (!isInView || videoCount <= 1) return
    if (isPlaying || manuallyPaused) return

    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndexRef.current + 1) % videoCount
      selectVideo(nextIndex, "automatic")
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [
    activeIndex,
    isInView,
    isPlaying,
    manuallyPaused,
    selectVideo,
    videoCount,
  ])

  // Pause active playback when the section leaves the screen.
  useEffect(() => {
    if (isInView) return

    const activeVideo = videosData[activeIndexRef.current]

    if (!activeVideo) return

    const player = players.current[activeVideo.id]
    const memory = videoMemory.current[activeVideo.id]

    if (!isUsablePlayer(player)) return

    try {
      if (player.getPlayerState() === 1) {
        memory.time = player.getCurrentTime()
        memory.shouldResume = true
        memory.manuallyPaused = false

        switchingVideosRef.current[activeVideo.id] = true
        player.pauseVideo()

        updatePlaybackState(false, false)
      }
    } catch (error) {
      console.error("Could not pause video after leaving section:", error)
    }
  }, [isInView, updatePlaybackState])

  // User explicitly pressed Play.
  const startVideo = useCallback(
    (videoId: string) => {
      const memory = videoMemory.current[videoId]
      const player = players.current[videoId]

      if (!memory || activeIndexRef.current < 0) return

      memory.manuallyPaused = false
      memory.shouldResume = true

      updatePlaybackState(true, false)

      if (isUsablePlayer(player)) {
        try {
          if (memory.time > 0) {
            player.seekTo(memory.time, true)
          }

          player.playVideo()
        } catch (error) {
          console.error("Could not start YouTube video:", error)
          updatePlaybackState(false, false)
        }
      } else {
        pendingPlayRef.current = videoId
      }
    },
    [updatePlaybackState]
  )

  const getRelativePosition = (index: number) => {
    let position = index - activeIndex

    if (position > videoCount / 2) {
      position -= videoCount
    }

    if (position < -videoCount / 2) {
      position += videoCount
    }

    return position
  }

  const handlePrev = () => {
    if (videoCount <= 1) return

    const previousIndex =
      (activeIndexRef.current - 1 + videoCount) % videoCount

    selectVideo(previousIndex, "manual")
  }

  const handleNext = () => {
    if (videoCount <= 1) return

    const nextIndex =
      (activeIndexRef.current + 1) % videoCount

    selectVideo(nextIndex, "manual")
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : ""

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="relative overflow-hidden bg-gradient-to-b from-muted/20 to-background px-4 py-12 md:-mt-20 md:px-8 md:py-16 lg:px-16"
    >
      <div className="absolute inset-0 stars-bg opacity-20" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2
            className="mb-1 text-2xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Videos
          </h2>

          <div className="mx-auto mt-2 h-1 w-24 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

          <p className="mt-2 text-sm text-muted-foreground">
            Watch our journey unfold
          </p>
        </motion.div>

        {videoCount > 0 ? (
          <>
            {/* Carousel and navigation wrapper */}
            <div className="relative mx-auto w-full max-w-4xl">

              {/* Desktop Left Arrow */}
              {videoCount > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous video"
                  className="hidden md:flex absolute left-2 lg:left-[-3rem] 2xl:left-[-17rem] top-[225px] -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Desktop Right Arrow */}
              {videoCount > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next video"
                  className="hidden md:flex absolute right-2 lg:right-[-3rem] 2xl:right-[-17rem] top-[225px] -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Carousel */}
              <div
                className="relative mx-auto h-[310px] w-full sm:h-[380px] md:h-[450px]"
                style={{ perspective: "1400px" }}
              >
                {videosData.map((video, index) => {
                  const position = getRelativePosition(index)
                  const distance = Math.abs(position)
                  const isActive = position === 0
                  const isVisible = distance <= 2

                  const videoId = video.url
                    .split("/embed/")[1]
                    ?.split("?")[0]

                  const memory = videoMemory.current[video.id]
                  const hasStarted = startedVideos[video.id] ?? false

                  const scale =
                    distance === 0
                      ? 1
                      : distance === 1
                        ? 0.80
                        : 0.62

                  const opacity =
                    distance === 0
                      ? 1
                      : distance === 1
                        ? 0.85
                        : 0.45

                  const playerUrl = new URL(video.url)

                  playerUrl.searchParams.set("enablejsapi", "1")
                  playerUrl.searchParams.set("playsinline", "1")
                  playerUrl.searchParams.set("autoplay", "0")

                  if (origin) {
                    playerUrl.searchParams.set("origin", origin)
                  }

                  const showThumbnail = !isActive || !hasStarted

                  return (
                    <div
                      key={video.id}
                      className="absolute left-1/2 top-1/2 w-[min(64vw,620px)]"
                      style={{
                        transform: "translate(-50%, -50%)",
                        zIndex: 20 - distance,
                        pointerEvents: isVisible ? "auto" : "none",
                      }}
                    >
                      <motion.article
                        initial={false}
                        animate={{
                          x: `${position * 62}%`,
                          scale,
                          rotateY: position * -8,
                          opacity: isVisible ? opacity : 0,
                          y: distance === 0 ? 0 : 15,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 0.8,
                        }}
                        whileHover={{
                          y: -8,
                          scale: isActive ? 1.035 : scale * 1.04,
                        }}
                        onClick={() => {
                          if (!isActive) {
                            selectVideo(index, "manual")
                          }
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          transformOrigin: "center center",
                          cursor: isActive ? "default" : "pointer",
                        }}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
                      >
                        {/* Keep every iframe mounted to preserve its session. */}
                        <div className="relative aspect-video w-full bg-black">
                          <iframe
                            ref={(element) => {
                              iframeRefs.current[video.id] = element
                            }}
                            src={playerUrl.toString()}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="eager"
                            className={`absolute inset-0 h-full w-full transition-opacity duration-150 ${
                              isActive && hasStarted && readyPlayers[video.id]
                                ? "opacity-100"
                                : "pointer-events-none opacity-0"
                            }`}
                          />

                          {/* Thumbnail for side cards and first-time videos. */}
                          {showThumbnail && (
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: videoId
                                  ? `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`
                                  : undefined,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div className="absolute inset-0 bg-black/25" />

                              {isActive && (
                                <button
                                  type="button"
                                  aria-label={`Play ${video.title}`}
                                  onClick={(event) => {
                                    event.stopPropagation()
                                    startVideo(video.id)
                                  }}
                                  className="absolute inset-0 z-10 flex items-center justify-center"
                                >
                                  <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-red-600 shadow-xl transition-transform hover:scale-110">
                                    <Play className="h-8 w-8 fill-white text-white" />
                                  </span>
                                </button>
                              )}

                              {!isActive && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-10 w-10 fill-white text-white drop-shadow-lg" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Video information */}
                        <div className="flex items-center justify-between gap-3 bg-background/95 px-4 py-3">
                          <div className="min-w-0">
                            <h3
                              className="truncate text-sm font-semibold text-foreground md:text-base"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {video.title}
                            </h3>

                            <p className="text-xs text-muted-foreground">
                              {video.year}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    </div>
                  )
                })}
              </div>

              {/* Mobile Navigation Arrows */}
              {videoCount > 1 && (
                <div className="flex md:hidden justify-center items-center gap-7 mt-3 -translate-y-7">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous video"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 active:bg-white/30 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next video"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 active:bg-white/30 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Position indicators */}
              <div className="relative z-30 mt-2 flex justify-center gap-2">
                {videosData.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => selectVideo(index, "manual")}
                    aria-label={`Go to ${video.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-7 bg-[var(--primary)]"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="py-20 text-center text-muted-foreground">
            Videos coming soon.
          </p>
        )}
      </div>
    </section>
  )
}