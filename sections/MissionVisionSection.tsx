"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageSlider from "./image-slider";

export default function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // Image array (auto-sliding)
  const missionImages = [
    { url: "/missionandvision_images/missionandvision1.jpg" },
    { url: "/missionandvision_images/missionandvision2.jpg" },
    { url: "/missionandvision_images/missionandvision3.jpg" },
    { url: "/missionandvision_images/missionandvision4.jpg" },
    { url: "/missionandvision_images/missionandvision5.jpg" },

  ];

  return (
    <section
      ref={ref}
      id="mission-vision"
      className="overflow-x-hidden px-4 sm:px-8 md:px-16 py-16 md:py-24"
    >
      {/* Heading */}
      <motion.h2
        className="text-white text-center font-meth text-2xl sm:text-3xl md:text-4xl mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Vision &amp; Mission
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center mt-2 max-w-6xl mx-auto">

        {/* Text - LEFT */}
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
            flex
            items-center
            justify-center
          "
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p>
            The team aims to design and develop reliable, high-performance rovers
            and drones through practical engineering, teamwork, and continuous
            learning. The team’s vision is to contribute to the future of space
            exploration by driving innovation in student robotics and inspiring
            others to explore beyond limits.
          </p>
        </motion.div>

        {/* Image Slider - RIGHT */}
        <motion.div
          className="
            w-full
            lg:w-1/2
            aspect-[4/3]
            max-w-[18rem]
            sm:max-w-[21rem]
            md:max-w-[24rem]
            lg:max-w-[26rem]
            mx-auto
            relative
          "
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Shiny glow background */}
          <motion.div
            className="absolute inset-[-15%] rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(0,0,0,0.85)_65%)] blur-[55px]"
            animate={{ opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <ImageSlider slides={missionImages} autoplayDelay={3800} />
        </motion.div>

      </div>
    </section>
  );
}
