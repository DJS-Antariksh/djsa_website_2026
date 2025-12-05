# DJS Antariksh — Full Website Specification (Next.js + TypeScript)
A complete, expanded, production-grade specification for the official website of **DJS Antariksh**, designed for automated generation in **Next.js + TypeScript (App Router)** with **3D Rover & Drone visualizations**, **department disk interactions**, and **section-based one-page layout**.

---

# 1. Organization Overview  
DJS Antariksh is the **Official Martian Rover Team of Dwarkadas J. Sanghvi College of Engineering (DJSCE)**, Mumbai, Maharashtra, India.  
Founded between **2019–2020**, the team now consists of **~60 engineers** from Mechanical, Electronics, Computer Science, IT, and Data Science departments.

The team specializes in:
- **Rover design**
- **Autonomous navigation systems**
- **Robotic manipulation**
- **Planetary science**
- **Aerial robotics**
- **Electronics & PCB design**
- **3D CAD & Simulation**

---

# 2. Hall of Fame (Global Achievements)
DJS Antariksh has achieved worldwide recognition:

### European Rover Challenge (ERC)
- **2025 (On-Site Qualification)** – 🥇 *World Rank #1*
- **2022 (Remote)** – 🥇 *World Rank #1*
- **2021 (Remote)** – 🥇 *World Rank #1 – First Asian team to win*
- **2020 (Remote)** – 🥉 *World Rank #3*

### International Rover Challenge (IRC)
- **2024** – 🥉 *World Rank #3*

### International Space Drone Challenge (ISDC)
- **2024** – 🥈 *World Rank #2*

### International Planetary Aerial Systems Challenge (IPASC)
- **2021** – 🥈 *World Rank #2*

These achievements must appear dynamically across **Hero**, **Achievements**, **Competitions**, and **About** sections.

---

# 3. Rover Generations (4 GLB Models)
Each rover must be viewable in an interactive section with 3D rotation, forward/back iteration switching, and side-by-side specs.

### Rover Iterations:
1. **Prayaan** – 1st Gen  
2. **Abhyaan** – 2nd Gen  
3. **Vidyaan** – 3rd Gen  
4. **Avyaan** – 4th Gen (Current)

Each has:
- Name  
- Generation  
- Year/Competition  
- Left column technical specs  
- Right column systems specs  
- GLB file in `/public/models/`

---

# 4. Drone Generations (2 GLB Models)
Two fully interactive drone models with left/right iteration control:
- **Drone–1 (Prototype A)**
- **Drone–2 (Prototype B)**

Specs similar to rover section.

---

# 5. Full Project File Structure (Next.js)
```
djsa_website_2026/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  ├─ fonts/
│  └─ (future pages if required)
│
├─ sections/
│  ├─ navBar.tsx
│  ├─ heroSection.tsx
│  ├─ ourRover.tsx
│  ├─ ourDrone.tsx
│  ├─ departments.tsx
│  ├─ competitions.tsx
│  ├─ team.tsx
│  ├─ achievements.tsx
│  ├─ sponsors.tsx
│  ├─ contactUs.tsx
│  ├─ footer.tsx
│  └─ loadingPage.tsx
│
├─ components/
│  ├─ Scene.tsx
│  ├─ Experience.tsx
│  ├─ Rover.tsx
│  ├─ Drone.tsx
│  ├─ ArrowButton.tsx
│  ├─ Card.tsx
│  ├─ Input.tsx
│  ├─ SocialIcon.tsx
│  └─ (reusable UI)
│
├─ public/
│  ├─ models/
│  │  ├─ prayaan.glb
│  │  ├─ abhyaan.glb
│  │  ├─ vidyaan.glb
│  │  ├─ avyaan.glb
│  │  ├─ drone1.glb
│  │  ├─ drone2.glb
│  ├─ sponsors/
│  ├─ icons/
│  ├─ images/
│  └─ backgrounds/
│
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ postcss.config.js
└─ README.md
```

---

# 6. Hero Section (3D Rover Disintegration Scroll)
The opening section contains:
- A **fullscreen 3D canvas**
- The current rover **fully assembled**
- As the user scrolls down → **rover disintegrates** smoothly
- The rover's GLB file should explode make a component for it(ON SCROLL)
### Technical Requirements:
- Use `<Canvas>` from `@react-three/fiber`
- Add `'use client'` at the top
- Use:
  - `useGLTF`  
  - `ScrollControls`  
  - `useScroll`  
  - `useFrame`  
- Before animation, store mesh initial transforms:
```
Record<string, { position: Vector3; rotation: Euler }>
```
- Animate all parts simultaneously
- Use deterministic explosion vectors
- No re-parenting of scene hierarchy
- Add a floating text title:
  **"Deciphering the Unimaginable"**

---

# 7. Our Rover Section (Interactive 4-Model Viewer)
Features:
- Centered title above the 3D model
- Two side columns with detailed specifications
- Left/right arrows to switch between 4 rovers
- Smooth transitions, fading and swapping models
- Click-and-drag orbit rotation enabled

Layout:
```
[Left Specs]   [3D Rover Canvas]   [Right Specs]
```

Each rover object:
```
interface RoverIteration {
  id: string;
  name: string;
  generation: number;
  modelPath: string;
  leftSpecs: string[];
  rightSpecs: string[];
}
```

---

# 8. Our Drone Section (Interactive 2-Model Viewer)
Same structure as rover section but with **2 models**.

---

# 9. Departments Section (3D Circular Disk)
A futuristic rotating disk divided into 5 sectors:
- Coding  
- Electronics  
- Mechanical  
- Marketing  
- Science  

### Design Requirements:
- Metallic, glossy textures
- Hover → scale-up animation per sector
- Disk draggable/rotatable
- Central pill label: **“Departments”**
- Rectangular container card with shadows
- Leverage textures from:
  - `https://uiverse.io/Nawsome/fresh-panther-41`
  - `https://reactbits.dev/backgrounds/letter-glitch`

---

# 10. Competitions Section (Interactive Carousel)
A drag-based, snap-scroll carousel with 5 competition cards.

Each card features:
- Background image
- Title (e.g., **ERC On-Site**)
- Rank achieved
- Location
- Overlay with sliding animation

### Cards:
1. IRC – International Rover Challenge  
2. ISDC – International Space Drone Challenge  
3. IRDC – International Rover Design Challenge  
4. ERC On-Site – Poland  
5. ERC Remote – Back-to-Back Champions  

### Animations:
- Center card scales to 1.1x
- Glassmorphism overlay
- Text reveal (opacity + translateY)

---

# 11. Team Section (Hierarchy Layout)
Hierarchy:
```
          [Captain]
 [VC]   [Manager]   [VC/Lead]
[Mechanical] [Coding] [Electronics] [Science] [Marketing] [Integration]
```

Each card:
- Circular image placeholder
- Rounded rectangle card
- Role + Name text

---

# 12. Achievements Section (Slider)
- Title centered
- Two large achievement cards per page
- Left/right arrows to navigate
- Dots indicating current page
- Cards include:
  - Image area
  - Description text block

---

# 13. Sponsors Section (3×2 Grid)
Features:
- Colored title bar “Sponsors”
- Subtle futuristic background
- 6 sponsor cards (rounded, shadowed)
- Logos centered

---

# 14. Contact Us Section
Requirements:
- Dark starry background
- Floating Pill Navbar reused here
- Inputs:
  - Name
  - Email
  - Nationality
  - Number
  - Message
- Inputs have thin white outlines
- Submit button matches provided screenshot style
- Bottom left → Team logo
- Bottom right → Instagram, GitHub, Email, LinkedIn icons

---

# 15. Footer
Minimal, clean footer:
- Left → logo + tagline
- Right → 5 social icons inside white rounded squares
- Wide spacing
- Full width, low height

---

# 16. Loading Page
Loader inspired by:
**https://uiverse.io/00Kubi/fast-walrus-2**

Specs:
- Centered loader
- Additional text below (“Launching Systems…”)
- Tailwind + custom keyframes
- Smooth looping animation

---

# 17. Videos Section
Embed videos in responsive frames:
- 2024: https://www.youtube.com/watch?v=-kD3rZAMYdg  
- 2025: https://www.youtube.com/watch?v=3iWMzUXBsAk&t=270s  
- 2026: https://www.youtube.com/watch?v=OEYZWgZUsKU  

---

# 18. Performance Requirements
- Lazy-load 3D sections
- Minimize bundle size
- Reuse components
- Use Suspense + dynamic imports
- Smooth animations on mobile
- Energy-efficient render loops (no unnecessary frames)

---

# 19. Data Format for Automation
All content should be automatically generated using:
- `roverData`
- `droneData`
- `teamData`
- `competitionData`
- `achievementsData`
- `sponsorsData`

Each must be stored as TypeScript arrays.

---

# 20. The Website Goal
This spec ensures Lovable can generate:
- **A fully working Next.js + TypeScript interactive site**
- **Minimal manual intervention**
- **Full 3D functionality**
- **Clean UI with modern animations**
- **Responsive and performance-focused design**

End of specification.