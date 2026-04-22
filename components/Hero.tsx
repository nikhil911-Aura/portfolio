"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Mail, ExternalLink, Rocket } from "lucide-react";
import { GithubIcon } from "./icons";
import { TypeAnimation } from "react-type-animation";

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#050507]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(147,51,234,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(147,51,234,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Three.js canvas — right side */}
      <div className="absolute inset-0 lg:left-1/2">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(147,51,234,0.1)",
                  border: "1px solid rgba(147,51,234,0.3)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <span className="text-purple-300">
                  Open to opportunities — Available for hire
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-white">Hi, I&apos;m</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #3b82f6, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nikhil Singh
                </span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="text-slate-400 text-xl">I&apos;m a</span>
              <span
                className="text-xl font-semibold"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <TypeAnimation
                  sequence={[
                    "Full Stack Engineer",
                    2000,
                    "DevOps Engineer",
                    2000,
                    "GenAI Builder",
                    2000,
                    "Problem Solver",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg leading-relaxed max-w-xl"
            >
              I build scalable systems, automate workflows, and integrate AI into
              real-world products. Passionate about cloud-native architecture and
              developer tooling.
            </motion.p>

            {/* Current role */}
            <motion.div variants={itemVariants}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                <Rocket size={14} className="text-cyan-400" />
                <span className="text-cyan-300">
                  Currently building cloud-native apps at{" "}
                  <strong className="text-cyan-200">IBR Infotech LLP</strong>
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              <MagneticButton
                onClick={() => scrollToSection("#projects")}
                primary
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                href="https://github.com/Nick-ui911"
                target="_blank"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ExternalLink size={12} className="opacity-50" />
              </MagneticButton>

              <MagneticButton onClick={() => scrollToSection("#contact")}>
                <Mail size={16} />
                <span>Contact Me</span>
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-6 pt-4 border-t border-white/5"
            >
              {[
                { label: "Projects Shipped", value: "10+" },
                { label: "Technologies", value: "20+" },
                { label: "GitHub Repos", value: "30+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side — Three.js fills this space on desktop */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-linear-to-b from-purple-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  primary?: boolean;
}

function MagneticButton({ children, onClick, href, target, primary }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  };

  const commonClass = `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
    primary
      ? "text-white"
      : "text-slate-300 hover:text-white"
  }`;

  const commonStyle = primary
    ? {
        background: "linear-gradient(135deg, #9333ea, #3b82f6)",
        boxShadow: "0 0 25px rgba(147,51,234,0.35)",
      }
    : {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      };

  const content = href ? (
    <a href={href} target={target} rel="noopener noreferrer" className={commonClass} style={commonStyle}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={commonClass} style={commonStyle}>
      {children}
    </button>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.1s ease", display: "inline-block" }}
    >
      {content}
    </div>
  );
}
