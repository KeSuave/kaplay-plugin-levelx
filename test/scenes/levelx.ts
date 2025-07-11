import { LEVELS } from "../utils/constants";
import { LevelConfig } from "../utils/types";
import { LevelXOpt } from "../../src/components/levelX";
import { customPatrol } from "../components/customPatrol";
import { handleKeyEvents } from "../events/keys";
import { k } from "../context";
import { makePlayer } from "../entities/player";

export function levelxScene(
  { type = "levelx", levelId = 0, coins = 0 }: LevelConfig = {
    type: "levelx",
    levelId: 0,
    coins: 0,
  }
): void {
  //k.debug.inspect = true;

  k.setGravity(3200);

  const levelConf: LevelXOpt = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "=": () => [
        k.sprite("grass"),
        k.color(255, 255, 255),
        k.tileX({ isObstacle: true }),
        //k.body({ isStatic: true }),
        k.anchor("bot"),
        k.offscreen({ hide: true }),
        "platform",
        "obstacle",
      ],
      "-": () => [
        k.sprite("steel"),
        k.color(255, 255, 255),
        k.tileX({ isObstacle: true }),
        //k.body({ isStatic: true }),
        k.offscreen({ hide: true }),
        k.anchor("bot"),
        "obstacle",
      ],
      "0": () => [
        k.sprite("bag"),
        k.area(),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true }),
        k.anchor("bot"),
      ],
      $: () => [
        k.sprite("coin"),
        k.area(),
        k.pos(0, -9),
        k.anchor("bot"),
        k.offscreen({ hide: true }),
        "coin",
      ],
      "%": () => [
        k.sprite("art"),
        k.area(),
        k.body({ isStatic: true }),
        k.anchor("bot"),
        k.offscreen({ hide: true }),
        "prize",
      ],
      "^": () => [
        k.sprite("spike"),
        /* k.area(),
        k.body({ isStatic: true }), */
        k.tileX({ isObstacle: true }),
        k.anchor("bot"),
        k.offscreen({ hide: true }),
        "danger",
      ],
      ">": () => [
        k.sprite("ghosty"),
        k.area(),
        k.anchor("bot"),
        k.body(),
        k.offscreen({ hide: true }),
        customPatrol(),
        "enemy",
      ],
      "@": () => [
        k.sprite("portal"),
        k.area({ scale: 0.5 }),
        k.anchor("bot"),
        k.pos(0, -12),
        k.offscreen({ hide: true }),
        "portal",
      ],
    },
    mergeObstacles: true,
    mergeByTag: ["obstacle", "danger"],
    pauseOffScreenTiles: true,
  };

  const scene = k.add([]);
  const level = k.add([k.pos(), k.levelX(LEVELS[levelId], levelConf)]);
  const player = makePlayer(scene, { type, levelId, coins }, level);
  const coinsLabel = k.add([k.text(`${coins}`), k.pos(24, 24), k.fixed()]);

  player.onCollide("coin", (c) => {
    k.destroy(c);
    coins += 1;
    coinsLabel.text = `${coins}`;
  });

  k.onKeyPress("c", () => {
    level.get("obstacle").forEach((obstacle) => {
      obstacle.color = k.rgb(0, 0, 0);
    });
  });

  const obstacles = level.get("obstacle").filter((o) => o.has("area"));
  const dangers = level.get("danger").filter((d) => d.has("area"));

  k.debug.log(`Number of polygons: ${obstacles.length + dangers.length}`);

  handleKeyEvents();

  k.showFPS();
}
