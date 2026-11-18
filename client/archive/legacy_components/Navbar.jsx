import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_ICONS = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

/**
 * Navbar with Smart Auto-Hide on Scroll
 * - When user scrolls DOWN: smoothly hides out of view (y: -120%)
 * - When user scrolls UP or returns to top: smoothly slides back in
 * - Adds frosted glass bento border when floating over page sections
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When scrolled down from top, enable frosted backdrop style
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide
        setHidden(true);
        setMobileOpen(false);
      } else if (currentScrollY < lastScrollY.current - 8 || currentScrollY <= 40) {
        // Scrolling up or at very top -> reveal
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-120%', opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'rounded-2xl border-2 border-black bg-white/95 px-5 sm:px-8 py-3 shadow-[4px_4px_0px_#000] backdrop-blur-md'
            : 'bg-transparent py-2 px-2'
        }`}
      >
        {/* Left: Geometric Diamond Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="focus:outline-none"
        >
          <BrandMark />
        </a>

        {/* Right: Clean Minimalist Nav Links & Socials */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <ul className="flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-sm lg:text-base font-semibold text-black hover:text-slate-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3.5 text-black border-l-2 border-black/20 pl-6">
            {SOCIAL_ICONS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-1 text-black hover:opacity-60 transition-opacity"
                >
                  <Icon className="h-4.5 w-4.5 stroke-[2]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000]"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mx-auto mt-2 max-w-7xl rounded-2xl border-[2.5px] border-black bg-white p-5 shadow-[6px_6px_0px_#000] md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="rounded-xl px-4 py-2 text-base font-bold text-black hover:bg-slate-100"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-around border-t-2 border-black pt-3 mt-1">
                {SOCIAL_ICONS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="p-2 text-black"
                    >
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
