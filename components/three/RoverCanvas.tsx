import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { RoverScene } from './RoverScene';
import { Suspense, useState, useCallback, memo, useRef, useEffect } from 'react';

interface RoverCanvasProps {
    onLoaded?: () => void;
}

function RoverCanvasComponent({ onLoaded }: RoverCanvasProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [inView, setInView] = useState(true); // Default true to ensure initial render
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        }, { rootMargin: '200px' }); // Render just before entering viewport

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-screen sticky top-0"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                className="w-full h-full"
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                frameloop={inView ? "always" : "never"}
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
                    <RoverScene onLoaded={onLoaded} mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const RoverCanvas = memo(RoverCanvasComponent);