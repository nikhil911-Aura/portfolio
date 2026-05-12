"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setVisible(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #a855f7, #6366f1, #22d3ee)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}
