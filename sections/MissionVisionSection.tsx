"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TiltedCard from "./card";

export default function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // All images for rotating card
  const missionImages = [
    "/missionandvision_images/missionandvision1.jpg",
    "/missionandvision_images/missionandvision2.jpg",
    "/missionandvision_images/missionandvision3.jpg",
    "/missionandvision_images/missionandvision4.jpg",
    "/missionandvision_images/missionandvision5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % missionImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="mission-vision"
      className="overflow-x-hidden px-4 sm:px-8 md:px-16 py-12 md:py-16"
    >
      {/* Heading */}
      <motion.h2
        className="text-white text-center font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-display)" }}
      >
        Vision &amp; Mission
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center mt-0 max-w-6xl mx-auto">

        {/* Text LEFT */}
        <motion.div
          className="
            w-full lg:w-1/2 text-white font-poppins font-light
            text-sm sm:text-base md:text-lg leading-relaxed text-justify
            flex items-center justify-center
          "
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

        {/* Tilted Card RIGHT */}
        <motion.div
          className="
            w-full lg:w-1/2 relative
            flex items-center justify-center
          "
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Shiny background glow */}
          <motion.div
            className="absolute inset-[-15%] rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(0,0,0,0.85)_65%)] blur-[55px] z-0"
            animate={{ opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Tilted Card with cycling image */}
          <div className="relative z-10">
            <TiltedCard
              imageSrc={missionImages[currentIndex]} // cycling!
              captionText=""
              descriptionText=""
              containerHeight={350}
              containerWidth={480}
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showTooltip={false}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
