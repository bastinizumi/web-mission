import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * SpatialCard3D - Luxury 24K Gold Interactive 3D Card
 * Features:
 * 1. Cursor-tracking 3D perspective rotation (RotateX & RotateY)
 * 2. Scroll velocity inertia tilt (reacts to mouse wheel & page scroll)
 * 3. Dynamic 24K gold holographic glare reflection
 * 4. Zero content obscuring: Frosted Obsidian glass keeps text 100% readable & sharp
 */
export default function SpatialCard3D({
  children,
  className = '',
  maxTilt = 8,
  tiltDirection = 'center', // 'left' | 'right' | 'center'
  glowColor = 'rgba(245, 158, 11, 0.22)',
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid tactile reaction without jitter
  const springConfig = { damping: 22, stiffness: 260, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Scroll velocity tilt motion value
  const scrollVelocityY = useMotionValue(0);
  const smoothScrollVelocity = useSpring(scrollVelocityY, { damping: 25, stiffness: 200, mass: 0.8 });

  // Map mouse position to 3D rotation angles
  const rotateXMouse = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateYMouse = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Map scroll velocity to subtle dynamic tilt
  const rotateXScroll = useTransform(smoothScrollVelocity, [-15, 15], [-4, 4]);
  const rotateZScroll = useTransform(
    smoothScrollVelocity,
    [-15, 15],
    tiltDirection === 'left' ? [2, -2] : tiltDirection === 'right' ? [-2, 2] : [0, 0]
  );

  // Combined rotation
  const rotateX = useTransform([rotateXMouse, rotateXScroll], ([mX, sX]) => mX + sX);
  const rotateY = rotateYMouse;
  const rotateZ = rotateZScroll;

  // Glare position on the card surface
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      // Gracefully bypass 3D mouse tilt on mobile devices for smooth touch scrolling
      if (typeof window !== 'undefined' && window.innerWidth < 768) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);

      setGlarePos({
        x: x * 100,
        y: y * 100,
        opacity: 0.35,
      });
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Listen to Lenis scroll velocity or window scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Clamp velocity to avoid extreme tilts
      const clampedDelta = Math.max(-12, Math.min(12, delta * 0.4));
      scrollVelocityY.set(clampedDelta);
    };

    // Check if Lenis is attached to window
    if (window.__lenis) {
      const lenisHandler = (e) => {
        const vel = Math.max(-15, Math.min(15, (e.velocity || 0) * 0.6));
        scrollVelocityY.set(vel);
      };
      window.__lenis.on('scroll', lenisHandler);

      return () => {
        window.__lenis?.off('scroll', lenisHandler);
      };
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      // Gradually decay scroll velocity back to zero
      const decay = () => {
        const current = scrollVelocityY.get();
        if (Math.abs(current) > 0.05) {
          scrollVelocityY.set(current * 0.88);
        } else if (current !== 0) {
          scrollVelocityY.set(0);
        }
        rafId = requestAnimationFrame(decay);
      };
      rafId = requestAnimationFrame(decay);

      return () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
      };
    }
  }, [scrollVelocityY]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: '1100px' }}
      className="group/spatial relative h-full w-full select-none"
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.018 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`relative h-full w-full overflow-hidden rounded-3xl border border-amber-500/20 bg-[#0a0c10]/85 p-7 sm:p-8 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] ${className}`}
      >
        {/* Top Metallic 24K Gold Highlight Sheen Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover/spatial:opacity-100 transition-opacity duration-500" />

        {/* Dynamic 24K Gold Holographic Glare Follower (tracks cursor in 3D) */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 65%)`,
          }}
        />

        {/* Ambient Corner Reflection */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl group-hover/spatial:bg-amber-400/20 transition-all duration-500" />

        {/* Content Wrapper with 3D Depth Layering (Text subtly floats above the card plane, completely sharp & readable) */}
        <div
          style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
          className="relative z-10 h-full w-full flex flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
