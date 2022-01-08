import type { Express } from "express";
import { createServer } from "http";
import type { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";
import chokidar from "chokidar";

export async function startServer(
  app: Express,
  port: number
): Promise<HttpServer> {
  const server = createServer(app);
  return new Promise((resolve, reject) => {
    server
      .listen(port)
      .once("listening", function () {
        console.log(`👀 Preview: http://localhost:${port}`);
        resolve(server);
      })
      .once("error", async function (err) {
        if (err.message.includes("EADDRINUSE")) {
          console.log(
            `💡 ポート${port}は既に使用されています。別のポートで起動中…`
          );
          const server = await startServer(app, port + 1);
          resolve(server);
        } else {
          reject(err);
        }
      });
  });
}

export async function startLocalChangesWatcher(
  server: HttpServer,
  watchPathGlob: string
) {
  const wss = new WebSocketServer({ server });
  const watcher = chokidar.watch(watchPathGlob);
  watcher.on("change", () => {
    console.log("ファイルが変更されました");
    wss.clients.forEach((client) => client.send("Should refresh"));
  });
  process.on("SIGINT", () => {
    wss.close();
    watcher.close();
    process.exit();
  });
}
