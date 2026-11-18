import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Cpu,
  Award,
  ShieldCheck,
  ArrowRight,
  Network,
  Boxes,
} from 'lucide-react';
import GoldIconPod from './common/GoldIconPod';
import SpatialCard3D from './common/SpatialCard3D';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    icon: Award,
    numericValue: 8,
    suffix: '+',
    label: 'Years of Mastery',
    subtext: 'Pioneering in Chennai since 2017',
  },
  {
    icon: Boxes,
    numericValue: 300,
    suffix: '+',
    label: 'Platforms Deployed',
    subtext: 'From fast-growth startups to scale-ups',
  },
  {
    icon: Cpu,
    numericValue: 99.9,
    suffix: '%',
    label: 'Uptime & Speed',
    subtext: 'Sub-second Core Web Vitals standard',
  },
  {
    icon: Sparkles,
    numericValue: 4.9,
    suffix: '★',
    label: 'Client Trust Rating',
    subtext: 'Across 50+ enterprise engagements',
  },
];

const PILLARS = [
  {
    icon: Cpu,
    title: 'High-Velocity Engineering',
    description:
      'Robust MERN, Next.js, and cloud-native backends architected for enterprise stability, instant page renders, and bulletproof security.',
  },
  {
    icon: Sparkles,
    title: 'Cinematic 3D & Spatial UI',
    description:
      'Cutting-edge Three.js WebGL spatial interfaces, custom fragment shaders, and tactile micro-interactions that leave competitors behind.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Stats stagger counter reveal
      if (statsRef.current) {
        const statCards = statsRef.current.children;
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Feature cards stagger reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen text-white py-16 sm:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= SECTION HEADER ================= */}
        <div ref={headerRef} className="relative z-20 max-w-3xl mb-14 sm:mb-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-4 sm:mb-5">
            <Network className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
              ABOUT WEB MISSION • 3D SHAPE 02: ARCHITECTURE LATTICE
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Pioneering The Future of{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Digital Architecture
            </span>{' '}
            &amp; Spatial Web.
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-sans font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Founded in 2017, <strong className="text-white font-bold">Web Mission</strong> has evolved into a premier full-service digital agency based in Chennai, India. As you scroll, our 3D background sparkles assemble into interconnected data architecture, reflecting our full-stack engineering discipline.
          </p>
        </div>

        {/* ================= ANIMATED STATISTICS GRID (3D SPATIAL TILT) ================= */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-14 sm:mb-20"
        >
          {STATS.map((stat, idx) => {
            const tiltDir = idx % 2 === 0 ? 'left' : 'right';
            return (
              <SpatialCard3D
                key={stat.label}
                tiltDirection={tiltDir}
                maxTilt={7}
                className="!p-4 sm:!p-7 !rounded-2xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <GoldIconPod
                    icon={stat.icon}
                    size="xs"
                    hudCorners={false}
                    className="!h-7 !w-7 !rounded-lg border-amber-400/40 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-400/80">
                    METRIC
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl sm:text-5xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    {stat.numericValue}
                  </span>
                  <span className="font-serif text-xl sm:text-3xl font-black text-amber-400">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="mt-2 sm:mt-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                  {stat.label}
                </h3>

                <p className="mt-1 font-sans text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium">
                  {stat.subtext}
                </p>
              </SpatialCard3D>
            );
          })}
        </div>

        {/* ================= STORY NARRATIVE & DUAL PILLARS ================= */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Visual Agency Studio Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-amber-500/25 bg-[#0a0c10]/80 p-6 sm:p-8 relative overflow-hidden group shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="relative h-64 sm:h-72 overflow-hidden rounded-2xl border border-amber-500/20">
              <img
                src="/images/chennai-hq-lab.jpg"
                alt="Web Mission Chennai Digital Studio Workspace"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-lg border border-amber-400/40 bg-black/90 px-3 py-1 font-mono text-[10px] font-bold text-amber-300 backdrop-blur-md uppercase">
                  Chennai HQ • Lab Space
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400 bg-black/90 px-2.5 py-1 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  Active Sprints
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-serif text-xl sm:text-2xl font-black text-white">
                Engineering with Uncompromising Craft.
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
                We believe software websites are living, high-conversion spatial instruments. Every line of clean code and 3D vertex is engineered to captivate and convert your enterprise clients.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Pillars (3D Spatial Tilt) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <SpatialCard3D
                  key={pillar.title}
                  tiltDirection={idx === 0 ? 'left' : 'right'}
                  maxTilt={6}
                >
                  <div className="flex items-start gap-5">
                    <GoldIconPod icon={Icon} size="md" />

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed font-medium">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </SpatialCard3D>
              );
            })}

            {/* Bottom Statement Banner */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#0c0e14] to-amber-500/15 p-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <GoldIconPod
                  icon={ShieldCheck}
                  size="sm"
                  hudCorners={false}
                  className="border-amber-400/50 bg-amber-500/15"
                />
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-200">
                  Ready to elevate your enterprise to the next digital tier?
                </span>
              </div>
              <a
                href="#services"
                className="inline-flex items-center gap-2 font-mono text-xs font-black text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
              >
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Hairline Gradient Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}
