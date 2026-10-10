"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, sections } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const facts = [
  { label: "Currently", value: `${profile.current.title}, ${profile.current.company}` },
  { label: "Focus", value: "Full Stack · DevOps · GenAI" },
  { label: "Education", value: "B.Tech, Computer Science · 2026" },
  { label: "Based in", value: profile.location },
];

export default function Hero() {
  return (
    <section id="top" className="container-page pt-12 sm:pt-20 lg:pt-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <motion.p {...rise(0.05)} className="flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/50 [animation-duration:2.4s]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
            </span>
            Open to new opportunities &amp; freelance work
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-8 text-[2.9rem] leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-[5.75rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            I build <em className="text-accent">reliable</em> software, from interface to infrastructure.
          </motion.h1>

          <motion.p {...rise(0.3)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            I&apos;m Nikhil — a full-stack engineer working across React, Node.js, Kubernetes and generative AI.
            I care about clean architecture, calm interfaces and systems that keep running.
          </motion.p>

          <motion.div {...rise(0.42)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-deep"
            >
              View selected work
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={`mailto:${profile.email}`} className="link-underline text-sm text-ink">
              {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Contents — a quiet, book-like index */}
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="hidden self-end lg:col-span-4 lg:block"
          aria-label="Contents"
        >
          <p className="eyebrow mb-4">Contents</p>
          <ol className="border-t border-rule">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-3 border-b border-rule py-3 text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="w-6 text-xs tabular-nums text-muted">{s.num}</span>
                  <span className="font-serif text-lg">{s.label}</span>
                  <span className="mx-1 flex-1 -translate-y-1 border-b border-dotted border-rule" aria-hidden />
                  <ArrowUpRight
                    size={14}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ol>
        </motion.aside>
      </div>

      <motion.dl
        {...rise(0.6)}
        className="mt-20 grid grid-cols-2 gap-y-8 border-t border-ink/80 pt-6 sm:mt-24 lg:grid-cols-4"
      >
        {facts.map((f) => (
          <div key={f.label} className="pr-6">
            <dt className="eyebrow">{f.label}</dt>
            <dd className="mt-2 text-[0.95rem] leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
