"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Playground", href: "#rover" },
  { name: "Resource", href: "#achievements" },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = [
        "hero",
        "about",
        "rover",
        "drone",
        "departments",
        "competitions",
        "team",
        "achievements",
        "sponsors",
        "videos",
        "contact",
      ]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        scrolled ? "top-2" : "top-4"
      }`}
    >
      <nav className="glass rounded-full px-2 py-2 flex items-center gap-1">
        {/* Logo */}
        <Link
          href="#hero"
          className="px-4 py-2 text-sm font-display font-bold text-primary hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DJSA
        </Link>

        {/* Nav Items */}
        <div className="flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                activeSection === item.href.slice(1)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* IRC Button */}
        <Link
          href="#contact"
          className="ml-2 px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          IRC
        </Link>
      </nav>
    </motion.header>
  )
}
