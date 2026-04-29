"use client";

import SectionHeading from "./SectionHeading";
import { formatDate } from "@/app/helpers/formatDate";
import type { ResumeUI } from "@/app/helpers/types";

interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  note: string | null;
}

export default function EducationSection({
  data,
  ui,
}: {
  data: EducationEntry[];
  ui: ResumeUI;
}) {
  return (
    <section className="py-24 px-6 lg:px-0 section-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{ui.sections.education}</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((edu, i) => (
            <div key={i} className="rpg-card">
              <p className="font-pixel text-[9px] text-rpg-teal-light mb-3 tracking-widest">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </p>
              <h3 className="text-rpg-text font-bold text-base leading-snug mb-1">
                {edu.institution}
              </h3>
              <p className="text-rpg-purple-light text-sm mb-2">{edu.degree}</p>
              <p className="text-rpg-muted text-xs">📍 {edu.location}</p>
              {edu.note && (
                <p
                  className="text-rpg-muted text-xs mt-4 italic pt-4"
                  style={{ borderTop: "1px solid var(--rpg-border)" }}
                >
                  ✦ {edu.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
