"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Code2, Server, Cloud, Cpu } from "lucide-react";

const codeLines = [
  { tokens: [{ text: "const", color: "#9333ea" }, { text: " engineer", color: "#e2e8f0" }, { text: " = {", color: "#94a3b8" }] },
  { tokens: [{ text: "  name:", color: "#94a3b8" }, { text: ' "Nikhil Singh"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: "  role:", color: "#94a3b8" }, { text: ' "Full Stack + DevOps + GenAI"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: "  stack:", color: "#94a3b8" }, { text: " [", color: "#e2e8f0" }] },
  { tokens: [{ text: '    "React"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Next.js"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Node.js"', color: "#3b82f6" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: '    "Docker"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Kubernetes"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"AWS"', color: "#3b82f6" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: '    "GenAI"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"n8n"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"ArgoCD"', color: "#3b82f6" }] },
  { tokens: [{ text: "  ],", color: "#e2e8f0" }] },
  { tokens: [{ text: "  experience:", color: "#94a3b8" }, { text: ' "Junior MERN Dev @ IBR Infotech"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: "  passion:", color: "#94a3b8" }, { text: ' "Building at the intersection of"', color: "#06b6d4" }] },
  { tokens: [{ text: "           ", color: "#94a3b8" }, { text: '"Cloud + AI + Automation"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
  { tokens: [{ text: "  available:", color: "#94a3b8" }, { text: " true", color: "#9333ea" }] },
  { tokens: [{ text: "};", color: "#94a3b8" }] },
];

const pillars = [
  {
    icon: Code2,
    title: "Full Stack",
    desc: "End-to-end MERN stack applications with clean architecture and performance optimization.",
    color: "#3b82f6",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    desc: "CI/CD pipelines, container orchestration with K8s, Helm, ArgoCD, and AWS infrastructure.",
    color: "#9333ea",
  },
  {
    icon: Cpu,
    title: "GenAI & Automation",
    desc: "AI-powered workflows, n8n integrations, and LLM-based automation for real-world products.",
    color: "#06b6d4",
  },
  {
    icon: Server,
    title: "Backend Systems",
    desc: "Scalable REST APIs, microservices, database optimization, and cloud-native architecture.",
    color: "#ec4899",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Who I Am
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "var(--code-bg)",
                border: "1px solid rgba(147,51,234,0.2)",
                boxShadow: "0 0 40px rgba(147,51,234,0.08)",
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Terminal size={12} className="text-slate-500" />
                  <span className="text-xs text-slate-500 font-mono">nikhil.ts</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm leading-loose">
                {codeLines.map((line, lineIdx) => (
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + lineIdx * 0.06, duration: 0.3 }}
                    className="flex items-center gap-0"
                  >
                    <span className="text-slate-700 mr-4 text-xs select-none w-5 text-right shrink-0">
                      {lineIdx + 1}
                    </span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  className="flex items-center mt-1"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-slate-700 mr-4 text-xs w-5 text-right shrink-0">
                    {codeLines.length + 1}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-purple-400"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side: text + pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <p className="text-slate-300 text-lg leading-relaxed">
                Full-stack engineer with hands-on experience building{" "}
                <span className="text-white font-medium">
                  scalable backend systems
                </span>
                ,{" "}
                <span className="text-white font-medium">
                  high-performance frontend applications
                </span>
                , and{" "}
                <span className="text-white font-medium">
                  cloud-native infrastructure
                </span>
                .
              </p>
              <p className="text-slate-400 leading-relaxed">
                Currently at{" "}
                <span className="text-purple-400 font-medium">IBR Infotech LLP</span>
                , where I work across the full product lifecycle — from writing
                clean, tested code to deploying via Kubernetes and ArgoCD, and
                integrating AI-powered automation workflows.
              </p>
            </div>

            {/* Pillar cards */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: "var(--card-bg)",
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${p.color}15` }}
                  >
                    <p.icon size={16} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
