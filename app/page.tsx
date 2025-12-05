"use client"

import { useState, useEffect } from "react"
import LoadingPage from "@/sections/loading-page"
import NavBar from "@/sections/nav-bar"
import HeroSection from "@/sections/hero-section"
import AboutSection from "@/sections/about-section"
import OurRover from "@/sections/our-rover"
import OurDrone from "@/sections/our-drone"
import Departments from "@/sections/departments"
import Team from "@/sections/team"
import Achievements from "@/sections/achievements"
import Sponsors from "@/sections/sponsors"
import Videos from "@/sections/videos"
import ContactUs from "@/sections/contact-us"
import Footer from "@/sections/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingPage onLoadComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <OurRover />
      <OurDrone />
      <Departments />
      <Team />
      <Achievements />
      <Sponsors />
      <Videos />
      <ContactUs />
      <Footer />
    </main>
  )
}
