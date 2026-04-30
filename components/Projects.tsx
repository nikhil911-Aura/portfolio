/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
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
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85",
    mockupImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=80",
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
    bgImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=85",
    mockupImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80",
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
    bgImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=85",
    mockupImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
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
    bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
    mockupImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80",
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
  bgImage: string;
  mockupImage: string;
}

interface StackedCardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function StackedCard({ project, index, total, scrollYProgress }: StackedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const n = total;

  // Clip-path wipe in — clips from bottom so title (top) reveals first
  const clipFrom = index === 0 ? "inset(0% 0 0% 0)" : "inset(0% 0 100% 0)";
  const clipRange: [number, number] =
    index === 0
      ? [0, 0.001]
      : [Math.max(0, index / n - 0.02), index / n + 0.07];
  const clipPath = useTransform(scrollYProgress, clipRange, [clipFrom, "inset(0% 0 0% 0)"]);

  // Scale and y when next card enters
  const nextStart = (index + 1) / n;
  const scaleRange: [number, number] =
    index === n - 1 ? [0.99, 1] : [nextStart - 0.01, nextStart + 0.1];
  const scaleValues: [number, number] = index === n - 1 ? [1, 1] : [1, 0.91];
  const yRange: [number, number] =
    index === n - 1 ? [0.99, 1] : [nextStart - 0.01, nextStart + 0.1];
  const yValues: [number, number] = index === n - 1 ? [0, 0] : [0, -55];

  const scale = useTransform(scrollYProgress, scaleRange, scaleValues);
  const y = useTransform(scrollYProgress, yRange, yValues);

  // Background image parallax — moves up as card is active
  const bgStart = index / n;
  const bgEnd = Math.min(1, (index + 1) / n);
  const bgY = useTransform(scrollYProgress, [bgStart, bgEnd], ["0%", "-22%"]);

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
      {/* Full-bleed background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            y: bgY,
            position: "absolute",
            top: "-15%",
            left: 0,
            right: 0,
            bottom: "-15%",
          }}
        >
          <img
            src={project.bgImage}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: isHovered
                ? "grayscale(0%) brightness(0.5)"
                : "grayscale(100%) brightness(0.22)",
              transition: "filter 0.6s ease",
            }}
          />
        </motion.div>
        {/* Content overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.45) 100%)`,
          }}
        />
        {/* Color accent from project color */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 80% 50%, ${project.color}08 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Giant watermark */}
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
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
        }}
      />

      {/* Card content */}
      <div
        className="w-full h-full relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <GithubIcon size={14} />
                </a>
              </div>
            </div>

            {/* Right: mockup image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full" style={{ maxWidth: 440 }}>
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={project.mockupImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isHovered
                        ? "grayscale(0%) brightness(0.95)"
                        : "grayscale(100%) brightness(0.6)",
                      transition: "filter 0.6s ease",
                    }}
                  />
                  {/* Subtle frame tint */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%), linear-gradient(135deg, ${project.color}08 0%, transparent 50%)`,
                    }}
                  />
                  {/* Corner accent dot */}
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                    style={{
                      background: project.color,
                      boxShadow: `0 0 8px ${project.color}`,
                      opacity: isHovered ? 1 : 0.4,
                      transition: "opacity 0.6s ease",
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between px-0.5">
                  <span className="text-xs font-mono text-slate-500">{project.title}</span>
                  <span className="text-xs font-mono text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
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
      {/* Section header */}
      <div className="py-20 text-center">
        <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
          Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Featured{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c084fc, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
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
