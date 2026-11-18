import React from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface WebMissionServiceSlide {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  imageUrl: string;
  deliverables: string[];
}

export const WEB_MISSION_SERVICES: WebMissionServiceSlide[] = [
  {
    id: "web-platforms",
    number: "01",
    title: "Web Platforms",
    category: "Full-Stack Engineering",
    tagline: "Modern MERN & Next.js 15 SSR Architecture",
    imageUrl: "/images/service-web.jpg",
    deliverables: ["Custom MERN Architecture", "Sub-second Core Web Vitals", "Enterprise Security"],
  },
  {
    id: "spatial-ui",
    number: "02",
    title: "3D Spatial UI",
    category: "Creative Technology",
    tagline: "GPU-Accelerated Three.js Interfaces",
    imageUrl: "/images/service-app.jpg",
    deliverables: ["Three.js WebGL Engines", "Custom GLSL Shaders", "60 FPS Kinetic Physics"],
  },
  {
    id: "uiux-design",
    number: "03",
    title: "UI/UX Design",
    category: "Experience Design",
    tagline: "Human-Centric Digital Ergonomics",
    imageUrl: "/images/service-uiux.jpg",
    deliverables: ["Figma Design Systems", "Tactile Micro-Interactions", "Mobile-First Fluidity"],
  },
  {
    id: "cloud-systems",
    number: "04",
    title: "Cloud Systems",
    category: "Cloud Architecture",
    tagline: "Distributed Real-Time Cloud Infrastructure",
    imageUrl: "/images/growth-prism.jpg",
    deliverables: ["REST & GraphQL Microservices", "Distributed Clusters", "99.9% Uptime SLA"],
  },
  {
    id: "seo-growth",
    number: "05",
    title: "SEO & Growth",
    category: "Growth Marketing",
    tagline: "High-Intent Technical Search Domination",
    imageUrl: "/images/service-marketing.jpg",
    deliverables: ["Technical Core SEO", "Conversion Funnels", "Keyword SERP Domination"],
  },
];

/**
 * WebMissionSlideshow - Flagship Kinetic Services Showcase
 * Replaces generic third-party demo code with authentic Web Mission 24K Gold & Obsidian theme.
 */
export function WebMissionSlideshow() {
  return (
    <div className="relative w-full min-h-screen bg-[#060709] text-white flex flex-col justify-center items-center py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background Gold Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 max-w-5xl w-full mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-300 font-semibold">
            Capabilities &bull; Core Flagships
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Engineered for <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Digital Supremacy</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl font-light leading-relaxed">
          Hover across our core engineering disciplines to inspect real-time architecture, interactive 3D WebGL interfaces, and high-velocity growth funnels.
        </p>
      </div>

      {/* Main Kinetic Slideshow Card */}
      <div className="relative z-10 max-w-6xl w-full bg-[#090b10]/80 border border-amber-500/20 backdrop-blur-xl rounded-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.06)]">
        <HoverSlider className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive Service Titles */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              {WEB_MISSION_SERVICES.map((slide, index) => (
                <div
                  key={slide.id}
                  className="group relative p-4 rounded-xl transition-all duration-300 hover:bg-amber-400/[0.04] border border-transparent hover:border-amber-400/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono font-semibold text-amber-400/70 group-hover:text-amber-300 transition-colors">
                        {slide.number} //
                      </span>
                      <TextStaggerHover
                        index={index}
                        className="cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-slate-200 transition-colors"
                        text={slide.title}
                      />
                    </div>
                    <ArrowRight className="w-5 h-5 text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <p className="text-xs text-slate-400 mt-1 font-mono tracking-wide">
                    {slide.tagline}
                  </p>

                  {/* Micro Deliverables */}
                  <div className="flex flex-wrap gap-2 mt-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    {slide.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 text-slate-300"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-amber-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Visual Showcase Frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-amber-400/30 bg-[#040507] p-2 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
                <HoverSliderImageWrap className="rounded-lg overflow-hidden aspect-[4/3] w-full bg-black/60 relative">
                  {WEB_MISSION_SERVICES.map((slide, index) => (
                    <div key={slide.id} className="relative w-full h-full">
                      <HoverSliderImage
                        index={index}
                        imageUrl={slide.imageUrl}
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                      {/* Image Bottom Glass Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                            {slide.category}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {slide.title}
                          </h4>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono text-amber-300">
                          {slide.number} / 05
                        </div>
                      </div>
                    </div>
                  ))}
                </HoverSliderImageWrap>
              </div>
            </div>
          </div>
        </HoverSlider>
      </div>

      {/* Secondary Demo Section: Liquid Metal Actions */}
      <div className="relative z-10 max-w-6xl w-full mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-amber-500/[0.03] border border-amber-500/15">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            Micro-Interaction Instruments
          </span>
          <h3 className="text-lg font-semibold text-white">
            Liquid Metal Shader Button Controls
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time GLSL fragment distortion with tactile physics on click and hover.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <LiquidMetalButton label="Launch Mission" textColor="#fbbf24" />
          <LiquidMetalButton viewMode="icon" textColor="#fbbf24" />
        </div>
      </div>
    </div>
  );
}

// Backward compatibility alias for original demo imports
export const HoverSliderDemo = WebMissionSlideshow;
export const LiquidMetalButtonDemo = () => (
  <div className="flex flex-col items-center justify-center gap-8 p-8 bg-[#060709] rounded-xl border border-amber-500/20">
    <div className="flex items-center gap-8">
      <LiquidMetalButton label="Launch Mission" textColor="#fbbf24" />
      <LiquidMetalButton viewMode="icon" textColor="#fbbf24" />
    </div>
  </div>
);

export default WebMissionSlideshow;
