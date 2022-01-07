import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const srcDirRoot = "src/client";
const distDirRoot = "dist/client";

export default defineConfig({
  root: path.join(__dirname, srcDirRoot),
  publicDir: path.join(__dirname, `${srcDirRoot}/public`),
  build: {
    outDir: path.join(__dirname, distDirRoot),
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
      root: path.join(__dirname, ".."),
    },
  },
});
