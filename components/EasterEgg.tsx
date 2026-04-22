"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Code2, Cpu, Zap } from "lucide-react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setActive(true);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
          onClick={() => setActive(false)}
        >
          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(147,51,234,0.15), transparent)",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="relative rounded-2xl p-8 text-center max-w-md mx-4"
            style={{
              background: "rgba(5,5,7,0.9)",
              border: "1px solid rgba(147,51,234,0.4)",
              boxShadow: "0 0 80px rgba(147,51,234,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, #9333ea, #06b6d4, transparent)",
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setActive(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <X size={14} />
            </button>

            {/* Icon cluster */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[Terminal, Code2, Cpu, Zap].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, type: "spring", bounce: 0.5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(6,182,212,0.2))",
                    border: "1px solid rgba(147,51,234,0.3)",
                  }}
                >
                  <Icon size={16} className="text-purple-400" />
                </motion.div>
              ))}
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-3"
                style={{
                  background: "rgba(147,51,234,0.15)",
                  border: "1px solid rgba(147,51,234,0.3)",
                  color: "#a855f7",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500" />
                </span>
                DEVELOPER MODE ACTIVATED
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #9333ea, #3b82f6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              You found the secret!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-slate-400 text-sm leading-relaxed mb-6"
            >
              The Konami Code — a classic easter egg since 1986. You clearly know your way around a keyboard. Nikhil would be impressed.
            </motion.p>

            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="code-block text-left text-xs mb-6"
            >
              <span className="text-purple-400">const</span>{" "}
              <span className="text-cyan-300">developer</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-amber-300">&#123;</span>
              <br />
              {"  "}
              <span className="text-slate-400">name:</span>{" "}
              <span className="text-green-400">&quot;Nikhil Singh&quot;</span>
              <span className="text-white">,</span>
              <br />
              {"  "}
              <span className="text-slate-400">mode:</span>{" "}
              <span className="text-green-400">&quot;Full Power&quot;</span>
              <span className="text-white">,</span>
              <br />
              {"  "}
              <span className="text-slate-400">easterEggsFound:</span>{" "}
              <span className="text-amber-300">++</span>
              <span className="text-cyan-300">count</span>
              <br />
              <span className="text-amber-300">&#125;</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(false)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #9333ea, #3b82f6)",
                boxShadow: "0 0 25px rgba(147,51,234,0.3)",
              }}
            >
              Exit Developer Mode
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
