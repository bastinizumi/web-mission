import React from 'react';
import { motion } from 'framer-motion';

/**
 * RocketGrowthCard — 3D Rocket Launching over Rising Bar Chart Steps
 * Directly matching Card 5 (Right Bottom) in the user's uploaded reference image.
 */
export default function RocketGrowthCard() {
  return (
    <div className="relative h-full w-full min-h-[160px] flex items-end justify-center pb-2 select-none overflow-hidden">
      {/* 4 Rising Growth Bar Chart Steps - Matching Screenshot */}
      <div className="flex items-end gap-1.5 z-0">
        <div className="w-5 h-8 rounded-t-md bg-gradient-to-t from-slate-300 to-slate-200 border-2 border-black shadow-[2px_2px_0px_#000]" />
        <div className="w-5 h-13 rounded-t-md bg-gradient-to-t from-slate-300 to-slate-200 border-2 border-black shadow-[2px_2px_0px_#000]" />
        <div className="w-5 h-19 rounded-t-md bg-gradient-to-t from-slate-300 to-slate-200 border-2 border-black shadow-[2px_2px_0px_#000]" />
        <div className="w-5 h-26 rounded-t-md bg-gradient-to-t from-slate-300 to-slate-200 border-2 border-black shadow-[2px_2px_0px_#000]" />
      </div>

      {/* 3D Flying Rocket - Blasting off diagonally */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          x: [-2, 2, -2],
          rotate: [38, 42, 38],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-5 z-10 filter drop-shadow-[4px_6px_0px_rgba(0,0,0,0.85)] cursor-pointer"
        whileHover={{ scale: 1.15, rotate: 45 }}
      >
        <svg
          viewBox="0 0 80 80"
          className="h-20 w-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame Plume */}
          <motion.path
            animate={{ scaleY: [0.9, 1.25, 0.9] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            d="M26 52L22 68L34 58Z"
            fill="#F59E0B"
            stroke="#000000"
            strokeWidth="2"
          />
          <motion.path
            animate={{ scaleY: [0.8, 1.3, 0.8] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            d="M27 54L24 64L32 58Z"
            fill="#EF4444"
          />

          {/* Rocket Body */}
          <path
            d="M52 14C40 18 32 30 30 46L46 48C58 42 66 32 68 18C64 16 58 14 52 14Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Rocket Nose Cone (Red/Coral Accent) */}
          <path
            d="M60 14.5C64 15.5 67 17.5 68 18C67 22 65 26 62.5 30C58 24 55 19 60 14.5Z"
            fill="#EF4444"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Fin 1 */}
          <path
            d="M30 46L19 49L25 39C27 41 28.5 43.5 30 46Z"
            fill="#EF4444"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Fin 2 */}
          <path
            d="M46 48L49 59L41 53C43 51.5 44.5 50 46 48Z"
            fill="#EF4444"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Circular Porthole Window */}
          <circle
            cx="49"
            cy="31"
            r="5"
            fill="#38BDF8"
            stroke="#000000"
            strokeWidth="2"
          />
          <circle cx="50" cy="30" r="1.5" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Animated Smoke Puffs */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 right-14 h-3 w-3 rounded-full bg-slate-300 border border-black shadow-[1px_1px_0px_#000]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        className="absolute bottom-6 right-16 h-4 w-4 rounded-full bg-slate-300 border border-black shadow-[1px_1px_0px_#000]"
      />
    </div>
  );
}

