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
  linkedin?: string
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
    id: "avyaan",
    name: "Avyaan",
    generation: 4,
    year: "2024-2025",
    modelPath: "/models/rover-render-compressed.glb",
    leftSpecs: ["Weight: 75 kg", "1140mm X 885mm", "ZED2, Intel Depth camera, Logitech camera", "Max speed: 1.0 m/s"],
    rightSpecs: ["Four Wheel Independent Steering System", "Can climb inclination of 60 degree", "Holonmoic drive", "6-DOF robotic arm"],
  },
  {
    id: "vidyaan",
    name: "Vidyaan",
    generation: 3,
    year: "2022-2023",
    modelPath: "/models/vidyaanAR-v3.glb",
    leftSpecs: ["Weight: 75 kg", "1140mm X 885mm", "ZED2i, Intel Depth camera, Logitech camera", "Max speed: 1.0 m/s"],
    rightSpecs: [
      "Four Wheel Independent Steering System",
      "Can climb inclination of 60 degree",
      "On-board Science lab",
      "6-DOF robotic arm",
    ],
  },
  {
    id: "abhyaan",
    name: "Abhyaan",
    generation: 2,
    year: "2021",
    modelPath: "/models/abhyan.glb",
    leftSpecs: ["Weight: 59 kg", "1056.83mm X 816.6mm", "ZED2, Intel Depth camera, Logitech camera", "Max speed: 1.0 m/s"],
    rightSpecs: ["Double-Rocker Suspension System", "Can climb inclination of 60 degree", "On-board Science lab", "6 DOF robotic arm"],
  },
  {
    id: "prayaan",
    name: "Prayaan",
    generation: 1,
    year: "2020",
    modelPath: "/models/prayan.glb",
    leftSpecs: ["Weight: 70.4 kg", "1040.911mm X 1143.984", "ZED2, Intel Depth camera, Logitech camera", "Max speed: 1.0 m/s"],
    rightSpecs: ["Rocker boogie suspension", "Can climb incline of 60 degree", "On-board Science lab", "Robotic arm integration"],
  },
]

// Drone Data
export const droneData: DroneIteration[] = [
  {
    id: "drone1",
    name: "Prototype A",
    prototype: "First Generation",
    modelPath: "/placeholder.svg",
    leftSpecs: ["Quad-rotor configuration", "Flight time: 15 mins", "Max altitude: 100m", "Carbon fiber frame"],
    rightSpecs: ["Pixhawk flight controller", "GPS navigation", "HD camera system", "Manual + stabilized modes"],
  },
  {
    id: "drone2",
    name: "Prototype B",
    prototype: "Second Generation",
    modelPath: "/placeholder.svg",
    leftSpecs: [
      "Hexa-rotor configuration",
      "Flight time: 25 mins",
      "Max altitude: 200m",
      "Lightweight composite frame",
    ],
    rightSpecs: ["Custom flight controller", "RTK GPS precision", "4K camera + thermal", "Autonomous waypoint flight"],
  },
  {
    id: "drone3",
    name: "Prototype C",
    prototype: "Third Generation",
    modelPath: "/placeholder.svg",
    leftSpecs: ["Octa-rotor configuration", "Flight time: 35 mins", "Max altitude: 300m", "Heavy lift capability"],
    rightSpecs: ["AI obstacle avoidance", "Swarm capability", "Lidar mapping", "Long range telemetry"],
  },
]

// Team Data
// Team Data
export const teamDataByYear: Record<string, TeamMember[]> = {
  "2025-2026": [
    { id: "kashyap", name: "Kashyap Dattani", role: "Captain", level: "captain", image: "/images_of_team_members/2025-2026/Kashyap_Dattani.png", linkedin: "https://www.linkedin.com/in/kashyap-dattani-a75b7b288/" },
    { id: "meet", name: "Meet Shah", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2025-2026/Meet_Shah.png", linkedin: "https://www.linkedin.com/in/agrim-tawani/" },
    { id: "manav", name: "Manav Bosmiya", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2025-2026/Manav_Bosmiya.png", linkedin: "https://www.linkedin.com/in/manav-bosmiya-4b8b91302/" },
    { id: "tanvi", name: "Tanvi Gupte", role: "Team Manager", level: "lead", image: "/images_of_team_members/2025-2026/Tanvi_gupte.png", linkedin: "https://www.linkedin.com/in/tanvi-gupte-aa1a0a267/" },
    { id: "eeshan", name: "Eeshan Amdekar", role: "Electronics Head", level: "department", image: "/images_of_team_members/2025-2026/Eeshan_Amdekar.png", linkedin: "https://www.linkedin.com/in/agrim-tawani/" },
    { id: "shakthi", name: "Shakthi Ravishankar", role: "Electronics Head", level: "department", image: "/images_of_team_members/2025-2026/Shakthi_ravishankar.png", linkedin: "https://www.linkedin.com/in/shakthi-ravishankar-82aa6a2b1/" },
    { id: "palash", name: "Palash Dhabalia", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2025-2026/Palash_Dhabalia.png", linkedin: "https://www.linkedin.com/in/palash-dhabalia-9b8a52324/" },
    { id: "harsh", name: "Harsh Vasa", role: "Coding Head", level: "department", image: "/images_of_team_members/2025-2026/Harsh_Vasa.png", linkedin: "https://www.linkedin.com/in/harsh-vasa-b0018821b/" },
    { id: "shreya", name: "Shreya Dalvi", role: "Science Head", level: "department", image: "/images_of_team_members/2025-2026/Shreya_Dalvi.png", linkedin: "https://www.linkedin.com/in/shreya-dalvi-a724312b6/" },
    { id: "shaan", name: "Shaan Upadhyay", role: "Marketing & Management Head", level: "department", image: "/images_of_team_members/2025-2026/Shaan_Updhyay.png", linkedin: "https://www.linkedin.com/in/shaan-upadhyay-220b56330/" },
    { id: "chaahat", name: "Chaahat Singh", role: "Marketing & Management Head", level: "department", image: "/images_of_team_members/2025-2026/Chahat_Singh.png", linkedin: "https://www.linkedin.com/in/chaahatsingh600905/" },
    { id: "pranita", name: "Pranita Kakirde", role: "Integrations Head", level: "department", image: "/images_of_team_members/2025-2026/Pranita_Kakirde.png", linkedin: "https://www.linkedin.com/in/pranita-kakirde-a48046309/" },
    { id: "om", name: "Om Bubna", role: "Integrations Head", level: "department", image: "/images_of_team_members/2025-2026/Om_Bubna.png", linkedin: "https://www.linkedin.com/in/om-bubna-395b36283/" },
  ],
  "2024-2025": [
    { id: "shubham", name: "Shubham Vyas", role: "Captain", level: "captain", image: "/images_of_team_members/2024-2025/ShubhamVyas.png", linkedin: "https://www.linkedin.com/in/shubham-vyas-4b738428b/" },
    { id: "spoorthi", name: "Spoorthi Shetty", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2024-2025/SpoorthiShetty.png", linkedin: "https://www.linkedin.com/in/spoorthi-shetty-13b196323/" },
    { id: "krupali", name: "Krupali Furia", role: "Team Manager", level: "lead", image: "/images_of_team_members/2024-2025/KrupaliFuria.png", linkedin: "https://www.linkedin.com/in/krupali-furia-0bb490289/" },
    { id: "rachit", name: "Rachit Garg", role: "Vice Captain & Science Head", level: "lead", image: "/images_of_team_members/2024-2025/RachitGarg.png", linkedin: "https://www.linkedin.com/in/rachitgarg6326/" },
    { id: "janay", name: "Janay Asher", role: "Electronics Head", level: "department", image: "/images_of_team_members/2024-2025/JanayAsher.png", linkedin: "https://www.linkedin.com/in/janay-asher-56a8551b0/" },
    { id: "subhrajyoti", name: "Subhrajyoti Meher", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2024-2025/SubhrajyotiMeher.png" },
    { id: "atharv", name: "Atharv Mendhe", role: "Coding Head", level: "department", image: "/images_of_team_members/2024-2025/AtharvMendhe.png", linkedin: "https://www.linkedin.com/in/atharv-mendhe-118442237/" },
    { id: "harsh", name: "Harsh Thakur", role: "Marketing Head", level: "department", image: "/images_of_team_members/2024-2025/HarshThakur.png", linkedin: "https://www.linkedin.com/in/harsh-thakur-388982249/" },
    { id: "eshaan", name: "Eshaan Sawant", role: "Integrations Head", level: "department", image: "/images_of_team_members/2024-2025/EshaanSaawant.png" },
    { id: "shraavya", name: "Shraavya Bharti", role: "Integrations Head", level: "department", image: "/images_of_team_members/2024-2025/ShraavyaBharti.png", linkedin: "https://www.linkedin.com/in/shraavya-bharti-000a25250/" },
    { id: "aryan", name: "Aryan Singh", role: "Integrations Head (Aerosystem)", level: "department", image: "/images_of_team_members/2024-2025/AryanSingh.png", linkedin: "https://www.linkedin.com/in/aryan-singh-348277299/" },
  ],
  "2023-2024": [
    { id: "ojas", name: "Ojas Chanakya", role: "Captain", level: "captain", image: "/images_of_team_members/2023-2024/OjasChanakya.png" },
    { id: "mann", name: "Mann Bhanushali", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2023-2024/MannBhanushali.png" },
    { id: "vedica", name: "Vedica Bafna", role: "Team Manager", level: "lead", image: "/images_of_team_members/2023-2024/VedicaBafna.png" },
    { id: "chinmay", name: "Chinmay Gotarane", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2023-2024/ChinmayGotarane.png" },
    { id: "aniruddh", name: "Aniruddh Viswanathan", role: "Electronics Head", level: "department", image: "/images_of_team_members/2023-2024/AniruddhViswanathan.png" },
    { id: "chaitya", name: "Chaitya Shah", role: "Coding Head", level: "department", image: "/images_of_team_members/2023-2024/ChaityaShah.png" },
    { id: "divyam", name: "Divyam Dedhia", role: "Science Head", level: "department", image: "/images_of_team_members/2023-2024/DivyamDedhia.png" },
    { id: "bhavyan", name: "Bhavyan Daiya", role: "Marketing Head", level: "department", image: "/images_of_team_members/2023-2024/BhavyanDaiya.png" },
    { id: "meet", name: "Meet Chudasama", role: "Marketing Head", level: "department", image: "/images_of_team_members/2023-2024/MeetChudasama.png" },
    { id: "om", name: "Om Gabani", role: "Integration Head", level: "department", image: "/images_of_team_members/2023-2024/OmGabani.png" },
    { id: "kashish", name: "Kashish Patni", role: "Integration Head", level: "department", image: "/images_of_team_members/2023-2024/KashishPatni.png" },
  ],
  "2022-2023": [
    { id: "bhaumik", name: "Bhaumik Thakker", role: "Captain", level: "captain", image: "/images_of_team_members/2022-2023/BhaumikThakker.png" },
    { id: "sanchit", name: "Sanchit Patel", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2022-2023/SanchitPatil.png" },
    { id: "niharika", name: "Niharika Damodaran", role: "Team Manager", level: "lead", image: "/images_of_team_members/2022-2023/NiharikaDamodaran.png" },
    { id: "reuben", name: "Reuben Manjaly", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2022-2023/ReubenManjaly.png" },
    { id: "anish", name: "Anish Koyande", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2022-2023/AnishKoyande.png" },
    { id: "vedangi", name: "Vedangi Gupte", role: "Electronics Head", level: "department", image: "/images_of_team_members/2022-2023/VedangiGupte.png" },
    { id: "taher", name: "Taher Kapadia", role: "Coding Head", level: "department", image: "/images_of_team_members/2022-2023/TaherKapadia.png" },
    { id: "ansh", name: "Ansh Shah", role: "Marketing Head", level: "department", image: "/images_of_team_members/2022-2023/AnshShah.png" },
    { id: "krushang", name: "Krushang Vakil", role: "Integration Head", level: "department", image: "/images_of_team_members/2022-2023/KrushangVakil.png" },
    { id: "juhi", name: "Juhi Khare", role: "Science Head", level: "department", image: "/images_of_team_members/2022-2023/JuhiKhare.png" },
    { id: "jinay", name: "Jinay Shah", role: "Operations Head", level: "department", image: "/images_of_team_members/2022-2023/JinayShah.png" },
  ],
  "2021-2022": [
    { id: "rutwik", name: "Rutwik Bhangale", role: "Captain", level: "captain", image: "/images_of_team_members/2021-2022/RutwikBhangale.png" },
    { id: "sandeep", name: "Sandeep Jha", role: "Vice Captain", level: "lead", image: "/images_of_team_members/2021-2022/SandeepJala.png" },
    { id: "yukti", name: "Yukti Shah", role: "Team Manager", level: "lead", image: "/images_of_team_members/no-image.jpeg" },
    { id: "vedant", name: "Vedant Singh", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2021-2022/VedantSingh.png" },
    { id: "parshvi", name: "Parshvi Shah", role: "Electronics Head", level: "department", image: "/images_of_team_members/2021-2022/ParshviShah.png" },
    { id: "jazib", name: "Jazib Dawre", role: "Coding Head", level: "department", image: "/images_of_team_members/2021-2022/JazibDawre.png" },
    { id: "darshan", name: "Darshan Mehta", role: "Marketing Head", level: "department", image: "/images_of_team_members/2021-2022/DarshanMehta.png" },
    { id: "vishal", name: "Vishal Umaria", role: "Science Head", level: "department", image: "/images_of_team_members/2021-2022/VishalUmaria.png" },
  ],
  "2020-2021": [
    { id: "rohit", name: "Rohit Kalkundre", role: "Captain", level: "captain", image: "/images_of_team_members/no-image.jpeg" },
    { id: "vivekanand", name: "Vivekanand Sahu", role: "Vice Captain & Electronics Head", level: "lead", image: "/images_of_team_members/no-image.jpeg" },
    { id: "omkar", name: "Omkar Malwade", role: "Team Manager", level: "lead", image: "/images_of_team_members/no-image.jpeg" },
    { id: "neel", name: "Neel Busa", role: "Mechanical Head", level: "department", image: "/images_of_team_members/2020-2021/NeelBusa.png" },
    { id: "priyam", name: "Priyam Shah", role: "Mechanical Head", level: "department", image: "/images_of_team_members/no-image.jpeg" },
    { id: "nishi", name: "Nishi Modi", role: "Coding Head", level: "department", image: "/images_of_team_members/2020-2021/NishiModi.png" },
    { id: "shyamal", name: "Shyamal Oza", role: "Marketing Head", level: "department", image: "/images_of_team_members/2020-2021/ShyamalOza.png" },
    { id: "siddhant", name: "Siddhant Salvi", role: "Integration Head", level: "department", image: "/images_of_team_members/2020-2021/SiddhantSalvi.png" },
  ],
}

export const teamData = teamDataByYear["2025-2026"]

export const achievementsData: Achievement[] = [
  {
    id: "erc-onsite-2025",
    title: "7th Rank ERC On-Site 2025",
    description: "Achieved 7th rank at the European Rover Challenge On-Site 2025.",
    year: "2025",
    rank: "#7",
    competition: "European Rover Challenge On-Site",
    image: "/about_team_images/ERC_2025_ACHIEVEMENTS.jpg",
  },
  {
    id: "ircs-2025",
    title: "2nd Runner Up IRC 2025",
    description: "Secured 2nd Runner Up position at IRC 2025.",
    year: "2025",
    rank: "2nd Runner Up",
    competition: "International Rover Challenge Series",
    image: "/about_team_images/IRC_2025.jpg",
  },
  {
    id: "isdc-2024",
    title: "1st Runner Up ISDC 2024",
    description: "Secured 1st Runner Up position at the International Space Drone Challenge 2024.",
    year: "2024",
    rank: "1st Runner Up",
    competition: "International Space Drone Challenge",
    image: "/about_team_images/ISDC_2024.jpg",
  },
  {
    id: "irc-2024",
    title: "2nd Runner Up IRC 2024",
    description: "Achieved 2nd Runner Up position at the International Rover Challenge 2024.",
    year: "2024",
    rank: "2nd Runner Up",
    competition: "International Rover Challenge",
    image: "/about_team_images/IRC_2024.jpg",
  },
  {
    id: "erc-remote-2023",
    title: "2nd Rank ERC Remote 2023",
    description: "Won 2nd rank in the European Rover Challenge Remote Edition 2023.",
    year: "2023",
    rank: "#2",
    competition: "European Rover Challenge Remote",
    image: "/about_team_images/ERCremote_2023.jpeg",
  },
  {
    id: "erc-onsite-2023",
    title: "10th Rank ERC On-Site 2023",
    description: "Achieved 10th rank at the European Rover Challenge On-Site 2023.",
    year: "2023",
    rank: "#10",
    competition: "European Rover Challenge On-Site",
    image: "/about_team_images/ERConsite_2023.jpeg",
  },
  {
    id: "irc-2023",
    title: "8th Rank IRC 2023",
    description: "Achieved 8th rank at the International Rover Challenge 2023.",
    year: "2023",
    rank: "#8",
    competition: "International Rover Challenge",
    image: "/about_team_images/irc-2023.jpg",
  },
  {
    id: "irdc-2022",
    title: "3rd Rank IRDC 2022",
    description: "Secured 3rd rank at the International Rover Design Challenge 2022.",
    year: "2022",
    rank: "#3",
    competition: "International Rover Design Challenge",
    image: "/about_team_images/IRDC.jpeg",
  },
  {
    id: "erc-remote-2022",
    title: "1st Rank ERC Remote 2022",
    description: "Won World Rank #1 in the European Rover Challenge Remote Edition 2022.",
    year: "2022",
    rank: "#1",
    competition: "European Rover Challenge Remote",
    image: "/about_team_images/erc_remote_2022.JPG",
  },
  {
    id: "erc-remote-2021",
    title: "1st Rank ERC Remote 2021",
    description: "Achieved World Rank #1 in the European Rover Challenge Remote 2021.",
    year: "2021",
    rank: "#1",
    competition: "European Rover Challenge Remote",
    image: "/about_team_images/erc_2021.png",
  },
  {
    id: "ipasc-2021",
    title: "2nd Rank IPASC 2021",
    description: "Secured 2nd rank in the International Planetary Aerial Systems Competition 2021.",
    year: "2021",
    rank: "#2",
    competition: "IPASC",
    image: "/about_team_images/2nd_IPASC.jpeg",
  },
  {
    id: "imh-2020",
    title: "8th Rank International Mars Hackathon 2020",
    description: "Achieved 8th rank at the International Mars Hackathon 2020.",
    year: "2020",
    rank: "#8",
    competition: "International Mars Hackathon",
    image: "/about_team_images/MarsHackathon.jpeg",
  },
  {
    id: "erc-remote-2020",
    title: "3rd Rank ERC Remote 2020",
    description: "Achieved 3rd rank in the European Rover Challenge Remote Edition 2020.",
    year: "2020",
    rank: "#3",
    competition: "European Rover Challenge Remote",
    image: "/about_team_images/erc_remote_3rrd.jpg",
  },
]


// Sponsors Data
export const sponsorsData: Sponsor[] = [
  {
    id: "sponsor1",
    name: "Spectra Connectronics LLP",
    logo: "/sponsors2026/2_white.jpeg",
    tier: "platinum",
  },
  {
    id: "sponsor2",
    name: "PCB Power",
    logo: "/sponsors2026/3_white.jpeg",
    tier: "platinum",
  },
  {
    id: "sponsor3",
    name: "Precise Fastners Pvt Ltd",
    logo: "/sponsors2026/4_white.jpeg",
    tier: "gold",
  },
  {
    id: "sponsor4",
    name: " Shri Baghubhai Mafatlal Polytechnic",
    logo: "/sponsors2026/5_white.jpeg",
    tier: "gold",
  },
  {
    id: "sponsor5",
    name: "Tessract",
    logo: "/sponsors2026/6_white.jpeg",
    tier: "silver",
  },
  {
    id: "sponsor6",
    name: "SNS Fabricators",
    logo: "/sponsors2026/7_white.jpeg",
    tier: "silver",
  },
]

export const sponsorsDataBottom: Sponsor[] = [
  {
    id: "sponsor1",
    name: "Spectra Connectronics LLP",
    logo: "/sponsors2026/2_bw_new.png",
    tier: "platinum",
  },
  {
    id: "sponsor2",
    name: "PCB Power",
    logo: "/sponsors2026/3.png",
    tier: "platinum",
  },
  {
    id: "sponsor3",
    name: "Precise Fastners Pvt Ltd",
    logo: "/sponsors2026/4.png",
    tier: "gold",
  },
  {
    id: "sponsor4",
    name: " Shri Baghubhai Mafatlal Polytechnic",
    logo: "/sponsors2026/5.png",
    tier: "gold",
  },
  {
    id: "sponsor5",
    name: "Tessract",
    logo: "/sponsors2026/6.png",
    tier: "silver",
  },
  {
    id: "sponsor6",
    name: "SNS Fabricators",
    logo: "/sponsors2026/7_bw.png",
    tier: "silver",
  },
]

// Department Data
export const departmentData = [
  {
    id: "coding",
    name: "Coding",
    description: "Control hub for operations, developing software for autonomous navigation, arm control, and real-time visualization via a custom GUI.",
    color: "#10B981",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Oversees data acquisition, telemetry, and power. Ensures stable communication and provides regulated power via custom-designed PCBs.",
    color: "#3B82F6",
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "Designs and builds the rover's structural systems—suspension, chassis, and robotic arm—ensuring reliability and performance.",
    color: "#F59E0B",
  },
  {
    id: "marketing",
    name: "Marketing & Management",
    description: "Secures resources for development while overseeing outreach and logistics.",
    color: "#EC4899",
  },
  {
    id: "science",
    name: "Science",
    description: "Conducts geological research on samples using instruments and cameras to investigate environmental conditions and biosignatures.",
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
