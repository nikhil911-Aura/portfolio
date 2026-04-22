"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Code2,
  Briefcase,
  Mail,
  ExternalLink,
  X,
  Terminal,
  Zap,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "./icons";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: IconComponent;
  action: () => void;
  group: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: "about",
      label: "About Me",
      description: "Learn about Nikhil Singh",
      icon: User,
      action: () => { scrollTo("#about"); onClose(); },
      group: "Navigate",
    },
    {
      id: "skills",
      label: "Skills",
      description: "Technical expertise",
      icon: Zap,
      action: () => { scrollTo("#skills"); onClose(); },
      group: "Navigate",
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work history at IBR Infotech",
      icon: Briefcase,
      action: () => { scrollTo("#experience"); onClose(); },
      group: "Navigate",
    },
    {
      id: "projects",
      label: "Projects",
      description: "Featured work — DevWorld, NovaChat AI...",
      icon: Code2,
      action: () => { scrollTo("#projects"); onClose(); },
      group: "Navigate",
    },
    {
      id: "github",
      label: "GitHub Activity",
      description: "Open source contributions",
      icon: GithubIcon,
      action: () => { scrollTo("#github"); onClose(); },
      group: "Navigate",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => { scrollTo("#contact"); onClose(); },
      group: "Navigate",
    },
    {
      id: "github-profile",
      label: "GitHub Profile",
      description: "github.com/Nick-ui911",
      icon: GithubIcon,
      action: () => { window.open("https://github.com/Nick-ui911", "_blank"); onClose(); },
      group: "Links",
    },
    {
      id: "leetcode",
      label: "LeetCode Profile",
      description: "leetcode.com/u/NikhilSingh01",
      icon: Terminal,
      action: () => { window.open("https://leetcode.com/u/NikhilSingh01/", "_blank"); onClose(); },
      group: "Links",
    },
    {
      id: "vercel",
      label: "Vercel Projects",
      description: "Live deployments",
      icon: ExternalLink,
      action: () => { window.open("https://vercel.com/nick-ui911s-projects", "_blank"); onClose(); },
      group: "Links",
    },
    {
      id: "devworld",
      label: "DevWorld",
      description: "Live project → devworld.in",
      icon: ExternalLink,
      action: () => { window.open("https://www.devworld.in/", "_blank"); onClose(); },
      group: "Projects",
    },
    {
      id: "novachat",
      label: "NovaChat AI",
      description: "GenAI chat platform",
      icon: ExternalLink,
      action: () => { window.open("https://nova-ai-lyart-pi.vercel.app/", "_blank"); onClose(); },
      group: "Projects",
    },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[selected]?.action();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, filtered, selected, onClose]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-9990 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-9991 w-full max-w-xl"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,20,0.95)",
                border: "1px solid rgba(147,51,234,0.2)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(147,51,234,0.08)",
                backdropFilter: "blur(40px)",
              }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Search size={16} className="text-slate-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands, navigate, open links..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-slate-600 hover:text-slate-400">
                    <X size={14} />
                  </button>
                )}
                <kbd
                  className="text-xs px-1.5 py-0.5 rounded text-slate-600"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-600">
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  groups.map((group) => {
                    const groupItems = filtered.filter((c) => c.group === group);
                    return (
                      <div key={group}>
                        <div className="px-3 py-1.5 text-xs font-medium text-slate-700 uppercase tracking-wider">
                          {group}
                        </div>
                        {groupItems.map((cmd) => {
                          const idx = flatIndex++;
                          const isSelected = idx === selected;
                          return (
                            <motion.button
                              key={cmd.id}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelected(idx)}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-100 mx-1 rounded-xl"
                              style={{
                                background: isSelected ? "rgba(147,51,234,0.12)" : "transparent",
                                width: "calc(100% - 8px)",
                              }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  background: isSelected
                                    ? "rgba(147,51,234,0.2)"
                                    : "rgba(255,255,255,0.04)",
                                }}
                              >
                                <cmd.icon
                                  size={13}
                                  className={isSelected ? "text-purple-400" : "text-slate-500"}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${isSelected ? "text-white" : "text-slate-300"}`}>
                                  {cmd.label}
                                </p>
                                {cmd.description && (
                                  <p className="text-xs text-slate-600 truncate">{cmd.description}</p>
                                )}
                              </div>
                              {isSelected && (
                                <ChevronRight size={13} className="text-purple-500 shrink-0" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div
                className="flex items-center gap-4 px-4 py-2.5 text-xs text-slate-700"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
