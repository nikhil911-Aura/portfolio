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
        justifyContent: "space-between",
        background: "#f4efe6",
        padding: "72px 80px",
        color: "#221e19",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#857b6d" }}>
        <span>Nikhil Singh</span>
        <span>Indore, India</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 78, lineHeight: 1.05, letterSpacing: "-3px", maxWidth: 960, display: "flex", flexWrap: "wrap" }}>
          <span>I build&nbsp;</span>
          <span style={{ color: "#9a4528" }}>reliable</span>
          <span>&nbsp;software, from interface to infrastructure.</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #221e19",
          paddingTop: 24,
          fontSize: 20,
          color: "#4d463c",
        }}
      >
        <span>Full Stack · DevOps · GenAI</span>
        <span>github.com/Nick-ui911</span>
      </div>
    </div>,
    { ...size }
  );
}
