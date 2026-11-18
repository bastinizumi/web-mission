import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react';
import GoldIconPod from './common/GoldIconPod';

const METRICS = [
  { value: '300+', label: 'Deployments' },
  { value: '<0.8s', label: 'Core Vitals' },
  { value: '4.9★', label: 'Trust Rating' },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const metricsRef = useRef(null);
  const rightTelemetryRef = useRef(null);

  // GSAP Cinematic Entrance Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          metricsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          rightTelemetryRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.9 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen text-white pt-24 sm:pt-36 pb-28 sm:pb-32 lg:pb-20 px-4 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center"
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* ================= LEFT COLUMN: HERO NARRATIVE ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left relative z-20">

            {/* Agency Badge */}
            <div ref={badgeRef} className="inline-flex items-center justify-center lg:justify-start gap-2.5 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-[#0e1017] px-3.5 py-1 sm:px-4 sm:py-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <img
                  src="/images/web-mission-emblem-transparent.png"
                  alt="Web Mission Crest"
                  className="h-4 w-4 object-contain drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
                  EST. 2017 • 3D SPATIAL SOFTWARE AGENCY
                </span>
              </div>
            </div>

            {/* Large Cinematic Headline */}
            <h1
              ref={titleRef}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-black leading-[1.08] sm:leading-[1.03] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
            >
              We Build{' '}
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
                Digital Experiences
              </span>
              <span className="block mt-1 sm:mt-2 text-slate-100 font-sans tracking-tight font-extrabold drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
                That Inspire.
              </span>
            </h1>

            {/* Professional Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-sans font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            >
              Web Mission is a specialized web development and digital marketing agency based in Chennai. We engineer bespoke full-stack applications, conversion-driven funnels, and real-time 3D spatial web experiences tailored to scale visionary enterprises.
            </p>

            {/* Action Buttons: Explore Projects & Contact Us */}
            <div
              ref={buttonsRef}
              className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-5"
            >
              {/* Primary 24K Gold Button */}
              <motion.button
                type="button"
                onClick={() => scrollToSection('#projects')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-6 sm:px-7 py-3 sm:py-3.5 font-mono text-xs sm:text-sm font-black tracking-wider uppercase text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Projects</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>

              {/* Secondary Obsidian Dark Outline Button */}
              <motion.button
                type="button"
                onClick={() => scrollToSection('#contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-amber-500/40 bg-[#0c0e14] px-6 sm:px-7 py-3 sm:py-3.5 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all hover:border-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <GoldIconPod
                  icon={Sparkles}
                  size="xs"
                  hudCorners={false}
                  interactive={false}
                  className="!h-5 !w-5 !rounded-md border-amber-400/50 bg-amber-500/15"
                />
                <span>Contact Us</span>
              </motion.button>
            </div>

            {/* Metrics Telemetry Grid */}
            <div
              ref={metricsRef}
              className="mt-9 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    {metric.value}
                  </span>
                  <span className="mt-0.5 sm:mt-1 font-mono text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: RESPONSIVE 3D SPATIAL STAGE ================= */}
          <div
            ref={rightTelemetryRef}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start pointer-events-none relative mt-6 sm:mt-8 lg:mt-0"
          >
            {/* Top Spatial Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/35 bg-[#090b10] px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-wider text-amber-300 uppercase">
                SHAPE 01 • SPATIAL CORE
              </span>
            </div>

            {/* Dedicated 3D Sparkle Stage Height Window (houses the 3D Sparkle perfectly centered in view) */}
            <div className="h-36 sm:h-44 lg:h-64 w-full" aria-hidden="true" />

            {/* Interactive Touch / Cursor Hint — Pinned cleanly DIRECTLY BELOW the 3D Sparkle with zero overlap */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#090b10] px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-[0_0_20px_rgba(0,0,0,0.85)] text-slate-300 font-mono text-[9px] sm:text-[10px] font-bold pointer-events-auto">
              <GoldIconPod
                icon={Compass}
                size="xs"
                hudCorners={false}
                interactive={false}
                className="!h-5 !w-5 !rounded-md border-amber-400/50 bg-amber-500/15"
                iconClassName="animate-spin [animation-duration:10s]"
              />
              <span className="hidden sm:inline">MOVE CURSOR / TOUCH TO INTERACT</span>
              <span className="sm:hidden">TOUCH TO INTERACT</span>
            </div>
          </div>

        </div>
      </div>

      {/* Hairline Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}
