"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Code2, Server, Cloud, Cpu, MapPin, Coffee } from "lucide-react";

// Alphawizz internship: Jan 2025 – Jun 2025 (fixed 6 months)
const INTERNSHIP_MONTHS = 6;
// IBR Infotech start: Feb 23 2026 — update when leaving org
const EXP_START = new Date(2026, 1, 23);

function getExperienceMonths(): number {
  const now = new Date();
  const ibrMonths =
    (now.getFullYear() - EXP_START.getFullYear()) * 12 +
    (now.getMonth() - EXP_START.getMonth());
  return INTERNSHIP_MONTHS + Math.max(0, ibrMonths);
}

function buildCodeLines(expMonths: number) {
  const label = expMonths >= 12
    ? `${Math.floor(expMonths / 12)}+ yr @ IBR Infotech`
    : `${expMonths}+ mo @ IBR Infotech`;
  return [
    { tokens: [{ text: "const", color: "#9333ea" }, { text: " engineer", color: "#e2e8f0" }, { text: " = {", color: "#94a3b8" }] },
    { tokens: [{ text: "  name:", color: "#94a3b8" }, { text: ' "Nikhil Singh"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: "  role:", color: "#94a3b8" }, { text: ' "Full Stack + DevOps + GenAI"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: "  stack:", color: "#94a3b8" }, { text: " [", color: "#e2e8f0" }] },
    { tokens: [{ text: '    "React"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Next.js"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Node.js"', color: "#3b82f6" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: '    "Docker"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"Kubernetes"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"AWS"', color: "#3b82f6" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: '    "GenAI"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"n8n"', color: "#3b82f6" }, { text: ", ", color: "#94a3b8" }, { text: '"ArgoCD"', color: "#3b82f6" }] },
    { tokens: [{ text: "  ],", color: "#e2e8f0" }] },
    { tokens: [{ text: "  experience:", color: "#94a3b8" }, { text: ` "${label}"`, color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: "  passion:", color: "#94a3b8" }, { text: ' "Cloud + AI + Automation"', color: "#06b6d4" }, { text: ",", color: "#94a3b8" }] },
    { tokens: [{ text: "  available:", color: "#94a3b8" }, { text: " true", color: "#9333ea" }] },
    { tokens: [{ text: "};", color: "#94a3b8" }] },
  ];
}

const pillars = [
  { icon: Code2,   title: "Full Stack",        desc: "MERN stack apps with clean architecture and optimized performance.",   color: "#3b82f6" },
  { icon: Cloud,   title: "DevOps & Cloud",     desc: "CI/CD, K8s, Helm, ArgoCD, and AWS for reliable deployments.",         color: "#9333ea" },
  { icon: Cpu,     title: "GenAI & Automation", desc: "AI workflows, n8n integrations, and LLM-based automation.",            color: "#06b6d4" },
  { icon: Server,  title: "Backend Systems",    desc: "Scalable REST APIs, microservices, and cloud-native architecture.",    color: "#ec4899" },
];

const BASE_STATS = [
  { value: 10, suffix: "+", label: "Projects"     },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 30, suffix: "+", label: "GitHub Repos" },
];

function Counter({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const startTime = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) ref.current.textContent = Math.round(eased * to) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const expMonths = getExperienceMonths();
  const expValue = expMonths >= 12 ? Math.floor(expMonths / 12) : expMonths;
  const expSuffix = expMonths >= 12 ? "+ yr" : "+ mo";
  const stats = [
    { value: expValue, suffix: expSuffix, label: "Experience" },
    ...BASE_STATS,
  ];
  const codeLines = buildCodeLines(expMonths);

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">Who I Am</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            About{" "}
            <span style={{ background: "linear-gradient(135deg, #9333ea, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--code-bg)", border: "1px solid rgba(147,51,234,0.2)", boxShadow: "0 0 40px rgba(147,51,234,0.08)" }}
            >
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
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
              <div className="p-6 font-mono text-sm leading-loose">
                {codeLines.map((line, lineIdx) => (
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + lineIdx * 0.06, duration: 0.3 }}
                    className="flex items-center"
                  >
                    <span className="text-slate-700 mr-4 text-xs select-none w-5 text-right shrink-0">{lineIdx + 1}</span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.color }}>{token.text}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  className="flex items-center mt-1"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-slate-700 mr-4 text-xs w-5 text-right shrink-0">{codeLines.length + 1}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-purple-400"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: profile + bio + stats + pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Profile card */}
            <div
              className="flex items-center gap-5 p-5 rounded-2xl"
              style={{ background: "var(--card-bg)", border: "1px solid rgba(147,51,234,0.18)" }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white select-none"
                  style={{ background: "linear-gradient(135deg, #9333ea, #3b82f6, #06b6d4)", boxShadow: "0 0 30px rgba(147,51,234,0.4)" }}
                >
                  NS
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2"
                  style={{ borderColor: "var(--card-bg)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">Nikhil Singh</h3>
                <p className="text-sm text-purple-400 font-medium">Full Stack · DevOps · GenAI</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={10} /> Indore, India
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Coffee size={10} /> Open to work
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-3">
              <p className="text-slate-300 text-base leading-relaxed">
                I turn ideas into{" "}
                <span className="text-white font-semibold">production-grade products</span> — from architecting the backend and wiring up APIs to deploying on Kubernetes and integrating AI automation.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Currently at <span className="text-purple-400 font-medium">IBR Infotech LLP</span>, shipping full-stack applications, building CI/CD pipelines with GitHub Actions, and automating business workflows with n8n and GenAI APIs.
              </p>
            </div>

            {/* Animated stat counters */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center p-3 rounded-xl text-center"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                >
                  <span
                    className="text-xl font-black"
                    style={{ background: "linear-gradient(135deg, #9333ea, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    <Counter to={s.value} suffix={s.suffix} inView={inView} />
                  </span>
                  <span className="text-[10px] text-slate-600 mt-0.5 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-xl transition-all duration-300 group"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}25` }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors" style={{ background: `${p.color}18` }}>
                    <p.icon size={15} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
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
