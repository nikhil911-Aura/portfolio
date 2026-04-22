"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

const techs = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68A063" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "Helm", color: "#0F1689" },
  { name: "ArgoCD", color: "#EF7B4D" },
  { name: "MongoDB", color: "#47A248" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Redis", color: "#DC382D" },
  { name: "Prisma", color: "#2D3748" },
  { name: "GenAI", color: "#9333ea" },
  { name: "n8n", color: "#EA4B71" },
  { name: "GraphQL", color: "#E10098" },
];

const doubled = [...techs, ...techs];

export default function TrustBar() {
  const { theme } = useTheme();
  const edgeBg = theme === "light" ? "#f1f5f9" : "#050507";

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${edgeBg}, transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(-90deg, ${edgeBg}, transparent)` }}
      />

      <div className="relative">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-slate-600 tracking-[0.3em] uppercase mb-8"
        >
          Built with
        </motion.p>

        {/* Marquee container */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 gap-6 pr-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {doubled.map((tech, i) => (
              <TechBadge key={`a-${i}`} tech={tech} />
            ))}
          </motion.div>
          <motion.div
            className="flex shrink-0 gap-6 pr-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {doubled.map((tech, i) => (
              <TechBadge key={`b-${i}`} tech={tech} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mt-16 h-[1px] mx-auto"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.3), transparent)",
          maxWidth: "800px",
        }}
      />
    </section>
  );
}

function TechBadge({ tech }: { tech: { name: string; color: string } }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap shrink-0"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
      />
      <span className="text-sm text-slate-300 font-medium">{tech.name}</span>
    </motion.div>
  );
}
