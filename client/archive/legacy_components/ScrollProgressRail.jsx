import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar
 * Top hairline progress indicator.
 * The right-side telemetry rail (percentage badge, section buttons & vertical dots)
 * has been removed as requested ("side la ithulam venam remove paniru").
 */
export default function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-black shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
    />
  );
}
