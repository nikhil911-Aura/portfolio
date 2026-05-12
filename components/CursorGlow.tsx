"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const view = viewRef.current;
    if (!dot || !ring) return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out", overwrite: "auto" });
      };

      const onEnterInteractive = () => {
        gsap.to(ring, { scale: 2, borderColor: "rgba(168,85,247,0.9)", duration: 0.25, ease: "power2.out" });
        gsap.to(dot, { scale: 0.4, duration: 0.2 });
      };

      const onLeaveInteractive = () => {
        gsap.to(ring, { scale: 1, borderColor: "rgba(168,85,247,0.6)", duration: 0.25, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      };

      const onEnterCard = () => {
        gsap.to(ring, { scale: 3.5, duration: 0.35, ease: "power2.out", borderColor: "rgba(168,85,247,1)" });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
        if (view) gsap.to(view, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.5)" });
      };

      const onLeaveCard = () => {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power2.out", borderColor: "rgba(168,85,247,0.6)" });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
        if (view) gsap.to(view, { opacity: 0, scale: 0.5, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMove);

      const refreshTargets = () => {
        document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
        document.querySelectorAll("[data-cursor-view]").forEach((el) => {
          el.addEventListener("mouseenter", onEnterCard);
          el.addEventListener("mouseleave", onLeaveCard);
        });
      };

      refreshTargets();
      // Re-scan after React paint
      const t = setTimeout(refreshTargets, 1000);

      return () => {
        window.removeEventListener("mousemove", onMove);
        clearTimeout(t);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#a855f7",
          translate: "-50% -50%",
          willChange: "transform",
        }}
      />

      {/* Ring — lagged follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99997] flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(168,85,247,0.6)",
          translate: "-50% -50%",
          willChange: "transform",
          background: "rgba(168,85,247,0.04)",
        }}
      >
        <span
          ref={viewRef}
          style={{
            opacity: 0,
            scale: "0.5",
            fontSize: 7,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.08em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
