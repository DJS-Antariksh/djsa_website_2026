"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { teamData, teamDataByYear } from "@/data/site-data"
import { YearTabs } from "@/components/YearTabs"

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeYear, setActiveYear] = useState("2025-2026")

  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025", "2025-2026"]
  const currentTeam = teamDataByYear[activeYear] || []

  const captain = currentTeam.filter((m) => m.level === "captain")
  const leads = currentTeam.filter((m) => m.level === "lead")
  const departments = currentTeam.filter((m) => m.level === "department")

  // Title Animation - runs only once
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Cards Animation - runs when activeYear changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".team-card")
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeYear])

  const TeamCard = ({
    member,
  }: { member: (typeof teamData)[0]; size?: "small" | "normal" | "large" }) => {
    // Uniform size for all members as requested
    const sizeClass = "w-20 h-20 md:w-24 md:h-24"

    const ImageContainer = (
      <div className="relative mb-2">
        <div
          className={`${sizeClass} rounded-2xl overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all duration-300 shadow-lg shadow-primary/5 group-hover:shadow-primary/20 relative`}
        >
          <img
            src={member.image || "/placeholder.svg?height=100&width=100&query=professional headshot"}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
          {member.linkedin && (
            <div className="absolute top-1 right-1 p-1 bg-white/90 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
              <img src="/linkedin.png" alt="LinkedIn" className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 blur-xl -z-10" />
      </div>
    )

    return (
      <div className="team-card flex flex-col items-center group opacity-0">
        {member.linkedin ? (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            {ImageContainer}
          </a>
        ) : (
          ImageContainer
        )}
        <div className="text-center max-w-[120px]">
          <h3 className="font-bold text-foreground text-xs md:text-sm leading-tight mb-1">{member.name}</h3>
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium">{member.role}</p>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative min-h-screen flex flex-col justify-center py-12 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-8 opacity-0">
          <h2
            className="text-3xl md:text-5xl font-display font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Team
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            The team that turns imagination into innovation
          </p>
        </div>

        <YearTabs years={years} activeYear={activeYear} onChange={setActiveYear} />

        {/* Hierarchy Layout */}
        <div ref={cardsRef} className="flex flex-col items-center gap-1 md:gap-2 w-full">
          {/* Captain - Top Level */}
          {captain.length > 0 && (
            <div className="flex justify-center gap-2 md:gap-4 w-full">
              {captain.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}

          {/* Connecting line if both levels exist */}
          {captain.length > 0 && leads.length > 0 && (
            <div className="w-px h-3 bg-gradient-to-b from-primary/50 to-transparent" />
          )}

          {/* Leads - Second Level */}
          {leads.length > 0 && (
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap w-full">
              {leads.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}

          {/* Connecting line if both levels exist */}
          {leads.length > 0 && departments.length > 0 && (
            <div className="w-px h-3 bg-gradient-to-b from-primary/50 to-transparent" />
          )}

          {/* Department Leads/Members - Third Level */}
          {departments.length > 0 && (
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap max-w-6xl w-full">
              {departments.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
