import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Compass,
  Orbit,
  LayoutGrid,
  Diamond,
} from 'lucide-react';
import GoldIconPod from './GoldIconPod';

gsap.registerPlugin(ScrollTrigger);

// 36 Ambient Floating 24K Gold Embers & Sparks for the background
const AMBIENT_SPARKS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  top: ((i * 19.7) % 92) + 4,
  left: ((i * 23.3) % 92) + 4,
  size: (i % 3) + 2.5,
  duration: 2.2 + (i % 5) * 0.7,
  delay: (i % 7) * 0.35,
}));

/**
 * FerrisWheel3D - 3D Vertical Revolving Carousel (ராட்டினம்)
 * Powered by GSAP ScrollTrigger Pinning & Center Dwell Physics:
 * 1. PINNED IN PLACE: The page freezes completely when scrolling into Projects section.
 * 2. DEAD-CENTER POSITIONING: Cards are mathematically anchored at the exact center (top: 50%, left: 50%, translate(-50%, -50%)).
 * 3. CENTER DWELL HOLD: Each card stays locked and dwelling in the center for 60% of scroll time.
 * 4. SEQUENTIAL REVOLUTION: Cards revolve 01 -> 02 -> 03 -> 04 in 3D vertical perspective.
 * 5. UNPINS AFTER LAST CARD: Only after Card 04 finishes does the page unpin and scroll down to Contact.
 */
export default function FerrisWheel3D({
  projects = [],
  onSelectProject,
  viewMode = 'wheel',
  setViewMode,
  activeCategory = 'All',
  setActiveCategory,
  categories = [],
}) {
  const pinRef = useRef(null);
  const triggerRef = useRef(null);
  const total = projects.length || 4;
  const angleStep = 360 / total; // 90 degrees for 4 projects

  // Angle states
  const [currentAngle, setCurrentAngle] = useState(0);
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const lastYRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const [autoRotate, setAutoRotate] = useState(false);

  // Mouse hover tilt on active card
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  // Calculate active front card index
  const normalizedIndex = Math.round(-currentAngle / angleStep) % total;
  const activeIndex = (normalizedIndex + total) % total;

  // ================= 1. GSAP SCROLLTRIGGER PINNING ENGINE =================
  useEffect(() => {
    if (!pinRef.current) return;

    // Create GSAP Pin: locks screen completely while user scrolls through all 5 cards
    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: '+=3800', // 3800px scroll track provides generous dwell and smooth transitions for all 5 cards
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));

        // Map 0.0 -> 1.0 across total segments so every card, including the 5th card, has a dedicated center dwell duration
        const segments = total;
        const t = progress * segments;
        const currentSegment = Math.floor(t);

        let continuousCardIndex = 0;
        if (currentSegment >= total - 1) {
          // Final card (05) stays 100% locked in the center during the final scroll segment
          continuousCardIndex = total - 1;
        } else {
          const frac = t - currentSegment;
          const holdRatio = 0.55; // 55% of each segment is hold/dwell in center

          let easedFrac = 0;
          if (frac > holdRatio) {
            const normFrac = (frac - holdRatio) / (1 - holdRatio);
            // Smooth Hermite cubic ease: 3x^2 - 2x^3 (smoothstep)
            easedFrac = normFrac * normFrac * (3 - 2 * normFrac);
          }
          continuousCardIndex = currentSegment + easedFrac;
        }

        const scrollDrivenAngle = -continuousCardIndex * angleStep;
        targetAngleRef.current = scrollDrivenAngle;
      },
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, [total, angleStep]);

  // Jump to specific card by syncing window scroll with ScrollTrigger
  const jumpToCard = useCallback(
    (index) => {
      if (!triggerRef.current) {
        targetAngleRef.current = -index * angleStep;
        return;
      }
      const trigger = triggerRef.current;
      const fraction = (index + 0.15) / total;
      const targetScroll = trigger.start + fraction * (trigger.end - trigger.start);

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [total, angleStep]
  );

  const spinNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    jumpToCard(nextIdx);
  };

  const spinPrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    jumpToCard(prevIdx);
  };

  // Auto-spin timer: advances to next card every 4 seconds when toggled on
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      const nextIdx = (activeIndex + 1) % total;
      jumpToCard(nextIdx);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotate, activeIndex, total, jumpToCard]);

  // Pointer drag for manual spatial rotation
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentY = e.clientY;
    const deltaY = currentY - lastYRef.current;
    lastYRef.current = currentY;
    dragVelocityRef.current = deltaY;
    targetAngleRef.current += deltaY * 0.35;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    targetAngleRef.current += dragVelocityRef.current * 1.5;

    // Snap to nearest card
    const nearestStep = Math.round(targetAngleRef.current / angleStep);
    targetAngleRef.current = nearestStep * angleStep;
  };

  // Smooth lerp physics animation loop
  useEffect(() => {
    let rafId;
    const animate = () => {
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.088;
      setCurrentAngle(currentAngleRef.current);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Active front card mouse tilt handler
  const handleActiveCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    setMouseTilt({
      x: -normY * 4.5,
      y: normX * 4.5,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleActiveCardMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={pinRef}
      className="relative w-full h-screen overflow-hidden bg-transparent select-none"
    >
      {/* ================= AMBIENT 24K GOLD SPARKLES & CELESTIAL STARDUST ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {AMBIENT_SPARKS.map((spark) => (
          <div
            key={spark.id}
            style={{
              top: `${spark.top}%`,
              left: `${spark.left}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              animationDuration: `${spark.duration}s`,
              animationDelay: `${spark.delay}s`,
              boxShadow: `0 0 ${spark.size * 3.5}px rgba(251,191,36,0.95), 0 0 ${spark.size * 6}px rgba(245,158,11,0.5)`,
            }}
            className="absolute rounded-full bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 animate-pulse"
          />
        ))}

        {/* Floating Twinkling Diamond Embers */}
        <div className="absolute top-24 left-12 text-amber-400/50 animate-pulse [animation-duration:3.5s]">
          <Diamond className="h-4 w-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
        <div className="absolute top-36 right-20 text-yellow-300/40 animate-pulse [animation-duration:4.8s]">
          <Sparkles className="h-4.5 w-4.5 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        </div>
        <div className="absolute bottom-24 left-24 text-amber-300/40 animate-pulse [animation-duration:5.2s]">
          <Sparkles className="h-4 w-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
        <div className="absolute bottom-28 right-28 text-amber-400/50 animate-pulse [animation-duration:4s]">
          <Diamond className="h-3.5 w-3.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
      </div>

      {/* ================= PINNED STAGE VIEWPORT (FROZEN IN PLACE) ================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="h-full w-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 px-3 sm:px-8 lg:px-12 relative z-20 cursor-grab active:cursor-grabbing"
      >
        {/* ================= TOP COMPACT HEADER & CONTROL STRIP ================= */}
        <div className="relative z-30 mx-auto w-full max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          
          {/* Left: Title & Shape Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 backdrop-blur-md">
              <Diamond className="h-3 w-3 text-amber-400" />
              <span className="font-mono text-[9px] font-bold tracking-widest text-amber-300 uppercase">
                3D SHAPE 04 • STAR SHOWCASE
              </span>
            </div>

            <h2 className="font-serif text-lg sm:text-2xl font-black text-white tracking-tight">
              Selected{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                Digital Flagships.
              </span>
            </h2>
          </div>

          {/* Right: View Mode Toggle & Category Filters & Card Pills */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Switcher */}
            {setViewMode && (
              <div className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-[#090b10]/90 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('wheel')}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'wheel'
                      ? 'border border-amber-300 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Orbit className="h-3 w-3" />
                  <span>Ferris Wheel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'border border-amber-300 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="h-3 w-3" />
                  <span>2x2 Grid</span>
                </button>
              </div>
            )}

            {/* Direct Card Stepper Pills */}
            <div className="flex items-center gap-1">
              {projects.map((proj, i) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => jumpToCard(i)}
                  className={`h-7 px-2.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    i === activeIndex
                      ? 'border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                      : 'border border-slate-800 bg-[#0c0e14] text-slate-400 hover:text-white hover:border-amber-500/40'
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            {/* Auto-Spin Toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                autoRotate
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                  : 'border-slate-800 bg-[#0c0e14] text-slate-400 hover:text-white'
              }`}
            >
              {autoRotate ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span className="hidden sm:inline">Auto-Spin</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* ================= 3D SPATIAL FERRIS WHEEL (EXACT DEAD CENTER) ================= */}
        <div className="relative z-20 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto">
          
          {/* 3D Perspective Stage */}
          <div
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
            }}
            className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center"
          >
            {projects.map((project, index) => {
              // Angular position on the 360-degree vertical orbit
              const baseAngle = index * angleStep;
              const totalAngle = baseAngle + currentAngle;

              // Normalize to [-180, 180]
              let norm = totalAngle % 360;
              if (norm > 180) norm -= 360;
              if (norm < -180) norm += 360;

              const angleRad = (norm * Math.PI) / 180;

              // Vertical orbit radius: clamped to 85px so revolving cards never touch header or footer
              const radiusY = 85;
              const y = Math.sin(angleRad) * radiusY;

              // Depth translation: active card is at z=0, other cards recede deep into -z
              const radiusZ = 220;
              const z = (Math.cos(angleRad) - 1) * radiusZ;

              // Smooth physical tilt
              const rotateX = -norm * 0.35;

              // Scale & Opacity falloff
              const cosVal = Math.cos(angleRad);
              const scale = Math.max(0.74, 0.76 + 0.24 * Math.max(0, cosVal));
              const opacity = cosVal > -0.2 ? Math.max(0.2, Math.pow(Math.max(0, cosVal), 1.6)) : 0;
              const isFront = Math.abs(norm) < 18;

              // Combine 3D orbit transform with active card mouse tilt
              const combinedRotateX = isFront ? rotateX + mouseTilt.x : rotateX;
              const combinedRotateY = isFront ? mouseTilt.y : 0;

              return (
                <div
                  key={project.id}
                  onMouseMove={isFront ? handleActiveCardMouseMove : undefined}
                  onMouseLeave={isFront ? handleActiveCardMouseLeave : undefined}
                  onClick={() => {
                    if (!isFront) {
                      jumpToCard(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    // DEAD-CENTER ANCHORING: translate(-50%, -50%) locks center to exact pixel middle
                    transform: `translate(-50%, -50%) translate3d(0px, ${y}px, ${z}px) rotateX(${combinedRotateX}deg) rotateY(${combinedRotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: Math.round((cosVal + 1) * 50),
                    transformStyle: 'preserve-3d',
                    pointerEvents: opacity < 0.25 ? 'none' : 'auto',
                    transition: isDraggingRef.current
                      ? 'none'
                      : 'box-shadow 0.35s ease, border-color 0.35s ease',
                  }}
                  className={`w-[92vw] sm:w-[680px] lg:w-[750px] rounded-3xl border overflow-hidden backdrop-blur-2xl ${
                    isFront
                      ? 'border-amber-400 bg-[#070911]/80 shadow-[0_0_60px_rgba(245,158,11,0.35),0_25px_60px_rgba(0,0,0,0.95)]'
                      : 'border-amber-500/25 bg-[#06080d]/65 hover:border-amber-400/60 cursor-pointer'
                  }`}
                >
                  {/* Dynamic 24K Gold Glare Overlay on Active Front Card */}
                  {isFront && (
                    <div
                      style={{
                        background: `radial-gradient(circle at ${mouseTilt.glareX}% ${mouseTilt.glareY}%, rgba(251,191,36,0.18) 0%, transparent 65%)`,
                      }}
                      className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                    />
                  )}

                  {/* Top 24K Gold Highlight Sheen Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 z-20 ${
                      isFront
                        ? 'bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-100'
                        : 'opacity-0'
                    }`}
                  />

                  {/* Card Content Layout */}
                  <div className="flex flex-col md:flex-row items-stretch">
                    
                    {/* Left: High-Impact Visual Showcase */}
                    <div className="relative h-40 sm:h-48 md:h-auto md:w-5/12 overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ${
                          isFront ? 'scale-105' : 'scale-100 grayscale-[40%]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#090b11]" />

                      {/* Client Top Tag */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="rounded-lg border border-amber-500/40 bg-black/90 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-300 backdrop-blur-md">
                          {project.client}
                        </span>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="rounded-lg border border-amber-400/50 bg-black/90 px-2.5 py-1 font-mono text-xs font-black text-white">
                          0{project.number}
                        </span>
                      </div>
                    </div>

                    {/* Right: Narrative Details & Call To Action */}
                    <div className="p-4 sm:p-5 md:p-6 md:w-7/12 flex flex-col justify-between">
                      <div>
                        {/* Impact Metric Pill */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-black text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] mb-2">
                          <Sparkles className="h-3 w-3 text-amber-400" />
                          <span>{project.impactMetric}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-base sm:text-xl md:text-2xl font-black text-white leading-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-medium line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Stack Badges */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {project.stack?.slice(0, 3).map((st) => (
                            <span
                              key={st}
                              className="rounded-md border border-slate-800 bg-[#121520] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button Strip */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.65)] hover:scale-105 cursor-pointer"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>

                        <span className="font-mono text-[9px] sm:text-[10px] text-amber-400/90 uppercase tracking-widest font-bold">
                          {isFront ? '● CENTER DWELL' : 'CLICK TO REVOLVE'}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Floating Stepper Buttons (Desktop) */}
          <div className="hidden lg:flex flex-col items-center gap-2 absolute right-0 top-1/2 -translate-y-1/2 z-30">
            <button
              type="button"
              onClick={spinPrev}
              aria-label="Previous Project"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-[#0d0f17]/90 text-amber-300 backdrop-blur-xl transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <ChevronUp className="h-4 w-4" />
            </button>

            <span className="font-mono text-[8px] font-bold text-amber-400 rotate-90 my-1 tracking-widest">
              SPIN
            </span>

            <button
              type="button"
              onClick={spinNext}
              aria-label="Next Project"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-[#0d0f17]/90 text-amber-300 backdrop-blur-xl transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* ================= BOTTOM HELPER NAVIGATION FOOTER ================= */}
        <div className="relative z-30 mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 border-t border-amber-500/20 pt-2.5">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
            <Compass className="h-3.5 w-3.5 text-amber-400 animate-spin [animation-duration:8s]" />
            <span>Scroll down to revolve wheel • Card 0{activeIndex + 1} of 0{total} • Center Dwell Active</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-bold">
              {activeIndex === total - 1 ? 'Last Project • Scroll to Contact ↓' : `Next: 0${activeIndex + 2}`}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
