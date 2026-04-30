"use client";

import { useEffect, useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: string;
  delay?: number;
  once?: boolean;
}

export default function TextScramble({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  once = true,
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = text.split("");
    el.innerHTML = chars
      .map((c) => `<span style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`)
      .join("");
    const spans = Array.from(el.querySelectorAll("span")) as HTMLElement[];

    const scramble = () => {
      if (once && hasRun.current) return;
      hasRun.current = true;

      spans.forEach((span, i) => {
        const original = chars[i] === " " ? " " : chars[i];
        const maxScrambles = 7;
        let count = 0;

        gsap.to({}, {
          duration: 0.04 * maxScrambles,
          delay: delay + i * 0.04,
          repeat: maxScrambles - 1,
          onRepeat() {
            count++;
            if (count < maxScrambles - 1) {
              span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          },
          onComplete() {
            span.textContent = original;
          },
        });
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: scramble,
      onEnterBack: once ? undefined : scramble,
    });

    return () => trigger.kill();
  }, [text, delay, once]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return <Component ref={ref} className={className}>{text}</Component>;
}
