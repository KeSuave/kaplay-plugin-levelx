import type { GameObj } from "kaplay";
import type { LevelXObj } from "../components/levelx";
import type { TileXObj } from "../components/tilex";
import { Direction } from "./types";

export function hasLevelX(obj: GameObj): obj is LevelXObj {
  return obj.has("levelX");
}

export function forEachNeighbor(
  level: LevelXObj,
  tile: TileXObj,
  directions: Direction[],
  cb: (neighbor: TileXObj, direction: Direction) => void
) {
  for (const direction of directions) {
    const neighbor = level.tileFromTilePos(
      tile.tilePos.add(direction.dx, direction.dy)
    );

    if (neighbor) {
      cb(neighbor, direction);
    }
  }
}
