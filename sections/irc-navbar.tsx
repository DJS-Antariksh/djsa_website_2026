"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const navItems = [
    { name: "About IRC", href: "#about" },
    { name: "Missions", href: "#missions" },
    { name: "Our Experience", href: "#experience" },
]

export default function IRCNavbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("about")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Determine active section
            const sections = ["about", "missions", "experience"]
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
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${scrolled ? "top-2" : "top-4"
                }`}
        >
            <nav className="glass rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 relative">

                {/* Nav Items (Desktop) */}
                <div className="hidden md:flex items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.href.slice(1)
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile menu toggle */}
                <button
                    type="button"
                    className="md:hidden ml-auto px-3 py-2 rounded-full hover:bg-white/5 transition"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span className="block w-5 h-0.5 bg-foreground mb-1" />
                    <span className="block w-5 h-0.5 bg-foreground mb-1" />
                    <span className="block w-5 h-0.5 bg-foreground" />
                </button>

                {/* Mobile menu dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full right-0 mt-1 w-48 rounded-lg px-1.5 py-1.5 flex flex-col gap-0.5 shadow-lg glass">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-3 py-2 rounded-xl text-sm text-center ${activeSection === item.href.slice(1)
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </motion.header>
    )
}
