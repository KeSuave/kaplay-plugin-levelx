import type { KAPLAYCtx } from "kaplay";
import { levelX, type LevelXComp, type LevelXOpt } from "./components/levelx";
import { tileX, TileXOpt, type TileXComp } from "./components/tilex";

export interface LevelXPluginCtx {
  levelX(map: string[], opt: LevelXOpt): LevelXComp;
  tileX(opt?: TileXOpt): TileXComp;
}

export function LevelXPlugin(k: KAPLAYCtx): LevelXPluginCtx {
  return {
    levelX(map: string[], opt: LevelXOpt) {
      return levelX(k, map, opt);
    },
    tileX(opt?: TileXOpt) {
      return tileX(k, opt);
    },
  };
}
