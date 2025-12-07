import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron, Space_Grotesk } from "next/font/google"
import Galaxy from "@/components/ui/Galaxy"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  title: "DJS Antariksh - Official Martian Rover Team",
  description:
    "Official Martian Rover Team of Dwarkadas J. Sanghvi College of Engineering. World Champions at European Rover Challenge.",
  keywords: ["Mars Rover", "DJS Antariksh", "DJSCE", "European Rover Challenge", "Robotics", "Space"],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} font-sans antialiased text-foreground bg-black`}
      >
        {/* Universal Background Overlay */}
        <div className="fixed inset-0 w-full h-full z-50 pointer-events-none mix-blend-screen">
          <Galaxy mouseInteraction={false} mouseRepulsion={false} />
        </div>

        {/* Page Content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
