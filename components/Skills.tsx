"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
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

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");

  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(147,51,234,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Expertise
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
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
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            {skillCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                  activeCategory === cat.id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
                style={
                  activeCategory === cat.id
                    ? {
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}30`,
                        boxShadow: `0 0 20px ${cat.color}10`,
                      }
                    : {
                        background: "var(--card-bg)",
                        border: "1px solid var(--card-border)",
                      }
                }
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: activeCategory === cat.id ? cat.color : "#334155",
                    boxShadow: activeCategory === cat.id ? `0 0 8px ${cat.color}` : "none",
                  }}
                />
                <span className="font-medium text-sm">{cat.label}</span>
                <span className="ml-auto text-xs text-slate-600">
                  {cat.skills.length} skills
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: active.color,
                    boxShadow: `0 0 10px ${active.color}`,
                  }}
                />
                <h3 className="text-lg font-semibold text-white">{active.label}</h3>
              </div>

              <div className="flex flex-col gap-4">
                {active.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={active.color}
                    delay={i * 0.08}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom orbit display — all skills as floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 relative overflow-hidden rounded-2xl py-12"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <p className="text-center text-xs text-slate-600 tracking-widest uppercase mb-8">
            All Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <motion.span
                  key={`${cat.id}-${skill.name}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: `${cat.color}10`,
                    border: `1px solid ${cat.color}25`,
                    color: cat.color,
                  }}
                >
                  {skill.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  color,
  delay,
  inView,
}: {
  skill: { name: string; level: number };
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300">{skill.name}</span>
        <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--track-bg)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
