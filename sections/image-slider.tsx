"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Slide {
  url: string;
  alt?: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  autoplay = true,
  autoplayDelay = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parallax motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [10, -10]);
  const rotateY = useTransform(x, [-80, 80], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.height / 2);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Glow background */}
      <motion.div
        className="absolute inset-[-15%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.85)_65%)] blur-[60px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              pointerEvents: isActive ? "auto" : "none",
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.96,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {isActive && (
              <motion.div
                className="relative w-full h-full p-[10px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                {/* Grey shiny border */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-white/30 p-[1.5px]">
                  {/* Black inner box */}
                  <div className="w-full h-full rounded-2xl bg-black/80 overflow-hidden">
                    <motion.img
                      src={slide.url}
                      alt={slide.alt ?? `slide-${index}`}
                      className="w-full h-full object-cover rounded-xl"
                      initial={{ scale: 1.04 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Light sweep */}
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.08),transparent_70%)]"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
