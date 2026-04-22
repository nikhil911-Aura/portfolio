import { NextResponse } from "next/server";

const BLOCKED_REPOS = ["MusicPlayer"];

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "portfolio-site",
};

async function fetchRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&type=public`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const repos = await res.json();
  return repos.filter(
    (r: { fork: boolean; name: string }) => !r.fork && !BLOCKED_REPOS.includes(r.name)
  );
}

async function fetchUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function GET() {
  try {
    const [primaryRepos, secondaryRepos, primaryUser, secondaryUser] = await Promise.all([
      fetchRepos("Nick-ui911"),
      fetchRepos("nikhil911-Aura"),
      fetchUser("Nick-ui911"),
      fetchUser("nikhil911-Aura"),
    ]);

    return NextResponse.json({
      primaryRepos: primaryRepos.slice(0, 6),
      secondaryRepos: secondaryRepos.slice(0, 6),
      stats: {
        primary: {
          username: "Nick-ui911",
          public_repos: primaryUser?.public_repos ?? 0,
          followers: primaryUser?.followers ?? 0,
          following: primaryUser?.following ?? 0,
          avatar_url: primaryUser?.avatar_url ?? "",
          profile_url: "https://github.com/Nick-ui911",
        },
        secondary: {
          username: "nikhil911-Aura",
          public_repos: secondaryUser?.public_repos ?? 0,
          followers: secondaryUser?.followers ?? 0,
          following: secondaryUser?.following ?? 0,
          avatar_url: secondaryUser?.avatar_url ?? "",
          profile_url: "https://github.com/nikhil911-Aura",
        },
      },
    });
  } catch {
    return NextResponse.json(
      { primaryRepos: [], secondaryRepos: [], stats: { primary: null, secondary: null } },
      { status: 200 }
    );
  }
}
