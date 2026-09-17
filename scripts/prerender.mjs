import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  publishedPaths,
  render,
  resource,
} from "../.prerender/entry-server.js";

const output = resolve("dist");
const template = await readFile(resolve(output, "index.html"), "utf8");
if (
  !template.includes("<!--app-html-->") ||
  !template.includes("<!--app-head-->")
)
  throw new Error("Vite HTML template is missing prerender markers.");
for (const path of [...publishedPaths(), "/404.html"]) {
  const result = await render(path);
  const html = template
    .replace("<!--app-head-->", result.head)
    .replace('id="root"', 'id="root" data-prerendered')
    .replace("<!--app-html-->", result.html);
  const file = resolve(
    output,
    path === "/404.html" ? "404.html" : `.${path}/index.html`,
  );
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
for (const path of [
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/api/search.json",
]) {
  const data = await resource(path);
  const file = resolve(output, `.${path}`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, data.body);
}
console.log(
  `Prerendered ${publishedPaths().length} pages, 404, search, and crawler guides into dist/.`,
);
