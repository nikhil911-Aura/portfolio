import { profile, socials } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="container-page pb-28 pt-4">
      <div className="flex flex-col gap-6 border-t border-ink/80 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. <span className="text-muted">Designed &amp; built in Indore.</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="link-underline">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
