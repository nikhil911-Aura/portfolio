"use client";

import { motion } from "framer-motion";
import Magnet from "./Magnet";
import ContactBtn from "./ContactBtn";
import AvatarNew from "./AvatarNew";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const fadeUp = (delay: number, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function HeroNew() {
  return (
    <section
      id="hero"
      style={{
        background: "#0C0C0C",
        height: "100svh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "clip",
        position: "relative",
      }}
    >
      {/* ── Navbar ── */}
      <motion.nav
        {...fadeUp(0, -20)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "clamp(1.25rem,3vw,2rem) clamp(1.5rem,4vw,2.5rem)",
          position: "relative",
          zIndex: 20,
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "#D7E2EA",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "clamp(0.8rem, 1.2vw, 1.4rem)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
          </a>
        ))}
      </motion.nav>

      {/* ── Hero Heading ── */}
      <div style={{ overflow: "hidden" }}>
        <motion.h1
          {...fadeUp(0.15, 40)}
          className="hero-heading"
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            width: "100%",
            fontSize: "clamp(13vw, 17.5vw, 17.5vw)",
            marginTop: "clamp(0.5rem, -2vw, -1.25rem)",
            paddingLeft: "clamp(1rem, 2vw, 2rem)",
          }}
        >
          Hi, i&apos;m nikhil
        </motion.h1>
      </div>

      {/* ── Portrait (Illustrated Avatar) ── */}
      <motion.div
        {...fadeUp(0.6, 30)}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Magnet padding={150} strength={3}>
          <AvatarNew size={420} />
        </Magnet>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 clamp(1.5rem,4vw,2.5rem) clamp(1.75rem,2.5vw,2.5rem)",
          position: "relative",
          zIndex: 20,
        }}
      >
        <motion.p
          {...fadeUp(0.35, 20)}
          style={{
            color: "#D7E2EA",
            fontWeight: 300,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1.3,
            fontSize: "clamp(0.72rem, 1.3vw, 1.4rem)",
            maxWidth: "clamp(160px, 22vw, 280px)",
          }}
        >
          a full stack engineer building cloud-native, ai-powered digital products
        </motion.p>

        <motion.div {...fadeUp(0.5, 20)}>
          <ContactBtn />
        </motion.div>
      </div>
    </section>
  );
}
