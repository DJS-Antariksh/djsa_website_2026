import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import CanvasLoader from "@/components/canvas-loader"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  icons: {
    icon: '/brand/AntarikshLogo.png',
  },
  title: "DJS Antariksh",
  description:
    "Official Martian Rover Team of Dwarkadas J. Sanghvi College of Engineering",
  keywords: ["Mars Rover", "DJS Antariksh", "DJSCE", "European Rover Challenge", "Robotics", "Space", "International Rover Challenge", "Space Exploration", "Space Robotics", "Space Technology", "Space Research", "Space Science", "Space Exploration"],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} font-sans antialiased text-foreground bg-black`}
      >
        {/* Universal Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full z-0 overflow-hidden object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Shared WebGL Canvas Removed in favor of individual canvases */}
        {/* <CanvasLoader /> */}

        {/* Page Content */}
        <main className="relative z-10 bg-transparent">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

