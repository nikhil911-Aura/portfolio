"use client";

import { useEffect, useRef } from "react";

export default function NoiseGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 256;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let animId: number;
    let frame = 0;

    const draw = () => {
      frame++;
      if (frame % 3 === 0) {
        const imageData = ctx.createImageData(SIZE, SIZE);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 22;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9990,
        width: "100%",
        height: "100%",
        opacity: 0.038,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
    />
  );
}
