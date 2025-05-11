import { k } from "../context";
import { bootScene } from "./boot";
import { gameOverScene } from "./gameOver";
import { levelScene } from "./level";
import { levelxScene } from "./levelx";
import { menuScene } from "./menu";
import { pathScene } from './path';

export default function addScenes(): void {
  k.scene("boot", bootScene);
  k.scene("menu", menuScene);
  k.scene("gameOver", gameOverScene);
  k.scene("level", levelScene);
  k.scene("levelx", levelxScene);
  k.scene('path', pathScene);
}
