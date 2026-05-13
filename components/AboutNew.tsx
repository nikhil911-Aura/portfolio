/* eslint-disable @next/next/no-img-element */
"use client";

import FadeInView from "./FadeInView";
import AnimatedCharText from "./AnimatedCharText";
import ContactBtn from "./ContactBtn";

const BIO =
  "With over a year of professional experience in full-stack engineering, I focus on building scalable cloud systems, shipping production-grade web apps, and integrating AI automation into real workflows. I truly enjoy working with teams and products that aim to stand out through technology. Let's build something incredible together!";

export default function AboutNew() {
  return (
    <section
      id="about"
      style={{
        background: "#0C0C0C",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem clamp(1.25rem, 5vw, 2.5rem)",
        overflow: "hidden",
      }}
    >
      {/* ── Decorative 3D corner images ── */}

      {/* Top-left: Moon */}
      <FadeInView
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        style={{ position: "absolute", top: "4%", left: "clamp(0.5rem,4%,4%)", zIndex: 0 }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          style={{ width: "clamp(90px,16vw,210px)", display: "block" }}
        />
      </FadeInView>

      {/* Bottom-left */}
      <FadeInView
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        style={{ position: "absolute", bottom: "8%", left: "clamp(1rem,10%,10%)", zIndex: 0 }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          style={{ width: "clamp(70px,14vw,180px)", display: "block" }}
        />
      </FadeInView>

      {/* Top-right: Lego */}
      <FadeInView
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        style={{ position: "absolute", top: "4%", right: "clamp(0.5rem,4%,4%)", zIndex: 0 }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          style={{ width: "clamp(90px,16vw,210px)", display: "block" }}
        />
      </FadeInView>

      {/* Bottom-right */}
      <FadeInView
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        style={{ position: "absolute", bottom: "8%", right: "clamp(1rem,10%,10%)", zIndex: 0 }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          style={{ width: "clamp(100px,18vw,220px)", display: "block" }}
        />
      </FadeInView>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(2.5rem, 5vw, 4rem)",
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <FadeInView delay={0} y={40}>
          <h2
            className="hero-heading"
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3rem, 12vw, 160px)",
            }}
          >
            About me
          </h2>
        </FadeInView>

        {/* Animated bio */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(4rem, 8vw, 6rem)" }}>
          <AnimatedCharText
            text={BIO}
            style={{
              color: "#D7E2EA",
              fontWeight: 500,
              lineHeight: 1.75,
              maxWidth: 560,
              fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
            }}
          />
          <FadeInView delay={0.2} y={20}>
            <ContactBtn />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
