"use client";

const ALL_SKILLS = [
  // Frontend
  { name: "React",         category: "Frontend",   color: "#a5b4fc", icon: "⚛" },
  { name: "Next.js",       category: "Frontend",   color: "#a5b4fc", icon: "▲" },
  { name: "TypeScript",    category: "Frontend",   color: "#a5b4fc", icon: "TS" },
  { name: "Tailwind CSS",  category: "Frontend",   color: "#a5b4fc", icon: "🎨" },
  { name: "Redux",         category: "Frontend",   color: "#a5b4fc", icon: "🔄" },
  { name: "Framer Motion", category: "Frontend",   color: "#a5b4fc", icon: "✦" },
  // Backend
  { name: "Node.js",       category: "Backend",    color: "#c084fc", icon: "⬡" },
  { name: "Express.js",    category: "Backend",    color: "#c084fc", icon: "🚂" },
  { name: "REST APIs",     category: "Backend",    color: "#c084fc", icon: "⇄" },
  { name: "WebSockets",    category: "Backend",    color: "#c084fc", icon: "⚡" },
  { name: "GraphQL",       category: "Backend",    color: "#c084fc", icon: "◈" },
  { name: "Microservices", category: "Backend",    color: "#c084fc", icon: "⊞" },
  // Databases
  { name: "MongoDB",       category: "Database",   color: "#67e8f9", icon: "🍃" },
  { name: "PostgreSQL",    category: "Database",   color: "#67e8f9", icon: "🐘" },
  { name: "Mongoose",      category: "Database",   color: "#67e8f9", icon: "◎" },
  { name: "Prisma",        category: "Database",   color: "#67e8f9", icon: "△" },
  { name: "Redis",         category: "Database",   color: "#67e8f9", icon: "⬡" },
  // DevOps
  { name: "Docker",        category: "DevOps",     color: "#f9a8d4", icon: "🐳" },
  { name: "Kubernetes",    category: "DevOps",     color: "#f9a8d4", icon: "☸" },
  { name: "AWS",           category: "DevOps",     color: "#f9a8d4", icon: "☁" },
  { name: "CI/CD",         category: "DevOps",     color: "#f9a8d4", icon: "∞" },
  { name: "Helm",          category: "DevOps",     color: "#f9a8d4", icon: "⛵" },
  { name: "ArgoCD",        category: "DevOps",     color: "#f9a8d4", icon: "🔁" },
  // AI
  { name: "OpenAI API",    category: "AI & Auto",  color: "#fcd34d", icon: "🤖" },
  { name: "GenAI APIs",    category: "AI & Auto",  color: "#fcd34d", icon: "✦" },
  { name: "Prompt Eng.",   category: "AI & Auto",  color: "#fcd34d", icon: "💬" },
  { name: "n8n",           category: "AI & Auto",  color: "#fcd34d", icon: "⚙" },
  { name: "LangChain",     category: "AI & Auto",  color: "#fcd34d", icon: "🔗" },
];

const row1Base = ALL_SKILLS.slice(0, 14);
const row2Base = ALL_SKILLS.slice(14);
// Quadruple for extra smooth seamless loop
const row1 = [...row1Base, ...row1Base, ...row1Base, ...row1Base];
const row2 = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

function SkillCard({ skill }: { skill: typeof ALL_SKILLS[0] }) {
  return (
    <div
      style={{
        width: 200,
        height: 120,
        flexShrink: 0,
        borderRadius: "1.25rem",
        background: `${skill.color}0c`,
        border: `1.5px solid ${skill.color}28`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem 1.15rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s, background 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = `${skill.color}18`;
        el.style.borderColor = `${skill.color}55`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = `${skill.color}0c`;
        el.style.borderColor = `${skill.color}28`;
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 2,
          borderRadius: "0 0 4px 4px",
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
        }}
      />

      {/* Icon + category badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{skill.icon}</span>
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: skill.color,
            background: `${skill.color}14`,
            border: `1px solid ${skill.color}22`,
            padding: "2px 7px",
            borderRadius: "999px",
          }}
        >
          {skill.category}
        </span>
      </div>

      {/* Skill name */}
      <p
        style={{
          color: "#D7E2EA",
          fontWeight: 700,
          fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {skill.name}
      </p>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          right: 8,
          fontSize: "3.5rem",
          lineHeight: 1,
          color: `${skill.color}08`,
          fontWeight: 900,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {skill.icon}
      </div>
    </div>
  );
}

export default function MarqueeNew() {
  return (
    <div
      style={{
        background: "#0C0C0C",
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(3rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .marquee-row:hover { animation-play-state: paused !important; }
        .marquee-row > * { pointer-events: auto; }
      `}</style>

      {/* Row 1 — scrolls left */}
      <div
        className="marquee-row"
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 12,
          width: "max-content",
          animation: "marquee-left 30s linear infinite",
          willChange: "transform",
        }}
      >
        {row1.map((skill, i) => (
          <SkillCard key={i} skill={skill} />
        ))}
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="marquee-row"
        style={{
          display: "flex",
          gap: 12,
          width: "max-content",
          animation: "marquee-right 35s linear infinite",
          willChange: "transform",
        }}
      >
        {row2.map((skill, i) => (
          <SkillCard key={i} skill={skill} />
        ))}
      </div>
    </div>
  );
}
