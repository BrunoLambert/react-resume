"use client";

import { useEffect, useRef, useState } from "react";
import Character, {
  CharacterState,
  CharacterDirection,
} from "@/app/ui/Character/Character";

export default function WizardMascot({
  scale = 2,
}: {
  scale?: number;
}) {
  const [state, setState] = useState<CharacterState>(CharacterState.Idle);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oneshotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (oneshotTimer.current) return;
      setState(CharacterState.Run);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setState(CharacterState.Idle), 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const handleClick = () => {
    if (oneshotTimer.current) return;
    setState(CharacterState.Attack1);
    oneshotTimer.current = setTimeout(() => {
      oneshotTimer.current = null;
      setState(CharacterState.Idle);
    }, 800);
  };

  return (
    <div
      onClick={handleClick}
      title="Click me!"
      className="cursor-pointer select-none"
      style={{ width: 231 * scale, height: 190 * scale }}
    >
      <Character
        state={state}
        direction={CharacterDirection.Right}
        scale={scale}
      />
    </div>
  );
}
