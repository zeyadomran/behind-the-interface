import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

const base = (process.env.VITE_BASE_PATH || "").replace(/\/+$/, "");
const chapterIDs = ["idea", "type", "motion", "mobile", "takeaways"];
const stories = [
  {
    slug: "noho",
    name: "Noho",
    capture: "noho",
    captureDirectory: "noho",
    motion: ["Dark surface for this page", "Calmer motion for this page"],
  },
  {
    slug: "ace",
    name: "Ace",
    capture: "ace",
    motion: [
      "Ace illustration: hover this card, or press to hold the hover",
      "Inner image",
      "Whole card",
      "More room",
    ],
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
    motion: ["Play the scroll"],
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
    motion: [
      "Lama Lama illustration: open Case 01",
      "Lama Lama illustration: open Case 02",
      "Lama Lama illustration: open Case 03",
    ],
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
  const file = resolve("dist", route, "index.html");
  assert.ok(
    existsSync(file),
    `Run yarn build before these tests: missing ${file}`,
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

test("all stories export readable chapters and native chapter navigation", () => {
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
    // Both pages offer the same Story / Research switch, marking where you are.
    for (const [page, current] of [
      [research, "Research"],
      [html, "Story"],
    ]) {
      const modes = elements(page, "nav").find((entry) =>
        attribute(entry.attributes, "aria-label").endsWith("reading mode"),
      );
      assert.ok(modes, `${story.slug}: missing the Story / Research switch`);
      const links = elements(modes.body, "a");
      assert.deepEqual(
        links.map((link) => [link.text, attribute(link.attributes, "href")]),
        [
          ["Story", `${base}/studies/${story.slug}/`],
          ["Research", researchURL],
        ],
        `${story.slug}: the switch must link both reading modes`,
      );
      for (const link of links)
        assert.equal(
          attribute(link.attributes, "aria-current"),
          link.text === current ? "page" : "",
          `${story.slug}: mark only the current reading mode`,
        );
    }
  }
});

test("idea chapters annotate the recorded capture with readable, evidence-labelled notes", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const figure = figureWithTitle(
      chapters(html).get("idea").body,
      "Look where I looked.",
    );
    const source = `${base}/research/${story.captureDirectory ?? "five-websites"}/screenshots/${story.capture}-desktop.jpg`;
    const image = [...figure.body.matchAll(/<img\b([^>]*)>/gi)].find(
      (match) => attribute(match[1], "src") === source,
    );
    assert.ok(image, `${story.slug}: annotate the recorded desktop capture`);
    assert.ok(
      attribute(image[1], "alt"),
      `${story.slug}: describe the capture`,
    );

    // Every note is printed; pins only point at it.
    const notes = elements(figure.body, "li");
    assert.ok(notes.length >= 3, `${story.slug}: provide several notes`);
    const ids = new Set(
      [...figure.body.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
    );
    const pins = elements(figure.body, "button").filter((button) =>
      attribute(button.attributes, "aria-label").startsWith("Note "),
    );
    assert.equal(pins.length, notes.length, `${story.slug}: one pin per note`);
    for (const pin of pins)
      assert.ok(
        ids.has(attribute(pin.attributes, "aria-describedby")),
        `${story.slug}: each pin must describe itself with its note`,
      );
    for (const note of notes)
      assert.match(
        note.text,
        /Observed|Source-confirmed|Hook only|Interpretation/,
        `${story.slug}: label the evidence behind every note`,
      );
  }
});

test("type chapters draw every measured role at its recorded size", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const type = figureWithTitle(html, "Type, at recorded size.");
    const roles = elements(type.body, "li");
    assert.ok(roles.length >= 2, `${story.slug}: show every measured role`);
    for (const role of roles) {
      assert.match(
        role.text,
        /\d+(?:\.\d+)?px \/ (?:\d+(?:\.\d+)?px|normal)|Not displayed/,
        `${story.slug}: show size / line height before interaction`,
      );
      assert.match(
        role.body,
        /--size:\s*\d+(?:\.\d+)?px/,
        `${story.slug}: set each specimen at its recorded desktop size`,
      );
    }
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
    assert.match(type.text, /not the source typeface/);
  }
});

test("motion demonstrations export labelled native controls and name their evidence", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const motion = figureWithTitle(html, "A small interaction, explained.");
    assert.match(
      motion.text,
      /Original (?:abstract )?illustration/i,
      `${story.slug}: distinguish demonstration from evidence`,
    );
    for (const name of story.motion) buttonWithName(motion.body, name);
    assert.match(
      motion.text,
      /What the research recorded: .+(?:Observed|Source-confirmed|Hook only)/,
      `${story.slug}: pair the demonstration with its recorded finding`,
    );
  }
  const noho = figureWithTitle(
    builtRoute("studies/noho"),
    "A small interaction, explained.",
  );
  for (const name of stories[0].motion) {
    const control = buttonWithName(noho.body, name);
    assert.equal(attribute(control.attributes, "role"), "switch");
    assert.equal(attribute(control.attributes, "aria-checked"), "false");
  }
  assert.match(noho.text, /estimate nothing about energy/);
  const neue = figureWithTitle(
    builtRoute("studies/neue-montreal"),
    "A small interaction, explained.",
  );
  assert.match(
    neue.body,
    /<input\b[^>]*type="range"[^>]*aria-valuetext="0%: Display weight 900, Text weight 200"/,
    "Neue Montréal: the scrubber starts at the recorded mapping endpoints",
  );
});

test("story responsive chapters show both recorded captures and full-size links without JavaScript", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const section = chapters(html).get("mobile");
    const figure = figureWithTitle(section.body, "The recorded view.");
    const links = elements(figure.body, "a");
    for (const viewport of ["desktop", "mobile"]) {
      const source = `${base}/research/${story.captureDirectory ?? "five-websites"}/screenshots/${story.capture}-${viewport}.jpg`;
      const link = links.find(
        (entry) => attribute(entry.attributes, "href") === source && entry.text,
      );
      assert.ok(
        link?.text,
        `${story.slug}: preserve the ${viewport} capture as an ordinary named link`,
      );
      const image = [...figure.body.matchAll(/<img\b([^>]*)>/gi)].find(
        (match) => attribute(match[1], "src") === source,
      );
      assert.ok(
        image,
        `${story.slug}: render the ${viewport} evidence before JavaScript runs`,
      );
      assert.ok(
        attribute(image[1], "alt"),
        `${story.slug}: describe the recorded screenshot`,
      );
    }
    for (const label of ["Navigation", "Composition", "Watch for"])
      assert.ok(
        elements(figure.body, "dt").some((term) => term.text === label),
        `${story.slug}: explain what changed (${label})`,
      );
  }
});

test("takeaways and chapter lessons can be pocketed, and each chapter offers a cross-study comparison", () => {
  for (const story of stories) {
    const html = builtRoute(`studies/${story.slug}`);
    const takeaways = figureWithTitle(html, "Pocket the lessons.");
    const pockets = elements(takeaways.body, "button").filter(
      (button) => attribute(button.attributes, "aria-pressed") === "false",
    );
    assert.equal(
      pockets.length,
      2 + chapterIDs.length,
      `${story.slug}: keep, question and five lessons need pocket buttons`,
    );
    for (const [id, section] of chapters(html)) {
      const compare = elements(section.body, "a").find((link) =>
        link.text.startsWith("Compare "),
      );
      // Under a base path, the router writes the root route as /base?lens=…
      assert.equal(
        attribute(compare?.attributes ?? "", "href").replace(/(.)\/\?/, "$1?"),
        `${base || "/"}?lens=${id}#studies`,
        `${story.slug}/${id}: link the chapter to its comparison lens`,
      );
    }
  }
});
