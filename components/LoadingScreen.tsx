"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ExhaustParticle({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: "rgba(147,51,234,0.7)",
        filter: "blur(2px)",
        top: 126,
        left: 26,
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [-8, -30, -55, -80],
        y: [0, -5, -12, -22],
        opacity: [0.8, 0.5, 0.2, 0],
        scale: [0.6, 1, 1.1, 0.4],
      }}
      transition={{ duration: 1.1, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function RearWheel() {
  const cx = 0;
  const cy = 0;
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    >
      <circle r="31" stroke="#9333ea" strokeWidth="3.5" fill="rgba(5,0,15,0.92)" />
      <circle r="23" stroke="#7c3aed" strokeWidth="1" fill="none" opacity="0.45" />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="0" y1="-23" x2="0" y2="23"
          stroke="#9333ea" strokeWidth="1.5" opacity="0.55"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="5.5" fill="#9333ea" opacity="0.9" />
      <circle r="2.8" fill="#1a0030" />
    </motion.g>
  );
}

function FrontWheel() {
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    >
      <circle r="27" stroke="#06b6d4" strokeWidth="3" fill="rgba(0,5,15,0.92)" />
      <circle r="20" stroke="#0891b2" strokeWidth="1" fill="none" opacity="0.45" />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="0" y1="-20" x2="0" y2="20"
          stroke="#06b6d4" strokeWidth="1.5" opacity="0.55"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="4.5" fill="#06b6d4" opacity="0.9" />
      <circle r="2.5" fill="#001520" />
    </motion.g>
  );
}

function MotorcycleSVG() {
  return (
    <svg width="288" height="158" viewBox="0 0 288 158" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Rear wheel ── */}
      <g transform="translate(64, 116)">
        <RearWheel />
      </g>

      {/* ── Front wheel ── */}
      <g transform="translate(218, 116)">
        <FrontWheel />
      </g>

      {/* ── Swing arm ── */}
      <path d="M 64 116 L 90 100 L 133 99" stroke="#64748b" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* ── Lower main frame ── */}
      <path d="M 64 116 L 92 94 L 155 103 L 190 88 L 218 116"
        stroke="rgba(226,232,240,0.65)" strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* ── Upper frame backbone ── */}
      <path d="M 93 93 L 109 57 L 163 50 L 188 72 L 190 88"
        stroke="rgba(226,232,240,0.5)" strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* ── Engine block ── */}
      <rect x="100" y="90" width="66" height="28" rx="5"
        fill="rgba(147,51,234,0.1)" stroke="rgba(147,51,234,0.38)" strokeWidth="1.5" />
      <rect x="106" y="95" width="54" height="18" rx="3" fill="rgba(147,51,234,0.14)" />
      {/* engine bolt */}
      <circle cx="118" cy="104" r="3" fill="rgba(147,51,234,0.3)" stroke="rgba(147,51,234,0.5)" strokeWidth="0.8" />
      <circle cx="150" cy="104" r="3" fill="rgba(147,51,234,0.3)" stroke="rgba(147,51,234,0.5)" strokeWidth="0.8" />

      {/* ── Fuel tank ── */}
      <path d="M 107 59 Q 130 44 168 48 L 170 63 Q 142 67 107 67 Z"
        fill="rgba(147,51,234,0.32)" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M 120 49 Q 148 43 168 48 L 166 54 Q 142 50 120 54 Z"
        fill="rgba(255,255,255,0.05)" />

      {/* ── Seat & tail ── */}
      <path d="M 88 62 Q 92 52 107 57 L 107 66 Q 95 67 88 67 Z" fill="#1e293b" />
      <path d="M 63 68 L 90 59 L 91 78 L 67 83 Z"
        fill="rgba(147,51,234,0.18)" stroke="rgba(147,51,234,0.28)" strokeWidth="1" />
      {/* tail light */}
      <rect x="59" y="71" width="5" height="9" rx="1.5" fill="#ef4444" opacity="0.8" />
      <rect x="59" y="71" width="5" height="4" rx="1.5" fill="#fca5a5" opacity="0.5" />

      {/* ── Front fork ── */}
      <path d="M 188 86 L 206 110 L 218 116"
        stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 184 82 L 202 106 L 212 116"
        stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* ── Front fairing ── */}
      <path d="M 187 71 Q 205 50 224 58 L 222 92 L 184 90 Z"
        fill="rgba(3,15,30,0.96)" stroke="#06b6d4" strokeWidth="1.5" />
      {/* windshield tint */}
      <path d="M 188 69 Q 204 54 220 61 L 218 76 Q 202 68 188 78 Z"
        fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.28)" strokeWidth="0.8" />

      {/* ── Headlight ── */}
      <ellipse cx="222" cy="72" rx="13" ry="9"
        fill="rgba(6,182,212,0.22)" stroke="#06b6d4" strokeWidth="1.2" />
      <ellipse cx="222" cy="72" rx="8" ry="5.5" fill="rgba(6,182,212,0.55)" />
      {/* lens flare */}
      <ellipse cx="218" cy="69" rx="3" ry="2" fill="rgba(255,255,255,0.35)" />

      {/* ── Handlebars ── */}
      <path d="M 187 69 L 187 60 L 178 55" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 187 60 L 195 55" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* ── Exhaust pipe ── */}
      <path d="M 90 112 Q 64 118 26 126"
        stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.65" />
      <path d="M 90 118 Q 64 124 26 132"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* exhaust tip */}
      <ellipse cx="26" cy="126" rx="5" ry="3.5" fill="rgba(245,158,11,0.35)" />
    </svg>
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revving">("loading");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 11 + 3;
        if (next >= 100) {
          clearInterval(timer);
          setPhase("revving");
          setTimeout(() => setVisible(false), 900);
          return 100;
        }
        return next;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050507" }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(147,51,234,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.18) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(147,51,234,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Top label */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xs text-slate-600 tracking-[0.38em] uppercase font-light mb-8"
            >
              Nikhil Singh · Portfolio
            </motion.p>

            {/* ── Bike scene ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
              style={{ width: 400, height: 185 }}
            >
              {/* Speed lines behind rear wheel */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    height: 1.5,
                    width: 35 + i * 16,
                    background: `linear-gradient(90deg, transparent, rgba(147,51,234,${0.25 + i * 0.07}))`,
                    top: 58 + i * 13,
                    left: 14 + i * 4,
                  }}
                  animate={{ opacity: [0, 0.9, 0], x: [18, 0, -12] }}
                  transition={{ duration: 0.55, delay: i * 0.07, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* Bike — bounces while loading, zooms off when done */}
              <motion.div
                animate={
                  phase === "revving"
                    ? { x: [0, -8, 0, 500], opacity: [1, 1, 1, 0] }
                    : { y: [0, -3, 0, -2, 0] }
                }
                transition={
                  phase === "revving"
                    ? { duration: 0.85, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                }
                style={{ position: "absolute", left: 52, top: 8 }}
              >
                <MotorcycleSVG />
              </motion.div>

              {/* Exhaust particles (left of bike in scene) */}
              <div style={{ position: "absolute", left: 52, top: 8, pointerEvents: "none" }}>
                {[0, 0.35, 0.7, 1.05].map((delay, i) => (
                  <ExhaustParticle key={i} delay={delay} size={4 + i * 1.5} />
                ))}
              </div>

              {/* Road strip */}
              <div
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  height: 22,
                  bottom: 0,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <motion.div
                  className="flex gap-5 items-center"
                  style={{ height: "100%", paddingTop: 8 }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: phase === "revving" ? 0.25 : 1.0, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 36,
                        height: 3,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.13)",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="w-72 mt-3"
            >
              <div className="flex justify-between text-xs font-mono text-slate-600 mb-2">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {pct >= 100 ? "Ready!" : "Loading..."}
                </motion.span>
                <span>{pct}%</span>
              </div>
              <div className="h-[2px] bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #9333ea, #3b82f6, #06b6d4)",
                    boxShadow: "0 0 8px rgba(147,51,234,0.5)",
                  }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
