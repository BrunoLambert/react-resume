"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { CharacterProvider } from "@/app/providers/CharacterProvider";
import CharacterScene from "@/app/ui/Character/CharacterScene";
import type { ResumeUI } from "@/app/helpers/types";

interface Contacts {
  location: string;
  phone: string;
  email: string;
  website: string;
  github: string;
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href?: string;
}) {
  const cls =
    "flex items-center gap-4 text-rpg-muted hover:text-rpg-text transition-colors group no-underline";
  const content = (
    <>
      <span className="text-lg w-7 text-center shrink-0">{icon}</span>
      <span className="text-sm group-hover:text-rpg-purple-light transition-colors">
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={cls}
      >
        {content}
      </a>
    );
  }
  return <div className={cls}>{content}</div>;
}

export default function ContactSection({ data, ui }: { data: Contacts; ui: ResumeUI }) {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return (
    <section
      className="py-24 px-6 lg:px-0 section-surface"
      style={{ borderTop: "1px solid var(--rpg-border)" }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{ui.sections.contact}</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            <ContactItem icon="📍" label={data.location} />
            <ContactItem
              icon="📱"
              label={data.phone}
              href={`tel:${data.phone.replace(/\s/g, "")}`}
            />
            <ContactItem
              icon="✉"
              label={data.email}
              href={`mailto:${data.email}`}
            />
            <ContactItem
              icon="🌐"
              label="brunoflambert.vercel.app"
              href={data.website}
            />
            <ContactItem
              icon="⌥"
              label="github.com/BrunoLambert"
              href={data.github}
            />
          </div>

          {/* Keyboard playground — hidden on touch devices */}
          {!isTouch && (
            <div className="rpg-card flex flex-col gap-4">
            <div>
              <h3 className="font-pixel text-[10px] text-rpg-gold mb-3">
                {ui.playground.title}
              </h3>
              <p className="text-rpg-muted text-[11px] leading-6">
                {ui.playground.instructions.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            {/* sprite box = 231×190, scale=2 expands to 462×380 downward from top-left */}
            <div
              style={{
                height: 300,
                overflow: "hidden",
                marginLeft: -75,
                marginTop: -75,
              }}
            >
              <CharacterProvider>
                <CharacterScene scale={2} originTop />
              </CharacterProvider>
            </div>
          </div>
          )}
        </div>

        {/* Footer */}
        <p
          className="mt-16 text-center font-pixel text-[10px] text-rpg-muted tracking-widest"
          style={{
            borderTop: "1px solid var(--rpg-border)",
            paddingTop: "2rem",
          }}
        >
          © {new Date().getFullYear()}&nbsp;Bruno Lambert · {ui.footer}
        </p>
      </div>
    </section>
  );
}
