import type { Comp, GameObj, ScaleComp } from "kaplay";

import { k } from "../context";

export interface BigComp extends Comp {
  isBig(): boolean;
  smallify(): void;
  biggify(time: number): void;
}

type BigThis = GameObj<BigComp | ScaleComp>;

export function big(): BigComp {
  let timer = 0;
  let isBig = false;
  let destScale = 1;
  return {
    // component id / name
    id: "big",
    // it requires the scale component
    require: ["scale"],
    // this runs every frame
    update(this: BigThis) {
      if (isBig) {
        timer -= k.dt();
        if (timer <= 0) {
          this.smallify();
        }
      }
      this.scale = this.scale.lerp(k.vec2(destScale), k.dt() * 6);
    },
    // custom methods
    isBig() {
      return isBig;
    },
    smallify() {
      destScale = 1;
      timer = 0;
      isBig = false;
    },
    biggify(time) {
      destScale = 2;
      timer = time;
      isBig = true;
    },
  };
}
