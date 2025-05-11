import type { Anchor, GameObj, KAPLAYCtx, Rect, Vec2 } from "kaplay";

import { type LevelXObj } from "../components/levelx";
import type { TileXObj } from "../components/tilex";

function getOffset(k: KAPLAYCtx, level: LevelXObj, tile: TileXObj): Vec2 {
  if (!tile.has("anchor")) {
    return k.vec2(0, 0);
  }

  const anchorProp = (tile as GameObj).anchor as Anchor | Vec2;

  let anchor = k.vec2();

  switch (anchorProp) {
    case "topleft":
      anchor = k.vec2(-1, -1);
      break;
    case "top":
      anchor = k.vec2(0, -1);
      break;
    case "topright":
      anchor = k.vec2(1, -1);
      break;
    case "left":
      anchor = k.vec2(-1, 0);
      break;
    case "center":
      anchor = k.vec2(0, 0);
      break;
    case "right":
      anchor = k.vec2(1, 0);
      break;
    case "botleft":
      anchor = k.vec2(-1, 1);
      break;
    case "bot":
      anchor = k.vec2(0, 1);
      break;
    case "botright":
      anchor = k.vec2(1, 1);
      break;
    default:
      anchor = anchorProp;
      break;
  }

  return anchor
    .add(1, 1)
    .scale(k.vec2(level.tileWidth(), level.tileHeight()).scale(-0.5));
}

export function generateRectanglesFromLevelX(
  k: KAPLAYCtx,
  level: LevelXObj
): Rect[] {
  const visited = new Set<TileXObj>();
  const rectangles: Rect[] = [];

  level.tiles().forEach((tile) => {
    if (!tile) return;
    if (visited.has(tile)) return;
    if (!tile.isObstacle) return;

    const x = tile.tilePos.x;
    const y = tile.tilePos.y;

    let width = 0;
    let height = 1;
    let currentTile = level.tileFromTilePos(k.vec2(x + width, y));

    while (currentTile && currentTile.isObstacle && !visited.has(currentTile)) {
      width++;

      currentTile = level.tileFromTilePos(k.vec2(x + width, y));
    }

    heightLoop: for (; y + height < level.numRows(); height++) {
      for (let dx = 0; dx < width; dx++) {
        currentTile = level.tileFromTilePos(k.vec2(x + dx, y + height));

        if (
          !currentTile ||
          !currentTile.isObstacle ||
          visited.has(currentTile)
        ) {
          break heightLoop;
        }
      }
    }

    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        currentTile = level.tileFromTilePos(k.vec2(x + dx, y + dy));

        if (!currentTile) continue;

        visited.add(currentTile);
      }
    }

    const offset: Vec2 = getOffset(k, level, tile);

    rectangles.push(
      new k.Rect(
        k.vec2(tile.pos).add(offset),
        width * level.tileWidth(),
        height * level.tileHeight()
      )
    );
  });

  return rectangles;
}
