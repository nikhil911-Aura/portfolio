"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, Mail, Send, Sparkles, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  showContactButton?: boolean;
}

const STARTERS = [
  "What's Nikhil's tech stack?",
  "Tell me about his projects",
  "Is he available for hire?",
  "What DevOps tools does he use?",
];

const SESSION_KEY = "portfolio-chat-count";
const SESSION_LIMIT = 15;

const CONTACT_INTENT = /\b(send|write|shoot|drop|forward|submit)\b.{0,30}\b(email|mail|message|msg)\b|\b(contact|reach|message|email|hire|ping|dm)\b.{0,20}\b(nikhil|him|you|them)\b|\b(get in touch|reach out|how (do i|can i|to) contact|how (do i|can i|to) reach)\b/i;

function ContactButton({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      onClick={onNavigate}
      className="mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white w-fit"
      style={{
        background: "linear-gradient(135deg, #9333ea, #3b82f6)",
        boxShadow: "0 4px 16px rgba(147,51,234,0.35)",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <Mail size={12} />
      Open Contact Form →
    </motion.button>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = parseInt(sessionStorage.getItem(SESSION_KEY) ?? "0");
    const clamped = Math.max(0, Math.min(raw, SESSION_LIMIT));
    if (clamped !== raw) sessionStorage.setItem(SESSION_KEY, String(clamped));
    setMsgCount(clamped);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamContent]);

  const navigateToContact = () => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
    sessionStorage.setItem(SESSION_KEY, String(newCount));

    // Detect contact intent — skip API, show navigation button
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
          content:
            "Sorry, something went wrong. Please email baghelnikhil911@gmail.com directly.",
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
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
            className="w-90 max-w-[calc(100vw-32px)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: 500,
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 50px rgba(147,51,234,0.1)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(147,51,234,0.14), rgba(6,182,212,0.06))",
                borderBottom: "1px solid var(--card-border)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #9333ea, #06b6d4)" }}
              >
                <Bot size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Ask about Nikhil</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Llama 3 · Groq · {SESSION_LIMIT - msgCount} msgs left
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 hide-scrollbar">
              {/* Starter prompts */}
              {messages.length === 0 && !streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Hi! I can answer anything about Nikhil&apos;s experience, projects, and availability.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTERS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="text-xs px-3 py-1.5 rounded-xl text-slate-400 hover:text-white transition-all duration-200"
                        style={{
                          background: "rgba(147,51,234,0.08)",
                          border: "1px solid rgba(147,51,234,0.22)",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message history */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                            color: "#fff",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "var(--text)",
                          }
                    }
                  >
                    {msg.content}
                    {msg.showContactButton && (
                      <ContactButton onNavigate={navigateToContact} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="max-w-[86%] px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text)",
                    }}
                  >
                    {streamContent ? (
                      <>
                        {streamContent}
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

              {/* Session limit message */}
              {limitReached && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2 mt-1"
                >
                  <p className="text-center text-xs text-slate-500">
                    Session limit reached.
                  </p>
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

            {/* Input */}
            <div
              className="px-3 py-3 shrink-0"
              style={{ borderTop: "1px solid var(--card-border)" }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
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
                  className="flex-1 text-sm bg-transparent focus:outline-none placeholder-slate-600 disabled:opacity-40"
                  style={{ color: "var(--text)" }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => send(input)}
                  disabled={!input.trim() || streaming || limitReached}
                  className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-35 transition-opacity shrink-0"
                  style={{ background: "linear-gradient(135deg, #9333ea, #3b82f6)" }}
                >
                  {streaming ? (
                    <Loader2 size={12} className="text-white animate-spin" />
                  ) : (
                    <Send size={12} className="text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating label ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="fab-label"
            initial={{ opacity: 0, x: 16, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.88 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none self-end mb-1"
            style={{
              background: "rgba(10,4,20,0.85)",
              border: "1px solid rgba(147,51,234,0.35)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(147,51,234,0.2)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              className="text-purple-400"
            >
              <Sparkles size={11} />
            </motion.span>
            <span className="text-xs font-medium text-white whitespace-nowrap">Ask AI</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: "0 0 6px #4ade80" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white relative"
        style={{
          background: open
            ? "rgba(20,8,40,0.95)"
            : "linear-gradient(135deg, #9333ea 0%, #6366f1 50%, #3b82f6 100%)",
          border: "1px solid rgba(147,51,234,0.5)",
          boxShadow: open
            ? "0 8px 30px rgba(147,51,234,0.2)"
            : "0 8px 32px rgba(147,51,234,0.5), 0 0 0 1px rgba(99,102,241,0.2)",
        }}
        aria-label="Toggle AI chat"
      >
        {/* Animated ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-2xl"
            animate={{ boxShadow: ["0 0 0 0px rgba(147,51,234,0.4)", "0 0 0 8px rgba(147,51,234,0)"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
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
              transition={{ duration: 0.18 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Custom AI icon — brain with sparkle */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.5 2 7.5 3.5 7 5.5C5.5 5.8 4 7.2 4 9C4 10.1 4.5 11.1 5.3 11.8C5.1 12.2 5 12.6 5 13C5 14.9 6.6 16.4 8.5 16.5C9 17.4 10 18 11 18.2V20H9V22H15V20H13V18.2C14 18 15 17.4 15.5 16.5C17.4 16.4 19 14.9 19 13C19 12.6 18.9 12.2 18.7 11.8C19.5 11.1 20 10.1 20 9C20 7.2 18.5 5.8 17 5.5C16.5 3.5 14.5 2 12 2Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                <motion.circle cx="9.5" cy="9.5" r="1.2" fill="white" />
                <motion.circle cx="14.5" cy="9.5" r="1.2" fill="white" />
                <path d="M9.5 13C9.5 13 10.5 14 12 14C13.5 14 14.5 13 14.5 13" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse dot — only before first message */}
        {!open && messages.length === 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#050507]"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
