import path from "path";
import express from "express";
import history from "connect-history-api-fallback";

import { entryRouter } from "./routes/entry.js";
import { configRouter } from "./routes/config.js";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export function createApp() {
  const app = express();
  app.use(`/api/entry`, entryRouter);
  app.use(`/api/config`, configRouter);
  app.use(history());
  app.use(
    express.static(path.join(dirname, "..", "..", "client"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );
  return app;
}
