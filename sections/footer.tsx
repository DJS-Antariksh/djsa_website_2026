"use client"

import { useEffect, useRef } from "react"
import { Instagram, Facebook, Linkedin, Youtube, Mail, MapPin, ExternalLink } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const XLogo = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)

  const competitions = [
    { label: "European Rover Challenge", href: "https://roverchallenge.eu" },
    { label: "International Rover Challenge", href: "https://roverchallenge.org/irc/" },
    { label: "International Space Drone Challenge", href: "https://roverchallenge.org/isdc/" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/djs_antariksh/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100063880216755", label: "Facebook" },
    { icon: XLogo, href: "http://x.com/djs_antariksh", label: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/djs-antariksh/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@djsantariksh", label: "YouTube" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".footer-animate")
      elements.forEach((el: any, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-zinc-950 border-t border-zinc-800">
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Competitions */}
          <div
            className="footer-animate text-center flex flex-col items-center justify-center h-full"
          >
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Competitions</h4>
            <ul className="space-y-3 flex flex-col items-center">
              {competitions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 text-sm hover:text-[#c9a23a] transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Brand Section */}

          <div
            className="lg:col-span-1 footer-animate flex flex-col items-center justify-center h-full"
          >
            <div className="flex items-center">
              <div className="h-36 w-auto flex flex-col items-center mx-auto">
                <img
                  src="/brand/AntarikshLogo.png"
                  alt="DJS Antariksh Logo"
                  className="h-full w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-shadow duration-300"
                />
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 text-center">
              The official Mars Rover team of Dwarkadas J. Sanghvi College of Engineering. Building the future of space
              exploration.
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-animate flex flex-col items-center text-center justify-center h-full">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-0 justify-center">
                <MapPin className="w-4 h-4 text-[#c9a23a] mt-0.5 flex-shrink-0" />
                <p className="text-zinc-400 text-sm">
                  DJ Sanghvi College of Engineering, Vile Parle (W), Mumbai - 400056
                </p>
              </li>

              <li className="flex items-center gap-3 justify-center">
                <Mail className="w-4 h-4 text-[#c9a23a] flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=djsantariksh@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 text-sm hover:text-[#c9a23a] transition-colors"
                >
                  djsantariksh@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-8 relative z-10 w-full flex justify-center">
              <FloatingDock
                items={socialLinks.map(link => ({
                  title: link.label,
                  icon: (
                    <link.icon
                      className={`h-full w-full text-neutral-500 dark:text-neutral-300 transition-colors duration-200`}
                    />
                  ),
                  href: link.href
                }))}
                desktopClassName="mx-0 bg-transparent dark:bg-transparent px-0 pb-0 h-auto gap-3"
                mobileClassName="absolute right-0 bottom-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 footer-bottom"
          >
            <p className="text-zinc-500 text-sm">© {currentYear} DJS Antariksh. All rights reserved.</p>
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              Made with passion for space exploration
              <span className="text-[#c9a23a]">★</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
