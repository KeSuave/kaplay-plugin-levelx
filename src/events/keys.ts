import { k } from "../context";

export function handleKeyEvents(): void {
  k.onKeyPress("escape", () => {
    k.go("menu");
  });
}
