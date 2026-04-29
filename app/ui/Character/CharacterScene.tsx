"use client";

import { useCharacter } from "@/app/providers/CharacterProvider";
import Character from "@/app/ui/Character";

export default function CharacterScene({
  scale,
  originTop,
}: {
  scale?: number;
  originTop?: boolean;
}) {
  const { state, direction } = useCharacter();

  return <Character state={state} direction={direction} scale={scale} originTop={originTop} />;
}
