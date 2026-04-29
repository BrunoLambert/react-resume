"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CharacterDirection, CharacterState } from "@/app/ui/Character";

export type KeyMap = Partial<Record<string, CharacterState>>;

const DEFAULT_KEY_MAP: KeyMap = {
  z: CharacterState.Attack1,
  x: CharacterState.Attack2,
  ArrowLeft: CharacterState.Run,
  ArrowRight: CharacterState.Run,
  ArrowUp: CharacterState.Jump,
  ArrowDown: CharacterState.Fall,
};

/** States that play once and return to idle when the animation ends */
const ONESHOT_STATES: Set<CharacterState> = new Set([
  CharacterState.Attack1,
  CharacterState.Attack2,
  CharacterState.Hit,
  CharacterState.Death,
]);

/** Approximate durations (ms) for one-shot animations based on frame count @ ~8fps */
const ONESHOT_DURATIONS: Partial<Record<CharacterState, number>> = {
  [CharacterState.Attack1]: 800,
  [CharacterState.Attack2]: 800,
  [CharacterState.Hit]: 400,
  [CharacterState.Death]: Infinity, // stays on last frame — never returns to idle
};

interface CharacterContextValue {
  state: CharacterState;
  direction: CharacterDirection;
  keyMap: KeyMap;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

interface CharacterProviderProps {
  children: React.ReactNode;
  /** Override or extend the default key → state mapping */
  keyMap?: KeyMap;
  /** Initial state. Defaults to "idle" */
  initialState?: CharacterState;
}

export function CharacterProvider({
  children,
  keyMap,
  initialState = CharacterState.Idle,
}: CharacterProviderProps) {
  const mergedKeyMap: KeyMap = { ...DEFAULT_KEY_MAP, ...keyMap };

  const [state, setState] = useState<CharacterState>(initialState);
  const [direction, setDirection] = useState<CharacterDirection>(CharacterDirection.Right);
  const oneshotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeKeys = useRef<Set<string>>(new Set());

  const clearOneshotTimer = useCallback(() => {
    if (oneshotTimer.current !== null) {
      clearTimeout(oneshotTimer.current);
      oneshotTimer.current = null;
    }
  }, []);

  const resolveStateFromKeys = useCallback(
    (keys: Set<string>): CharacterState => {
      for (const key of keys) {
        const mapped = mergedKeyMap[key];
        if (mapped) return mapped;
      }
      return CharacterState.Idle;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(mergedKeyMap)]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const mapped = mergedKeyMap[e.key];
      if (!mapped) return;

      activeKeys.current.add(e.key);

      if (e.key === "ArrowLeft") setDirection(CharacterDirection.Left);
      else if (e.key === "ArrowRight") setDirection(CharacterDirection.Right);

      if (ONESHOT_STATES.has(mapped)) {
        clearOneshotTimer();
        setState(mapped);

        const duration = ONESHOT_DURATIONS[mapped];
        if (duration !== undefined && isFinite(duration)) {
          oneshotTimer.current = setTimeout(() => {
            setState(resolveStateFromKeys(activeKeys.current));
          }, duration);
        }
        return;
      }

      // For ongoing states, only update if not mid-oneshot
      if (oneshotTimer.current === null) {
        setState(mapped);
      }
    },
    [mergedKeyMap, clearOneshotTimer, resolveStateFromKeys]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      activeKeys.current.delete(e.key);

      // If a oneshot is playing, let it finish
      if (oneshotTimer.current !== null) return;

      setState(resolveStateFromKeys(activeKeys.current));
    },
    [resolveStateFromKeys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearOneshotTimer();
    };
  }, [handleKeyDown, handleKeyUp, clearOneshotTimer]);

  return (
    <CharacterContext.Provider value={{ state, direction, keyMap: mergedKeyMap }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error("useCharacter must be used within a <CharacterProvider>");
  }
  return ctx;
}
