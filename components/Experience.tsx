"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Junior MERN Stack & Automation Developer",
    company: "IBR Infotech LLP",
    type: "Full-Time",
    period: "February 2026 — Present",
    location: "Indore (On-site)",
    current: true,
    color: "#9333ea",
    highlights: [
      "Building scalable full-stack applications using MERN stack with focus on performance and maintainability",
      "Developing AI-assisted automation workflows and third-party integrations using n8n and GenAI APIs",
      "Designing and managing CI/CD pipelines with GitHub Actions for automated testing and deployments",
      "Deploying and orchestrating applications with Docker, Kubernetes, Helm, and ArgoCD on cloud infrastructure",
      "Architecting cloud-native systems on AWS for high availability, scalability, and reliability",
    ],
    tech: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes", "Helm", "ArgoCD", "AWS", "n8n", "GenAI"],
  },
  {
    id: 2,
    role: "Software Engineer Intern",
    company: "Alphawizz Pvt LTD",
    type: "Internship",
    period: "January 2025 — June 2025",
    location: "Indore",
    current: false,
    color: "#3b82f6",
    highlights: [
      "Improved React application performance by 20% through memoization, lazy loading, and code splitting",
      "Implemented Redux-based state management architecture for complex multi-step user flows",
      "Integrated secure REST APIs with proper authentication, error handling, and data validation",
      "Contributed to frontend codebase with reusable component library and design system",
    ],
    tech: ["React", "Redux", "TypeScript", "REST APIs", "JavaScript", "CSS"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(147,51,234,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Career
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-[1px] hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(147,51,234,0.4) 20%, rgba(147,51,234,0.4) 80%, transparent)",
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  inView,
}: {
  exp: (typeof experiences)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative sm:pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{
            background: `${exp.color}15`,
            border: `2px solid ${exp.color}40`,
            boxShadow: exp.current ? `0 0 20px ${exp.color}30` : "none",
          }}
        >
          <Briefcase size={16} style={{ color: exp.color }} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: exp.current
            ? `1px solid ${exp.color}30`
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: exp.current ? `0 0 30px ${exp.color}08` : "none",
        }}
      >
        {/* Current badge */}
        {exp.current && (
          <div
            className="px-4 py-2 flex items-center gap-2"
            style={{
              background: `${exp.color}10`,
              borderBottom: `1px solid ${exp.color}20`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: exp.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: exp.color }}
              />
            </span>
            <span className="text-xs font-medium" style={{ color: exp.color }}>
              Currently Working Here
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-base font-semibold"
                  style={{ color: exp.color }}
                >
                  {exp.company}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${exp.color}15`,
                    color: exp.color,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  {exp.type}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-2.5 mb-5">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.3 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-slate-400"
              >
                <div
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: exp.color }}
                />
                {h}
              </motion.li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#94a3b8",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
