# DJS Antariksh Official Website

Welcome to the official repository for the **DJS Antariksh Website**. DJS Antariksh is the Official Martian Rover Team of Dwarkadas J. Sanghvi College of Engineering (DJSCE). 

---

## 🚀 The Tech Stack

This project is a modern web application designed for high performance, utilizing heavy 3D rendering alongside smooth UI animations.

- **Framework**: [Next.js (App Router)](https://nextjs.org/) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + custom CSS (`app/globals.css`)
- **3D Rendering**: [Three.js](https://threejs.org/) and [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Headless accessible components via shadcn/ui)

---

## 📂 Repository Structure

Understanding where files live is the key to navigating this codebase. We separate our Next.js routing, full-page sections, reusable UI components, and 3D scenes.

```text
djsa_website_2026/
├── app/                  # Next.js App Router (Routes, layout, and global CSS)
├── sections/             # Major visual blocks of the website (Hero, Rover, Team, etc.)
├── components/           # Reusable components
│   ├── three/            # 3D canvas and model components
│   └── ui/               # Standard UI components (buttons, inputs, cards)
├── public/               # Static assets (3D GLB models, SVGs, images, background GIFs)
├── data/                 # Static data arrays used to populate the UI (Team info, Sponsors, etc.)
├── OPTIMIZATIONS.md      # Detailed documentation of performance tweaks applied to the site
└── next.config.mjs       # Next.js configuration (Caching, headers, experimental features)
```

---

### 1. Global Layout & Routing
- **Main Page Assembly**: `app/page.tsx`
  - *This file dynamically imports all the sections and stitches them together.*
- **Header / Head Tags / Global Background**: `app/layout.tsx`
- **Global CSS & Tailwind Imports**: `app/globals.css`
  - *Contains the animated starry backgrounds and global utility classes.*

### 2. Website Sections (The "Views")
All major blocks of the single-page application are kept in the `sections/` folder.
- **The Navigation Bar**: `sections/nav-bar.tsx`
- **Initial 3D Rover Disintegration**: `sections/hero-section.tsx`
- **The interactive 4-Rover Viewer**: `sections/our-rover.tsx` (or similar file in `sections/`)
- **The interactive Drone Viewer**: `sections/our-drone.tsx`
- **Departments Disk Section**: `sections/departments.tsx`
- **Competitions & Timeline**: `sections/competitions.tsx`
- **Team Hierarchy & Members**: `sections/team.tsx`
- **Achievements & Awards**: `sections/achievements.tsx`
- **Sponsorship Grid**: `sections/sponsors.tsx`
- **Contact Form**: `sections/contactUs.tsx`
- **Loading Screen**: `sections/loading-page4.tsx` (Canvas-based lemniscate loader)

### 3. Modifying Content data (No UI changes)
If you only want to change text, add a new team member, or switch out an image, **do not touch the UI code**. Look inside the `data/` or component files where specific arrays are defined (e.g. `teamData`, `roverData`, `sponsorsData`). 

### 4. 3D Models & Viewer Logic
- Editing the interactive 3D model viewers (how models load and switch): `components/three/RoverCanvas.tsx`, `components/three/DroneViewer.tsx`
- The physical `.glb` files: `public/models/`
  - *Note: Do not push uncompressed `.glb` models as they severely bloat the repository and slow down loading. Compress them first.*

---

## ⚡ 3D Engine & Performance

To drop a 3D rover into the site, we rely on **React Three Fiber**. Because 3D rendering consumes heavy memory and GPU power, we have tightly optimized the website to maintain 60fps scrolling and fast loading times.

### Applied Optimizations
- **Static Backgrounds:** We use a lightweight GIF background (`/bg.gif`) instead of a heavy Three.js particle system.
- **Bulk 3D Preloading:** All `.glb` models are bulk-preloaded in `app/page.tsx` to eliminate scroll jank when revealing 3D sections.
- **Canvas Constraints:** The `<Canvas>` components clamp pixel rendering to maximum `dpr={[1, 2]}`. Performance scaling dynamically drops framerates (`performance={{ min: 0.5 }}`) if the device struggles.
- **Lazy Hydration:** Heavy sections below the fold are loaded using Next.js `dynamic()` imports.
- **Event Throttling:** Scroll events in the Navbar are throttled using `requestAnimationFrame` to ensure smooth 60fps scrolling.
- **Next.js Caching:** Aggressive caching headers (1-year max-age) are set for all models and static assets inside `next.config.mjs`.

### Pending Advanced Optimizations (TODO)
To reach our ultimate goal of a 2-3s Time To Interactive (TTI), the following steps are prioritized for future updates:
1. **Model Compression:** Compress all `.glb` assets using Draco (`@gltf-transform/cli`), KTX2 texture optimization, and simplify meshes to reduce file sizes by 60-80%.
2. **Split Hero Scene:** Separate the Hero model into a lightweight static mesh (for initial load) and postpone the heavy assembly animation until after TTI.
3. **Idle Warm-Up System:** Replace bulk preloading with a progressive `requestIdleCallback` loader, combined with an offscreen dummy `<Canvas>` to pre-compile GPU shaders without blocking the main thread.
4. **Demand-based Rendering:** Implement Intersection Observers to set `frameloop="demand"` on canvases that are scrolled out of view, saving 50% CPU/GPU overhead.


---

## 💻 Getting Started (Local Development)

To start coding and testing on your own machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd djsa_website_2026
   ```

2. **Install Dependencies**
   We strongly recommend using `npm` (or `pnpm`).
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production** (To test how the site runs optimized)
   ```bash
   npm run build
   npm start
   ```

---

Made with ❤️ by DJSA Coding