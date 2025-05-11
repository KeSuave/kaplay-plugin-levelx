import { k } from "../context";

export function menuScene(): void {
  const scene = k.add([]);

  scene.add([
    k.text("LevelX", {
      size: 120,
    }),
    k.pos(k.center().sub(0, 40)),
    k.anchor("center"),
  ]);

  const play = scene.add([
    k.text("Play Level"),
    k.color(k.WHITE),
    k.pos(k.center().add(0, 40)),
    k.anchor("center"),
    k.area(),
  ]);
  const playX = scene.add([
    k.text("Play LevelX"),
    k.color(k.WHITE),
    k.pos(k.center().add(0, 80)),
    k.anchor("center"),
    k.area(),
  ]);
  const playPath = scene.add([
    k.text("Play Path"),
    k.color(k.WHITE),
    k.pos(k.center().add(0, 120)),
    k.anchor("center"),
    k.area(),
  ]);

  play.onHover(() => {
    play.color = k.GREEN;
  });

  play.onHoverEnd(() => {
    play.color = k.WHITE;
  });

  play.onClick(() => {
    k.go("level");
  });

  playX.onHover(() => {
    playX.color = k.GREEN;
  });

  playX.onHoverEnd(() => {
    playX.color = k.WHITE;
  });

  playX.onClick(() => {
    k.go("levelx");
  });

  playPath.onHover(() => {
    playPath.color = k.GREEN;
  });

  playPath.onHoverEnd(() => {
    playPath.color = k.WHITE;
  });

  playPath.onClick(() => {
    k.go("path");
  });
}
