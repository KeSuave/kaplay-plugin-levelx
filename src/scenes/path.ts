import { k } from "../context";
import { TileXObj } from "../lib/components/tilex";

export function pathScene(): void {
  const scene = k.add([]);

  const board = scene.add([
    k.pos(k.center().sub((13 * 32) / 2, (5 * 32) / 2)),
    k.levelX(
      [
        "fffffffffffff",
        "fffffffffffff",
        "fffffffffffff",
        "fffffxxxfffff",
        "fffffxxxfffff",
        "fffffxxxfffff",
        "fffffxxxfffff",
        "fffffffffffff",
        "fffffffffffff",
        "fffffffffffff",
      ],
      {
        tileHeight: 32,
        tileWidth: 32,
        tiles: {
          f: () => [
            k.rect(32, 32),
            k.color(0, 150, 255),
            k.outline(1, k.rgb(255, 255, 255)),
          ],
          x: (_, tilePos) => [k.tileX(tilePos, true)],
        },
      }
    ),
  ]);

  let activeTile: TileXObj | null = null;
  let tilesWithinRange: TileXObj[] = [];

  let startTile: TileXObj | null = null;
  let endTile: TileXObj | null = null;
  let pathTiles: TileXObj[] = [];

  const resetActiveTile = () => {
    tilesWithinRange.forEach((tile) => {
      // @ts-expect-error
      tile.color = k.rgb(0, 150, 255);
    });

    // @ts-expect-error
    activeTile.color = k.rgb(0, 150, 255);

    activeTile = null;
  };

  const resetPathTiles = () => {
    pathTiles.forEach((tile) => {
      // @ts-expect-error
      tile.color = k.rgb(0, 150, 255);
    });

    // @ts-expect-error
    startTile.color = k.rgb(0, 150, 255);
    // @ts-expect-error
    endTile.color = k.rgb(0, 150, 255);

    pathTiles = [];
    startTile = null;
    endTile = null;
  };

  board.onMousePress("left", () => {
    if (activeTile) {
      resetActiveTile();
    }

    if (startTile && endTile) {
      resetPathTiles();
    }

    const tile = board.tileFromWorldPos(k.toWorld(k.mousePos()));

    if (!tile) return;
    if (tile.isObstacle) return;

    activeTile = tile;

    // @ts-expect-error
    activeTile.color = k.rgb(0, 200, 0);

    const posibleTiles = board.tilesInRangeOfTile(activeTile, 2, {
      allowDiagonals: false,
    });

    if (!posibleTiles) return;

    tilesWithinRange = posibleTiles;

    tilesWithinRange.forEach((tile) => {
      // @ts-expect-error
      tile.color = k.rgb(0, 150, 0);
    });
  });

  board.onMouseRelease("right", () => {
    if (activeTile) {
      resetActiveTile();
    }

    if (startTile && endTile) {
      resetPathTiles();
    }

    const tile = board.tileFromWorldPos(k.toWorld(k.mousePos()));

    if (!tile) return;
    if (tile.isObstacle) return;

    if (!startTile) {
      startTile = tile;

      // @ts-expect-error
      startTile.color = k.rgb(255, 255, 255);

      return;
    }

    endTile = tile;

    // @ts-expect-error
    endTile.color = k.rgb(150, 150, 150);

    const posibleTiles = board.pathFromTile(startTile, endTile, {
      allowDiagonals: true,
    });

    if (!posibleTiles) {
      return;
    }

    pathTiles = posibleTiles;

    pathTiles.forEach((tile) => {
      // @ts-expect-error
      tile.color = k.rgb(40, 40, 40);
    });
  });
}
