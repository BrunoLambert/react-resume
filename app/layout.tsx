import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Bruno Lambert — Desenvolvedor Frontend",
  description:
    "Desenvolvedor Frontend com mais de 8 anos de experiência construindo interfaces de alto desempenho com React, Next.js, Vue e TypeScript.",
  keywords: [
    "Bruno Lambert",
    "Desenvolvedor Frontend",
    "Frontend Developer",
    "React",
    "Next.js",
    "Vue",
    "TypeScript",
    "UI",
    "UX",
    "Currículo",
    "Resume",
    "Portfolio",
  ],
  authors: [{ name: "Bruno Lambert", url: "https://brunoflambert.vercel.app" }],
  creator: "Bruno Lambert",
  metadataBase: new URL("https://brunoflambert.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon-wizard.png", type: "image/png" },
    ],
    shortcut: "/favicon-wizard.png",
    apple: "/favicon-wizard.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "profile",
    url: "https://brunoflambert.vercel.app",
    title: "Bruno Lambert — Desenvolvedor Frontend",
    description:
      "Desenvolvedor Frontend com mais de 8 anos de experiência em React, Next.js, Vue e TypeScript. Especialista em UX/UI, SEO e desenvolvimento mobile-first.",
    siteName: "Bruno Lambert",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Bruno Lambert — Desenvolvedor Frontend",
    description:
      "Desenvolvedor Frontend com mais de 8 anos de experiência em React, Next.js, Vue e TypeScript.",
    creator: "@brunoflambert",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-rpg-bg text-rpg-text">{children}</body>
    </html>
  );
}
