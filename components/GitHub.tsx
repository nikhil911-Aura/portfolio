"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2, Clock, Download } from "lucide-react";
import { GithubIcon } from "./icons";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface AccountStats {
  username: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  profile_url: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  CSS: "#663399",
  HTML: "#E34F26",
  Shell: "#89E051",
  MDX: "#1B1F24",
};

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [primaryRepos, setPrimaryRepos] = useState<Repo[]>([]);
  const [secondaryRepos, setSecondaryRepos] = useState<Repo[]>([]);
  const [primaryStats, setPrimaryStats] = useState<AccountStats | null>(null);
  const [secondaryStats, setSecondaryStats] = useState<AccountStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setPrimaryRepos(data.primaryRepos ?? []);
        setSecondaryRepos(data.secondaryRepos ?? []);
        setPrimaryStats(data.stats?.primary ?? null);
        setSecondaryStats(data.stats?.secondary ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(147,51,234,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Open Source
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            GitHub{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Activity
            </span>
          </h2>
        </motion.div>

        {/* Primary account */}
        <AccountSection
          stats={primaryStats}
          repos={primaryRepos}
          loading={loading}
          inView={inView}
          accentColor="#9333ea"
          accentLight="#a855f7"
          accentBg="rgba(147,51,234,0.1)"
          accentBorder="rgba(147,51,234,0.2)"
          delay={0}
        />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-12 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--card-border), transparent)" }}
        />

        {/* Secondary account */}
        <AccountSection
          stats={secondaryStats}
          repos={secondaryRepos}
          loading={loading}
          inView={inView}
          accentColor="#06b6d4"
          accentLight="#22d3ee"
          accentBg="rgba(6,182,212,0.1)"
          accentBorder="rgba(6,182,212,0.2)"
          delay={0.15}
        />
      </div>
    </section>
  );
}

function AccountSection({
  stats,
  repos,
  loading,
  inView,
  accentColor,
  accentLight,
  accentBg,
  accentBorder,
  delay,
}: {
  stats: AccountStats | null;
  repos: Repo[];
  loading: boolean;
  inView: boolean;
  accentColor: string;
  accentLight: string;
  accentBg: string;
  accentBorder: string;
  delay: number;
}) {
  const statItems = stats
    ? [
        { label: "Repos", value: stats.public_repos },
        { label: "Followers", value: stats.followers },
        { label: "Following", value: stats.following },
      ]
    : [];

  return (
    <div>
      {/* Account header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="flex flex-wrap items-center justify-between gap-6 mb-6 p-5 rounded-2xl"
        style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
            style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
          >
            {stats?.avatar_url ? (
              <Image
                src={stats.avatar_url}
                alt={`${stats.username} avatar`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <GithubIcon size={22} style={{ color: accentColor }} />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {loading ? (
                <div className="w-28 h-4 rounded animate-pulse bg-white/5" />
              ) : (
                stats?.username ?? "—"
              )}
            </h3>
            {stats && (
              <a
                href={stats.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: accentLight }}
              >
                github.com/{stats.username} <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {loading
            ? [0, 1, 2].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-6 rounded animate-pulse bg-white/5 mx-auto mb-1" />
                  <div className="w-14 h-3 rounded animate-pulse bg-white/5" />
                </div>
              ))
            : statItems.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-bold" style={{ color: accentColor }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
                </div>
              ))}
        </div>
      </motion.div>

      {/* Repos grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl animate-pulse"
              style={{ background: "var(--card-bg)" }}
            />
          ))}
        </div>
      ) : repos.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              index={i}
              inView={inView}
              accentColor={accentColor}
              baseDelay={delay}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 py-10">
          <GithubIcon size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No public repositories found.</p>
        </div>
      )}
    </div>
  );
}

// Map of repo name → release download URL
const RELEASE_LINKS: Record<string, { label: string; url: string }> = {
  "melodi-music-player": {
    label: "Download APK v1.0.0",
    url: "https://github.com/nikhil911-Aura/melodi-music-player/releases/download/v1.0.0/melodi.apk",
  },
};

function RepoCard({
  repo,
  index,
  inView,
  accentColor,
  baseDelay,
}: {
  repo: Repo;
  index: number;
  inView: boolean;
  accentColor: string;
  baseDelay: number;
}) {
  const release = RELEASE_LINKS[repo.name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: baseDelay + 0.2 + index * 0.07 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group p-5 rounded-2xl transition-all duration-300 flex flex-col"
      style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={14} className="shrink-0" style={{ color: accentColor }} />
          <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>
            {repo.name}
          </h3>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        >
          <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        </a>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
        {repo.description ?? "No description provided."}
      </p>

      {/* Release button */}
      {release && (
        <a
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg mb-3 w-fit transition-all duration-200 hover:opacity-90"
          style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}35`,
            color: accentColor,
          }}
        >
          <Download size={10} />
          {release.label}
        </a>
      )}

      {/* Footer stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: languageColors[repo.language] ?? "#64748b" }}
              />
              <span className="text-xs text-slate-500">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Star size={10} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <GitFork size={10} />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-700">
          <Clock size={9} />
          <span>{timeAgo(repo.updated_at)}</span>
        </div>
      </div>
    </motion.div>
  );
}
