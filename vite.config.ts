import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "kaplay-plugin-levelx",
      fileName: "kaplay-plugin-levelX",
    },
    rollupOptions: {
      external: ["kaplay"],
      output: {
        globals: {
          kaplay: "kaplay",
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ["src/"],
    }),
  ],
});
