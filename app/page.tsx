"use client";

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import LoadingPage from "@/sections/loading-page4"
import NavBar from "@/sections/nav-bar"
import HeroSection from "@/sections/hero-section"
import { achievementsData, sponsorsData, sponsorsDataBottom, teamDataByYear } from "@/data/site-data"

const AboutSection = dynamic(() => import("@/sections/about-section"))

const MissionVisionSection = dynamic(() => import("@/sections/MissionVisionSection"))

const OurRover = dynamic(() => import("@/sections/our-rover"))

const OurDrone = dynamic(() => import("@/sections/our-drone"))

const Departments = dynamic(() => import("@/sections/departments"))

const Team = dynamic(() => import("@/sections/team"))

const Achievements = dynamic(() => import("@/sections/achievements"))

const Sponsors = dynamic(() => import("@/sections/sponsors"))

const Videos = dynamic(() => import("@/sections/videos"))

const ContactUs = dynamic(() => import("@/sections/contact-us"))

const Footer = dynamic(() => import("@/sections/footer"))

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

// Everything else can stream after the loader exits
const STATIC_IMAGE_URLS = [
  "/linkedin.png",
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

export default function Home() {
  const [isModelReady, setIsModelReady] = useState(false)
  const [showPage, setShowPage] = useState(false)
  const [areImagesReady, setAreImagesReady] = useState(false)

  // Warm up lower sections as soon as the rover model finishes loading
  useEffect(() => {
    if (!isModelReady) return
    sectionPrefetchers.forEach((load) => {
      load().catch(() => {})
    })
  }, [isModelReady])

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

  // Start warming the rest once the page is allowed through
  useEffect(() => {
    if (!showPage) return
    preloadImages(NON_BLOCKING_IMAGE_URLS)
  }, [showPage])

  const allAssetsReady = isModelReady && areImagesReady

  // Loader stays until the GLB reports ready; once it exits, the rest of the page mounts.
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <LoadingPage
        isLoading={!allAssetsReady}
        onLoadingComplete={() => setShowPage(true)}
      />

      {/* Hero must stay mounted so the GLB can load while the loader is visible */}
      <HeroSection onModelLoaded={() => setIsModelReady(true)} />

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
