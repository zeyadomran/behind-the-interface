# Behind the Interface design direction

Behind the Interface is Zeyad Omran's UI/UX research library. Its shared visual language follows his portfolio: cool paper, deep green ink, generous type, fine rules, and the layered Z identity. Five immersive study stories give the source websites distinct editorial treatments; the documentation layout gives their complete reports a stable reading structure.

## Framework and content

Fumadocs is the selected framework after considering OpenDocs. It supplies the documentation content pipeline, navigation, search, and table of contents. The custom library and shared theme provide the editorial presentation. Tailwind CSS is the styling foundation, with project-specific tokens and component rules in [`app/globals.css`](../app/globals.css).

Research lives in Markdown or MDX with validated metadata. Each website has a standalone `study` document; a shared `report` brings together comparisons and findings. Published studies and reports appear as independent library entries and peer documentation pages. The optional [`story registry`](../lib/study-stories.ts) adds a guided presentation that links back to the full evidence. New studies appear automatically and keep their direct documentation destination until a story is registered.

## Color roles

| Role   | Value     | Use                              |
| ------ | --------- | -------------------------------- |
| Paper  | `#f1f3ef` | Main background                  |
| Ink    | `#183d2b` | Headings, identity, strong text  |
| Body   | `#263d30` | Long-form reading                |
| Muted  | `#607065` | Metadata and supporting text     |
| Line   | `#cbd2c9` | Fine separators and borders      |
| Green  | `#24563c` | Primary interaction and emphasis |
| Blue   | `#345be4` | Secondary link emphasis          |
| Purple | `#7060b7` | Available secondary accent       |
| Orange | `#ba512f` | Available secondary accent       |

Fumadocs surfaces use related pale green tones so the sidebar, selected navigation, popovers, and article remain part of the same system. The library and documentation stay light; story colors follow each study's visual treatment.

## Typography

The project loads four supplied PP Neue Montreal files through `next/font/local`:

| Face                              | Weight | Role                                           |
| --------------------------------- | ------ | ---------------------------------------------- |
| PP Neue Montreal Regular          | 400    | Display headings, navigation, interface labels |
| PP Neue Montreal Semibold         | 600    | Strong emphasis and table headings             |
| PP Neue Montreal Text Book        | 375    | Long-form prose and explanatory copy           |
| PP Neue Montreal Text Book Italic | 375    | Reading-text emphasis                          |

Display headings are mostly regular with tight tracking. The library hero uses a large fluid scale; article titles are quieter at roughly 36–60px. Article prose uses 17px type, 1.7 line height, and paragraphs capped at 70 characters. Small uppercase labels identify sections and metadata without competing with the findings.

Font files and their original EULA are retained in [`assets/fonts`](../assets/fonts/). This is a supplied typeface, not an open-source font dependency.

## Composition

The library uses numbered, rule-separated entries with a title, research date, article type, topic labels, and an interactive typographic wordprint. Registered study titles open their stories; **Read research** links open the complete articles directly. Research findings and future studies without a story retain direct documentation title links. Filters are derived from research metadata. Empty search results give a clear reset action.

Articles use the Fumadocs navigation on the left, a constrained reading column, and an optional table of contents on the right. Fine rules mark major sections. Wide evidence tables scroll within their container; screenshots retain their proportions and open at full size. The outer documentation layout has room for those supporting rails without stretching paragraph measure.

The layered Z mark comes from the current portfolio identity. Use the SVG mark in [`components/brand.tsx`](../components/brand.tsx) and [`public/icon.svg`](../public/icon.svg) to keep geometry consistent. The website name is **Behind the Interface**; the repository describes its subject as **UI/UX Research**.

## Homepage wordprints

Each of the six articles has an original SVG composition that turns a research theme into a typographic teaser. Ace draws on technical and ASCII precision; Arkon arranges type as a spatial scene; Neue Montréal becomes a type specimen; MONOLOG shifts editorial emphasis; Lama Lama uses a pixel identity. Research findings brings **TYPE / SPACE / MOTION / INTENT** into alignment as an interpretation of the collection's shared lessons. Paper, a green frame, and PP Neue Montreal connect all six to the library.

These are interpretive artworks. The original website screenshots remain inside the documentation as evidence; the wordprints do not reproduce the source sites or demonstrate their actual behavior. The existing `visual` frontmatter key selects a composition, with a generic fallback for future entries.

Each wordprint is a native button: click, tap, Enter, or Space toggles an alternate composition. Fine-pointer parallax is optional; reduced motion uses instant state changes and disables pointer tracking. Use no infinite animation or additional animation dependencies. Titles and summaries remain visible, so reading never depends on exploring the artwork.

## Study stories

Each `/studies/<slug>/` page follows five chapters: idea, typography, motion, mobile, and takeaways. The chapter navigation uses native fragment links with visible active and reading-progress feedback. Each chapter offers a direct link to the relevant heading in the complete research. The article heading links back with **Explore the story**.

The shared sequence supports distinct visual voices: Ace uses technical precision, Arkon explores space and depth, Neue Montréal foregrounds the type specimen, MONOLOG emphasizes editorial storytelling, and Lama Lama uses playful identity. Preserve the source distinction through composition, color, scale, and interaction while retaining the library identity and clear reading hierarchy.

Typography and motion playgrounds are original explanatory illustrations. Type readouts retain the recorded measurements, while sample letterforms use the supplied PP Neue Montreal family. Motion controls explain a design principle without reproducing the source implementation or establishing its outcomes. The responsive comparison uses actual dated desktop and mobile research captures. Keep those evidence images and their captions visibly distinct from illustrative artwork.

Parallax and interactive states add depth to the story without gating its content. Text, all five chapter destinations, and research links are present in exported HTML. Native controls have clear labels and focus states; reduced motion removes nonessential movement. Avoid scroll hijacking, timed reading, or hiding conclusions behind a demonstration.

## Interaction and responsive behavior

The library and documentation use restrained hover and link feedback. Stories add optional parallax and purposeful type and motion demonstrations. Long-form reading does not depend on parallax or timed reveals. Respect reduced-motion preferences when extending the interface.

Article explorers use the same paper surfaces, green ink, fine rules, and square controls. Readers can switch between recorded desktop/mobile screenshots, compare measured type sizes on a shared scale, and inspect trigger/response findings. Evidence labels distinguish observations from source-supported and hook-only claims. The visualizations supplement the complete article; they do not recreate live websites or simulate untested behavior.

Library and documentation focus uses one 2px green outline with a small gap. Story focus indicators must contrast with their surrounding theme. Inputs with icons receive a single frame around the whole field. Search and scrolling navigation use inset indicators to avoid clipping. Selected state and keyboard focus remain distinct, and native selectors keep their ordinary keyboard behavior.

At narrow widths, study entries stack, the library filter expands, documentation navigation moves into its mobile presentation, and story chapters and controls fit the reading column. Keep chapter links usable without obscuring their destinations. Maintain clear focus indicators, accessible labels, a skip link, readable figure captions, and explicit selected filter states. Use SVG icons so symbols keep their intended appearance across platforms.

## Carry the system forward

Give each new study a useful title, concise description, meaningful topic tags, and evidence that earns its place in the page. Use screenshots to substantiate findings and keep decorative media separate from research evidence. Reuse the existing type, spacing, and color roles before introducing a new visual convention.

Keep the library's open spacing and regular-weight headings, while giving dense reports enough reading room. Every future addition should remain understandable with motion reduced and on a narrow screen.
