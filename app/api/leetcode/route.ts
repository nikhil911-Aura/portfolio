import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username: "NikhilSingh01" } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("LeetCode API error");

    const data = await res.json();
    const user = data?.data?.matchedUser;
    const allQ = data?.data?.allQuestionsCount;

    if (!user) throw new Error("User not found");

    const solved = user.submitStats.acSubmissionNum;
    const totalQ = allQ;

    const get = (arr: { difficulty: string; count: number }[], d: string) =>
      arr.find((x) => x.difficulty === d)?.count ?? 0;

    return NextResponse.json({
      totalSolved: get(solved, "All"),
      easySolved: get(solved, "Easy"),
      mediumSolved: get(solved, "Medium"),
      hardSolved: get(solved, "Hard"),
      totalEasy: get(totalQ, "Easy"),
      totalMedium: get(totalQ, "Medium"),
      totalHard: get(totalQ, "Hard"),
      ranking: user.profile.ranking,
    });
  } catch {
    return NextResponse.json({
      totalSolved: 350,
      easySolved: 150,
      mediumSolved: 160,
      hardSolved: 40,
      totalEasy: 800,
      totalMedium: 1600,
      totalHard: 700,
      ranking: 150000,
    });
  }
}
