"use client";
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageSlider from "./image-slider";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const slides = [
    { url: "/aboutus_images/IRC25_exhibition.jpg" },
    { url: "/aboutus_images/ERC_2025_TRADS.jpg" },
    { url: "/aboutus_images/about8.JPG" },
    { url: "/aboutus_images/about7.jpg" },
    { url: "/aboutus_images/about6.jpg" },
    { url: "/aboutus_images/about5.jpg" },
    { url: "/aboutus_images/about4.jpg" },
    { url: "/aboutus_images/about3.jpg" },
    { url: "/aboutus_images/about2.jpg" },
    { url: "/aboutus_images/about1.jpg" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="overflow-x-hidden px-4 sm:px-8 md:px-16 py-16 md:py-24"
    >
      {/* Heading */}
      <motion.h2
        className="text-white text-center font-meth text-2xl sm:text-3xl md:text-4xl mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        About the Team
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-start mt-2 max-w-6xl mx-auto">

        {/* Image Slider */}
        <motion.div
          className="
            w-full
            lg:w-1/2
            aspect-[4/3]
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
          <ImageSlider slides={slides} autoplayDelay={3200} />
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
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto lg:mx-0">
            <div className="text-center p-4 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/30">
              <div className="text-xl md:text-2xl font-semibold text-primary">
                60+
              </div>
              <div className="text-xs text-white/70 mt-1">
                Engineers
              </div>
            </div>

            <div className="text-center p-4 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/30">
              <div className="text-xl md:text-2xl font-semibold text-primary">
                5+
              </div>
              <div className="text-xs text-white/70 mt-1">
                Years
              </div>
            </div>

            <div className="text-center p-4 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/30">
              <div className="text-xl md:text-2xl font-semibold text-primary">
                5
              </div>
              <div className="text-xs text-white/70 mt-1">
                Departments
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}