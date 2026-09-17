# Interesting Designs · UI/UX Research

A growing research library by **Zeyad Omran**, exploring the decisions behind digital experiences: typography, layout, motion, navigation, and the details that make an interface easier to use.

Built with **Fumadocs, Next.js, and Tailwind CSS**, with PP Neue Montreal typography and an editorial theme drawn from [my portfolio](https://zeyadomran.com).

[Read the research findings](content/docs/research-findings.md) · [Research methodology](content/docs/methodology.md) · [Add a study](docs/authoring.md) · [Design direction](docs/design-direction.md)

## Inside the library

The library examines **Ace, Arkon Digital, Neue Montréal, MONOLOG, and Lama Lama** in six peer research articles: one document per website and one shared **Research findings** document. The evidence includes 21 screenshots, computed typography samples, and an inventory of 65 additional public route requests.

Start with [Research findings](content/docs/research-findings.md), or go directly to a website:

| Website                                        | Focus                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [Ace](content/docs/ace.md)                     | Technical editorial identity, typography, and mobile navigation  |
| [Arkon Digital](content/docs/arkon-digital.md) | A shared 3D scene, interaction, and text legibility              |
| [Neue Montréal](content/docs/neue-montreal.md) | Type specimens, editorial hierarchy, and product-led interaction |
| [MONOLOG](content/docs/monolog.md)             | Studio storytelling, work presentation, and contextual previews  |
| [Lama Lama](content/docs/lama-lama.md)         | Brand behavior, portfolio exploration, and secondary interfaces  |

Each website document brings its findings, typography observations, and source evidence together, with route details where applicable. [Research findings](content/docs/research-findings.md) brings together the cross-site conclusions, typography comparison, source-audit guidance, and route-inventory summary.

The website adds a filterable study index, full-text search, documentation navigation, and an article table of contents. The six homepage entries use original interactive SVG wordprints as typographic teasers, with direct title links to the articles. Click, tap, Enter, or Space changes each composition; reduced motion switches states instantly without pointer tracking. The shared paper, green frame, and PP Neue Montreal keep the artwork within the library's visual system. See the [wordprint direction](docs/design-direction.md#homepage-wordprints).

Original source screenshots remain inside the articles as evidence. Interactive studies let readers switch screenshot viewports, compare measured typography, and explore interaction evidence. Research is written in Markdown or MDX; the site generates the HTML. New studies appear from their metadata without editing a central list, and the existing `visual` key selects a wordprint with a generic fallback for future entries.

## Run locally

Use **Node.js 22 or later** and **pnpm 11.19.0**, as specified in [package.json](package.json).

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://127.0.0.1:3000). To inspect the static production build:

```sh
pnpm build
pnpm preview
```

The generated website is in `out/`. The preview server serves that folder on port 3000; it does not publish it.

## Add research

```sh
pnpm new:study interface-study "An interface study"
```

This creates one dated draft at `content/docs/interface-study.md`. Add the website's findings and supporting assets, then remove `draft: true` or set it to `false` when ready. The root sidebar metadata includes new documents automatically. Drafts are excluded from pages, navigation, the library, and search, including in development.

See the [authoring guide](docs/authoring.md) for frontmatter, website documents, shared findings, links, images, and publication checks. The [research template](templates/research-entry.md) provides a fuller structure for recording evidence and limitations.

## Validate changes

```sh
pnpm typecheck
pnpm build
pnpm test
```

The Node test suite checks the study-creation workflow and static-build, link, and asset invariants. Build first. Review the resulting pages in a browser for responsive layout, typography, navigation, and interaction changes.

## Static hosting

Deploy the contents of `out/` to a static host. For a project URL under `/ui-ux-research`, set the same base path when building and previewing. In PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/ui-ux-research'
pnpm build
pnpm preview
```

Then preview [localhost:3000/ui-ux-research/](http://127.0.0.1:3000/ui-ux-research/). A root-domain deployment uses no base path. The [authoring guide](docs/authoring.md#static-builds-and-base-paths) explains how links and assets resolve. No deployment destination is configured by this repository.

Vercel Web Analytics is included. For a Vercel deployment, enable Web Analytics in the project's **Analytics** dashboard before the next deployment; visitor data is collected after deployment. See the [Vercel Web Analytics quickstart](https://vercel.com/docs/analytics/quickstart).

## Project map

```text
content/docs/       Research pages and sidebar metadata
public/research/    Screenshots and measurement data served by the site
assets/fonts/      Four supplied font files and their original EULA
app/               Next.js pages, layouts, and Tailwind theme
components/        Library, navigation, and article presentation
lib/               Content loading and base-path helpers
scripts/           Study creation and local static preview
templates/         Research entry template
docs/              Authoring and design guidance
archive/           Preserved original research bundle; not deployed
```

## Evidence and attribution

Reports distinguish **observed**, **source-confirmed**, **hook-only**, and **interpretive** findings. Each study records its scope and date. Responsive browser inspection is not physical-device testing, and route response checks are not complete interaction audits. Live websites may have changed since the recorded sessions.

The homepage wordprints are original interpretations of the research, not evidence captures or replicas of the reviewed websites. The article text remains the complete reading path.

The [original research bundle](archive/2026-09-five-websites/README.md) remains available as a historical snapshot. Edit the active Markdown pages for future updates; archived HTML editions are not maintained in parallel.

Website designs, names, imagery, and content shown in research captures belong to their respective owners. Sources are credited within the reports; no affiliation or endorsement is implied. The four supplied PP Neue Montreal font files retain their [original Pangram Pangram EULA](assets/fonts/EULA-PangramPangram-FreeForPersonalUse-MAY2021.pdf). They are not covered by an open-source font license. No general reuse license has been specified for the original written analysis or this repository.
