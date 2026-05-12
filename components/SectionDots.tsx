"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "contact",    label: "Contact" },
];

export default function SectionDots() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  // Delay show until after loading screen exits
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.5 }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-[9970] hidden md:flex flex-col gap-3.5"
        >
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative flex items-center justify-end group"
                title={label}
              >
                {/* Hover label */}
                <motion.span
                  initial={{ opacity: 0, x: 6, scale: 0.9 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-full mr-3 text-[11px] font-medium whitespace-nowrap select-none"
                  style={{
                    color: isActive ? "#a855f7" : "#475569",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </motion.span>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.45 : 1,
                    backgroundColor: isActive ? "#a855f7" : "transparent",
                    borderColor: isActive ? "#a855f7" : "rgba(168,85,247,0.35)",
                    boxShadow: isActive ? "0 0 8px rgba(168,85,247,0.7)" : "none",
                  }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(168,85,247,0.35)",
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
