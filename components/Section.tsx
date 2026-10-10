import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  num: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({ id, num, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="container-page py-20 sm:py-28">
      <div className="border-t border-rule pt-6 sm:pt-8">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">{num}</span>
              <span className="h-px w-6 bg-rule" aria-hidden />
              {label}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal delay={0.05}>
              <h2 className="max-w-3xl text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
            </Reveal>
            {intro && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
              </Reveal>
            )}
          </div>
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
