"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Globe, Zap } from "lucide-react";
import { GithubIcon } from "./icons";

const deployments = [
  {
    name: "DevWorld",
    description: "Developer community platform for sharing projects, code snippets, and connecting with other engineers.",
    url: "https://devworld-nu.vercel.app",
    github: "https://github.com/Nick-ui911/Dev-World",
    tech: ["Next.js", "MongoDB", "TailwindCSS", "Socket.io"],
    status: "Production",
    statusColor: "#22c55e",
    gradient: "from-purple-500/20 to-blue-500/20",
    accentColor: "#9333ea",
  },
  {
    name: "NovaChat AI",
    description: "Real-time AI chat application powered by Gemini with streaming responses and conversation history.",
    url: "https://nova-chat-ai.vercel.app",
    github: "https://github.com/Nick-ui911/NovaChat-Ai",
    tech: ["React", "Gemini API", "Node.js", "Express"],
    status: "Production",
    statusColor: "#22c55e",
    gradient: "from-cyan-500/20 to-purple-500/20",
    accentColor: "#06b6d4",
  },
  {
    name: "Book Your Event",
    description: "Event booking and management platform with real-time seat selection and payment integration.",
    url: "https://book-your-event.vercel.app",
    github: "https://github.com/Nick-ui911/Book-Your-Event",
    tech: ["Next.js", "PostgreSQL", "Stripe", "Prisma"],
    status: "Production",
    statusColor: "#22c55e",
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "#f59e0b",
  },
  {
    name: "MotoPulse",
    description: "Motorcycle enthusiast platform featuring ride tracking, community forums, and route planning.",
    url: "https://motopulse.vercel.app",
    github: "https://github.com/Nick-ui911/MotoPulse",
    tech: ["React", "Node.js", "MongoDB", "MapBox"],
    status: "Production",
    statusColor: "#22c55e",
    gradient: "from-red-500/20 to-pink-500/20",
    accentColor: "#ef4444",
  },
];

export default function VercelProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="deployments" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(147,51,234,0.04) 0%, transparent 70%)",
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
            Live Deployments
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Shipped to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Production
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto text-sm">
            Real apps running in production — deployed on Vercel with CI/CD pipelines.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {deployments.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${project.accentColor}08, transparent 60%)`,
                }}
              />

              <div className="relative p-6">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Deployment indicator */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${project.accentColor}15`,
                        border: `1px solid ${project.accentColor}25`,
                      }}
                    >
                      <Globe size={16} style={{ color: project.accentColor }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base">{project.name}</h3>
                      {/* Deployment status */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="relative flex h-1.5 w-1.5"
                        >
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: project.statusColor }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-1.5 w-1.5"
                            style={{ background: project.statusColor }}
                          />
                        </span>
                        <span className="text-xs" style={{ color: project.statusColor }}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-600 hover:text-white transition-all duration-200 hover:bg-white/5"
                      title="View source"
                    >
                      <GithubIcon size={14} />
                    </a>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-600 hover:text-white transition-all duration-200 hover:bg-white/5"
                      title="Open live site"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Footer: tech stack + deployment info */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--card-bg)",
                          border: "1px solid var(--card-border)",
                          color: "#94a3b8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--card-border)",
                      color: "#64748b",
                    }}
                  >
                    <Zap size={10} className="text-amber-500" />
                    Vercel
                  </div>
                </div>
              </div>

              {/* Bottom gradient accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
