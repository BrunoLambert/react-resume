import styles from "./Character.module.css";

export enum CharacterState {
  Attack1 = "attack1",
  Attack2 = "attack2",
  Death = "death",
  Fall = "fall",
  Hit = "hit",
  Idle = "idle",
  Jump = "jump",
  Run = "run",
}

export enum CharacterDirection {
  Left = "left",
  Right = "right",
}

interface CharacterProps {
  state: CharacterState;
  direction?: CharacterDirection;
  /** Pixel scale multiplier applied via CSS transform. Default: 2 */
  scale?: number;
  /** Scale from top-left instead of bottom-left (for inline/card contexts) */
  originTop?: boolean;
  className?: string;
}

export default function Character({
  state,
  direction = CharacterDirection.Right,
  scale = 2,
  originTop = false,
  className,
}: CharacterProps) {
  const facingLeft = direction === CharacterDirection.Left;
  return (
    <div
      className={[
        styles.sprite,
        styles[state],
        facingLeft ? styles.facingLeft : "",
        originTop ? styles.originTop : "",
        className ?? "",
      ].join(" ")}
      style={{ "--scale": scale } as React.CSSProperties}
    />
  );
}
