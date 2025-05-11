import type { KAPLAYCtx, Vec2 } from "kaplay";
import { levelX, type LevelXComp, type LevelXOpt } from "./components/levelx";
import { tileX, type TileXComp } from "./components/tilex";

export interface LevelXPluginCtx {
  levelX(map: string[], opt: LevelXOpt): LevelXComp;
  tileX(tilePos: Vec2, isObstacle?: boolean): TileXComp;
}

export function LevelXPlugin(k: KAPLAYCtx): LevelXPluginCtx {
  return {
    levelX(map: string[], opt: LevelXOpt) {
      return levelX(k, map, opt);
    },
    tileX(tilePos: Vec2, isObstacle = false) {
      return tileX(tilePos, isObstacle);
    },
  };
}
