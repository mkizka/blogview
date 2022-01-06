import path from "path";

import fs from "fs-extra";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import { string } from "rollup-plugin-string";

const main = async () => {
  const root = path.join(process.cwd(), ".blogview");
  await fs.copy(path.join(__dirname, "..", "client", "dist"), root);
  const server = await createServer({
    root,
    plugins: [
      react(),
      // @ts-ignore
      string({
        include: "entry/*.md",
      }),
    ],
  });
  await server.listen();
  server.printUrls();
};

main();
