"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const MESSAGES = [
  "Hey! I'm Bot-NS 🤖",
  "Press ⌘K to navigate!",
  "Try ↑↑↓↓←→←→BA 😏",
  "Available for hire 💼",
  "Check my projects! 🚀",
  "Built with Next.js ⚡",
];

const FACTS = [
  "🐛 The first real computer bug was a moth found in Harvard's Mark II relay in 1947!",
  "⚡ JavaScript was written in just 10 days by Brendan Eich in 1995.",
  "🐧 Linux powers 96% of the world's top 1 million web servers.",
  "🌐 The first website ever made is still live — info.cern.ch",
  "🐍 Python was named after Monty Python, not the snake.",
  "🔬 Moore's Law: CPU transistor count doubles roughly every 2 years.",
  "👩‍💻 Ada Lovelace wrote the world's first algorithm in the 1840s.",
  "⚛️ React was open-sourced by Facebook in 2013 and now powers ~40% of the web.",
  "🎮 The average webpage today is heavier than the original DOOM game.",
  "🔀 Git was created by Linus Torvalds in just 10 days in 2005.",
  "☁️ AWS has 200+ cloud services and runs ~33% of the internet.",
  "🤖 There are over 700 programming languages in existence today.",
  "📡 The first domain ever registered was symbolics.com — March 15, 1985.",
  "🔐 The most common password is still '123456'. Please don't. 😬",
  "📦 npm has over 2.5 million packages — more than any other registry.",
];

function RobotSVG({ blinking, waving }: { blinking: boolean; waving: boolean }) {
  return (
    <svg
      width="72"
      height="96"
      viewBox="0 0 72 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Antenna ── */}
      <line x1="36" y1="8" x2="36" y2="-4" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
      <motion.circle
        cx="36"
        cy="-8"
        r="4"
        fill="#9333ea"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Head ── */}
      <rect x="8" y="8" width="56" height="46" rx="10" fill="#130825" stroke="#9333ea" strokeWidth="1.5" />
      {/* head highlight */}
      <rect x="12" y="10" width="40" height="8" rx="4" fill="rgba(255,255,255,0.04)" />

      {/* ── Visor strip ── */}
      <rect x="13" y="26" width="46" height="18" rx="5"
        fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1.2" />
      {/* visor inner glow */}
      <rect x="15" y="28" width="42" height="14" rx="4" fill="rgba(6,182,212,0.06)" />

      {/* ── Eyes (inside visor) ── */}
      {/* Left eye */}
      <motion.g
        animate={blinking ? { scaleY: [1, 0.08, 1] } : { scaleY: 1 }}
        style={{ transformOrigin: "24px 35px" }}
        transition={{ duration: 0.12 }}
      >
        <ellipse cx="24" cy="35" rx="7" ry="7" fill="#06b6d4" opacity="0.25" />
        <ellipse cx="24" cy="35" rx="5" ry="5" fill="#06b6d4" opacity="0.6" />
        <ellipse cx="24" cy="35" rx="3" ry="3" fill="#e0f7ff" />
        <ellipse cx="22.5" cy="33.5" rx="1.2" ry="1.2" fill="white" opacity="0.8" />
      </motion.g>

      {/* Right eye */}
      <motion.g
        animate={blinking ? { scaleY: [1, 0.08, 1] } : { scaleY: 1 }}
        style={{ transformOrigin: "48px 35px" }}
        transition={{ duration: 0.12 }}
      >
        <ellipse cx="48" cy="35" rx="7" ry="7" fill="#06b6d4" opacity="0.25" />
        <ellipse cx="48" cy="35" rx="5" ry="5" fill="#06b6d4" opacity="0.6" />
        <ellipse cx="48" cy="35" rx="3" ry="3" fill="#e0f7ff" />
        <ellipse cx="46.5" cy="33.5" rx="1.2" ry="1.2" fill="white" opacity="0.8" />
      </motion.g>

      {/* ── Mouth / speaker ── */}
      <rect x="22" y="50" width="28" height="2" rx="1" fill="rgba(147,51,234,0.3)" />
      <rect x="26" y="50" width="4" height="2" rx="1" fill="rgba(147,51,234,0.6)" />
      <rect x="34" y="50" width="4" height="2" rx="1" fill="rgba(147,51,234,0.6)" />
      <rect x="42" y="50" width="4" height="2" rx="1" fill="rgba(147,51,234,0.6)" />

      {/* ── Neck ── */}
      <rect x="28" y="54" width="16" height="8" rx="3" fill="#1a0a2e" stroke="rgba(147,51,234,0.3)" strokeWidth="1" />

      {/* ── Body ── */}
      <rect x="6" y="62" width="60" height="34" rx="10" fill="#130825" stroke="#9333ea" strokeWidth="1.5" />
      {/* chest panel */}
      <rect x="14" y="68" width="44" height="22" rx="6"
        fill="rgba(147,51,234,0.1)" stroke="rgba(147,51,234,0.25)" strokeWidth="1" />
      {/* LED indicators */}
      <motion.circle cx="24" cy="79" r="3.5" fill="#9333ea"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.circle cx="36" cy="79" r="3.5" fill="#06b6d4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle cx="48" cy="79" r="3.5" fill="#a855f7"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
      />
      {/* core power bar */}
      <rect x="18" y="85" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
      <motion.rect x="18" y="85" width="28" height="3" rx="1.5"
        fill="rgba(147,51,234,0.6)"
        animate={{ width: [20, 36, 20] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Left arm ── */}
      <rect x="-6" y="64" width="12" height="28" rx="6" fill="#1a0a2e" stroke="rgba(147,51,234,0.35)" strokeWidth="1.2" />
      <circle cx="0" cy="93" r="6" fill="#1a0a2e" stroke="rgba(147,51,234,0.4)" strokeWidth="1.2" />

      {/* ── Right arm (waves when prop is true) ── */}
      <motion.g
        style={{ transformOrigin: "72px 68px" }}
        animate={waving ? { rotate: [-10, -45, -10] } : { rotate: 0 }}
        transition={waving ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      >
        <rect x="66" y="64" width="12" height="28" rx="6" fill="#1a0a2e" stroke="rgba(147,51,234,0.35)" strokeWidth="1.2" />
        <circle cx="72" cy="93" r="6" fill="#1a0a2e" stroke="rgba(147,51,234,0.4)" strokeWidth="1.2" />
      </motion.g>

      {/* ── Legs ── */}
      <rect x="14" y="94" width="16" height="2" rx="1" fill="rgba(147,51,234,0.2)" />
      <rect x="42" y="94" width="16" height="2" rx="1" fill="rgba(147,51,234,0.2)" />
    </svg>
  );
}

export default function RobotAvatar() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [bubbleText, setBubbleText] = useState(MESSAGES[0]);
  const [isFact, setIsFact] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [waving, setWaving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const factActiveRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Periodic blink
  useEffect(() => {
    const blinkLoop = () => {
      const delay = 2500 + Math.random() * 3000;
      const t = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 160);
        blinkLoop();
      }, delay);
      return t;
    };
    const t = blinkLoop();
    return () => clearTimeout(t);
  }, []);

  // Periodic speech bubble — cycles through MESSAGES
  useEffect(() => {
    const bubbleLoop = setInterval(() => {
      // Don't interrupt a fact that's still on screen
      if (factActiveRef.current) return;
      setMsgIdx((i) => {
        const next = (i + 1) % MESSAGES.length;
        setBubbleText(MESSAGES[next]);
        setIsFact(false);
        return next;
      });
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3200);
    }, 7000);
    // Show first message after 2s
    const intro = setTimeout(() => {
      setBubbleText(MESSAGES[0]);
      setIsFact(false);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3200);
    }, 2000);
    return () => {
      clearInterval(bubbleLoop);
      clearTimeout(intro);
    };
  }, []);

  const handleClick = () => {
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    setBubbleText(fact);
    setIsFact(true);
    setShowBubble(true);
    setWaving(true);
    factActiveRef.current = true;
    setTimeout(() => {
      setShowBubble(false);
      factActiveRef.current = false;
    }, 8000);
    setTimeout(() => setWaving(false), 1500);
  };

  return (
    <>
      {/* Full-viewport drag constraint layer */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9980]" />

      <motion.div
        drag={!isMobile}
        dragConstraints={isMobile ? undefined : constraintsRef}
        dragMomentum={false}
        dragElastic={0.08}
        whileDrag={isMobile ? undefined : { scale: 1.08, cursor: "grabbing" }}
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, type: "spring", bounce: 0.5 }}
        className="fixed z-[9981] select-none"
        style={{ bottom: 96, left: 24, cursor: isMobile ? "pointer" : "grab" }}
        onHoverStart={() => !isMobile && setHovered(true)}
        onHoverEnd={() => !isMobile && setHovered(false)}
        onClick={handleClick}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.3 }}
              className="absolute text-xs font-medium px-3 py-2.5 rounded-xl pointer-events-none"
              style={{
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: isFact ? "rgba(10,4,24,0.96)" : "rgba(5,5,7,0.92)",
                border: isFact
                  ? "1px solid rgba(99,102,241,0.6)"
                  : "1px solid rgba(147,51,234,0.45)",
                color: "#e2e8f0",
                boxShadow: isFact
                  ? "0 4px 24px rgba(99,102,241,0.3)"
                  : "0 4px 20px rgba(147,51,234,0.2)",
                backdropFilter: "blur(10px)",
                maxWidth: isFact ? 240 : 180,
                textAlign: "center",
                lineHeight: 1.5,
                whiteSpace: isFact ? "normal" : "nowrap",
              }}
            >
              {isFact && (
                <p className="text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: "#818cf8" }}>
                  Did you know?
                </p>
              )}
              {bubbleText}
              {/* bubble tail */}
              <div
                className="absolute left-1/2 -bottom-[5px]"
                style={{
                  transform: "translateX(-50%)",
                  width: 10,
                  height: 10,
                  background: "rgba(5,5,7,0.92)",
                  border: "1px solid rgba(147,51,234,0.45)",
                  borderTop: "none",
                  borderLeft: "none",
                  rotate: "45deg",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot body — idle float */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow under robot */}
          <motion.div
            className="absolute -bottom-2 left-1/2 pointer-events-none"
            style={{
              width: 48,
              height: 10,
              background: "radial-gradient(ellipse, rgba(147,51,234,0.45), transparent)",
              filter: "blur(4px)",
              transform: "translateX(-50%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Hover ring */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                outline: "2px solid rgba(147,51,234,0.5)",
                outlineOffset: 6,
              }}
            />
          )}

          <RobotSVG blinking={blinking} waving={waving || hovered} />
        </motion.div>

        {/* Drag hint — shown briefly */}
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 5, duration: 1.5 }}
          className="absolute text-center pointer-events-none"
          style={{ bottom: -18, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
        >
          <span className="text-[9px] text-slate-700 tracking-wide">drag me!</span>
        </motion.div>
      </motion.div>
    </>
  );
}
