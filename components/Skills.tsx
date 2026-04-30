"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Layers, Server, Database, Cloud, Cpu } from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    subtitle: "Interfaces people love to use",
    icon: Layers,
    color: "#3b82f6",
    num: "01",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux", level: 80 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    subtitle: "APIs and systems built to scale",
    icon: Server,
    color: "#9333ea",
    num: "02",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "WebSockets", level: 72 },
      { name: "GraphQL", level: 70 },
      { name: "Microservices", level: 75 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    subtitle: "Data stored and retrieved fast",
    icon: Database,
    color: "#06b6d4",
    num: "03",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Mongoose", level: 85 },
      { name: "Prisma", level: 78 },
      { name: "Redis", level: 72 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    subtitle: "Ship fast, stay reliable",
    icon: Cloud,
    color: "#ec4899",
    num: "04",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 78 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 82 },
      { name: "Helm", level: 72 },
      { name: "ArgoCD", level: 70 },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    subtitle: "Building with intelligence",
    icon: Cpu,
    color: "#f59e0b",
    num: "05",
    skills: [
      { name: "OpenAI API", level: 82 },
      { name: "GenAI APIs", level: 80 },
      { name: "Prompt Eng.", level: 78 },
      { name: "n8n", level: 75 },
      { name: "LangChain", level: 65 },
    ],
  },
];

function levelDots(level: number) {
  const filled = Math.round(level / 25);
  return Array.from({ length: 4 }, (_, i) => i < filled);
}

type Category = (typeof skillCategories)[0];

function BentoCard({
  cat,
  animIndex,
  className,
}: {
  cat: Category;
  animIndex: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = cat.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -7, y: cx * 7 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: animIndex * 0.1, duration: 0.55, ease: "easeOut" }}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden p-6 cursor-default"
        style={{
          background: hovered ? `${cat.color}0e` : `${cat.color}07`,
          border: `1px solid ${hovered ? cat.color + "2a" : cat.color + "14"}`,
          boxShadow: hovered
            ? `0 24px 60px ${cat.color}10, 0 0 0 1px ${cat.color}18`
            : "none",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? "transform 0.07s linear, background 0.3s, border-color 0.3s, box-shadow 0.3s"
            : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s, border-color 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHovered(false);
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${cat.color}${hovered ? "80" : "30"}, transparent)`,
          }}
        />

        {/* Watermark number */}
        <div
          className="absolute right-4 bottom-2 select-none pointer-events-none font-black"
          style={{
            fontSize: "clamp(4rem, 8vw, 7.5rem)",
            lineHeight: 1,
            color: `${cat.color}${hovered ? "0d" : "06"}`,
            fontFamily: "monospace",
            transition: "color 0.3s",
          }}
        >
          {cat.num}
        </div>

        {/* Ambient glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${cat.color}12 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `${cat.color}14`,
                border: `1px solid ${cat.color}22`,
                boxShadow: hovered ? `0 0 20px ${cat.color}20` : "none",
                transition: "box-shadow 0.3s",
              }}
            >
              <Icon size={20} style={{ color: cat.color }} />
            </div>
            <span
              className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg"
              style={{
                background: `${cat.color}0e`,
                color: `${cat.color}99`,
                border: `1px solid ${cat.color}18`,
              }}
            >
              {cat.skills.length} skills
            </span>
          </div>

          {/* Title + subtitle */}
          <h3
            className="text-lg xl:text-xl font-bold text-white leading-tight mb-1"
            style={{
              textShadow: hovered ? `0 0 24px ${cat.color}28` : "none",
              transition: "text-shadow 0.3s",
            }}
          >
            {cat.label}
          </h3>
          <p className="text-xs text-slate-600 mb-5 leading-relaxed">{cat.subtitle}</p>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {cat.skills.map((skill, si) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: animIndex * 0.1 + si * 0.045 + 0.25,
                  duration: 0.3,
                  ease: "backOut",
                }}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{
                  background: `${cat.color}0e`,
                  border: `1px solid ${cat.color}20`,
                  color: cat.color,
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>

          {/* Level dots row */}
          <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${cat.color}0f` }}>
            <div className="flex items-center gap-1">
              {levelDots(
                Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length)
              ).map((filled, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: filled ? 18 : 6,
                    height: 4,
                    background: filled ? cat.color : `${cat.color}22`,
                    boxShadow: filled && hovered ? `0 0 6px ${cat.color}` : "none",
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-600 font-mono">
              avg{" "}
              {Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile accordion card
function MobileCard({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [open, setOpen] = useState(false);
  const Icon = cat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? `${cat.color}09` : "var(--card-bg)",
        border: `1px solid ${open ? cat.color + "28" : "var(--card-border)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: open ? `${cat.color}18` : `${cat.color}10`,
            border: `1px solid ${cat.color}22`,
          }}
        >
          <Icon size={17} style={{ color: cat.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{cat.label}</p>
          <p className="text-xs text-slate-600 truncate">{cat.subtitle}</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-xs font-mono font-bold" style={{ color: cat.color }}>
            {cat.skills.length}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 5L7 9L11 5"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 flex flex-col gap-2">
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: si * 0.04 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{
                    background: `${cat.color}07`,
                    border: `1px solid ${cat.color}14`,
                  }}
                >
                  <span className="text-xs font-semibold text-white flex-1">{skill.name}</span>
                  <div
                    className="w-16 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, delay: si * 0.05, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`,
                      }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: `${cat.color}14`,
                      color: cat.color,
                      border: `1px solid ${cat.color}22`,
                    }}
                  >
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(147,51,234,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
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
          <p className="mt-4 text-slate-500 text-sm">
            5 domains · 28 technologies
          </p>
        </motion.div>

        {/* ── Desktop bento grid ── */}
        <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Frontend — large card */}
          <BentoCard
            cat={skillCategories[0]}
            animIndex={0}
            className="col-span-7 row-span-1"
          />
          {/* Backend */}
          <BentoCard
            cat={skillCategories[1]}
            animIndex={1}
            className="col-span-5 row-span-1"
          />
          {/* Databases */}
          <BentoCard
            cat={skillCategories[2]}
            animIndex={2}
            className="col-span-4 row-span-1"
          />
          {/* DevOps */}
          <BentoCard
            cat={skillCategories[3]}
            animIndex={3}
            className="col-span-4 row-span-1"
          />
          {/* AI */}
          <BentoCard
            cat={skillCategories[4]}
            animIndex={4}
            className="col-span-4 row-span-1"
          />
        </div>

        {/* ── Mobile accordion ── */}
        <div className="md:hidden flex flex-col gap-2.5">
          {skillCategories.map((cat, i) => (
            <MobileCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* All-tech cloud footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 py-6 px-6 rounded-2xl text-center"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <p className="text-[10px] text-slate-700 tracking-[0.3em] uppercase mb-4">
            All Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <span
                  key={`${cat.id}-${skill.name}`}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-default"
                  style={{
                    background: `${cat.color}0d`,
                    border: `1px solid ${cat.color}22`,
                    color: cat.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${cat.color}1a`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${cat.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${cat.color}0d`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
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
