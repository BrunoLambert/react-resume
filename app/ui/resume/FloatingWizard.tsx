"use client";

import { useEffect, useRef, useState } from "react";
import Character, {
  CharacterDirection,
  CharacterState,
} from "@/app/ui/Character/Character";

const SCALE = 2;

// Sprite sheet frame dimensions
const FRAME_H = 190;

// Pixel-analyzed idle content bounds within one 231×190 frame (from pngjs)
const IDLE_X0 = 82; // leftmost non-transparent pixel
const IDLE_Y0 = 55; // topmost
const IDLE_X1 = 138; // rightmost
const IDLE_Y1 = 140; // bottommost (feet)

// Anchor box = tight idle body area at scale
const ANCHOR_W = (IDLE_X1 - IDLE_X0 + 1) * SCALE; // 114px
const ANCHOR_H = (IDLE_Y1 - IDLE_Y0 + 1) * SCALE; // 172px

// Sprite position relative to the anchor container:
// • left: shift frame leftward so IDLE_X0 aligns with anchor left
const SPRITE_LEFT = -IDLE_X0 * SCALE; // -164px
// • bottom: idle feet (IDLE_Y1) land on anchor bottom;
//   empty frame pixels below feet = FRAME_H - IDLE_Y1 - 1 = 49
const SPRITE_BOTTOM = -(FRAME_H - IDLE_Y1 - 1) * SCALE; // -98px

export default function FloatingWizard() {
  const [state, setState] = useState<CharacterState>(CharacterState.Idle);
  const [direction, setDirection] = useState<CharacterDirection>(
    CharacterDirection.Right,
  );
  const [x, setX] = useState(0);

  const lastScrollY = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oneshotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calcX = (scrollY: number) => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? scrollY / docH : 0;
    // Use ANCHOR_W so the idle body tracks from screen-left to screen-right exactly
    const maxX = Math.max(ANCHOR_W, window.innerWidth - ANCHOR_W * 1.25);
    return Math.round(progress * maxX);
  };

  useEffect(() => {
    // rAF defers until after first paint so scrollHeight is fully resolved
    const raf = requestAnimationFrame(() => {
      lastScrollY.current = window.scrollY;
      setX(calcX(window.scrollY));
    });

    const onScroll = () => {
      if (oneshotTimer.current) return;

      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      lastScrollY.current = current;

      setX(calcX(current));

      if (delta > 0) setDirection(CharacterDirection.Right);
      else if (delta < 0) setDirection(CharacterDirection.Left);

      setState(CharacterState.Run);

      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        const maxX = Math.max(ANCHOR_W, window.innerWidth - ANCHOR_W * 1.25);
        const newX = calcX(current);
        if (newX >= maxX) setDirection(CharacterDirection.Left);
        else if (newX <= 0) setDirection(CharacterDirection.Right);
        setState(CharacterState.Idle);
      }, 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const handleClick = () => {
    if (oneshotTimer.current) return;
    setState(CharacterState.Hit);
    oneshotTimer.current = setTimeout(() => {
      oneshotTimer.current = null;
      setState(CharacterState.Idle);
    }, 400);
  };

  return (
    // Anchor = idle body bounding box. Overflow is visible so attacks/run
    // frames that extend beyond this area are still rendered.
    <div
      className="fixed bottom-1 z-40 hidden md:block cursor-pointer select-none"
      style={{
        left: x,
        width: ANCHOR_W,
        height: ANCHOR_H,
        transition: "left 0.15s linear",
      }}
      onClick={handleClick}
      title="Click me!"
    >
      {/* Sprite offset so idle content fills the anchor exactly */}
      <div
        className="absolute pointer-events-none"
        style={{ left: SPRITE_LEFT, bottom: SPRITE_BOTTOM }}
      >
        <Character state={state} direction={direction} scale={SCALE} />
      </div>
    </div>
  );
}
