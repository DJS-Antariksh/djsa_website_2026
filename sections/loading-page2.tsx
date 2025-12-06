import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "./loader2.css";

interface LoaderProps {
    onLoadingComplete?: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setIsComplete(true)
                    if (onLoadingComplete) setTimeout(onLoadingComplete, 500)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 150)

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
                    <div className="loader-main-container">
                        <div className="space-loader">
                            <div className="rover">
                                {/* Top Right Antenna */}
                                <div className="rover-antenna-group">
                                    <div className="antenna-pole">
                                        <div className="antenna-dish" />
                                        <div className="antenna-tip" />
                                    </div>
                                </div>

                                {/* Kill Switch (Moved to align with antenna) */}
                                <div className="rover-kill-switch" />

                                {/* Top Left Arm */}
                                <div className="rover-arm-group">
                                    <div className="arm-joint" />
                                    <div className="arm-seg-1">
                                        <div className="arm-seg-2">
                                            <div className="arm-tool">
                                                {/* Tiny Camera */}
                                                <div className="arm-camera" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Gray Chassis/Legs */}
                                <div className="chassis-connector axle-bar" />
                                <div className="chassis-connector leg-left" />
                                <div className="chassis-connector leg-right" />

                                {/* Body */}
                                <div className="rover-body">
                                    <div className="rover-window" />
                                    <div className="rover-detail-stripe" />
                                </div>

                                {/* Front Wheels (Gray Center, Thicker Cerulean Blue Ring) */}
                                <div className="rover-wheel wheel-fl" /> {/* Front Left */}
                                <div className="rover-wheel wheel-br" /> {/* Back Right */}
                            </div>

                            <div className="space-environment">
                                <div className="stars-container">
                                    <div className="star near" />
                                    <div className="star mid" />
                                    <div className="star far" />
                                </div>
                                <div className="planets">
                                    <div className="planet planet-1" />
                                    <div className="planet planet-2" />
                                    <div className="planet planet-3">
                                        <div className="planet-ring" />
                                    </div>
                                </div>
                                <div className="floating-rocks">
                                    <div className="rock rock1" />
                                    <div className="rock rock2" />
                                    <div className="rock rock3" />
                                </div>
                                <div className="meteors">
                                    <div className="meteor meteor-1" />
                                    <div className="meteor meteor-2" />
                                    <div className="meteor meteor-3" />
                                </div>
                            </div>

                            <div className="loading-container">
                                <div className="loading-progress">
                                    <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
                                </div>
                                <div className="loading-text">
                                    LOADING DJS ANTARIKSH
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Loader;