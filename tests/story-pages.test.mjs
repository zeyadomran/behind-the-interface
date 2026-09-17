import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const chapterIDs = ["idea", "type", "motion", "mobile", "takeaways"];
const stories = [
  {
    slug: "ace",
    name: "Ace",
    capture: "ace",
    motion: ["Ace illustration: zoom image"],
  },
  {
    slug: "arkon-digital",
    name: "Arkon Digital",
    capture: "arkon",
    motion: [
      "Arkon Digital illustration: Home",
      "Arkon Digital illustration: Projects",
      "Arkon Digital illustration: Services",
    ],
  },
  {
    slug: "neue-montreal",
    name: "Neue Montréal",
    capture: "neue",
    motion: [
      "Neue Montréal illustration: Regular weight",
      "Neue Montréal illustration: Semibold weight",
    ],
  },
  {
    slug: "monolog",
    name: "MONOLOG",
    capture: "monolog",
    motion: [
      "MONOLOG illustration: Website Design",
      "MONOLOG illustration: 3D Development",
      "MONOLOG illustration: Brand Strategy",
    ],
  },
  {
    slug: "lama-lama",
    name: "Lama Lama",
    capture: "lama",
    motion: ["Lama Lama illustration: reframe the grid"],
  },
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

function elements(html, tag) {
  return [
    ...html.matchAll(
      new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi"),
    ),
  ].map(([, attributes, body]) => ({
    attributes,
    body,
    text: textContent(body),
  }));
}

function builtRoute(route) {
  const file = resolve("out", route, "index.html");
  assert.ok(
    existsSync(file),
    `Run pnpm build before these tests: missing ${file}`,
  );
  // The test must inspect the reading surface, not React's serialized payload.
  return readFileSync(file, "utf8").replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
}

function chapters(html) {
  return new Map(
    elements(html, "section")
      .filter((section) =>
        chapterIDs.includes(attribute(section.attributes, "id")),
      )
      .map((section) => [attribute(section.attributes, "id"), section]),
  );
}

function figureWithTitle(html, title) {
  const figure = elements(html, "figure").find((entry) =>
    entry.text.includes(title),
  );
  assert.ok(figure, `Missing exported demonstration: ${title}`);
  return figure;
}

function buttonWithName(html, name) {
  const button = elements(html, "button").find(
    (entry) =>
      (attribute(entry.attributes, "aria-label") || entry.text) === name,
  );
  assert.ok(button, `Missing native button: ${name}`);
  return button;
}

test("all five stories export readable chapters and native chapter navigation", () => {
  const storyTitles = new Set();
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    assert.match(html, /id="main-content"/);
    const headings = elements(html, "h1");
    assert.equal(headings.length, 1, `${story.slug}: provide one story title`);
    assert.ok(
      headings[0].text.length > 10,
      `${story.slug}: the story title must be readable`,
    );
    storyTitles.add(headings[0].text);
    assert.ok(
      textContent(html).includes(story.name),
      `${story.slug}: identify the research subject`,
    );

    const navigation = elements(html, "nav").find(
      (entry) => attribute(entry.attributes, "aria-label") === "Story chapters",
    );
    assert.ok(navigation, `${story.slug}: missing named chapter navigation`);
    const links = elements(navigation.body, "a");
    assert.deepEqual(
      links.map((link) => attribute(link.attributes, "href")),
      chapterIDs.map((id) => `#${id}`),
      `${story.slug}: chapter destinations must work before JavaScript runs`,
    );
    assert.ok(
      links.every((link) => link.text.length > 2),
      `${story.slug}: name each chapter link`,
    );

    const sections = chapters(html);
    assert.deepEqual(
      [...sections.keys()],
      chapterIDs,
      `${story.slug}: keep the complete reading order`,
    );
    for (const [id, section] of sections) {
      const heading = elements(section.body, "h2").find(
        (entry) => attribute(entry.attributes, "id") === `${id}-heading`,
      );
      assert.ok(
        heading?.text,
        `${story.slug}/${id}: missing readable chapter heading`,
      );
      const prose = elements(section.body, "p").map((entry) => entry.text);
      assert.ok(
        prose.some((paragraph) => paragraph.length >= 80),
        `${story.slug}/${id}: the chapter needs explanatory prose in the exported HTML`,
      );
    }
  }
  assert.equal(
    storyTitles.size,
    stories.length,
    "Each study needs its own narrative title",
  );
});

test("every story chapter links to an existing section of the complete research", () => {
  const homepage = builtRoute("");
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const research = builtRoute(`docs/${story.slug}`);
    const researchIDs = new Set(
      [...research.matchAll(/\bid="([^"]+)"/g)].map((match) =>
        decodeEntities(match[1]),
      ),
    );
    const researchURL = `${base}/docs/${story.slug}/`;
    const homepageEntry = elements(homepage, "article").find((entry) =>
      elements(entry.body, "a").some(
        (link) =>
          attribute(link.attributes, "href") ===
          `${base}/studies/${story.slug}/`,
      ),
    );
    assert.ok(homepageEntry, `${story.slug}: the library must offer the story`);
    assert.ok(
      elements(homepageEntry.body, "a").some(
        (link) =>
          attribute(link.attributes, "href") === researchURL &&
          link.text === "Read research",
      ),
      `${story.slug}: retain the named direct research link in its library entry`,
    );
    assert.ok(
      elements(html, "a").some(
        (link) => attribute(link.attributes, "href") === researchURL,
      ),
      `${story.slug}: provide a direct link to the full research`,
    );
    for (const [id, section] of chapters(html)) {
      const link = elements(section.body, "a").find(
        (entry) => entry.text === "Open the detailed research",
      );
      assert.ok(link, `${story.slug}/${id}: missing named evidence link`);
      const href = attribute(link.attributes, "href");
      assert.ok(
        href.startsWith(`${researchURL}#`),
        `${story.slug}/${id}: link to this study's research section`,
      );
      const fragment = decodeURIComponent(href.slice(researchURL.length + 1));
      assert.ok(
        researchIDs.has(fragment),
        `${story.slug}/${id}: missing research anchor ${fragment}`,
      );
    }
    const backLink = elements(research, "a").find((link) =>
      link.text.startsWith("Explore the story"),
    );
    assert.ok(backLink, `${story.slug}: research readers need a story link`);
    assert.equal(
      attribute(backLink.attributes, "href"),
      `${base}/studies/${story.slug}/`,
    );
  }
});

test("story illustrations export labelled native controls and a readable default state", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const type = figureWithTitle(html, "Type, in proportion.");
    const select = elements(type.body, "select")[0];
    assert.ok(select, `${story.slug}: type roles need a native select`);
    const selectID = attribute(select.attributes, "id");
    assert.ok(selectID, `${story.slug}: name the type-role select`);
    const label = elements(type.body, "label").find(
      (entry) => attribute(entry.attributes, "for") === selectID,
    );
    assert.ok(
      label?.text,
      `${story.slug}: associate a visible label with the type roles`,
    );
    assert.ok(
      elements(select.body, "option").length >= 2,
      `${story.slug}: preserve measured role choices`,
    );
    assert.match(
      type.text,
      /\d+(?:\.\d+)?px/,
      `${story.slug}: show a type measurement before interaction`,
    );
    for (const viewport of ["desktop", "mobile"]) {
      const button = buttonWithName(
        type.body,
        `${story.name} typography: ${viewport} measurements`,
      );
      assert.equal(
        attribute(button.attributes, "aria-pressed"),
        String(viewport === "desktop"),
      );
    }

    const motion = figureWithTitle(html, "A small interaction, explained.");
    assert.match(
      motion.text,
      /Original (?:abstract )?illustration/i,
      `${story.slug}: distinguish demonstration from evidence`,
    );
    for (const name of story.motion) buttonWithName(motion.body, name);
    assert.match(
      motion.body,
      /<svg\b/,
      `${story.slug}: the initial demonstration must render statically`,
    );
  }
});

test("story responsive chapters expose recorded captures and both full-size links without JavaScript", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const section = chapters(html).get("mobile");
    const figure = figureWithTitle(section.body, "The recorded view.");
    const links = elements(figure.body, "a");
    for (const viewport of ["desktop", "mobile"]) {
      const source = `${base}/research/five-websites/screenshots/${story.capture}-${viewport}.jpg`;
      const link = links.find(
        (entry) => attribute(entry.attributes, "href") === source && entry.text,
      );
      assert.ok(
        link?.text,
        `${story.slug}: preserve the ${viewport} capture as an ordinary named link`,
      );
      const button = buttonWithName(
        figure.body,
        `${story.name} screenshots: ${viewport} capture`,
      );
      assert.equal(
        attribute(button.attributes, "aria-pressed"),
        String(viewport === "desktop"),
      );
      if (viewport === "desktop") {
        const image = [...figure.body.matchAll(/<img\b([^>]*)>/gi)].find(
          (match) => attribute(match[1], "src") === source,
        );
        assert.ok(
          image,
          `${story.slug}: render the desktop evidence before JavaScript runs`,
        );
        assert.ok(
          attribute(image[1], "alt"),
          `${story.slug}: describe the recorded screenshot`,
        );
      }
    }
  }
});
