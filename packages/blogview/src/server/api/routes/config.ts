import fs from "fs";
import type express from "express";
import { Router } from "express";

import { ConfigResponse } from "../../../common/types";

export type ConfigRouterOptions = {
  styles: string[];
};

export function configRouter(options: ConfigRouterOptions) {
  const router = Router();
  router.get(
    "/",
    async (_: express.Request, res: express.Response<ConfigResponse>) => {
      const styles = options.styles
        .filter((path) => fs.existsSync(path))
        .map((path) => fs.readFileSync(path, "utf-8"));
      res.send({ styles });
    }
  );
  return router;
}
