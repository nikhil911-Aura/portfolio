"use client";

interface ContactBtnProps {
  className?: string;
  href?: string;
}

export default function ContactBtn({ className = "", href = "#contact" }: ContactBtnProps) {
  return (
    <a
      href={href}
      className={className}
      style={{
        display: "inline-block",
        padding: "clamp(0.75rem, 1.2vw, 1rem) clamp(2rem, 3vw, 3rem)",
        borderRadius: "9999px",
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
        color: "white",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontSize: "clamp(0.7rem, 1vw, 0.95rem)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "opacity 0.2s",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      Contact Me
    </a>
  );
}
