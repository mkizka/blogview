const { build } = require("esbuild");

build({
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  outdir: "dist",
  external: ["vscode", "svg-icons"],
  loader: { ".md": "text" },
  format: "cjs",
  platform: "node",
  sourcemap: true,
});
