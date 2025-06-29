import { k } from "../context";
import { makeButton } from "../entities/button";

export function menuScene(): void {
  const scene = k.add([]);

  scene.add([
    k.text("LevelX", {
      size: 120,
    }),
    k.pos(k.center().sub(0, 40)),
    k.anchor("center"),
  ]);

  makeButton(scene, k.center().add(0, 40), "Play Level", () => {
    k.go("level", { levelId: 0 });
  });
  makeButton(scene, k.center().add(0, 80), "Play LevelX", () => {
    k.go("levelx", { levelId: 0 });
  });
  makeButton(scene, k.center().add(0, 120), "Play Path", () => {
    k.go("path");
  });
  makeButton(scene, k.center().add(0, 160), "Play Partitions", () => {
    k.go("partitions");
  });
}
