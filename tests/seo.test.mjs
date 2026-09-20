import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { test } from "node:test";

const output = resolve("dist");
const content = resolve("content/docs");
const base = (process.env.VITE_BASE_PATH || "").replace(/\/+$/, "");
const origin = new URL(
  process.env.VITE_SITE_URL || "https://design.zeyadomran.com",
).origin;
const brand = "Behind the Interface";
const preview = process.env.VERCEL_ENV === "preview";
const websites = [
  { slug: "noho", url: "https://noho.ink/" },
  { slug: "ace", url: "https://acedesign.io/" },
  { slug: "arkon-digital", url: "https://arkon.digital/" },
  { slug: "neue-montreal", url: "https://neuemontreal.com/" },
  { slug: "monolog", url: "https://bymonolog.com/" },
  { slug: "lama-lama", url: "https://lamalama.com/" },
];

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const documents = filesIn(content)
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => {
    const frontmatter = readFileSync(file, "utf8").split("---")[1] || "";
    const slug = relative(content, file)
      .replaceAll("\\", "/")
      .replace(/\.mdx?$/, "")
      .replace(/(?:^|\/)index$/, "");
    return {
      route: slug ? `/docs/${slug}/` : "/docs/",
      draft: /^draft:\s*true\s*$/m.test(frontmatter),
      article: /^kind:\s*["']?(?:study|report)["']?\s*$/m.test(frontmatter),
    };
  });

const pages = [
  { route: "/", article: false },
  ...documents.filter((document) => !document.draft),
  ...websites.map((website) => ({
    route: `/studies/${website.slug}/`,
    article: true,
  })),
];

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

function attributes(markup) {
  return Object.fromEntries(
    [...markup.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key.toLowerCase(),
      decodeEntities(value),
    ]),
  );
}

function textContent(markup) {
  return decodeEntities(markup.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function readPage(route) {
  const file = join(output, route, "index.html");
  assert.ok(existsSync(file), `Run yarn build first: missing ${file}`);
  const raw = readFileSync(file, "utf8");
  const head = raw.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, `${route}: missing a static document head`);
  return {
    raw,
    head,
    // Credit checks must inspect visible server-rendered HTML, not hydration data.
    html: raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""),
  };
}

function metadata(head) {
  return [...head.matchAll(/<meta\b([^>]*)>/gi)].map((match) =>
    attributes(match[1]),
  );
}

function metaValue(meta, key, route) {
  const entries = meta.filter((item) => (item.name || item.property) === key);
  assert.equal(entries.length, 1, `${route}: expected one ${key} meta tag`);
  assert.ok(entries[0].content?.trim(), `${route}: empty ${key} metadata`);
  return entries[0].content;
}

function publicURL(route) {
  return `${origin}${base}${route}`;
}

function assertExportedImage(value, route) {
  const image = new URL(value);
  assert.equal(
    image.origin,
    origin,
    `${route}: social image uses the wrong origin`,
  );
  assert.ok(
    image.pathname.startsWith(`${base}/`),
    `${route}: social image must preserve the deployment base path`,
  );
  const asset = resolve(
    output,
    `.${decodeURIComponent(image.pathname.slice(base.length))}`,
  );
  assert.ok(
    existsSync(asset),
    `${route}: social image was not exported: ${value}`,
  );
  assert.ok(
    readFileSync(asset).length > 1000,
    `${route}: social image is empty`,
  );
}

function schemaNodes(raw, route) {
  const scripts = [...raw.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => attributes(match[1]).type === "application/ld+json")
    .map((match) => {
      try {
        return JSON.parse(match[2]);
      } catch (error) {
        assert.fail(`${route}: invalid JSON-LD: ${error.message}`);
      }
    });
  assert.ok(scripts.length, `${route}: missing exported structured data`);
  function flatten(value) {
    if (Array.isArray(value)) return value.flatMap(flatten);
    assert.ok(
      value && typeof value === "object",
      `${route}: invalid schema node`,
    );
    return value["@graph"] ? [value, ...flatten(value["@graph"])] : [value];
  }
  return scripts.flatMap(flatten);
}

function isType(node, type) {
  return [node["@type"]].flat().includes(type);
}

function sourceCredit(html, route) {
  const aside = [
    ...html.matchAll(/<aside\b([^>]*)>([\s\S]*?)<\/aside>/gi),
  ].find((match) =>
    attributes(match[1]).class?.split(/\s+/).includes("source-credit"),
  );
  assert.ok(aside, `${route}: provide a visible source-credit component`);
  assert.equal(attributes(aside[1])["aria-label"], "Original website credits");
  assert.match(
    textContent(aside[2]),
    /design and development belongs to .* creators/i,
  );
  return aside[2];
}

test("every published content page has unique, public search and social metadata", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const { route } of pages) {
    const { head } = readPage(route);
    const meta = metadata(head);
    const titleMatches = [
      ...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi),
    ];
    assert.equal(
      titleMatches.length,
      1,
      `${route}: expected one document title`,
    );
    const title = textContent(titleMatches[0][1]);
    assert.ok(
      title.includes(brand),
      `${route}: missing the publication name in the title`,
    );
    assert.ok(
      !titles.has(title),
      `${route}: duplicate document title: ${title}`,
    );
    titles.add(title);

    const description = metaValue(meta, "description", route);
    assert.ok(
      description.length >= 30,
      `${route}: provide a meaningful description`,
    );
    assert.ok(
      !descriptions.has(description),
      `${route}: duplicate page description`,
    );
    descriptions.add(description);
    const canonicals = [...head.matchAll(/<link\b([^>]*)>/gi)]
      .map((match) => attributes(match[1]))
      .filter((link) => link.rel === "canonical");
    assert.equal(canonicals.length, 1, `${route}: expected one canonical URL`);
    assert.equal(
      canonicals[0].href,
      publicURL(route),
      `${route}: canonical must point to this page`,
    );

    assert.ok(metaValue(meta, "og:title", route).includes(brand));
    assert.equal(metaValue(meta, "og:description", route), description);
    assert.equal(metaValue(meta, "og:url", route), publicURL(route));
    assert.equal(metaValue(meta, "og:site_name", route), brand);
    assertExportedImage(metaValue(meta, "og:image", route), route);
    assert.ok(metaValue(meta, "og:image:alt", route).length > 10);
    assert.equal(metaValue(meta, "twitter:card", route), "summary_large_image");
    assert.ok(metaValue(meta, "twitter:title", route).includes(brand));
    assert.equal(metaValue(meta, "twitter:description", route), description);
    assertExportedImage(metaValue(meta, "twitter:image", route), route);
    assert.doesNotMatch(
      head,
      /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?[/"<]/i,
    );
    assert.doesNotMatch(head, /Interesting Designs|Field[ -]?notes/i);
    for (const directive of meta.filter((item) =>
      ["robots", "googlebot"].includes(item.name),
    )) {
      if (preview) {
        assert.match(
          directive.content || "",
          /\bnoindex\b/i,
          `${route}: previews should not be indexed`,
        );
      } else {
        assert.doesNotMatch(
          directive.content || "",
          /\b(?:noindex|none)\b/i,
          `${route}: a published page must be indexable`,
        );
      }
    }
  }
});

test("published pages include parseable structured data and accurate breadcrumbs", () => {
  for (const { route, article } of pages) {
    const nodes = schemaNodes(readPage(route).raw, route);
    assert.ok(
      nodes.some((node) => node["@context"] === "https://schema.org"),
      `${route}: missing Schema.org context`,
    );
    assert.doesNotMatch(
      JSON.stringify(nodes),
      /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?[/"<]/i,
    );
    if (route === "/") {
      const website = nodes.find((node) => isType(node, "WebSite"));
      assert.ok(
        website,
        "The homepage must identify the publication as a WebSite",
      );
      assert.equal(website.name, brand);
      assert.equal(website.url, publicURL("/"));
      continue;
    }
    if (article) {
      const entry = nodes.find((node) => isType(node, "Article"));
      assert.ok(
        entry,
        `${route}: research and stories need Article structured data`,
      );
      assert.ok(
        entry.headline?.length > 4,
        `${route}: missing article headline`,
      );
      assert.ok(
        entry.description?.length > 20,
        `${route}: missing article description`,
      );
      const entryURL =
        entry.url ||
        (typeof entry.mainEntityOfPage === "string"
          ? entry.mainEntityOfPage
          : entry.mainEntityOfPage?.["@id"]);
      assert.equal(
        entryURL,
        publicURL(route),
        `${route}: article structured data points to another page`,
      );
      const authors = [entry.author].flat();
      assert.ok(
        authors.some((author) => author?.name === "Zeyad Omran"),
        `${route}: identify the researcher`,
      );
    }
    const breadcrumbs = nodes.find((node) => isType(node, "BreadcrumbList"));
    assert.ok(breadcrumbs, `${route}: missing breadcrumb structured data`);
    assert.ok(
      breadcrumbs.itemListElement?.length >= 2,
      `${route}: incomplete breadcrumbs`,
    );
    for (const [index, item] of breadcrumbs.itemListElement.entries()) {
      assert.equal(
        item.position,
        index + 1,
        `${route}: breadcrumb positions must be sequential`,
      );
      assert.ok(item.name?.trim(), `${route}: missing breadcrumb label`);
      const url =
        typeof item.item === "string" ? item.item : item.item?.["@id"];
      assert.ok(
        url?.startsWith(`${origin}${base}/`),
        `${route}: breadcrumb should use this deployment's public URL`,
      );
    }
    const last = breadcrumbs.itemListElement.at(-1);
    assert.equal(
      typeof last.item === "string" ? last.item : last.item?.["@id"],
      publicURL(route),
      `${route}: breadcrumb trail must end at the current page`,
    );
  }
});

test("sitemap and robots publish the canonical content routes without drafts or utility pages", () => {
  const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(
    (match) => decodeEntities(match[1]).trim(),
  );
  assert.deepEqual(
    locations.sort(),
    pages.map((page) => publicURL(page.route)).sort(),
    "Sitemap must contain every published content route exactly once",
  );
  assert.doesNotMatch(sitemap, /localhost|127\.0\.0\.1|\/404(?:\/|<)|\/api\//);
  for (const document of documents.filter((document) => document.draft)) {
    assert.ok(
      !locations.includes(publicURL(document.route)),
      `Draft entered sitemap: ${document.route}`,
    );
  }
  const robots = readFileSync(join(output, "robots.txt"), "utf8");
  const sitemapLines = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(
    (match) => match[1],
  );
  assert.deepEqual(sitemapLines, [publicURL("/sitemap.xml")]);
  assert.match(robots, /^User-Agent:\s*\*\s*$/im);
  if (preview) {
    assert.match(
      robots,
      /^Disallow:\s*\/\s*$/im,
      "Preview deployments should block crawling",
    );
  } else {
    assert.doesNotMatch(
      robots,
      /^Disallow:\s*\/\s*$/im,
      "Public research should not be blocked from crawling",
    );
  }
});

test("each story and research document visibly credits its original website", () => {
  for (const website of websites) {
    for (const route of [
      `/studies/${website.slug}/`,
      `/docs/${website.slug}/`,
    ]) {
      const { html } = readPage(route);
      const credit = sourceCredit(html, route);
      const link = [...credit.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].find(
        (match) => {
          const href = attributes(match[1]).href;
          return (
            href &&
            new URL(href, publicURL(route)).href === website.url &&
            textContent(match[2])
          );
        },
      );
      assert.ok(link, `${route}: name and link to the original website`);
      assert.doesNotMatch(
        attributes(link[1]).rel || "",
        /\bnofollow\b/,
        `${route}: an editorial credit should be a normal external link`,
      );
    }
  }
  for (const route of [
    "/docs/",
    "/docs/methodology/",
    "/docs/research-findings/",
  ]) {
    const { html } = readPage(route);
    const credit = sourceCredit(html, route);
    const destinations = [...credit.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
      .filter((match) => textContent(match[2]))
      .map((match) => attributes(match[1]).href)
      .filter(Boolean)
      .map((href) => new URL(href, publicURL(route)).href);
    for (const website of websites) {
      // The comparison and methodology retain the original five-site scope.
      if (route !== "/docs/" && website.slug === "noho") continue;
      assert.ok(
        destinations.includes(website.url),
        `${route}: missing original website credit for ${website.slug}`,
      );
    }
  }
});
