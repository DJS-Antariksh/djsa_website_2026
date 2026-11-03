"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DepthCarousel from "@/components/DepthCarousel";

// 2026 season images first, followed by the older archive
const ABOUT_IMAGES = [
  { image: "/aboutus_images/ERC_2026.webp", alt: "DJS Antariksh at the European Rover Challenge 2026" },
  { image: "/aboutus_images/about_2026_1.webp", alt: "DJS Antariksh team at work in 2026" },
  { image: "/aboutus_images/ERC_2025_TRADS.jpg", alt: "DJS Antariksh at the European Rover Challenge 2025" },
  { image: "/aboutus_images/IRC25_exhibition.jpg", alt: "DJS Antariksh exhibition at the Indian Rover Challenge 2025" },
  { image: "/aboutus_images/about8.JPG", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about7.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about6.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about5.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about4.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about3.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about2.jpg", alt: "DJS Antariksh team members" },
  { image: "/aboutus_images/about1.jpg", alt: "DJS Antariksh team members" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  // Only run the carousel autoplay while it is actually on screen, so it starts
  // on the 2026 photo instead of advancing while the section is below the fold.
  const isCarouselVisible = useInView(ref, { amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="overflow-x-clip px-4 sm:px-8 md:px-16 py-3 md:py-5"
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

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-stretch mt-0 max-w-6xl mx-auto">

        {/* Depth Carousel */}
        <motion.div
          className="relative w-full lg:w-[55%] max-w-[34rem] lg:max-w-none mx-auto"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="relative w-full h-[320px] sm:h-[350px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[calc(100%+6rem)] xl:w-[calc(100%+8rem)]">
            <DepthCarousel
              items={ABOUT_IMAGES}
              cardWidth={540}
              cardHeight={394}
              radius={15}
              depth={170}
              spread={90}
              tilt={20}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.25}
              blur={5}
              autoplay={isCarouselVisible}
              autoplayDelay={3000}
              loop
              showControls
              showIndicators={false}
            />
          </div>
        </motion.div>

        {/* Text + Boxes */}
        <motion.div
          className="
            w-full
            lg:w-[45%]
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
              <div className="text-xl md:text-2xl font-semibold text-[var(--primary)]">60</div>
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
