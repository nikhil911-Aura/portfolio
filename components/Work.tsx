import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "@/lib/content";

export default function Work() {
  return (
    <Section
      id="work"
      num="03"
      label="Selected Work"
      title={
        <>
          Products I&apos;ve designed, built <em className="text-accent">&amp; shipped.</em>
        </>
      }
    >
      <ol className="border-t border-ink/80">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.04} className="group relative border-b border-rule">
            <div className="grid gap-y-4 py-8 transition-colors duration-500 sm:py-10 lg:grid-cols-12 lg:gap-x-10">
              <span className="text-xs tabular-nums text-muted lg:col-span-1 lg:pt-3">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="lg:col-span-5">
                <h3 className="text-[2rem] leading-tight sm:text-[2.75rem]">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 transition-colors duration-300 group-hover:text-accent"
                  >
                    {p.title}
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.5}
                      className="mt-2 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                    {/* stretch the primary link over the row */}
                    <span className="absolute inset-0" aria-hidden />
                  </a>
                </h3>
                <p className="eyebrow mt-2">{p.category}</p>
              </div>

              <div className="lg:col-span-4 lg:pt-2">
                <p className="leading-relaxed text-ink-soft">{p.description}</p>
                {p.tech.length > 0 && (
                  <p className="mt-4 text-sm text-muted">{p.tech.join("  ·  ")}</p>
                )}
              </div>

              <div className="relative z-10 flex gap-5 text-sm lg:col-span-2 lg:flex-col lg:items-end lg:gap-2 lg:pt-3">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                  Live site ↗
                </a>
                {p.source && (
                  <a href={p.source} target="_blank" rel="noopener noreferrer" className="link-underline text-ink-soft">
                    Source ↗
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
