"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile, socials } from "@/lib/content";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
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
    <Section
      id="contact"
      num="06"
      label="Contact"
      title={
        <>
          Have something in mind? <em className="text-accent">Let&apos;s talk.</em>
        </>
      }
      intro={`I'm currently at ${profile.current.company} and open to new opportunities — full-time roles, freelance projects and collaborations.`}
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Direct details */}
        <Reveal className="lg:col-span-5">
          <a
            href={`mailto:${profile.email}`}
            className="link-underline font-serif text-2xl break-all sm:text-[1.9rem]"
          >
            {profile.email}
          </a>
          <dl className="mt-10 border-t border-rule">
            <Row label="Phone">
              <a href={profile.phoneHref} className="link-underline">
                {profile.phone}
              </a>
            </Row>
            {socials.map((s) => (
              <Row key={s.label} label={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {s.handle} ↗
                </a>
              </Row>
            ))}
            <Row label="Location">{profile.location}</Row>
          </dl>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-sm border border-rule bg-card p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <Status
                  key="success"
                  title="Message sent."
                  body="Thank you for reaching out. A confirmation is on its way to your inbox, and I'll reply within a day."
                />
              ) : formState === "error" ? (
                <Status
                  key="error"
                  title="That didn't go through."
                  body={errorMsg || "Something went wrong. Please email me directly."}
                  action={
                    <button onClick={() => setFormState("idle")} className="link-underline mt-6 text-sm text-accent">
                      Try again
                    </button>
                  }
                />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8"
                >
                  <p className="font-serif text-xl">Send a note</p>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field
                      label="Name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>
                  <Field
                    label="Message"
                    multiline
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-deep disabled:opacity-60"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4 text-[0.95rem]">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}

function Status({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="py-10"
    >
      <p className="font-serif text-3xl">{title}</p>
      <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{body}</p>
      {action}
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const cls =
    "mt-2 w-full border-0 border-b border-rule bg-transparent pb-2 text-ink placeholder:text-muted/60 transition-colors focus:border-ink focus:outline-none";
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-none`}
          placeholder="A few lines about what you have in mind"
        />
      ) : (
        <input
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}
