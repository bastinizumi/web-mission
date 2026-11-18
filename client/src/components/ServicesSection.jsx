import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Layout,
  Boxes,
  Cpu,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import GoldIconPod from './common/GoldIconPod';
import KineticServicesShowcase from './common/KineticServicesShowcase';
import SpatialCard3D from './common/SpatialCard3D';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    number: '01',
    icon: Code2,
    title: 'Website Development',
    tagline: 'High-Performance Architecture',
    description:
      'Engineered with modern MERN, Next.js, and headless CMS architectures. We build lightning-fast, secure, and SEO-optimized web flagships that convert visitors into loyal clients.',
    deliverables: [
      'Custom MERN & Next.js Platforms',
      'Headless CMS & Cloud APIs',
      'Core Web Vitals (<0.8s FCP)',
      'E-Commerce & Payment Gateways',
    ],
  },
  {
    number: '02',
    icon: Layout,
    title: 'UI/UX Design',
    tagline: 'Spatial Aesthetics & Ergonomics',
    description:
      'Human-centric interface design married with Swiss typographic elegance. We create intuitive user journeys, interactive wireframes, and enterprise-grade design systems.',
    deliverables: [
      'Interactive Figma Prototypes',
      'Bespoke Design Systems & Tokens',
      'Tactile Micro-Interactions',
      'Mobile-First Responsive Layouts',
    ],
  },
  {
    number: '03',
    icon: Boxes,
    title: '3D Visualization',
    tagline: 'Immersive Real-Time WebGL',
    description:
      'Transform static pages into living 3D environments. We leverage Three.js, React Three Fiber, and custom GLSL shaders to deliver cinematic 60 FPS interactive visual storytelling.',
    deliverables: [
      'Interactive 3D Product Viewers',
      'Custom WebGL Shaders & Physics',
      'Kinetic Geometric Sculptures',
      'Spatial Scroll-Driven Animations',
    ],
  },
  {
    number: '04',
    icon: Cpu,
    title: 'Web Applications',
    tagline: 'Enterprise Scale & Real-Time Sync',
    description:
      'Robust full-stack web applications engineered for heavy data loads, high concurrency, and real-time responsiveness. Built with cloud-native reliability and automated scaling.',
    deliverables: [
      'Real-Time Portals & Dashboards',
      'REST & GraphQL Microservices',
      'Multi-Tenant SaaS Architecture',
      'Role-Based Security & OAuth',
    ],
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Branding',
    tagline: 'Unforgettable Market Identity',
    description:
      'A distinctive brand identity is your strongest competitive advantage. We craft iconic visual systems, typographic hierarchies, and brand narratives commanding premium pricing.',
    deliverables: [
      'Iconic Brand Mark & Logo Craft',
      'Luxury Typography & Color Palettes',
      'Motion Design & Sound Identity',
      'Brand Style Guides & Assets',
    ],
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Digital Solutions',
    tagline: 'Precision Search & Growth Funnels',
    description:
      'Performance-driven digital marketing and technical SEO built to dominate search engine results in Chennai and global markets. We turn clicks into predictable revenue.',
    deliverables: [
      'Technical & Local Chennai SEO',
      'High-Conversion Sales Funnels',
      'Performance Ads Optimization',
      'Real-Time Telemetry & Analytics',
    ],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
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

      // Services Cards Stagger Reveal
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen text-white py-16 sm:py-24 px-4 sm:px-10 lg:px-16 overflow-visible"
    >
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= SECTION HEADER ================= */}
        <div ref={headerRef} className="relative z-20 max-w-3xl mb-14 sm:mb-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-4 sm:mb-5">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
              CAPABILITIES &amp; EXPERTISE • 3D SHAPE 03: LAYERED APP WINDOWS
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Digital Solutions
            </span>{' '}
            Engineered to Scale.
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-sans font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            As you scroll through our capabilities, notice how the background particles assemble into layered application window frames, reflecting our end-to-end digital craft.
          </p>
        </div>

        {/* ================= INTERACTIVE 24K GOLD KINETIC SHOWCASE ================= */}
        <div className="mb-16 sm:mb-24">
          <KineticServicesShowcase />
        </div>

        {/* ================= SUBHEADER FOR DEEP-DIVE GRID ================= */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#ffd700]" />
            <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-white">
              DETAILED CAPABILITIES &amp; DELIVERABLES DIRECTORY
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
            06 CORE PILLARS
          </span>
        </div>

        {/* ================= 6 ELEGANT SERVICES CARDS GRID (3D SPATIAL TILT) ================= */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon;
            const tiltDir = idx % 3 === 0 ? 'left' : idx % 3 === 2 ? 'right' : 'center';
            return (
              <SpatialCard3D
                key={service.number}
                tiltDirection={tiltDir}
                maxTilt={9}
                onClick={scrollToContact}
                className="cursor-pointer"
              >
                <div>
                  {/* Card Header Strip: Number + Dual-Tone Luxury Gold HUD Icon Pod */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="font-mono text-xs font-black text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1">
                      {service.number}
                    </span>

                    <GoldIconPod icon={Icon} size="md" />
                  </div>

                  {/* Service Title & Tagline */}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {service.tagline}
                  </span>

                  <h3 className="mt-1 font-serif text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3.5 font-sans text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    {service.description}
                  </p>

                  {/* Capabilities Deliverable Tags */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-2.5">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Deliverables:
                    </div>
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-xs font-sans text-slate-300 font-medium"
                      >
                        <GoldIconPod
                          icon={CheckCircle2}
                          size="xs"
                          hudCorners={false}
                          interactive={false}
                          className="!h-4 !w-4 !rounded-md border-amber-400/40 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
                        />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                  <span className="tracking-wider uppercase group-hover:underline">
                    Inquire Capability
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-amber-500 group-hover:text-slate-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

              </SpatialCard3D>
            );
          })}
        </div>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <div className="mt-16 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#0c0e14] to-amber-500/15 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-[0_12px_45px_rgba(0,0,0,0.7)]">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Have a visionary project in mind?
            </h4>
            <p className="mt-2 text-sm text-slate-300 font-sans font-medium">
              Let&apos;s build an unforgettable 3D spatial experience or enterprise web application together.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={scrollToContact}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-8 py-4 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-shadow hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] cursor-pointer"
          >
            Start Your Project &rarr;
          </motion.button>
        </div>

      </div>

      {/* Bottom Hairline Gradient Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}
