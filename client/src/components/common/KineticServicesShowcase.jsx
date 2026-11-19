import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HoverSliderContext,
  TextStaggerHover,
} from '@/components/blocks/animated-slideshow';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Boxes,
  Layout,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import GoldIconPod from './GoldIconPod';

gsap.registerPlugin(ScrollTrigger);

export const CAPABILITIES_SLIDES = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Platforms',
    fullTitle: 'High-Velocity Web Platforms',
    tagline: 'Modern MERN & Next.js Architecture',
    category: 'Full-Stack Engineering',
    metric: 'Sub-second Core Web Vitals',
    icon: Code2,
    imageUrl: '/images/service-web.jpg',
    description:
      'Engineered with modern MERN, Next.js, and headless CMS architectures. Built for instant page loads, enterprise security, and maximum conversion velocity.',
    deliverables: ['Custom MERN Stack', 'Next.js 15 SSR/SSG', 'Core Web Vitals <0.8s', 'E-Commerce Engines'],
  },
  {
    id: 'spatial-3d',
    number: '02',
    title: '3D Spatial UI',
    fullTitle: '3D Spatial & WebGL Experiences',
    tagline: 'GPU-Accelerated Three.js Interfaces',
    category: 'Creative Technology',
    metric: '60 FPS Hardware Precision',
    icon: Boxes,
    imageUrl: '/images/service-app.jpg',
    description:
      'Transform static web pages into living 3D spatial instruments. We utilize Three.js, React Three Fiber, and custom GLSL fragment shaders for cinematic visual impact.',
    deliverables: ['Three.js WebGL Engines', 'Custom GLSL Shaders', 'Kinetic Particle Systems', 'Interactive 3D Viewers'],
  },
  {
    id: 'uiux-design',
    number: '03',
    title: 'UI/UX Design',
    fullTitle: 'Spatial Ergonomics & UI Systems',
    tagline: 'Human-Centric Interface Engineering',
    category: 'Experience Design',
    metric: '4.9★ Enterprise Usability',
    icon: Layout,
    imageUrl: '/images/service-uiux.jpg',
    description:
      'Human-centric interface design married with Swiss typographic discipline. We craft intuitive user journeys, interactive Figma prototypes, and scalable design systems.',
    deliverables: ['Figma Design Tokens', 'Tactile Micro-Interactions', 'Enterprise Design Systems', 'Mobile-First Layouts'],
  },
  {
    id: 'cloud-apps',
    number: '04',
    title: 'Cloud Systems',
    fullTitle: 'Cloud Backends & Scalable APIs',
    tagline: 'Distributed Real-Time Architecture',
    category: 'Cloud Infrastructure',
    metric: '99.9% Uptime Reliability',
    icon: Cpu,
    imageUrl: '/images/growth-prism.jpg',
    description:
      'Robust full-stack web applications engineered for high concurrency, real-time WebSockets, and seamless data synchronization with cloud-native reliability.',
    deliverables: ['REST & GraphQL Microservices', 'MongoDB Atlas Clusters', 'Multi-Tenant Architecture', 'Automated Cloud Deployments'],
  },
  {
    id: 'seo-growth',
    number: '05',
    title: 'SEO & Growth',
    fullTitle: 'Precision Search & Revenue Funnels',
    tagline: 'High-Intent Technical Domination',
    category: 'Growth Marketing',
    metric: '3.5x Organic Conversion',
    icon: TrendingUp,
    imageUrl: '/images/service-marketing.jpg',
    description:
      'Performance-driven digital marketing and technical SEO built to dominate search results in Chennai and international markets. Turning traffic into scalable enterprise revenue.',
    deliverables: ['Technical Core SEO', 'High-Conversion Funnels', 'Keyword SERP Domination', 'Live Telemetry Analytics'],
  },
];

/**
 * KineticServicesShowcase - Scroll-Driven Auto-Click Kinetic Showcase
 * 
 * Features:
 * 1. MOUSE SCROLL AUTO-ACTIVATION: As the user scrolls down with the mouse wheel,
 *    each service item automatically activates (clicks) and shows its respective image!
 * 2. GSAP SCROLL PINNING: The showcase locks in place while the user scrolls through all 5 services.
 * 3. SYNCHRONIZED CLICK & JUMP: Clicking any pill smoothly scrolls to and activates that service.
 * 4. REAL-TIME PROGRESS BAR: Golden timeline fills up as the user scrolls through each service.
 * 5. UNPINS NATURALLY: Only after 05 SEO & Growth finishes does the page scroll to the next section.
 */
export default function KineticServicesShowcase() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0); // 0.0 to 1.0 within current slide

  const current = CAPABILITIES_SLIDES[activeSlide] || CAPABILITIES_SLIDES[0];
  const CurrentIcon = current.icon;
  const totalSlides = CAPABILITIES_SLIDES.length;

  // ================= GSAP SCROLLTRIGGER PINNING & AUTO-SELECTION =================
  useEffect(() => {
    if (!containerRef.current) return;

    // Mobile check: On mobile & tablet screens (<1024px), DO NOT PIN or hijack the scroll!
    // Allows completely natural, frictionless page scrolling on mobile devices while keeping tap switching instant.
    if (window.innerWidth < 1024) {
      triggerRef.current = null;
      return;
    }

    // On Desktop (1024px+): Pin the showcase and drive active slide by mouse scroll
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80px', // locks cleanly below the fixed top navbar
      end: '+=2500', // 2500px scroll length (500px per slide)
      pin: true,
      pinSpacing: true,
      scrub: 0.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(0.9999, self.progress));
        const rawIndex = progress * totalSlides;
        const index = Math.min(totalSlides - 1, Math.floor(rawIndex));
        const localFraction = rawIndex - index;

        setActiveSlide(index);
        setSlideProgress(localFraction);
      },
    });

    triggerRef.current = trigger;

    const handleResize = () => {
      if (window.innerWidth < 1024 && triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [totalSlides]);

  // Jump to specific slide: instant tap on mobile; synced scroll on desktop
  const jumpToSlide = (index) => {
    setActiveSlide(index);
    setSlideProgress(1.0);

    // On desktop where ScrollTrigger is pinned, sync page scroll position
    if (triggerRef.current && window.innerWidth >= 1024) {
      const trigger = triggerRef.current;
      const fraction = (index + 0.2) / totalSlides;
      const targetScroll = trigger.start + fraction * (trigger.end - trigger.start);

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 0.85 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = (serviceTitle) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide: jumpToSlide }}>
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto rounded-3xl bg-transparent select-none"
      >
        {/* ================= TOP HUD TELEMETRY RIBBON ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4af37]/25 pb-3.5 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-bold text-[#fce89f] uppercase tracking-widest text-[10px] sm:text-xs">
              <span className="lg:hidden">INTERACTIVE CAPABILITIES SHOWCASE</span>
              <span className="hidden lg:inline">SCROLL-TRIGGERED KINETIC SHOWCASE</span>
            </span>
            <span className="text-slate-600 hidden lg:inline">•</span>
            <span className="text-slate-400 hidden lg:inline text-[11px]">
              SCROLL MOUSE DOWN TO AUTOMATICALLY SWITCH SERVICES &amp; IMAGES
            </span>
            <span className="text-slate-400 lg:hidden text-[10px]">
              • TAP SERVICE TO SWITCH
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Visual Slide Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {CAPABILITIES_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpToSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide
                      ? 'w-6 bg-gradient-to-r from-[#d4af37] via-[#fce89f] to-[#aa771c] shadow-[0_0_10px_rgba(212,175,55,0.7)]'
                      : 'w-2 bg-slate-700 hover:bg-[#d4af37]/60'
                  }`}
                  title={s.title}
                />
              ))}
            </div>

            <span className="text-[#fce89f] font-bold tracking-widest text-[11px] sm:text-xs">
              [ 0{activeSlide + 1} / 05 ]
            </span>
          </div>
        </div>

        {/* ================= MAIN 2-COLUMN SPATIAL STAGE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Interactive Staggered Service Titles */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
            <div className="space-y-2">
              {CAPABILITIES_SLIDES.map((slide, index) => {
                const isActive = activeSlide === index;
                const Icon = slide.icon;

                return (
                  <div
                    key={slide.id}
                    onClick={() => jumpToSlide(index)}
                    className={`group relative flex flex-col rounded-2xl border transition-all duration-300 p-3 sm:p-3.5 cursor-pointer overflow-hidden ${
                      isActive
                        ? 'border-[#dfb76c]/80 bg-gradient-to-r from-[#d4af37]/25 via-[#121522] to-[#0a0c10] shadow-[0_0_30px_rgba(212,175,55,0.3)] translate-x-1 sm:translate-x-2'
                        : 'border-[#dfb76c]/15 bg-[#090b10]/60 hover:border-[#dfb76c]/40 hover:bg-[#0c0e15]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                        {/* Active Golden Icon Pod */}
                        <div
                          className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
                            isActive
                              ? 'border-[#dfb76c] bg-gradient-to-br from-[#d4af37]/35 to-[#936a32]/30 text-[#fce89f] shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                              : 'border-slate-800 bg-slate-900/80 text-slate-400 group-hover:border-[#dfb76c]/40 group-hover:text-[#fce89f]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] sm:text-xs font-black text-[#e2b755]">
                              {slide.number} //
                            </span>
                            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 truncate">
                              {slide.category}
                            </span>
                          </div>

                          {/* Staggered Animated Text on Hover / Scroll Active */}
                          <TextStaggerHover
                            index={index}
                            text={slide.title}
                            active={isActive}
                            dimmed={!isActive}
                            className={`text-base sm:text-xl md:text-2xl font-serif font-black tracking-tight uppercase transition-colors duration-200 ${
                              isActive
                                ? 'text-[#fce89f] drop-shadow-[0_0_18px_rgba(212,175,55,0.7)]'
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Right Glowing Active Arrow (Rich 24K Gold Logo Gradient) */}
                      <div
                        className={`h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg flex items-center justify-center border transition-all ${
                          isActive
                            ? 'border-[#fce89f]/80 bg-gradient-to-br from-[#d4af37] via-[#fce89f] to-[#aa771c] text-[#1a1205] shadow-[0_0_18px_rgba(212,175,55,0.75)]'
                            : 'border-transparent text-slate-600 group-hover:text-[#e2b755]'
                        }`}
                      >
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 font-black" />
                      </div>
                    </div>

                    {/* Active Pill Live Scroll Progress Bar */}
                    {isActive && (
                      <div className="mt-2.5 h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${Math.round(slideProgress * 100)}%` }}
                          className="h-full bg-gradient-to-r from-[#936a32] via-[#e2b755] to-[#fce89f] shadow-[0_0_10px_rgba(212,175,55,0.7)] transition-[width] duration-75"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Active Metric Banner */}
            <div className="rounded-xl border border-[#d4af37]/25 bg-[#07090e]/80 p-3 sm:p-3.5 flex items-center justify-between text-xs font-mono mt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#e2b755]" />
                <span className="text-slate-400 text-[10px] sm:text-xs">
                  Performance Benchmark:
                </span>
              </div>
              <span className="font-bold text-[#fce89f] uppercase tracking-wider text-[11px] sm:text-xs">
                {current.metric}
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Animated Slideshow Frame */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-[#d4af37]/35 bg-[#080a10]/95 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            
            {/* Top Frame Status Header */}
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <CurrentIcon className="h-4 w-4 text-[#e2b755]" />
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  {current.fullTitle}
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                ACTIVE SPRINT
              </span>
            </div>

            {/* Smooth Cinematic Image Transition Stage with AnimatePresence */}
            <div className="relative h-52 sm:h-64 lg:h-72 w-full overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-black shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={current.imageUrl}
                    alt={current.fullTitle}
                    className="h-full w-full object-cover brightness-95"
                  />

                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Status Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#fce89f] bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#d4af37]/40 shadow-sm">
                      {current.tagline}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-black/90 px-2 py-0.5 rounded border border-emerald-500/30">
                      60 FPS
                    </span>
                  </div>

                  {/* Bottom Animated 24K Gold Timeline Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900/90 overflow-hidden z-10">
                    <div
                      style={{ width: `${Math.round(slideProgress * 100)}%` }}
                      className="h-full bg-gradient-to-r from-[#936a32] via-[#e2b755] to-[#fce89f] shadow-[0_0_12px_rgba(212,175,55,0.7)] transition-[width] duration-75"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Service Narrative Description */}
            <p className="mt-3.5 font-sans text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {current.description}
            </p>

            {/* Deliverables Tags Grid */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                CORE DELIVERABLES:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {current.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] text-slate-200 font-medium">
                    <CheckCircle2 className="h-3 w-3 text-[#e2b755] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA Action Button */}
            <button
              type="button"
              onClick={() => scrollToContact(current.title)}
              className="mt-4 w-full rounded-xl border border-[#fce89f]/60 bg-gradient-to-r from-[#b8860b] via-[#e2b755] to-[#996515] py-2.5 font-mono text-xs font-black uppercase tracking-wider text-[#140e04] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Consult on {current.title}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </div>
      </div>
    </HoverSliderContext.Provider>
  );
}
