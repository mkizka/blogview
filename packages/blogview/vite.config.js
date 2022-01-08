import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const srcDirRoot = "src/client";
const distDirRoot = "dist/client";
const dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  root: path.join(dirname, srcDirRoot),
  publicDir: path.join(dirname, `${srcDirRoot}/public`),
  build: {
    outDir: path.join(dirname, distDirRoot),
  },
  plugins: [react()],
  server: {
    port: 3333,
    proxy: {
      "^/api/.*": {
        target: "http://localhost:8000",
      },
    },
    fsServe: {
      root: path.join(dirname, ".."),
    },
  },
});
