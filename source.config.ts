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
      ])
      .optional(),
    visualView: z.enum(["screens", "type", "interactions"]).default("screens"),
  })
  .refine((page) => page.kind === "guide" || page.date !== undefined, {
    message: "Studies and reports need a date in YYYY-MM-DD format.",
    path: ["date"],
  });

export const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: researchPageSchema },
});

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: { useImport: false },
  },
});
