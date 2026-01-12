"use client";

import React, { useEffect, useRef } from 'react';

const WarpSpeedGalaxy = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Configuration
        const STAR_COUNT = 1000; // Reduced for consistency on all devices
        const SPEED = 2.5; // Slightly slower for a more "majestic" feel
        const FOV = 300; // Field of view

        interface Star {
            x: number;
            y: number;
            z: number;
            prevZ: number;
            color: string;
            size: number;
        }

        let stars: Star[] = [];

        // Pre-compute colors
        const colors = [
            "255, 255, 255",   // White
            "255, 253, 230",   // Warm White
            "198, 238, 238",   // Cyan
            "200, 200, 255"    // Blueish
        ];

        const initStars = () => {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                const colorRGB = colors[Math.floor(Math.random() * colors.length)];
                stars.push({
                    x: (Math.random() - 0.5) * width * 2,
                    y: (Math.random() - 0.5) * height * 2,
                    z: Math.random() * width,
                    prevZ: Math.random() * width,
                    color: colorRGB,
                    size: Math.random() * 2
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Note: We do NOT reset stars here to keep the flow smooth
        };

        const draw = () => {
            // Fill background (simulating space clearing)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                // Update Z position
                star.prevZ = star.z;
                star.z -= SPEED;

                // Reset star if it passes the screen
                if (star.z < 1) {
                    star.z = width;
                    star.prevZ = width;
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                }

                // 3D to 2D Projection
                const scale = FOV / star.z;
                const prevScale = FOV / star.prevZ;

                const x2d = star.x * scale + centerX;
                const y2d = star.y * scale + centerY;

                // Only draw if within reasonable bounds (soft culling)
                if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
                    // Calculate trail position
                    const px2d = star.x * prevScale + centerX;
                    const py2d = star.y * prevScale + centerY;

                    // Compute brightness based on distance (fading in back)
                    // Closer = Brighter
                    const alpha = Math.min(1, Math.max(0.1, 1 - star.z / width));

                    ctx.strokeStyle = `rgba(${star.color}, ${alpha})`;
                    ctx.lineWidth = Math.max(0.5, scale * star.size);
                    ctx.lineCap = 'round';

                    ctx.beginPath();
                    ctx.moveTo(px2d, py2d);
                    ctx.lineTo(x2d, y2d);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Initial Setup
        handleResize(); // Set initial size
        initStars();    // Create stars
        window.addEventListener('resize', handleResize);
        draw();         // Start loop

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full bg-black fixed top-0 left-0 -z-10"
        />
    );
};

export default WarpSpeedGalaxy;
