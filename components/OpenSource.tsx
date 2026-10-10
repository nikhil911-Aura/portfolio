"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import type { GitHubRepo, LeetCodeStats } from "@/types";

interface AccountStats {
  username: string;
  public_repos: number;
  followers: number;
  profile_url: string;
}

interface Achievement {
  badge: { displayName: string };
}

interface GitHubData {
  repos: GitHubRepo[];
  accounts: AccountStats[];
  achievements: string[];
}

const RELEASE_LINKS: Record<string, { label: string; url: string }> = {
  "melodi-music-player": {
    label: "Download APK",
    url: "https://github.com/nikhil911-Aura/melodi-music-player/releases/download/v1.0.0/melodi.apk",
  },
  "Pojects-Management-Tool": { label: "Live site", url: "https://karya.ibrcloud.com/" },
};

// Throwaway repos (test, practice, sandbox) aren't worth surfacing on a portfolio
const SCRATCH_REPO = /^(test|testing|demo|sandbox|scratch)$|practice/i;

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

export default function OpenSource() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leet, setLeet] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState({ github: true, leet: true });

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        const repos: GitHubRepo[] = [...(data.primaryRepos ?? []), ...(data.secondaryRepos ?? [])]
          .filter((r: GitHubRepo) => !SCRATCH_REPO.test(r.name))
          .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
          .slice(0, 6);
        const accounts = [data.stats?.primary, data.stats?.secondary].filter(Boolean) as AccountStats[];
        const achievements = [
          ...new Set(
            [...(data.achievements?.primary ?? []), ...(data.achievements?.secondary ?? [])].map(
              (a: Achievement) => a.badge.displayName
            )
          ),
        ];
        setGithub({ repos, accounts, achievements });
      })
      .catch(() => {})
      .finally(() => setLoading((l) => ({ ...l, github: false })));

    fetch("/api/leetcode")
      .then((r) => r.json())
      .then(setLeet)
      .catch(() => {})
      .finally(() => setLoading((l) => ({ ...l, leet: false })));
  }, []);

  return (
    <Section
      id="open-source"
      num="05"
      label="Open Source"
      title="Building in public, practising daily."
      intro="Recent activity across my GitHub accounts, alongside the problem-solving I keep up on LeetCode."
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* GitHub */}
        <Reveal className="lg:col-span-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-ink/80 pt-5">
            <h3 className="text-2xl">GitHub</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
              {github?.accounts.map((a) => (
                <a key={a.username} href={a.profile_url} target="_blank" rel="noopener noreferrer" className="link-underline">
                  @{a.username} <span className="text-muted">· {a.public_repos} repos</span>
                </a>
              ))}
            </div>
          </div>

          <p className="eyebrow mt-8">Recently updated</p>
          <ul className="mt-3 border-t border-rule">
            {loading.github
              ? Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="border-b border-rule py-5">
                    <div className="h-4 w-40 animate-pulse rounded bg-paper-deep" />
                    <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-paper-deep" />
                  </li>
                ))
              : github?.repos.map((repo) => {
                  const release = RELEASE_LINKS[repo.name];
                  return (
                    <li key={repo.id} className="group border-b border-rule py-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate font-medium text-ink transition-colors group-hover:text-accent"
                        >
                          {repo.name}
                        </a>
                        <span className="shrink-0 text-xs tabular-nums text-muted">{timeAgo(repo.updated_at)}</span>
                      </div>
                      {repo.description && (
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">{repo.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
                        {repo.language && <span>{repo.language}</span>}
                        {repo.stargazers_count > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star size={11} strokeWidth={1.75} /> {repo.stargazers_count}
                          </span>
                        )}
                        {release && (
                          <a href={release.url} target="_blank" rel="noopener noreferrer" className="link-underline text-accent">
                            {release.label} ↗
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
            {!loading.github && !github?.repos.length && (
              <li className="border-b border-rule py-5 text-sm text-muted">Repositories are unavailable right now.</li>
            )}
          </ul>

          {github && github.achievements.length > 0 && (
            <p className="mt-6 text-sm text-ink-soft">
              <span className="eyebrow mr-3">Achievements</span>
              {github.achievements.join(", ")}
            </p>
          )}
        </Reveal>

        {/* LeetCode */}
        <Reveal delay={0.1} className="lg:col-span-4">
          <div className="flex items-baseline justify-between border-t border-ink/80 pt-5">
            <h3 className="text-2xl">LeetCode</h3>
            <a
              href="https://leetcode.com/u/NikhilSingh01/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-ink-soft"
            >
              @NikhilSingh01
            </a>
          </div>

          {loading.leet ? (
            <div className="mt-8 space-y-4">
              <div className="h-16 w-32 animate-pulse rounded bg-paper-deep" />
              <div className="h-3 animate-pulse rounded bg-paper-deep" />
              <div className="h-3 animate-pulse rounded bg-paper-deep" />
            </div>
          ) : leet ? (
            <LeetCodeCard stats={leet} />
          ) : (
            <p className="mt-8 text-sm text-muted">Stats are unavailable right now.</p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function LeetCodeCard({ stats }: { stats: LeetCodeStats }) {
  const rows = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "bg-sage" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "bg-[#b08a3e]" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "bg-accent" },
  ];

  return (
    <div className="mt-8">
      <p
        className="font-serif text-7xl leading-none tracking-tight"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {stats.totalSolved}
      </p>
      <p className="mt-3 text-sm text-ink-soft">
        problems solved
        {stats.ranking ? <span className="text-muted"> · global rank #{stats.ranking.toLocaleString()}</span> : null}
      </p>

      <dl className="mt-10 space-y-5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between text-sm">
              <dt className="text-ink">{r.label}</dt>
              <dd className="tabular-nums text-muted">
                <span className="text-ink">{r.solved}</span> / {r.total}
              </dd>
            </div>
            <div className="mt-2 h-0.75 overflow-hidden rounded-full bg-paper-deep">
              <motion.div
                className={`h-full rounded-full ${r.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (r.solved / Math.max(r.total, 1)) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
