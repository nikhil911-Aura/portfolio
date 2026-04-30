"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Server, Database, Cloud, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    subtitle: "Interfaces people love to use",
    icon: Layers,
    color: "#3b82f6",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Redux", level: 80 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    subtitle: "APIs and systems built to scale",
    icon: Server,
    color: "#9333ea",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
      { name: "WebSockets", level: 72 },
      { name: "Microservices", level: 75 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    subtitle: "Data stored and retrieved fast",
    icon: Database,
    color: "#06b6d4",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma", level: 78 },
      { name: "Redis", level: 72 },
      { name: "Mongoose", level: 85 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    subtitle: "Ship fast, stay reliable",
    icon: Cloud,
    color: "#ec4899",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 78 },
      { name: "Helm", level: 72 },
      { name: "ArgoCD", level: 70 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    subtitle: "Building with intelligence",
    icon: Cpu,
    color: "#f59e0b",
    skills: [
      { name: "GenAI APIs", level: 80 },
      { name: "n8n", level: 75 },
      { name: "LangChain", level: 65 },
      { name: "OpenAI API", level: 82 },
      { name: "Prompt Eng.", level: 78 },
    ],
  },
];

function proficiencyLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  return "Intermediate";
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileInView = useInView(mobileRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const ctx = gsap.context(() => {
        const mainTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: 1.1,
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Animate skill bars per panel via containerAnimation
        track.querySelectorAll<HTMLElement>(".skill-panel").forEach((panel) => {
          panel.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((bar) => {
            const targetWidth = bar.dataset.width ?? "0%";
            gsap.fromTo(
              bar,
              { width: 0 },
              {
                width: targetWidth,
                duration: 0.65,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: mainTween,
                  start: "left 72%",
                  toggleActions: "play none none reset",
                },
              }
            );
          });

          // Stagger skill cards in
          gsap.from(panel.querySelectorAll(".skill-card"), {
            opacity: 0,
            y: 22,
            scale: 0.94,
            stagger: { amount: 0.4, from: "start" },
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTween,
              start: "left 78%",
              toggleActions: "play none none reset",
            },
          });

          // Left side info slides in
          gsap.from(panel.querySelectorAll(".panel-meta"), {
            opacity: 0,
            x: -30,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainTween,
              start: "left 85%",
              toggleActions: "play none none reset",
            },
          });
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden">

      {/* ── Desktop horizontal scroll ── */}
      <div
        ref={trackRef}
        className="hidden md:flex"
        style={{ width: `${skillCategories.length * 100}vw` }}
      >
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="skill-panel shrink-0 flex items-center px-16 xl:px-20 relative"
              style={{ width: "100vw", minHeight: "100vh" }}
            >
              {/* Giant watermark number */}
              <div
                className="absolute select-none pointer-events-none font-black"
                style={{
                  right: "3vw",
                  bottom: "-2rem",
                  fontSize: "clamp(14rem, 32vw, 26rem)",
                  lineHeight: 0.8,
                  color: `${cat.color}05`,
                  fontFamily: "monospace",
                  zIndex: 0,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="w-full grid grid-cols-5 gap-10 xl:gap-16 items-center relative z-10">

                {/* ── Left: category meta (2 cols) ── */}
                <div className="col-span-2 panel-meta flex flex-col gap-0">

                  {/* Section title — only on first panel */}
                  {idx === 0 && (
                    <div className="mb-10">
                      <p className="text-[11px] text-purple-400 tracking-[0.3em] uppercase mb-2 font-medium">
                        Expertise
                      </p>
                      <h2 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
                        Technical{" "}
                        <span
                          style={{
                            background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          Skills
                        </span>
                      </h2>
                      <p className="mt-3 text-slate-500 text-sm">
                        scroll to explore each domain →
                      </p>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `${cat.color}14`,
                      border: `1px solid ${cat.color}30`,
                      boxShadow: `0 0 24px ${cat.color}12`,
                    }}
                  >
                    <Icon size={24} style={{ color: cat.color }} />
                  </div>

                  <h3 className="text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
                    {cat.label}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-[280px]">
                    {cat.subtitle}
                  </p>

                  {/* Index badge + skill count */}
                  <div className="flex items-center gap-3 mb-8">
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg tracking-wider"
                      style={{
                        background: `${cat.color}12`,
                        border: `1px solid ${cat.color}28`,
                        color: cat.color,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-slate-600">
                      {cat.skills.length} technologies
                    </span>
                  </div>

                  {/* Progress bar showing position in horizontal scroll */}
                  <div className="flex gap-1.5">
                    {skillCategories.map((c, di) => (
                      <div
                        key={c.id}
                        className="h-0.5 rounded-full flex-1 transition-all duration-700"
                        style={{
                          background: di === idx ? c.color : "rgba(255,255,255,0.07)",
                          boxShadow: di === idx ? `0 0 6px ${c.color}` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* ── Right: skill cards grid (3 cols) ── */}
                <div className="col-span-3">
                  <div className={`grid gap-3 ${cat.skills.length > 4 ? "grid-cols-3" : "grid-cols-2"}`}>
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-card group relative p-4 rounded-2xl overflow-hidden cursor-default"
                        style={{
                          background: `${cat.color}07`,
                          border: `1px solid ${cat.color}16`,
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 0%, ${cat.color}20, transparent 70%)`,
                          }}
                        />
                        {/* Top accent line */}
                        <div
                          className="absolute top-0 left-3 right-3 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, transparent, ${cat.color}80, transparent)` }}
                        />

                        <div className="relative z-10">
                          {/* Skill name */}
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-sm font-semibold text-white leading-tight">
                              {skill.name}
                            </span>
                            <span
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded-md ml-1 shrink-0"
                              style={{
                                background: `${cat.color}18`,
                                color: cat.color,
                              }}
                            >
                              {proficiencyLabel(skill.level)}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div
                            className="h-1 w-full rounded-full overflow-hidden mb-2"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <div
                              className="skill-bar-fill h-full rounded-full"
                              data-width={`${skill.level}%`}
                              style={{
                                width: 0,
                                background: `linear-gradient(90deg, ${cat.color}70, ${cat.color})`,
                                boxShadow: `0 0 8px ${cat.color}70`,
                              }}
                            />
                          </div>

                          {/* Percentage */}
                          <span
                            className="text-xs font-mono font-bold"
                            style={{ color: cat.color }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile layout ── */}
      <div ref={mobileRef} className="md:hidden py-20 px-4 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mobileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-[11px] text-purple-400 tracking-[0.3em] uppercase mb-3 font-medium">
            Expertise
          </p>
          <h2 className="text-4xl font-bold text-white">
            Technical{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </h2>
        </motion.div>

        {/* Accordion categories */}
        <div className="flex flex-col gap-2">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isOpen = expandedMobile === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={mobileInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.07 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: isOpen ? `${cat.color}08` : "var(--card-bg)",
                  border: `1px solid ${isOpen ? cat.color + "30" : "var(--card-border)"}`,
                  transition: "background 0.3s, border-color 0.3s",
                }}
              >
                {/* Header row */}
                <button
                  className="w-full flex items-center gap-3 p-4 text-left"
                  onClick={() => setExpandedMobile(isOpen ? null : cat.id)}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: isOpen ? `${cat.color}20` : `${cat.color}12`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    <Icon size={16} style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{cat.label}</p>
                    <p className="text-xs text-slate-500 truncate">{cat.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono" style={{ color: cat.color }}>
                      {cat.skills.length} skills
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5L7 9L11 5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                {/* Expanded skill grid */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
                        {cat.skills.map((skill, si) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: si * 0.04 }}
                            className="p-3.5 rounded-xl"
                            style={{
                              background: `${cat.color}08`,
                              border: `1px solid ${cat.color}18`,
                            }}
                          >
                            <div className="flex items-start justify-between mb-2.5">
                              <span className="text-xs font-semibold text-white leading-tight">
                                {skill.name}
                              </span>
                              <span
                                className="text-[9px] font-bold ml-1 shrink-0"
                                style={{ color: cat.color }}
                              >
                                {skill.level}%
                              </span>
                            </div>
                            <div
                              className="h-0.5 w-full rounded-full overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: si * 0.05, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{
                                  background: `linear-gradient(90deg, ${cat.color}70, ${cat.color})`,
                                  boxShadow: `0 0 6px ${cat.color}60`,
                                }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-600 mt-1.5">
                              {proficiencyLabel(skill.level)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* All tech badge cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mobileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-5 rounded-2xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          <p className="text-center text-[10px] text-slate-600 tracking-[0.25em] uppercase mb-4">
            All Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <span
                  key={`${cat.id}-${skill.name}`}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    background: `${cat.color}10`,
                    border: `1px solid ${cat.color}22`,
                    color: cat.color,
                  }}
                >
                  {skill.name}
                </span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
