"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight, Star } from "lucide-react";
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
    gradient: "from-purple-500/20 to-blue-500/20",
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
    gradient: "from-cyan-500/20 to-blue-500/20",
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
    gradient: "from-blue-500/20 to-indigo-500/20",
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
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)",
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
            Portfolio
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Projects
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Real products shipped to production — not just side projects.
          </p>
        </motion.div>

        {/* Featured projects — large */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter((p) => p.featured).map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} inView={inView} large />
          ))}
        </div>

        {/* Other projects — smaller */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter((p) => !p.featured).map((project, i) => (
            <TiltCard key={project.id} project={project} index={i + 2} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  project,
  index,
  inView,
  large,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group"
    >
      <motion.div
        className={`relative rounded-2xl overflow-hidden ${large ? "p-6" : "p-5"} transition-all duration-300`}
        style={{
          background: "var(--card-bg)",
          border: isHovered ? `1px solid ${project.color}40` : "1px solid var(--card-border)",
          boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}15` : "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${project.color}08 0%, transparent 70%)`,
          }}
        />

        {/* Top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {project.featured && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={10} style={{ color: project.color }} />
                  <span className="text-xs font-medium" style={{ color: project.color }}>
                    Featured
                  </span>
                </div>
              )}
              <h3 className={`font-bold text-white ${large ? "text-2xl" : "text-lg"}`}>
                {project.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
              }}
            >
              <ArrowUpRight size={14} style={{ color: project.color }} />
            </motion.div>
          </div>

          {/* Description */}
          <p className={`text-slate-400 leading-relaxed mb-4 ${large ? "text-sm" : "text-xs"}`}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}20`,
                  color: project.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${project.color}cc, ${project.color}99)`,
                boxShadow: isHovered ? `0 0 20px ${project.color}40` : "none",
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-all duration-200"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <GithubIcon size={14} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
