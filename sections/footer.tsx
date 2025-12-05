"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Rover", href: "#rover" },
    { label: "Drone", href: "#drone" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ]

  const competitions = [
    { label: "European Rover Challenge", href: "https://roverchallenge.eu" },
    { label: "International Rover Challenge", href: "#" },
    { label: "International Space Drone Challenge", href: "#" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/djsantariksh", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/djsantariksh", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/djsantariksh", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/djsantariksh", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@djsantariksh", label: "YouTube" },
  ]

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              {/* Logo placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a23a] to-[#8b6914] flex items-center justify-center">
                <span className="text-white text-xs font-bold">DJSA</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">DJS Antariksh</h3>
                <p className="text-[#c9a23a] text-xs">Mars Rover Team</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              The official Mars Rover team of Dwarkadas J. Sanghvi College of Engineering. Building the future of space
              exploration.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-[#c9a23a] flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-[#c9a23a] transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Competitions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Competitions</h4>
            <ul className="space-y-3">
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
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c9a23a] mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">
                  DJ Sanghvi College of Engineering, Vile Parle (W), Mumbai - 400056
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c9a23a] flex-shrink-0" />
                <a
                  href="mailto:djsantariksh@gmail.com"
                  className="text-zinc-400 text-sm hover:text-[#c9a23a] transition-colors"
                >
                  djsantariksh@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c9a23a] flex-shrink-0" />
                <span className="text-zinc-400 text-sm">+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-zinc-500 text-sm">© {currentYear} DJS Antariksh. All rights reserved.</p>
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              Made with passion for space exploration
              <span className="text-[#c9a23a]">★</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
