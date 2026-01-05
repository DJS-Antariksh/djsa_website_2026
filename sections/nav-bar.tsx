"use client"

import { useState, useEffect } from "react"
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
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const isCompetitionPage = pathname === "/irc" || pathname === "/erc"

  useEffect(() => {
    setMounted(true)
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
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        scrolled ? "top-2" : "top-4"
      } ${mounted ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
    >
      <nav className="glass rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 transition-colors duration-300">

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
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavDockItem
              key={item.name}
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
    </header>
  )
}

/* ---------------- Dock Item ---------------- */

function NavDockItem({
  item,
  active,
  disabled,
}: {
  item: { name: string; href: string }
  active: boolean
  disabled: boolean
}) {
  return (
    <Link
      href={item.href}
      onClick={(e) => disabled && e.preventDefault()}
      className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
        disabled
          ? "text-muted-foreground cursor-not-allowed"
          : active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      }`}
    >
      {item.name}
    </Link>
  )
}
