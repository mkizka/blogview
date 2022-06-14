import fs from "fs";
import request from "supertest";
import { describe, expect, test } from "vitest";

import { createApp } from "./app";
import { optionsDefault } from "../utils/options";
import { pkgPath } from "../utils/helper";

describe("GET /", async () => {
  test("ルートはdist/client/index.htmlを返す", async () => {
    const indexHtml = fs.readFileSync(
      pkgPath("dist/client/index.html"),
      "utf-8"
    );
    const app = createApp(optionsDefault);
    const root = await request(app).get("/");
    expect(root.text).toBe(indexHtml);
  });
});

describe("GET /api/config", () => {
  test("設定に基づいた情報を返す", async () => {
    const app = createApp({
      ...optionsDefault,
      styles: ["styles.css"],
    });
    const css = fs.readFileSync(pkgPath("styles.css"), "utf-8");
    const config = await request(app).get("/api/config");
    expect(config.body).toEqual({ styles: [css] });
  });
});

describe("GET /api/entry", () => {
  test("エントリ一覧を返す", async () => {
    const app = createApp(optionsDefault);
    const entryRoot = await request(app).get("/api/entry");
    expect(entryRoot.body.length).toBe(3);
    expect(entryRoot.body[0]).toMatchObject({
      slug: "entry1", //
      meta: {},
    });
    expect(entryRoot.body[1]).toMatchObject({
      slug: "nested/dir/entry3",
      meta: {},
    });
    expect(entryRoot.body[2]).toMatchObject({
      slug: "dir/entry2", //
      meta: {},
    });
  });
});

describe("GET /api/entry/*", async () => {
  test("個別の記事を返す", async () => {
    const app = createApp(optionsDefault);
    const entry = await request(app).get("/api/entry/entry1");
    expect(entry.body.html).toMatchSnapshot();
    expect(entry.body.meta).toMatchObject({});
  });
  test("ディレクトリ下の記事でも返す", async () => {
    const app = createApp(optionsDefault);
    const entry2 = await request(app).get("/api/entry/dir/entry2");
    const entry3 = await request(app).get("/api/entry/nested/dir/entry3");
    const noEntry = await request(app).get("/api/entry/no/entry");
    expect(entry2.ok).toBe(true);
    expect(entry3.ok).toBe(true);
    expect(noEntry.ok).toBe(false);
  });
});
