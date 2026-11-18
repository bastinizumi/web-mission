import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MARQUEE_ITEMS = [
  'DIGITAL MARKETING',
  'WEB DEVELOPMENT',
  'SEO OPTIMIZATION',
  'UI/UX DESIGN',
  'APP DEVELOPMENT',
  'E-COMMERCE SOLUTIONS',
  '3D BRANDING',
];

export default function ServicesMarqueeSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rowOneX = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border-y-[2.5px] border-black bg-white/95 py-5 select-none shadow-[0px_4px_0px_#000] backdrop-blur-sm"
    >
      <motion.div
        style={{ x: rowOneX }}
        className="flex w-max items-center gap-8 whitespace-nowrap"
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={`m-${idx}`} className="flex items-center gap-8">
            <span className="font-display text-lg sm:text-2xl font-black tracking-tight text-black">
              {item}
            </span>
            <span className="h-3 w-3 rounded-full bg-black shadow-[1px_1px_0px_#000]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
