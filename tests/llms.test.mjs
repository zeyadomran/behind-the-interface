import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { test } from "node:test";

const output = resolve("out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://design.zeyadomran.com",
).origin;

test("the exported agent guide discovers every published page through valid canonical links", () => {
  const guide = readFileSync(join(output, "llms.txt"), "utf8");
  assert.match(guide, /^# Behind the Interface\n\n> /);
  assert.doesNotMatch(guide, /<html|localhost|127\.0\.0\.1/);

  const links = [
    ...guide.matchAll(/^- \[(?:\\.|[^\]])+\]\(([^\s]+)\): .+$/gm),
  ].map((match) => match[1]);
  assert.ok(links.length > 0, "Publish Markdown links with descriptions");
  const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
  const canonicalPages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1].replaceAll("&amp;", "&"),
  );
  for (const page of canonicalPages) {
    assert.ok(links.includes(page), `Agent guide must discover ${page}`);
  }

  const ownLinks = links.filter((link) => new URL(link).origin === origin);
  for (const link of ownLinks) {
    const url = new URL(link);
    assert.ok(
      url.pathname.startsWith(`${base}/`),
      "Preserve the deployment base path",
    );
    const path = decodeURIComponent(url.pathname.slice(base.length));
    const file = join(output, path, path.endsWith("/") ? "index.html" : "");
    assert.ok(
      existsSync(file) && statSync(file).isFile(),
      `Guide has an unexported destination: ${link}`,
    );
    if (path.startsWith("/docs/") || path.startsWith("/studies/")) {
      assert.ok(
        canonicalPages.includes(link),
        `Only publish canonical content routes: ${link}`,
      );
    }
  }

  // H2 sections are file lists, so simple llms.txt parsers can discover every entry.
  for (const section of guide.split(/^## /m).slice(1)) {
    const [, ...lines] = section.split("\n");
    for (const line of lines.filter(Boolean)) {
      assert.match(line, /^- \[/, "Keep prose before the file-list sections");
    }
  }
});
