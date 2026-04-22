"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUp } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/Nick-ui911" },
  { label: "LeetCode", href: "https://leetcode.com/u/NikhilSingh01/" },
  { label: "Vercel", href: "https://vercel.com/nick-ui911s-projects" },
  { label: "DevWorld", href: "https://www.devworld.in/" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-12 mt-12 overflow-hidden">
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(6,182,212,0.2))",
                border: "1px solid rgba(147,51,234,0.3)",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NS
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Nikhil Singh</p>
              <p className="text-xs text-slate-600">Full Stack + DevOps + GenAI</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ArrowUp size={12} />
            Back to top
          </motion.button>
        </div>

        <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Nikhil Singh. Built with Next.js, Framer Motion &amp; Three.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
