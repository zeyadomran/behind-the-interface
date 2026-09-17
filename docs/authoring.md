# Authoring research

Interesting Designs is generated from the files in [`content/docs`](../content/docs/). Write and maintain each finding once in Markdown or MDX. Fumadocs supplies the page tree and article structure; Next.js generates the HTML during the build.

## Create a study

From the repository root:

```sh
pnpm new:study interface-study "An interface study"
```

The command creates a single `content/docs/interface-study.md` file, with today's date and `draft: true`. Use a short lowercase slug with hyphens. Choose a title that describes the website or research subject. An existing Markdown file, MDX file, or folder with the same slug prevents creation, so a new study cannot overwrite a document or compete for its route.

The generated page is intentionally a draft. Draft pages are excluded from the generated routes, sidebar, homepage index, and search, in development and production. Review the source until ready to make it visible, then set `draft: false` or remove that field.

For a fuller outline, adapt [`templates/research-entry.md`](../templates/research-entry.md). Replace its placeholders and date before placing it in the content collection.

## Frontmatter

```yaml
---
title: "An interface study"
description: "The design question this study examines."
date: "2026-09-16"
kind: "study"
draft: true
tags: ["Typography", "Interaction"]
sites: ["https://example.com/"]
cover: "/research/interface-study/screenshots/cover.jpg"
---
```

The values above illustrate the format; use the actual research date, sites, and existing assets for a real study.

| Field         | Use                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | Page heading and navigation label. Do not repeat it as an h1 in the body.                                                         |
| `description` | Short explanation used in the article heading and study index.                                                                    |
| `kind`        | `study` for a website document, `report` for shared research findings, or `guide` for general documentation. Defaults to `guide`. |
| `date`        | Required for studies and reports, in quoted `YYYY-MM-DD` form. Optional for guides.                                               |
| `draft`       | `true` hides the page from the published content collection. Defaults to `false`.                                                 |
| `tags`        | An array of topic strings. Study tags supply the homepage filters.                                                                |
| `sites`       | An array of valid website URL strings. Identify the website examined, or all subjects in the shared findings.                     |
| `cover`       | Optional image path beginning with `/research/`, without a deployment prefix.                                                     |

The schema is defined in [`source.config.ts`](../source.config.ts). The homepage selects published pages with `kind: study`, ordered by date from newest to oldest, then by title. No manual homepage entry is needed.

## Organize website documents and shared findings

Keep one document per website directly in `content/docs/`, with `kind: study`. Collect its findings, typography, interactions, source evidence, and applicable route details in that document. Keep the cross-site conclusions and comparisons in the single `research-findings.md` document with `kind: report`, linking to the website documents for their full analysis.

The library currently contains six peer research articles: [Ace](../content/docs/ace.md), [Arkon Digital](../content/docs/arkon-digital.md), [Neue Montréal](../content/docs/neue-montreal.md), [MONOLOG](../content/docs/monolog.md), [Lama Lama](../content/docs/lama-lama.md), and [Research findings](../content/docs/research-findings.md). Each website is a separate homepage study entry. The shared findings document combines the collection overview, typography comparison, source-audit guidance, and route-inventory summary.

New website documents join these files as peers:

```text
content/docs/
├── index.md
├── methodology.md
├── research-findings.md
├── ace.md
├── arkon-digital.md
├── neue-montreal.md
├── monolog.md
├── lama-lama.md
├── interface-study.md
└── meta.json
```

Give each research document its own title, description, date, and appropriate `kind`. Identify each website's URL in its `sites` field; the shared findings can list all of its subjects. `index.md` and `methodology.md` remain general guides. Markdown works for normal prose, tables, links, and images. Use `.mdx` when a document needs supported React components or richer composition.

Sidebar ordering lives in the root [`content/docs/meta.json`](../content/docs/meta.json):

```json
{
  "pages": [
    "index",
    "research-findings",
    "ace",
    "arkon-digital",
    "neue-montreal",
    "monolog",
    "lama-lama",
    "methodology",
    "..."
  ]
}
```

Use filenames without extensions. The `...` placeholder includes new documents automatically, so the study command needs no folder or extra metadata file. Use explicit filenames when a particular article order matters.

## Link to pages and evidence

Site content uses route links:

```md
[Research findings](/docs/research-findings/)
[Ace](/docs/ace/)
[An interface study](/docs/interface-study/)
[Methods](/docs/methodology/)
```

The root `index.md` maps to `/docs/`. Each other file maps to `/docs/<filename>/` without the extension. Use trailing slashes for page routes. Keep section headings distinct so their generated anchors remain understandable.

Put screenshots and data in `public/research/<study-slug>/`, then reference them without the `public` prefix:

```md
![The navigation open at a 390px viewport](/research/interface-study/screenshots/navigation-mobile.jpg)

[Computed-style samples](/research/interface-study/measurements.json)
```

Use descriptive image alternatives. Record the source site, observation date, and viewport in the surrounding prose where relevant. The article renderer displays the image alternative as its caption and links to the full image.

The existing research assets remain in `public/research/five-websites/`; their evidence paths do not change when articles move. New website studies can use their own asset directory as shown above.

The root README and files in `docs/` are repository documentation. Use relative file links there so they resolve in GitHub. For example, the README links to `content/docs/ace.md`; article content links to `/docs/ace/`.

## Reuse an article visual

Add an optional visual to a page's frontmatter:

```yaml
visual: "ace"
visualView: "type"
```

`visual` accepts `ace`, `arkon-digital`, `neue-montreal`, `monolog`, `lama-lama`, or `collection`. A website key fixes the subject; `collection` adds a website selector. `visualView` chooses the opening view: `screens`, `type`, or `interactions`, defaulting to `screens`. The reusable [article explorer](../components/article-explorer.tsx) appears above the article body; the full research stays below it.

The [visual data registry](../lib/article-visual-data.ts) holds screenshot paths, exact measured type roles, and interaction findings with their evidence categories. These visuals describe the dated September 15–16, 2026 research. They are not live website previews or simulations proving an interaction works today. Type bars compare computed CSS values using a shared scale; they do not reproduce the source websites' typefaces.

The same `visual` key selects an original typographic wordprint on the homepage. A page without that key receives a composition based on its title initials. These interactive teasers are interpretations of the research; the original screenshots stay in the articles. To introduce a distinct wordprint, extend [`components/study-wordprint.tsx`](../components/study-wordprint.tsx) and the [SVG artwork](../components/wordprint-art.tsx). A homepage wordprint does not require a `cover` image.

To add a new subject, record its evidence in the article first, then add its key and data to the registry and the allowed `visual` values in [the content schema](../source.config.ts). Update the visual's research-date label for the new study and extend [the regression tests](../tests/article-visuals.test.mjs) to its source article and assets. Keep `normal` line heights and absent mobile elements explicit instead of inventing numerical equivalents. Preserve the distinction between observed behavior, source confirmation, and unconfirmed hooks. Run the build and tests after updating an article's measurements so its visual data cannot silently drift.

## Preserve evidence boundaries

Use the [methodology](../content/docs/methodology.md) as the evidence vocabulary:

- **Observed:** the page, state, or named action was inspected live.
- **Source-confirmed:** public source supports the specific configuration or implementation.
- **Hook only:** markup suggests behavior whose custom implementation or outcome remains unconfirmed.
- **Interpretation:** a design assessment, separate from measured outcomes.

Name the tested viewports and inputs. Distinguish responsive browser inspection from physical devices, loaded libraries from active features, and website claims from independently verified results. Give follow-up observations their own dates. Screenshots and measurements support a dated finding; they do not establish how a live website behaves today.

## Review a change

Before marking a study ready, replace placeholders, check sources and asset paths, and preserve the scope and unresolved questions. Then run:

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm preview
```

The Node test suite checks the study-creation workflow and static-build, link, and asset invariants. Build before running it. Inspect the study in a browser at desktop and narrow widths, including tables, images, navigation, search results, and heading anchors. A passing automated check is not a substitute for reviewing the research itself.

## Static builds and base paths

`pnpm build` exports the website to `out/`; `pnpm preview` serves that output locally. The archive, templates, and repository guidance are not active research routes.

For a root-domain deployment, leave `NEXT_PUBLIC_BASE_PATH` unset. For a project deployment under `/ui-ux-research`, use the same value at build and preview time.

PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/ui-ux-research'
pnpm build
pnpm preview
```

POSIX shell:

```sh
NEXT_PUBLIC_BASE_PATH=/ui-ux-research pnpm build
NEXT_PUBLIC_BASE_PATH=/ui-ux-research pnpm preview
```

Changing the base path requires a rebuild. To return to a root build in PowerShell, remove the session variable with `Remove-Item Env:NEXT_PUBLIC_BASE_PATH`, then rebuild.

Keep article links and asset paths unprefixed in source. Next.js `Link` adds the configured base path to application routes. [`withBasePath`](../lib/paths.ts) prefixes raw asset and fetch URLs, including Markdown images and measurement downloads. Adding `/ui-ux-research` by hand in frontmatter or Markdown would duplicate it.

The static host must serve the directory-index routes and all files emitted in `out/`. No host or deployment URL is assumed here.

## Original reports and fonts

The original September 2026 bundle is preserved in [`archive/2026-09-five-websites`](../archive/2026-09-five-websites/README.md). It is not deployed or kept synchronized with new edits. Maintain the active Markdown pages rather than updating both Markdown and archived HTML.

The four supplied font files live in [`assets/fonts`](../assets/fonts/) alongside their [original EULA](../assets/fonts/EULA-PangramPangram-FreeForPersonalUse-MAY2021.pdf). Keep those terms with the files. Font use is configured in [`app/layout.tsx`](../app/layout.tsx); typography and color roles are documented in the [design direction](design-direction.md).
