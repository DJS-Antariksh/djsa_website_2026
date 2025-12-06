"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface FuturisticCardProps {
    children: React.ReactNode
    className?: string
    borderColor?: string
}

export default function FuturisticCard({ children, className = "", borderColor = "rgba(255, 255, 255, 0.1)" }: FuturisticCardProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const glareRef = useRef<HTMLDivElement>(null)
    const borderRef = useRef<HTMLDivElement>(null)

    // Configuration for the effect
    const ROTATE_DEPTH = 15 // Degrees of rotation
    const TRANSLATE_DEPTH = 10 // Px of translation

    const { contextSafe } = useGSAP({ scope: containerRef })

    const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !cardRef.current || !glareRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Calculate percentage (-0.5 to 0.5)
        // Invert X/Y logic for rotation: 
        // Mouse TOP (negative Y) -> Rotate X POSITIVE (tilt up)
        // Mouse LEFT (negative X) -> Rotate Y NEGATIVE (tilt left)
        const xPct = (mouseX / width) - 0.5
        const yPct = (mouseY / height) - 0.5

        // Rotation
        const rotateX = -yPct * ROTATE_DEPTH * 2
        const rotateY = xPct * ROTATE_DEPTH * 2

        // Translation (Parallax)
        const translateX = xPct * TRANSLATE_DEPTH
        const translateY = yPct * TRANSLATE_DEPTH

        // Glare position (0 to 100%)
        const glareX = (mouseX / width) * 100
        const glareY = (mouseY / height) * 100

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            x: translateX,
            y: translateY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
        })

        gsap.to(glareRef.current, {
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 80%)`,
            opacity: 0.6,
            duration: 0.1, // Faster update for glare
        })

        // Subtle border glow follow (optional enhancement)
        if (borderRef.current) {
            gsap.to(borderRef.current, {
                background: `radial-gradient(400px circle at ${glareX}% ${glareY}%, ${borderColor.replace('0.1', '0.5')}, transparent 40%)`,
                duration: 0.2
            })
        }
    })

    const handleMouseLeave = contextSafe(() => {
        if (!cardRef.current || !glareRef.current) return

        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
        })

        gsap.to(glareRef.current, {
            opacity: 0,
            duration: 0.5,
        })

        if (borderRef.current) {
            gsap.to(borderRef.current, {
                background: 'transparent',
                duration: 0.5
            })
        }
    })

    // Entrance animation
    const handleMouseEnter = contextSafe(() => {
        gsap.to(cardRef.current, {
            scale: 1.02,
            z: 20,
            duration: 0.3,
            ease: "back.out(1.2)"
        })
    })

    return (
        <div
            ref={containerRef}
            className={`relative perspective-distant ${className}`}
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div
                ref={cardRef}
                className="relative h-full w-full rounded-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 overflow-hidden transform-3d"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Glow Border Overlay */}
                <div ref={borderRef} className="absolute inset-0 pointer-events-none z-20 transition-opacity" />

                {/* Content */}
                <div className="relative z-10 p-4 h-full">
                    {children}
                </div>

                {/* Glare Effect */}
                <div
                    ref={glareRef}
                    className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
                    style={{ opacity: 0 }}
                />

                {/* Background Grid/Texture (Optional Futuristic Detail) */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('/grid-pattern.svg')] bg-[size:20px_20px]" />
            </div>
        </div>
    )
}
