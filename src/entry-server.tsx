import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { StaticRouter } from "react-router";
import App from "./app";
import { BASE_PATH, withBasePath } from "@/lib/paths";
import { preloadPage, publishedPaths } from "./routes";
import { metadataHTML, escapeHTML } from "./metadata";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { GET as llms } from "@/app/llms.txt/route";
import { GET as search } from "@/app/api/search/route";

export { publishedPaths };
export async function render(path: string) {
  const page = await preloadPage(path);
  const html = await new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    output.on("end", () => {
      clearTimeout(timeout);
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    output.on("error", reject);
    const stream = renderToPipeableStream(
      <StaticRouter basename={BASE_PATH || "/"} location={withBasePath(path)}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          clearTimeout(timeout);
          reject(error);
        },
      },
    );
    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error(`Rendering timed out: ${path}`));
    }, 30000);
  });
  return { html, head: metadataHTML(page.metadata), status: page.status };
}

export async function resource(
  path: string,
): Promise<{ body: string; type: string } | undefined> {
  if (path === "/llms.txt")
    return { body: await llms().text(), type: "text/plain; charset=utf-8" };
  if (path === "/api/search.json")
    return {
      body: await (await search()).text(),
      type: "application/json; charset=utf-8",
    };
  if (path === "/sitemap.xml")
    return {
      body: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap()
        .map((item) => `<url><loc>${escapeHTML(item.url)}</loc></url>`)
        .join("")}</urlset>`,
      type: "application/xml; charset=utf-8",
    };
  if (path === "/robots.txt") {
    const data = robots();
    const disallow = Array.isArray(data.rules.disallow)
      ? data.rules.disallow
      : [data.rules.disallow];
    return {
      body: [
        `User-agent: ${data.rules.userAgent}`,
        ...(data.rules.allow ? [`Allow: ${data.rules.allow}`] : []),
        ...disallow.map((path) => `Disallow: ${path}`),
        "",
        `Sitemap: ${data.sitemap}`,
        "",
      ].join("\n"),
      type: "text/plain; charset=utf-8",
    };
  }
}
