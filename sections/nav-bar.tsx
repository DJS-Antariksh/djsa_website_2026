"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Rovers", href: "#rover" },
  { name: "Departments", href: "#departments" },
  { name: "Team", href: "#team" },
  { name: "Achievements", href: "#achievements" },
  { name: "Videos", href: "#videos" },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showCompetitionMenu, setShowCompetitionMenu] = useState(false)
  const hideMenuTimeout = useRef<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isIrcPage = pathname?.startsWith("/irc")
  const isErcPage = pathname?.startsWith("/erc")
  const isCompetitionPage = isIrcPage || isErcPage
  const activeForView = isCompetitionPage ? "" : activeSection

  const primaryCompetition = isIrcPage ? { label: "ERC", href: "/erc" } : { label: "IRC", href: "/irc" }
  const dropdownOptions = isIrcPage
    ? []
    : isErcPage
      ? []
      : [{ label: "ERC", href: "/erc" }]

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

  const openCompetitionMenu = () => {
    if (hideMenuTimeout.current) {
      window.clearTimeout(hideMenuTimeout.current)
      hideMenuTimeout.current = null
    }
    setShowCompetitionMenu(true)
  }

  const closeCompetitionMenu = () => {
    if (hideMenuTimeout.current) {
      window.clearTimeout(hideMenuTimeout.current)
    }
    hideMenuTimeout.current = window.setTimeout(() => {
      setShowCompetitionMenu(false)
      hideMenuTimeout.current = null
    }, 200)
  }

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
          href={isCompetitionPage ? "/#hero" : "#hero"}
          className="px-4 py-2 text-sm font-display font-bold text-primary hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
          onClick={(event) => {
            if (isCompetitionPage) {
              event.preventDefault()
              // Force a full navigation back to hero to reset the main page state
              window.location.href = "/#hero"
            } else {
              event.preventDefault()
              // Scroll to the very top of the hero so the rover fully reassembles
              window.scrollTo({ top: 0, behavior: "smooth" })
              window.dispatchEvent(new Event("reset-rover-scroll"))
              setActiveSection("hero")
            }
          }}
        >
          DJSA
        </Link>

        {/* Nav Items (visible on IRC but no-op there) */}
        <div className="flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(event) => {
                if (isCompetitionPage) {
                  event.preventDefault()
                }
              }}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                isCompetitionPage
                  ? "text-muted-foreground cursor-not-allowed"
                  : activeForView === item.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Competition button with hover dropdown */}
        <div
          className="relative ml-2"
          onMouseEnter={() => {
            if (dropdownOptions.length === 0) return
            openCompetitionMenu()
          }}
          onMouseLeave={() => {
            if (dropdownOptions.length === 0) return
            closeCompetitionMenu()
          }}
        >
          <Link
            href={primaryCompetition.href}
            onClick={(event) => {
              if (isCompetitionPage && primaryCompetition.href === pathname) {
                event.preventDefault()
              }
            }}
            onMouseEnter={() => {
              if (dropdownOptions.length === 0) return
              openCompetitionMenu()
            }}
            className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            {primaryCompetition.label}
          </Link>
          {showCompetitionMenu && dropdownOptions.length > 0 && (
            <div
              className="absolute left-0 mt-2 w-full min-w-full rounded-2xl bg-foreground text-background shadow-lg overflow-hidden"
              onMouseEnter={openCompetitionMenu}
              onMouseLeave={closeCompetitionMenu}
            >
              {dropdownOptions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setShowCompetitionMenu(false)}
                  className="block px-4 py-3 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
