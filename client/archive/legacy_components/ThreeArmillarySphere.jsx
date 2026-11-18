import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeArmillarySphere — Live 3D Celestial Gyroscope Rings
 * Directly matching Card 3 (Right Top) in the user's uploaded reference image.
 * Uses Three.js to render concentric rotating orbital rings and a glowing central globe.
 */
export default function ThreeArmillarySphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for the entire sphere
    const armillaryGroup = new THREE.Group();
    scene.add(armillaryGroup);

    // Material: Technical architectural metallic ink with clean rim light
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.3,
    });
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Ring 1 (Outer meridian)
    const ring1Geo = new THREE.TorusGeometry(8, 0.35, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    armillaryGroup.add(ring1);

    // Ring 2 (Equator ring)
    const ring2Geo = new THREE.TorusGeometry(7.2, 0.3, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    armillaryGroup.add(ring2);

    // Ring 3 (Tilted ecliptic ring)
    const ring3Geo = new THREE.TorusGeometry(6.4, 0.28, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat3);
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = Math.PI / 6;
    armillaryGroup.add(ring3);

    // Central core globe (glowing cyan / glass sphere)
    const globeGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    armillaryGroup.add(globe);

    // Axis pin through the center
    const axisGeo = new THREE.CylinderGeometry(0.18, 0.18, 18, 16);
    const axisMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
    const axis = new THREE.Mesh(axisGeo, axisMat);
    armillaryGroup.add(axis);

    // Base stand ring
    const baseGeo = new THREE.TorusGeometry(4.5, 0.4, 16, 32);
    const baseMesh = new THREE.Mesh(baseGeo, ringMat1);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = -8.5;
    armillaryGroup.add(baseMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(10, 15, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-10, -10, 10);
    scene.add(dirLight2);

    // Mouse tracking for tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.015;

      // Independent rotations of concentric orbital rings
      ring1.rotation.y = time * 0.8;
      ring2.rotation.z = time * 1.1;
      ring3.rotation.x = Math.PI / 4 + Math.sin(time) * 0.3;
      ring3.rotation.y = time * 0.9;
      globe.rotation.y = time * 0.5;

      // Subtle mouse reactive group tilt
      armillaryGroup.rotation.y += (mouseX - armillaryGroup.rotation.y) * 0.05;
      armillaryGroup.rotation.x += (mouseY - armillaryGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-full w-full min-h-[170px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}

