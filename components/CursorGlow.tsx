"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const over = () => { isHovering.current = true; };
    const out = () => { isHovering.current = false; };

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .cursor-pointer"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-8 h-8 rounded-full border border-purple-500/50 transition-all duration-200"
          style={{ boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-20"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>
    </>
  );
}
