import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        background: "linear-gradient(135deg, #9333ea, #3b82f6)",
        fontFamily: "sans-serif",
        fontWeight: 800,
        fontSize: 13,
        color: "white",
        letterSpacing: "-0.5px",
      }}
    >
      NS
    </div>,
    { ...size }
  );
}
