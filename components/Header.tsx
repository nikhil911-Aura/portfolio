"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, sections } from "@/lib/content";

const NAV = sections.filter((s) => ["about", "work", "experience", "contact"].includes(s.id));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((prev) => (entry.isIntersecting ? id : prev === id ? "" : prev));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? "border-b border-rule bg-paper"
          : scrolled
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl tracking-tight">{profile.name}</span>
          <span className="hidden text-sm text-muted sm:inline">— {profile.role}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative text-sm transition-colors ${
                active === s.id ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {s.id === "work" ? "Work" : s.label}
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/80 px-4 py-1.5 text-sm transition-colors hover:bg-ink hover:text-paper"
          >
            Résumé
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-paper md:hidden"
            aria-label="Mobile"
          >
            <ul className="container-page flex flex-col pt-6">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-rule"
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="text-xs text-accent">{s.num}</span>
                    <span className="font-serif text-3xl">{s.label}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-ink px-5 py-2 text-sm"
                >
                  Download résumé
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
