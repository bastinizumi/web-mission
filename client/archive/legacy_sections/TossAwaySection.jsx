import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { TextStaggerHover } from '@/components/ui/animated-slideshow';

const BOTTLENECKS = [
  {
    id: 'outdated-designs',
    title: 'Outdated & Cluttered Designs',
    pain: 'Generic WordPress themes that make your brand look like every other competitor.',
    upgrade: 'Bespoke Swiss & 3D Spatial Systems that build immediate enterprise credibility.',
    metric: '+320% Brand Recall',
  },
  {
    id: 'scaling-bottlenecks',
    title: 'Frustrating Scaling Difficulties',
    pain: 'Lagging databases and fragile codebases that break during critical customer surges.',
    upgrade: 'High-velocity MERN architecture engineered for 99.9% uptime and cloud elasticity.',
    metric: '99.9% Cloud Uptime',
  },
  {
    id: 'zero-differentiation',
    title: 'Lack of Brand Differentiation',
    pain: 'Blending into the noise without memorable identity, forcing cutthroat price competition.',
    upgrade: 'Unforgettable brand storytelling and bespoke aesthetic commanding premium pricing.',
    metric: '4x Higher Margin',
  },
  {
    id: 'sluggish-conversion',
    title: 'Slow Load Times & Leaking Leads',
    pain: 'Losing 40%+ of visitors before page render due to bloated legacy scripts.',
    upgrade: 'Sub-second Core Web Vitals and conversion-engineered sales funnels that close deals.',
    metric: '<0.8s Load Speed',
  },
];

const INTERACTIVE_PILLS = [
  { label: 'Outdated Templates', type: 'pain', rotate: -3 },
  { label: 'Scaling Difficulties', type: 'pain', rotate: 4 },
  { label: 'Zero Brand Identity', type: 'pain', rotate: -4 },
  { label: 'High Bounce Rates', type: 'pain', rotate: 3 },
  { label: 'User Interface Design', type: 'superpower', rotate: -2 },
  { label: '3D Spatial Web', type: 'superpower', rotate: 3 },
  { label: 'MERN Full-Stack', type: 'superpower', rotate: -4 },
  { label: 'SEO Rank Dominance', type: 'superpower', rotate: 2 },
  { label: 'Custom Brand Identity', type: 'superpower', rotate: -3 },
  { label: 'Sub-Second Speeds', type: 'superpower', rotate: 4 },
];

export default function TossAwaySection() {
  const [purgedIds, setPurgedIds] = useState([]);
  const [tossedPills, setTossedPills] = useState([]);
  const [sandboxKey, setSandboxKey] = useState(0);

  const togglePurge = (id) => {
    setPurgedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const purgeAll = () => {
    setPurgedIds(BOTTLENECKS.map((b) => b.id));
    setTossedPills(INTERACTIVE_PILLS.filter((p) => p.type === 'pain').map((p) => p.label));
  };

  const resetAll = () => {
    setPurgedIds([]);
    setTossedPills([]);
    setSandboxKey((k) => k + 1);
  };

  const handlePillClick = (label) => {
    setTossedPills((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const purgedCount = purgedIds.length;
  const totalCount = BOTTLENECKS.length;

  return (
    <section id="toss-away" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 shadow-[2px_2px_0px_#000] mb-4">
            <Flame className="h-4 w-4 text-rose-600" />
            <span className="font-mono-tech text-xs font-black uppercase text-black">
              Transformation Chamber
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-[1.05]">
            <TextStaggerHover text="TIME TO TOSS AWAY" dimmed={false} />
            <span className="block mt-1 sm:mt-2 text-slate-800">
              &amp; Say Goodbye to Legacy Limits
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Eliminate the bottlenecks holding your business back. Toss old pain points into the void and unlock Web Mission&apos;s high-performance digital architecture.
          </p>


        </div>

        {/* 2-Column Transformation Engine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Left Column: Pain Points to Toss Away */}
          <div className="bento-card bento-card-hover p-6 sm:p-8 bg-white/95 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-rose-100 text-rose-800 shadow-[2px_2px_0px_#000]">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black text-black">
                      The Old Way
                    </h3>
                    <p className="font-mono-tech text-[10px] text-slate-500 font-bold uppercase">
                      Bottlenecks to Toss Away
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={purgeAll}
                  className="rounded-lg border-2 border-black bg-rose-100 px-3 py-1 font-mono-tech text-xs font-black text-rose-900 shadow-[2px_2px_0px_#000] hover:bg-rose-200 transition-colors"
                >
                  Toss All 💥
                </button>
              </div>

              <div className="space-y-4">
                {BOTTLENECKS.map((item) => {
                  const isPurged = purgedIds.includes(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        opacity: isPurged ? 0.35 : 1,
                        scale: isPurged ? 0.98 : 1,
                      }}
                      className={`rounded-2xl border-2 border-black p-4 transition-all shadow-[3px_3px_0px_#000] ${
                        isPurged
                          ? 'bg-slate-100 line-through'
                          : 'bg-rose-50/70 hover:bg-rose-100/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-base font-black text-black">
                              {item.title}
                            </span>
                            {isPurged && (
                              <span className="rounded bg-black px-1.5 py-0.2 text-[9px] font-mono-tech font-black text-white">
                                TOSS AWAY
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-slate-700 font-medium leading-relaxed">
                            {item.pain}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => togglePurge(item.id)}
                          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-transform active:scale-90 ${
                            isPurged
                              ? 'bg-slate-200 text-slate-600'
                              : 'bg-white text-rose-700 hover:bg-rose-600 hover:text-white'
                          }`}
                          aria-label={`Toss away ${item.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center justify-between text-xs font-mono-tech font-bold text-slate-600">
              <span>Click the trash icon to purge each limitation</span>
              <span>{totalCount - purgedCount} remaining</span>
            </div>
          </div>

          {/* Right Column: What You Unlock with Web Mission */}
          <div className="bento-card bento-card-hover p-6 sm:p-8 bg-white/95 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-emerald-100 text-emerald-800 shadow-[2px_2px_0px_#000]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black text-black">
                      The Web Mission Way
                    </h3>
                    <p className="font-mono-tech text-[10px] text-emerald-700 font-bold uppercase">
                      Unlocked Superpowers
                    </p>
                  </div>
                </div>

                <span className="rounded-lg border-2 border-black bg-emerald-100 px-3 py-1 font-mono-tech text-xs font-black text-emerald-900 shadow-[2px_2px_0px_#000]">
                  Modern Craft
                </span>
              </div>

              <div className="space-y-4">
                {BOTTLENECKS.map((item) => (
                  <div
                    key={`upgrade-${item.id}`}
                    className="rounded-2xl border-2 border-black bg-emerald-50/60 hover:bg-emerald-100/60 p-4 transition-all shadow-[3px_3px_0px_#000] group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                          <span className="font-display text-base font-black text-black group-hover:text-emerald-900 transition-colors">
                            {item.title.replace('Outdated & Cluttered', 'Bespoke').replace('Frustrating', 'Elastic').replace('Lack of', 'Dominant').replace('Slow Load Times &', 'Sub-Second')}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-700 font-medium leading-relaxed pl-6">
                          {item.upgrade}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-lg border border-black bg-white px-2.5 py-1 font-mono-tech text-[10px] font-black text-emerald-950 shadow-[1px_1px_0px_#000]">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center justify-between">
              <span className="font-mono-tech text-xs font-bold text-slate-700">
                Ready to upgrade your web architecture?
              </span>
              <a
                href="#contact"
                className="btn-bento-black inline-flex items-center gap-1.5 py-2 px-4 text-xs font-bold"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Physics Sandbox: Floating 3D Draggable Pills */}
        <div className="bento-card bento-card-hover p-6 sm:p-10 bg-white/95 backdrop-blur-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-black" />
            <span className="font-mono-tech text-xs font-black uppercase text-black">
              Interactive 3D Pill Sandbox — Drag, Toss, or Click to Clear
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-xl mx-auto mb-8">
            Click any pain pill to mark it tossed, or grab and fling it across the screen to feel the dynamic physical interactions.
          </p>

          <div
            key={sandboxKey}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 min-h-[160px] p-2"
          >
            {INTERACTIVE_PILLS.map((pill) => {
              const isTossed = tossedPills.includes(pill.label);
              const isPain = pill.type === 'pain';

              return (
                <motion.button
                  key={pill.label}
                  type="button"
                  drag
                  dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
                  dragElastic={0.3}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  whileTap={{ scale: 0.94 }}
                  animate={{
                    opacity: isTossed ? 0.25 : 1,
                    y: isTossed ? 25 : 0,
                    rotate: isTossed ? pill.rotate * 2 : pill.rotate,
                    scale: isTossed ? 0.9 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={() => handlePillClick(pill.label)}
                  className={`cursor-grab active:cursor-grabbing rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-display font-black transition-colors select-none border-2 border-black shadow-[3px_3px_0px_#000] ${
                    isPain
                      ? 'bg-rose-100 text-rose-950 hover:bg-rose-200'
                      : 'bg-white text-black hover:bg-slate-100'
                  } ${isTossed ? 'line-through' : ''}`}
                >
                  {pill.label}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t-2 border-black/10 flex flex-wrap items-center justify-center gap-4">
            <LiquidMetalButton
              label="Upgrade My Brand"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            {tossedPills.length > 0 && (
              <button
                type="button"
                onClick={() => setTossedPills([])}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_#000] hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Sandbox
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
