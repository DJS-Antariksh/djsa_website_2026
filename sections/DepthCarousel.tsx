"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface DepthCarouselItem {
  image: string;
  alt?: string;
}

interface DepthCarouselProps {
  items: DepthCarouselItem[];
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  autoplay?: boolean;
  loop?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  duration?: number;
  ease?: string;
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function DepthCarousel({
  items,
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  autoplay = false,
  loop = true,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = "#05060a",
  duration = 700,
  ease = "power3.out",
  autoplayDelay = 3200,
  showControls = true,
  showIndicators = true,
}: DepthCarouselProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tintRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevOffsets = useRef<number[]>([]);

  const n = items.length;
  const dir = tiltDirection === "right" ? 1 : -1;
  const hasUi = showControls || showIndicators;

  const next = () =>
    setActive((a) => (loop ? (a + 1) % n : Math.min(a + 1, n - 1)));
  const prev = () =>
    setActive((a) => (loop ? (a - 1 + n) % n : Math.max(a - 1, 0)));

  // Position every card whenever the active card or a setting changes
  useEffect(() => {
    const showN = Math.min(visibleCards, n);
    const centerShift = ((showN - 1) * spread) / 2;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      const tintEl = tintRefs.current[i];
      if (!el) continue;

      // Offset from the front card (0 = front, 1.. = behind, -1 = just left)
      let k = i - active;
      if (loop && n > 1) {
        k = ((k % n) + n) % n;
        if (n > visibleCards && k === n - 1) k = -1;
      }

      const behind = Math.max(k, 0);
      const hidden = k < 0 || k >= visibleCards;

      const x =
        k < 0
          ? -dir * (spread * 1.6 + centerShift)
          : dir * (behind * spread - centerShift);
      const z = k < 0 ? depth * 0.35 : -behind * depth;
      const ry = k < 0 ? -dir * tilt : dir * tilt * Math.min(behind, 1);
      const opacity = hidden ? 0 : Math.max(0, 1 - behind * falloff);
      const blurPx =
        (blur * Math.min(behind, visibleCards - 1)) /
        Math.max(1, visibleCards - 1);
      const tintOpacity = Math.min(0.85, behind * falloff * 1.5);

      const before = prevOffsets.current[i];
      prevOffsets.current[i] = k;
      // Cards wrapping around the loop jump instantly (they are invisible)
      const jump =
        before === undefined ||
        (before < 0 && k > 1) ||
        (before > 1 && k < 0);

      el.style.zIndex = String(k < 0 ? 0 : 100 - k);
      el.style.pointerEvents = hidden ? "none" : "auto";

      const vars = {
        x,
        z,
        rotationY: ry,
        opacity,
        filter: "blur(" + blurPx + "px)",
      };
      const anim = { duration: duration / 1000, ease, overwrite: "auto" as const };

      if (jump) {
        gsap.set(el, vars);
        if (tintEl) gsap.set(tintEl, { opacity: tintOpacity });
      } else {
        gsap.to(el, { ...vars, ...anim });
        if (tintEl) gsap.to(tintEl, { opacity: tintOpacity, ...anim });
      }
    }
  }, [active, n, loop, visibleCards, spread, depth, tilt, dir, blur, falloff, duration, ease]);

  // Only run autoplay while the carousel is on screen and not hovered
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || hovered || !inView || n < 2) return;
    const id = setInterval(() => {
      setActive((a) => (a >= n - 1 ? 0 : a + 1));
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, hovered, inView, n, autoplayDelay]);

  if (n === 0) return null;

  const atStart = !loop && active === 0;
  const atEnd = !loop && active === n - 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={"absolute inset-x-0 top-0 " + (hasUi ? "bottom-10" : "bottom-0")}
        style={{ perspective, perspectiveOrigin: "50% 50%" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            className="absolute overflow-hidden shadow-2xl ring-1 ring-white/10 will-change-transform cursor-pointer"
            style={{
              width: cardWidth,
              height: cardHeight,
              left: "50%",
              top: "50%",
              marginLeft: -cardWidth / 2,
              marginTop: -cardHeight / 2,
              borderRadius: radius,
              opacity: 0,
            }}
          >
            <img
              src={item.image}
              alt={item.alt ?? ""}
              draggable={false}
              className="w-full h-full object-cover"
            />
            <div
              ref={(el) => {
                tintRefs.current[i] = el;
              }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: tint, opacity: 0 }}
            />
          </div>
        ))}
      </div>

      {hasUi && (
        <div className="absolute inset-x-0 bottom-0 h-10 flex items-center justify-center gap-4">
          {showControls && (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prev}
              disabled={atStart}
              className="h-8 w-8 rounded-full bg-white/10 text-white backdrop-blur flex items-center justify-center hover:bg-white/20 disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {showIndicators && (
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={"Go to photo " + (i + 1)}
                  onClick={() => setActive(i)}
                  className={
                    "h-2 rounded-full transition-all " +
                    (i === active ? "w-5 bg-white" : "w-2 bg-white/40 hover:bg-white/70")
                  }
                />
              ))}
            </div>
          )}

          {showControls && (
            <button
              type="button"
              aria-label="Next photo"
              onClick={next}
              disabled={atEnd}
              className="h-8 w-8 rounded-full bg-white/10 text-white backdrop-blur flex items-center justify-center hover:bg-white/20 disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
