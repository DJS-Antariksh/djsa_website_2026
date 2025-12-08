"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  descriptionText?: string;
  containerWidth?: number | string;
  containerHeight?: number | string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showTooltip?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  descriptionText = "",
  containerWidth = 600,
  containerHeight = 400,
  rotateAmplitude = 14,
  scaleOnHover = 1.06,
  showTooltip = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // GSAP hover tilt effect
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      gsap.to(image, {
        rotateX: (-offsetY / (rect.height / 2)) * rotateAmplitude,
        rotateY: (offsetX / (rect.width / 2)) * rotateAmplitude,
        duration: 0.3,
        transformOrigin: "center center",
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(image, { scale: scaleOnHover, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(image, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rotateAmplitude, scaleOnHover]);

  return (
    <figure
      ref={cardRef}
      className="relative [perspective:800px] flex flex-col items-center justify-center"
      style={{ width: containerWidth, height: containerHeight }}
    >
      <div
        ref={imageRef}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 w-full h-full object-fill rounded-[15px] shadow-lg ring-1 ring-gray-500/40"
        />
        {showTooltip && captionText && (
          <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
            {captionText}
          </div>
        )}
      </div>
      {descriptionText && (
        <div className="mt-3 text-center text-sm font-semibold text-white">
          {descriptionText}
        </div>
      )}
    </figure>
  );
}
