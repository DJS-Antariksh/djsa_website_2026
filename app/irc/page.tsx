"use client"

import Link from "next/link"
import NavBar from "@/sections/nav-bar"

export default function IRCPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />

      <section className="pt-32 pb-16 px-6 md:px-10 lg:px-16 max-w-5xl mx-auto text-center space-y-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          International Rover Challenge
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">IRC Mission Hub</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Follow our journey to the International Rover Challenge. Get event details, schedules, and live updates as we
          push our rover to the limit.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
          <Link
            href="/#achievements"
            className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            View Achievements
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-3 rounded-full border border-foreground/20 text-foreground font-semibold hover:border-primary hover:text-primary transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
