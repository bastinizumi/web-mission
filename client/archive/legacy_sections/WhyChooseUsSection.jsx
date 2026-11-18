import React from 'react';
import { Award, Clock, Gauge, TrendingUp, Terminal, ShieldCheck, Cpu } from 'lucide-react';

const PILLARS = [
  {
    icon: Clock,
    moduleId: 'MOD_01_SPRINT_DELIVERY',
    title: 'On-Time Delivery Engine',
    desc: 'Structured milestones with transparent sprint updates from kickoff to launch.',
    metric: '100% SPRINT DISCIPLINE',
  },
  {
    icon: Gauge,
    moduleId: 'MOD_02_CORE_VITALS',
    title: 'Fast Loading & SEO Core',
    desc: 'Performance-focused engineering crafted for Core Web Vitals and organic rankings.',
    metric: '<0.8s FCP & 99 SCORE',
  },
  {
    icon: TrendingUp,
    moduleId: 'MOD_03_ROI_ACCELERATOR',
    title: 'Measurable Results Engine',
    desc: 'Conversion-driven architecture built to accelerate continuous business growth.',
    metric: '+300% ROI AVERAGE',
  },
  {
    icon: Award,
    moduleId: 'MOD_04_MERN_ARCHITECTURE',
    title: 'Technical Excellence Stack',
    desc: 'Modern UI/UX paired with robust, scalable MERN & full-stack codebases.',
    metric: '99.9% UPTIME CLOUD',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Application Dashboard Window */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bento-card bento-card-hover bg-white/95 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-full">
              
              {/* Window Chrome Title Bar */}
              <div className="flex items-center justify-between border-b-[2px] border-black bg-slate-100 px-5 py-3 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="ml-2 font-mono-tech text-[10px] font-bold text-slate-500 hidden sm:inline">
                    enterprise-agency.app
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-0.5 font-mono-tech text-[10px] font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
                  <Terminal className="h-3 w-3 text-black" />
                  <span>webmission://system/why-us</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono-tech font-black text-emerald-800 bg-emerald-50 border border-emerald-300 rounded px-2 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Main Window Workspace Content */}
              <div className="p-6 sm:p-9">
                <span className="font-mono-tech text-xs font-black tracking-wider text-black uppercase bg-slate-100 border-2 border-black rounded-full px-3.5 py-1 shadow-[2px_2px_0px_#000] inline-block mb-4">
                  Why Choose Us • Core Operating System
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.08]">
                  Grow Your Online Presence with Web Mission
                </h2>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
                  <span className="font-black text-black">Since 2017</span>, Web Mission has been empowering businesses in{' '}
                  <span className="font-black text-black">Chennai and beyond</span> with innovative web design, custom web development, and target-driven digital marketing solutions. As a trusted website development company in Chennai, we combine technical excellence, modern UI/UX design, and performance-focused strategies to build scalable platforms that deliver measurable results and accelerate continuous business growth.
                </p>

                {/* 4 Application Module Cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PILLARS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border-2 border-black bg-slate-50 p-4 sm:p-5 shadow-[3px_3px_0px_#000] hover:translate-x-1 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Mini Application Module Header */}
                          <div className="flex items-center justify-between border-b border-black/10 pb-2.5 mb-3">
                            <span className="font-mono-tech text-[9px] font-black uppercase text-slate-500">
                              {item.moduleId}
                            </span>
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                          </div>

                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000]">
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <h3 className="font-display text-sm sm:text-base font-black text-black">
                              {item.title}
                            </h3>
                          </div>

                          <p className="text-xs leading-relaxed text-slate-700 font-medium">
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-black/10 flex items-center justify-between font-mono-tech text-[9px] font-black text-emerald-800">
                          <span>BENCHMARK</span>
                          <span className="bg-emerald-100 border border-emerald-300 rounded px-1.5 py-0.5">
                            {item.metric}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Window Status Bar */}
              <div className="border-t-[2px] border-black bg-slate-100 px-5 py-2 flex items-center justify-between font-mono-tech text-[10px] font-bold text-slate-600">
                <span>SYSTEM STATUS: FULLY OPERATIONAL</span>
                <span>CHENNAI HQ • EST. 2017</span>
              </div>

            </div>
          </div>

          {/* Right Application Studio Canvas Viewport */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bento-card bento-card-hover bg-white/95 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-full">
              
              {/* Window Chrome Title Bar */}
              <div className="flex items-center justify-between border-b-[2px] border-black bg-slate-100 px-5 py-3 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="ml-2 font-mono-tech text-[10px] font-bold text-slate-700">
                    chennai-studio.app
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] font-black uppercase bg-white border border-black rounded px-2 py-0.5">
                  LIVE FEED
                </span>
              </div>

              {/* Studio Canvas Viewport */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] group">
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-black/60 px-3 py-1 font-mono-tech text-[9px] font-bold text-white/90 backdrop-blur-xs">
                    <span>HQ WORKSPACE • RETINA SENSOR</span>
                    <span className="text-emerald-400 font-black">ACTIVE</span>
                  </div>

                  <img
                    src="/images/why-agency.jpg"
                    alt="Modern architectural workspace representing Web Mission precision"
                    loading="lazy"
                    className="h-[360px] sm:h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Floating Application Toast */}
                  <div className="absolute bottom-4 left-4 right-4 bento-card p-4 bg-white/95 backdrop-blur-sm shadow-[4px_4px_0px_#000]">
                    <div className="flex items-center justify-between font-mono-tech text-[10px] font-black uppercase text-slate-600 mb-1">
                      <span>Trusted Development Company</span>
                      <span className="text-emerald-700 font-bold">VERIFIED</span>
                    </div>
                    <div className="font-display text-base font-black text-black">
                      Chennai • Scalable Digital Platforms
                    </div>
                  </div>
                </div>
              </div>

              {/* Window Footer */}
              <div className="border-t-[2px] border-black bg-slate-100 px-5 py-2 font-mono-tech text-[10px] font-bold text-slate-600 flex items-center justify-between">
                <span>LOCATION: CHENNAI, INDIA</span>
                <span>SECURITY: 256-BIT ENCRYPTION</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
