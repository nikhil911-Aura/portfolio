"use client";

import { motion } from "framer-motion";

export default function AvatarNew({ size = 420 }: { size?: number }) {
  const h = size * 1.15;

  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: h, position: "relative", userSelect: "none" }}
    >
      {/* Spinning accent ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "50%",
          border: "1.5px solid transparent",
          borderTopColor: "#c084fc",
          borderRightColor: "#818cf8",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      {/* Spinning accent ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: "-36px",
          borderRadius: "50%",
          border: "1px solid transparent",
          borderTopColor: "transparent",
          borderRightColor: "rgba(103,232,249,0.3)",
          borderBottomColor: "rgba(192,132,252,0.3)",
          borderLeftColor: "transparent",
        }}
      />

      <svg
        viewBox="0 0 400 460"
        width={size}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="av-bg" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#16102e" />
            <stop offset="100%" stopColor="#0a0a18" />
          </linearGradient>
          <radialGradient id="av-glow" cx="50%" cy="28%" r="58%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="av-blazer" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#1e2340" />
            <stop offset="100%" stopColor="#0d1020" />
          </linearGradient>
          <linearGradient id="av-lapel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#252e52" />
            <stop offset="100%" stopColor="#19203a" />
          </linearGradient>
          <linearGradient id="av-hair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28284a" />
            <stop offset="100%" stopColor="#0c0c1e" />
          </linearGradient>
          <linearGradient id="av-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <pattern id="av-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.9" fill="rgba(255,255,255,0.04)" />
          </pattern>
          <clipPath id="av-clip">
            <circle cx="200" cy="215" r="193" />
          </clipPath>
          <filter id="av-softglow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle cx="200" cy="215" r="193" fill="url(#av-bg)" />
        <circle cx="200" cy="215" r="193" fill="url(#av-glow)" />
        <circle cx="200" cy="215" r="193" fill="url(#av-dots)" />
        <circle cx="200" cy="215" r="191" stroke="url(#av-ring)" strokeWidth="1.5" strokeOpacity="0.22" />

        <g clipPath="url(#av-clip)">

          {/* ── Blazer body ── */}
          <path
            d="M 50 465 L 50 348 C 50 306 80 287 116 277 L 148 264 L 178 296 L 200 310 L 222 296 L 252 264 L 284 277 C 320 287 350 306 350 348 L 350 465 Z"
            fill="url(#av-blazer)"
          />

          {/* Left lapel */}
          <path
            d="M 116 277 L 148 264 L 178 296 L 186 325 L 200 310 L 200 465 L 50 465 L 50 348 C 50 306 80 287 116 277 Z"
            fill="url(#av-lapel)"
          />

          {/* White shirt V */}
          <path d="M 178 296 L 200 270 L 222 296 L 214 330 L 200 316 L 186 330 Z" fill="#f8fafc" />

          {/* Collar left */}
          <path d="M 178 296 L 186 270 L 195 277 L 186 308 Z" fill="#eaf0f8" />
          {/* Collar right */}
          <path d="M 222 296 L 214 270 L 205 277 L 214 308 Z" fill="#f2f6fc" />

          {/* Tie */}
          <path d="M 197 276 L 200 267 L 203 276 L 205 322 L 200 334 L 195 322 Z" fill="#6d28d9" />
          <path d="M 198.5 278 L 200 269 L 201.5 278 L 202.5 318 L 200 330 L 197.5 318 Z" fill="#7c3aed" />
          {/* Tie knot */}
          <path d="M 196 272 Q 200 263 204 272 Q 201 279 200 281 Q 199 279 196 272 Z" fill="#8b5cf6" />

          {/* Pocket square */}
          <path d="M 268 308 L 278 302 L 286 308 L 283 318 L 270 318 Z" fill="#f0f6fc" />
          <path d="M 270 308 L 273 303" stroke="#ccd8ec" strokeWidth="1" strokeLinecap="round" />

          {/* Blazer buttons */}
          <circle cx="200" cy="362" r="4.5" fill="#0d1020" stroke="#2a3560" strokeWidth="1.5" />
          <circle cx="200" cy="388" r="4.5" fill="#0d1020" stroke="#2a3560" strokeWidth="1.5" />

          {/* Sleeve cuffs */}
          <rect x="52" y="398" width="44" height="16" rx="5" fill="#dde4f0" />
          <rect x="304" y="398" width="44" height="16" rx="5" fill="#dde4f0" />

          {/* Neck */}
          <rect x="184" y="255" width="32" height="30" rx="9" fill="#EFBF8A" />

          {/* ── Head ── */}
          <ellipse cx="200" cy="190" rx="78" ry="86" fill="#EFBF8A" />

          {/* Jaw taper */}
          <ellipse cx="200" cy="268" rx="44" ry="14" fill="#E5AF78" opacity="0.45" />

          {/* Ears */}
          <ellipse cx="122" cy="197" rx="12" ry="16" fill="#E5AF78" />
          <ellipse cx="278" cy="197" rx="12" ry="16" fill="#E5AF78" />
          <ellipse cx="122" cy="197" rx="6" ry="10" fill="#D99A6A" />
          <ellipse cx="278" cy="197" rx="6" ry="10" fill="#D99A6A" />

          {/* ── Hair ── */}
          {/* Crown */}
          <ellipse cx="200" cy="124" rx="80" ry="50" fill="url(#av-hair)" />
          {/* Side volumes */}
          <rect x="121" y="125" width="25" height="70" rx="12" fill="#0c0c1e" />
          <rect x="254" y="125" width="25" height="70" rx="12" fill="#0c0c1e" />
          {/* Front swept wave */}
          <path
            d="M 140 128 Q 164 107 200 114 Q 236 107 260 128 Q 236 117 200 121 Q 164 117 140 128 Z"
            fill="#28284a"
          />
          {/* Side part */}
          <path d="M 158 114 Q 162 130 160 150" stroke="#06060e" strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round" />
          {/* Highlight */}
          <ellipse cx="180" cy="118" rx="18" ry="5" fill="#38386a" opacity="0.65" />
          {/* Sideburns */}
          <path d="M 126 178 Q 124 200 126 220" stroke="#0c0c1e" strokeWidth="10" strokeLinecap="round" />
          <path d="M 274 178 Q 276 200 274 220" stroke="#0c0c1e" strokeWidth="10" strokeLinecap="round" />

          {/* ── Eyebrows — sharp and defined ── */}
          <path d="M 152 169 Q 169 161 188 165" stroke="#4a2c10" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 212 165 Q 231 161 248 169" stroke="#4a2c10" strokeWidth="3.5" strokeLinecap="round" />

          {/* ── Eyes ── */}
          {/* Left */}
          <ellipse cx="172" cy="188" rx="17" ry="17" fill="white" />
          <ellipse cx="172" cy="190" rx="11" ry="12" fill="#14143a" />
          <ellipse cx="172" cy="190" rx="7.5" ry="8.5" fill="#2836a0" />
          <ellipse cx="172" cy="190" rx="4.5" ry="5" fill="#060610" />
          <circle cx="175" cy="185" r="3.5" fill="white" />
          <circle cx="169" cy="194" r="1.5" fill="rgba(255,255,255,0.4)" />
          {/* Right */}
          <ellipse cx="228" cy="188" rx="17" ry="17" fill="white" />
          <ellipse cx="228" cy="190" rx="11" ry="12" fill="#14143a" />
          <ellipse cx="228" cy="190" rx="7.5" ry="8.5" fill="#2836a0" />
          <ellipse cx="228" cy="190" rx="4.5" ry="5" fill="#060610" />
          <circle cx="231" cy="185" r="3.5" fill="white" />
          <circle cx="225" cy="194" r="1.5" fill="rgba(255,255,255,0.4)" />

          {/* ── Glasses (on top of eyes) ── */}
          {/* Left lens */}
          <rect x="147" y="176" width="50" height="28" rx="7" fill="rgba(129,140,248,0.07)" stroke="#c9a84c" strokeWidth="2" />
          {/* Right lens */}
          <rect x="203" y="176" width="50" height="28" rx="7" fill="rgba(129,140,248,0.07)" stroke="#c9a84c" strokeWidth="2" />
          {/* Bridge */}
          <path d="M 197 191 Q 200 188 203 191" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Temples */}
          <line x1="147" y1="191" x2="120" y2="197" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="253" y1="191" x2="280" y2="197" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Nose pads */}
          <circle cx="197" cy="193" r="2" fill="#c9a84c" />
          <circle cx="203" cy="193" r="2" fill="#c9a84c" />
          {/* Lens glare */}
          <line x1="152" y1="180" x2="162" y2="183" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="208" y1="180" x2="218" y2="183" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />

          {/* ── Nose ── */}
          <path d="M 193 214 Q 200 225 207 214" stroke="#C0906A" strokeWidth="2" strokeLinecap="round" />
          <path d="M 190 220 Q 195 230 200 230 Q 205 230 210 220" stroke="#C0906A" strokeWidth="1.5" strokeLinecap="round" />

          {/* ── Mouth — confident smile ── */}
          <path d="M 182 242 Q 200 255 218 242" stroke="#A06838" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 186 238 Q 194 233 200 235 Q 206 233 214 238" stroke="#b07840" strokeWidth="1.5" strokeLinecap="round" />

          {/* Subtle cheek blush */}
          <ellipse cx="148" cy="226" rx="16" ry="8" fill="#F87171" opacity="0.1" />
          <ellipse cx="252" cy="226" rx="16" ry="8" fill="#F87171" opacity="0.1" />

        </g>

        {/* ── Floating code cards ── */}
        <FloatingCard x={6}   y={76}  delay={0}   line1="const dev" line2="= 'Nikhil'" color="#c084fc" />
        <FloatingCard x={302} y={80}  delay={1.0} line1="deploy()" line2="→ live ✓" color="#818cf8" />
        <FloatingCard x={8}   y={314} delay={2.0} line1="K8s + CI" line2="↑ 99.9%" color="#67e8f9" />
        <FloatingCard x={304} y={308} delay={1.5} line1="AI ready" line2="enabled ✦" color="#fcd34d" />
      </svg>
    </motion.div>
  );
}

function FloatingCard({
  x, y, delay, line1, line2, color,
}: {
  x: number; y: number; delay: number; line1: string; line2: string; color: string;
}) {
  return (
    <motion.g
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3.5 + delay * 0.25, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* Shadow */}
      <rect x={x + 3} y={y + 3} width={86} height={46} rx={9} fill="rgba(0,0,0,0.45)" />
      {/* Card bg */}
      <rect x={x} y={y} width={86} height={46} rx={9} fill="#0d0b1e" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      {/* Top accent bar */}
      <rect x={x} y={y} width={86} height={3} rx="3" fill={color} fillOpacity="0.6" />
      {/* macOS dots */}
      <circle cx={x + 10} cy={y + 11} r={2.5} fill="#ef4444" fillOpacity="0.7" />
      <circle cx={x + 19} cy={y + 11} r={2.5} fill="#f59e0b" fillOpacity="0.7" />
      <circle cx={x + 28} cy={y + 11} r={2.5} fill="#22c55e" fillOpacity="0.7" />
      {/* Code text */}
      <text x={x + 9} y={y + 28} fill={color} fontSize="9" fontFamily="monospace" fontWeight="700" fillOpacity="0.95">{line1}</text>
      <text x={x + 9} y={y + 39} fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="monospace">{line2}</text>
    </motion.g>
  );
}
