# Behind the Interface · UI/UX Research

A growing research library by **Zeyad Omran**, exploring the decisions behind digital experiences: typography, layout, motion, navigation, and the details that make an interface easier to use.

Built with **React, Vite, Fumadocs, and Tailwind CSS**, using **Yarn Classic 1.22.22**. PP Neue Montreal typography and an editorial theme connect it to [my portfolio](https://zeyadomran.com).

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

The website adds a filterable study index, full-text search, documentation navigation, and an article table of contents. The five website titles open immersive stories at `/studies/<slug>/`; **Read research** links open their complete `/docs/<slug>/` articles directly. Research findings remains a documentation page. Each story follows five linked chapters: idea, typography, motion, mobile, and takeaways, with a distinct visual treatment, optional parallax, and original interactive demonstrations. Every chapter links to the supporting section of its research article.

The six homepage entries retain their original interactive SVG wordprints as typographic teasers. Click, tap, Enter, or Space changes each composition; reduced motion switches states instantly without pointer tracking. The shared paper, green frame, and PP Neue Montreal keep the artwork within the library's visual system. See the [wordprint direction](docs/design-direction.md#homepage-wordprints).

Original source screenshots remain inside the articles as evidence and appear in the stories' responsive comparisons. Article explorers let readers switch screenshot viewports, compare measured typography, and explore interaction evidence. Full research is written in Markdown or MDX; the site generates the HTML. New studies appear from their metadata without editing a central list and open their documentation directly until an optional story is added to [`lib/study-stories.ts`](lib/study-stories.ts). The existing `visual` key selects a wordprint with a generic fallback for future entries.

## Run locally

Use **Node.js 22.12 or later** and **Yarn Classic 1.22.22**, as specified in [package.json](package.json). Keep `yarn.lock` in version control and use `yarn install --frozen-lockfile` in CI.

```sh
yarn install
yarn dev
```

Open [localhost:3000](http://127.0.0.1:3000). To inspect the static production build:

```sh
yarn build
yarn preview
```

Vite builds the browser assets and a server-rendering bundle; the prerender step writes readable HTML for every published route to `dist/`. The preview server serves that folder on port 3000, including the generated 404 page for missing routes. It does not publish the site.

## Add research

```sh
yarn new:study interface-study "An interface study"
```

This creates one dated draft at `content/docs/interface-study.md`. Add the website's findings and supporting assets, then remove `draft: true` or set it to `false` when ready. The root sidebar metadata includes new documents automatically. Drafts are excluded from pages, navigation, the library, and search, including in development.

After adding or removing a content file, or changing its `draft` status, stop and restart `yarn dev` so the published-content allowlist refreshes. `yarn build` regenerates that list automatically.

See the [authoring guide](docs/authoring.md) for frontmatter, website documents, shared findings, links, images, and publication checks. The [research template](templates/research-entry.md) provides a fuller structure for recording evidence and limitations.

## Validate changes

```sh
yarn typecheck
yarn build
yarn test
```

The Node test suite checks the study-creation workflow, readable story exports, chapter and research links, and static-build asset invariants. Build first. Review the resulting pages in a browser for responsive layout, keyboard navigation, reduced motion, and interaction changes.

GitHub Actions runs the build, typechecking, and tests on pull requests and pushes to `main`, with dependency review and CodeQL security checks. See [GitHub automation and proposed repository protections](docs/github-security.md) for the checks, maintenance schedule, and branch-rule rollout.

## Static hosting

Deploy the contents of `dist/` to a static host. For a project URL under `/behind-the-interface`, set the same base path when building and previewing. In PowerShell:

```powershell
$env:VITE_BASE_PATH = '/behind-the-interface'
yarn build
yarn preview
```

Then preview [localhost:3000/behind-the-interface/](http://127.0.0.1:3000/behind-the-interface/). A root-domain deployment uses no base path. The [authoring guide](docs/authoring.md#static-builds-and-base-paths) explains how links and assets resolve.

The checked-in `vercel.json` selects Vite, installs with the bundled Yarn 1.22.22 and frozen lockfile, and publishes `dist/`. The `.prerender/` server bundle is only a build tool and is never published. Existing `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` deployment values remain supported as fallbacks; prefer the `VITE_*` names for new configuration.

The default public origin is `https://design.zeyadomran.com`, configured in [`vite.config.ts`](vite.config.ts). To use another domain, set `VITE_SITE_URL` before building; it accepts an HTTP(S) origin without a path. Keep any subdirectory in `VITE_BASE_PATH`. See [`.env.example`](.env.example). The existing production domain remains `design.zeyadomran.com`; these repository changes take effect on the next deployment.

## Search and sharing

Published pages include descriptive titles, descriptions, canonical URLs, Open Graph and Twitter metadata, and JSON-LD. The generated `sitemap.xml` includes published pages and stories; a draft's story is excluded alongside its research document. `robots.txt` excludes API and 404 routes. Vercel preview builds (`VERCEL_ENV=preview`) use `noindex` and disallow crawling.

[`/llms.txt`](https://design.zeyadomran.com/llms.txt) gives agents a reading path through the methodology, findings, individual research articles, and interactive stories, with guidance on evidence, dates, citations, and original website credits. It follows the [llms.txt proposal](https://llmstxt.org/) and links to the site's readable HTML pages. The route regenerates from published content during every build, uses the configured public origin and base path, and excludes drafts. Add or publish research normally; no separate agent index needs updating. `robots.txt` remains the source of crawling directives.

The shared social image is [`public/og/behind-the-interface.png`](public/og/behind-the-interface.png). Run `yarn generate:og` to regenerate it from the local font files. After connecting the production domain and deploying, verify the canonical URLs and sitemap; the sitemap can then be submitted to your search console. These settings make the site easier to discover and share but do not guarantee search rankings.

Vercel Web Analytics is included. For a Vercel deployment, enable Web Analytics in the project's **Analytics** dashboard before the next deployment; visitor data is collected after deployment. See the [Vercel Web Analytics quickstart](https://vercel.com/docs/analytics/quickstart).

Vercel Speed Insights is also included in the application shell. After deploying to Vercel and receiving visits, view performance metrics in the project's **Speed Insights** dashboard. See the [Vercel Speed Insights quickstart](https://vercel.com/docs/speed-insights/quickstart).

## Project map

```text
content/docs/       Research pages and sidebar metadata
public/research/    Screenshots and measurement data served by the site
assets/fonts/      Four supplied font files and their original EULA
src/               Vite entry points, routing, and metadata rendering
app/               React application shell and Tailwind styles
components/        Library, stories, navigation, and article presentation
lib/               Content loading, story registry, and base-path helpers
scripts/           Prerendering, study creation, and local static preview
templates/         Research entry template
docs/              Authoring and design guidance
archive/           Preserved original research bundle; not deployed
```

## Evidence and attribution

Reports distinguish **observed**, **source-confirmed**, **hook-only**, and **interpretive** findings. Each study records its scope and date. Responsive browser inspection is not physical-device testing, and route response checks are not complete interaction audits. Live websites may have changed since the recorded sessions.

The homepage wordprints and story demonstrations are original interpretations of the research, not evidence captures or replicas of the reviewed websites. Story typography uses the library's supplied fonts rather than reproducing each source typeface. Recorded screenshots are identified separately. Story text, native chapter links, and links to the complete research remain available without JavaScript; motion and interactive controls enhance that reading path.

The [original research bundle](archive/2026-09-five-websites/README.md) remains available as a historical snapshot. Edit the active Markdown pages for future updates; archived HTML editions are not maintained in parallel.

Website designs, names, imagery, and content shown in research captures belong to their respective owners. Source credits near the start of every story and documentation page link to the websites examined. A document's `sites` frontmatter supplies these links; [`lib/research-sites.ts`](lib/research-sites.ts) supplies known display names, with a hostname fallback for new HTTP(S) sources. No affiliation or endorsement is implied.

The four supplied PP Neue Montreal font files retain their [original Pangram Pangram EULA](assets/fonts/EULA-PangramPangram-FreeForPersonalUse-MAY2021.pdf). They are not covered by an open-source font license. No general reuse license has been specified for the original written analysis or this repository.
