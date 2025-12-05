DJS Antariksh: Organization Context & Team Identity:
1. Who We Are
Official Title: DJS Antariksh - The Official Martian Rover Team of Dwarkadas J. Sanghvi College of Engineering (DJSCE).
Location: Mumbai, Maharashtra, India.
Founded: 2019-2020.
Identity: A multidisciplinary student organization dedicated to the design, fabrication, and testing of next-generation Martian Rover prototypes. The team consists of approximately 60 passionate undergraduate engineering students from various branches (EXTC, Mechanical, Computer Science, IT, Data Science) working cohesively to represent India on international platforms.
2. Mission & Philosophy
Motto: "To Decipher Unimaginable"
Core Mission: To push the boundaries of student-led space exploration robotics. The team aims to innovate in the field of planetary rover technology, demonstrating that undergraduate students can build systems capable of surviving and operating in simulated extraterrestrial environments.
Vision: To foster a culture of research and engineering excellence, ultimately contributing to India's growing space sector while securing top global rankings in premier robotics competitions.
3. The Rovers (Our Fleet)
The team follows an iterative design process, improving upon each generation based on competition feedback and technological advancements.
Avyaan (4th Generation - Current):
Status: Active.
Key Features: Advanced autonomy stack, upgraded custom PCB architecture for higher reliability, and a refined suspension system for rugged terrain traversal.
Vidyaan (3rd Generation):
Era: International Rover Challenge (IRC) 2025.
Focus: Enhanced modularity and scientific analysis capabilities.
Abhyaan (2nd Generation):
Era: ERC 2023, IRC 2024.
Legacy: Validated the team's shift towards more complex autonomous maintenance tasks.
Prayaan (1st Generation):
Era: Early prototypes (ERC 2020/2021).
Significance: The rover that secured the team's first World #1 title.
4. Organizational Structure & Technical Domains
The team operates divided into specialized subsystems:
A. Mechanical Subsystem
Focus: Structural integrity, mobility, and manipulation.
Key Responsibilities:
Designing the Chassis and Suspension (e.g., Rocker-Bogie systems) to traverse uneven Martian-like terrain without tipping.
Developing a 6-DOF (Degrees of Freedom) Robotic Arm capable of precise tasks like flipping switches, typing on keyboards, and collecting soil samples.
Utilizing 3D Printing (Additive Manufacturing) and CNC machining for rapid prototyping of custom parts.
B. Electronics Subsystem
Focus: The nervous system of the rover.
Key Responsibilities:
Designing and manufacturing Custom PCBs (Printed Circuit Boards) for power distribution, motor drivers, and sensor integration.
to ensure safe operation of high-capacity Li-Po/Li-Ion battery packs.
Establishing robust Communication Systems to transmit video and telemetry data over long distances (often non-line-of-sight).
Implementing safety kill-switches and emergency stop protocols.
C. Coding (Software) Subsystem
Focus: Intelligence and Autonomy.
Key Responsibilities:
Autonomous Navigation: Using ROS2 (Robot Operating System), SLAM (Simultaneous Localization and Mapping), and Path Planning algorithms (A*, Dijkstra) to navigate without human input.
Computer Vision:  analyzing terrain obstacles using stereo cameras and LiDAR.
Inverse Kinematics (IK): Programming the robotic arm to move intuitively based on operator coordinates rather than individual joint angles.
D. Science Subsystem
Focus: Astrobiology and Geology.
Key Responsibilities:
Designing onboard laboratories to analyze soil samples in real-time.
Detecting biosignatures (proteins, lipids, DNA) to determine if life exists (or existed) on the simulated terrain.
Geological context mapping and stratigraphy analysis during competitions.
E. Marketing & Management
Focus: Sustainability and Outreach.
Key Responsibilities:
Securing funding through corporate sponsorships (Industrial Partners).
Managing social media presence and public relations.
STEM outreach programs to inspire younger students.
5. Hall of Fame (Key Achievements)
DJS Antariksh has established itself as a global powerhouse in just a few years.
World Rank #1 – European Rover Challenge (ERC) 2025 (Qualification Phase).
World Rank #1 – European Rover Challenge (ERC) 2022 (Remote Edition).
Note: Back-to-back victories solidified the team's global dominance.
World Rank #1 – European Rover Challenge (ERC) 2021 (Remote Edition).
Historic: First Asian team to win the competition.
Awards: Best Science Award, Best Navigation Award.
World Rank #3 – International Rover Challenge (IRC) 2024.
World Rank #2 – International Space Drone Challenge (ISDC) 2024.
World Rank #2 – International Planetary Aerial Systems Challenge (IPASC) 2021.
World Rank #3 – European Rover Challenge (ERC) 2020 (Remote Edition).
Award: Best Science Planning Award.

---------
File Structure : 

Below is a clear, detailed description of the project layout, coding expectations, and exact file locations you should edit when asked to change a particular part of the site. Use this as a reference so that when someone says “please change the hero” or “update the sponsors section”, you can go directly to the correct file and only edit that file (unless the task explicitly requires changes elsewhere).

djsa_website_2026/
├─ .next/                    # Next build output (ignore)
├─ app/
│  ├─ favicon.ico
│  ├─ globals.css            # global styles for the site
│  ├─ layout.tsx             # root layout (header/footer wrappers, metadata)
│  └─ page.tsx               # homepage / main routing entry for "/"
├─ components/               # reusable small components (buttons, cards, modals)
├─ public/                   # static assets (svgs, images, favicon, fonts. photos)
│   ├─ brand/
│   ├─ fonts/
│   ├─ general_photos/
│   ├─ models/
│   ├─ tasks/
│   ├─ gene/
│   ├─ file.svg
│   ├─ globe.svg
│   ├─ next.svg
│   ├─ vercel.svg
│   └─ window.svg
├─ sections/                 # page sections (hero, navBar, footer, teams, sponsors etc)
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.js
├─ README.md
├─ requirements.txt
├─ tsconfig.json

-> app/ — root layout & pages

app/layout.tsx
Purpose: site-wide layout container (wraps every page). Typical place for HTML <head> metadata, <body> wrappers, theme providers, global header/footer components (if used).
If asked to change global header/footer placement, update this file only (or add imports of header/footer here and then edit the header/footer files in sections/).

app/page.tsx
Purpose: the homepage file. Often imports many sections/* components and composes the page.
If someone asks to change homepage composition (order of sections, add/remove a section), modify this file to import and re-order the components from sections/.

app/globals.css
Purpose: site-wide CSS. If a change affects the whole site (fonts, colors, base spacing), update here.
For component-scoped styling, prefer CSS modules or inline styles in component files (discuss and follow repository conventions).

-> sections/ — page sections (where to edit for section-specific requests)
Each file in sections/ represents a distinct part of the homepage or site. Edit the corresponding file when requested to change content/structure/markup of a section:

navBar.tsx — top navigation bar (logo, links, mobile menu).
heroSection.tsx — top hero/landing area (headline, CTA buttons).
footer.tsx — site footer.
heroSection.tsx — (already listed above) edit for hero content/CTA.
loadingPage.tsx — site loading UX.
ourDrone.tsx — drone project section; update content/pictures/text here.
ourRover.tsx — rover project section; update content/pictures/text here.
sponsors.tsx — sponsors / partners section.
team.tsx — team members listing.
contactUs.tsx — contact form or contact details.
departments.tsx — department list or details.
competitions.tsx — competitions section.
footer.tsx — footer content, links, social icons.

... (any additional sections/*.tsx).

Rule: When asked to change a section, edit the matching sections/<sectionName>.tsx file and any assets in public/ it references. Avoid touching other sections or global layout unless necessary.

-> components/ — reusable building blocks

Purpose: small UI bits used by multiple sections (cards, buttons, icons, social links, modal, form inputs).
If a change affects a UI primitive (e.g., change button style across site), update / add the component in components/ and then import it into sections/* or app/* as needed.
Naming convention: components/<ComponentName>.tsx. Default export the React component.

-> public/ — static assets

Put logos, svg icons, images here.
Example files already present: file.svg, globe.svg, next.svg, vercel.svg, window.svg.
When a section needs an image, add the file to public/ and reference it using / path (e.g., <img src="/file.svg" alt="...">) or import the file if using Next image optimization.

Rule: Only change public/ when assets are required for a section change. Keep filenames stable and descriptive (e.g., sponsors/google.svg, team/alice.jpg).

TypeScript: use typed props for each component. Keep tsx files strictly typed (no any unless necessary).
Component API: prefer small, single-responsibility components. Props should be well named and documented via JSDoc or inline comments.

Styling:

Global rules: app/globals.css.

For local scoping, create ComponentName.module.css next to the component or use inline styles / CSS-in-JS (follow existing repo pattern).
If PostCSS/Tailwind is used, respect existing config — do not change postcss.config.js without approval.
Exports: components should be default exported, or use named exports consistently across the repo.

No breaking changes: do not change next.config.ts, tsconfig.json, package.json scripts, or ESLint rules unless the change is explicitly requested and discussed.



-------
Hero Section: 

i want to put a GLB file of our rover in this section. In this page i want when it loads it should should the 3d image of our rover but as soon as we scroll down the page the rover slowly disintegrates with a animat

You are tasked with building the final production version of a 3D Mars Rover website. The prototype was built in React/Vite/JSX, but this version MUST use Next.js and TypeScript (TSX).

The core feature is a 3D visualization of a Mars Rover that starts fully assembled and "explodes" (disassembles) into its component parts as the user scrolls down the page.

Technology Stack
Framework: Next.js (App Router recommended).
Language: TypeScript (.tsx, .ts). Strictly typed.
3D Engine: Three.js via @react-three/fiber (R3F).
Helpers: @react-three/drei.
Styling: Tailwind CSS (recommended) or CSS Modules.
Implementation Guidelines for Next.js
1. Client Components ('use client')
Crucial: All R3F components (Canvas, 
Rover
, 
Experience
) heavily rely on React hooks (useRef, useFrame, useThree) and browser-only APIs (window, document).
Rule: You MUST add the 'use client' directive at the top of any file containing 3D components or logic.
2. Scene & Model Management
Loader: Use useGLTF from @react-three/drei.
TypeScript Tip: You may need to define or infer the type of the GLTF result if not using a code-generated hook.
Scene Hierarchy Strategy:
CRITICAL: The original GLB scene hierarchy is preserved.
No Reparenting: Render the full <primitive object={scene} />. Do not break the model into separate groups.
Centering Logic: Calculate the bounding box of the scene in useLayoutEffect, determine its center, and apply the inverse vector to scene.position.
3. Animation Logic (The "Explosion")
Mechanism: Scroll progress via useScroll (from @react-three/drei) inside useFrame.
Reference Frame (Relative Animation):
On mount, traverse the scene and store the initial position and rotation of every mesh in a useRef.
Data Structure: Record<string, { position: THREE.Vector3, rotation: THREE.Euler }>
Formula: Current = Initial + (Direction * Offset * ScrollProgress)
Unification: Use a single scroll range 
(0, 1)
 for ALL parts. Do not stagger animations. All parts should explode simultaneously relative to their position from 0 (assembled) to 1 (exploded).
4. Interaction & Controls
OrbitControls: Use @react-three/drei.
Conditional Zoom:
Default enableZoom={false}.
Listen for keydown and keyup on window for Event.key === 'Control'.
Toggle enableZoom to true only when Ctrl is held.
TypeScript Tip: Properly type the event handlers (KeyboardEvent).
5. Application Structure (Next.js)
page.tsx: Renders the main Scene container.
components/Scene.tsx (Client Component): Contains the <Canvas> and the 
Experience
.
components/Experience.tsx: Lighting, ScrollControls, OrbitControls.
components/Rover.tsx: The model logic, centering, and animation.

-----------

Contact Us Section: 
This Contact Us page must be built as part of a one-page scrolling website where the floating navbar stays fixed at the top of all sections and must use the exact same navbar component, structure, style, and animation from https://ui.aceternity.com/components/floating-navbar fully integrated into this section. The Contact Us UI must be recreated exactly as shown in the provided screenshot, including the same dark starry background, the same layout and proportions for all input fields (Name, Email, Nationality, Number, and a large Message textarea), thin white outlines on all inputs, and identical spacing, typography, and alignment. The Submit button must match the screenshot in color, border style, size, and hover animation. The DJS Antariksh official logo must appear exactly like in the screenshot at the bottom-left, and the Instagram, GitHub, Email, and LinkedIn icons must appear at the bottom-right exactly as shown, each wrapped in anchor tags so they are clickable. The output must consist of clean, readable, production-ready react TypeScript, structured so that this section can plug directly into a single-page scrolling layout and styled consistently with the screenshot and the overall DJS Antariksh theme.

------
Our Rover Section:

I want the UI to be in a way that our rover GLB file should stay in the centre of the page in which we can move the 3D image of the rover with the help of our cursor , i want to specify the rover details in two columns which will be on the either side of the GLB file . The Name of the rover should be centre aligned above the 3D image of the rover . The columns for the rover details should be a bit wide so that all the technical details can be seen properly . I want 4 GLB images one after the another for 4 different rover iterations and for that i will also need forward and back arrows for the toggle to see different iterations, these buttons will be on the right and the left side seperately for forward and backward movement of the different rover iterations. The overall UI of the other iteration pages will be the same as i mentioned here 

------
Departments Section : 
Create a design for a website “Departments” section featuring a large 3D circular disk divided into multiple sectors, each representing a department such as Coding, Electronics, Mechanical, Marketing, and Science. Each sector should have a realistic texture or image related to that field, all arranged in a sleek, metallic, slightly futuristic disk. At the center, include a rounded label saying “Departments.” Show the disk as interactive: on hover, the selected sector should expand slightly, and the entire disk should appear draggable/rotatable with click-and-drag motion, giving it the feel of an interactive spinning wheel. The design should look modern, clean, and high-quality with smooth shadows, depth, and glossy highlights. Place the disk inside a rectangular card . 

-----
Competitions Section:
Competitions Section: Component Specification & Content

1. Visual Design & Behavior (The "Carousel")

Layout Concept: A horizontal, interactive "infinite scroll" or "snap-scroll" carousel containing 5 distinct square cards.
Interaction:

Drag & Scroll: Users can click and hold to drag the row of images left or right (horizontal scrolling).

Center Focus: The carousel should snap the nearest card to the center of the viewport.

Active State (The "Hover" Effect): The card currently in the center (or being hovered over) transforms:

Overlay: A dark, glassmorphism overlay slides up or fades in over the image.

Text Reveal: Animated text appears on top of the overlay explaining the competition and the team's rank.

Scale: The center card scales up slightly (1.1x) to indicate focus, while side cards remain standard size or fade slightly.

2. Card Content Data (The 5 Squares)

Card 1: International Rover Challenge (IRC)

Title: IRC

Full Name: International Rover Challenge

Location: India

Description (Overlay Text): Asia's premier rover competition held in simulated Martian terrain. Teams compete in science, maintenance, and autonomous navigation tasks.

Team Highlight: Rank #3 Worldwide (2024)

Visual Cue: Image of the rover Abhyaan traversing red soil in India.

Card 2: International Space Drone Challenge (ISDC)

Title: ISDC

Full Name: International Space Drone Challenge

Description (Overlay Text): A specialized challenge for designing autonomous aerial systems (drones) capable of flight in planetary atmospheres to assist rovers.

Team Highlight: Rank #2 Worldwide (2024)

Visual Cue: Image of the team's drone prototype or aerial schematics.

Card 3: International Rover Design Challenge (IRDC)

Title: IRDC

Full Name: International Rover Design Challenge

Description (Overlay Text): A global engineering design competition focusing on the theoretical and CAD-based development of next-gen Mars rovers.

Team Highlight: Rank #3 Worldwide (2022)

Visual Cue: High-fidelity CAD render of a rover chassis or wheel assembly.

Card 4: European Rover Challenge (ERC) - On-Site

Title: ERC On-Site

Full Name: European Rover Challenge (Poland)

Location: Kielce, Poland

Description (Overlay Text): The world's most prestigious space robotics event. Teams travel to Poland to operate on the world's largest artificial Mars Yard.

Team Highlight: Rank #1 Worldwide (Qualification 2025)

Visual Cue: Action shot of the rover arm manipulating a panel or flipping a switch.

Card 5: European Rover Challenge (ERC) - Remote

Title: ERC Remote

Full Name: European Rover Challenge (Remote Edition)

Description (Overlay Text): A unique format where teams control a standardized rover located in Poland from their home country, testing software autonomy and latency management.

Team Highlight: Rank #1 Worldwide (2021 & 2022) (Back-to-Back Champions)

Visual Cue: Split screen showing the team in the control room and the rover feed.

3. Technical Implementation Notes (For Developers)

Container: flex-row, overflow-x-scroll, snap-x (Tailwind).

Card Dimensions: Fixed square aspect ratio (e.g., w-64 h-64 or aspect-square).

Animations: Use Framer Motion for the drag physics and the layout spring animations.

Exit/Enter: When text overlays appear, use a smooth opacity: 0 to opacity: 1 transition with a slight y axis slide.

Mobile Responsiveness: On mobile, this should remain a horizontal scroll, but the "center focus" becomes even more critical as hover doesn't exist.
-----
Footer Section:
Design a clean, minimal website footer on xyz(colour) background. On the far left, place a rectangular logo area with a simple placeholder logo and a small subtitle block beside it. Keep both elements aligned horizontally. On the far right, place a row of five social media icons(Instagram, Facebook, X (Twitter), LinkedIn, and YouTube)each inside small white rounded-square icon containers. Space the icons evenly and align them horizontally. Maintain a large empty horizontal gap between the left logo section and the right icon section for a balanced, spacious layout. Use a flat, modern style with no gradients, subtle shadows, and a clean, professional look. The footer should be low-height and unobtrusive, spanning the full width of the page.

-----
Loading Page: 

Use this loader design for my loading page: https://uiverse.io/00Kubi/fast-walrus-2

I want a clean, modern loading screen for a Next.js + TypeScript + Tailwind project that uses the exact same visual style and animation as the "Fast Walrus 2" loader from Uiverse. Recreate the loader in React (do NOT copy-paste raw code unless MIT safe), keeping the same animation style, colors, and motion feel.

Requirements:
- Center the loader on the screen.
- Include a small loading message under it.
- Make it responsive and minimal.
- Use Tailwind for layout and your choice of CSS or keyframes for animation.
- Output a ready-to-use React component called LoadingPage.

------
Sponsors :
 The layout should include a centered title “Sponsors” in a(specify colour) bar. Below it, display six sponsor cards arranged in a 3×2 grid. Each card should be a simple rounded rectangle placeholder with soft shadows and equal spacing. The background should be a subtle (background-color) panel with smooth padding.  The design should match a futuristic tech aesthetic suitable for a university rover team, with clean alignment, symmetry, and balanced spacing.

------
NavBar: 

Link given below is for navbar. Make sure you include the code mentioned in website(link given below in the links section) in sections/navBar.tsx

------
Our Drone Section:

I want the UI to be in a way that our drone GLB file should stay in the centre of the page in which we can move the 3D image of the ddrone with the help of our cursor , i want to specify the drone details in two columns which will be on the either side of the 3D image. The Name of the drone should be centre aligned above the 3D image of the drone . The columns for the drone details should be a bit wide so that all the technical details can be seen properly . I want 2 GLB images one after the another for 2 different drone iterations and for that i will also need forward and back arrows for the toggle to see different iterations, these buttons will be on the right and the left side seperately for forward and backward movement of the different drone iterations. The overall UI of the other iteration pages will be the same as i mentioned here 

-------
Team Section (Core Structure):
The layout should hdisplay a hierarchy-style layout of the core team, using rounded rectangular cards for each member.
Structure:
Top Level (1 card)
One centered rounded card for the Captain.Card contains:
Rounded profile image placeholder
Name text
Role/Position text
Second Level (3 cards)
Three rounded member cards placed horizontally:
Vice Captain(s)
Team Manager(s)
Each card includes:
Profile image placeholder
Name
Role text
Third Level (Multiple cards in one row)
A horizontal row of rounded cards for department heads:
Mechanical Head
Coding Head
Science Head
Marketing / Management Head
Integration Head
Etc.
Each card contains:
Profile image placeholder
Name
Role text

All team member cards must have rounded corners.
Keep spacing consistent and visually hierarchical.

-------
Achievements Section: 

The layout should include a  large heading titled Achievements in the center.
Under the heading, place two large rectangular cards with rounded edges side by side, equal size:
Each card contains:
A large placeholder box for Image.
A text section below it for Dates & Details.
On the left and right sides of the two cards, add left and right arrow buttons for navigation.
Near the bottom center of the page, add three small slider indicator dots horizontally.


------
Links:
LOADING : https://uiverse.io/00Kubi/fast-walrus-2

Departments: 
Mech : https://uiverse.io/Nawsome/fresh-panther-41
Coding : https://reactbits.dev/backgrounds/letter-glitch

For text : https://reactbits.dev/text-animations/scroll-reveal


Navbar : https://reactbits.dev/components/pill-nav
Sponsors : https://reactbits.dev/animations/logo-loop

------

Video :
2024 : https://www.youtube.com/watch?v=-kD3rZAMYdg
2025 :https://www.youtube.com/watch?v=3iWMzUXBsAk&t=270s
2026 : https://www.youtube.com/watch?v=OEYZWgZUsKU