"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"


export default function ContactUs() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", nationality: "", number: "", message: "" })
  const [loading, setLoading] = useState(false)

  // Initialize EmailJS with public key
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    // Debug: log env vars (remove in production)
    console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? 'set' : 'missing' })

    if (!serviceId || !templateId || !publicKey) {
      toast.error("EmailJS configuration is missing. Please check environment variables.")
      setLoading(false)
      return
    }

    if (!formRef.current) {
      toast.error("Form reference is missing.")
      setLoading(false)
      return
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )

      console.log('EmailJS Success:', result)
      toast.success("Message sent successfully!")
      setFormData({ name: "", email: "", nationality: "", number: "", message: "" })
    } catch (error: any) {
      console.error("EmailJS Error Details:", {
        error,
        text: error?.text,
        status: error?.status,
        message: error?.message
      })

      const errorMessage = error?.text || error?.message || "Unknown error occurred"
      toast.error(`Failed to send message: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  return (
          <section
        ref={ref}
        id="contact"
        className="
          relative
          min-h-fit
          md:min-h-screen
          py-12 md:py-16
          flex
          items-start md:items-center
          px-4 sm:px-6 md:px-8 lg:px-16
          stars-bg
          overflow-hidden
          mt-0
          md:-mt-16
          mb-24 md:mb-0
        "
      >
      <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background" />

      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2
            className="text-2xl md:text-4xl font-display font-bold mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact Us
          </h2>
          <div className=" h-1 w-24 mx-auto bg-linear-to-r from-transparent via-[var(--primary)] to-transparent" />
          <p className="text-muted-foreground text-sm">Get in touch with us</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-4 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-4 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-4 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <input
                  type="tel"
                  name="number"
                  placeholder="Phone Number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-3 py-4 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-4 bg-transparent border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="relative w-full h-[260px] sm:h-[300px] md:h-full rounded-lg overflow-hidden border border-white/20">
                <div className="w-full h-full relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?hl=en&q=SVKM%27s%20Dwarkadas%20J.%20Sanghvi%20College%20of%20Engineering&z=14&output=embed"
                  />
                  <a
                    href="https://sprunkiretake.net"
                    style={{
                      fontSize: '2px',
                      color: 'gray',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      zIndex: 1,
                      maxHeight: '1px',
                      overflow: 'hidden'
                    }}
                  >
                    sprunki retake
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>  
    </section >
  )
}
