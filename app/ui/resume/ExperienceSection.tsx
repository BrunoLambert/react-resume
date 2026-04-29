"use client";

import SectionHeading from "./SectionHeading";
import { formatDate } from "@/app/helpers/formatDate";
import type { ResumeUI } from "@/app/helpers/types";

interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  responsibilities: string[];
}

export default function ExperienceSection({
  data,
  ui,
}: {
  data: ExperienceEntry[];
  ui: ResumeUI;
}) {
  return (
    <section className="py-24 px-6 lg:px-0 section-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{ui.sections.experience}</SectionHeading>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, var(--rpg-purple) 0%, transparent 100%)",
            }}
          />

          <div className="space-y-6 md:pl-8">
            {data.map((job, i) => (
              <div key={i} className="rpg-card relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[2.35rem] top-6 w-3 h-3 rounded-full border-2 border-rpg-purple bg-rpg-bg hidden md:block"
                />

                <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                  <div>
                    <h3 className="text-rpg-text font-bold text-lg leading-tight">
                      {job.company}
                    </h3>
                    <p className="font-pixel text-[10px] text-rpg-purple-light mt-2 leading-loose">
                      {job.role}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-rpg-muted text-sm">
                      {formatDate(job.startDate)} — {formatDate(job.endDate)}
                    </p>
                    <p className="text-rpg-muted text-xs mt-1">{job.location}</p>
                    {job.current && (
                      <span className="inline-block mt-2 px-2 py-1 border font-pixel text-[9px] text-green-400 border-green-700 bg-green-900/30">
                        ● {ui.activeJob}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2">
                  {job.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-rpg-muted text-sm leading-6"
                    >
                      <span className="text-rpg-purple mt-[2px] shrink-0">›</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
