"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2, Clock } from "lucide-react";
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

interface Stats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
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
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setRepos(data.repos ?? []);
        setStats(data.stats ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statItems = stats
    ? [
        { label: "Public Repos", value: stats.public_repos, color: "#9333ea" },
        { label: "Followers", value: stats.followers, color: "#3b82f6" },
        { label: "Following", value: stats.following, color: "#06b6d4" },
      ]
    : [];

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

        {/* Profile + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-6 mb-10 p-6 rounded-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(147,51,234,0.1)",
                border: "1px solid rgba(147,51,234,0.2)",
              }}
            >
              <GithubIcon size={24} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Nick-ui911</h3>
              <a
                href="https://github.com/Nick-ui911"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                github.com/Nick-ui911 <ExternalLink size={11} />
              </a>
            </div>
          </div>
          <div className="flex gap-6">
            {statItems.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: s.color }}
                >
                  {loading ? (
                    <div className="w-12 h-7 rounded animate-pulse bg-white/5" />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Repos grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
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
              <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-12">
            <GithubIcon size={32} className="mx-auto mb-3 opacity-30" />
            <p>Repositories loading...</p>
          </div>
        )}

        {/* Secondary GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div className="flex items-center gap-3">
            <GithubIcon size={18} className="text-slate-500" />
            <div>
              <p className="text-sm text-slate-400">Secondary GitHub</p>
              <a
                href="https://github.com/nikhil911-Aura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                github.com/nikhil911-Aura
              </a>
            </div>
          </div>
          <a
            href="https://github.com/nikhil911-Aura"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            View Profile <ExternalLink size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function RepoCard({
  repo,
  index,
  inView,
}: {
  repo: Repo;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group block p-5 rounded-2xl transition-all duration-300"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-purple-400 shrink-0" />
          <h3 className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors truncate">
            {repo.name}
          </h3>
        </div>
        <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
        {repo.description ?? "No description provided."}
      </p>

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
    </motion.a>
  );
}
