import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeGoldWave — Live 3D Golden Cosmic Stardust Wave
 * Directly matches the golden cosmic particle nebula background from media_1794551167903_3e781d4b.jpg:
 * - 12,000+ glowing golden cosmic stardust particles
 * - Multi-harmonic sine undulating waves
 * - Mouse-driven parallax and velocity ripple
 * - Hardware-accelerated WebGL with depth and glow
 */
export default function ThreeGoldWave() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060b, 0.0009);

    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 3000);
    camera.position.set(0, 320, 950);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Generate Golden Stardust Particles
    const PARTICLE_COUNT = 14000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalY = new Float32Array(PARTICLE_COUNT);
    const frequencies = new Float32Array(PARTICLE_COUNT);

    const goldPalette = [
      new THREE.Color('#d4af37'), // Metallic Gold
      new THREE.Color('#f5d77f'), // Light Gold Stardust
      new THREE.Color('#e6be58'), // Warm Amber Gold
      new THREE.Color('#fff2b2'), // Shimmer White Gold
      new THREE.Color('#b38728'), // Deep Antique Gold
    ];

    const rangeX = 2800;
    const rangeZ = 2200;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * rangeX;
      const z = (Math.random() - 0.5) * rangeZ;
      const y = (Math.sin(x * 0.003) + Math.cos(z * 0.003)) * 80 + (Math.random() - 0.5) * 40;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalY[i] = y;
      frequencies[i] = 0.5 + Math.random() * 1.5;

      // Color variation across the golden spectrum
      const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite texture (circular soft glow)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 245, 200, 1)');
    grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.85)');
    grad.addColorStop(0.7, 'rgba(180, 130, 30, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Mouse Interaction & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.25;
      mouseY = (e.clientY - height / 2) * 0.25;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 4. Resize Listener
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
      const posAttr = particles.geometry.attributes.position;
      const posArray = posAttr.array;

      // Undulating double-harmonic golden sine wave
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const z = posArray[i3 + 2];
        const freq = frequencies[i];

        const wave1 = Math.sin(x * 0.0022 + elapsed * 0.9 * freq) * 95;
        const wave2 = Math.cos(z * 0.0028 + elapsed * 0.7 * freq) * 85;
        const wave3 = Math.sin((x + z) * 0.0015 + elapsed * 1.2) * 45;

        posArray[i3 + 1] = originalY[i] + wave1 + wave2 + wave3;
      }
      posAttr.needsUpdate = true;

      // Gentle camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.6;
      camera.position.y = 320 - targetY * 0.4;
      camera.lookAt(0, 40, 0);

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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}

