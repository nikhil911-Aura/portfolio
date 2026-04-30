/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    image: "/images/image12.jpg",
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
    image: "/images/image13.jpg",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG path draw — uses getTotalLength for accurate animation
      const path = svgPathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 1.4,
          },
        });
      }

      // Cards fly in from right, staggered per card
      sectionRef.current?.querySelectorAll<HTMLElement>(".exp-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reset",
            },
          }
        );

        // Node pops in with elastic spring
        const node = sectionRef.current?.querySelectorAll<HTMLElement>(".timeline-node")[i];
        if (node) {
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                toggleActions: "play none none reset",
              },
            }
          );
        }

        // Bullet points reveal one by one
        card.querySelectorAll<HTMLElement>(".exp-bullet").forEach((bullet) => {
          gsap.fromTo(
            bullet,
            { x: -14, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.38,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bullet,
                start: "top 90%",
                toggleActions: "play none none reset",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(147,51,234,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">Career</p>
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
          {/* SVG path that draws on scroll */}
          <svg
            ref={svgRef}
            className="absolute hidden sm:block pointer-events-none"
            style={{ left: 23, top: 0, width: 2, height: "100%", overflow: "visible" }}
            preserveAspectRatio="none"
          >
            {/* Track (static, dim) */}
            <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            {/* Animated fill path */}
            <path
              ref={svgPathRef}
              d="M1 0 L1 10000"
              stroke="url(#timelineGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="60%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative sm:pl-16">
                {/* Timeline node */}
                <div
                  className="timeline-node absolute left-0 top-6 hidden sm:flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative"
                    style={{
                      background: `${exp.color}15`,
                      border: `2px solid ${exp.color}50`,
                      boxShadow: exp.current ? `0 0 20px ${exp.color}35` : "none",
                    }}
                  >
                    {exp.current && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: `${exp.color}20` }}
                      />
                    )}
                    <Briefcase size={15} style={{ color: exp.color }} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="exp-card rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--card-bg)",
                    border: exp.current ? `1px solid ${exp.color}30` : "1px solid var(--card-border)",
                    boxShadow: exp.current ? `0 0 30px ${exp.color}08` : "none",
                    opacity: 0,
                  }}
                >
                  {exp.current && (
                    <div
                      className="px-5 py-2 flex items-center gap-2"
                      style={{ background: `${exp.color}10`, borderBottom: `1px solid ${exp.color}20` }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: exp.color }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: exp.color }} />
                      </span>
                      <span className="text-xs font-medium" style={{ color: exp.color }}>
                        Currently Working Here
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="grid lg:grid-cols-[1fr_220px] gap-6 items-start">
                      {/* Left: all content */}
                      <div>
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-base font-semibold" style={{ color: exp.color }}>
                                {exp.company}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                              >
                                {exp.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Calendar size={11} />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <MapPin size={11} />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <ul className="flex flex-col gap-2.5 mb-5">
                          {exp.highlights.map((h) => (
                            <li key={h} className="exp-bullet flex items-start gap-2.5 text-sm text-slate-400">
                              <div
                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: exp.color }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2.5 py-1 rounded-lg"
                              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "#94a3b8" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: company image */}
                      <div
                        className="hidden lg:block relative overflow-hidden self-stretch"
                        style={{ minHeight: 180 }}
                      >
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            filter: "grayscale(100%) brightness(0.6)",
                            transition: "filter 0.6s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLImageElement).style.filter =
                              "grayscale(0%) brightness(0.9)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLImageElement).style.filter =
                              "grayscale(100%) brightness(0.6)";
                          }}
                        />
                        {/* Bottom fade */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                          style={{
                            background: "linear-gradient(to top, var(--card-bg), transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
