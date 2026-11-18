import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Boxes,
  Database,
  Globe2,
  Terminal,
  Zap,
  Workflow,
} from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React 19', category: 'Frontend Engine', icon: Zap },
  { name: 'Three.js / WebGL', category: '3D Spatial Core', icon: Boxes },
  { name: 'Next.js 15', category: 'Full-Stack SSR', icon: Globe2 },
  { name: 'Node.js & Express', category: 'Cloud APIs', icon: Terminal },
  { name: 'GSAP GreenSock', category: 'Kinetic Physics', icon: Sparkles },
  { name: 'Tailwind CSS v4', category: 'Spatial Design', icon: Layers },
  { name: 'MongoDB Atlas', category: 'Distributed DB', icon: Database },
  { name: 'TypeScript', category: 'Type Safety', icon: Code2 },
  { name: 'Framer Motion', category: 'Tactile Motion', icon: Workflow },
  { name: 'REST & GraphQL', category: 'Microservices', icon: Cpu },
];

export default function TechMarquee() {
  return (
    <div className="relative z-20 w-full overflow-hidden border-y border-amber-500/20 bg-[#07090e]/90 py-3.5 sm:py-4.5 backdrop-blur-2xl">
      {/* Ambient Gold Edge Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#060709] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#060709] to-transparent" />

      {/* Marquee Track Container */}
      <div className="flex w-max items-center animate-tech-marquee hover:[animation-play-state:paused]">
        {/* Render 2 continuous sets for seamless infinite loop */}
        {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="group mx-2 sm:mx-3 flex items-center gap-2.5 sm:gap-3 rounded-xl border border-amber-500/20 bg-[#0c0e15]/85 px-3.5 sm:px-4 py-2 sm:py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/80 hover:bg-[#121520] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] select-none"
            >
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 group-hover:border-amber-400 group-hover:text-amber-300 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all">
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-white group-hover:text-amber-300 transition-colors uppercase whitespace-nowrap">
                  {item.name}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-amber-400/70 whitespace-nowrap">
                  {item.category}
                </span>
              </div>

              <span className="ml-1 sm:ml-2 h-1 w-1 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-colors shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

