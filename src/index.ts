import { LevelXPlugin } from "./plugin";

export default LevelXPlugin;

export type {
  LevelTilesDef,
  LevelXComp,
  LevelXObj,
  LevelXOpt,
  LevelXTileFunc,
  PathingOpts,
} from "./components/levelX";
export type { TileXComp, TileXObj, TileXOpt } from "./components/tileX";

export {
  convexPartition,
  removeHoles,
  triangulate,
} from "./utils/polyPartitions";
