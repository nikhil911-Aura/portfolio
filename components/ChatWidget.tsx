"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, Mail, Send, Sparkles, Trash2, X, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  showContactButton?: boolean;
}

const STARTERS = [
  { text: "What's Nikhil's tech stack?", emoji: "⚡" },
  { text: "Tell me about his projects", emoji: "🚀" },
  { text: "Is he available for hire?", emoji: "💼" },
  { text: "What DevOps tools does he use?", emoji: "🛠️" },
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
        <strong key={i} className="text-white font-semibold">{p}</strong>
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
            <span className="mt-2 w-1 h-1 rounded-full bg-purple-400 shrink-0" />
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
      className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white w-fit"
      style={{
        background: "linear-gradient(135deg, #a855f7, #6366f1)",
        boxShadow: "0 4px 16px rgba(168,85,247,0.4)",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Mail size={11} />
      Open Contact Form →
    </motion.button>
  );
}

type Provider = "groq" | "cerebras";

const PROVIDERS: { id: Provider; label: string; color: string }[] = [
  { id: "groq", label: "Groq", color: "#f97316" },
  { id: "cerebras", label: "Cerebras", color: "#22d3ee" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const [provider, setProvider] = useState<Provider>("groq");
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

  return (
    <div className="fixed bottom-6 right-6 z-9970 flex flex-col items-end gap-3">
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 400,
              maxWidth: "calc(100vw - 24px)",
              height: 560,
              background: "rgba(7, 3, 17, 0.97)",
              border: "1px solid rgba(168,85,247,0.2)",
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(168,85,247,0.08)",
              backdropFilter: "blur(40px)",
            }}
          >
            {/* Top gradient accent line */}
            <div
              className="h-px shrink-0"
              style={{
                background: "linear-gradient(90deg, transparent 0%, #a855f7 30%, #22d3ee 70%, transparent 100%)",
              }}
            />

            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Bot avatar with online indicator */}
              <div className="relative shrink-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #6366f1)",
                    boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                  }}
                >
                  <Bot size={17} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex">
                  <span className="absolute w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50" />
                  <span
                    className="relative w-3 h-3 rounded-full bg-green-400"
                    style={{ border: "1.5px solid rgba(7,3,17,0.97)" }}
                  />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Ask about Nikhil</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {SESSION_LIMIT - msgCount} msgs left · Llama 3 ·{" "}
                  <span style={{ color: provider === "groq" ? "#f97316" : "#22d3ee" }}>
                    {provider === "groq" ? "Groq" : "Cerebras"}
                  </span>
                </p>
              </div>

              {/* Provider toggle */}
              <div
                className="flex items-center gap-0.5 p-1 rounded-lg shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold transition-all duration-200"
                    style={
                      provider === p.id
                        ? {
                            background: `${p.color}20`,
                            color: p.color,
                            border: `1px solid ${p.color}35`,
                          }
                        : { color: "#475569" }
                    }
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear chat history"
                  className="p-1.5 rounded-lg transition-all duration-150 shrink-0"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#f87171";
                    (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#475569";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Trash2 size={13} />
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg transition-all duration-150 shrink-0"
                style={{ color: "#475569" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#475569";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(168,85,247,0.3) transparent" }}
              data-lenis-prevent
            >
              {/* Empty state */}
              {messages.length === 0 && !streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col gap-5"
                >
                  {/* Welcome */}
                  <div className="flex flex-col items-center text-center pt-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(34,211,238,0.1))",
                        border: "1px solid rgba(168,85,247,0.25)",
                        boxShadow: "0 0 30px rgba(168,85,247,0.1)",
                      }}
                    >
                      <Sparkles size={22} className="text-purple-400" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1.5">
                      Hi! I&apos;m Nikhil&apos;s AI assistant
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-55">
                      Ask me anything about his experience, projects, skills, or availability.
                    </p>
                  </div>

                  {/* Suggestion cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {STARTERS.map((s) => (
                      <motion.button
                        key={s.text}
                        onClick={() => send(s.text)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-left p-3.5 rounded-xl transition-all duration-200"
                        style={{
                          background: "rgba(168,85,247,0.06)",
                          border: "1px solid rgba(168,85,247,0.15)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(168,85,247,0.12)";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(168,85,247,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(168,85,247,0.06)";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(168,85,247,0.15)";
                        }}
                      >
                        <span className="block text-base mb-1.5">{s.emoji}</span>
                        <span className="text-xs text-slate-400 leading-snug">{s.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message history */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #a855f7, #6366f1)",
                        boxShadow: "0 0 12px rgba(168,85,247,0.3)",
                      }}
                    >
                      <Bot size={12} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-sm"
                        : "rounded-2xl rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#cbd5e1",
                          }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownMessage text={msg.content} />
                    ) : (
                      msg.content
                    )}
                    {msg.showContactButton && (
                      <ContactButton onNavigate={navigateToContact} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Streaming */}
              {streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
                  >
                    <Bot size={12} className="text-white" />
                  </div>
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#cbd5e1",
                    }}
                  >
                    {streamContent ? (
                      <>
                        <MarkdownMessage text={streamContent} />
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-3.5 bg-purple-400 ml-0.5 align-middle"
                        />
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5 py-0.5">
                        {[0, 0.2, 0.4].map((d) => (
                          <motion.span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.7, delay: d, repeat: Infinity }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Limit reached */}
              {limitReached && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2 py-2"
                >
                  <p className="text-xs text-slate-600">Session limit reached.</p>
                  <button
                    onClick={navigateToContact}
                    className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Mail size={11} />
                    Contact Nikhil directly →
                  </button>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="px-4 pb-4 pt-3 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <MessageSquare size={14} className="text-slate-700 shrink-0" />
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
                  placeholder={limitReached ? "Session limit reached" : "Ask something..."}
                  disabled={limitReached || streaming}
                  className="flex-1 text-sm bg-transparent focus:outline-none disabled:opacity-40"
                  style={{ color: "#e2e8f0" }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => send(input)}
                  disabled={!input.trim() || streaming || limitReached}
                  className="w-8 h-8 rounded-xl flex items-center justify-center disabled:opacity-30 shrink-0 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #6366f1)",
                    boxShadow: "0 0 16px rgba(168,85,247,0.35)",
                  }}
                >
                  {streaming ? (
                    <Loader2 size={13} className="text-white animate-spin" />
                  ) : (
                    <Send size={13} className="text-white" />
                  )}
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-slate-800 mt-2">
                Powered by Llama 3 via {provider === "groq" ? "Groq" : "Cerebras"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating label ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="fab-label"
            initial={{ opacity: 0, x: 12, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.88 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full pointer-events-none self-end mb-1"
            style={{
              background: "rgba(7,3,17,0.92)",
              border: "1px solid rgba(168,85,247,0.4)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 24px rgba(168,85,247,0.18)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles size={11} className="text-purple-400" />
            </motion.span>
            <span className="text-xs font-semibold text-white whitespace-nowrap">Ask AI</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: "0 0 6px #4ade80" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle FAB ── */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white relative"
        style={{
          background: open
            ? "rgba(15,6,35,0.98)"
            : "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #6366f1 100%)",
          border: "1px solid rgba(168,85,247,0.4)",
          boxShadow: open
            ? "0 8px 30px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(168,85,247,0.55), 0 0 0 1px rgba(99,102,241,0.15)",
        }}
        aria-label="Toggle AI chat"
      >
        {/* Pulse ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(168,85,247,0.45)",
                "0 0 0 10px rgba(168,85,247,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block" }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="ai-icon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C9.5 2 7.5 3.5 7 5.5C5.5 5.8 4 7.2 4 9C4 10.1 4.5 11.1 5.3 11.8C5.1 12.2 5 12.6 5 13C5 14.9 6.6 16.4 8.5 16.5C9 17.4 10 18 11 18.2V20H9V22H15V20H13V18.2C14 18 15 17.4 15.5 16.5C17.4 16.4 19 14.9 19 13C19 12.6 18.9 12.2 18.7 11.8C19.5 11.1 20 10.1 20 9C20 7.2 18.5 5.8 17 5.5C16.5 3.5 14.5 2 12 2Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="9.5" cy="9.5" r="1.2" fill="white" />
                <circle cx="14.5" cy="9.5" r="1.2" fill="white" />
                <path d="M9.5 13C9.5 13 10.5 14 12 14C13.5 14 14.5 13 14.5 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!open && messages.length === 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400"
            style={{ border: "2px solid rgba(7,3,17,1)" }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
