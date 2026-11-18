import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Sparkles,
  X,
  CheckCircle2,
  TrendingUp,
  Diamond,
  Orbit,
  LayoutGrid,
} from 'lucide-react';
import GoldIconPod from './common/GoldIconPod';
import SpatialCard3D from './common/SpatialCard3D';
import FerrisWheel3D from './common/FerrisWheel3D';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'catering',
    number: '01',
    title: 'Event Catering & Culinary Services',
    client: 'AURA Gourmet & Grand Banquets',
    category: 'Hospitality',
    tags: ['Hospitality', 'E-Commerce Booking', '3D Menu Showcase'],
    impactMetric: '+340% Booking Inquiries',
    image: '/images/proj-catering.jpg',
    description:
      'A bespoke luxury catering and private banquet platform featuring interactive tasting menus, instant date reservation funnels, and automated quotation pipelines for luxury events.',
    challenge:
      'The client suffered from manual spreadsheet booking conflicts and a generic website that failed to convey the artistry of their high-ticket culinary experiences.',
    solution:
      'Engineered an immersive spatial web showcase with interactive dish visualizers, automated calendar slot reservations, and instant WhatsApp booking integrations.',
    stack: ['React 19', 'Next.js App Router', 'Tailwind CSS', 'Node.js API', 'PostgreSQL'],
    results: [
      '+340% inbound private event inquiries in 90 days',
      'Average booking conversion value increased by 45%',
      '<0.7s Core Web Vitals load speed',
    ],
  },
  {
    id: 'interior',
    number: '02',
    title: 'Luxury Interior & Architecture Studio',
    client: 'Atelier Vôtre Spatial Design',
    category: 'Architecture',
    tags: ['Architecture', '3D Spatial Tours', 'Luxury Portfolio'],
    impactMetric: '4.2x Client Retention',
    image: '/images/proj-interior.jpg',
    description:
      'An architectural masterwork website featuring Three.js WebGL virtual space walk-throughs, smooth kinetic scroll interactions, and high-fidelity photography showcasing multimillion-dollar residential spaces.',
    challenge:
      'Showcasing multimillion-dollar ultra-luxury residential properties without losing frame rate or visual fidelity across mobile and high-resolution Retina displays.',
    solution:
      'Built a custom WebGL spatial environment with progressive texture streaming, custom camera panning physics, and editorial Swiss typographic layouts.',
    stack: ['Three.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'GLSL Shaders', 'Vite'],
    results: [
      '4.2x longer average session duration',
      'Rank 1 in Chennai for ultra-luxury architecture',
      'Featured in International Spatial Web Showcases',
    ],
  },
  {
    id: 'academy',
    number: '03',
    title: 'IAS Academy & Civil Services Portal',
    client: 'Chanakya Civil Services Academy',
    category: 'EdTech',
    tags: ['EdTech Platform', 'Student LMS', 'Mock Test Engine'],
    impactMetric: '85,000+ Enrolled Aspirants',
    image: '/images/proj-academy.jpg',
    description:
      'Comprehensive civil services learning management ecosystem with live video classroom streaming, timer-driven preliminary test engines, student analytics, and cloud document delivery.',
    challenge:
      'Handling sudden traffic spikes of 25,000+ simultaneous test takers during all-India mock exams without database timeouts or latency.',
    solution:
      'Architected an elastic MERN full-stack platform backed by Redis caching, automated horizontal container scaling, and an interactive real-time rank calculator.',
    stack: ['MERN Stack', 'Redis Cache', 'WebSockets', 'AWS CloudFront', 'Docker'],
    results: [
      '85,000+ registered civil services aspirants',
      'Zero downtime during peak national mock tests',
      '99.98% overall test platform availability',
    ],
  },
  {
    id: 'solar',
    number: '04',
    title: 'Solar Energy & Green Power Solutions',
    client: 'Enerjoy CleanTech Global',
    category: 'CleanTech',
    tags: ['CleanTech', 'Solar Telemetry', 'Energy Portal'],
    impactMetric: '+45% Quote Conversions',
    image: '/images/proj-solar.jpg',
    description:
      'High-performance CleanTech enterprise platform engineered to educate commercial & residential buyers on solar ROI with real-time solar yield calculators and telemetry galleries.',
    challenge:
      'Explaining complex commercial solar payback cycles to enterprise procurement teams without overwhelming them with dense engineering spreadsheets.',
    solution:
      'Engineered an interactive 3D solar array visualizer with instant kWh payback calculators, dynamic quotation pipelines, and direct WhatsApp sales triggers.',
    stack: ['React 19', 'Next.js App Router', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    results: [
      '+45% quote conversion lift in first 60 days',
      'Over 14,000 commercial solar assessments performed',
      '<0.6s Core Web Vitals load speed',
    ],
  },
  {
    id: 'enterprise',
    number: '05',
    title: 'Enterprise Business & B2B Solutions',
    client: 'Apex Global Industrial Logistics',
    category: 'Enterprise',
    tags: ['Enterprise SaaS', 'Supply Chain Portal', 'MERN Architecture'],
    impactMetric: '99.99% Cloud Uptime',
    image: '/images/proj-enterprise.jpg',
    description:
      'Multi-tenant B2B enterprise resource and global shipping dashboard handling real-time freight tracking, telemetry analytics, and multi-currency invoicing across international trade corridors.',
    challenge:
      'Disjointed legacy ERP software that fragmented shipping logistics data across 14 international ports and delayed customs clearances.',
    solution:
      'Engineered a centralized real-time telemetry dashboard with role-based access control (RBAC), live shipment mapping, and automated PDF export pipelines.',
    stack: ['React', 'Express.js', 'MongoDB Cluster', 'Tailwind CSS', 'REST API'],
    results: [
      'Automated 68% of manual invoice reconciliations',
      'Real-time container tracking with <50ms sync latency',
      'Trusted across 4 continents and 14 shipping ports',
    ],
  },
];

const CATEGORIES = ['All', 'Hospitality', 'Architecture', 'EdTech', 'CleanTech', 'Enterprise'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('wheel'); // 'wheel' (3D Ferris Wheel) | 'grid'

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(
      (p) => p.category === activeCategory || p.tags.includes(activeCategory)
    );
  }, [activeCategory]);

  // Lock background scrolling & pause Lenis when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop?.();
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start?.();
    };
  }, [selectedProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
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

      // Projects Grid Stagger Entrance
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
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
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative text-white overflow-visible ${
        viewMode === 'wheel' ? 'p-0 min-h-screen' : 'min-h-screen pt-16 sm:pt-28 pb-16'
      }`}
    >
      {/* ================= EDITORIAL HEADER & FILTER (GRID VIEW ONLY) ================= */}
      {viewMode === 'grid' && (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-10 lg:px-16 mb-8 sm:mb-12">
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/30 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-4 sm:mb-5">
                <Diamond className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
                  PORTFOLIO • 3D SHAPE 04: DIAMOND STAR SHOWCASE
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08]">
                Selected{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  Digital Flagships.
                </span>
              </h2>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-300 font-sans font-medium leading-relaxed">
                As you explore our portfolio, watch how the background sparkles align into a geometric 3D Diamond Star &amp; Showcase Ring, putting our client results into focus.
              </p>
            </div>

            {/* Controls Right Column: View Mode & Category Filter Pills */}
            <div className="flex flex-col items-start lg:items-end gap-3.5">
              {/* View Mode Switcher: 3D Ferris Wheel (ராட்டினம்) vs Grid */}
              <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-[#090b10]/90 p-1 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <button
                  type="button"
                  onClick={() => setViewMode('wheel')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'wheel'
                      ? 'border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <Orbit className="h-3.5 w-3.5" />
                  <span>3D Ferris Wheel (ராட்டினம்)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>2x2 Grid View</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-xl px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border border-amber-400 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                          : 'border border-slate-800 bg-[#0a0c10]/80 text-slate-400 hover:text-white hover:border-amber-500/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONDITIONAL: 3D FERRIS WHEEL (ராட்டினம்) VS 2X2 GRID ================= */}
      {viewMode === 'wheel' ? (
        <div className="relative z-10 w-full overflow-visible">
          <FerrisWheel3D
            projects={filteredProjects}
            onSelectProject={setSelectedProject}
            viewMode={viewMode}
            setViewMode={setViewMode}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={CATEGORIES}
          />
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-10 lg:px-16">
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
          >
            {filteredProjects.map((project, idx) => (
              <SpatialCard3D
                key={project.id}
                tiltDirection={idx % 2 === 0 ? 'left' : 'right'}
                maxTilt={8}
                className="!p-0 overflow-hidden"
              >
                {/* Large Visual Showcase Viewport */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Dimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge: Client & Index */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="rounded-xl border border-amber-500/40 bg-black/85 px-3.5 py-1.5 font-mono text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-sm">
                      {project.client}
                    </span>

                    <span className="rounded-xl border border-amber-500/40 bg-black/85 px-3 py-1 font-mono text-xs font-black text-white backdrop-blur-md">
                      {project.number}
                    </span>
                  </div>

                  {/* Bottom Overlay Badge: Impact Metric */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400 bg-black/90 px-3.5 py-1.5 font-mono text-xs font-black text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{project.impactMetric}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Stage */}
                <div className="p-7 sm:p-9 flex flex-col justify-between flex-1">
                  <div>
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-3 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Action Strip */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="group/btn inline-flex items-center gap-2.5 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-6 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest hidden sm:inline font-bold">
                      Case Study 0{project.number}
                    </span>
                  </div>
                </div>
              </SpatialCard3D>
            ))}
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE CASE STUDY MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-contain"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              data-lenis-prevent="true"
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-amber-500/35 bg-[#0c0e14] shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[88vh] flex flex-col text-white overscroll-contain"
            >
              {/* Modal Header */}
              <div className="shrink-0 flex items-center justify-between border-b border-slate-800 bg-[#090b10] px-6 py-4.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-amber-300 bg-amber-500/10 border border-amber-400/40 rounded-lg px-2.5 py-1">
                    {selectedProject.number}
                  </span>
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-200">
                    {selectedProject.client}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="cursor-pointer"
                  aria-label="Close modal"
                >
                  <GoldIconPod
                    icon={X}
                    size="sm"
                    hudCorners={false}
                    className="!h-8 !w-8 border-slate-800 bg-[#10131c] hover:border-amber-400"
                  />
                </button>
              </div>

              {/* Modal Body (Scrollable Container with Lenis Prevent) */}
              <div
                data-lenis-prevent="true"
                className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 overscroll-contain"
              >
                <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-2xl border border-slate-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 rounded-xl border border-amber-400/40 bg-black/90 px-4 py-2 font-mono text-xs font-bold text-amber-300">
                    Impact: {selectedProject.impactMetric}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed font-medium">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-[#10131c] p-5">
                    <div className="font-mono text-xs font-black uppercase text-amber-400 mb-2">
                      The Challenge:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-[#10131c] p-5">
                    <div className="font-mono text-xs font-black uppercase text-amber-400 mb-2">
                      Our Architectural Solution:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Measurable Results */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                  <div className="font-mono text-xs font-black uppercase text-amber-300 mb-3 flex items-center gap-2.5">
                    <GoldIconPod
                      icon={TrendingUp}
                      size="xs"
                      hudCorners={false}
                      className="!h-6 !w-6 border-amber-400/50 bg-amber-500/20"
                    />
                    <span>Measurable Outcomes &amp; Benchmarks</span>
                  </div>
                  <div className="space-y-2.5">
                    {selectedProject.results.map((result) => (
                      <div
                        key={result}
                        className="flex items-center gap-2.5 text-xs font-sans text-slate-200 font-medium"
                      >
                        <GoldIconPod
                          icon={CheckCircle2}
                          size="xs"
                          hudCorners={false}
                          interactive={false}
                          className="!h-4 !w-4 !rounded-md border-amber-400/50 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
                        />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <div className="font-mono text-xs font-bold uppercase text-slate-400 mb-2.5">
                    Technology Stack:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-800 bg-[#10131c] px-3 py-1 font-mono text-xs font-bold text-amber-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="shrink-0 border-t border-slate-800 bg-[#090b10] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-400 font-medium">
                  Ready to engineer a similar digital flagship?
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-6 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  Start Similar Project &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Hairline Gradient Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}
