import assert from "node:assert/strict";
import { after, test } from "node:test";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { createStudy } from "../scripts/new-study.mjs";

const root = mkdtempSync(join(tmpdir(), "interesting-designs-authoring-"));
mkdirSync(join(root, "templates"));
copyFileSync(
  new URL("../templates/research-entry.md", import.meta.url),
  join(root, "templates/research-entry.md"),
);
after(() => {
  assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
  assert.ok(root.includes("interesting-designs-authoring-"));
  rmSync(root, { recursive: true, force: true });
});

test("a new study is a single dated draft at the docs root", () => {
  const file = createStudy({
    root,
    slug: "navigation-study",
    title: 'Navigation: "A closer look"',
    date: "2026-09-16",
  });
  assert.equal(file, join(root, "content/docs/navigation-study.md"));
  const body = readFileSync(file, "utf8");
  assert.match(body, /draft: true/);
  assert.match(body, /date: "2026-09-16"/);
  assert.match(body, /kind: "study"/);
  assert.match(body, /\/research\/navigation-study\//);
  assert.match(body, /title: "Navigation: \\"A closer look\\""/);
  assert.match(body, /content\/docs\/navigation-study\.md/);
  assert.deepEqual(readdirSync(join(root, "content/docs")), [
    "navigation-study.md",
  ]);
});

test("existing research is never overwritten", () => {
  const file = createStudy({
    root,
    slug: "existing-study",
    title: "Original",
  });
  const original = readFileSync(file, "utf8");
  assert.throws(
    () => createStudy({ root, slug: "existing-study", title: "Replacement" }),
    /already exists/,
  );
  assert.equal(readFileSync(file, "utf8"), original);
});

test("MDX pages and folders cannot receive a competing route", () => {
  const existingMdx = join(root, "content/docs/mdx-study.mdx");
  writeFileSync(existingMdx, "Original MDX");
  mkdirSync(join(root, "content/docs/folder-study"));

  for (const slug of ["mdx-study", "folder-study"]) {
    assert.throws(
      () => createStudy({ root, slug, title: "Replacement" }),
      /already exists/,
    );
    assert.equal(existsSync(join(root, `content/docs/${slug}.md`)), false);
  }
  assert.equal(readFileSync(existingMdx, "utf8"), "Original MDX");
});

test("invalid slugs, titles, and dates create no files", () => {
  const before = readdirSync(join(root, "content/docs"));
  for (const slug of [
    "../escape",
    "/absolute",
    "two--hyphens",
    "Upper Case",
    "",
  ]) {
    assert.throws(
      () => createStudy({ root, slug, title: "Example" }),
      /lowercase slug/,
    );
  }
  assert.throws(
    () => createStudy({ root, slug: "invalid-title", title: "   " }),
    /study title/,
  );
  assert.throws(
    () =>
      createStudy({
        root,
        slug: "invalid-date",
        title: "Example",
        date: "2026-02-30",
      }),
    /valid date/,
  );
  assert.equal(existsSync(join(root, "content/docs/invalid-date.md")), false);
  assert.deepEqual(readdirSync(join(root, "content/docs")), before);
});
