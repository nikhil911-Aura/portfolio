"use client";

// Pure CSS aurora — no canvas, no JS per frame, runs on GPU compositor thread
// Palette: violet #a855f7 · orange #f97316 · cyan #22d3ee · indigo #6366f1
const blobs = [
  { x: 18,  y: 28, size: 68, rgb: "168,85,247",   alpha: 0.28, duration: 18, delay: 0   }, // violet
  { x: 72,  y: 38, size: 62, rgb: "249,115,22",   alpha: 0.20, duration: 22, delay: -6  }, // orange
  { x: 50,  y: 75, size: 56, rgb: "34,211,238",   alpha: 0.18, duration: 26, delay: -11 }, // cyan
  { x: 85,  y: 15, size: 50, rgb: "99,102,241",   alpha: 0.16, duration: 20, delay: -4  }, // indigo
  { x: 10,  y: 80, size: 45, rgb: "168,85,247",   alpha: 0.14, duration: 24, delay: -9  }, // violet
  { x: 55,  y: 50, size: 38, rgb: "249,115,22",   alpha: 0.10, duration: 16, delay: -2  }, // orange
];

export default function AuroraBackground() {
  return (
    <>
      <style>{`
        @keyframes aurora-drift-0 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(6%,4%) scale(1.08); }
          66%      { transform: translate(-4%,-6%) scale(0.94); }
        }
        @keyframes aurora-drift-1 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(-7%,5%) scale(1.06); }
          66%      { transform: translate(5%,-4%) scale(0.96); }
        }
        @keyframes aurora-drift-2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(5%,-7%) scale(1.04); }
          66%      { transform: translate(-6%,4%) scale(0.97); }
        }
        @keyframes aurora-drift-3 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(-5%,6%) scale(1.07); }
          66%      { transform: translate(7%,-3%) scale(0.95); }
        }
        @keyframes aurora-drift-4 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(8%,-4%) scale(1.05); }
          66%      { transform: translate(-3%,7%) scale(0.96); }
        }
        @keyframes aurora-drift-5 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(-6%,-5%) scale(1.09); }
          66%      { transform: translate(4%,6%) scale(0.93); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {blobs.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}vmax`,
              height: `${b.size}vmax`,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${b.rgb},${b.alpha}) 0%, rgba(${b.rgb},${b.alpha * 0.4}) 40%, transparent 70%)`,
              animation: `aurora-drift-${i} ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </>
  );
}
