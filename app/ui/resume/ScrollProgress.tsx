"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calcProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };

    // Set immediately on mount so F5 shows the right value
    setProgress(calcProgress());

    const onScroll = () => setProgress(calcProgress());
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-rpg-border">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--rpg-purple), var(--rpg-gold))",
        }}
      />
      {progress > 2 && (
        <span
          className="absolute right-2 font-pixel text-[10px] text-rpg-gold leading-none"
          style={{ top: "4px" }}
        >
          {Math.round(progress)}XP
        </span>
      )}
    </div>
  );
}
