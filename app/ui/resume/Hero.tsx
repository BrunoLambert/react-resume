"use client";

import type { ResumeUI } from "@/app/helpers/types";

interface HeroData {
  name: string;
  summary: string;
  contacts: {
    location: string;
    email: string;
    website: string;
    github: string;
  };
}

export default function Hero({ data, ui }: { data: HeroData; ui: ResumeUI }) {
  return (
    <section className="relative min-h-screen flex flex-col section-dark overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex items-center max-w-5xl mx-auto w-full px-6 lg:px-12 py-24">
        <div className="flex flex-col gap-7 z-10 max-w-2xl">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-pixel text-[10px] text-rpg-teal-light tracking-[0.2em] uppercase">
                {ui.availableForHire}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-pixel text-3xl md:text-4xl text-rpg-gold leading-[1.6]">
                Bruno<br />Lambert
              </h1>
            </div>

            {/* Role */}
            <p className="font-pixel text-xs text-rpg-purple-light leading-loose tracking-wide">
              {ui.role.split("\n").map((line, i) => (
                <span key={i}>{line}{i < ui.role.split("\n").length - 1 && <br />}</span>
              ))}
            </p>

            {/* Summary */}
            <p
              className="text-rpg-muted text-sm leading-7 max-w-md"
              style={{ borderLeft: "2px solid var(--rpg-purple)", paddingLeft: "1rem" }}
            >
              {data.summary}
            </p>

            {/* Contacts */}
            <div className="flex flex-wrap gap-3 mt-1">
              <a href={`mailto:${data.contacts.email}`} className="rpg-btn">
                ✉ {ui.emailBtn}
              </a>
              <a
                href={data.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rpg-btn"
              >
                ⌥ {ui.githubBtn}
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rpg-btn"
              >
                ◈ {ui.portfolioBtn}
              </a>
              <a
                href={ui.downloadUrl}
                download
                className="rpg-btn rpg-btn-gold"
              >
                ⬇ {ui.downloadBtn}
              </a>
            </div>

            <p className="text-rpg-muted text-xs tracking-wide">
              📍 {data.contacts.location}
            </p>
          </div>
      </div>

      {/* Scroll hint */}
      <div className="relative pb-10 flex flex-col items-center gap-2">
        <span className="font-pixel text-[10px] text-rpg-muted tracking-[0.3em] uppercase">
          {ui.beginQuest}
        </span>
        <span
          className="text-rpg-purple text-lg animate-bounce"
          style={{ animationDuration: "1.5s" }}
        >
          ▼
        </span>
      </div>
    </section>
  );
}
