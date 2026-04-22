import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikhil Singh — Full Stack + DevOps + GenAI Engineer",
  description:
    "I build scalable systems, automate workflows, and integrate AI into real-world products. Full Stack Engineer at IBR Infotech LLP.",
  keywords: [
    "Nikhil Singh",
    "Full Stack Engineer",
    "DevOps",
    "GenAI",
    "MERN",
    "Kubernetes",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Nikhil Singh" }],
  openGraph: {
    title: "Nikhil Singh — Full Stack + DevOps + GenAI Engineer",
    description:
      "I build scalable systems, automate workflows, and integrate AI into real-world products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#050507] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
