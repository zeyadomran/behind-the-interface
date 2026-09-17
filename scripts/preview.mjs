import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { resolve, extname, sep } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT || 3000);
const basePath = (
  process.env.VITE_BASE_PATH ||
  process.env.NEXT_PUBLIC_BASE_PATH ||
  ""
).replace(/\/+$/, "");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".otf": "font/otf",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

if (!existsSync(resolve(root, "index.html")))
  throw new Error("Run yarn build before previewing.");

createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url || "/", "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end("Invalid URL");
    return;
  }
  if (
    basePath &&
    pathname !== basePath &&
    !pathname.startsWith(`${basePath}/`)
  ) {
    response.writeHead(404).end("Not found");
    return;
  }
  pathname = pathname.slice(basePath.length) || "/";
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  let status = 200;
  if (!existsSync(file) || !statSync(file).isFile()) {
    file = resolve(root, "404.html");
    status = 404;
  }
  if (!existsSync(file)) {
    response.writeHead(404).end("Not found");
    return;
  }
  const type = types[extname(file)] || "application/octet-stream";
  response.writeHead(status, {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () =>
  console.log(
    `Behind the Interface preview: http://127.0.0.1:${port}${basePath}/`,
  ),
);
