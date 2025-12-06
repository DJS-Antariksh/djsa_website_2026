"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  descriptionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  descriptionVisible?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  descriptionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  descriptionVisible = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cardEl = cardRef.current;
      const imageEl = imageRef.current;
      if (!cardEl || !imageEl) return;

      const rect = cardEl.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;

      gsap.to(imageEl, {
        rotateX: rotationX,
        rotateY: rotationY,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      const imageEl = imageRef.current;
      if (!imageEl) return;

      setIsHovered(true);
      gsap.to(imageEl, {
        scale: scaleOnHover,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      const imageEl = imageRef.current;
      if (!imageEl) return;

      setIsHovered(false);
      gsap.to(imageEl, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.out",
      });
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
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      {/* Image container */}
      <div
        ref={imageRef}
        className="relative [transform-style:preserve-3d] w-full h-full"
        style={{ width: imageWidth, height: imageHeight }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] w-full h-full [transform:translateZ(0)]"
        />

        {/* Overlay content */}
        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 z-[2] [transform:translateZ(30px)]">
            {overlayContent}
          </div>
        )}

        {/* Caption tooltip */}
        {showTooltip && captionText && (
          <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
            {captionText}
          </div>
        )}
      </div>

      {/* Description below card */}
      {descriptionText && (
        <div
          className={`mt-3 text-center text-sm font-semibold text-white transition-opacity duration-500 ${
            descriptionVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {descriptionText}
        </div>
      )}
    </figure>
  );
}
