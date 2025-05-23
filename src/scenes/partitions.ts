import {
  convexPartition,
  removeHoles,
  triangulate,
} from "../lib/utils/polyPartitions";

import type { Vec2 } from "kaplay";
import { k } from "../context";
import { handleKeyEvents } from "../events/keys";

export function partitionsScene(): void {
  const scene = k.add([]);

  const polygonPts: Vec2[] = [
    k.vec2(-25, 0).scale(5),
    k.vec2(-20, -15).scale(5),
    k.vec2(0, -25).scale(5),
    k.vec2(20, -15).scale(5),
    k.vec2(25, 0).scale(5),
    k.vec2(20, 15).scale(5),
    k.vec2(0, 25).scale(5),
    k.vec2(-20, 15).scale(5),
  ];
  const holeOne: Vec2[] = [
    k.vec2(-15, 5).sub(0, 16).scale(5),
    k.vec2(-5, 10).sub(0, 16).scale(5),
    k.vec2(-5, 0).sub(0, 16).scale(5),
  ];
  const holeTwo: Vec2[] = [
    k.vec2(10, 0).add(6, 0).scale(5),
    k.vec2(5, -9).add(6, 0).scale(5),
    k.vec2(-5, -9).add(6, 0).scale(5),
    k.vec2(-10, 0).add(6, 0).scale(5),
    k.vec2(-5, 9).add(6, 0).scale(5),
    k.vec2(5, 9).add(6, 0).scale(5),
  ];

  const merged = removeHoles(polygonPts, [holeOne, holeTwo]);
  const convexes = convexPartition(merged);

  scene.add([
    k.pos(140, 140),
    k.polygon(polygonPts),
    k.color(k.WHITE),
    k.outline(1, k.BLACK),
  ]);
  scene.add([
    k.pos(140, 140),
    k.polygon(holeOne),
    k.color(k.GREEN),
    k.outline(1, k.BLACK),
  ]);
  scene.add([
    k.pos(140, 140),
    k.polygon(holeTwo),
    k.color(k.BLUE),
    k.outline(1, k.BLACK),
  ]);

  scene.add([
    k.pos(440, 140),
    k.polygon(merged),
    k.color(k.WHITE),
    k.outline(1, k.BLACK),
  ]);

  const container = scene.add([k.pos(300, 360)]);

  convexes.forEach((convex) => {
    container.add([
      k.polygon(convex),
      k.color(
        k.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255)
      ),
      k.outline(1, k.BLACK),
    ]);
  });

  const builtInTriangulate = k.triangulate(polygonPts);
  const builtInContainer = scene.add([k.pos(600, 360)]);

  builtInTriangulate.forEach((triangle) => {
    builtInContainer.add([
      k.polygon(triangle),
      k.color(
        k.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255)
      ),
      k.outline(1, k.BLACK),
    ]);
  });

  const triangles = triangulate(polygonPts);
  const trianglesContainer = scene.add([k.pos(140, 580)]);

  triangles.forEach((triangle) => {
    trianglesContainer.add([
      k.polygon(triangle),
      k.color(
        k.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255)
      ),
      k.outline(1, k.BLACK),
    ]);
  });

  handleKeyEvents();
}
