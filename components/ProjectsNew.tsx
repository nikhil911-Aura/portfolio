"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInView from "./FadeInView";

interface Project {
  num: string;
  category: string;
  title: string;
  live: string;
  col1a: string;
  col1b: string;
  col2: string;
}

const projects: Project[] = [
  {
    num: "01",
    category: "Full Stack Platform",
    title: "DevWorld",
    live: "https://www.devworld.in/",
    col1a: "/images/opt/image4.webp",
    col1b: "/images/opt/image8.webp",
    col2: "/images/opt/image5.webp",
  },
  {
    num: "02",
    category: "GenAI Product",
    title: "NovaChat AI",
    live: "https://nova-ai-lyart-pi.vercel.app/",
    col1a: "/images/opt/image9.webp",
    col1b: "/images/opt/image6.webp",
    col2: "/images/opt/image7.webp",
  },
  {
    num: "03",
    category: "Event Booking App",
    title: "Book Your Event",
    live: "https://book-your-event.vercel.app/",
    col1a: "/images/opt/image6.webp",
    col1b: "/images/opt/image10.webp",
    col2: "/images/opt/image11.webp",
  },
  {
    num: "04",
    category: "Next.js SSR App",
    title: "MotoPulse",
    live: "https://moto-pulse.vercel.app/",
    col1a: "/images/opt/image7.webp",
    col1b: "/images/opt/image11.webp",
    col2: "/images/opt/image12.webp",
  },
  {
    num: "05",
    category: "Project Management",
    title: "Karya",
    live: "https://karya.ibrcloud.com/",
    col1a: "/images/opt/image1.webp",
    col1b: "/images/opt/image2.webp",
    col2: "/images/opt/image3.webp",
  },
];

const TOTAL = projects.length;
const CARD_RADIUS = "clamp(2rem, 4vw, 3.75rem)";

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;

  const scaleStart = index < TOTAL - 1 ? (index + 1) / TOTAL - 0.05 : 0.98;
  const scaleEnd = index < TOTAL - 1 ? (index + 1) / TOTAL + 0.05 : 1;
  const scale = useTransform(scrollYProgress, [scaleStart, scaleEnd], [1, targetScale]);

  // left column is 40% of the card, right column 60% — tell the optimizer so
  // it never ships more pixels than the box can show
  const LEFT_SIZES = "(max-width: 768px) 40vw, 38vw";
  const RIGHT_SIZES = "(max-width: 768px) 60vw, 57vw";

  return (
    <div style={{ height: "85vh", position: "sticky", top: `calc(6rem + ${index * 28}px)` }}>
      <motion.div
        style={{
          scale,
          // keep the card on its own GPU layer: the scale transform then
          // composites instead of repainting the image grid every frame
          willChange: "transform",
          backfaceVisibility: "hidden",
          height: "100%",
          background: "#0C0C0C",
          borderRadius: CARD_RADIUS,
          border: "2px solid #D7E2EA",
          padding: "clamp(1rem, 2vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
          overflow: "hidden",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontWeight: 900,
              color: "#D7E2EA",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              lineHeight: 1,
              opacity: 0.25,
              userSelect: "none",
            }}
          >
            {project.num}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1 }}>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                color: "#D7E2EA",
                fontWeight: 900,
                fontSize: "clamp(1.2rem, 3vw, 2.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </span>
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: "9999px",
              border: "2px solid #D7E2EA",
              color: "#D7E2EA",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "clamp(0.6rem, 0.9vw, 0.85rem)",
              padding: "clamp(0.5rem,0.8vw,0.875rem) clamp(1.25rem,2vw,2.5rem)",
              textDecoration: "none",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(215,226,234,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Live Project
          </a>
        </div>

        {/* Bottom row: image grid */}
        <div style={{ display: "flex", gap: "clamp(0.5rem, 1vw, 0.75rem)", flex: 1, minHeight: 0 }}>
          {/* Left col: 2 stacked images (40%) */}
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.5rem, 1vw, 0.75rem)",
            }}
          >
            <div style={{ position: "relative", flex: "0 0 clamp(130px, 16vw, 230px)", overflow: "hidden", borderRadius: CARD_RADIUS }}>
              <Image
                src={project.col1a}
                alt={`${project.title} preview`}
                fill
                sizes={LEFT_SIZES}
                priority={index === 0}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "relative", flex: "0 0 clamp(160px, 22vw, 340px)", overflow: "hidden", borderRadius: CARD_RADIUS }}>
              <Image
                src={project.col1b}
                alt={`${project.title} preview`}
                fill
                sizes={LEFT_SIZES}
                priority={index === 0}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right col: 1 tall image (60%) */}
          <div style={{ position: "relative", width: "60%", overflow: "hidden", borderRadius: CARD_RADIUS }}>
            <Image
              src={project.col2}
              alt={`${project.title} preview`}
              fill
              sizes={RIGHT_SIZES}
              priority={index === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsNew() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      style={{
        background: "#0C0C0C",
        borderRadius: "clamp(2.5rem, 5vw, 3.75rem) clamp(2.5rem, 5vw, 3.75rem) 0 0",
        marginTop: "clamp(-2.5rem, -3.5vw, -3.5rem)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(3rem, 5vw, 5rem) clamp(1.25rem, 3vw, 2.5rem) 0",
      }}
    >
      {/* Heading */}
      <FadeInView delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
        <h2
          className="hero-heading"
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            fontSize: "clamp(3rem, 12vw, 160px)",
          }}
        >
          Projects
        </h2>
      </FadeInView>

      {/* Sticky stacking cards */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL * 100}vh` }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* Bottom padding */}
      <div style={{ height: "5rem" }} />
    </section>
  );
}
