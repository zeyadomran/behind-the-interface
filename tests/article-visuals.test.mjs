import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";

const studyDirectory = resolve("content/docs");
const basePath = (process.env.VITE_BASE_PATH || "").replace(/\/+$/, "");
const sites = {
  ace: "ace",
  "arkon-digital": "arkon",
  "neue-montreal": "neue",
  monolog: "monolog",
  "lama-lama": "lama",
};

async function loadVisualData() {
  // TypeScript 7 no longer exports transpileModule. Use the installed compiler
  // without the app config so tests also work on Node 22.0, before TS stripping.
  const directory = mkdtempSync(
    join(tmpdir(), "interesting-designs-article-data-"),
  );
  try {
    const require = createRequire(import.meta.url);
    const compiler = join(
      dirname(require.resolve("typescript/package.json")),
      "bin/tsc",
    );
    const result = spawnSync(
      process.execPath,
      [
        compiler,
        "--ignoreConfig",
        "--target",
        "ES2022",
        "--module",
        "ESNext",
        "--skipLibCheck",
        "--outDir",
        directory,
        resolve("lib/article-visual-data.ts"),
      ],
      { encoding: "utf8" },
    );
    assert.equal(
      result.status,
      0,
      `Could not compile visual data: ${result.error || ""}\n${result.stdout}\n${result.stderr}`,
    );
    const javascript = readFileSync(
      join(directory, "article-visual-data.js"),
      "utf8",
    );
    return (
      await import(
        `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`
      )
    ).articleVisualData;
  } finally {
    assert.equal(dirname(directory), resolve(tmpdir()));
    assert.ok(
      basename(directory).startsWith("interesting-designs-article-data-"),
    );
    rmSync(directory, { recursive: true, force: true });
  }
}

const articleVisualData = await loadVisualData();

function measuredValue(value) {
  if (value === "Rail removed") return { size: null, lineHeight: null };
  const parts = value.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?|normal)$/);
  assert.ok(parts, `Unrecognized curated measurement: ${value}`);
  return {
    size: Number(parts[1]),
    lineHeight: parts[2] === "normal" ? "normal" : Number(parts[2]),
  };
}

function typographyRole([label, family, desktop, mobile, note]) {
  return {
    label,
    family,
    desktop: measuredValue(desktop),
    mobile: measuredValue(mobile),
    note,
  };
}

function curatedTypography(
  markdown,
  heading = "## Typography and pointer behavior",
) {
  const section = markdown
    .split(heading)[1]
    ?.split(/\r?\n## /)[0]
    ?.split("### Attention and reading order")[0];
  assert.ok(section, "The article needs its curated typography section");
  const table = section.split(/\r?\n/).filter((line) => line.startsWith("|"));
  assert.match(table[0], /Site and role.*Typeface.*Desktop.*Mobile/);
  return table.slice(2).map((row) =>
    typographyRole(
      row
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    ),
  );
}

function decodeEntities(value) {
  return value.replace(
    /&(?:#(\d+)|#x([\da-f]+)|(amp|quot|apos|lt|gt|nbsp));/gi,
    (_, decimal, hex, name) =>
      decimal || hex
        ? String.fromCodePoint(parseInt(decimal || hex, hex ? 16 : 10))
        : { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[
            name.toLowerCase()
          ],
  );
}

function textContent(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function builtArticle(slug) {
  const file = resolve("dist/docs", slug, "index.html");
  assert.ok(
    existsSync(file),
    `Run yarn build before these tests: missing ${file}`,
  );
  return readFileSync(file, "utf8").replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
}

function visualFigure(html, key) {
  const figure = [
    ...html.matchAll(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/g),
  ].find((match) => match[1].includes(`data-article-visual="${key}"`));
  assert.ok(figure, `Missing rendered ${key} evidence explorer`);
  return figure;
}

function buttonsIn(html) {
  return new Map(
    [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].map(
      (match) => [textContent(match[2]), match[1]],
    ),
  );
}

test("visual data matches every curated article type role without rounding or replacing missing values", () => {
  assert.deepEqual(
    Object.keys(articleVisualData).sort(),
    Object.keys(sites).sort(),
  );
  let roleCount = 0;
  for (const key of Object.keys(sites)) {
    const markdown = readFileSync(join(studyDirectory, `${key}.md`), "utf8");
    const expected = curatedTypography(markdown);
    assert.deepEqual(articleVisualData[key].typography, expected, key);
    roleCount += expected.length;
  }
  assert.equal(roleCount, 17, "Retain the full five-website measurement set");
});

test("Research findings preserves the full curated typography comparison in source and static HTML", () => {
  const markdown = readFileSync(
    join(studyDirectory, "research-findings.md"),
    "utf8",
  );
  const comparison = curatedTypography(markdown, "## Measured type hierarchy");
  const expected = Object.keys(sites).flatMap(
    (key) => articleVisualData[key].typography,
  );
  assert.equal(
    comparison.length,
    17,
    "All measured roles belong in the synthesis",
  );
  assert.deepEqual(
    comparison,
    expected,
    "Do not replace the curated comparison with raw samples",
  );

  const html = builtArticle("research-findings");
  const table = [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].find(
    (match) =>
      /Site and role.*Typeface.*Desktop.*Mobile/.test(textContent(match[1])),
  );
  assert.ok(table, "The full comparison must be readable in exported HTML");
  const rows = [...table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) =>
      [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) =>
        textContent(cell[1]),
      ),
    )
    .filter((cells) => cells.length > 0)
    .map(typographyRole);
  assert.deepEqual(
    rows,
    expected,
    "Every curated type role must render with its measurements and explanation",
  );
});

test("visual data uses each article's existing desktop and mobile evidence captures", () => {
  for (const [key, prefix] of Object.entries(sites)) {
    const markdown = readFileSync(join(studyDirectory, `${key}.md`), "utf8");
    for (const viewport of ["desktop", "mobile"]) {
      const screenshot = articleVisualData[key].screenshots[viewport];
      assert.equal(
        screenshot.src,
        `/research/five-websites/screenshots/${prefix}-${viewport}.jpg`,
      );
      assert.ok(
        markdown.includes(screenshot.src),
        `${key}: capture absent from report`,
      );
      assert.ok(existsSync(join("public", screenshot.src)), screenshot.src);
      assert.ok(
        screenshot.alt.trim(),
        `${key}: ${viewport} needs descriptive text`,
      );
    }
  }
});

test("visual data preserves interaction evidence categories and untested behavior limits", () => {
  const knownEvidence = new Set([
    "observed",
    "source-confirmed",
    "hook-only",
    "mixed",
  ]);
  for (const [key, data] of Object.entries(articleVisualData)) {
    assert.ok(
      data.interactions.length >= 3,
      `${key}: missing interaction findings`,
    );
    assert.equal(
      new Set(data.interactions.map((finding) => finding.label)).size,
      data.interactions.length,
      `${key}: interaction labels must be distinct`,
    );
    for (const finding of data.interactions) {
      assert.ok(
        knownEvidence.has(finding.evidence),
        `${key}: unknown evidence category`,
      );
      for (const field of ["label", "trigger", "response", "detail"]) {
        assert.ok(finding[field].trim(), `${key}: missing ${field}`);
      }
    }
  }

  const camera = articleVisualData["lama-lama"].interactions.find(
    (finding) => finding.label === "Camera grid",
  );
  assert.equal(camera?.evidence, "source-confirmed");
  assert.match(camera.detail, /not activated/i);
  const lighting = articleVisualData["arkon-digital"].interactions.find(
    (finding) => finding.label === "Pointer lighting",
  );
  assert.equal(lighting?.evidence, "source-confirmed");
  assert.match(lighting.detail, /not a separately proven/i);
  const accordion = articleVisualData.monolog.interactions.find(
    (finding) => finding.label === "Values accordion",
  );
  assert.equal(accordion?.evidence, "hook-only");
  assert.match(accordion.detail, /did not confirm.*live/i);
});

test("built site reports expose evidence controls without replacing the full research article", () => {
  for (const key of Object.keys(sites)) {
    const markdown = readFileSync(join(studyDirectory, `${key}.md`), "utf8");
    assert.match(markdown.split("---")[1], new RegExp(`visual:\\s*"${key}"`));
    const html = builtArticle(key);
    const figure = visualFigure(html, key);
    const controls = buttonsIn(figure[2]);
    assert.match(figure[1], /aria-labelledby="[^"]+"/);
    for (const label of [
      "Viewports",
      "Type scale",
      "Interactions",
      "Desktop",
      "Mobile",
    ]) {
      assert.ok(controls.has(label), `${key}: missing ${label} control`);
      assert.match(controls.get(label), /aria-pressed="(?:true|false)"/);
    }
    assert.match(controls.get("Viewports"), /aria-pressed="true"/);
    assert.match(controls.get("Desktop"), /aria-pressed="true"/);
    assert.match(controls.get("Mobile"), /aria-pressed="false"/);
    assert.ok(
      figure[2].includes(
        `src="${basePath}${articleVisualData[key].screenshots.desktop.src}"`,
      ),
      `${key}: default capture must use the configured deployment path`,
    );
    assert.match(
      textContent(figure[2]),
      /Research captured September 15–16, 2026/,
    );
    const endOfFigure = figure.index + figure[0].length;
    for (const heading of [
      "website-review",
      "typography-and-pointer-behavior",
      "public-source-audit",
    ]) {
      assert.ok(
        html.indexOf(`id="${heading}"`) > endOfFigure,
        `${key}: ${heading} research must remain after the explorer`,
      );
    }
  }
});

test("Research findings provides the five-site explorer with Type scale selected initially", () => {
  const markdown = readFileSync(
    join(studyDirectory, "research-findings.md"),
    "utf8",
  );
  const frontmatter = markdown.split("---")[1];
  assert.match(frontmatter, /^visual:\s*"collection"\s*$/m);
  assert.match(frontmatter, /^visualView:\s*"type"\s*$/m);
  const html = builtArticle("research-findings");
  const figure = visualFigure(html, "collection");
  const controls = buttonsIn(figure[2]);
  assert.match(controls.get("Type scale"), /aria-pressed="true"/);
  for (const label of ["Viewports", "Interactions"]) {
    assert.match(controls.get(label), /aria-pressed="false"/);
  }
  const siteSelect = figure[2].match(
    /<select\b[^>]*id="[^"]+-site"[^>]*>([\s\S]*?)<\/select>/,
  );
  assert.ok(siteSelect, "The synthesis explorer needs a website selector");
  const options = [
    ...siteSelect[1].matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g),
  ];
  assert.equal(
    options.length,
    5,
    "The synthesis explorer must retain all five websites",
  );
  for (const [key, data] of Object.entries(articleVisualData)) {
    const option = options.find((match) => match[1].includes(`value="${key}"`));
    assert.ok(option, `Research findings: missing ${key} selection`);
    assert.equal(textContent(option[2]), data.name);
  }
  assert.match(figure[2], /aria-label="Measured font sizes"/);
  assert.match(
    textContent(figure[2]),
    /not a reproduction of the original typefaces/,
  );
  assert.ok(
    html.indexOf('id="measured-type-hierarchy"') >
      figure.index + figure[0].length,
    "The full comparison must remain after the explorer",
  );
});
