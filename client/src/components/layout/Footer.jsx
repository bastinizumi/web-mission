import React from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  ArrowUp,
} from 'lucide-react';
import GoldIconPod from '../common/GoldIconPod';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-10 pb-14 px-3 sm:px-10 lg:px-16 overflow-hidden select-none">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* ================= PREMIUM FLOATING PILL CONTAINER (OBSIDIAN & GOLD) ================= */}
        <div className="rounded-2xl sm:rounded-full border border-amber-500/30 bg-[#090b10]/90 px-4 sm:px-10 py-5 sm:py-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          
          {/* Left: Gold Web Mission Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-amber-400/50 bg-[#0a0c10]/95 p-1 text-white shadow-[0_0_20px_rgba(245,158,11,0.35),inset_0_0_12px_rgba(245,158,11,0.15)] shrink-0">
              {/* Official 24K Gold Diamond Crest */}
              <img
                src="/images/web-mission-emblem-transparent.png"
                alt="Web Mission Logo"
                className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]"
              />
              <span className="absolute -bottom-0.5 right-1 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#ffd700]" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-base font-black tracking-widest text-white uppercase leading-tight">
                WEB MISSION
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-amber-400 font-bold uppercase whitespace-nowrap">
                Empowering Businesses Online • Chennai
              </span>
            </div>
          </div>

          {/* Center: Main Navigation Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Social Media Icons + Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-r border-slate-800 pr-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="cursor-pointer"
                  >
                    <GoldIconPod
                      icon={Icon}
                      size="xs"
                      hudCorners={false}
                      className="!h-8 !w-8 !rounded-lg border-amber-500/25 bg-[#10131c] hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    />
                  </a>
                );
              })}
            </div>

            {/* Back to Top Button */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 1 }}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all shadow-sm cursor-pointer"
            >
              <ArrowUp className="h-4 w-4 stroke-[2.5]" />
            </motion.button>
          </div>

        </div>

        {/* ================= SUB-FOOTER TELEMETRY STRIP ================= */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 font-mono text-[10px] text-slate-400 font-medium">
          <div>
            &copy; {new Date().getFullYear()} WEB MISSION. All rights reserved. Pioneering since 2017.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>3D Morphing Engine Active</span>
            </span>
            <span>•</span>
            <span>Chennai, Tamil Nadu, IN</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
