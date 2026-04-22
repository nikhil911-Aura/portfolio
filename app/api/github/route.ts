import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-site",
    };

    const [reposRes, userRes] = await Promise.all([
      fetch(
        "https://api.github.com/users/Nick-ui911/repos?sort=updated&per_page=6&type=public",
        { headers, next: { revalidate: 3600 } }
      ),
      fetch("https://api.github.com/users/Nick-ui911", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await reposRes.json();
    const user = await userRes.json();

    const filtered = repos.filter((r: { fork: boolean }) => !r.fork).slice(0, 6);

    return NextResponse.json({
      repos: filtered,
      stats: {
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        avatar_url: user.avatar_url,
        bio: user.bio,
      },
    });
  } catch {
    return NextResponse.json(
      {
        repos: [],
        stats: { public_repos: 20, followers: 50, following: 30, avatar_url: "", bio: "" },
      },
      { status: 200 }
    );
  }
}
