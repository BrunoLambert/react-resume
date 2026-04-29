"use client";

import SectionHeading from "./SectionHeading";
import type { ResumeUI } from "@/app/helpers/types";

interface Project {
  name: string;
  url: string;
  description: string;
}

export default function ProjectsSection({ data, ui }: { data: Project[]; ui: ResumeUI }) {
  return (
    <section id="projects" className="py-24 px-6 lg:px-0 section-dark">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{ui.sections.projects}</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rpg-card block group no-underline"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="font-pixel text-[10px] text-rpg-gold group-hover:text-rpg-gold-light transition-colors leading-loose">
                  {project.name}
                </h3>
                <span className="text-rpg-purple group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block shrink-0 text-sm">
                  ↗
                </span>
              </div>
              <p className="text-rpg-muted text-sm leading-6">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
