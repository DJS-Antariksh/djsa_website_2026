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
      "Teams must analyze Mars Yard data to plan and carry out a field science mission. The mission involves creating geological maps, formulating and testing scientific hypotheses, discovering unexpected objects (USOs), and documenting findings through detailed scientific reports. These reports include photographs to support and document the findings.Rovers explore designated areas searching for geological features and potential biosignatures while collecting critical data for analysis.",

    image: "/tasks/ERC_SCIENCE_EXPLORATION.jpg",
  },
  {
    title: "Science Task – Surface Sampling",
    description:
      "This sub-task requires rovers to collect both regolith (loose soil) and rock samples from the designated points in the terrain. Teams must gather samples weighing over 100g with rocks having dimensions exceeding 150mm, transport them securely in onboard containers over challenging terrain, measure their weight using onboard systems, and deliver them to the finish line. The task evaluates how effectively the rover can handle, store, and manage samples in real field conditions.",
    image: "/tasks/ERC_SURFACE_SAMPLING.jpg",
  },
  {
    title: "Science Task – Deep Sampling",
    description:
      "Rovers must collect subsurface  samples from depths of at least 30cm below the surface using drilling mechanisms mounted on robotic arm. The drilling site contains coloured layers to verify drilling depth, with samples needing to weigh over 100g.Teams must document the site before and after drilling, collect a sample above the required weight, measure it onboard, and transport it without contamination",
    image: "/tasks/ERC_DEEP_SAMPLING.jpg",
  },
  {
    title: "Science Task – Astro-Bio",
    description:
      "This astrobiological investigation requires teams to select one of five measurement sites based on provided geophysical data that maximizes the potential for finding life. Rovers must scan QR codes to identify sites, perform pH measurements of solutions using onboard instruments, and analyze provided astrobiological data (temperature, humidity, pressure, biochemical markers) to evaluate the probability of finding life. Teams deliver comprehensive scientific reports justifying their site selection and measurement techniques.",
    image: "/tasks/ERC_ASTROBIO.jpg",
  },
  {
    title: "Navigation Task – Traverse",
    description:
      "The traverse sub-task demonstrates semi-autonomous to fully autonomous navigation capabilities. Rovers must reach four designated waypoints in any sequence using GNSS navigation and/or landmark-based navigation with ArUco markers, then return to the start position—all without direct video feedback for maximum points. The task focuses on effective navigation using sensors, image processing, and autonomous path planning across varied terrain, including loose sandy soil, hard dry surfaces, slopes, and rocky areas.",
    image: "/tasks/ERC_TRAVERSE.jpg",
  },
  {
    title: "Navigation Task – Droning",
    description:
      "Teams deploy custom-built drones inside a secure 10x10x4m cage. The drone must execute three precision landing attempts on randomly positioned targets within a 3-meter radius. Additional points are awarded for detecting and estimating positions of scattered probes. All image processing, object detection, and decision-making must be implemented using MATLAB/Simulink, testing autonomous flight control and computer vision.",
    image: "/tasks/ERC_DRONING.jpg",
  },
  {
    title: "Maintenance Task",
    description:
      "The task aims to demonstrate the rover’s ability to effectively interact with a control panel primarily designed for human use. Tasks include flipping switches, turning rotary knobs, operating joysticks, inserting electrical plugs into sockets, opening drawers, and placing objects on electromagnets. The challenge tests robotic arm precision, end-effector design, and the ability to handle panel elements without causing damage.",
    image: "/tasks/ERC_MAINTENANCE.jpg",
  },
  {
    title: "Probing Task",
    description:
      "Rovers must rapidly locate and collect three yellow-green aluminum probes scattered across the Mars Yard, store them in onboard containers, and return to the finish line as quickly as possible. Multiple teams compete simultaneously, requiring collision avoidance and strategic path planning. Completion time directly affects scoring, emphasizing the importance of speed, efficiency, and well-designed gripper mechanisms",
    image: "/tasks/ERC_PROBING.jpg",
  },
  {
    title: "Presentation Task",
    description:
      "Teams present their complete project journey to judges in a 20-minute presentation followed by a Q&A. Presentations must cover team organization, engineering approach, technical design solutions, task strategies, challenges encountered, lessons learned, outreach activities, and spin-off/commercialization opportunities. This task checks how clearly the team explains their work, design choices, challenges, and innovation while interacting with the judges.",
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
            Competing at the European Rover Challenge (ERC) 2025 has been a highly enriching and transformative experience for DJS Antariksh. The competition challenged us to strengthen our technical expertise through the development of systems such as autonomous navigation, precision manipulation, and reliable communication frameworks for realistic planetary conditions.
            Beyond technical growth, ERC provided valuable interaction with international teams, industry professionals, and researchers. These exchanges gave the team a broader perspective on global standards in planetary robotics and helped identify areas for further refinement in their design and testing methodologies. The rigorous qualification process further strengthened our project management, documentation, and systematic engineering practices. Overall, ERC has served as a comprehensive learning platform that continues to motivate us to raise our standards and advance our vision in planetary exploration.

          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
