"use client";

import SectionHeading from "./SectionHeading";
import type { ResumeUI } from "@/app/helpers/types";

const CATEGORY_ICON: Record<string, string> = {
  frontend:     "⚔",
  design:       "✦",
  uiFrameworks: "🛡",
  tools:        "⚙",
  backend:      "🔮",
};

const CATEGORY_ACCENT: Record<string, string> = {
  frontend:     "#a855f7",
  design:       "#22d3ee",
  uiFrameworks: "#fbbf24",
  tools:        "#94a3b8",
  backend:      "#f87171",
};

interface Skills {
  frontend: string[];
  design: string[];
  uiFrameworks: string[];
  tools: string[];
  backend: string[];
}

interface Language {
  language: string;
  level: string;
}

// Covers both EN and PT level names
const LEVEL_COLOR: Record<string, string> = {
  Native: "#22d3ee", Nativo: "#22d3ee",
  Advanced: "#a855f7", Avançado: "#a855f7",
  Basic: "#94a3b8", Básico: "#94a3b8",
};

export default function SkillsSection({
  skills,
  languages,
  ui,
}: {
  skills: Skills;
  languages: Language[];
  ui: ResumeUI;
}) {
  return (
    <section className="py-24 px-6 lg:px-0 section-dark">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{ui.sections.skills}</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.entries(skills) as [keyof Skills, string[]][]).map(
            ([category, items]) => {
              const icon = CATEGORY_ICON[category];
              const accent = CATEGORY_ACCENT[category];
              const label = ui.skillCategories[category as keyof typeof ui.skillCategories] ?? category;
              return (
                <div key={category} className="rpg-card">
                  <h3
                    className="font-pixel text-[10px] mb-4 flex items-center gap-2"
                    style={{ color: accent ?? "#e2e8f0" }}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 border border-rpg-border text-rpg-muted transition-colors duration-200 cursor-default"
                        style={{
                          ["--hover-border" as string]: accent,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            accent ?? "";
                          (e.currentTarget as HTMLElement).style.color =
                            accent ?? "";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "";
                          (e.currentTarget as HTMLElement).style.color = "";
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
          )}

          {/* Languages card */}
          <div className="rpg-card">
            <h3 className="font-pixel text-[10px] mb-4 text-rpg-gold flex items-center gap-2">
              <span>🌐</span>
              <span>{ui.skillCategories.languages}</span>
            </h3>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-rpg-text">{lang.language}</span>
                  <span
                    className="font-pixel text-[9px] px-2 py-1 border"
                    style={{
                      color: LEVEL_COLOR[lang.level] ?? "#94a3b8",
                      borderColor: LEVEL_COLOR[lang.level] ?? "#252566",
                    }}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
