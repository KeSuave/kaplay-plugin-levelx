import type { Comp, GameObj, PosComp, Vec2 } from "kaplay";

import assert from "assert";
import { hasLevelX } from "../utils/shared";

export interface TileXComp extends Comp {
  isObstacle: boolean;
  tilePos: Vec2;

  addObj(obj: GameObj): void;
  hasObj(obj: GameObj): boolean;
  removeObj(obj: GameObj): void;
  clearObjs(): void;
  objs(): Map<number, GameObj>;
  hasAny(): boolean;
  center(): Vec2;
}

export type TileXObj = GameObj<TileXComp | PosComp>;

export function tileX(tilePos: Vec2, isObstacle = false): TileXComp {
  const objs: Map<number, GameObj> = new Map();

  return {
    id: "tileX",
    require: ["pos"],
    isObstacle,
    tilePos,

    addObj(obj: GameObj) {
      assert(obj.id);

      objs.set(obj.id, obj);
    },
    hasObj(obj: GameObj) {
      assert(obj.id);

      return objs.has(obj.id);
    },
    removeObj(obj: GameObj) {
      assert(obj.id);

      objs.delete(obj.id);
    },
    clearObjs() {
      objs.clear();
    },
    objs() {
      return objs;
    },
    hasAny() {
      return objs.size > 0;
    },
    center(this: TileXObj) {
      assert(this.parent);
      assert(hasLevelX(this.parent));

      return this.pos.add(
        this.parent.tileWidth() / 2,
        this.parent.tileHeight()
      );
    },
  };
}
