/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/Nick-ui911" },
  { label: "LeetCode", href: "https://leetcode.com/u/NikhilSingh01/" },
  { label: "Vercel", href: "https://vercel.com/nick-ui911s-projects" },
  { label: "DevWorld", href: "https://www.devworld.in/" },
];

const footerImages = [
  "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&q=75",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=75",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&q=75",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=75",
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-12 overflow-hidden">
      {/* Image strip */}
      <div className="flex h-40 overflow-hidden">
        {footerImages.map((src, i) => (
          <div key={i} className="relative overflow-hidden flex-1">
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "grayscale(35%) brightness(0.8)",
                transition: "filter 0.6s ease, transform 0.6s ease",
                transform: "scale(1.04)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.filter = "grayscale(0%) brightness(1) saturate(1.15)";
                el.style.transform = "scale(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.filter = "grayscale(35%) brightness(0.8)";
                el.style.transform = "scale(1.04)";
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative py-12">
        {/* Top border gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(34,211,238,0.3), transparent)",
          }}
        />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.2))",
                border: "1px solid rgba(168,85,247,0.3)",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #f97316)",
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
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <ArrowUp size={12} />
            Back to top
          </motion.button>
        </div>

        <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid var(--card-border)" }}>
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Nikhil Singh. Built with Next.js, Framer Motion &amp; Three.js.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
