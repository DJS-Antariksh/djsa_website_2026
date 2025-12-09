'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// --- CSS Styles ---
const styles = `
/* UNIVERSAL VARIABLES */
:root {
    --white: #ffffff;
    --neon-blue: #4CC9F0;
    --neon-purple: #7209b7;
    --mars-red: #e07a5f;
    --ui-bg: rgba(13, 13, 18, 0.95);
    --glass-border: rgba(255, 255, 255, 0.1);
}

/* CONTAINER */
.loader3-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow: hidden;
    position: relative;
    color: white;
    font-family: 'Courier New', Courier, monospace;
}

/* LIGHTWEIGHT BACKGROUND */
.loader3-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: radial-gradient(circle at center, #141419 0%, #000000 100%);
    z-index: 0;
}

.loader3-star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle var(--twinkle-dur) infinite ease-in-out;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
}

/* BLINKING TEXT - BIGGER & FASTER */
.blinking-text {
    margin-top: 2.5rem;
    font-family: monospace;
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--neon-blue);
    text-transform: uppercase;
    letter-spacing: 0.3em;
    animation: blink 1.5s ease-in-out infinite alternate;
    text-shadow: 0 0 20px rgba(76, 201, 240, 0.8);
    opacity: 1;
    z-index: 20;
    text-align: center;
}

@keyframes blink {
    0% { opacity: 1; text-shadow: 0 0 25px rgba(76, 201, 240, 1); transform: scale(1); }
    100% { opacity: 0.3; text-shadow: 0 0 5px rgba(76, 201, 240, 0.2); transform: scale(0.98); }
}

/* GAME CANVAS */
canvas {
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.1),
        0 20px 50px rgba(0, 0, 0, 0.9),
        0 0 40px rgba(76, 201, 240, 0.1);
    transition: box-shadow 0.3s ease;
}

canvas:active {
    box-shadow: 
        0 0 0 1px rgba(76, 201, 240, 0.3),
        0 10px 30px rgba(0, 0, 0, 0.8);
}

/* UI PANELS */
.ui-panel {
    background: var(--ui-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(76, 201, 240, 0.2);
    box-shadow: 
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 20px 60px rgba(0, 0, 0, 0.8),
        inset 0 0 20px rgba(76, 201, 240, 0.05);
    padding: 2.5rem 2rem;
    border-radius: 4px;
    text-align: center;
    max-width: 550px;
    width: 90%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* Decorative Accents */
.ui-panel::before, .ui-panel::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(76, 201, 240, 0.15) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
}
.ui-panel::before { top: -50px; left: -50px; }
.ui-panel::after { bottom: -50px; right: -50px; }

/* Corner Markers */
.corner-marker {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--neon-blue);
    transition: all 0.3s ease;
}
.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.br { bottom: 0; right: 0; border-left: none; border-top: none; }

.ui-content {
    position: relative;
    z-index: 1;
    width: 100%;
}

.ui-title {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    color: white;
    text-shadow: 0 0 20px rgba(76, 201, 240, 0.6);
    line-height: 1.1;
}

.ui-subtitle {
    font-size: 0.85rem;
    color: var(--neon-blue);
    margin-bottom: 2rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.ui-subtitle::before, .ui-subtitle::after {
    content: '';
    height: 1px;
    width: 20px;
    background: var(--neon-blue);
    opacity: 0.5;
}

.ui-details {
    text-align: left;
    background: rgba(0, 0, 0, 0.4);
    padding: 1.25rem;
    margin-bottom: 2rem;
    border-left: 3px solid var(--neon-blue);
    font-size: 0.8rem;
    color: #b0b0c0;
    line-height: 1.6;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    width: 100%;
}

.ui-stat-container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 4px;
    width: 100%;
}

.ui-stat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
}

.ui-stat-label {
    font-size: 0.65rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.25rem;
}

.ui-stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    font-family: monospace;
}

.ui-btn {
    background: linear-gradient(90deg, transparent 0%, rgba(76, 201, 240, 0.1) 50%, transparent 100%);
    border: 1px solid var(--neon-blue);
    color: var(--neon-blue);
    padding: 1rem 0;
    width: 100%;
    font-family: inherit;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.ui-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--neon-blue);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-btn:hover {
    color: #000;
    box-shadow: 0 0 30px rgba(76, 201, 240, 0.5);
}

.ui-btn:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

/* IN-GAME TIMER */
.game-timer {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(76, 201, 240, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    pointer-events: none;
    backdrop-filter: blur(4px);
}

.timer-label {
    font-size: 0.7rem;
    color: var(--neon-blue);
    letter-spacing: 0.2em;
    margin-bottom: 2px;
}

.timer-value {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    font-family: monospace;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    line-height: 1;
}
`;

// --- Game Constants ---
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 750;
const GROUND_Y = 650;
const ROVER_WIDTH = 200;
const ROVER_HEIGHT = 200;

// Track width
const TRACK_WIDTH = CANVAS_WIDTH;
const TRACK_START_X = 0;
const TRACK_END_X = CANVAS_WIDTH;

// Adjusted Physics
const GRAVITY = 0.35;
const JUMP_FORCE = -18; // Reduced jump force to balance lower gravity

// Difficulty Tuning
const BASE_SPEED = 11;
const MAX_SPEED = 22;
const SPEED_INCREMENT = 0.0012;

// --- Assets ---
// --- Assets ---
const ROVER_IMG_SRC = '/general_photos/side_rover1.png';
const DRONE_IMG_SRC = '/general_photos/mars_drone.png';
const ROCK1_IMG_SRC = '/general_photos/rock1.png';
const ROCK2_IMG_SRC = '/general_photos/rock2.png';

interface Star {
    id: number;
    top: string;
    left: string;
    size: string;
    delay: string;
    duration: string;
}

const LoaderGame = () => {
    // --- Star Background State ---
    const [stars, setStars] = useState<Star[]>([]);

    // --- Game State ---
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const roverImgRef = useRef<HTMLImageElement | null>(null);
    const droneImgRef = useRef<HTMLImageElement | null>(null);
    const rock1ImgRef = useRef<HTMLImageElement | null>(null);
    const rock2ImgRef = useRef<HTMLImageElement | null>(null);

    // Game Mutable State
    const gameState = useRef({
        isPlaying: false,
        isGameOver: false,
        startTime: 0,
        survivalTime: 0,
        distanceTraveled: 0,
        speed: BASE_SPEED,
        marsX: 50,
    });

    const rover = useRef({
        x: 100,
        y: GROUND_Y - ROVER_HEIGHT,
        vy: 0,
        isJumping: false,
        width: ROVER_WIDTH,
        height: ROVER_HEIGHT
    });

    const obstacles = useRef<Array<{ x: number, y: number, width: number, height: number, type: 'rock' | 'box' | 'drone' }>>([]);
    const particles = useRef<Array<{ x: number, y: number, vx: number, vy: number, life: number, color: string }>>([]);
    const nextSpawnDistance = useRef(0);

    const [uiState, setUiState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
    const [displayTime, setDisplayTime] = useState("00.00");

    // --- Effects ---

    useEffect(() => {
        const newStars = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2}px`,
            delay: `${Math.random() * 3}s`,
            duration: `${Math.random() * 3 + 2}s`
        }));
        setStars(newStars);

        const img = new Image();
        img.src = ROVER_IMG_SRC;
        img.onload = () => { roverImgRef.current = img; };

        const droneImg = new Image();
        droneImg.src = DRONE_IMG_SRC;
        droneImg.onload = () => { droneImgRef.current = droneImg; };

        const rock1Img = new Image();
        rock1Img.src = ROCK1_IMG_SRC;
        rock1Img.onload = () => { rock1ImgRef.current = rock1Img; };

        const rock2Img = new Image();
        rock2Img.src = ROCK2_IMG_SRC;
        rock2Img.onload = () => { rock2ImgRef.current = rock2Img; };

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // --- Game Logic ---

    const spawnParticles = (x: number, y: number, count: number, color: string) => {
        for (let i = 0; i < count; i++) {
            particles.current.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 1) * 5,
                life: 1.0,
                color
            });
        }
    };

    const startGame = useCallback(() => {
        gameState.current = {
            isPlaying: true,
            isGameOver: false,
            startTime: Date.now(),
            survivalTime: 0,
            distanceTraveled: 0,
            speed: BASE_SPEED,
            marsX: CANVAS_WIDTH - 100,
        };
        rover.current.y = GROUND_Y - ROVER_HEIGHT;
        rover.current.vy = 0;
        rover.current.isJumping = false;
        obstacles.current = [];
        particles.current = [];

        nextSpawnDistance.current = 800;

        setUiState('PLAYING');

        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(gameLoop);
    }, []);

    const jump = useCallback(() => {
        if (!rover.current.isJumping && gameState.current.isPlaying) {
            rover.current.vy = JUMP_FORCE;
            rover.current.isJumping = true;
            spawnParticles(rover.current.x + 10, rover.current.y + 30, 8, '#ffffff');
        }
    }, []);

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const state = gameState.current;

        if (state.isGameOver) return;

        // 1. Logic
        const now = Date.now();
        state.survivalTime = (now - state.startTime) / 1000;
        setDisplayTime(state.survivalTime.toFixed(2));

        // Track Distance
        state.distanceTraveled += state.speed * 0.05;

        // Difficulty curve
        if (state.speed < MAX_SPEED) state.speed += SPEED_INCREMENT;
        state.marsX -= 0.05;

        // 2. Physics
        rover.current.vy += GRAVITY;
        rover.current.y += rover.current.vy;

        // Ground Collision
        if (rover.current.y >= GROUND_Y - ROVER_HEIGHT) {
            if (rover.current.isJumping) {
                // Landing impact
                spawnParticles(rover.current.x + 10, GROUND_Y, 6, '#e07a5f');
            }
            rover.current.y = GROUND_Y - ROVER_HEIGHT;
            rover.current.vy = 0;
            rover.current.isJumping = false;
        }

        // 3. Spawning
        nextSpawnDistance.current -= state.speed;
        if (nextSpawnDistance.current <= 0) {
            const rand = Math.random();
            let type: 'rock' | 'box' | 'drone' = 'rock';

            // Default Rock1
            let width = 150;
            let height = 120;
            let y = GROUND_Y - height;

            // Updated Frequencies: Drones > 0.55 (45% chance)
            if (rand > 0.55) {
                type = 'drone';
                // Drone (3:2)
                width = 120;
                height = 80;
                // Much higher altitude: 250-400px above ground
                const altitude = 250 + Math.random() * 150;
                y = GROUND_Y - altitude;
            } else if (rand > 0.35) {
                type = 'box'; // Rock2
                // Rock2 (8:5) -> e.g. 120 width -> 75 height
                width = 140;
                height = 90;
                y = GROUND_Y - height;
            }

            obstacles.current.push({ x: TRACK_END_X + 50, y, width, height, type });

            // Gap Calculation
            const minGap = 800 + (state.speed * 40);
            const randomVariance = Math.random() * 600;
            nextSpawnDistance.current = minGap + randomVariance;
        }

        // 4. Update
        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.04;
            if (p.life <= 0) particles.current.splice(i, 1);
        }

        for (let i = obstacles.current.length - 1; i >= 0; i--) {
            const obs = obstacles.current[i];
            obs.x -= state.speed;

            // TIGHTER HITBOX
            const padding = 15;
            if (
                rover.current.x < obs.x + obs.width - padding &&
                rover.current.x + rover.current.width - padding > obs.x &&
                rover.current.y < obs.y + obs.height - padding &&
                rover.current.y + rover.current.height - padding > obs.y
            ) {
                state.isGameOver = true;
                state.isPlaying = false;
                setUiState('GAMEOVER');
                spawnParticles(rover.current.x + 20, rover.current.y + 15, 25, '#ff4d4d');
            }

            if (obs.x + obs.width < TRACK_START_X - 150) {
                obstacles.current.splice(i, 1);
            }
        }

        // 5. Draw
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // -- Parallax Planet --
        ctx.fillStyle = '#cc4433';
        ctx.beginPath();
        ctx.arc(state.marsX, 80, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.arc(state.marsX - 10, 70, 8, 0, Math.PI * 2);
        ctx.arc(state.marsX + 15, 90, 12, 0, Math.PI * 2);
        ctx.fill();

        // -- Track Glow --
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(76, 201, 240, 0.2)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(TRACK_START_X, GROUND_Y, TRACK_WIDTH, 4, 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // -- Track Detail --
        ctx.fillStyle = '#4CC9F0';
        ctx.fillRect(TRACK_START_X, GROUND_Y - 2, 6, 8);
        ctx.fillRect(TRACK_END_X - 6, GROUND_Y - 2, 6, 8);

        // -- Obstacles --
        obstacles.current.forEach(obs => {
            ctx.shadowBlur = 10;
            if (obs.type === 'drone') {
                if (droneImgRef.current) {
                    ctx.shadowColor = 'rgba(255, 77, 77, 0.5)';
                    ctx.drawImage(droneImgRef.current, obs.x, obs.y, obs.width, obs.height);
                } else {
                    ctx.fillStyle = '#ff4d4d';
                    ctx.shadowColor = 'rgba(255, 77, 77, 0.5)';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                }
            } else if (obs.type === 'rock') {
                if (rock1ImgRef.current) {
                    ctx.drawImage(rock1ImgRef.current, obs.x, obs.y, obs.width, obs.height);
                } else {
                    ctx.fillStyle = '#e07a5f';
                    ctx.beginPath();
                    ctx.moveTo(obs.x, obs.y + obs.height);
                    ctx.lineTo(obs.x + obs.width / 2, obs.y);
                    ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
                    ctx.fill();
                }
            } else {
                // BOX type -> using rock2
                if (rock2ImgRef.current) {
                    ctx.drawImage(rock2ImgRef.current, obs.x, obs.y, obs.width, obs.height);
                } else {
                    ctx.fillStyle = '#4CC9F0';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                }
            }
            ctx.shadowBlur = 0;
        });

        // -- Rover --
        if (roverImgRef.current) {
            ctx.drawImage(roverImgRef.current, rover.current.x, rover.current.y, rover.current.width, rover.current.height);
        } else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(rover.current.x, rover.current.y, rover.current.width, rover.current.height);
        }

        // -- Particles --
        particles.current.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.random() * 2 + 1, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (!state.isGameOver) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
    };

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (uiState === 'START' || uiState === 'GAMEOVER') startGame();
                else jump();
            }
        };
        const handleTouch = (e: TouchEvent) => {
            e.preventDefault();
            if (uiState === 'START' || uiState === 'GAMEOVER') startGame();
            else jump();
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouch, { passive: false });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouch);
        };
    }, [uiState, jump, startGame]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <AnimatePresence>
                <motion.div
                    key="game-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="loader3-container"
                >
                    {/* Background Stars */}
                    <div className="loader3-bg">
                        {stars.map(star => (
                            <div
                                key={`star-${star.id}`}
                                className="loader3-star"
                                style={{
                                    top: star.top,
                                    left: star.left,
                                    width: star.size,
                                    height: star.size,
                                    // @ts-ignore
                                    '--twinkle-dur': star.duration,
                                    animationDelay: star.delay
                                }}
                            />
                        ))}
                    </div>

                    {/* Game Layer */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full">

                        <canvas
                            ref={canvasRef}
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            onClick={() => {
                                if (uiState === 'START' || uiState === 'GAMEOVER') startGame();
                                else jump();
                            }}
                            style={{
                                width: '75vw', // Reduced from 85vw
                                maxWidth: '1200px',
                                marginTop: '5vh', // Push down from top
                                height: 'auto',
                                aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`,
                                touchAction: 'none'
                            }}
                        />

                        {/* Enhanced UI Overlays */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <AnimatePresence mode="wait">
                                {uiState === 'START' && (
                                    <motion.div
                                        key="start-screen"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                        className="ui-panel pointer-events-auto"
                                    >
                                        <div className="corner-marker tl"></div>
                                        <div className="corner-marker tr"></div>
                                        <div className="corner-marker bl"></div>
                                        <div className="corner-marker br"></div>

                                        <div className="ui-content">
                                            <div className="ui-title">DJS ANTARIKSH</div>
                                            <div className="ui-subtitle">◆ ENTRY PROTOCOL ◆</div>

                                            <div className="ui-details">
                                                ▸ INITIALIZING ROVER SYSTEMS...<br />
                                                ▸ TERRAIN: MARS SECTOR 2019<br />
                                                ▸ STATUS: WAITING FOR PILOT
                                            </div>

                                            <button onClick={startGame} className="ui-btn">
                                                ENGAGE THRUSTERS
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {uiState === 'GAMEOVER' && (
                                    <motion.div
                                        key="gameover-screen"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="ui-panel pointer-events-auto"
                                        style={{ border: '1px solid rgba(255, 80, 80, 0.4)' }}
                                    >
                                        <div className="corner-marker tl" style={{ borderColor: '#ff4d4d' }}></div>
                                        <div className="corner-marker tr" style={{ borderColor: '#ff4d4d' }}></div>
                                        <div className="corner-marker bl" style={{ borderColor: '#ff4d4d' }}></div>
                                        <div className="corner-marker br" style={{ borderColor: '#ff4d4d' }}></div>

                                        <div className="ui-content">
                                            <div className="ui-title" style={{ color: '#ff4d4d', textShadow: '0 0 20px rgba(255, 77, 77, 0.4)' }}>SIGNAL LOST</div>
                                            <div className="ui-subtitle" style={{ color: '#ff8888' }}>✕ CRITICAL FAILURE ✕</div>

                                            <div className="ui-stat-container">
                                                <div className="ui-stat-box">
                                                    <div className="ui-stat-label">TIME</div>
                                                    <div className="ui-stat-value">
                                                        {gameState.current.survivalTime.toFixed(2)}s
                                                    </div>
                                                </div>
                                                <div className="ui-stat-box">
                                                    <div className="ui-stat-label">DISTANCE</div>
                                                    <div className="ui-stat-value">
                                                        {Math.floor(gameState.current.distanceTraveled)}m
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={startGame}
                                                className="ui-btn reboot-btn"
                                                style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}
                                            >
                                                ↻ REBOOT SYSTEM
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {uiState === 'PLAYING' && (
                                <div className="game-timer mt-3">
                                    <div className="timer-label">MISSION CLOCK</div>
                                    <div className="timer-value">{displayTime}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="blinking-text relative z-20">
                        DJS Antariksh Mini Game
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default LoaderGame;