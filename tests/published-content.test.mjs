import assert from "node:assert/strict";
import { test } from "node:test";
import { loader } from "fumadocs-core/source";
import { createFromSource } from "fumadocs-core/search/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { filterPublishedContent } from "../lib/published-content.mjs";

function page(path, title, draft = false) {
  return {
    info: { path },
    title,
    draft,
    structuredData: {
      headings: [],
      contents: [{ heading: undefined, content: title }],
    },
  };
}

function meta(path, title) {
  return { info: { path }, title, pages: ["index", "..."] };
}

test("draft studies and their folder titles stay out of navigation and search", async () => {
  const published = filterPublishedContent(
    [
      page("index.md", "Library"),
      page("studies/published/index.md", "Published evidence"),
      page("studies/published/unfinished.md", "Secretunfinished", true),
      page("studies/private/index.md", "Secretdraft", true),
    ],
    [
      meta("meta.json", "Research"),
      meta("studies/meta.json", "Studies"),
      meta("studies/published/meta.json", "Published study"),
      meta("studies/private/meta.json", "Secretdraft"),
    ],
  );
  const source = loader({
    baseUrl: "/docs",
    source: toFumadocsSource(published.pages, published.meta),
  });

  assert.deepEqual(
    source.getPages().map((entry) => entry.url),
    ["/docs", "/docs/studies/published"],
  );
  assert.equal(source.getPage(["studies", "private"]), undefined);
  assert.equal(
    source.getPage(["studies", "published", "unfinished"]),
    undefined,
  );
  assert.doesNotMatch(JSON.stringify(source.pageTree), /Secret/);
  assert.match(JSON.stringify(source.pageTree), /Published study/);
  assert.doesNotMatch(
    JSON.stringify(source.generateParams()),
    /private|unfinished/,
  );

  const search = createFromSource(source);
  assert.equal((await search.search("Secretdraft")).length, 0);
  assert.equal((await search.search("Secretunfinished")).length, 0);
  assert.ok((await search.search("Published evidence")).length > 0);
  assert.doesNotMatch(JSON.stringify(await search.export()), /Secret/);
});

test("published descendants retain ancestor metadata without retaining sibling drafts", () => {
  const published = filterPublishedContent(
    [
      page("studies/nested/section/report.mdx", "Published nested report"),
      page("studies/nested/private/index.md", "Private section", true),
    ],
    [
      meta("meta.json", "Research"),
      meta("studies/meta.json", "Studies"),
      meta("studies/nested/meta.json", "Nested study"),
      meta("studies/nested/section/meta.json", "Published section"),
      meta("studies/nested/private/meta.json", "Private section"),
    ],
  );

  assert.deepEqual(
    published.meta.map((entry) => entry.info.path),
    [
      "meta.json",
      "studies/meta.json",
      "studies/nested/meta.json",
      "studies/nested/section/meta.json",
    ],
  );
});
