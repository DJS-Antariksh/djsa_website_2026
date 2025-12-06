import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "./loader3.css";

interface LoaderProps {
    onLoadingComplete?: () => void;
}

const Loader3 = ({ onLoadingComplete }: LoaderProps) => {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [stars, setStars] = useState<Array<{ id: number, top: string, left: string, size: string, delay: string, duration: string }>>([])

    useEffect(() => {
        // Generate stars only on client side to avoid hydration mismatch
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            delay: `${Math.random() * 3}s`,
            duration: `${Math.random() * 2 + 1}s`
        }));
        setStars(newStars);
    }, []);

    useEffect(() => {
        // Start from 0
        const duration = 2500; // Duration in ms
        const intervalTime = 20; // Update every 20ms
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);

            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(timer)
                setIsComplete(true)
                if (onLoadingComplete) setTimeout(onLoadingComplete, 500)
            }
        }, intervalTime)

        return () => clearInterval(timer)
    }, [onLoadingComplete])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                >
                    {/* Lightweight Background */}
                    <div className="loader3-bg pointer-events-none">
                        {stars.map(star => (
                            <div
                                key={star.id}
                                className="loader3-star"
                                style={{
                                    top: star.top,
                                    left: star.left,
                                    width: star.size,
                                    height: star.size,
                                    // @ts-ignore custom property
                                    '--twinkle-dur': star.duration,
                                    animationDelay: star.delay
                                }}
                            />
                        ))}
                        <div className="loader3-shooting-star" />
                    </div>

                    <div className="loader3-container relative z-10">
                        <div className="loader3-content">
                            {/* Progress Track */}
                            <div className="loader3-progress-track">
                                {/* Moving Rover Image */}
                                <div
                                    className="rover-image-container"
                                    style={{ left: `${progress}%` }}
                                >
                                    <img
                                        src="/side_rover1.png"
                                        alt="Rover"
                                        className="rover-img"
                                    />
                                </div>

                                {/* Progress Bar Fill */}
                                <div
                                    className="loader3-progress-bar"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="loader3-text">
                                LOADING DJS ANTARIKSH
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Loader3;
