import fs from "fs";
import path from "path";
import type * as express from "express";
import { Router } from "express";
import { ConfigResponse } from "../../common/types";

const configPath = path.join(process.cwd(), "blogview.json");
const configRouter = Router();

type Config = {
  styles: string[];
};

function parseConfig(text: string) {
  const config = JSON.parse(text) as Config;
  return {
    styles: [],
    ...config,
  };
}

configRouter.get(
  "/",
  async (_: express.Request, res: express.Response<ConfigResponse>) => {
    const configRaw = fs.readFileSync(configPath, "utf-8");
    const config = parseConfig(configRaw);
    const styles = config.styles
      .filter((path) => fs.existsSync(path))
      .map((path) => fs.readFileSync(path, "utf-8"));
    res.send({ styles });
  }
);

export { configRouter };
