import React, { useEffect, useRef } from 'react';

/**
 * LiveWaveformMonitor — Interactive Multi-Harmonic Sound & Data Wave Monitor
 * Directly matching Card 2 (Center Top) in the user's uploaded reference image.
 * Features undulating glowing multi-color sine waves and telemetry graphs.
 */
export default function LiveWaveformMonitor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let time = 0;
    let mouseWaveBoost = 1;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth || 280;
      canvas.height = canvas.parentElement.clientHeight || 180;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeY = (e.clientY - rect.top) / rect.height;
      mouseWaveBoost = 0.6 + relativeY * 0.9;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const WAVES = [
      { color: '#38bdf8', freq: 0.022, speed: 0.035, amp: 26, width: 2.2 },
      { color: '#f43f5e', freq: 0.018, speed: 0.028, amp: 32, width: 2 },
      { color: '#eab308', freq: 0.03, speed: 0.045, amp: 18, width: 1.8 },
      { color: '#22c55e', freq: 0.015, speed: 0.02, amp: 22, width: 1.5 },
      { color: '#a855f7', freq: 0.025, speed: 0.038, amp: 28, width: 2 },
    ];

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 1;

      const w = canvas.width;
      const h = canvas.height;
      const centerY = h * 0.58;

      ctx.fillStyle = '#1e2438';
      ctx.fillRect(0, 0, w, h);

      // Technical Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Top Header Telemetry Markers matching screenshot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText('LIVE TELEMETRY // 48.2 kHz', 12, 16);

      // Mini top graph line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(12, 34);
      for (let gx = 12; gx < 90; gx += 8) {
        const gy = 30 + Math.sin(gx * 0.15 + time * 0.05) * 6;
        ctx.lineTo(gx, gy);
      }
      ctx.stroke();

      // Mini top right bar chart indicators
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(w - 70, 10, 16, 4);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(w - 50, 10, 20, 4);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(w - 26, 10, 14, 4);

      // Draw Main Undulating Glowing Waves
      WAVES.forEach((wave) => {
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        for (let x = 0; x < w; x += 3) {
          const y =
            centerY +
            Math.sin(x * wave.freq + time * wave.speed) *
              wave.amp *
              mouseWaveBoost *
              Math.sin((x / w) * Math.PI); // Envelope curve that pinches at boundaries
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.shadowBlur = 0;

      // Bottom data indicators
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('CH-01: OK', 12, h - 10);
      ctx.fillText('SYNAPSE: 99.8%', w - 85, h - 10);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative h-full w-full min-h-[170px] overflow-hidden rounded-xl">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

