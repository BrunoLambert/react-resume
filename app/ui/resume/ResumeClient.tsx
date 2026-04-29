"use client";

import { useState } from "react";
import type { Resume } from "@/app/helpers/types";
import ScrollProgress from "./ScrollProgress";
import FloatingWizard from "./FloatingWizard";
import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

interface Props {
  en: Resume;
  pt: Resume;
}

export default function ResumeClient({ en, pt }: Props) {
  const [lang, setLang] = useState<"en" | "pt">("pt");
  const data = lang === "en" ? en : pt;

  return (
    <>
      <ScrollProgress />
      <FloatingWizard />

      {/* Language toggle — fixed top-right */}
      <div className="fixed top-4 right-4 z-50 flex gap-1">
        <button
          onClick={() => setLang("pt")}
          className={`font-pixel text-[9px] px-3 py-2 border transition-colors cursor-pointer ${
            lang === "pt"
              ? "border-rpg-gold bg-rpg-gold text-rpg-bg"
              : "border-rpg-border bg-rpg-card text-rpg-muted hover:border-rpg-purple hover:text-rpg-purple-light"
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLang("en")}
          className={`font-pixel text-[9px] px-3 py-2 border transition-colors cursor-pointer ${
            lang === "en"
              ? "border-rpg-gold bg-rpg-gold text-rpg-bg"
              : "border-rpg-border bg-rpg-card text-rpg-muted hover:border-rpg-purple hover:text-rpg-purple-light"
          }`}
        >
          EN
        </button>
      </div>

      <Hero data={data} ui={data.ui} />
      <ExperienceSection data={data.experience} ui={data.ui} />
      <SkillsSection
        skills={data.skills}
        languages={data.languages}
        ui={data.ui}
      />
      <EducationSection data={data.education} ui={data.ui} />
      <ProjectsSection data={data.projects} ui={data.ui} />
      <ContactSection data={data.contacts} ui={data.ui} />
    </>
  );
}
