import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { staticClient } from "fumadocs-core/search/client/orama-static";

const output = resolve("dist");
const base = (process.env.VITE_BASE_PATH || "").replace(/\/+$/, "");
const researchPath = "/docs";
const websites = [
  {
    slug: "ace",
    title: /Ace/,
    evidence: [/Floyd/, /640px/, /1\.05/, /hoverBoost/, /laboratorium/],
    query: "Floyd",
    screenshots: ["ace-desktop", "ace-mobile", "ace-notes-hover"],
  },
  {
    slug: "arkon-digital",
    title: /Arkon/,
    evidence: [/React Three Fiber/, /162px/, /JetBrains Mono/, /power2\.inOut/],
    query: "spotlight",
    screenshots: ["arkon-desktop", "arkon-mobile"],
  },
  {
    slug: "neue-montreal",
    title: /Neue Montréal/,
    evidence: [/1800ms/, /Hover3D/, /MorphSemicolon/, /postcard/i],
    query: "MorphSemicolon",
    screenshots: [
      "neue-desktop",
      "neue-mobile",
      "neue-mobile-accordion",
      "neue-story-hierarchy",
    ],
  },
  {
    slug: "monolog",
    title: /MONOLOG/,
    evidence: [/Hold to disrupt/, /94px/, /Invalid referrer/, /backhouse/],
    query: "Invalid referrer",
    screenshots: [
      "monolog-desktop",
      "monolog-footer",
      "monolog-mobile",
      "monolog-service-hover",
    ],
  },
  {
    slug: "lama-lama",
    title: /Lama Lama/,
    evidence: [/Lisa Stegers/, /drawLLLogo/, /getUserMedia/, /lorem ipsum/],
    query: "camera playground",
    screenshots: [
      "lama-desktop",
      "lama-filter",
      "lama-pitchdeck",
      "lama-contact-grid",
      "lama-mobile",
      "lama-mobile-work",
      "lama-team-hover",
      "lama-mobile-awards",
    ],
  },
];
const researchSlugs = [
  ...websites.map((website) => website.slug),
  "research-findings",
];

function decodeEntities(text) {
  return text.replace(
    /&(?:#(\d+)|#x([\da-f]+)|(amp|quot|apos|lt|gt|nbsp));/gi,
    (_, decimal, hex, name) =>
      decimal || hex
        ? String.fromCodePoint(parseInt(decimal || hex, hex ? 16 : 10))
        : { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[
            name.toLowerCase()
          ],
  );
}

function readHTML(file) {
  return readFileSync(file, "utf8").replace(
    /<script\b([^>]*)>[\s\S]*?<\/script>/gi,
    (_, attributes) =>
      /\bsrc="/.test(attributes) ? `<script${attributes}></script>` : "",
  );
}

function readRoute(path) {
  return readHTML(join(output, path, "index.html"));
}

function textContent(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
}

function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

test("all published research has readable static HTML and navigation", () => {
  for (const slug of [
    "",
    "docs",
    "docs/methodology",
    ...researchSlugs.map((slug) => `docs/${slug}`),
  ]) {
    const html = readRoute(slug);
    assert.match(html, /<h1\b/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /Behind the Interface/);
  }
  const report = readRoute("docs/research-findings");
  assert.match(report, /Observed/);
  assert.match(report, /65 additional route requests/);
});

test("prerendered pages finish suspended content without client-only fallbacks", () => {
  const pages = filesIn(output).filter((file) => file.endsWith(".html"));
  assert.ok(
    pages.length > 0,
    "Build the published pages before checking prerendering",
  );
  for (const file of pages) {
    // Check the raw response: removing templates or hydration data can hide an
    // aborted Suspense boundary even when the surrounding article is readable.
    const html = readFileSync(file, "utf8");
    assert.doesNotMatch(
      html,
      /<!--\$!-->|<template\b[^>]*\bdata-(?:msg|dgst)=|The server used (?:&quot;|["'])?renderToString/i,
      `${relative(output, file)}: prerendering must await suspended content instead of exporting a client-only fallback`,
    );
  }
});

test("the library publishes exactly six independent research entries with no former supplements", () => {
  const sourceDirectory = resolve("content/docs");
  const researchFiles = filesIn(sourceDirectory)
    .filter((file) => /\.mdx?$/.test(file))
    .filter(
      (file) =>
        !/^draft:\s*true\s*$/m.test(
          readFileSync(file, "utf8").split("---")[1] ?? "",
        ),
    )
    .filter((file) =>
      /^kind:\s*["']?(?:study|report)["']?\s*$/m.test(
        readFileSync(file, "utf8").split("---")[1] ?? "",
      ),
    )
    .map((file) => relative(sourceDirectory, file).replaceAll("\\", "/"));
  assert.deepEqual(
    researchFiles.sort(),
    researchSlugs.map((slug) => `${slug}.md`).sort(),
    "Research sources must be six flat documents without duplicate supplements",
  );
  for (const slug of researchSlugs) {
    const frontmatter = readFileSync(
      join(sourceDirectory, `${slug}.md`),
      "utf8",
    ).split("---")[1];
    const kind = slug === "research-findings" ? "report" : "study";
    assert.match(frontmatter, new RegExp(`^kind:\\s*"${kind}"\\s*$`, "m"));
  }
  const documentRoutes = filesIn(join(output, "docs"))
    .filter((file) => file.endsWith("index.html"))
    .map((file) => relative(join(output, "docs"), file).replaceAll("\\", "/"));
  assert.deepEqual(
    documentRoutes.sort(),
    [
      "index.html",
      "methodology/index.html",
      ...researchSlugs.map((slug) => `${slug}/index.html`),
    ].sort(),
    "Only the six research pages and existing guides should be generated",
  );

  const homepage = readRoute("");
  const entries = [
    ...homepage.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi),
  ];
  assert.equal(
    entries.length,
    6,
    "All six research entries must be visible on the homepage",
  );
  const entryLinks = entries.map((entry) => {
    const heading = entry[1].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)?.[1];
    const href = heading?.match(/<a\b[^>]*\bhref="([^"]+)"/i)?.[1];
    assert.ok(href, "Each library entry needs its own linked heading");
    assert.doesNotMatch(
      entry[1],
      /<img\b/i,
      "Library teasers should use original wordprints, not screenshots",
    );
    assert.match(
      entry[1],
      /<button\b[^>]*aria-label="Recompose the [^"]+ wordprint"[^>]*aria-pressed="false"/i,
      "Each wordprint needs a named native keyboard control",
    );
    assert.match(
      entry[1],
      /<svg\b[^>]*class="wordprint-art(?:\s[^"]*)?"/i,
      "Each article needs its own static typographic artwork",
    );
    return decodeEntities(href);
  });
  assert.deepEqual(
    entryLinks.sort(),
    [
      ...websites.map((website) => `${base}/studies/${website.slug}/`),
      `${base}${researchPath}/research-findings/`,
    ].sort(),
  );
  assert.doesNotMatch(homepage, /Inside the study|class="study-reports"/i);
  for (const file of filesIn(output).filter((file) => file.endsWith(".html"))) {
    assert.doesNotMatch(
      readHTML(file),
      /href="[^"]*\/docs\/(?:studies(?:\/|["#])|(?:typography|source-audit|route-inventory)(?:\/|["#]))/i,
      `${file}: obsolete grouped research navigation`,
    );
  }
});

test("each website has a discoverable report preserving its observations and screenshots", () => {
  const overview = readRoute("docs/research-findings");
  const homepage = readRoute("");
  const screenshotFiles = new Set();

  for (const website of websites) {
    const route = `${researchPath}/${website.slug}/`;
    const html = readRoute(route);
    const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
    assert.ok(title, `${website.slug}: missing report title`);
    assert.match(textContent(title), website.title);
    const text = textContent(html);
    for (const fact of website.evidence) {
      assert.match(
        text,
        fact,
        `${website.slug}: missing preserved evidence ${fact}`,
      );
    }

    const images = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)]
      .map((match) => decodeEntities(match[1]))
      .filter((src) => src.includes("/research/five-websites/screenshots/"));
    const expected = website.screenshots.map(
      (name) => `${base}/research/five-websites/screenshots/${name}.jpg`,
    );
    assert.deepEqual(
      [...new Set(images)].sort(),
      expected.sort(),
      `${website.slug}: misplaced or missing screenshots`,
    );
    for (const name of website.screenshots) screenshotFiles.add(`${name}.jpg`);
    assert.ok(
      overview.includes(`href="${base}${route}"`),
      `${website.slug}: absent from overview/navigation`,
    );
    assert.ok(
      homepage.includes(`href="${base}${route}"`),
      `${website.slug}: absent from library`,
    );
  }

  assert.deepEqual(
    [...screenshotFiles].sort(),
    readdirSync(join(output, "research/five-websites/screenshots")).sort(),
    "Every research screenshot must remain on its website report",
  );
  const overviewHeadings = [
    ...overview.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi),
  ].map((match) => textContent(match[1]).trim());
  assert.ok(
    !overviewHeadings.some((heading) =>
      /^(Ace|Arkon Digital|Neue Montréal|MONOLOG|Lama Lama)\s*[—/]/.test(
        heading,
      ),
    ),
    "Detailed website sections should live on the dedicated pages",
  );
});

test("research findings retain the comparison, source boundaries, route scope, and detailed evidence links", () => {
  const html = readRoute("docs/research-findings");
  const text = textContent(html);
  for (const evidence of [
    /Measured type hierarchy/,
    /Information hierarchy compared/,
    /Source-confirmed/,
    /Hook only/i,
    /No source repository access|no private repository access/i,
    /65 public URL requests/,
    /8 Ace/,
    /8 MONOLOG/,
    /49 Lama Lama/,
    /41 URLs, 40 unique destinations/,
    /HTTP 200/,
    /not live interaction tests/,
    /screen readers|screen-reader/i,
  ]) {
    assert.match(text, evidence, `Synthesis lost research scope: ${evidence}`);
  }
  assert.ok(
    html.includes(
      `href="${base}/research/five-websites/typography-measurements.json"`,
    ),
    "The curated comparison must retain its raw measurements link",
  );
  for (const website of websites) {
    for (const anchor of [
      "typography-and-pointer-behavior",
      "public-source-audit",
    ]) {
      assert.ok(
        html.includes(
          `href="${base}${researchPath}/${website.slug}/#${anchor}"`,
        ),
        `${website.slug}: synthesis lost its ${anchor} evidence link`,
      );
    }
  }
  for (const slug of ["ace", "monolog", "lama-lama"]) {
    assert.ok(
      html.includes(`href="${base}${researchPath}/${slug}/#route-inventory"`),
      `${slug}: synthesis lost its complete route inventory link`,
    );
  }
});

test("internal document links, screenshots, scripts, styles, and fonts exist", () => {
  let checked = 0;
  let anchorsChecked = 0;
  const htmlByPath = new Map();
  const idsByPath = new Map();
  for (const file of filesIn(output).filter((path) => path.endsWith(".html"))) {
    const html = readHTML(file);
    htmlByPath.set(file, html);
    idsByPath.set(
      file,
      new Set(
        [...html.matchAll(/\b(?:id|name)="([^"<>]+)"/g)].map((match) =>
          decodeEntities(match[1]),
        ),
      ),
    );
  }
  for (const [file, html] of htmlByPath) {
    const currentURL = `https://static-build.invalid${base}/${relative(output, file).replaceAll("\\", "/")}`;
    for (const match of html.matchAll(/\b(?:src|href)="([^"<>]+)"/g)) {
      const href = decodeEntities(match[1]);
      if (/^[a-z][a-z\d+.-]*:|^\/\//i.test(href)) continue;
      const url = new URL(href, currentURL);
      const pathname = decodeURIComponent(url.pathname);
      if (base)
        assert.ok(
          pathname === base || pathname.startsWith(base + "/"),
          `${file}: missing deployment base in ${pathname}`,
        );
      let path = resolve(output, "." + (pathname.slice(base.length) || "/"));
      assert.ok(existsSync(path), `${file}: missing ${href}`);
      if (statSync(path).isDirectory()) {
        path = join(path, "index.html");
        assert.ok(existsSync(path), `Missing index: ${href}`);
      }
      const fragment = decodeURIComponent(url.hash.slice(1)).split(
        ":~:text=",
      )[0];
      if (fragment && idsByPath.has(path)) {
        assert.ok(
          idsByPath.get(path).has(fragment),
          `${file}: missing anchor ${href}`,
        );
        anchorsChecked++;
      }
      checked++;
    }
  }
  assert.ok(checked > 100);
  assert.ok(
    anchorsChecked > 20,
    "Check heading links as well as page destinations",
  );
  const media = filesIn(join(output, "assets"));
  assert.equal(media.filter((name) => name.endsWith(".otf")).length, 4);
});

test("static full-text search finds evidence on every website report", async () => {
  const index = JSON.parse(
    readFileSync(join(output, "api/search.json"), "utf8"),
  );
  const json = JSON.stringify(index);
  assert.match(json, /MONOLOG/);
  assert.match(json, /640px/);
  assert.match(json, /\/docs\/research-findings/);
  assert.doesNotMatch(json, /\/docs\/studies\/five-websites/);
  assert.doesNotMatch(json, /Study title|YYYY-MM-DD/);

  const client = staticClient({
    from: `data:application/json,${encodeURIComponent(json)}`,
  });
  for (const website of websites) {
    const matches = await client.search(website.query);
    const pageURL = `${researchPath}/${website.slug}`;
    assert.ok(
      matches.some(
        (result) =>
          result.url === pageURL ||
          result.url.startsWith(`${pageURL}#`) ||
          result.url.startsWith(`${pageURL}/`),
      ),
      `${website.slug}: body-text search for ${JSON.stringify(website.query)} did not find its report`,
    );
  }
  const synthesisMatches = await client.search("161.54");
  assert.ok(
    synthesisMatches.some((result) =>
      /^\/docs\/research-findings(?:$|[#/])/.test(result.url),
    ),
    "The merged typography evidence must be searchable on Research findings",
  );
});
