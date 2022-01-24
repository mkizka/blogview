import fs from "fs";
import path from "path";
import type express from "express";
import { Router } from "express";

import { ConfigResponse } from "../../../common/types";

type Config = {
  styles: string[];
};

function parseConfig(text: string) {
  let config: Config | null = null;
  try {
    config = JSON.parse(text) as Config;
  } catch (e) {}
  return {
    styles: [],
    ...config,
  };
}

export type ConfigRouterOptions = {
  config: string;
};

export function configRouter(options: ConfigRouterOptions) {
  const router = Router();
  router.get(
    "/",
    async (_: express.Request, res: express.Response<ConfigResponse>) => {
      const configPath = path.join(process.cwd(), options.config);
      const configRaw = fs.readFileSync(configPath, "utf-8");
      const config = parseConfig(configRaw);
      const styles = config.styles
        .filter((path) => fs.existsSync(path))
        .map((path) => fs.readFileSync(path, "utf-8"));
      res.send({ styles });
    }
  );
  return router;
}
