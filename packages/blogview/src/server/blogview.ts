import path from "path";
import { createServer } from "http";

import express from "express";
import history from "connect-history-api-fallback";

export function getEntry(req: express.Request, res: express.Response) {
  res.json({ article: null });
}

export function getEntries(req: express.Request, res: express.Response) {
  res.json({ articles: null });
}

const main = async () => {
  const app = express();
  app.get(`/api/entry`, getEntries);
  app.get(`/api/entry/:slug`, getEntry);

  // serve static files built by vite
  app.use(history());
  app.use(
    express.static(path.join(__dirname, "../../client"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );

  createServer(app).listen(8000);
};

main();
