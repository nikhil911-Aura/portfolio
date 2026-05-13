import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Singh — Full Stack + DevOps + GenAI Engineer",
  description:
    "I build scalable systems, automate workflows, and integrate AI into real-world products. Full Stack Engineer at IBR Infotech LLP.",
  keywords: ["Nikhil Singh", "Full Stack Engineer", "DevOps", "GenAI", "MERN", "Kubernetes", "React", "Next.js"],
  authors: [{ name: "Nikhil Singh" }],
  metadataBase: new URL("https://nikhilsingh.dev"),
  openGraph: {
    title: "Nikhil Singh — Full Stack + DevOps + GenAI Engineer",
    description: "I build scalable systems, automate workflows, and integrate AI into real-world products.",
    type: "website",
    url: "https://nikhilsingh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Singh — Full Stack + DevOps + GenAI Engineer",
    description: "I build scalable systems, automate workflows, and integrate AI into real-world products.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={kanit.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
