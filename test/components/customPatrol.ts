import type { AreaComp, Comp, GameObj, PosComp } from "kaplay";

export interface CustomPatrolComp extends Comp {}

type CustomPatrolThis = GameObj<CustomPatrolComp | PosComp | AreaComp>;

export function customPatrol(speed = 60, dir = 1): CustomPatrolComp {
  return {
    id: "customPatrol",
    require: ["pos", "area"],
    add(this: CustomPatrolThis) {
      this.on("collide", (_obj, col) => {
        if (col.isLeft()) {
          dir = 1;
        } else if (col.isRight()) {
          dir = -1;
        }
      });
    },
    update(this: CustomPatrolThis) {
      this.move(speed * dir, 0);
    },
  };
}
