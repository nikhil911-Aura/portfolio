"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./icons";

const projects = [
  {
    id: 1,
    title: "DevWorld",
    description:
      "A full-featured MERN-based developer platform with real-time chat, authentication via JWT/OAuth, Razorpay payments, and connection feeds — built for the dev community.",
    live: "https://www.devworld.in/",
    github: "https://github.com/Nick-ui911",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Razorpay", "JWT"],
    color: "#9333ea",
    featured: true,
  },
  {
    id: 2,
    title: "NovaChat AI",
    description:
      "GenAI-powered chat platform with multi-session context management, streaming responses, and a premium glassmorphism UI. Built on top of LLM APIs.",
    live: "https://nova-ai-lyart-pi.vercel.app/",
    github: "https://github.com/Nick-ui911",
    tech: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "#06b6d4",
    featured: true,
  },
  {
    id: 3,
    title: "Book Your Event",
    description:
      "Full-stack event booking platform with real-time availability, secure payment flow, email confirmations, and an admin dashboard for event management.",
    live: "https://book-your-event.vercel.app/",
    github: "https://github.com/Nick-ui911",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Nodemailer"],
    color: "#3b82f6",
    featured: false,
  },
  {
    id: 4,
    title: "MotoPulse",
    description:
      "Next.js SSR application for motorcycle enthusiasts with server-side rendering, Prisma ORM, PostgreSQL database, and optimized performance metrics.",
    live: "https://moto-pulse.vercel.app/",
    github: "https://github.com/Nick-ui911",
    tech: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    color: "#ec4899",
    featured: false,
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  live: string;
  github: string;
  tech: string[];
  color: string;
  featured: boolean;
}

interface StackedCardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function StackedCard({ project, index, total, scrollYProgress }: StackedCardProps) {
  const n = total; // 4

  // Clip-path: this card wipes in from below
  // Card 0 is already visible. Cards 1-3 wipe in.
  const clipFrom = index === 0 ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)";
  const clipRange =
    index === 0
      ? ([0, 0.001] as [number, number])
      : ([Math.max(0, index / n - 0.02), index / n + 0.07] as [number, number]);
  const clipPath = useTransform(scrollYProgress, clipRange, [clipFrom, "inset(0% 0 0% 0)"]);

  // Scale and y: this card gets pushed back when the NEXT card enters
  const nextStart = (index + 1) / n;
  const scaleRange: [number, number] =
    index === n - 1 ? [0.99, 1] : [nextStart - 0.01, nextStart + 0.1];
  const scaleValues: [number, number] = index === n - 1 ? [1, 1] : [1, 0.91];
  const yRange: [number, number] =
    index === n - 1 ? [0.99, 1] : [nextStart - 0.01, nextStart + 0.1];
  const yValues: [number, number] = index === n - 1 ? [0, 0] : [0, -55];

  const scale = useTransform(scrollYProgress, scaleRange, scaleValues);
  const y = useTransform(scrollYProgress, yRange, yValues);

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: index + 1,
        clipPath,
        scale,
        y,
        overflow: "hidden",
      }}
    >
      {/* Full viewport card content */}
      <div
        className="w-full h-full relative flex items-center"
        style={{ background: "var(--bg)" }}
      >
        {/* Giant project number watermark */}
        <div
          className="absolute select-none pointer-events-none font-black"
          style={{
            right: "4vw",
            bottom: "4vh",
            fontSize: "clamp(8rem, 22vw, 20rem)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.018)",
            fontFamily: "monospace",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: project info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                {project.featured && (
                  <span
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <Star size={9} /> Featured
                  </span>
                )}
                <span className="text-xs font-mono text-slate-600">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <h3
                className="font-black text-white mb-4"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h3>

              <p className="text-slate-400 leading-relaxed mb-6 text-base max-w-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}25`,
                      color: project.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                    boxShadow: `0 0 24px ${project.color}35`,
                  }}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <GithubIcon size={14} />
                </a>
              </div>
            </div>

            {/* Right: decorative glass panel */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full" style={{ maxWidth: 420 }}>
                <div
                  className="rounded-2xl relative overflow-hidden"
                  style={{
                    aspectRatio: "16/10",
                    background: `${project.color}05`,
                    border: `1px solid ${project.color}25`,
                    boxShadow: `0 0 80px ${project.color}10, inset 0 1px 0 rgba(255,255,255,0.04)`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 25% 35%, ${project.color}25 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, ${project.color}12 0%, transparent 50%)`,
                    }}
                  />
                  {/* Tech stack grid */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-3 p-8">
                      {project.tech.slice(0, 6).map((t, ti) => (
                        <div
                          key={ti}
                          className="text-xs font-mono font-semibold text-center px-2 py-1.5 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Corner glow */}
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                    style={{
                      background: project.color,
                      boxShadow: `0 0 8px ${project.color}`,
                    }}
                  />
                </div>
                {/* Shadow below */}
                <div
                  className="absolute -bottom-4 left-8 right-8 h-8 rounded-full pointer-events-none"
                  style={{ background: `${project.color}15`, filter: "blur(12px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects">
      {/* Section header — scrolls normally above the stack */}
      <div className="py-20 text-center">
        <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
          Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Featured{" "}
          <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 text-slate-500">Real products shipped to production.</p>
      </div>

      {/* Stacked cards container */}
      <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, i) => (
          <StackedCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
