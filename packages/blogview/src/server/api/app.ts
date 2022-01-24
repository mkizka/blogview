import path from "path";
import express from "express";
import history from "connect-history-api-fallback";

import { entryRouter, EntryRouterOptions } from "./routes/entry.js";
import { configRouter, ConfigRouterOptions } from "./routes/config.js";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export type AppOptions = EntryRouterOptions & ConfigRouterOptions;

export function createApp(options: AppOptions) {
  const app = express();
  app.use(`/api/entry`, entryRouter(options));
  app.use(`/api/config`, configRouter(options));
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
