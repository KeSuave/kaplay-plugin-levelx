import { crew } from "@kaplayjs/crew";
import kaplay from "kaplay";
import LevelXPlugin from "../src";
import { fpsPlugin } from "./plugins/fps";
import addScenes from "./scenes";

export const k = kaplay({
  global: false,
  //width: 640,
  //height: 360,
  //letterbox: true,
  debugKey: "u",
  debug: true, // TODO: set this to false in production
  background: [141, 183, 255],
  plugins: [LevelXPlugin, crew, fpsPlugin],
});

addScenes();

export type GameCtx = typeof k;
