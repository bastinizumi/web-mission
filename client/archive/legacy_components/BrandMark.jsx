import React from 'react';

/**
 * BrandMark — Clean Minimalist Geometric Diamond Web Mission Mark
 * Recreates the exact black & white emblem from media_1794553599245_3f94462e.jpg:
 * Geometric layered diamond with 'W' facet and clean uppercase "WEB MISSION" typography.
 */
export default function BrandMark() {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Geometric Diamond Emblem SVG */}
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 text-black fill-current transition-transform duration-300 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Faceted Diamond */}
        <path d="M20 2 L36 18 L20 38 L4 18 Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
        
        {/* Inner Chevron W Wing Facets */}
        <path d="M20 8 L30 18 L20 30 L10 18 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        
        {/* Central Geometric Core */}
        <polygon points="20,13 25,18 20,23 15,18" fill="currentColor" />
      </svg>

      {/* Clean Bold Typography */}
      <span className="font-display text-lg sm:text-xl font-black tracking-tight text-black uppercase">
        WEB MISSION
      </span>
    </div>
  );
}
