import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ArmillaryLineArt from './ArmillaryLineArt';
import RocketStepsLineArt from './RocketStepsLineArt';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { TextStaggerHover } from '@/components/ui/animated-slideshow';

/**
 * HeroSection — Swiss Editorial Minimalist Layout
 * Exact match to uploaded reference image media_1794553599245_3f94462e.jpg:
 * - Left: Giant High-Contrast Modern Serif Typography:
 *     INNOVATIVE
 *     DESIGN FOR
 *     ONLINE
 *     SUCCESS
 * - Right Top:
 *     GET STARTED
 *     Minimalist Editorial & Typographic Style Swiss Design
 *     [ GET STARTED ] Button
 * - Right Bottom:
 *     Minimalist Line-Art Armillary Celestial Sphere + Rocket Growth Steps
 * - Running Black Dots 3D Background preserved as requested ("background venum remove pana venam")
 */
export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Giant Swiss Editorial Serif Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-serif font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] leading-[0.98] tracking-tight text-black select-none">
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

            <p className="mt-8 text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-lg">
              We are a specialized web development &amp; digital marketing agency based in Chennai. We deliver tailored solutions to skyrocket your business online.
            </p>
          </div>

          {/* Right Column: Editorial Controls, Button & Minimalist Line Art */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end text-left lg:text-right gap-12 lg:gap-16">
            
            {/* Top Block: GET STARTED Title, Subtitle & Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start lg:items-end gap-3 max-w-sm"
            >
              <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight uppercase">
                GET STARTED
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-600 font-semibold tracking-wide">
                Minimalist Editorial &amp; Typographic Style Swiss Design
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <LiquidMetalButton
                  label="GET STARTED"
                  onClick={scrollToContact}
                />
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="rounded-lg border-2 border-black bg-white px-6 py-2.5 font-display text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  GET STARTED
                </button>
              </div>
            </motion.div>

            {/* Bottom Block: Minimalist Line Art Illustrations matching screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-end justify-end gap-6 sm:gap-8 pt-4"
            >
              {/* Line Art: Armillary Sphere */}
              <div className="flex flex-col items-center group cursor-pointer">
                <ArmillaryLineArt className="h-28 w-28 sm:h-36 sm:w-36 transition-transform group-hover:rotate-6" />
                <span className="font-mono-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  3D Spatial Engine
                </span>
              </div>

              {/* Line Art: Rocket Blasting Over Bar Chart Steps */}
              <div className="flex flex-col items-center group cursor-pointer">
                <RocketStepsLineArt className="h-28 w-28 sm:h-36 sm:w-36 transition-transform group-hover:-translate-y-1" />
                <span className="font-mono-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Growth Velocity
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
