"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram, Github, Linkedin, Mail } from "lucide-react"

export default function ContactUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", nationality: "", number: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/djsantariksh", label: "Instagram" },
    { icon: Github, href: "https://github.com/djsantariksh", label: "GitHub" },
    { icon: Mail, href: "mailto:contact@djsantariksh.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/company/djsantariksh", label: "LinkedIn" },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative h-screen flex items-center px-4 md:px-8 lg:px-16 stars-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

      <div className="relative max-w-5xl mx-auto w-full">
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
            Contact Us
          </h2>
          <p className="text-muted-foreground text-sm">Get in touch with us</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <input
                  type="tel"
                  name="number"
                  placeholder="Phone Number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2.5 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Follow us on social media to stay updated with our latest projects, competitions, and achievements.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Location</h4>
                <p className="text-muted-foreground text-xs">
                  Dwarkadas J. Sanghvi College of Engineering, Mumbai, Maharashtra, India
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Email</h4>
                <p className="text-muted-foreground text-xs">contact@djsantariksh.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
