"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Footer from "@/sections/footer"
import ISDCNavbar from "../../sections/isdc-navbar"
import { motion } from "framer-motion"
import TiltedCard from "@/sections/card"

const missions = [
  {
    title: "Science Mission",
    description:
      "The Science Mission simulates a planetary reconnaissance task supporting future human exploration. The drone must navigate to designated regions of interest to collect atmospheric data and capture high-resolution visual information from specific altitudes. Teams are required to document each site with accurate positional data and deploy an atmospheric sensor at a specified location within the arena. This mission evaluates navigation precision, flight stability, sensor integration, data quality, and controlled payload deployment under mission constraints.",
    image: "/tasks/jatayu.jpeg",
  },
  {
    title: "Technology Mission",
    description:
      "The Technology Mission focuses on infrastructure support and post-event assessment in a Mars-analog scenario. The drone is tasked with mitigating dust accumulation on simulated rover solar panels following a dust storm using a safe and non-destructive method. Additionally, the drone must perform an aerial survey of the surrounding area to identify and document objects affected by the event. This mission tests precision control, environmental awareness, safe interaction with hardware, and the drone’s ability to support long-term surface operations.",
    image: "/tasks/nabhyan.jpeg",
  },
  {
    title: "Project Implementation and Management Assessment",
    description:
      "The Project Implementation and Management Assessment evaluates the overall development process and final system design through direct interaction with judges. Teams present their design methodology, system architecture, testing procedures, and project management strategy, highlighting key engineering decisions and challenges faced during development. The assessment focuses on engineering discipline, risk management, team coordination, and the ability to translate conceptual designs into a reliable, mission-ready aerial system.",
    image: "/tasks/BPP.jpg",
  },
]

export default function ISDCPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ISDCNavbar />

      <div className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-6"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          International Space Drone Challenge 2026
        </p>
        <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed text-justify">
          The International Space Drone Challenge 2026 is a global competition where university teams design and build
          an astronaut-assistive aerial system for simulated Martian missions. The drone integrates mechanical design,
          avionics, flight control, communications, and onboard sensing into a single platform. Teams prepare a system
          capable of autonomous navigation, aerial reconnaissance, terrain mapping, and scientific data collection,
          producing geo-tagged imagery and altitude-based measurements for follow-up analysis. Missions run under
          defined safety and operational constraints, including limited visibility and communication, and require flight
          stability, waypoint tracking, and clear reporting of results. The challenge develops end-to-end engineering
          practice: design reviews, verification and testing, flight readiness, and project management for aerospace and
          autonomous aerial systems.
        </p>
      </motion.section>

      <section id="missions" className="-mt-24 pt-12 pb-16 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Competition Tasks</p>
          <h2 className="text-3xl md:text-4xl font-bold">Missions</h2>
        </motion.div>

        <div className="space-y-24">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16`}
            >
              <div className="flex-1 space-y-6 text-left flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{mission.title}</h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
                  {mission.description}
                </p>
              </div>
              <div className="w-full lg:w-1/2 aspect-4/3 overflow-hidden rounded-lg">
                <TiltedCard
                  imageSrc={mission.image || "/placeholder.svg"}
                  altText={mission.title}
                  containerWidth="100%"
                  containerHeight="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  showTooltip={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto space-y-12 text-center"
      >
        <div className="space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Team Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold">Our Experience</h2>
        </div>

        <div className="space-y-8">
          <div className="relative w-full aspect-video">
            <TiltedCard
              imageSrc="/tasks/irc2025_win1.jpg"
              altText="Team at Competition"
              containerWidth="100%"
              containerHeight="100%"
              scaleOnHover={1.03}
              rotateAmplitude={5}
              showTooltip={false}
            />
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
            Participating in the International Space Development Competition (ISDC) has been a journey that transformed our understanding of autonomous aerial systems and drone technology. The competition challenged us to design, build, and operate drones capable of executing missions that simulate real-world space exploration scenarios. From conceptualization to flight testing, every phase demanded precision engineering, problem-solving, and integration of electronics, navigation systems, and control algorithms. Our drones, Jatayu and Nabhayan, represent hours of design iterations, testing, and refinement to achieve optimal flight performance, stability, and mission execution. Competing alongside teams from around the world exposed us to diverse approaches in drone architecture, sensor fusion, and mission planning, enriching our technical perspective. The experience has strengthened our expertise in unmanned aerial systems and fostered skills in project management, collaboration, and decision-making under pressure. Each flight test, each mission, and each challenge overcome has reinforced our passion for aerospace innovation and our commitment to advancing drone technology for space exploration applications.
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
