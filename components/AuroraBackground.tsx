"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  hue: number;
}

interface Orb {
  bx: number; by: number;
  r: number;
  rgb: [number, number, number];
  speed: number;
  phase: number;
  amp: number;
  maxAlpha: number;
}

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, animId = 0, t = 0;
    let mx = -9999, my = -9999;

    const orbs: Orb[] = [
      { bx: 0.18, by: 0.28, r: 0.58, rgb: [147, 51,  234], speed: 0.00018, phase: 0,   amp: 0.12, maxAlpha: 0.50 },
      { bx: 0.72, by: 0.38, r: 0.52, rgb: [6,   182, 212], speed: 0.00024, phase: 1.9, amp: 0.14, maxAlpha: 0.42 },
      { bx: 0.50, by: 0.75, r: 0.46, rgb: [59,  130, 246], speed: 0.00020, phase: 3.8, amp: 0.10, maxAlpha: 0.36 },
      { bx: 0.85, by: 0.15, r: 0.40, rgb: [99,  102, 241], speed: 0.00015, phase: 0.7, amp: 0.09, maxAlpha: 0.32 },
      { bx: 0.10, by: 0.80, r: 0.38, rgb: [20,  184, 166], speed: 0.00022, phase: 2.5, amp: 0.11, maxAlpha: 0.28 },
      { bx: 0.55, by: 0.52, r: 0.32, rgb: [6,   182, 212], speed: 0.00030, phase: 5.1, amp: 0.08, maxAlpha: 0.24 },
    ];

    const PARTICLE_N = 75;
    const CONNECT_DIST = 155;
    const particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const mkParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.55 + 0.25,
      hue: Math.random() > 0.5 ? 265 + Math.random() * 30 : 195 + Math.random() * 25,
    });

    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < PARTICLE_N; i++) particles.push(mkParticle());

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Aurora orbs — organic Lissajous paths
      for (const o of orbs) {
        const ts = t * o.speed;
        const ox = (o.bx + Math.sin(ts + o.phase) * o.amp + Math.cos(ts * 0.63 + o.phase + 1) * o.amp * 0.5) * W;
        const oy = (o.by + Math.cos(ts * 0.8 + o.phase) * o.amp + Math.sin(ts * 0.47 + o.phase + 2) * o.amp * 0.4) * H;
        const radius = o.r * Math.max(W, H);
        const [r, g, b] = o.rgb;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${o.maxAlpha})`);
        grad.addColorStop(0.30, `rgba(${r},${g},${b},${o.maxAlpha * 0.6})`);
        grad.addColorStop(0.60, `rgba(${r},${g},${b},${o.maxAlpha * 0.18})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particle network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0) {
          p.vx += (dx / dist) * 0.035;
          p.vy += (dy / dist) * 0.035;
        }

        p.vx *= 0.988;
        p.vy *= 0.988;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x, ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(147,51,234,${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,72%,${p.alpha})`;
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
