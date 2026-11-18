import React from 'react';
import { motion } from 'framer-motion';

/**
 * RocketStepsLineArt — Minimalist Line-Art Rocket & Stepped Growth Bar Chart
 * Matches the bottom-right illustration from media_1794553599245_3f94462e.jpg:
 * Ascending growth bar chart steps with a stylized rocket taking off at 45 degrees.
 */
export default function RocketStepsLineArt({ className = 'h-32 w-32' }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`${className} text-black stroke-black fill-none select-none`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Stepped Bar Chart Steps (Ascending Growth) */}
      <path d="M48 108 H104" strokeWidth="2.2" />
      
      {/* Bar 1 (Shortest) */}
      <rect x="52" y="96" width="10" height="12" rx="3" strokeWidth="1.8" />
      {/* Bar 2 */}
      <rect x="65" y="86" width="10" height="22" rx="3" strokeWidth="1.8" />
      {/* Bar 3 */}
      <rect x="78" y="74" width="10" height="34" rx="3" strokeWidth="1.8" />
      {/* Bar 4 (Tallest) */}
      <rect x="91" y="60" width="10" height="48" rx="3" strokeWidth="1.8" />

      {/* Internal Hatch Lines on Bars */}
      <line x1="96" y1="68" x2="96" y2="100" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="83" y1="80" x2="83" y2="100" strokeWidth="1" strokeDasharray="2 2" />

      {/* Rocket Group — Angled at 45° */}
      <g transform="translate(14, 0)">
        {/* Rocket Body */}
        <path
          d="M74 18 C78 30 74 44 64 54 C54 64 40 68 28 64 C24 52 28 38 38 28 C48 18 62 14 74 18 Z"
          strokeWidth="2"
        />

        {/* Porthole Window */}
        <circle cx="53" cy="39" r="6" strokeWidth="1.8" />

        {/* Top/Side Fins */}
        <path d="M68 47 L82 54 L72 61" strokeWidth="1.8" />
        <path d="M45 24 L52 10 L59 20" strokeWidth="1.8" />

        {/* Tail Fin */}
        <path d="M33 59 L22 70 L35 70" strokeWidth="1.8" />

        {/* Exhaust Flame & Smoke Plume */}
        <path
          d="M26 67 C20 72 24 80 18 86 C24 84 28 90 34 82 C32 78 36 74 32 68"
          strokeWidth="1.8"
        />
        <circle cx="28" cy="80" r="1.5" fill="black" />
        <circle cx="20" cy="76" r="1.5" fill="black" />
      </g>
    </motion.svg>
  );
}

