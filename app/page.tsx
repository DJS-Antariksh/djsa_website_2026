"use client";

import { useEffect, useState, useTransition } from "react"
import dynamic from "next/dynamic"
import NavBar from "@/sections/nav-bar"
import HeroSection from "@/sections/hero-section"
import LoadingPage from "@/sections/loading-page4"
import { achievementsData, sponsorsData, sponsorsDataBottom, teamDataByYear } from "@/data/site-data"
import { useGLTF } from "@react-three/drei"
import { useWarmModels } from "@/lib/useWarmModels"
import { GPUWarmup } from "@/components/GPUWarmup"

const AboutSection = dynamic(() => import("@/sections/about-section"), { ssr: false })

const MissionVisionSection = dynamic(() => import("@/sections/MissionVisionSection"), { ssr: false })

const OurRover = dynamic(() => import("@/sections/our-rover"), { ssr: false })

const OurDrone = dynamic(() => import("@/sections/our-drone"), { ssr: false })

const Departments = dynamic(() => import("@/sections/departments"), { ssr: false })

const Team = dynamic(() => import("@/sections/team"), { ssr: false })

const Achievements = dynamic(() => import("@/sections/achievements"), { ssr: false })

const Sponsors = dynamic(() => import("@/sections/sponsors"), { ssr: false })

const Videos = dynamic(() => import("@/sections/videos"), { ssr: false })

const ContactUs = dynamic(() => import("@/sections/contact-us"), { ssr: false })

const Footer = dynamic(() => import("@/sections/footer"), { ssr: false })

const sectionPrefetchers = [
  () => import("@/sections/about-section"),
  () => import("@/sections/MissionVisionSection"),
  () => import("@/sections/our-rover"),
  () => import("@/sections/our-drone"),
  () => import("@/sections/departments"),
  () => import("@/sections/team"),
  () => import("@/sections/achievements"),
  () => import("@/sections/sponsors"),
  () => import("@/sections/videos"),
  () => import("@/sections/contact-us"),
  () => import("@/sections/footer"),
]

const CRITICAL_IMAGE_URLS = [
  "/brand/AntarikshLogo.png", // visible immediately on first paint
]

const STATIC_IMAGE_URLS = [
  "/linkedin.svg",
  "/side_rover1.png",
  "/aboutus_images/IRC25_exhibition.jpg",
  "/aboutus_images/ERC_2025_TRADS.jpg",
  "/aboutus_images/about7.jpg",
  "/aboutus_images/about6.jpg",
  "/aboutus_images/about4.jpg",
  "/aboutus_images/about3.jpg",
  "/aboutus_images/about2.jpg",
  "/aboutus_images/about1.jpg",
  "/missionandvision_images/missionandvision1.jpg",
  "/missionandvision_images/missionandvision2.jpg",
  "/missionandvision_images/missionandvision3.jpg",
  "/missionandvision_images/missionandvision4.jpg",
  "/missionandvision_images/missionandvision5.jpg",
]

const TEAM_IMAGE_URLS = Object.values(teamDataByYear)
  .flatMap((members) => members.map((m) => m.image).filter(Boolean))

const ACHIEVEMENT_IMAGE_URLS = achievementsData.map((a) => a.image).filter(Boolean)
const SPONSOR_IMAGE_URLS = [...sponsorsData, ...sponsorsDataBottom].map((s) => s.logo).filter(Boolean)

const NON_BLOCKING_IMAGE_URLS = Array.from(
  new Set([
    ...STATIC_IMAGE_URLS,
    ...TEAM_IMAGE_URLS,
    ...ACHIEVEMENT_IMAGE_URLS,
    ...SPONSOR_IMAGE_URLS,
  ]),
).filter((url) => !CRITICAL_IMAGE_URLS.includes(url))

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = url
        }),
    ),
  )
}

// Models to warm up (excluding hero which loads immediately)
const WARMUP_MODELS = [
  "/models/prayan_draco.glb",
  "/models/abhyan_draco.glb",
  "/models/vidyaanAR-v3_draco.glb",
  "/models/akshayaan_compressed.glb",
  "/models/nabhyaan.glb",
  "/models/jatayu_compressed.glb",
]

export default function Home() {
  const [isModelReady, setIsModelReady] = useState(false)
  const [showPage, setShowPage] = useState(false)
  const [areImagesReady, setAreImagesReady] = useState(false)
  const [enableHero3D, setEnableHero3D] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const widthQuery = window.matchMedia("(min-width: 1024px)")
    return !motionQuery.matches && widthQuery.matches
  })
  const [isPending, startTransition] = useTransition()

  // Progressive idle-time warm-up of secondary models (non-blocking)
  useWarmModels(WARMUP_MODELS)

  // Warm up lower sections as soon as the rover model finishes loading
  useEffect(() => {
    if (!isModelReady) return
    sectionPrefetchers.forEach((load) => {
      load().catch(() => { })
    })
  }, [isModelReady])

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const widthQuery = window.matchMedia("(min-width: 1024px)")

    const update = () => {
      const allow = !motionQuery.matches && widthQuery.matches
      setEnableHero3D(allow)
    }

    update()

    const add = (mq: MediaQueryList, handler: () => void) => {
      if (mq.addEventListener) {
        mq.addEventListener("change", handler)
      } else {
        // @ts-ignore legacy Safari
        mq.addListener(handler)
      }
    }

    const remove = (mq: MediaQueryList, handler: () => void) => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler)
      } else {
        // @ts-ignore legacy Safari
        mq.removeListener(handler)
      }
    }

    add(motionQuery, update)
    add(widthQuery, update)

    return () => {
      remove(motionQuery, update)
      remove(widthQuery, update)
    }
  }, [])

  // Ensure all hero + section photos are loaded before letting the loader exit
  useEffect(() => {
    let cancelled = false
    preloadImages(CRITICAL_IMAGE_URLS).finally(() => {
      if (!cancelled) setAreImagesReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (enableHero3D) {
      setIsModelReady(false)
      return
    }

    setIsModelReady(true)
  }, [enableHero3D])

  // Start warming the rest once the page is allowed through
  useEffect(() => {
    if (!showPage) return
    preloadImages(NON_BLOCKING_IMAGE_URLS)
  }, [showPage])

  const allAssetsReady = isModelReady && areImagesReady

  useEffect(() => {
    if (allAssetsReady) {
      const timer = setTimeout(() => {
        startTransition(() => {
          setShowPage(true)
        })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [allAssetsReady])

  // Loader stays until the GLB reports ready; once it exits, the rest of the page mounts.
  return (
    <>
      <LoadingPage show={!showPage} />
      
      {/* GPU Warm-up: Pre-upload models to GPU after page is interactive */}
      {showPage && <GPUWarmup models={WARMUP_MODELS} />}
      
      <main className={`relative min-h-screen text-foreground overflow-x-hidden transition-opacity duration-600 ${
        showPage ? "opacity-100" : "opacity-0"
      }`}>

      {/* Hero must stay mounted so the GLB can load while the loader is visible */}
      <HeroSection enable3D={enableHero3D} onModelLoaded={() => setIsModelReady(true)} />

      {showPage && (
        <div className="transition-opacity duration-500 opacity-100">
          <NavBar />
          <AboutSection />
          <MissionVisionSection />
          <OurRover />
          <OurDrone />
          <Departments />
          <Team />
          <Achievements />
          <Sponsors />
          <Videos />
          <ContactUs />
          <Footer />
        </div>
      )}
      </main>
    </>
  );
}

type SectionPlaceholderProps = {
  id: string
  title: string
  tall?: boolean
  compact?: boolean
}

function SectionPlaceholder({ id, title, tall, compact }: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className={`w-full ${tall ? "min-h-[80vh]" : compact ? "min-h-[20vh]" : "min-h-[55vh]"} flex items-center justify-center px-6`}
    >
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Loading {title}...</p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/3 animate-pulse bg-primary/40" />
        </div>
      </div>
    </section>
  )
}

