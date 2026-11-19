import React from 'react';

/**
 * Global SVG Gradient Definition for 24K Gold Holographic HUD Icons
 * Can be mounted once or safely rendered in components.
 */
export function GoldSvgDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
      <defs>
        {/* 24K Metallic Gold Gradient for Primary Icon Lines (Web Mission Logo Palette) */}
        <linearGradient id="wm-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffeca7" />
          <stop offset="25%" stopColor="#fce89f" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="85%" stopColor="#a47c3f" />
          <stop offset="100%" stopColor="#936a32" />
        </linearGradient>

        {/* Hyper-Luminous Starlight Gradient for Active / Hover States */}
        <linearGradient id="wm-gold-bright-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffeca7" />
          <stop offset="70%" stopColor="#e2b755" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const SIZE_CONFIGS = {
  xs: {
    pod: 'h-7 w-7 rounded-lg',
    icon: 'h-3.5 w-3.5',
    corners: 'h-1 w-1',
    offset: 'top-0.5 left-0.5 right-0.5 bottom-0.5',
  },
  sm: {
    pod: 'h-9 w-9 rounded-xl',
    icon: 'h-4 w-4',
    corners: 'h-1.5 w-1.5',
    offset: 'top-0.5 left-0.5 right-0.5 bottom-0.5',
  },
  md: {
    pod: 'h-12 w-12 rounded-2xl',
    icon: 'h-5 w-5',
    corners: 'h-1.5 w-1.5',
    offset: 'top-1 left-1 right-1 bottom-1',
  },
  lg: {
    pod: 'h-14 w-14 rounded-2xl',
    icon: 'h-7 w-7',
    corners: 'h-2 w-2',
    offset: 'top-1 left-1 right-1 bottom-1',
  },
  xl: {
    pod: 'h-16 w-16 rounded-3xl',
    icon: 'h-8 w-8',
    corners: 'h-2.5 w-2.5',
    offset: 'top-1.5 left-1.5 right-1.5 bottom-1.5',
  },
};

/**
 * GoldIconPod Component
 *
 * Implements the Dual-Tone Luxury + Obsidian Pod + Gold Neon Rim Light + HUD Corners aesthetic:
 * - 24K Gold Gradient stroke on primary icon lines
 * - Translucent amber/glass fill glow
 * - Soft neon bloom duplicate behind the icon
 * - Frosted Black Glass (#0a0c10/90) container with Gold Neon Rim Light
 * - 4 Precision micro HUD corner notches
 */
export default function GoldIconPod({
  icon: Icon,
  size = 'md',
  active = false,
  glow = true,
  className = '',
  iconClassName = '',
  strokeWidth = 2,
  interactive = true,
  children,
}) {
  const cfg = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border bg-[#0a0c10]/90 backdrop-blur-2xl select-none group transition-all duration-500 ${
        cfg.pod
      } ${
        active
          ? 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_0_20px_rgba(245,158,11,0.18)] scale-105'
          : 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.30),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_0_15px_rgba(245,158,11,0.08)]'
      } ${
        interactive
          ? 'hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.55),inset_0_0_20px_rgba(245,158,11,0.2)] hover:scale-105'
          : ''
      } ${className}`}
    >
      {/* Ambient Translucent Amber Stardust Core */}
      {glow && (
        <div
          className={`absolute inset-1.5 rounded-xl bg-amber-500/15 blur-sm pointer-events-none transition-all duration-500 ${
            active ? 'bg-amber-400/30 blur-md' : 'group-hover:bg-amber-400/25 group-hover:blur-md'
          }`}
        />
      )}

      {/* Render the Icon with Dual-Tone Layering */}
      {Icon && (
        <div className="relative flex items-center justify-center">
          {/* Layer 1: Blurred Neon Glow Starlight Layer */}
          <Icon
            className={`absolute inset-0 m-auto ${cfg.icon} blur-[3px] opacity-65 text-amber-400 pointer-events-none transition-transform duration-500 ${
              interactive ? 'group-hover:scale-110 group-hover:opacity-90' : ''
            } ${iconClassName}`}
            strokeWidth={strokeWidth}
            aria-hidden="true"
          />

          {/* Layer 2: Crisp 24K Gold Gradient + Translucent Amber Glass Core */}
          <Icon
            stroke="url(#wm-gold-grad)"
            fill="rgba(245, 158, 11, 0.20)"
            strokeWidth={strokeWidth}
            className={`relative z-10 ${cfg.icon} drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-500 ${
              interactive ? 'group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.85)]' : ''
            } ${iconClassName}`}
          />
        </div>
      )}

      {/* Custom children if any */}
      {children}
    </div>
  );
}

