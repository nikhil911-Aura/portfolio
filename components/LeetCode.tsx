"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ExternalLink, Trophy, Zap } from "lucide-react";

interface LeetStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
}

function CircleProgress({
  value,
  max,
  color,
  size = 80,
  strokeWidth = 6,
  inView = false,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  inView?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min(value / max, 1);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        style={{ stroke: "rgba(255,255,255,0.1)" }}
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: inView ? circumference * (1 - pct) : circumference }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 6px rgba(255,255,255,0.25))` }}
      />
    </svg>
  );
}

export default function LeetCode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [stats, setStats] = useState<LeetStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const difficulties = stats
    ? [
        { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "#86efac" },
        { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "#fcd34d" },
        { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "#fca5a5" },
      ]
    : [];

  return (
    <section id="leetcode" className="relative py-28 overflow-hidden" style={{ background: "#0C0C0C" }}>
      {/* Animated ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.07, 0.17, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{ top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,211,77,0.15) 0%, transparent 70%)", filter: "blur(90px)" }}
      />
      <motion.div
        animate={{ scale: [1.4, 1, 1.4], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute pointer-events-none"
        style={{ bottom: "-5%", right: "-5%", width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,165,165,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        className="absolute pointer-events-none"
        style={{ top: "40%", right: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <h2
            className="hero-heading"
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3rem, 11vw, 130px)",
              marginBottom: "1rem",
            }}
          >
            LeetCode
          </h2>
          <p style={{ color: "#64748b", fontSize: "clamp(0.8rem, 1.2vw, 1rem)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Problem Solving Stats
          </p>

          {/* Animated gradient divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent, #fcd34d, #fca5a5, transparent)",
              borderRadius: "9999px",
              marginTop: "1.5rem",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-pulse space-y-4 w-full max-w-md">
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-32 bg-white/5 rounded" />
              </div>
            </div>
          ) : stats ? (
            <div className="p-8">
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-8 mb-10">
                {/* Total solved with circle */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <CircleProgress
                      value={stats.totalSolved}
                      max={stats.totalEasy + stats.totalMedium + stats.totalHard}
                      color="#c084fc"
                      size={130}
                      strokeWidth={9}
                      inView={inView}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">{stats.totalSolved}</span>
                      <span className="text-xs text-slate-500">solved</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 size={16} style={{ color: "#c084fc" }} />
                      <span className="text-lg font-bold text-white">NikhilSingh01</span>
                    </div>
                    <a
                      href="https://leetcode.com/u/NikhilSingh01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-500 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                      View Profile <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(192,132,252,0.1)",
                      border: "1px solid rgba(192,132,252,0.2)",
                    }}
                  >
                    <Trophy size={14} style={{ color: "#c084fc" }} />
                    <span className="text-sm font-medium" style={{ color: "#c084fc" }}>Problem Solver</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(252,211,77,0.08)",
                      border: "1px solid rgba(252,211,77,0.18)",
                    }}
                  >
                    <Zap size={14} style={{ color: "#fcd34d" }} />
                    <span className="text-sm font-medium" style={{ color: "#fcd34d" }}>
                      Rank #{stats.ranking.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Difficulty breakdown */}
              <div className="grid sm:grid-cols-3 gap-4">
                {difficulties.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center gap-4 p-5 rounded-xl"
                    style={{
                      background: `${d.color}08`,
                      border: `1px solid ${d.color}20`,
                    }}
                  >
                    <div className="relative">
                      <CircleProgress
                        value={d.solved}
                        max={d.total}
                        color={d.color}
                        size={100}
                        strokeWidth={6}
                        inView={inView}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: d.color }}>
                          {d.solved}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm" style={{ color: d.color }}>
                        {d.label}
                      </p>
                      <p className="text-xs text-slate-600">{d.solved}/{d.total}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <Code2 size={32} className="mx-auto mb-3 opacity-30" />
              <p>Could not load stats</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
