"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHub from "@/components/GitHub";
import LeetCode from "@/components/LeetCode";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

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

      <main className="relative bg-[#050507] min-h-screen">
        <Hero />
        <TrustBar />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHub />
        <LeetCode />
        <Contact />
        <Footer />
      </main>

      {/* Easter egg hint */}
      <div
        className="fixed bottom-4 right-4 text-xs text-slate-800 z-30 select-none"
        title="Press ⌘K to open command palette"
      >
        ⌘K
      </div>
    </>
  );
}
