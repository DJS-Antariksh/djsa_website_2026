"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CompetitionNavbar() {
    const pathname = usePathname()
    const isERC = pathname.startsWith("/erc")
    const isIRC = pathname.startsWith("/irc")

    const navItems = [
        { name: isERC ? "About ERC" : "About IRC", href: "#about" },
        { name: "Missions", href: "#missions" },
        { name: "Our Experience", href: "#experience" },
    ]

    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("about")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

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
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
                scrolled ? "top-2" : "top-4"
            }`}
        >
            <nav className="glass rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 relative">
                <div className="hidden md:flex items-center">
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
            </nav>
        </motion.header>
    )
}
