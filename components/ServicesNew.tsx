"use client";

import { motion } from "framer-motion";
import FadeInView from "./FadeInView";

const services = [
  {
    num: "01",
    name: "Full Stack Development",
    desc: "Building end-to-end MERN stack applications with clean architecture, optimized performance, and production-grade reliability.",
  },
  {
    num: "02",
    name: "DevOps & Cloud",
    desc: "Implementing CI/CD pipelines, Kubernetes orchestration, Helm charts, ArgoCD GitOps, and AWS infrastructure for scalable deployments.",
  },
  {
    num: "03",
    name: "GenAI & Automation",
    desc: "Creating AI-powered workflows, n8n automations, LLM integrations, and intelligent bots that save time and scale operations.",
  },
  {
    num: "04",
    name: "Backend Engineering",
    desc: "Designing scalable REST APIs, microservices, WebSocket systems, and cloud-native backends built for performance.",
  },
  {
    num: "05",
    name: "UI/UX & Frontend",
    desc: "Crafting responsive, pixel-perfect interfaces with React, Next.js, TypeScript, and Framer Motion animations.",
  },
];

export default function ServicesNew() {
  return (
    <section
      id="services"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "clamp(2.5rem, 5vw, 3.75rem) clamp(2.5rem, 5vw, 3.75rem) 0 0",
        padding: "clamp(5rem, 8vw, 8rem) clamp(1.25rem, 5vw, 2.5rem)",
      }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.18) saturate(0.6)",
        }}
      />

      {/* Dark gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(12,12,12,0.7) 0%, rgba(12,12,12,0.4) 50%, rgba(12,12,12,0.85) 100%)",
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(165,180,252,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Section heading */}
        <FadeInView delay={0} y={40} style={{ textAlign: "center" }}>
          <h2
            className="hero-heading"
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3rem, 12vw, 160px)",
              marginBottom: "clamp(4rem, 7vw, 7rem)",
            }}
          >
            Services
          </h2>
        </FadeInView>

        {/* Service list */}
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          {services.map((s, i) => (
            <FadeInView key={s.num} delay={i * 0.1} y={20}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(1rem, 3vw, 2.5rem)",
                  padding: "clamp(2rem, 3vw, 3rem) 0",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderBottomColor = "rgba(192,132,252,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderBottomColor = "rgba(255,255,255,0.1)";
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.12)",
                    fontSize: "clamp(3rem, 9vw, 140px)",
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {s.num}
                </span>

                {/* Name + desc */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    paddingTop: "0.5em",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#f1f5f9",
                      fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontWeight: 300,
                      color: "#94a3b8",
                      lineHeight: 1.65,
                      maxWidth: "42rem",
                      fontSize: "clamp(0.82rem, 1.5vw, 1.1rem)",
                    }}
                  >
                    {s.desc}
                  </span>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
