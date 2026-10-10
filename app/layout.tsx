import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Singh — Full Stack Engineer",
  description:
    "Full-stack engineer building web applications, cloud infrastructure and AI-powered workflows. Based in Indore, India.",
  keywords: ["Nikhil Singh", "Full Stack Engineer", "DevOps", "GenAI", "MERN", "Kubernetes", "React", "Next.js"],
  authors: [{ name: "Nikhil Singh" }],
  metadataBase: new URL("https://nikhilsingh.dev"),
  openGraph: {
    title: "Nikhil Singh — Full Stack Engineer",
    description: "Building web applications, cloud infrastructure and AI-powered workflows.",
    type: "website",
    url: "https://nikhilsingh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Singh — Full Stack Engineer",
    description: "Building web applications, cloud infrastructure and AI-powered workflows.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
