import type {
  AnchorComp,
  AreaComp,
  BodyComp,
  GameObj,
  LevelComp,
  PosComp,
  ScaleComp,
  SpriteComp,
} from "kaplay";
import { BigComp, big } from "../components/big";
import { FALL_DEATH, JUMP_FORCE, LEVELS, MOVE_SPEED } from "../utils/constants";

import { LevelXObj } from "../../src";
import { k } from "../context";
import { LevelConfig } from "../utils/types";
import { makeApple } from "./apple";

export type PlayerEntityComps =
  | SpriteComp
  | PosComp
  | AreaComp
  | ScaleComp
  | BodyComp
  | AnchorComp
  | BigComp;
export type PlayerEntity = GameObj<PlayerEntityComps>;

export function makePlayer(
  parent: GameObj,
  { type, levelId, coins }: LevelConfig,
  level: GameObj<LevelComp | PosComp> | LevelXObj
): PlayerEntity {
  const player = parent.add([
    k.sprite("bean"),
    k.pos(32 * 8, 32),
    k.area(),
    k.scale(1),
    k.body(),
    k.anchor("bot"),
    big(),
  ]);

  player.onUpdate(() => {
    k.setCamPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      k.go("menu");
    }
  });

  player.onBeforePhysicsResolve((collision) => {
    if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
      collision.preventResolution();
    }
  });

  player.onCollide("danger", () => {
    k.go("menu");
  });

  player.onCollide("portal", () => {
    if (levelId + 1 < LEVELS.length) {
      k.go(type, {
        type,
        levelId: levelId + 1,
        coins: coins,
      });
    } else {
      k.go("menu");
    }
  });

  // @ts-expect-error
  player.onGround((l) => {
    if (l.is("enemy")) {
      player.jump(JUMP_FORCE * 1.5);
      k.destroy(l);
      k.addKaboom(player.pos);
    }
  });

  player.onCollide("enemy", (_e, col) => {
    if (!col?.isBottom()) {
      k.go("menu");
    }
  });

  let hasApple = false;

  // @ts-expect-error
  player.onHeadbutt((obj) => {
    if (obj.is("prize") && !hasApple) {
      const apple = makeApple(parent, obj.pos.sub(0, level.tileHeight()));
      apple.jump();
      hasApple = true;
    }
  });

  player.onCollide("apple", (a) => {
    k.destroy(a);
    player.biggify(3);
    hasApple = false;
  });

  function jump() {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
    }
  }

  k.onKeyPress("space", jump);

  k.onKeyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  k.onKeyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  k.onKeyPress("down", () => {
    player.gravityScale = 3;
  });

  k.onKeyRelease("down", () => {
    player.gravityScale = 1;
  });

  return player;
}
