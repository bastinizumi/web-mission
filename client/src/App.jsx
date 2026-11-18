import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MorphingParticleEngine from './components/3d/MorphingParticleEngine';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/HeroSection';
import TechMarquee from './components/common/TechMarquee';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/layout/Footer';
import { GoldSvgDefs } from './components/common/GoldIconPod';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Smooth kinetic scrolling via Lenis synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060709] text-white font-sans selection:bg-amber-400 selection:text-black overflow-x-clip">
      {/* 24K Gold Holographic HUD SVG Defs */}
      <GoldSvgDefs />

      {/* 3D Morphing Sparkle Particle Engine (Transforms across 5 shapes on scroll) */}
      <MorphingParticleEngine />

      {/* Luxury Obsidian & Gold Navbar */}
      <Navbar />

      {/* Main Agency Experience */}
      <main className="relative z-10">
        {/* 01: Hero — 3D Shape 01: Spatial Digital Tech Core & Concentric Rings */}
        <HeroSection />

        {/* 24K Golden Tech Stack Infinite Marquee */}
        <TechMarquee />

        {/* 02: About — 3D Shape 02: Interconnected Architecture Lattice Grid */}
        <AboutSection />

        {/* 03: Services — 3D Shape 03: Layered Application Window Frames */}
        <ServicesSection />

        {/* 04: Projects — 3D Shape 04: Diamond Star & Orbiting Showcase Ring */}
        <ProjectsSection />

        {/* 05: Contact — 3D Shape 05: Spatial Frequency Signal Beacon & Ripples */}
        <ContactSection />
      </main>

      {/* 06: Floating Pill Footer */}
      <Footer />
    </div>
  );
}
