import React from 'react';
import { Compass, Cpu, Sparkles, ArrowRight, Terminal, Monitor } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Application Studio Showcase Window */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bento-card bento-card-hover bg-white/95 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-full">
              
              {/* Window Chrome Title Bar */}
              <div className="flex items-center justify-between border-b-[2px] border-black bg-slate-100 px-5 py-3 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="ml-2 font-mono-tech text-[10px] font-bold text-slate-600 hidden sm:inline">
                    engineering-studio.app
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-0.5 font-mono-tech text-[10px] font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
                  <Terminal className="h-3 w-3 text-black" />
                  <span>webmission://workspace/studio</span>
                </div>

                <span className="font-mono-tech text-[10px] font-black uppercase bg-emerald-100 border border-emerald-400 text-emerald-800 rounded px-2 py-0.5">
                  ACTIVE
                </span>
              </div>

              {/* Application Canvas Viewport */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] group">
                  <div className="flex items-center justify-between bg-black px-3.5 py-1.5 text-white font-mono-tech text-[9px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Monitor className="h-3 w-3 text-emerald-400" />
                      <span>STUDIO CANVAS • FULL-STACK LAB</span>
                    </div>
                    <span className="text-emerald-400 font-mono">60 FPS</span>
                  </div>

                  <img
                    src="/images/about-craft.jpg"
                    alt="Web Mission full-stack engineering studio"
                    loading="lazy"
                    className="h-[340px] sm:h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Offset Application Stat Notification Toast */}
                  <div className="absolute -bottom-2 right-4 sm:right-6 bento-card p-4 sm:p-5 max-w-[260px] z-10 bg-white/95 backdrop-blur-sm shadow-[4px_4px_0px_#000]">
                    <div className="flex items-center gap-2 font-mono-tech text-xs font-black uppercase text-black">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Since 2017
                    </div>
                    <div className="mt-1 font-display text-base sm:text-lg font-black text-black">
                      End-to-End Solutions
                    </div>
                    <p className="mt-1 text-xs text-slate-700 font-semibold">
                      Empowering businesses across Chennai &amp; global markets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Window Status Footer */}
              <div className="border-t-[2px] border-black bg-slate-100 px-5 py-2 font-mono-tech text-[10px] font-bold text-slate-600 flex items-center justify-between">
                <span>STACK: REACT • NODE.JS • TAILWIND</span>
                <span>ENGINE: THREE.JS WEBGL</span>
              </div>

            </div>
          </div>

          {/* Right Narrative Application Window */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bento-card bento-card-hover bg-white/95 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-full">
              
              {/* Window Chrome Title Bar */}
              <div className="flex items-center justify-between border-b-[2px] border-black bg-slate-100 px-5 py-3 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="ml-2 font-mono-tech text-[10px] font-bold text-slate-600 hidden sm:inline">
                    agency-manifesto.app
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-0.5 font-mono-tech text-[10px] font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
                  <Terminal className="h-3 w-3 text-black" />
                  <span>webmission://system/about</span>
                </div>

                <span className="font-mono-tech text-[10px] font-black uppercase bg-white border border-black rounded px-2 py-0.5">
                  v4.2.0
                </span>
              </div>

              {/* Main Content Workspace */}
              <div className="p-6 sm:p-9 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-slate-100 px-3.5 py-1 mb-4 shadow-[2px_2px_0px_#000]">
                    <Compass className="h-4 w-4 text-black" />
                    <span className="font-mono-tech text-xs font-bold tracking-wider text-black uppercase">
                      About Web Mission
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.08]">
                    Explore Our Services And Boost Your Online Presence
                  </h2>

                  <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
                    <span className="font-black text-black">Since 2017</span>, Web Mission has been a leading{' '}
                    <span className="font-black text-black">
                      web design, development, and digital marketing agency in Chennai
                    </span>
                    . We offer affordable and comprehensive website solutions with an innovative and
                    quality-driven approach, combining creativity with technology to deliver impactful digital experiences.
                  </p>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                    We provide <span className="font-bold text-black">End-to-End Digital Solutions</span> tailored for businesses in Chennai and beyond, combining technical expertise with deep digital knowledge to help businesses grow and succeed.
                  </p>

                  {/* 2 Application Sub-Module Cards */}
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border-2 border-black bg-slate-50 p-4 shadow-[3px_3px_0px_#000] hover:translate-x-0.5 transition-transform">
                      <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-2 font-mono-tech text-[9px] font-bold text-slate-500">
                        <span>APP_CORE: 01</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-black" />
                        <h3 className="font-display text-sm font-black text-black">
                          Engineering + Design
                        </h3>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-700 font-medium">
                        Modern MERN applications, responsive UI systems, and fast load performance.
                      </p>
                    </div>

                    <div className="rounded-xl border-2 border-black bg-slate-50 p-4 shadow-[3px_3px_0px_#000] hover:translate-x-0.5 transition-transform">
                      <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-2 font-mono-tech text-[9px] font-bold text-slate-500">
                        <span>APP_CORE: 02</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-black" />
                        <h3 className="font-display text-sm font-black text-black">
                          Result-Driven Strategy
                        </h3>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-700 font-medium">
                        SEO-ready architecture and targeted campaigns crafted for measurable ROI.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-black/10 flex items-center justify-between">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-bento-black inline-flex items-center gap-2.5 py-2.5 px-5 text-xs font-black uppercase tracking-wider"
                  >
                    <span>Launch Projects View</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <span className="font-mono-tech text-[10px] font-bold text-slate-500">
                    STATUS: READY
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
