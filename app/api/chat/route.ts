import { PORTFOLIO_SYSTEM_PROMPT } from "@/lib/portfolio-context";

const PROVIDERS = {
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant",
    key: () => process.env.GROQ_API_KEY ?? "",
  },
  cerebras: {
    url: "https://api.cerebras.ai/v1/chat/completions",
    model: "llama3.1-8b",
    key: () => process.env.CEREBRAS_API_KEY ?? "",
  },
} as const;

type ProviderKey = keyof typeof PROVIDERS;

const INJECTION_PATTERNS = [
  /ignore (previous|all|above|prior) instructions/i,
  /forget (your|all) (rules|instructions|prompt)/i,
  /act as (a )?(different|unrestricted|unfiltered)/i,
  /smtp|api.?key|env(ironment)?.?(var|variable)|secret|credential/i,
];

export async function POST(req: Request) {
  try {
    const { messages, provider = "groq" } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    const config = PROVIDERS[provider as ProviderKey] ?? PROVIDERS.groq;

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

    const recentMessages = messages.slice(-6).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 1000),
    }));

    const res = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.key()}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
          ...recentMessages,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.65,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[chat/route] ${provider} error:`, err);
      return Response.json({ error: "AI service error" }, { status: 502 });
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            for (const line of chunk.split("\n")) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const text = json.choices[0]?.delta?.content ?? "";
                if (text) controller.enqueue(encoder.encode(text));
              } catch {
                // incomplete chunk — skip
              }
            }
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
