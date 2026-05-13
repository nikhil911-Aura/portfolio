"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Char({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const display = char === " " ? " " : char;
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{display}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {display}
      </motion.span>
    </span>
  );
}

interface AnimatedCharTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCharText({
  text,
  className = "",
  style,
}: AnimatedCharTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = text.split("");

  return (
    <p ref={ref} className={className} style={{ position: "relative", ...style }}>
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          start={i / chars.length}
          end={(i + 1) / chars.length}
        />
      ))}
    </p>
  );
}
