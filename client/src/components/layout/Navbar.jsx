import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import GoldIconPod from '../common/GoldIconPod';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 lg:px-16 pt-3 sm:pt-5 pointer-events-none">
      <nav className="pointer-events-auto mx-auto max-w-7xl flex items-center justify-between rounded-2xl border border-amber-500/25 bg-[#090b10]/85 px-4 sm:px-6 py-2.5 sm:py-3.5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">

        {/* Brand Mark with User's Official 24K Gold Logo */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-amber-400/50 bg-[#0a0c10]/95 p-1 shadow-[0_0_20px_rgba(245,158,11,0.35),inset_0_0_12px_rgba(245,158,11,0.15)] transition-transform group-hover:scale-105 shrink-0">
            {/* Official 24K Gold Diamond Crest */}
            <img
              src="/images/web-mission-emblem-transparent.png"
              alt="Web Mission Crest Logo"
              className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.65)] transition-transform group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#ffd700]" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-black tracking-widest text-white uppercase group-hover:text-amber-300 transition-colors leading-tight">
              WEB MISSION
            </span>
            <span className="font-mono text-[7px] sm:text-[9px] tracking-wider text-amber-400 font-bold uppercase whitespace-nowrap">
              Empowering Businesses Online
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-sans text-xs lg:text-sm font-semibold tracking-wider text-slate-300 hover:text-amber-400 transition-colors uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-5 py-2 font-mono text-xs font-black text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-950" />
            <span>Launch Vision</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Crisp High-Contrast Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/80 bg-[#0c0e14] shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all active:scale-95 hover:border-amber-300 hover:bg-amber-500/15 cursor-pointer"
        >
          {/* Ambient Gold Halo */}
          <span className="absolute -inset-0.5 rounded-xl bg-amber-500/20 blur-[4px] pointer-events-none -z-10" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center text-amber-300"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-amber-300 stroke-[2.4] drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              ) : (
                <Menu className="h-5 w-5 text-amber-300 stroke-[2.4] drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu Drawer (Obsidian Glass) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mx-auto mt-2 max-w-7xl rounded-2xl border border-amber-500/30 bg-[#0c0e14]/98 p-5 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.9)] md:hidden"
          >
            <div className="flex flex-col gap-3.5">
              {/* Mobile Drawer Brand Header */}
              <div className="flex items-center gap-3 pb-3 mb-1 border-b border-slate-800/80">
                <img
                  src="/images/web-mission-emblem-transparent.png"
                  alt="Web Mission Logo"
                  className="h-8 w-8 object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-black tracking-widest text-white uppercase">
                    WEB MISSION
                  </span>
                  <span className="font-mono text-[7.5px] tracking-wider text-amber-400 font-bold uppercase">
                    Empowering Businesses Online
                  </span>
                </div>
              </div>

              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-amber-400 py-1"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-400 py-2.5 font-mono text-xs font-black uppercase text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                Launch Vision &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
