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
      "The drone serves as an aerial scout for critical reconnaissance. The drone must  navigate to three distinct \"zones of scientific interest\". At each zone, the drone must stabilize to capture high-resolution imagery and conduct in-situ atmospheric measurements, recording core parameters such as temperature, humidity, and pressure at specific altitudes. The mission culminates in a precision payload operation where the drone must deploy a sensitive atmospheric sensor (represented by a standard AA battery) into a designated 30cm collection zone. This \"deploy-and-leave\" task tests the stability of the drone and the precision of its release mechanism, ensuring that sensitive instruments can be positioned safely in hard-to-reach Martian terrain.",
    image: "/tasks/jatayu.jpeg",
  },
  {
    title: "Technology Mission",
    description:
      "In this mission, a drone is deployed to a remote outpost to address heavy dust accumulation on a rover following a severe storm. The core challenge is navigating to the site and cleaning the solar panels, positioned up to 1 meter off the ground, using a precise and non-damaging method . While hovering in close proximity to this delicate hardware, the drone must also act as a scout, surveying a 50-meter radius to document damage and locate scattered assets.The task also involves capturing high resolution photos and returning safely within a 15 minute timeframe.",
    image: "/tasks/nabhyan.jpeg",
  },
  {
    title: "Project Implementation and Management Assessment",
    description:
      "The Project Implementation and Management Assessment (PIMA) evaluates the team's engineering lifecycle and managerial acumen. It involves a direct interaction between the team and the judges, where the comprehensive project roadmap from initial resource management and PERT charts to the final manufacturing and testing phases must be presented. This assessment ensures that teams are not just building a drone, but are also mastering the systems engineering and business planning skills required to run a successful aerial project.",
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
          The International Space Drone Challenge (ISDC) is an you aerial robotics competition that challenges university teams to conceptualize, design, and operate next-generation space drones. Set within the "Sproscape", the competition pushes engineering knowledge to its limits . For the 2026 edition, the challenge places an emphasis on manual piloting skills and safety protocols, requiring teams to implement precise maneuvers and tasks. Beyond flight stability, teams must demonstrate expertise in payload integration, real-time data transmission, and disaster mitigation strategies, effectively proving that aerial systems can serve as reliable scouts and maintenance tools for future Martian settlements.
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
            Competing at the International Space Drone Challenge (ISDC) has been a truly transformative journey for DJS Antariksh, pushing us to master drone aerodynamics for a simulated Martian atmosphere. Refining flight stability and video transmission for near-zero latency in high-pressure environments required a level of hardware precision and resilience that sharpened our entire engineering approach. Beyond the technical hurdles, interacting with various teams gave us a fresh perspective on various drone architectures and adaptive control strategies. Building on our momentum as the 1st Runner Up at ISDC 2024 has not only diversified our technical portfolio but also reinforced our drive to innovate. Overall, ISDC remains a vital platform that challenges us to raise our standards and advance our vision for the future of aerial robotics.
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
