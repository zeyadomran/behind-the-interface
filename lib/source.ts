import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { docs } from "../.source/server";
import { filterPublishedContent } from "./published-content.mjs";

// Filter once, before building routes, navigation, the library, and search.
// Drafts remain unpublished in development as well as production.
const published = filterPublishedContent(docs.docs, docs.meta);

export const source = loader({
  baseUrl: "/docs",
  source: toFumadocsSource(published.pages, published.meta),
});

export type ResearchPage = typeof source.$inferPage;

export function getResearchEntries(): ResearchPage[] {
  return source
    .getPages()
    .filter((page) => page.data.kind === "study" || page.data.kind === "report")
    .sort(
      (left, right) =>
        (right.data.date ?? "").localeCompare(left.data.date ?? "") ||
        left.data.title.localeCompare(right.data.title),
    );
}
