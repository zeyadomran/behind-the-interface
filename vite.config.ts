import { fileURLToPath, URL } from "node:url";
import { readFile } from "node:fs/promises";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";

function researchPages(basePath: string): Plugin {
  return {
    name: "research-prerender-development",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (request, response, next) => {
          if (request.method !== "GET" && request.method !== "HEAD")
            return next();
          try {
            const url = new URL(
              request.originalUrl || request.url || "/",
              "http://localhost",
            );
            if (basePath && !url.pathname.startsWith(`${basePath}/`))
              return next();
            const path = url.pathname.slice(basePath.length) || "/";
            const isResource = [
              "/api/search.json",
              "/robots.txt",
              "/sitemap.xml",
              "/llms.txt",
            ].includes(path);
            if (!isResource && !request.headers.accept?.includes("text/html"))
              return next();
            const entry = await server.ssrLoadModule("/src/entry-server.tsx");
            if (isResource) {
              const result = await entry.resource(path);
              response.setHeader("Content-Type", result.type);
              response.end(request.method === "HEAD" ? undefined : result.body);
              return;
            }
            const result = await entry.render(path);
            const template = await server.transformIndexHtml(
              url.pathname,
              await readFile(new URL("./index.html", import.meta.url), "utf8"),
            );
            const html = template
              .replace("<!--app-head-->", result.head)
              .replace('id="root"', 'id="root" data-prerendered')
              .replace("<!--app-html-->", result.html);
            response.statusCode = result.status;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(request.method === "HEAD" ? undefined : html);
          } catch (error) {
            next(error as Error);
          }
        });
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const basePath = (env.VITE_BASE_PATH ?? env.NEXT_PUBLIC_BASE_PATH ?? "")
    .trim()
    .replace(/^\/+|\/+$/g, "");
  const config = {
    origin:
      env.VITE_SITE_URL ||
      env.NEXT_PUBLIC_SITE_URL ||
      "https://design.zeyadomran.com",
    basePath: basePath ? `/${basePath}` : "",
    preview: env.VERCEL_ENV === "preview",
  };
  return {
    base: `${config.basePath}/`,
    plugins: [
      fumadocsMdx(),
      react(),
      tailwindcss(),
      researchPages(config.basePath),
    ],
    define: { __SITE_CONFIG__: JSON.stringify(config) },
    resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
    ssr: { noExternal: [/^fumadocs-/, "lucide-react"] },
    build: { target: "es2022" },
    server: { host: "127.0.0.1", port: 3000, strictPort: true },
  };
});
