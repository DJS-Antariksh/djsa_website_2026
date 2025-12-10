"use client"

import { ArrowLeft } from "lucide-react"
import Footer from "@/sections/footer"
import IRCNavbar from "@/sections/irc-navbar"
import { motion } from "framer-motion"
import TiltedCard from "@/sections/card"

const missions = [
  {
    title: "Science Task – Scientific Exploration",
    description:
      "Teams analyze Mars Yard data to plan and execute a complete field science mission. The rover creates geological maps, formulates and tests scientific hypotheses, identifies unexpected objects (USOs), and documents findings through detailed scientific reports supported by photographs. This task evaluates scientific reasoning, observation accuracy, and structured documentation.",
    image: "/tasks/ERC_SCIENCE_EXPLORATION.jpg",
  },
  {
    title: "Science Task – Surface Sampling",
    description:
      "Rovers must collect regolith and rock samples from designated locations. Samples must weigh over 100g, with rocks exceeding 150mm in size. The rover must store the samples securely, transport them over challenging terrain, measure their weight onboard, and deliver them safely to the finish zone, simulating real planetary sample-return constraints.",
    image: "/tasks/ERC_SURFACE_SAMPLING.jpg",
  },
  {
    title: "Science Task – Deep Sampling",
    description:
      "This task evaluates subsurface exploration capabilities. Rovers must drill at least 30cm deep using a robotic arm-mounted drill. Colored soil layers verify drilling depth. Teams document the site pre- and post-drilling, collect subsurface samples over 100g, measure them onboard, and transport them without contamination.",
    image: "/tasks/ERC_DEEP_SAMPLING.jpg",
  },
  {
    title: "Science Task – Astro-Bio",
    description:
      "Teams conduct astrobiological investigations by selecting an optimal site based on provided geophysical data. Rovers identify sites using QR codes, perform pH measurements, and analyze environmental parameters such as temperature, humidity, pressure, and biochemical markers to estimate the probability of life. Scientific justification and reporting are critical.",
    image: "/tasks/ERC_ASTROBIO.jpg",
  },
  {
    title: "Navigation Task – Traverse",
    description:
      "This task tests semi-autonomous to fully autonomous navigation. Rovers must reach four GNSS-based waypoints in any order and return to the starting point without live video feedback. Navigation relies on sensor fusion, image processing, ArUco markers, and intelligent path planning across varied terrain.",
    image: "/tasks/ERC_TRAVERSE.jpg",
  },
  {
    title: "Navigation Task – Droning",
    description:
      "Teams deploy a custom-built drone within a secure arena. The drone performs precision landings on randomly placed targets and detects scattered probes. All control, computer vision, and decision-making algorithms are implemented using MATLAB/Simulink, testing autonomous flight and perception systems.",
    image: "/tasks/ERC_DRONING.jpg",
  },
  {
    title: "Maintenance Task",
    description:
      "The rover interacts with a control panel designed primarily for humans. Tasks include flipping switches, rotating knobs, operating joysticks, inserting electrical plugs, opening drawers, and using electromagnets. This mission assesses robotic arm precision, end-effector robustness, and delicate manipulation capabilities.",
    image: "/tasks/ERC_MAINTENANCE.jpg",
  },
  {
    title: "Probing Task",
    description:
      "Rovers must quickly locate and collect three aluminum probes scattered across the Mars Yard. The probes must be stored onboard and delivered to the finish line as fast as possible. Multiple teams operate simultaneously, emphasizing collision avoidance, speed, efficient navigation, and gripper design.",
    image: "/tasks/ERC_PROBING.jpg",
  },
  {
    title: "Presentation Task",
    description:
      "Teams present their complete project lifecycle to judges in a 20-minute presentation followed by Q&A. The presentation covers system design, task strategies, challenges faced, lessons learned, outreach activities, and commercialization potential. This task evaluates communication, clarity, and engineering justification.",
    image: "/tasks/ERC_PRESENTATION.jpg",
  },
]

export default function ERCPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <IRCNavbar />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        id="about"
        className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-6"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          European Rover Challenge 2025
        </p>
        <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed text-justify">
          The European Rover Challenge (ERC) is an annual international robotics competition organized by the European Space Foundation. It invites university teams worldwide to design, build, and operate Martian rover prototypes. Conducted under simulated Martian conditions, the competition tests the rovers through a series of complex tasks, promoting innovation in space exploration and encouraging collaboration among aspiring engineers and scientists. 
        </p>
      </motion.section>

      {/* Missions */}
      <section
  id="missions"
  className="pt-12 pb-16 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto space-y-24"
>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Competition Tasks
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Missions</h2>
        </motion.div>

        <div className="space-y-24">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16`}
            >
              <div className="flex-1 space-y-6 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">
                  {mission.title}
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
                  {mission.description}
                </p>
              </div>

              <div className="w-full lg:w-1/2 aspect-video">
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

      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="experience"
        className="pt-24 pb-16 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto space-y-12 text-center"
      >
        <div className="space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Team Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Our Experience</h2>
        </div>

        <div className="space-y-8">
          <div className="relative w-full aspect-video">
            <TiltedCard
              imageSrc="/tasks/ERC_TEAM.jpg"
              altText="Team at ERC 2025"
              containerWidth="100%"
              containerHeight="100%"
              scaleOnHover={1.03}
              rotateAmplitude={5}
              showTooltip={false}
            />
          </div>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
            Competing at the European Rover Challenge (ERC) 2025 was a highly enriching and transformative experience for
            DJS Antariksh. The competition strengthened our technical expertise in autonomous navigation, precision
            manipulation, and reliable communication systems for realistic planetary conditions. Interactions with
            international teams and industry professionals provided valuable insights into global engineering standards
            and systematic design methodologies. The rigorous qualification process enhanced our project management,
            documentation practices, and overall engineering discipline. ERC continues to motivate us to push boundaries
            in planetary exploration and robotic autonomy.
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
