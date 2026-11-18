import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Activity, Layers, Disc, Radio } from 'lucide-react';
import GoldIconPod from '../common/GoldIconPod';

const NUM_PARTICLES = 6000;

export const SHAPES_DATA = [
  {
    id: 0,
    name: 'Spatial Digital Core',
    target: '#home',
    section: 'HERO',
    icon: Disc,
    desc: 'Central tech sphere with triple gyroscopic rings',
  },
  {
    id: 1,
    name: 'Architecture Neural Lattice',
    target: '#about',
    section: 'ABOUT',
    icon: Activity,
    desc: 'Interconnected 3D grid symbolizing engineering foundation',
  },
  {
    id: 2,
    name: 'Layered App Viewports',
    target: '#services',
    section: 'SERVICES',
    icon: Layers,
    desc: 'Stacked digital product windows and interface planes',
  },
  {
    id: 3,
    name: 'Diamond Showcase Star',
    target: '#projects',
    section: 'PROJECTS',
    icon: Sparkles,
    desc: 'Faceted octahedron gem with floating orbital showcase ring',
  },
  {
    id: 4,
    name: 'Frequency Signal Beacon',
    target: '#contact',
    section: 'CONTACT',
    icon: Radio,
    desc: 'Pulsing concentric wave ripple emitter for communications',
  },
];

/**
 * Generate a luminous glowing circular sparkle texture dynamically
 */
function createSparkleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Diamond white core
  gradient.addColorStop(0.2, 'rgba(251, 191, 36, 0.95)');  // 24K Brilliant Gold
  gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.6)');   // Luminous Amber Glow
  gradient.addColorStop(0.75, 'rgba(217, 119, 6, 0.25)');  // Deep Metallic Gold
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');            // Transparent falloff

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural 3D Shape Target Generator with vibrant 24K gold palette
 */
function generateShapes() {
  const shape0 = new Float32Array(NUM_PARTICLES * 3); // Core & Rings
  const shape1 = new Float32Array(NUM_PARTICLES * 3); // Neural Lattice
  const shape2 = new Float32Array(NUM_PARTICLES * 3); // App Viewports
  const shape3 = new Float32Array(NUM_PARTICLES * 3); // Diamond Star
  const shape4 = new Float32Array(NUM_PARTICLES * 3); // Signal Beacon

  const colors = new Float32Array(NUM_PARTICLES * 3);

  // Palette: Radiant 24K Gold (#fbbf24), Imperial Gold (#f59e0b), Diamond Starlight (#ffffff), Warm Amber (#d97706)
  const colBrightGold = new THREE.Color('#fbbf24');
  const colImperialGold = new THREE.Color('#f59e0b');
  const colDiamondWhite = new THREE.Color('#ffffff');
  const colWarmBronze = new THREE.Color('#d97706');

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const i3 = i * 3;

    // Palette distribution: 50% 24K Gold, 25% Imperial Gold, 15% Diamond White, 10% Warm Bronze
    const rand = Math.random();
    let col = colBrightGold;
    if (rand > 0.85) col = colDiamondWhite;
    else if (rand > 0.6) col = colImperialGold;
    else if (rand > 0.5) col = colWarmBronze;

    colors[i3] = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;

    // ================= SHAPE 0: SPATIAL DIGITAL CORE & GYROSCOPIC RINGS (HERO) =================
    if (i < NUM_PARTICLES * 0.45) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 1.15 + (Math.random() - 0.5) * 0.14;
      shape0[i3] = radius * Math.sin(phi) * Math.cos(theta);
      shape0[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      shape0[i3 + 2] = radius * Math.cos(phi);
    } else {
      const ringIdx = i % 3;
      const ringRadius = 1.65 + ringIdx * 0.28;
      const angle = (i / (NUM_PARTICLES * 0.55)) * Math.PI * 2;
      const tilt = ringIdx === 0 ? 0.38 : ringIdx === 1 ? -0.52 : 0.88;

      const x = ringRadius * Math.cos(angle);
      const y = ringRadius * Math.sin(angle);
      shape0[i3] = x;
      shape0[i3 + 1] = y * Math.cos(tilt);
      shape0[i3 + 2] = y * Math.sin(tilt);
    }

    // ================= SHAPE 1: ARCHITECTURE NEURAL LATTICE (ABOUT) =================
    const gridX = ((i % 16) - 7.5) * 0.32 + (Math.random() - 0.5) * 0.1;
    const gridY = (((Math.floor(i / 16)) % 16) - 7.5) * 0.32 + (Math.random() - 0.5) * 0.1;
    const gridZ = (Math.floor(i / 256) - 9) * 0.24 + (Math.random() - 0.5) * 0.15;
    shape1[i3] = gridX;
    shape1[i3 + 1] = gridY;
    shape1[i3 + 2] = gridZ;

    // ================= SHAPE 2: LAYERED APP VIEWPORT FRAMES (SERVICES) =================
    const frameIdx = i % 3;
    const zOffset = (frameIdx - 1) * 0.85;
    const width = 3.2;
    const height = 2.1;
    const perimeter = (width + height) * 2;
    const t = Math.random() * perimeter;

    let fx = 0;
    let fy = 0;
    if (t < width) {
      fx = t - width / 2;
      fy = height / 2;
    } else if (t < width + height) {
      fx = width / 2;
      fy = height / 2 - (t - width);
    } else if (t < width * 2 + height) {
      fx = width / 2 - (t - width - height);
      fy = -height / 2;
    } else {
      fx = -width / 2;
      fy = -height / 2 + (t - width * 2 - height);
    }

    if (Math.random() > 0.75) {
      fx = (Math.random() - 0.5) * (width * 0.85);
      fy = (Math.random() - 0.5) * (height * 0.85);
    }

    shape2[i3] = fx + (frameIdx - 1) * 0.3;
    shape2[i3 + 1] = fy - (frameIdx - 1) * 0.2;
    shape2[i3 + 2] = zOffset;

    // ================= SHAPE 3: DIAMOND SHOWCASE STAR & EXPANSIVE CELESTIAL STARFIELD (PROJECTS) =================
    if (i < NUM_PARTICLES * 0.30) {
      // 1. Faceted Diamond Star Core
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const r = Math.pow(v, 0.5) * 1.85;
      const h = (1 - r / 1.85) * (Math.random() > 0.5 ? 2.2 : -2.2);
      shape3[i3] = r * Math.cos(theta);
      shape3[i3 + 1] = h;
      shape3[i3 + 2] = r * Math.sin(theta);
    } else if (i < NUM_PARTICLES * 0.65) {
      // 2. Wide Orbiting Celestial Halo & Showcase Ring (Frames the screen around the cards)
      const angle = Math.random() * Math.PI * 2;
      const rOuter = 3.2 + Math.random() * 2.2; // Expands from 3.2 to 5.4!
      const tilt = 0.42;
      shape3[i3] = rOuter * Math.cos(angle);
      shape3[i3 + 1] = rOuter * Math.sin(angle) * Math.cos(tilt);
      shape3[i3 + 2] = rOuter * Math.sin(angle) * Math.sin(tilt);
    } else {
      // 3. Ambient Starfield & Floating Golden Sparks (Spans the entire screen background)
      const spreadX = (Math.random() - 0.5) * 11.5; // -5.75 to +5.75
      const spreadY = (Math.random() - 0.5) * 7.8;  // -3.9 to +3.9
      const spreadZ = (Math.random() - 0.5) * 4.0 - 0.5; // full 3D depth layer
      shape3[i3] = spreadX;
      shape3[i3 + 1] = spreadY;
      shape3[i3 + 2] = spreadZ;
    }

    // ================= SHAPE 4: FREQUENCY SIGNAL BEACON & RIPPLES (CONTACT) =================
    const ringNumber = (i % 8) + 1;
    const ringR = ringNumber * 0.34 + (Math.random() - 0.5) * 0.08;
    const ringAngle = Math.random() * Math.PI * 2;
    const waveZ = Math.sin(ringR * 2.8) * 0.42;

    shape4[i3] = ringR * Math.cos(ringAngle);
    shape4[i3 + 1] = ringR * Math.sin(ringAngle);
    shape4[i3 + 2] = waveZ;
  }

  return { shape0, shape1, shape2, shape3, shape4, colors };
}

/**
 * 3D Particles Mesh with Additive Blending Glow
 */
function ParticlesMesh({ scrollProgress, mousePosRef }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const { size: canvasSize } = useThree();

  const sparkleTexture = useMemo(() => createSparkleTexture(), []);
  const { shape0, shape1, shape2, shape3, shape4, colors } = useMemo(generateShapes, []);

  const currentPositions = useMemo(() => new Float32Array(shape0), [shape0]);

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current) return;

    const time = state.clock.getElapsedTime();

    const mx = mousePosRef.current.x;
    const my = mousePosRef.current.y;

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Dynamic responsive device width detection
    const width = canvasSize.width || window.innerWidth;
    const isSmallMobile = width < 480;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Mobile-first proportional scale:
    // Small mobile (<480px): 0.35 (compact, elegant jewel fits comfortably in dedicated stage window)
    // Phablets / large phones (480-768px): 0.45
    // Tablets (768-1024px): 0.70
    // Desktop (1024px+): 1.0
    const targetScale = isSmallMobile
      ? 0.35
      : isMobile
        ? 0.45
        : isTablet
          ? 0.70
          : 1.0;

    // Mobile-optimized particle size: delicate stardust on mobile so typography remains 100% crisp & readable
    const targetParticleSize = isSmallMobile
      ? 0.036
      : isMobile
        ? 0.044
        : isTablet
          ? 0.068
          : 0.086;

    if (pointsRef.current.material && pointsRef.current.material.size !== targetParticleSize) {
      pointsRef.current.material.size = targetParticleSize;
    }

    let fromShape = shape0;
    let toShape = shape1;
    let localT = 0;

    if (p < 0.25) {
      fromShape = shape0;
      toShape = shape1;
      localT = p / 0.25;
    } else if (p < 0.5) {
      fromShape = shape1;
      toShape = shape2;
      localT = (p - 0.25) / 0.25;
    } else if (p < 0.75) {
      fromShape = shape2;
      toShape = shape3;
      localT = (p - 0.5) / 0.25;
    } else {
      fromShape = shape3;
      toShape = shape4;
      localT = (p - 0.75) / 0.25;
    }

    const easeT = localT * localT * (3 - 2 * localT);
    const positions = pointsRef.current.geometry.attributes.position.array;

    const worldMouseX = mx * 3.8;
    const worldMouseY = my * 2.8;

    // Scale repulsion zone to targetScale so touching mobile screen produces a gentle localized ripple
    const repulsionMaxDistSq = 2.2 * (targetScale * targetScale);
    const repulsionForceFactor = 0.24 * targetScale;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const i3 = i * 3;

      const targetX = fromShape[i3] + (toShape[i3] - fromShape[i3]) * easeT;
      const targetY = fromShape[i3 + 1] + (toShape[i3 + 1] - fromShape[i3 + 1]) * easeT;
      const targetZ = fromShape[i3 + 2] + (toShape[i3 + 2] - fromShape[i3 + 2]) * easeT;

      const breathe = Math.sin(time * 1.5 + i * 0.04) * (0.035 * targetScale);

      const dx = (positions[i3] + groupRef.current.position.x) - worldMouseX;
      const dy = (positions[i3 + 1] + groupRef.current.position.y) - worldMouseY;
      const distSq = dx * dx + dy * dy;

      let pushX = 0;
      let pushY = 0;

      if (distSq < repulsionMaxDistSq) {
        const force = (repulsionMaxDistSq - distSq) * repulsionForceFactor;
        pushX = dx * force;
        pushY = dy * force;
      }

      positions[i3] += (targetX + pushX - positions[i3]) * 0.085;
      positions[i3 + 1] += (targetY + pushY + breathe - positions[i3 + 1]) * 0.085;
      positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.085;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Smoothly apply scale
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Desktop shifts to the right column in hero; mobile is centered
    const heroShiftX = (!isMobile && !isTablet) ? 1.95 * Math.max(0, 1 - p * 4.5) : 0;
    const targetX = heroShiftX + (p > 0.25 ? Math.sin(p * Math.PI * 2) * (0.25 * targetScale) : 0);

    // Smooth transition from lowered Hero position to subsequent sections
    const heroToAboutProgress = Math.min(1, Math.max(0, p / 0.22));
    const easeHero = heroToAboutProgress * heroToAboutProgress * (3 - 2 * heroToAboutProgress);

    // Mobile Y placement: Perfectly centers the 3D sparkle core within the mobile stage window,
    // comfortably below the headline, buttons, and metrics (300+ / <0.8s / 4.9★),
    // and directly above the Touch to Interact hint with balanced breathing room!
    const targetY = isSmallMobile
      ? (p < 0.22 ? -1.04 + (-0.52 - (-1.04)) * easeHero : -0.52 - (p - 0.22) * 0.18)
      : isMobile
        ? (p < 0.22 ? -0.94 + (-0.46 - (-0.94)) * easeHero : -0.46 - (p - 0.22) * 0.16)
        : isTablet
          ? (p < 0.22 ? -0.65 + (-0.45 - (-0.65)) * easeHero : -0.45 - (p - 0.22) * 0.15)
          : -p * 0.3;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.07;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.07;
    // On mobile, push the 3D particles slightly deeper into the background z-plane
    const targetZ = (isMobile || isSmallMobile) ? -0.5 : 0;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.07;

    pointsRef.current.rotation.y = time * 0.15 + mx * 0.22;
    pointsRef.current.rotation.x = Math.sin(time * 0.09) * 0.1 - my * 0.14;
    // Harmonious 3D subtle tilt synced with card spatial rotation
    groupRef.current.rotation.z += (mx * 0.08 - groupRef.current.rotation.z) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NUM_PARTICLES}
            array={currentPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={NUM_PARTICLES}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={sparkleTexture}
          size={0.088}
          vertexColors
          transparent
          opacity={0.98}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/**
 * Fixed Fullscreen 3D Morphing Sparkle Background Engine (Obsidian Black & 24K Gold)
 */
export default function MorphingParticleEngine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeShapeIdx, setActiveShapeIdx] = useState(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
        setScrollProgress(p);

        if (p < 0.2) setActiveShapeIdx(0);
        else if (p < 0.42) setActiveShapeIdx(1);
        else if (p < 0.65) setActiveShapeIdx(2);
        else if (p < 0.88) setActiveShapeIdx(3);
        else setActiveShapeIdx(4);
      }
    };

    const handleMouseMove = (e) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        mousePosRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  const activeShape = SHAPES_DATA[activeShapeIdx];

  const jumpToShape = (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 3D WebGL Background Canvas in Deep Obsidian Jet Black */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#060709]"
      >
        {/* Luxury Gold Micro-Grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        {/* Ambient Radiant 24K Gold Nebulae Top-Right */}
        <div className="absolute -top-28 right-0 sm:right-1/4 h-[550px] w-[550px] rounded-full bg-amber-500/14 blur-[160px]" />

        {/* Ambient Warm Golden Bronze Glow Bottom-Left */}
        <div className="absolute -bottom-28 left-0 sm:left-10 h-[500px] w-[500px] rounded-full bg-yellow-600/10 blur-[170px]" />

        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 46 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={1.5} />
          <ParticlesMesh
            scrollProgress={scrollProgress}
            mousePosRef={mousePosRef}
          />
        </Canvas>
      </div>

      {/* Sleek Minimal Floating Telemetry Capsule (Obsidian Dark Glass with Dual-Tone Gold HUD Icon) */}
      <aside
        aria-label="3D Spatial Engine Telemetry"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-amber-500/30 bg-[#090b10]/90 px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] select-none pointer-events-auto"
      >
        <GoldIconPod
          icon={activeShape.icon}
          size="xs"
          active={true}
          interactive={false}
          className="!h-7 !w-7 !rounded-lg"
          iconClassName="animate-spin [animation-duration:14s]"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-amber-400">
              3D SHAPE 0{activeShape.id + 1}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
          <span className="font-serif text-[10px] sm:text-[11px] font-bold text-slate-100 leading-tight">
            {activeShape.name}
          </span>
        </div>

        <div className="hidden sm:flex ml-1 pl-2.5 border-l border-slate-800 items-center gap-1">
          {SHAPES_DATA.map((s) => (
            <button
              key={s.id}
              onClick={() => jumpToShape(s.target)}
              title={`${s.section}: ${s.name}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${s.id === activeShapeIdx
                ? 'bg-amber-400 w-4 shadow-[0_0_8px_#fbbf24]'
                : 'bg-slate-700 w-2 hover:bg-amber-400'
                }`}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
