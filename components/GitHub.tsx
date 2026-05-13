"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2, Clock, Download, Trophy } from "lucide-react";
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

interface Achievement {
  badge: {
    displayName: string;
    description: string;
    imageUrl: string;
  };
  tier: { tier: number } | null;
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
  const [primaryAchievements, setPrimaryAchievements] = useState<Achievement[]>([]);
  const [secondaryAchievements, setSecondaryAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setPrimaryRepos(data.primaryRepos ?? []);
        setSecondaryRepos(data.secondaryRepos ?? []);
        setPrimaryStats(data.stats?.primary ?? null);
        setSecondaryStats(data.stats?.secondary ?? null);
        setPrimaryAchievements(data.achievements?.primary ?? []);
        setSecondaryAchievements(data.achievements?.secondary ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="relative py-24 overflow-hidden" style={{ background: "#0C0C0C" }}>
      {/* Animated ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{ top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute pointer-events-none"
        style={{ bottom: "0%", left: "-5%", width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(103,232,249,0.12) 0%, transparent 70%)", filter: "blur(90px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        className="absolute pointer-events-none"
        style={{ top: "40%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,180,252,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <h2
            className="hero-heading"
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3rem, 11vw, 130px)",
              marginBottom: "1rem",
            }}
          >
            GitHub
          </h2>
          <p style={{ color: "#64748b", fontSize: "clamp(0.8rem, 1.2vw, 1rem)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Open Source Activity
          </p>
        </motion.div>

        {/* Animated gradient divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #c084fc, #67e8f9, transparent)",
            marginBottom: "clamp(3rem, 5vw, 5rem)",
            transformOrigin: "center",
          }}
        />

        {/* Primary account */}
        <AccountSection
          stats={primaryStats}
          repos={primaryRepos}
          achievements={primaryAchievements}
          loading={loading}
          inView={inView}
          accentColor="#c084fc"
          accentLight="#c084fc"
          accentBg="rgba(192,132,252,0.1)"
          accentBorder="rgba(192,132,252,0.2)"
          delay={0}
        />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-12 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
        />

        {/* Secondary account */}
        <AccountSection
          stats={secondaryStats}
          repos={secondaryRepos}
          achievements={secondaryAchievements}
          loading={loading}
          inView={inView}
          accentColor="#67e8f9"
          accentLight="#67e8f9"
          accentBg="rgba(103,232,249,0.08)"
          accentBorder="rgba(103,232,249,0.18)"
          delay={0.15}
        />
      </div>
    </section>
  );
}

function AchievementBadges({
  achievements,
  inView,
  accentColor,
  accentBg,
  accentBorder,
  delay,
}: {
  achievements: Achievement[];
  inView: boolean;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  delay: number;
}) {
  if (achievements.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay + 0.4 }}
      className="mt-6 p-5 rounded-2xl"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={14} style={{ color: accentColor }} />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Achievements
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-md font-medium"
          style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
        >
          {achievements.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.06 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="group relative flex flex-col items-center gap-1.5 cursor-default"
            title={a.badge.description}
          >
            {/* Badge image */}
            <div
              className="relative w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300"
              style={{
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                boxShadow: `0 0 0 0 ${accentColor}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.badge.imageUrl}
                alt={a.badge.displayName}
                className="w-10 h-10 object-contain drop-shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Tier indicator */}
              {a.tier && a.tier.tier > 1 && (
                <span
                  className="absolute -top-1 -right-1 text-[9px] font-black px-1 rounded-full leading-4"
                  style={{ background: accentColor, color: "#fff" }}
                >
                  ×{a.tier.tier}
                </span>
              )}
            </div>

            {/* Badge name */}
            <span className="text-[10px] text-slate-500 text-center leading-tight max-w-14 group-hover:text-slate-300 transition-colors">
              {a.badge.displayName}
            </span>

            {/* Tooltip on hover */}
            <div
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            >
              <div
                className="text-xs text-white px-2.5 py-1.5 rounded-lg max-w-48 text-center leading-snug"
                style={{ background: "rgba(15,15,25,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="font-semibold mb-0.5">{a.badge.displayName}</div>
                <div className="text-slate-400 text-[10px] whitespace-normal">{a.badge.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AccountSection({
  stats,
  repos,
  achievements,
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
  achievements: Achievement[];
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
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
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
              style={{ background: "rgba(255,255,255,0.05)" }}
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

      {/* Achievement badges */}
      {!loading && (
        <AchievementBadges
          achievements={achievements}
          inView={inView}
          accentColor={accentColor}
          accentBg={accentBg}
          accentBorder={accentBorder}
          delay={delay}
        />
      )}
    </div>
  );
}

const RELEASE_LINKS: Record<string, { label: string; url: string; type?: "download" | "live" }> = {
  "melodi-music-player": {
    label: "Download APK v1.0.0",
    url: "https://github.com/nikhil911-Aura/melodi-music-player/releases/download/v1.0.0/melodi.apk",
    type: "download",
  },
  "Pojects-Management-Tool": {
    label: "View Live →",
    url: "https://karya.ibrcloud.com/",
    type: "live",
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
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={14} className="shrink-0" style={{ color: accentColor }} />
          <h3 className="font-semibold text-sm truncate" style={{ color: "#e2e8f0" }}>
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
          {release.type === "live" ? <ExternalLink size={10} /> : <Download size={10} />}
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
