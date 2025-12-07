"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Footer from "@/sections/footer"
import IRCNavbar from "@/sections/irc-navbar"

const missions = [
  // ... (keep existing missions array)
  {
    title: "Abex",
    description:
      "The rover will serve as a mobile science lab to investigate Mars analog environments for signs of extinct or extant life. The rover must be equipped with at least one instrument or assay capable of detecting life, chosen by the team. It will collect and analyze subsurface samples of at least 10g from depths of 10 cm or more from multiple sites. The rover must also document sites using wide-angle panoramas (1:3 height-to-width ratio) with GPS coordinates, elevation, cardinal directions, and scale, alongside close-up, high-resolution images. The rover will drop a sample at a designated location for future retrieval during the Reconnaissance and Autonomous Delivery Mission.",
    image: "/tasks/ABEX_new.png",
  },
  {
    title: "Rado",
    description:
      "The Reconnaissance and Autonomous Delivery Operation (RADO) mission requires the rover to operate across varied terrain where in the first stage, the rover performs reconnaissance for 10 minutes, searching for objects, capturing their photos and GPS coordinates, and optionally storing one of them. The second stage is a 20 minute autonomous delivery task where the rover must pick up and deliver objects such as tools, containers, or rocks to specified GPS points and colour markers. Teams are evaluated on their ability to correctly locate, store, and deliver objects and the accuracy of placement within the allotted time.",
    image: "/tasks/RADO.jpg",
  },
  {
    title: "IDMO",
    description:
      "The Instrument Deployment and Maintenance Operation (IDMO) mission involves precise tasks using the rover's robotic arm. It includes two stages: Instrument Maintenance, where the rover picks and places a cache, operates panels, interacts with switches, knobs, joysticks, and plugs, and performs other fine operations; and Instrument Deployment, where the rover retrieves and places sample caches in designated locations near collection panel and reads codes, patterns or text displayed near the panel for verification by judges.",
    image: "/tasks/IDMO.JPG",
  },
  {
    title: "BPP & PIMA",
    description:
      "The Business and Partnership Plan (BPP) mission examines the ability of a team to develop business skills, build partnerships, and secure sponsorships. It emphasises effective planning, communication, and teamwork with industry and academia to help ensure the project’s long-term success. The Project Implementation and Management Assessment (PIMA) evaluates the project and the final rover design through direct interaction between teams and judges. Teams present their development process, addressing important engineering and management elements, from strategic planning to manufacturing, testing, and spin-offs from the project.",
    image: "/tasks/BPP.jpg",
  },
  {
    title: "Exhibition",
    description:
      "The Rover Exhibition facilitates interaction between teams, judges, and the local academia fostering interest and inspiring students. Teams showcase the capabilities of their rovers through standee flex banners, helping cultivate professional connections that support future collaboration. The exhibition also aims to motivate young individuals to explore the fields of science and robotics by highlighting their significance and relevance in today's world.",
    image: "/tasks/EXHIBITION.jpg",
  },
]

export default function IRCPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <IRCNavbar />

      <div className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      <section
        id="about"
        className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-6"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          International Rover Challenge 2026
        </p>
        <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed text-justify">
          The International Rover Challenge 2026 is a prestigious global competition that brings together teams from
          universities across the world to design and build advanced Martian rovers capable of executing a range of
          mission-inspired tasks that assess engineering innovation, system reliability, and field performance. The
          development of these rovers demands cutting-edge mechanical design supported by the cohesive integration of
          electronic and AI-enabled subsystems, all operating together as a unified robotic system to ensure durability,
          and functionality in extreme environments. The teams must prepare a rover capable of navigating uneven
          terrain, detecting designated cones, performing manipulation tasks with the robotic arm of the rover, and
          collecting data for further scientific research. Beyond the technical capabilities of the rover, the challenge
          enables the participants to gain comprehensive understanding of end-to-end project execution and contribute to
          the future of space exploration, planetary rover development, and autonomous systems.
        </p>
      </section>

      <section id="missions" className="pt-32 pb-16 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Competition Tasks</p>
          <h2 className="text-3xl md:text-4xl font-bold">Missions</h2>
        </div>

        <div className="space-y-24">
          {missions.map((mission, index) => (
            <div
              key={mission.title}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}
            >
              <div className="flex-1 space-y-6 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{mission.title}</h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
                  {mission.description}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={mission.image || "/placeholder.svg"}
                    alt={mission.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="pt-32 pb-16 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto space-y-12 text-center">
        <div className="space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Team Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold">Our Experience</h2>
        </div>

        <div className="space-y-8">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/tasks/irc2025_win1.jpg"
              alt="Team at IRC 2025"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
            Competing at the International Rover Challenge (IRC) has been a truly memorable experience. It pushed our
            technical capabilities and managerial skills beyond our limits. From brainstorming to manufacturing the
            rover for complex challenges like autonomous navigation and scientific exploration, the competition
            thoroughly tests our engineering expertise. Coordinated efforts among various departments enabled the team
            to develop a rover fully equipped “To Decipher Unimaginable”. Furthermore, competing alongside international
            teams helps us understand different methodologies and approaches, giving us practical insights that
            strengthens our overall learning and offers a broader perspective on innovation, turning the event into a
            platform for cross-cultural learning and professional growth. Securing a podium finish for the past two
            years has left us incredibly inspired and proud, giving us confidence as a team. However, we view this
            success not as a final destination, but as a strong foundation to build upon. Using this experience as a
            solid framework, we strive to improve our skills and achieve even greater heights this year.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
