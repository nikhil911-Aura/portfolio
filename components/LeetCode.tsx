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
        style={{ stroke: "var(--track-bg)" }}
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
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
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
        { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "#22c55e" },
        { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "#f59e0b" },
        { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "#ef4444" },
      ]
    : [];

  return (
    <section id="leetcode" className="relative py-24 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Problem Solving
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            LeetCode{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stats
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
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
                      color="#9333ea"
                      size={100}
                      strokeWidth={7}
                      inView={inView}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white">{stats.totalSolved}</span>
                      <span className="text-xs text-slate-600">solved</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 size={16} className="text-purple-400" />
                      <span className="text-lg font-bold text-white">NikhilSingh01</span>
                    </div>
                    <a
                      href="https://leetcode.com/u/NikhilSingh01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-500 hover:text-purple-400 flex items-center gap-1 transition-colors"
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
                      background: "rgba(147,51,234,0.1)",
                      border: "1px solid rgba(147,51,234,0.2)",
                    }}
                  >
                    <Trophy size={14} className="text-purple-400" />
                    <span className="text-sm text-purple-300 font-medium">Problem Solver</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    <Zap size={14} className="text-amber-400" />
                    <span className="text-sm text-amber-300 font-medium">
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
                        size={80}
                        strokeWidth={5}
                        inView={inView}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base font-bold" style={{ color: d.color }}>
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
