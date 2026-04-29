"use client";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 mb-12">
      <h2 className="font-pixel text-xs text-rpg-gold whitespace-nowrap tracking-widest">
        {children}
      </h2>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(217,119,6,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
