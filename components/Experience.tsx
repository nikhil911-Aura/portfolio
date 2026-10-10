import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" num="04" label="Experience" title="Where I've worked.">
      <ol className="border-t border-ink/80">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05} className="border-b border-rule">
            <div className="grid gap-y-3 py-8 sm:py-10 lg:grid-cols-12 lg:gap-x-10">
              <p className="text-sm tabular-nums text-muted lg:col-span-3 lg:pt-2">
                {job.period}
                {i === 0 && (
                  <span className="ml-3 inline-block rounded-full border border-sage/40 px-2 py-0.5 text-[0.7rem] uppercase tracking-wider text-sage">
                    Current
                  </span>
                )}
              </p>
              <div className="lg:col-span-4">
                <h3 className="text-2xl leading-snug sm:text-[1.75rem]">{job.role}</h3>
                <p className="mt-1.5 text-ink-soft">
                  {job.company} <span className="text-muted">· {job.location}</span>
                </p>
              </div>
              <ul className="space-y-2 text-[0.98rem] leading-relaxed text-ink-soft lg:col-span-5 lg:pt-2">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
