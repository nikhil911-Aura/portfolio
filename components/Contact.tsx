"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, Loader2, ExternalLink, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "baghelnikhil911@gmail.com",
    href: "mailto:baghelnikhil911@gmail.com",
    color: "#9333ea",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9755716505",
    href: "tel:+919755716505",
    color: "#22c55e",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "Nick-ui911",
    href: "https://github.com/Nick-ui911",
    color: "#e2e8f0",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "nikhil-singh-318515308",
    href: "https://www.linkedin.com/in/nikhil-singh-318515308",
    color: "#0A66C2",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setFormState("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 6000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(147,51,234,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-purple-400 tracking-widest uppercase mb-3 font-medium">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Let&apos;s{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Together
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto">
            Whether it&apos;s a full-time role, freelance project, or just a conversation — I&apos;m open to it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div
              className="p-6 rounded-2xl mb-2"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Available for hire
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                I&apos;m currently open to full-time roles in Full Stack, DevOps, or GenAI engineering. Remote-friendly.
              </p>
            </div>

            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{ background: `${link.color}15` }}
                >
                  <link.icon size={16} style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600">{link.label}</p>
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                    {link.value}
                  </p>
                </div>
                <ExternalLink size={13} className="text-slate-700 group-hover:text-slate-500 transition-colors shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div
              className="p-6 sm:p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)",
                }}
              />

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 size={52} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-slate-400 text-center text-sm max-w-xs">
                      Thanks for reaching out. You&apos;ll receive a confirmation email shortly — I&apos;ll reply within 24 hours.
                    </p>
                  </motion.div>
                ) : formState === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4 }}
                    >
                      <AlertCircle size={52} className="text-red-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Couldn&apos;t send</h3>
                    <p className="text-slate-400 text-center text-sm max-w-xs">
                      {errorMsg || "Something went wrong. Please email me directly."}
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Try again
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        label="Your Name"
                        type="text"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        required
                      />
                      <FormField
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        required
                      />
                    </div>
                    <FloatingTextarea
                      label="Your Message"
                      value={form.message}
                      onChange={(v) => setForm({ ...form, message: v })}
                      required
                    />

                    <motion.button
                      type="submit"
                      disabled={formState === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #9333ea, #3b82f6)",
                        boxShadow: "0 0 30px rgba(147,51,234,0.3)",
                      }}
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm text-white focus:outline-none transition-all duration-200"
        style={{
          background: "var(--input-bg)",
          border: `1px solid ${focused ? "rgba(147,51,234,0.5)" : "var(--card-border)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(147,51,234,0.08)" : "none",
        }}
        placeholder=""
      />
      <motion.label
        animate={{
          top: floated ? "6px" : "50%",
          y: floated ? "0%" : "-50%",
          fontSize: floated ? "10px" : "13px",
          color: focused ? "#a855f7" : floated ? "#64748b" : "#475569",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="pointer-events-none absolute left-4 font-medium tracking-wide"
        style={{ originX: 0 }}
      >
        {label}
      </motion.label>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px rounded-full origin-left"
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: "linear-gradient(90deg, #9333ea, #06b6d4)" }}
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-7 pb-3 rounded-xl text-sm text-white resize-none focus:outline-none transition-all duration-200"
        style={{
          background: "var(--input-bg)",
          border: `1px solid ${focused ? "rgba(147,51,234,0.5)" : "var(--card-border)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(147,51,234,0.08)" : "none",
        }}
        placeholder=""
      />
      <motion.label
        animate={{
          top: floated ? "8px" : "20px",
          fontSize: floated ? "10px" : "13px",
          color: focused ? "#a855f7" : floated ? "#64748b" : "#475569",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="pointer-events-none absolute left-4 font-medium tracking-wide"
        style={{ originX: 0 }}
      >
        {label}
      </motion.label>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px rounded-full origin-left"
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: "linear-gradient(90deg, #9333ea, #06b6d4)" }}
      />
    </div>
  );
}
