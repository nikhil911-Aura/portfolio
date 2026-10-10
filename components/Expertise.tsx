import Section from "./Section";
import Reveal from "./Reveal";
import { disciplines } from "@/lib/content";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      num="02"
      label="Expertise"
      title="Four disciplines, one way of working."
      intro="I move comfortably between layers of the stack, which means fewer hand-offs and fewer surprises in production."
    >
      <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
        {disciplines.map((d, i) => (
          <Reveal as="li" key={d.title} delay={i * 0.06} className="flex flex-col border-t border-ink/80 pt-6">
            <span className="text-xs tabular-nums text-accent">0{i + 1}</span>
            <h3 className="mt-4 text-2xl">{d.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{d.desc}</p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-ink">
              {d.skills.map((s, j) => (
                <li key={s} className="flex items-center gap-3">
                  {s}
                  {j < d.skills.length - 1 && <span className="h-1 w-1 rounded-full bg-rule" aria-hidden />}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
