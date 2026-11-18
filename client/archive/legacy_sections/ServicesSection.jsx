import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Star,
  Terminal,
  Activity,
  Cpu,
  Monitor,
  Maximize2,
  Minus,
  X,
} from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { TextStaggerHover } from '@/components/ui/animated-slideshow';

const CARDS_DATA = [
  {
    number: '01',
    appId: 'bespoke-studio.app',
    category: 'BESPOKE VISUAL SYSTEMS & INTERACTIVE INTERFACES',
    title: 'UI/UX & Web Design',
    description:
      'Innovative, mobile-responsive, and customized website designs crafted to reflect your brand identity and turn first impressions into measurable engagement.',
    image: '/images/service-uiux.jpg',
    deliverables: [
      'Wireframing & Interactive Prototypes',
      'Design Systems & Brand Identity',
      'Motion & Micro-Interaction Craft',
      'Conversion-Focused Landing Pages',
    ],
    testimonial: {
      stars: 5,
      quote:
        'Their innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended!',
      author: 'James S.',
      role: 'Frontend Developer & Product Lead',
      avatar: '/images/why-agency.jpg',
    },
    specs: {
      framework: 'Figma & Framer Engine',
      latency: '11ms',
      memory: '38MB',
      version: 'v4.2.0-prod',
    },
  },
  {
    number: '02',
    appId: 'fullstack-mern.app',
    category: 'HIGH-PERFORMANCE FULL-STACK ENGINEERING',
    title: 'Web Development',
    description:
      'Custom web applications, e-commerce platforms, and scalable enterprise software engineered with modern MERN and full-stack architectures.',
    image: '/images/about-craft.jpg',
    deliverables: [
      'Custom MERN & Next.js Web Apps',
      'E-Commerce & Payment Integrations',
      'Headless CMS & REST/GraphQL APIs',
      'Core Web Vitals & Speed Optimization',
    ],
    testimonial: {
      stars: 5,
      quote:
        'The custom MERN stack architecture handled our scale effortlessly. 4x faster page loads and flawless deployment.',
      author: 'Priya R.',
      role: 'CTO, Enterprise SaaS',
      avatar: '/images/about-craft.jpg',
    },
    specs: {
      framework: 'React 19 & Node.js 22',
      latency: '8ms',
      memory: '64MB',
      version: 'v5.1.4-prod',
    },
  },
  {
    number: '03',
    appId: 'growth-radar.app',
    category: 'DATA-DRIVEN GROWTH & SEARCH DOMINANCE',
    title: 'Digital Marketing & SEO',
    description:
      'Target-driven digital marketing, technical SEO, and performance campaigns built to skyrocket organic visibility, qualified leads, and revenue.',
    image: '/images/service-marketing.jpg',
    deliverables: [
      'Technical & Local Chennai SEO',
      'Performance Ads & Lead Funnels',
      'Social Media Brand Growth',
      'Analytics & Conversion Tracking',
    ],
    testimonial: {
      stars: 5,
      quote:
        'Rank 1 in Chennai within 90 days. Organic leads doubled and conversion rates surged across all channels.',
      author: 'Arvind K.',
      role: 'Growth Marketing Director',
      avatar: '/images/service-marketing.jpg',
    },
    specs: {
      framework: 'Search Console & SEM Matrix',
      latency: '14ms',
      memory: '29MB',
      version: 'v3.8.2-prod',
    },
  },
  {
    number: '04',
    appId: 'native-core.app',
    category: 'CROSS-PLATFORM MOBILE & PRODUCT ENGINEERING',
    title: 'App Development',
    description:
      'Seamless mobile and web applications engineered for reliability, fluid animations, and effortless scaling as your customer base grows.',
    image: '/images/service-app.jpg',
    deliverables: [
      'iOS & Android Cross-Platform Apps',
      'Real-Time Dashboards & Portals',
      'Cloud-Native Backend APIs',
      'Enterprise Security & Maintenance',
    ],
    testimonial: {
      stars: 5,
      quote:
        'Seamless cross-platform mobile app with fluid 60 FPS animations. Outstanding technical expertise and reliability.',
      author: 'Rajesh M.',
      role: 'Founder & Managing Director',
      avatar: '/images/service-app.jpg',
    },
    specs: {
      framework: 'React Native & Cloud APIs',
      latency: '9ms',
      memory: '52MB',
      version: 'v4.0.1-prod',
    },
  },
];

function ApplicationStackedCard({
  service,
  index,
  total,
  range,
  targetScale,
  progress,
  onBook,
}) {
  const containerRef = useRef(null);

  // Smooth scaling down as next cards stack over it
  const scale = useTransform(progress, range, [1, targetScale]);

  // Deck of cards rotation angles matching user preference
  const cardRotations = [-2.8, 2.1, -1.6, 1.4];
  const targetRotation = cardRotations[index % cardRotations.length];
  const rotate = useTransform(progress, [range[0], range[1]], [0, targetRotation]);

  return (
    <div
      ref={containerRef}
      className="sticky flex items-center justify-center pb-8 sm:pb-12"
      style={{
        // Incremental sticky top offsets so each card tab peeks through
        top: `calc(88px + ${index * 24}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
        }}
        className="w-full max-w-5xl rounded-3xl border-[2.5px] border-black bg-white shadow-[10px_10px_0px_#000000] transition-all hover:shadow-[14px_14px_0px_#000000] relative overflow-hidden"
      >
        {/* ================= OS APPLICATION WINDOW TITLE BAR ================= */}
        <div className="flex items-center justify-between border-b-[2.5px] border-black bg-slate-100 px-4 sm:px-6 py-3 select-none">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm transition-transform hover:scale-110 cursor-pointer" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm transition-transform hover:scale-110 cursor-pointer" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm transition-transform hover:scale-110 cursor-pointer" />
            <span className="ml-2 font-mono-tech text-[10px] sm:text-xs font-black text-slate-700 hidden sm:inline">
              {service.appId}
            </span>
          </div>

          {/* App URL / Command Route Pill */}
          <div className="flex items-center gap-1.5 rounded-lg border-2 border-black bg-white px-3 sm:px-4 py-1 font-mono-tech text-[10px] sm:text-[11px] font-bold text-slate-800 shadow-[2px_2px_0px_#000] truncate max-w-[220px] sm:max-w-xs">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-black" />
            <span className="truncate">webmission://apps/{service.number}-{service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
          </div>

          {/* Live System Status Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-emerald-600 bg-emerald-50 px-2.5 py-0.5 font-mono-tech text-[10px] font-black text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-slate-400">
              <Minus className="h-3.5 w-3.5" />
              <Maximize2 className="h-3.5 w-3.5" />
              <X className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* ================= APPLICATION SECONDARY TOOLBAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black/15 bg-slate-50/80 px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-lg border-2 border-black bg-black px-2.5 py-0.5 font-mono-tech text-[11px] font-black text-white shadow-[1.5px_1.5px_0px_#000]">
              APP {service.number}
            </span>
            <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-slate-700">
              {service.category}
            </span>
          </div>

          {/* 5.0 Star Rating Badge */}
          <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-0.5 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center gap-0.5 text-teal-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-teal-500 stroke-teal-600" />
              ))}
            </div>
            <span className="font-mono-tech text-[10px] font-black text-slate-900 ml-1">
              5.0 VERIFIED
            </span>
          </div>
        </div>

        {/* ================= APPLICATION WORKSPACE MAIN BODY ================= */}
        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* Left Column: Application Canvas Viewport & Review Toast */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">

              {/* App Viewport Container */}
              <div className="rounded-2xl border-2 border-black bg-slate-900 shadow-[4px_4px_0px_#000] overflow-hidden">
                {/* Viewport Telemetry Header */}
                <div className="flex items-center justify-between bg-black px-3.5 py-1.5 border-b border-white/20 text-white font-mono-tech text-[10px] font-bold">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-3 w-3 text-emerald-400" />
                    <span>CANVAS: 1920×1080 RETINA</span>
                  </div>
                  <span className="text-emerald-400 font-mono">60 FPS</span>
                </div>

                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950 group">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 rounded-md border border-black bg-white/95 px-2 py-0.5 font-mono-tech text-[9px] font-black uppercase text-black shadow-sm">
                    Live UI Preview
                  </div>
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* App Client Review Notification Card */}
              <div className="rounded-2xl border-2 border-black bg-slate-50 p-4 shadow-[3px_3px_0px_#000] relative">
                <div className="flex items-center gap-1 font-mono-tech text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  <Activity className="h-3 w-3 text-teal-600" />
                  <span>CLIENT VERIFICATION LOG</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-snug">
                  &ldquo;{service.testimonial.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2.5 pt-2 border-t border-black/10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black bg-black text-white font-black text-xs">
                    {service.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display text-xs font-black text-black">
                      {service.testimonial.author}
                    </div>
                    <div className="font-mono-tech text-[9px] text-slate-600 font-medium">
                      {service.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: App Control Deck & Capabilities */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Title & App Version */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                    <TextStaggerHover text={service.title} dimmed={false} />
                  </h3>
                  <span className="font-mono-tech text-[10px] font-bold text-slate-500 bg-slate-100 border border-black/20 rounded px-2 py-0.5">
                    {service.specs.version}
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                  {service.description}
                </p>

                {/* App Capabilities Modules */}
                <div className="mt-6">
                  <div className="flex items-center justify-between font-mono-tech text-[11px] font-black uppercase text-black mb-3 border-b border-black/10 pb-1.5">
                    <span>ENABLED APPLICATION MODULES</span>
                    <span className="text-emerald-700 text-[10px]">ALL ACTIVE (4/4)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-2 rounded-xl border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black shadow-[2px_2px_0px_#000] hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                        <span className="font-mono-tech text-[9px] font-bold uppercase bg-slate-100 border border-black/20 rounded px-1.5 py-0.5 text-slate-600 shrink-0">
                          ON
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Action Console & Telemetry Footer */}
              <div className="mt-8 pt-5 border-t-2 border-black/15 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <LiquidMetalButton
                    label="Launch Application"
                    onClick={() => onBook?.(service.title)}
                  />
                  <button
                    type="button"
                    onClick={() => onBook?.(service.title)}
                    className="btn-bento-black py-2.5 px-4 text-xs flex items-center gap-2"
                  >
                    <span>Direct Inquiry</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* System Specs Status Telemetry */}
                <div className="flex items-center gap-3 font-mono-tech text-[10px] font-bold text-slate-600 bg-slate-100 border border-black/15 rounded-lg px-3 py-1.5 shadow-[1px_1px_0px_#000]">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-slate-700" />
                    {service.specs.latency}
                  </span>
                  <span>•</span>
                  <span>{service.specs.memory}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-black">99.9% UPTIME</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function ServicesSection({ onBookService }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="services" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 shadow-[2px_2px_0px_#000] mb-4">
            <Layers className="h-4 w-4 text-black" />
            <span className="font-mono-tech text-xs font-black uppercase text-black">
              Application Workspaces • Stacked Deck
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-[1.05]">
            <TextStaggerHover text="MODERN APPLICATION" dimmed={false} />
            <span className="block mt-1 sm:mt-2 text-slate-800">
              Workspaces Built for High Growth
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Scroll down to explore our dedicated application modules stacking layer upon layer like native OS windows, engineered for high-performance scale and seamless client conversion.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div ref={containerRef} className="relative pb-24">
          {CARDS_DATA.map((service, index) => {
            const targetScale = 1 - (CARDS_DATA.length - index) * 0.04;
            const range = [index * 0.25, 1];

            return (
              <ApplicationStackedCard
                key={service.number}
                service={service}
                index={index}
                total={CARDS_DATA.length}
                range={range}
                targetScale={targetScale}
                progress={scrollYProgress}
                onBook={onBookService}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
