import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

const base = (process.env.VITE_BASE_PATH || "").replace(/\/+$/, "");
const sites = [
  "ace",
  "arkon-digital",
  "neue-montreal",
  "monolog",
  "lama-lama",
  "noho",
];
const chapterIDs = ["idea", "type", "motion", "mobile", "takeaways"];
const evidenceLabels = [
  "Observed",
  "Observed + source",
  "Source-confirmed",
  "Hook only",
  "Interpretation",
  "Illustration",
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

function textContent(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function attribute(html, name) {
  return decodeEntities(
    html.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] || "",
  );
}

// The sections under test contain no scripts, so the prerendered HTML is read
// as exported rather than filtered.
function builtRoute(route) {
  const file = resolve("dist", route, "index.html");
  assert.ok(existsSync(file), `Run yarn build before these tests: ${file}`);
  return readFileSync(file, "utf8");
}

/** The element whose opening tag matches, including nested same-name tags. */
function element(html, pattern, tag) {
  const start = html.search(pattern);
  assert.ok(start >= 0, `Missing element ${pattern}`);
  const tags = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
  tags.lastIndex = start;
  let depth = 0;
  for (let match = tags.exec(html); match; match = tags.exec(html)) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, tags.lastIndex);
  }
  throw new Error(`Unclosed ${tag}`);
}

// Under a base path, the router writes the root route as /base?lens=…
function rootQuery(href) {
  return href.replace(/(.)\/\?/, "$1?");
}

function links(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: attribute(match[1], "href"),
    text: textContent(match[2]),
    attributes: match[1],
  }));
}

function buttons(html) {
  return [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].map(
    (match) => ({
      name: attribute(match[1], "aria-label") || textContent(match[2]),
      attributes: match[1],
    }),
  );
}

// The findings deck is TypeScript data; each entry keeps site before anchor.
function findings() {
  const source = readFileSync("lib/findings.ts", "utf8");
  return [
    ...source.matchAll(
      /id: "([^"]+)",\s*site: "([^"]+)",\s*text:\s*"((?:[^"\\]|\\.)*)",\s*evidence: "([^"]+)",\s*anchor: "([^"]+)"/g,
    ),
  ].map(([, id, site, text, evidence, anchor]) => ({
    id,
    site,
    text,
    evidence,
    anchor,
  }));
}

test("every finding in the deck is sourced to an existing research section", () => {
  const deck = findings();
  assert.ok(deck.length >= 20, "The deck needs a substantial set of findings");
  assert.equal(new Set(deck.map((item) => item.id)).size, deck.length);
  assert.deepEqual(
    [...new Set(deck.map((item) => item.site))].sort(),
    [...sites].sort(),
    "Every studied website contributes findings",
  );
  for (const finding of deck) {
    assert.ok(
      ["observed", "mixed", "source-confirmed", "hook-only"].includes(
        finding.evidence,
      ),
      `${finding.id}: a finding must carry recorded evidence`,
    );
    const research = builtRoute(`docs/${finding.site}`);
    assert.ok(
      research.includes(`id="${finding.anchor}"`),
      `${finding.id}: missing research anchor #${finding.anchor}`,
    );
  }
});

test("the homepage deals a readable finding before JavaScript runs", () => {
  const html = builtRoute("");
  const deck = element(html, /<section\b[^>]*class="findings-deck"/, "section");
  const cards = [
    ...deck.matchAll(/<div\b([^>]*class="finding-card"[^>]*)>/gi),
  ].map((match) => match[1]);
  const live = cards.filter((card) => !/\binert\b/.test(card));
  assert.equal(live.length, 1, "Exactly one card is interactive at a time");
  assert.equal(attribute(live[0], "data-offset"), "0");
  const first = findings()[0];
  assert.ok(
    textContent(deck).includes(decodeEntities(first.text)),
    "The first finding is readable in the exported HTML",
  );
  assert.ok(
    links(deck).some(
      (link) =>
        link.href === `${base}/docs/${first.site}/#${first.anchor}` &&
        link.text.startsWith("See the evidence"),
    ),
    "The top card links to its evidence",
  );
  assert.match(textContent(deck), /Observed/);
  for (const name of [
    "Previous finding",
    "Deal the next one",
    "Shuffle the deck",
  ])
    assert.ok(
      buttons(deck).some((button) => button.name === name),
      `Missing deck control: ${name}`,
    );
});

test("the library offers lenses, a layout switch and one entry per research page", () => {
  const html = builtRoute("");
  const library = element(html, /<section\b[^>]*id="studies"/, "section");
  const lensGroup = element(library, /<div\b[^>]*class="lens-switch"/, "div");
  const lenses = buttons(lensGroup);
  assert.deepEqual(
    lenses.map((button) => button.name),
    ["Overview", "Idea", "Type", "Motion", "Mobile", "Takeaways"],
  );
  assert.deepEqual(
    lenses.map((button) => attribute(button.attributes, "aria-pressed")),
    ["true", "false", "false", "false", "false", "false"],
    "The prerendered library opens on the overview",
  );
  const layout = buttons(
    element(library, /<div\b[^>]*class="view-switch"/, "div"),
  );
  assert.deepEqual(
    layout.map((button) => [
      button.name,
      attribute(button.attributes, "aria-pressed"),
    ]),
    [
      ["Grid", "true"],
      ["Index", "false"],
    ],
  );
  const numbers = [
    ...library.matchAll(/class="study-card-number">([^<]+)</g),
  ].map((match) => match[1]);
  assert.deepEqual(
    numbers,
    ["01", "02", "03", "04", "05", "06", "All"],
    "Studies keep their series numbers; the report follows them",
  );
});

test("the Studies menu reaches every story chapter and every comparison lens", () => {
  const html = builtRoute("");
  const menu = element(html, /<div\b[^>]*class="studies-menu"/, "div");
  const hrefs = new Set(links(menu).map((link) => rootQuery(link.href)));
  for (const site of sites) {
    assert.ok(hrefs.has(`${base}/docs/${site}/`), `${site}: research link`);
    for (const chapter of chapterIDs)
      assert.ok(
        hrefs.has(`${base}/studies/${site}/#${chapter}`),
        `${site}: missing ${chapter} chapter link`,
      );
  }
  for (const chapter of chapterIDs)
    assert.ok(
      hrefs.has(`${base || "/"}?lens=${chapter}#studies`),
      `Missing the ${chapter} comparison`,
    );
  assert.match(
    menu,
    /<button\b[^>]*aria-expanded="false"/,
    "The menu is a closed disclosure before interaction",
  );
});

test("the type lab plots every measured role on one scale, with a table twin", () => {
  const html = builtRoute("");
  const lab = element(html, /<figure\b[^>]*class="type-lab"/, "figure");
  const rows = element(lab, /<ol\b[^>]*class="type-lab-rows"/, "ol");
  const rowLinks = links(rows);
  const table = element(lab, /<table\b/, "table");
  const tableRows = [...table.matchAll(/<tr\b/g)].length - 1;
  assert.ok(rowLinks.length >= 21, "Plot every measured role");
  assert.equal(tableRows, rowLinks.length, "The table twin lists every row");
  for (const link of rowLinks) {
    assert.match(
      link.href,
      new RegExp(`^${base}/studies/(${sites.join("|")})/#type$`),
    );
    assert.match(
      attribute(link.attributes, "aria-label"),
      /\d+(?:\.\d+)? pixels on desktop, (?:\d+(?:\.\d+)? pixels|not displayed) on mobile/,
      "Each row names its values without relying on the chart",
    );
  }
});

test("the method section explains every kind of evidence with an example", () => {
  const html = builtRoute("");
  const method = element(
    html,
    /<section\b[^>]*class="method-section"/,
    "section",
  );
  const text = textContent(method);
  for (const label of evidenceLabels)
    assert.ok(text.includes(label), `Explain the ${label} label`);
  assert.equal(
    [...method.matchAll(/For example/g)].length,
    evidenceLabels.length,
  );
});
