"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { teamData } from "@/data/site-data"

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const captain = teamData.filter((m) => m.level === "captain")
  const leads = teamData.filter((m) => m.level === "lead")
  const departments = teamData.filter((m) => m.level === "department")

  const TeamCard = ({
    member,
    index,
    size = "normal",
  }: { member: (typeof teamData)[0]; index: number; size?: "small" | "normal" | "large" }) => {
    const sizeClasses = {
      small: "w-14 h-14 md:w-16 md:h-16",
      normal: "w-16 h-16 md:w-20 md:h-20",
      large: "w-20 h-20 md:w-24 md:h-24",
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-2 group">
          <div
            className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors`}
          >
            <img
              src={member.image || "/placeholder.svg?height=100&width=100&query=professional headshot"}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 blur-xl -z-10" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-foreground text-xs md:text-sm">{member.name}</h3>
          <p className="text-[10px] md:text-xs text-muted-foreground">{member.role}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <section
      ref={ref}
      id="team"
      className="relative h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2
            className="text-2xl md:text-4xl font-display font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Team
          </h2>
          <p className="text-muted-foreground text-sm">60+ engineers working towards a common goal</p>
        </motion.div>

        {/* Hierarchy Layout - Compact */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Captain - Top Level */}
          <div className="flex justify-center">
            {captain.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} size="large" />
            ))}
          </div>

          {/* Connecting line */}
          <div className="w-px h-4 bg-border" />

          {/* Vice Captains & Manager - Second Level */}
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            {leads.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index + 1} size="normal" />
            ))}
          </div>

          {/* Connecting line */}
          <div className="w-px h-4 bg-border" />

          {/* Department Leads - Third Level */}
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap max-w-4xl">
            {departments.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index + 4} size="small" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
