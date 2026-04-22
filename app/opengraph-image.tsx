import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#050507",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(147,51,234,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "200px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(6,182,212,0.2))",
          border: "1.5px solid rgba(147,51,234,0.5)",
          fontSize: 20,
          fontWeight: 800,
          color: "#a855f7",
          marginBottom: 32,
        }}
      >
        NS
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 68,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.05,
          marginBottom: 12,
          letterSpacing: "-2px",
        }}
      >
        Nikhil Singh
      </div>

      {/* Role with gradient */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 500,
          color: "#a855f7",
          marginBottom: 20,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        Full Stack · DevOps · GenAI Engineer
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 18,
          color: "#94a3b8",
          lineHeight: 1.6,
          maxWidth: 640,
          marginBottom: 40,
        }}
      >
        Building scalable systems, automating workflows, and integrating AI
        into real-world products at IBR Infotech LLP.
      </div>

      {/* Tech badges */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["React", "Next.js", "Node.js", "Docker", "Kubernetes", "AWS", "GenAI"].map(
          (tech) => (
            <div
              key={tech}
              style={{
                padding: "7px 16px",
                borderRadius: 24,
                background: "rgba(147,51,234,0.12)",
                border: "1px solid rgba(147,51,234,0.3)",
                color: "#c084fc",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          )
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          right: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#334155",
            fontSize: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
          Open to opportunities
        </div>
        <div style={{ color: "#334155", fontSize: 14 }}>
          github.com/Nick-ui911
        </div>
      </div>
    </div>,
    { ...size }
  );
}
