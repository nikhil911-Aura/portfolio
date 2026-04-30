"use client";

// Pure CSS aurora — no canvas, no JS per frame, runs on GPU compositor thread
const blobs = [
  { x: 18,  y: 28, size: 65, rgb: "147,51,234",  alpha: 0.28, duration: 18, delay: 0   },
  { x: 72,  y: 38, size: 60, rgb: "6,182,212",   alpha: 0.22, duration: 22, delay: -6  },
  { x: 50,  y: 75, size: 55, rgb: "59,130,246",  alpha: 0.18, duration: 26, delay: -11 },
  { x: 85,  y: 15, size: 48, rgb: "99,102,241",  alpha: 0.16, duration: 20, delay: -4  },
  { x: 10,  y: 80, size: 44, rgb: "20,184,166",  alpha: 0.14, duration: 24, delay: -9  },
  { x: 55,  y: 50, size: 36, rgb: "6,182,212",   alpha: 0.12, duration: 16, delay: -2  },
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
