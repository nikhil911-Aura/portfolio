import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// IP-based rate limiter: max 3 submissions per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP (works on Vercel and Node)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in an hour." },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Email to admin
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e1e2e;">
          <div style="margin-bottom: 24px;">
            <h2 style="margin: 0 0 4px; font-size: 20px; color: #a855f7;">New Portfolio Message</h2>
            <p style="margin: 0; font-size: 13px; color: #64748b;">via nikhilsingh.dev contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 13px; color: #64748b; width: 80px;">From</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 14px; color: #f8fafc;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 13px; color: #64748b;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 14px;">
                <a href="mailto:${escapeHtml(email)}" style="color: #22d3ee; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>

          <div style="background: #0f0f1a; border-radius: 8px; padding: 16px; border: 1px solid #1e293b;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b;">
            <a href="mailto:${escapeHtml(email)}?subject=Re: Your message on Nikhil's portfolio"
               style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #9333ea, #3b82f6); color: #fff; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 500;">
              Reply to ${escapeHtml(name)}
            </a>
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Nikhil Singh" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Got your message — Nikhil Singh",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e1e2e;">
          <h2 style="margin: 0 0 16px; font-size: 22px; background: linear-gradient(135deg, #a855f7, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Hey ${escapeHtml(name)}, thanks for reaching out!
          </h2>
          <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 16px;">
            I've received your message and will get back to you within <strong style="color: #e2e8f0;">24 hours</strong>.
          </p>
          <div style="background: #0f0f1a; border-radius: 8px; padding: 16px; border-left: 3px solid #9333ea; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 13px; color: #64748b; font-style: italic; line-height: 1.6;">"${escapeHtml(message.slice(0, 200))}${message.length > 200 ? "…" : ""}"</p>
          </div>
          <p style="color: #64748b; font-size: 13px; margin: 0 0 24px;">While you wait, feel free to check out my work:</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="https://devworld-nu.vercel.app" style="padding: 8px 14px; background: rgba(147,51,234,0.15); color: #a855f7; text-decoration: none; border-radius: 6px; font-size: 12px; border: 1px solid rgba(147,51,234,0.3);">DevWorld</a>
            <a href="https://github.com/Nick-ui911" style="padding: 8px 14px; background: rgba(255,255,255,0.04); color: #94a3b8; text-decoration: none; border-radius: 6px; font-size: 12px; border: 1px solid rgba(255,255,255,0.1);">GitHub</a>
          </div>
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; color: #334155;">
            Nikhil Singh · Full Stack + DevOps + GenAI Engineer
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact mail error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
