"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface YearTabsProps {
    years: string[]
    activeYear: string
    onChange: (year: string) => void
}

export function YearTabs({ years, activeYear, onChange }: YearTabsProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const activeTab = containerRef.current.querySelector(`button[data-active="true"]`)
        if (activeTab) {
            const bg = activeTab.querySelector(".active-bg")
            const line = activeTab.querySelector(".active-line")

            if (bg) {
                gsap.fromTo(bg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
            }
            if (line) {
                gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" })
            }
        }
    }, [activeYear])

    return (
        <div ref={containerRef} className="flex flex-wrap justify-center gap-2 mb-12">
            {years.map((year) => (
                <button
                    key={year}
                    onClick={() => onChange(year)}
                    data-active={activeYear === year}
                    className={`relative px-4 py-2 text-sm md:text-base transition-colors ${activeYear === year ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {activeYear === year && (
                        <div className="active-bg absolute inset-0 bg-primary/10 rounded-full -z-10" />
                    )}
                    {year}
                    {activeYear === year && (
                        <div className="active-line absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-center" />
                    )}
                </button>
            ))}
        </div>
    )
}
