"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import VercelProjects from "@/components/VercelProjects";
import GitHub from "@/components/GitHub";
import LeetCode from "@/components/LeetCode";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";
import RobotAvatar from "@/components/RobotAvatar";
import ChatWidget from "@/components/ChatWidget";
import NoiseGrain from "@/components/NoiseGrain";
import SectionDots from "@/components/SectionDots";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

// Subtle bg tints per section — barely perceptible, feels like the page breathes
const BG_TINTS: Record<string, string> = {
  hero:       "rgba(147,51,234,0)",
  about:      "rgba(147,51,234,0.012)",
  skills:     "rgba(6,182,212,0.012)",
  experience: "rgba(147,51,234,0.010)",
  projects:   "rgba(0,0,0,0)",
  github:     "rgba(6,182,212,0.008)",
  contact:    "rgba(147,51,234,0.015)",
};

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        infinite: false,
      } as ConstructorParameters<typeof Lenis>[0]);

      // Sync GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Velocity blur — subtle motion feel when scrolling fast
      lenis.on("scroll", ({ velocity }: { velocity: number }) => {
        const blur = Math.min(Math.abs(velocity) * 0.18, 1.2);
        const mainEl = document.getElementById("main-content");
        if (mainEl) {
          mainEl.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : "";
        }
      });

      gsap.ticker.add((time) => lenis!.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("load", () => ScrollTrigger.refresh());
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  // ── Background breathing ──
  useEffect(() => {
    const bgOverlay = document.getElementById("bg-tint-overlay");
    if (!bgOverlay) return;

    const sections = Object.keys(BG_TINTS);
    const triggers = sections.map((id) => {
      const tint = BG_TINTS[id];
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(bgOverlay, { background: tint, duration: 1.2, ease: "power2.out" }),
        onEnterBack: () => gsap.to(bgOverlay, { background: tint, duration: 1.2, ease: "power2.out" }),
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Background tint overlay — breathes between sections */}
      <div
        id="bg-tint-overlay"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, transition: "background 0s" }}
      />

      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <SectionDots />
      <Navigation onCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <EasterEgg />
      <NoiseGrain />
      <RobotAvatar />
      <ChatWidget />

      <main id="main-content" className="relative min-h-screen" style={{ zIndex: 1 }}>
        <Hero />
        <TrustBar />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <VercelProjects />
        <GitHub />
        <LeetCode />
        <Contact />
        <Footer />
      </main>

      {/* Mobile FAB — command palette trigger */}
      {isMobile && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCommandOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #9333ea, #3b82f6)",
            boxShadow: "0 0 30px rgba(147,51,234,0.4), 0 4px 20px rgba(0,0,0,0.3)",
          }}
          aria-label="Open command palette"
        >
          <Terminal size={18} />
        </motion.button>
      )}
    </>
  );
}
