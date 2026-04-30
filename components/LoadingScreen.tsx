"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const nRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nikhilRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(nikhilRef.current, { y: 90, opacity: 0 });
    gsap.set(counterRef.current, { opacity: 0 });
    gsap.set([topCurtainRef.current, bottomCurtainRef.current], { opacity: 0 });

    let counterInterval: ReturnType<typeof setInterval> | null = null;

    const tl = gsap.timeline();

    tl
      .to({}, { duration: 0.85 })

      // NS splits apart
      .to(nRef.current, { x: "-42vw", duration: 0.52, ease: "power3.in" }, "split")
      .to(sRef.current, { x: "42vw", duration: 0.52, ease: "power3.in" }, "split")

      // Line draws across
      .to(lineRef.current, { scaleX: 1, duration: 0.42, ease: "power2.inOut" }, "-=0.08")

      // NIKHIL slams in from below
      .to(nikhilRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" }, "-=0.08")

      // Counter fades in + starts
      .to(counterRef.current, { opacity: 1, duration: 0.18 }, "-=0.18")
      .call(() => {
        let count = 0;
        const el = counterRef.current;
        if (!el) return;
        counterInterval = setInterval(() => {
          count += Math.floor(Math.random() * 9) + 3;
          if (count >= 100) {
            count = 100;
            if (counterInterval) clearInterval(counterInterval);
          }
          el.textContent = count.toString().padStart(3, "0");
        }, 32);
      })

      // Hold while counter runs
      .to({}, { duration: 1.25 })

      // NIKHIL flies up + fades
      .to(nikhilRef.current, { y: -70, opacity: 0, duration: 0.48, ease: "power3.in" })

      // Line retracts
      .to(lineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.32,
        ease: "power2.in",
      }, "-=0.28")

      // Counter fades
      .to(counterRef.current, { opacity: 0, duration: 0.18 }, "-=0.28")

      // Curtains appear + split
      .call(() => {
        gsap.set([topCurtainRef.current, bottomCurtainRef.current], { opacity: 1 });
      })
      .to(topCurtainRef.current, { yPercent: -100, duration: 0.65, ease: "power3.inOut" }, "exit")
      .to(bottomCurtainRef.current, { yPercent: 100, duration: 0.65, ease: "power3.inOut" }, "exit")
      .call(() => setVisible(false));

    return () => {
      tl.kill();
      if (counterInterval) clearInterval(counterInterval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 99999, background: "#000" }}>
      {/* Split curtains */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: "50%", background: "#000", zIndex: 2, opacity: 0 }}
      />
      <div
        ref={bottomCurtainRef}
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "50%", background: "#000", zIndex: 2, opacity: 0 }}
      />

      {/* Content layer */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        {/* NS monogram */}
        <div className="absolute flex items-center gap-3">
          <span
            ref={nRef}
            className="font-mono font-black select-none text-white"
            style={{ fontSize: "clamp(5rem, 14vw, 10rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            N
          </span>
          <span
            ref={sRef}
            className="font-mono font-black select-none"
            style={{
              fontSize: "clamp(5rem, 14vw, 10rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              background: "linear-gradient(135deg, #9333ea, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            S
          </span>
        </div>

        {/* Horizontal gradient line */}
        <div
          ref={lineRef}
          className="absolute"
          style={{
            width: "min(58vw, 620px)",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.85) 30%, rgba(6,182,212,0.85) 70%, transparent)",
          }}
        />

        {/* NIKHIL text */}
        <div
          ref={nikhilRef}
          className="absolute select-none font-black text-white"
          style={{
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            letterSpacing: "0.35em",
          }}
        >
          NIKHIL
        </div>
      </div>

      {/* Counter — top right */}
      <div
        ref={counterRef}
        className="absolute top-6 right-8 font-mono text-white tabular-nums select-none"
        style={{ fontSize: "clamp(1.1rem, 2.8vw, 2rem)", opacity: 0 }}
      >
        000
      </div>
    </div>
  );
}
