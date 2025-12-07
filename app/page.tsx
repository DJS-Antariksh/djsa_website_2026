"use client";

import { useState, useEffect } from "react"
import LoadingPage from "@/sections/loading-page2"
import NavBar from "@/sections/nav-bar"
import HeroSection from "@/sections/hero-section"
import AboutSection from "@/sections/about-section"
import MissionVisionSection from "@/sections/MissionVisionSection";
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
  const [isModelReady, setIsModelReady] = useState(false)

  // We keep LoadingPage mounted until model is ready + exit animation completes (handled inside LoadingPage)
  // Actually, simpler: Pass !isModelReady as isLoading to LoadingPage. 
  // LoadingPage handles its own exit animation when isLoading becomes false.

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <LoadingPage isLoading={!isModelReady} />

      <NavBar />
      {/* Pass callback to HeroSection to trigger when 3D model is loaded */}
      <HeroSection onModelLoaded={() => setIsModelReady(true)} />
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
    </main>
  );
}
