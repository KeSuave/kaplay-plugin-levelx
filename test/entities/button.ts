import type { GameObj, PosComp, Vec2 } from "kaplay";

import { k } from "../context";

export type ButtonEntityComps = PosComp;
export type ButtonEntity = GameObj<ButtonEntityComps>;

export function makeButton(
  parent: GameObj,
  pos: Vec2,
  text: string,
  onClick: () => void
): ButtonEntity {
  const button = parent.add([
    k.pos(pos),
    k.text(text),
    k.color(k.WHITE),
    k.anchor("center"),
    k.area(),
  ]);

  button.onHover(() => {
    button.color = k.GREEN;
  });

  button.onHoverEnd(() => {
    button.color = k.WHITE;
  });

  button.onClick(() => {
    onClick();
  });

  return button;
}
