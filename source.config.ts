import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { frontmatter } from "fumadocs-core/content/md/frontmatter";
import { pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

const researchPageSchema = pageSchema
  .extend({
    kind: z.enum(["study", "report", "guide"]).default("guide"),
    date: z.iso.date().optional(),
    tags: z.array(z.string()).default([]),
    sites: z.array(z.url()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    visual: z
      .enum([
        "collection",
        "ace",
        "arkon-digital",
        "neue-montreal",
        "monolog",
        "lama-lama",
        "noho",
      ])
      .optional(),
    visualView: z.enum(["screens", "type", "interactions"]).default("screens"),
  })
  .refine((page) => page.kind === "guide" || page.date !== undefined, {
    message: "Studies and reports need a date in YYYY-MM-DD format.",
    path: ["date"],
  });

export type ResearchFrontmatter = z.infer<typeof researchPageSchema>;

// Exclude drafts before Vite creates import chunks, not just from navigation.
// Restart the dev server after adding a document or changing its draft status.
function publishedFiles(directory: string, prefix = "") {
  const pages: string[] = [];
  const metadata: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = `${prefix}${entry.name}`;
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      const child = publishedFiles(absolutePath, `${relativePath}/`);
      pages.push(...child.pages);
      metadata.push(...child.metadata);
    } else if (/\.mdx?$/.test(entry.name)) {
      const data = researchPageSchema.parse(
        frontmatter(readFileSync(absolutePath, "utf8")).data,
      );
      if (!data.draft) pages.push(relativePath);
    } else if (/\.(json|yaml)$/.test(entry.name)) {
      metadata.push(relativePath);
    }
  }
  // A folder containing drafts alone must not expose its title in a JS chunk.
  return { pages, metadata: pages.length ? metadata : [] };
}

const published = publishedFiles("content/docs");

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: researchPageSchema,
    async: true,
    files: published.pages,
  },
  meta: { files: published.metadata },
});
export default defineConfig({
  plugins: [
    {
      name: "research-browser-metadata",
      emit() {
        // Keep frontmatter and sidebar metadata eager while article bodies use
        // Fumadocs' browser entry. No server filesystem helpers reach the client.
        const lines = [
          "// @ts-nocheck",
          'import type { ResearchFrontmatter } from "../source.config";',
          'import type { MetaData } from "fumadocs-core/source";',
          ...published.pages.map(
            (path, index) =>
              `import { frontmatter as page${index} } from ${JSON.stringify(`../content/docs/${path}?collection=docs&only=frontmatter`)};`,
          ),
          ...published.metadata.map(
            (path, index) =>
              `import meta${index} from ${JSON.stringify(`../content/docs/${path}?collection=docs`)};`,
          ),
          "export const researchPages: { path: string; data: ResearchFrontmatter }[] = [",
          ...published.pages.map(
            (path, index) =>
              `{ path: ${JSON.stringify(path)}, data: page${index} },`,
          ),
          "];",
          "export const researchMeta: { path: string; data: MetaData }[] = [",
          ...published.metadata.map(
            (path, index) =>
              `{ path: ${JSON.stringify(path)}, data: meta${index} },`,
          ),
          "];",
        ];
        return [{ path: "research.ts", content: lines.join("\n") }];
      },
    },
  ],
  mdxOptions: {
    remarkImageOptions: { useImport: false },
  },
});
