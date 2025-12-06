"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./loader.css"   

interface LoadingPageProps {
  onLoadingComplete: () => void
}

export default function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          setTimeout(onLoadingComplete, 500)
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
          {/* 🌌 Astronaut Loader */}
          <div className="loader-main-container">
            <div className="space-loader">
              
              {/* Astronaut */}
              <div className="astronaut">
                <div className="astronaut-helmet">
                  <div className="helmet-glass">{/* shine removed */}</div>
                  <div className="antenna" />
                </div>

                <div className="astronaut-body">
                  <div className="suit-buttons">
                    <div className="suit-button blue" />
                    <div className="suit-button red" />
                  </div>
                </div>

                <div className="arm arm-left" />
                <div className="arm arm-right" />
                <div className="leg leg-left" />
                <div className="leg leg-right" />
              </div>

              {/* Background environment (stars, planets, meteors, rocks) */}
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
                    <div className="planet-ring" /> {/* ring animation removed */}
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

              {/* Progress (integrated into bubble) */}
              <div className="loading-container">
                <div className="loading-progress">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="loading-text"
                >
                  LOADING DJS ANTARIKSH
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
