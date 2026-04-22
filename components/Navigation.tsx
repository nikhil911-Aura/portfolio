"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  onCommandPalette: () => void;
}

export default function Navigation({ onCommandPalette }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 backdrop-blur-xl border-b border-white/5" : "py-5"
        }`}
        style={scrolled ? { background: "var(--nav-bg)" } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(6,182,212,0.2))",
                border: "1px solid rgba(147,51,234,0.4)",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NS
              </span>
            </div>
            <span className="text-white font-semibold hidden sm:block">Nikhil Singh</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(147,51,234,0.15)",
                      border: "1px solid rgba(147,51,234,0.2)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-all duration-200"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}
                  >
                    <Sun size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "block" }}
                  >
                    <Moon size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Command palette trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-300 transition-all duration-200"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <Terminal size={12} />
              <span>⌘K</span>
            </motion.button>

            {/* Hire me button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #9333ea, #3b82f6)",
                boxShadow: "0 0 20px rgba(147,51,234,0.3)",
              }}
            >
              Hire Me
            </motion.button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
              style={{ background: "var(--card-bg)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{
                background: "var(--nav-bg)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--card-border)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3 rounded-xl transition-all duration-200"
                      style={
                        isActive
                          ? {
                              background: "rgba(147,51,234,0.15)",
                              border: "1px solid rgba(147,51,234,0.2)",
                              color: "#fff",
                            }
                          : { color: "#94a3b8" }
                      }
                    >
                      <span className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        )}
                        {link.label}
                      </span>
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => scrollTo("#contact")}
                  className="mt-2 px-4 py-3 rounded-xl text-center text-white font-medium"
                  style={{ background: "linear-gradient(135deg, #9333ea, #3b82f6)" }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
