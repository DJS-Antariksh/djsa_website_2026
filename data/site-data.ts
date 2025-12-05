// Site data for DJS Antariksh website

export interface RoverIteration {
  id: string
  name: string
  generation: number
  year: string
  modelPath: string
  leftSpecs: string[]
  rightSpecs: string[]
}

export interface DroneIteration {
  id: string
  name: string
  prototype: string
  modelPath: string
  leftSpecs: string[]
  rightSpecs: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department?: string
  image: string
  level: "captain" | "lead" | "department"
}

export interface Competition {
  id: string
  name: string
  shortName: string
  location: string
  rank: string
  year: string
  image: string
  description: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  year: string
  rank: string
  competition: string
  image: string
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  tier: "platinum" | "gold" | "silver"
}

// Rover Data
export const roverData: RoverIteration[] = [
  {
    id: "prayaan",
    name: "Prayaan",
    generation: 1,
    year: "2020",
    modelPath: "/models/prayaan.glb",
    leftSpecs: ["Weight: 45 kg", "6-wheel rocker-bogie suspension", "Aluminum chassis frame", "Max speed: 0.3 m/s"],
    rightSpecs: ["Arduino-based control", "Basic telemetry system", "Wired communication", "Manual operation mode"],
  },
  {
    id: "abhyaan",
    name: "Abhyaan",
    generation: 2,
    year: "2021",
    modelPath: "/models/abhyaan.glb",
    leftSpecs: ["Weight: 50 kg", "Enhanced suspension system", "Carbon fiber components", "Max speed: 0.5 m/s"],
    rightSpecs: ["Raspberry Pi control", "LoRa communication", "Semi-autonomous navigation", "Robotic arm integration"],
  },
  {
    id: "vidyaan",
    name: "Vidyaan",
    generation: 3,
    year: "2022-2023",
    modelPath: "/models/vidyaan.glb",
    leftSpecs: ["Weight: 48 kg", "Advanced rocker-bogie", "Lightweight alloy frame", "Max speed: 0.7 m/s"],
    rightSpecs: [
      "Jetson Nano computing",
      "GPS + IMU navigation",
      "Computer vision system",
      "6-DOF robotic manipulator",
    ],
  },
  {
    id: "avyaan",
    name: "Avyaan",
    generation: 4,
    year: "2024-2025",
    modelPath: "/models/avyaan.glb",
    leftSpecs: ["Weight: 52 kg", "Adaptive suspension", "Titanium-reinforced frame", "Max speed: 1.0 m/s"],
    rightSpecs: ["Jetson Orin computing", "Full autonomous capability", "LiDAR + stereo vision", "7-DOF precision arm"],
  },
]

// Drone Data
export const droneData: DroneIteration[] = [
  {
    id: "drone1",
    name: "Prototype A",
    prototype: "First Generation",
    modelPath: "/models/drone1.glb",
    leftSpecs: ["Quad-rotor configuration", "Flight time: 15 mins", "Max altitude: 100m", "Carbon fiber frame"],
    rightSpecs: ["Pixhawk flight controller", "GPS navigation", "HD camera system", "Manual + stabilized modes"],
  },
  {
    id: "drone2",
    name: "Prototype B",
    prototype: "Second Generation",
    modelPath: "/models/drone2.glb",
    leftSpecs: [
      "Hexa-rotor configuration",
      "Flight time: 25 mins",
      "Max altitude: 200m",
      "Lightweight composite frame",
    ],
    rightSpecs: ["Custom flight controller", "RTK GPS precision", "4K camera + thermal", "Autonomous waypoint flight"],
  },
]

// Team Data
export const teamData: TeamMember[] = [
  {
    id: "captain",
    name: "Team Captain",
    role: "Captain",
    image: "/professional-headshot-captain.jpg",
    level: "captain",
  },
  {
    id: "vc1",
    name: "Vice Captain 1",
    role: "Vice Captain",
    image: "/professional-headshot-vice-captain.jpg",
    level: "lead",
  },
  {
    id: "manager",
    name: "Team Manager",
    role: "Manager",
    image: "/professional-headshot-manager.png",
    level: "lead",
  },
  {
    id: "vc2",
    name: "Vice Captain 2",
    role: "Vice Captain / Lead",
    image: "/professional-headshot-lead.jpg",
    level: "lead",
  },
  {
    id: "mech",
    name: "Mechanical Lead",
    role: "Mechanical",
    department: "Mechanical",
    image: "/engineer-mechanical.jpg",
    level: "department",
  },
  {
    id: "coding",
    name: "Coding Lead",
    role: "Coding",
    department: "Coding",
    image: "/developer-coding.png",
    level: "department",
  },
  {
    id: "electronics",
    name: "Electronics Lead",
    role: "Electronics",
    department: "Electronics",
    image: "/engineer-electronics.jpg",
    level: "department",
  },
  {
    id: "science",
    name: "Science Lead",
    role: "Science",
    department: "Science",
    image: "/scientist-research.jpg",
    level: "department",
  },
  {
    id: "marketing",
    name: "Marketing Lead",
    role: "Marketing",
    department: "Marketing",
    image: "/professional-marketing.jpg",
    level: "department",
  },
  {
    id: "integration",
    name: "Integration Lead",
    role: "Integration",
    department: "Integration",
    image: "/engineer-systems.jpg",
    level: "department",
  },
]

// Competition Data
export const competitionData: Competition[] = [
  {
    id: "erc-onsite",
    name: "European Rover Challenge On-Site",
    shortName: "ERC On-Site",
    location: "Poland",
    rank: "#1",
    year: "2025",
    image: "/mars-rover-competition-poland.jpg",
    description: "World Rank #1 - Qualified for On-Site finals in Poland",
  },
  {
    id: "erc-remote",
    name: "European Rover Challenge Remote",
    shortName: "ERC Remote",
    location: "Remote",
    rank: "#1",
    year: "2021-2022",
    image: "/mars-rover-remote-competition.jpg",
    description: "Back-to-Back World Champions - First Asian team to win",
  },
  {
    id: "irc",
    name: "International Rover Challenge",
    shortName: "IRC",
    location: "India",
    rank: "#3",
    year: "2024",
    image: "/rover-challenge-india.jpg",
    description: "World Rank #3 - International Rover Challenge",
  },
  {
    id: "isdc",
    name: "International Space Drone Challenge",
    shortName: "ISDC",
    location: "International",
    rank: "#2",
    year: "2024",
    image: "/space-drone-challenge.jpg",
    description: "World Rank #2 - Space Drone Challenge",
  },
  {
    id: "irdc",
    name: "International Rover Design Challenge",
    shortName: "IRDC",
    location: "International",
    rank: "Finalist",
    year: "2023",
    image: "/rover-design-competition.jpg",
    description: "International Rover Design Challenge Finalist",
  },
]

// Achievements Data
export const achievementsData: Achievement[] = [
  {
    id: "erc-2025",
    title: "ERC 2025 On-Site Qualification",
    description: "Qualified as World Rank #1 for the European Rover Challenge On-Site competition in Poland.",
    year: "2025",
    rank: "#1",
    competition: "European Rover Challenge",
    image: "/trophy-gold-first-place-mars.jpg",
  },
  {
    id: "erc-2022",
    title: "ERC 2022 Remote Champions",
    description: "Secured World Rank #1 in the European Rover Challenge Remote edition.",
    year: "2022",
    rank: "#1",
    competition: "European Rover Challenge Remote",
    image: "/championship-trophy-space.jpg",
  },
  {
    id: "erc-2021",
    title: "First Asian Team to Win ERC",
    description: "Made history as the first Asian team to win the European Rover Challenge.",
    year: "2021",
    rank: "#1",
    competition: "European Rover Challenge Remote",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "irc-2024",
    title: "IRC 2024 Bronze",
    description: "Achieved World Rank #3 at the International Rover Challenge.",
    year: "2024",
    rank: "#3",
    competition: "International Rover Challenge",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "isdc-2024",
    title: "ISDC 2024 Silver",
    description: "Secured World Rank #2 at the International Space Drone Challenge.",
    year: "2024",
    rank: "#2",
    competition: "International Space Drone Challenge",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "erc-2020",
    title: "ERC 2020 Bronze",
    description: "Achieved World Rank #3 in our debut at the European Rover Challenge.",
    year: "2020",
    rank: "#3",
    competition: "European Rover Challenge Remote",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Sponsors Data
export const sponsorsData: Sponsor[] = [
  {
    id: "sponsor1",
    name: "Tech Corp",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "platinum",
  },
  {
    id: "sponsor2",
    name: "Aerospace Inc",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "platinum",
  },
  {
    id: "sponsor3",
    name: "Engineering Solutions",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "gold",
  },
  {
    id: "sponsor4",
    name: "Robotics Ltd",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "gold",
  },
  {
    id: "sponsor5",
    name: "Innovation Labs",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "silver",
  },
  {
    id: "sponsor6",
    name: "Future Tech",
    logo: "/placeholder.svg?height=100&width=200",
    tier: "silver",
  },
]

// Department Data
export const departmentData = [
  {
    id: "coding",
    name: "Coding",
    description: "Autonomous navigation, computer vision, and control systems",
    color: "#3B82F6",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "PCB design, power systems, and sensor integration",
    color: "#10B981",
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "CAD design, fabrication, and structural analysis",
    color: "#F59E0B",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Sponsorship, social media, and public relations",
    color: "#EC4899",
  },
  {
    id: "science",
    name: "Science",
    description: "Planetary science, research, and documentation",
    color: "#8B5CF6",
  },
]

// Videos Data
export const videosData = [
  {
    id: "2024",
    title: "DJS Antariksh 2024",
    url: "https://www.youtube.com/embed/-kD3rZAMYdg",
    year: "2024",
  },
  {
    id: "2025",
    title: "DJS Antariksh 2025",
    url: "https://www.youtube.com/embed/3iWMzUXBsAk",
    year: "2025",
  },
  {
    id: "2026",
    title: "DJS Antariksh 2026",
    url: "https://www.youtube.com/embed/OEYZWgZUsKU",
    year: "2026",
  },
]
