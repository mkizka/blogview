const { build } = require("esbuild");

build({
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  outdir: "dist",
  external: ["vscode", "svg-icons"],
  format: "cjs",
  platform: "node",
  sourcemap: true,
});
