import Groq from "groq-sdk";
import { PORTFOLIO_SYSTEM_PROMPT } from "@/lib/portfolio-context";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Block obvious prompt-injection keywords before hitting the LLM
    const INJECTION_PATTERNS = [
      /ignore (previous|all|above|prior) instructions/i,
      /you are now/i,
      /forget (your|all) (rules|instructions|prompt)/i,
      /pretend (you are|to be)/i,
      /act as (a )?(different|unrestricted|jailbreak)/i,
      /\bDAN\b/,
      /smtp|api.?key|env(ironment)?.?(var|variable)|secret|credential/i,
    ];

    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    if (lastUserMsg) {
      const text = String((lastUserMsg as { content: string }).content);
      if (INJECTION_PATTERNS.some((p) => p.test(text))) {
        return new Response(
          "I'm here to answer questions about Nikhil's portfolio only. I can't help with that.",
          { headers: { "Content-Type": "text/plain; charset=utf-8" } }
        );
      }
    }

    // Keep last 6 messages to limit token usage
    const recentMessages = messages.slice(-6).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 1000),
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
        ...recentMessages,
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.65,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[chat/route]", err);
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
