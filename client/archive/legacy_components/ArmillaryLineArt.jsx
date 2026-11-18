import React from 'react';
import { motion } from 'framer-motion';

/**
 * ArmillaryLineArt — Minimalist Line-Art Armillary Celestial Sphere
 * Matches the bottom-right illustration from media_1794553599245_3f94462e.jpg:
 * Clean black stroke lines, intersecting celestial rings, central globe & tiered pedestal.
 */
export default function ArmillaryLineArt({ className = 'h-32 w-32' }) {
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
      {/* Pedestal Base */}
      <path d="M40 108 H80" strokeWidth="2.2" />
      <path d="M44 104 H76" />
      <path d="M48 98 H72" />
      <path d="M56 86 V98 M64 86 V98" />
      <ellipse cx="60" cy="86" rx="14" ry="4" />

      {/* Outer Vertical Meridian Ring */}
      <circle cx="60" cy="48" r="36" strokeWidth="2" />

      {/* Tilted Equatorial Band */}
      <ellipse
        cx="60"
        cy="48"
        rx="36"
        ry="13"
        transform="rotate(-25 60 48)"
        strokeWidth="1.8"
      />

      {/* Polar Colure Rings */}
      <ellipse
        cx="60"
        cy="48"
        rx="14"
        ry="36"
        transform="rotate(20 60 48)"
        strokeWidth="1.6"
      />

      {/* Central Celestial Sphere */}
      <circle cx="60" cy="48" r="14" strokeWidth="1.8" />
      <ellipse cx="60" cy="48" rx="14" ry="5" />
      <line x1="60" y1="34" x2="60" y2="62" />

      {/* Axis Rod */}
      <line
        x1="35"
        y1="22"
        x2="85"
        y2="74"
        strokeWidth="2"
      />
    </motion.svg>
  );
}

