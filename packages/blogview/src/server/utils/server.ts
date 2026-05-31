import type { Express } from "express";
import { createServer } from "http";
import type { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";
import chokidar from "chokidar";

export async function startServer(
  app: Express,
  port: number,
): Promise<HttpServer> {
  const server = createServer(app);
  return new Promise((resolve, reject) => {
    server
      .listen(port)
      .once("listening", function () {
        console.log(`プレビュー: http://localhost:${port}`);
        resolve(server);
      })
      .once("error", async function (err) {
        if (err.message.includes("EADDRINUSE")) {
          console.log(`ポート${port}は既に使用されています`);
        }
        reject(err);
      });
  });
}

export async function startLocalChangesWatcher(
  server: HttpServer,
  watchDir: string,
) {
  const wss = new WebSocketServer({ server });
  // chokidar 4+ は glob を受け付けないのでディレクトリを監視し、
  // ignored で .md 以外を除外する
  const watcher = chokidar.watch(watchDir, {
    ignored: (filepath, stats) =>
      !!stats?.isFile() && !filepath.endsWith(".md"),
  });
  watcher.on("change", (path) => {
    console.log(`ファイルが変更されました: ${path}`);
    wss.clients.forEach((client) => client.send("Should refresh"));
  });
  process.on("SIGINT", () => {
    wss.close();
    watcher.close();
    process.exit();
  });
}
