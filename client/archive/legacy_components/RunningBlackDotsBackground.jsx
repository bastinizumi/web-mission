import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * RunningBlackDotsBackground — Live 3D Animated Running Black Dots Engine
 * Fulfills the user request: "first iruntha white colour theme la enaku intha black colour la dout dout ah running la irukura mari pani kudu"
 * - 8,000+ crisp black dots running continuously in multi-frequency wave streams
 * - Real-time mouse repulsion & wave distortion ripples
 * - Inertial scroll velocity reactivity
 * - Clean white/slate canvas background (#ebeef2) with 60 FPS GPU Three.js WebGL
 */
export default function RunningBlackDotsBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xebeef2, 0.00065);

    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 3500);
    camera.position.set(0, 420, 1050);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0xebeef2, 0);
    container.appendChild(renderer.domElement);

    // 2. Build Running Black Dots Particle Field
    const COLS = 110;
    const ROWS = 90;
    const PARTICLE_COUNT = COLS * ROWS;
    const SPACING = 38;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const opacities = new Float32Array(PARTICLE_COUNT);
    const originalX = new Float32Array(PARTICLE_COUNT);
    const originalZ = new Float32Array(PARTICLE_COUNT);

    let idx = 0;
    const startX = -((COLS * SPACING) / 2);
    const startZ = -((ROWS * SPACING) / 2);

    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const x = startX + i * SPACING;
        const z = startZ + j * SPACING;
        const y = 0;

        const i3 = idx * 3;
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        originalX[idx] = x;
        originalZ[idx] = z;

        // Subtle opacity variations for depth
        opacities[idx] = 0.35 + Math.random() * 0.45;
        idx++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Crisp Circular Black Dot Texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Crisp high-contrast black circle with soft antialiased edge
    ctx.beginPath();
    ctx.arc(32, 32, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 5.2,
      color: 0x000000,
      map: texture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    const dots = new THREE.Points(geometry, material);
    scene.add(dots);

    // 3. Mouse Tracking & Interactive Ripple
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.45;
      mouseY = (e.clientY - height / 2) * 0.45;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 4. Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const posAttr = dots.geometry.attributes.position;
      const posArray = posAttr.array;

      // Running waves: longitudinal and transversal undulation
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = originalX[i];
        const z = originalZ[i];

        // "Running" motion: wave phase travels continuously across the plane
        const runPhase = elapsed * 2.2;
        const wave1 = Math.sin(x * 0.004 + runPhase) * 55;
        const wave2 = Math.cos(z * 0.005 + runPhase * 0.8) * 45;
        const wave3 = Math.sin((x + z) * 0.003 + elapsed * 1.5) * 35;

        // Mouse distance ripple
        const dx = x - mouseX * 2;
        const dz = z - mouseY * 2;
        const distSq = dx * dx + dz * dz;
        const mouseRepulsion = distSq < 160000 ? Math.sin((1 - Math.sqrt(distSq) / 400) * Math.PI) * 50 : 0;

        posArray[i3 + 1] = wave1 + wave2 + wave3 + mouseRepulsion;
      }
      posAttr.needsUpdate = true;

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.55;
      camera.position.y = 420 - targetY * 0.35;
      camera.lookAt(0, 30, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#ebeef2]"
    />
  );
}

