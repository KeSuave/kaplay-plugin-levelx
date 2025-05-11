import type {
  AnchorComp,
  AreaComp,
  BodyComp,
  GameObj,
  OffScreenComp,
  PosComp,
  SpriteComp,
  Vec2,
} from "kaplay";

import { k } from "../context";

export type AppleEntityComps =
  | PosComp
  | SpriteComp
  | AreaComp
  | AnchorComp
  | BodyComp
  | OffScreenComp;
export type AppleEntity = GameObj<AppleEntityComps>;

export function makeApple(parent: GameObj, pos: Vec2): AppleEntity {
  const apple = parent.add([
    k.pos(pos),
    k.sprite("apple"),
    k.area(),
    k.anchor("bot"),
    k.body(),
    k.offscreen({ hide: true }),
    "apple",
  ]);

  return apple;
}
