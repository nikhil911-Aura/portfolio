"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import NoiseGrain from "@/components/NoiseGrain";
import HeroNew from "@/components/HeroNew";
import MarqueeNew from "@/components/MarqueeNew";
import AboutNew from "@/components/AboutNew";
import Skills from "@/components/Skills";
import ServicesNew from "@/components/ServicesNew";
import ProjectsNew from "@/components/ProjectsNew";
import GitHub from "@/components/GitHub";
import LeetCode from "@/components/LeetCode";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

export default function Home() {
  // Lenis smooth scroll
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      } as ConstructorParameters<typeof Lenis>[0]);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis!.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    });
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <NoiseGrain />
      <ChatWidget />

      <main style={{ background: "#0C0C0C", overflowX: "clip" }}>
        <HeroNew />
        <MarqueeNew />
        <AboutNew />
        <Skills />
        <ServicesNew />
        <ProjectsNew />
        <GitHub />
        <LeetCode />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
