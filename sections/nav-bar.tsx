"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const isCompetitionPage = pathname === "/irc" || pathname === "/erc"

  const mouseX = useMotionValue(Infinity)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (isCompetitionPage) return

      const sections = [
        "hero",
        "about",
        "rover",
        "departments",
        "team",
        "achievements",
        "videos",
        "contact",
      ]

      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 150) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isCompetitionPage])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all ${
        scrolled ? "top-2" : "top-4"
      }`}
    >
      <nav className="glass rounded-full px-2 py-2 flex items-center gap-1 md:gap-2">

        {/* LOGO */}
        <Link
          href="/#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            setActiveSection("hero")
          }}
          className="px-4 py-2 text-sm font-bold text-primary"
        >
          DJSA
        </Link>

        {/* ✅ MOBILE: About + IRC ONLY */}
        <div className="flex md:hidden items-center gap-1">
          <Link
            href="#about"
            className="px-3 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            About
          </Link>

          <Link
            href="/irc"
            className={`px-3 py-2 text-sm rounded-full transition
              ${
                pathname === "/irc"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            IRC
          </Link>
        </div>

        {/* ✅ DESKTOP NAV ITEMS */}
        <div
          className="hidden md:flex items-center gap-1"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {navItems.map((item) => (
            <NavDockItem
              key={item.name}
              mouseX={mouseX}
              item={item}
              active={activeSection === item.href.slice(1)}
              disabled={isCompetitionPage}
            />
          ))}

          {/* IRC */}
          <Link
            href="/irc"
            className={`px-4 py-2 text-sm rounded-full transition
              ${
                pathname === "/irc"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            IRC
          </Link>

          {/* ERC */}
          <Link
            href="/erc"
            className={`px-4 py-2 text-sm rounded-full transition
              ${
                pathname === "/erc"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            ERC
          </Link>
        </div>

        {/* ✅ MOBILE MENU BUTTON */}
        <button
          className="md:hidden ml-auto px-3 py-2 rounded-full hover:bg-white/5"
          onClick={() => setMobileMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-foreground mb-1" />
          <span className="block w-5 h-0.5 bg-foreground mb-1" />
          <span className="block w-5 h-0.5 bg-foreground" />
        </button>

        {/* ✅ MOBILE MENU CONTENT */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 glass rounded-xl p-2 flex flex-col gap-1">
            {navItems
              .filter((item) => item.name !== "About")
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm text-center text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {item.name}
                </Link>
              ))}

            {/* ERC only here */}
            <Link
              href="/erc"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-sm text-center transition
                ${
                  pathname === "/erc"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              ERC
            </Link>
          </div>
        )}
      </nav>
    </motion.header>
  )
}

/* ---------------- Dock Item ---------------- */

function NavDockItem({
  mouseX,
  item,
  active,
  disabled,
}: {
  mouseX: MotionValue
  item: { name: string; href: string }
  active: boolean
  disabled: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    return bounds ? val - bounds.x - bounds.width / 2 : Infinity
  })

  const scale = useSpring(
    useTransform(distance, [-150, 0, 150], [1, 1.15, 1]),
    { stiffness: 150, damping: 12 }
  )

  return (
    <motion.div ref={ref} style={{ scale }}>
      <Link
        href={item.href}
        onClick={(e) => disabled && e.preventDefault()}
        className={`px-4 py-2 rounded-full text-sm transition
          ${
            disabled
              ? "text-muted-foreground cursor-not-allowed"
              : active
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
      >
        {item.name}
      </Link>
    </motion.div>
  )
}
