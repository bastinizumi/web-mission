import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import LiveWaveformMonitor from './LiveWaveformMonitor';
import ThreeArmillarySphere from './ThreeArmillarySphere';
import RocketGrowthCard from './RocketGrowthCard';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { TextStaggerHover } from '@/components/ui/animated-slideshow';

/**
 * HeroBentoSection — 5-Card Neubrutalist 3D Bento Grid
 * Exact reproduction of the user's uploaded reference image layout:
 * - Card 1 (Large Left): "INNOVATIVE DESIGN FOR ONLINE SUCCESS"
 * - Card 2 (Center Top): Live undulating multi-harmonic sine waveform monitor
 * - Card 3 (Right Top): Live 3D Three.js Armillary celestial gyroscope rings
 * - Card 4 (Center Bottom): "GET STARTED" title + solid black action button
 * - Card 5 (Right Bottom): 3D Rocket blasting off over rising bar chart steps
 */
export default function HeroBentoSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8 bg-[#ebeef2]"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* Card 1: Large Left Box — "INNOVATIVE DESIGN FOR ONLINE SUCCESS" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-6 bento-card bento-card-hover p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-slate-100 px-3.5 py-1 mb-6 shadow-[2px_2px_0px_#000]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-black">
                  Digital Agency • Since 2017
                </span>
              </div>

              {/* Exact Giant Bold Typography from Reference Image with Interactive Kinetic Stagger Hover */}
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[4.75rem] leading-[1.02] tracking-tighter text-black select-none">
                <span className="block">
                  <TextStaggerHover text="INNOVATIVE" dimmed={false} />
                </span>
                <span className="block mt-1 sm:mt-2">
                  <TextStaggerHover text="DESIGN FOR" dimmed={false} />
                </span>
                <span className="block mt-1 sm:mt-2">
                  <TextStaggerHover text="ONLINE" dimmed={false} />
                </span>
                <span className="block mt-1 sm:mt-2">
                  <TextStaggerHover text="SUCCESS" dimmed={false} />
                </span>
              </h1>
            </div>

            <p className="mt-8 text-base sm:text-lg text-slate-700 font-semibold leading-relaxed max-w-lg">
              We are a specialized web development &amp; digital marketing agency based in Chennai. We deliver tailored solutions to skyrocket your business online.
            </p>
          </motion.div>

          {/* Right Bento Grid (4 Cards: 2x2 layout) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* Card 2: Center Top — Live Sine Waveform Audio/Data Monitor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bento-card bento-card-hover p-3.5 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between pb-2 px-1">
                <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-slate-800">
                  Real-Time Core
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border-2 border-black">
                <LiveWaveformMonitor />
              </div>
            </motion.div>

            {/* Card 3: Right Top — Live 3D Three.js Armillary Celestial Gyroscope Rings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="bento-card bento-card-hover p-4 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-slate-800">
                  3D Spatial Engine
                </span>
                <span className="font-mono-tech text-[10px] text-slate-500">
                  60 FPS
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <ThreeArmillarySphere />
              </div>
            </motion.div>

            {/* Card 4: Center Bottom — "GET STARTED" with 3D Liquid Metal Shader Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="bento-card bento-card-hover p-6 sm:p-7 flex flex-col items-center justify-center text-center gap-4"
            >
              <h2 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight">
                GET STARTED
              </h2>

              <div className="flex items-center justify-center gap-3">
                <LiquidMetalButton
                  label="GET STARTED"
                  onClick={scrollToContact}
                />
                <LiquidMetalButton
                  viewMode="icon"
                  onClick={scrollToContact}
                />
              </div>

              <span className="font-mono-tech text-[11px] text-slate-500 font-semibold">
                Instant Free Consultation
              </span>
            </motion.div>

            {/* Card 5: Right Bottom — 3D Rocket taking off over growth steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="bento-card bento-card-hover p-4 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-slate-800">
                  Growth Velocity
                </span>
                <span className="font-mono-tech text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded border border-black">
                  +340%
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <RocketGrowthCard />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

