"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

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

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <Navigation onCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <EasterEgg />

      <main className="relative min-h-screen">
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
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
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
