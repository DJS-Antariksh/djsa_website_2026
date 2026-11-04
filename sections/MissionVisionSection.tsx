"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DepthCarousel from "./DepthCarousel";

// New team photo first, followed by the earlier photos
const MISSION_IMAGES = [
  { image: "/missionandvision_images/missionandvision7.jpg", alt: "DJS Antariksh team at the competition" },
  { image: "/missionandvision_images/missionandvision1.jpg", alt: "DJS Antariksh team members" },
  { image: "/missionandvision_images/missionandvision2.jpg", alt: "DJS Antariksh team members" },
  { image: "/missionandvision_images/missionandvision3.jpg", alt: "DJS Antariksh team members" },
  { image: "/missionandvision_images/missionandvision4.jpg", alt: "DJS Antariksh team members" },
  { image: "/missionandvision_images/missionandvision5.jpg", alt: "DJS Antariksh team members" },
];

export default function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const isCarouselVisible = useInView(ref);

  return (
    <section
      ref={ref}
      id="mission-vision"
      className="overflow-x-hidden px-4 sm:px-8 md:px-16 py-12 md:py-16"
    >
      <motion.h2
        className="text-white text-center font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Vision &amp; Mission
      </motion.h2>
      <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-10 md:mb-14" />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mt-4 max-w-6xl mx-auto">
        <motion.div
          className="w-full lg:w-[45%] lg:pr-8 text-white font-poppins font-light text-sm sm:text-base md:text-lg leading-relaxed text-justify flex items-center justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p>
            The team aims to design and develop reliable, high-performance
            rovers and drones through practical engineering, teamwork, and
            continuous learning. The vision is to contribute to the future of
            space exploration by driving innovation in student robotics and
            inspiring others to explore beyond limits.
          </p>
        </motion.div>

        <motion.div
          className="relative w-full lg:w-[55%] max-w-[34rem] lg:max-w-none mx-auto lg:h-[400px]"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-10%] rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-[45px]"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="relative z-10 w-full h-[320px] sm:h-[350px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto">
            <DepthCarousel
              items={MISSION_IMAGES}
              cardWidth={540}
              cardHeight={394}
              radius={15}
              depth={160}
              spread={60}
              tilt={12}
              tiltDirection="right"
              perspective={1400}
              visibleCards={1}
              falloff={0.2}
              blur={0}
              autoplay={isCarouselVisible}
              autoplayDelay={3000}
              loop
              showControls
              duration={1200}
              showIndicators
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
