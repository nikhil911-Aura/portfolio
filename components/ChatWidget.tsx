"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUp, Loader2, MessageCircle, RotateCcw, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  showContactButton?: boolean;
}

const STARTERS = [
  "What's Nikhil's tech stack?",
  "Tell me about his projects",
  "Is he open to new opportunities?",
  "What DevOps tools does he use?",
];

const MESSAGES_KEY = "portfolio-chat-messages";
const COUNT_KEY = "portfolio-chat-count";
const SESSION_LIMIT = 20;

const CONTACT_INTENT = /\b(send|write|shoot|drop|forward|submit)\b.{0,30}\b(email|mail|message|msg)\b|\b(contact|reach|message|email|hire|ping|dm)\b.{0,20}\b(nikhil|him|you|them)\b|\b(get in touch|reach out|how (do i|can i|to) contact|how (do i|can i|to) reach)\b|\b(navigate|go|take me|open|show|visit).{0,20}\b(contact|form)\b|\bcontact\s*(form|page|section)\b|\bi want to\s*(contact|reach|hire|message)\b/i;

function MarkdownMessage({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");

  const renderInline = (str: string) => {
    const parts = str.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-ink">{p}</strong>
      ) : (
        p
      )
    );
  };

  const items: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    items.push(
      <ul key={`ul-${items.length}`} className="flex flex-col gap-1.5 my-1.5 pl-1">
        {bulletBuffer.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[0.6em] h-px w-2.5 shrink-0 bg-accent" />
            <span>{renderInline(b)}</span>
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    const stripped = line.replace(/^[-•*]\s+/, "");
    if (/^[-•*]\s+/.test(line)) {
      bulletBuffer.push(stripped);
    } else {
      flushBullets();
      items.push(
        <p key={`p-${items.length}`} className="leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushBullets();

  return <div className="flex flex-col gap-1 text-sm">{items}</div>;
}

function ContactButton({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={onNavigate}
      className="group mt-3 flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent-deep"
    >
      Open contact form
      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
    </motion.button>
  );
}

type Provider = "gptoss" | "qwen";

const PROVIDERS: { id: Provider; label: string; model: string }[] = [
  { id: "gptoss", label: "GPT-OSS", model: "GPT-OSS 20B" },
  { id: "qwen", label: "Qwen", model: "Qwen3 27B" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const [provider, setProvider] = useState<Provider>("gptoss");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore chat history and count from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) setMessages(JSON.parse(saved));
      const raw = parseInt(localStorage.getItem(COUNT_KEY) ?? "0");
      setMsgCount(Math.max(0, Math.min(raw, SESSION_LIMIT)));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // storage quota exceeded
    }
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamContent]);

  const clearChat = () => {
    setMessages([]);
    setMsgCount(0);
    try {
      localStorage.removeItem(MESSAGES_KEY);
      localStorage.removeItem(COUNT_KEY);
    } catch {
      // ignore
    }
  };

  const navigateToContact = () => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const send = async (text: string) => {
    if (!text.trim() || streaming || msgCount >= SESSION_LIMIT) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");

    const newCount = msgCount + 1;
    setMsgCount(newCount);
    localStorage.setItem(COUNT_KEY, String(newCount));

    if (CONTACT_INTENT.test(text.trim())) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sure! You can reach Nikhil directly through the contact form on this page.",
          showContactButton: true,
        },
      ]);
      return;
    }

    setStreaming(true);
    setStreamContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamContent(full);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please email baghelnikhil911@gmail.com directly.",
        },
      ]);
    } finally {
      setStreaming(false);
      setStreamContent("");
    }
  };

  const limitReached = msgCount >= SESSION_LIMIT;
  const activeModel = PROVIDERS.find((p) => p.id === provider)?.model;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[min(560px,calc(100dvh-7rem))] w-[400px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-rule bg-card shadow-[0_30px_80px_-20px_rgba(34,30,25,0.35)]"
            role="dialog"
            aria-label="Ask about Nikhil"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start gap-3 border-b border-rule px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg leading-tight">Ask about Nikhil</p>
                <p className="mt-1 text-xs text-muted">
                  {SESSION_LIMIT - msgCount} messages left · {activeModel}
                </p>
              </div>

              {/* Provider toggle */}
              <div className="flex shrink-0 rounded-full border border-rule p-0.5 text-[11px]">
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      provider === p.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
                >
                  <RotateCcw size={14} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
              {messages.length === 0 && !streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="font-serif text-2xl leading-snug">
                    Hello. I can answer questions about Nikhil&apos;s work, skills and availability.
                  </p>
                  <p className="eyebrow mt-6">Try asking</p>
                  <ul className="mt-2 border-t border-rule">
                    {STARTERS.map((s) => (
                      <li key={s}>
                        <button
                          onClick={() => send(s)}
                          className="group flex w-full items-center justify-between gap-3 border-b border-rule py-3 text-left text-sm text-ink-soft transition-colors hover:text-ink"
                        >
                          {s}
                          <ArrowRight
                            size={14}
                            className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-paper"
                        : "rounded-2xl rounded-bl-sm bg-paper-deep/70 px-4 py-3 text-ink-soft"
                    }`}
                  >
                    {msg.role === "assistant" ? <MarkdownMessage text={msg.content} /> : msg.content}
                    {msg.showContactButton && <ContactButton onNavigate={navigateToContact} />}
                  </div>
                </motion.div>
              ))}

              {streaming && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-paper-deep/70 px-4 py-3 text-sm text-ink-soft">
                    {streamContent ? (
                      <>
                        <MarkdownMessage text={streamContent} />
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="ml-0.5 inline-block h-3.5 w-px bg-ink align-middle"
                        />
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5 py-1">
                        {[0, 0.15, 0.3].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-muted"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {limitReached && (
                <div className="flex flex-col items-center gap-1.5 py-2 text-center">
                  <p className="text-xs text-muted">You&apos;ve reached the message limit for this session.</p>
                  <button onClick={navigateToContact} className="link-underline text-xs text-accent">
                    Contact Nikhil directly
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-rule px-4 pb-3 pt-3">
              <div className="flex items-center gap-2 rounded-full border border-rule bg-paper py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-ink">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={limitReached ? "Session limit reached" : "Ask a question…"}
                  disabled={limitReached || streaming}
                  aria-label="Message"
                  className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || streaming || limitReached}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-accent-deep disabled:opacity-30"
                >
                  {streaming ? <Loader2 size={14} className="animate-spin" /> : <ArrowUp size={15} />}
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted">AI responses may be imperfect · via Groq</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle ── */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-12 items-center gap-2 rounded-full border shadow-[0_10px_30px_-10px_rgba(34,30,25,0.45)] transition-colors ${
          open
            ? "w-12 justify-center border-rule bg-card text-ink"
            : "w-12 justify-center border-ink bg-ink text-paper hover:border-accent-deep hover:bg-accent-deep sm:w-auto sm:px-5"
        }`}
        aria-label={open ? "Close chat" : "Ask AI about Nikhil"}
        aria-expanded={open}
      >
        {open ? (
          <X size={18} />
        ) : (
          <>
            <MessageCircle size={17} strokeWidth={1.75} />
            <span className="hidden text-sm font-medium sm:inline">Ask AI</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
