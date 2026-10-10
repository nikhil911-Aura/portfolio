import Section from "./Section";
import Reveal from "./Reveal";

const details = [
  { label: "Education", value: "B.Tech in Computer Science, Oriental University, Indore (2022 — 2026)" },
  { label: "Hometown", value: "Satna, Madhya Pradesh" },
  { label: "Off the clock", value: "Cricket, volleyball, long rides, paragliding, rafting and scuba diving" },
];

export default function About() {
  return (
    <Section
      id="about"
      num="01"
      label="About"
      title={
        <>
          Engineering with care, <em className="text-accent">end to end.</em>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:col-start-4">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
              I build web applications the whole way through — interfaces in React and Next.js, APIs in Node, and the
              pipelines that ship them to Kubernetes on AWS.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 text-[1.05rem] leading-relaxed text-ink-soft sm:grid-cols-2 sm:gap-8">
            <Reveal delay={0.05}>
              <p>
                Over the past year and a half I&apos;ve worked on production products, automated deployments, and
                wired generative AI into workflows that teams actually use. I like problems where the frontend, the
                backend and the infrastructure all have to agree.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                I enjoy working with teams who want their product to stand out through quality rather than noise —
                thoughtful defaults, fast pages, and code the next person can read.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-2 lg:col-start-11">
          <dl className="space-y-6">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="eyebrow">{d.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
