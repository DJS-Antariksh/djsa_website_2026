"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TiltedCard from "./card";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // All About Us images
  const images = [
    "/aboutus_images/IRC25_exhibition.jpg",
    "/aboutus_images/ERC_2025_TRADS.jpg",
    "/aboutus_images/about7.jpg",
    "/aboutus_images/about6.jpg",
    "/aboutus_images/about4.jpg",
    "/aboutus_images/about3.jpg",
    "/aboutus_images/about2.jpg",
    "/aboutus_images/about1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle through all images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="overflow-x-hidden px-4 sm:px-8 md:px-16 py-3 md:py-5"
    >
      {/* Heading */}
      <motion.h2
        className="text-white text-center font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-display)" }}
      >
        About the Team
      </motion.h2>
      <div className=" h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-6" />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-start mt-0 max-w-6xl mx-auto">

        {/* Tilted Card */}
        <motion.div
          className="
            w-full
            lg:w-1/2
            max-w-[20rem]
            sm:max-w-[23rem]
            md:max-w-[26rem]
            lg:max-w-[28rem]
            mx-auto
          "
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <TiltedCard
            imageSrc={images[currentIndex]}  // <-- cycling through all images
            captionText=""
            descriptionText=""
            containerHeight={350}
            containerWidth={480}
            scaleOnHover={1.08}
            rotateAmplitude={12}
            showTooltip={false}
          />
        </motion.div>

        {/* Text + Boxes */}
        <motion.div
          className="
            w-full 
            lg:w-1/2
            text-white 
            font-poppins 
            font-light
            text-sm sm:text-base md:text-lg
            leading-relaxed
            text-justify
          "
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p>
            DJS Antariksh is the official Martian Rover Team of Dwarkadas J.
            Sanghvi College of Engineering, affiliated with the University of
            Mumbai. Founded in 2019, the team comprises 60 undergraduate
            students united by a shared passion for technology and space
            exploration.
            <br /><br />
            With the motto <strong>"To Decipher Unimaginable"</strong>, the team
            strives to push the boundaries of innovation and space technology
            through research, collaboration, and rover development.
          </p>

          {/* Boxes */}
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
            <div className="text-center p-4 rounded-xl bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/20 transition-all duration-300 hover:scale-110 hover:shadow-[inset_0_0_20px_var(--primary)] hover:shadow-primary/20 hover:border-[var(--primary)]/50">
              <div className="text-xl md:text-2xl font-semibold text-[var(--primary)]">60+</div>
              <div className="text-xs text-white/70 mt-1">Engineers</div>
            </div>

            <div className="text-center p-4 rounded-xl bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/20 transition-all duration-300 hover:scale-110 hover:shadow-[inset_0_0_20px_var(--primary)] hover:shadow-primary/20 hover:border-[var(--primary)]/50">
              <div className="text-xl md:text-2xl font-semibold text-[var(--primary)]">5+</div>
              <div className="text-xs text-white/70 mt-1">Years</div>
            </div>

            <div className="text-center p-4 rounded-xl bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/20 transition-all duration-300 hover:scale-110 hover:shadow-[inset_0_0_20px_var(--primary)] hover:shadow-primary/20 hover:border-[var(--primary)]/50">
              <div className="text-xl md:text-2xl font-semibold text-[var(--primary)]">5</div>
              <div className="text-xs text-white/70 mt-1">Departments</div>
            </div>
          </div>

        </motion.div>
      </div>
    </section >
  );
}
