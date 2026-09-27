# Behind the Interface design direction

Behind the Interface is Zeyad Omran's UI/UX research library. Its shared visual language follows his portfolio: cool paper, deep green ink, generous type, fine rules, and the layered Z identity. Six immersive study stories give the source websites distinct editorial treatments; the documentation layout gives their complete reports a stable reading structure.

## Proposition

**Six websites, taken apart.** The library shows what distinctive websites do, how they do it, and what is worth borrowing, with the evidence for each claim. It should persuade a product team that the author looks at interfaces with a precise, evidence-minded eye, and it should demonstrate that eye through its own interface.

The site therefore adopts the research's methods as its interaction language. Findings arrive one at a time with their evidence labels. Measurements are shown at the size they were recorded. **Inspect** measures this page the way the research measured the six websites. Delight comes from understanding something, not from decoration.

## Framework and content

The application uses React and Vite with Yarn Classic 1.22.22. Fumadocs supplies the documentation content pipeline, navigation, search, and table of contents. The custom library and shared theme provide the editorial presentation. Vite builds the application, and each published route is prerendered so the research stays readable without JavaScript.

Tailwind CSS powers the shared shell, library, documentation, stories, and interactive visuals. Project-specific tokens live in [`app/globals.css`](../app/globals.css); component styles compose Tailwind utilities with `@apply`. Dedicated stylesheets use `@reference "./globals.css"` to access the same theme. Keep custom CSS for precise animation geometry, transforms, custom properties, and progressive viewport fallbacks when a utility would obscure or change their behavior.

Research lives in Markdown or MDX with validated metadata. Each website has a standalone `study` document; a shared `report` brings together comparisons and findings. The optional [`story registry`](../lib/study-stories.ts) adds a guided presentation that links back to the full evidence. Three small registries feed the interactive layer, and each states its sources:

- [`lib/findings.ts`](../lib/findings.ts): single-sentence findings for the homepage deck, each with an evidence kind and a research anchor.
- [`lib/study-profiles.ts`](../lib/study-profiles.ts): each study's style-map row, its desktop-to-mobile changes, and the notes pinned to its recorded capture.
- [`lib/evidence.ts`](../lib/evidence.ts): the evidence vocabulary shared by badges, notes and demonstrations.

## Information architecture

The content is a matrix: websites by chapters (idea, type, motion, mobile, takeaways). Navigation works along both axes.

- **By website:** a study opens as a story or as its complete research. The **Story / Research** switch joins the two depths on both pages.
- **By chapter:** a **lens** on the homepage shows one chapter across every study. Every story chapter links to its lens, and the lens links back to each chapter. `?lens=` and `?view=` keep a comparison shareable; the prerendered page always shows the overview.
- **From anywhere:** the **Studies** menu is a disclosure listing every study, its five chapters, its research, each lens, the findings report and the methodology. On narrow screens it also holds Inspect and the notebook.

Studies are numbered as a series, oldest first, so a number never changes as the library grows. The newest study carries a **New** chip. [`lib/library.ts`](../lib/library.ts) is the single source of that order for the homepage, the menu, story numbering and the next-story link.

## Color roles

| Role   | Value     | Use                                    |
| ------ | --------- | -------------------------------------- |
| Paper  | `#f1f3ef` | Main background                        |
| Ink    | `#183d2b` | Headings, identity, strong text        |
| Body   | `#263d30` | Long-form reading                      |
| Muted  | `#607065` | Metadata and supporting text           |
| Line   | `#cbd2c9` | Fine separators and borders            |
| Green  | `#24563c` | Primary interaction and emphasis       |
| Blue   | `#345be4` | Inspect mode: redlines, labels, legend |
| Purple | `#7060b7` | Available secondary accent             |
| Orange | `#ba512f` | New chip and notebook count            |

Each studied website also has a small palette drawn from its homepage wordprint, applied through `data-site` (`--site-paper`, `--site-ink`, `--site-accent`, `--site-line`, `--site-swatch`). Finding cards take the full palette; menus, cards, the index and chart chips use only the swatch beside text. Text never takes a site color. The method band uses the Ace story's dark green so the evidence legend reads as a separate register. Story colors follow each study's visual treatment.

## Typography

The project loads four supplied PP Neue Montreal files through local `@font-face` declarations in [`app/fonts.css`](../app/fonts.css). Vite emits the referenced font assets with the production build:

| Face                              | Weight | Role                                           |
| --------------------------------- | ------ | ---------------------------------------------- |
| PP Neue Montreal Regular          | 400    | Display headings, navigation, interface labels |
| PP Neue Montreal Semibold         | 600    | Strong emphasis and table headings             |
| PP Neue Montreal Text Book        | 375    | Long-form prose and explanatory copy           |
| PP Neue Montreal Text Book Italic | 375    | Reading-text emphasis                          |

Display headings are mostly regular with tight tracking. The homepage hero uses a large fluid scale; article titles are quieter at roughly 36–60px. Article prose uses 17px type, 1.7 line height, and paragraphs capped at 70 characters. Small uppercase labels identify sections and metadata without competing with the findings. Inspect exposes these roles live, so keep them consistent.

Font files and their original EULA are retained in [`assets/fonts`](../assets/fonts/). This is a supplied typeface, not an open-source font dependency.

## Shape

**Everything is square.** Buttons, borders, chips, badges, dialogs, focus rings and chart markers have no rounded corners. A global rule in [`app/globals.css`](../app/globals.css) sets `border-radius: 0` on every element, including Fumadocs surfaces such as search and the sidebar, so nothing added later can reintroduce rounding. Native parts that ignore border radius, such as a range slider's thumb, are drawn explicitly as squares.

Controls read as controls through a fine border, an ink fill when selected, and a visible focus outline, not through shape. Circles remain only inside original artwork and diagrams, where they depict something, such as Arkon's sphere.

## Evidence badges

Every claim carries one of six kinds: **Observed**, **Observed + source**, **Source-confirmed**, **Hook only**, **Interpretation**, and **Illustration** for this library's own demonstrations. Badges pair a word with a shape (filled square, half-filled square, diamond, dashed square, triangle, crossed square) and never rely on color. Use [`EvidenceBadge`](../components/evidence-badge.tsx) rather than writing new labels.

## Homepage

1. **Hero:** the proposition beside the **findings deck**. Cards can be dealt with buttons, arrow keys, or by flicking the top card. Each shows its study, evidence badge and a link to the supporting paragraph. Only the top card is interactive; the order is fixed until shuffled, so the prerendered card matches the first dealt.
2. **The studies:** a grid or index of the numbered series with the lens switch. Choosing a lens collapses the wordprints into color bands so one chapter lines up across all studies. The findings report follows as a wide card.
3. **Type lab:** a dumbbell chart of every measured role, a filled square for desktop and an outlined square for mobile on one pixel scale. One hue; choosing a website grays the others. Sorting animates rows to their new rank, and the trip to mobile replays when the chart enters view. A table view and per-row accessible names carry every value.
4. **Method:** each evidence kind with its definition and a real example.
5. **Contact** and footer, as one full-screen ending.

## Homepage wordprints

Each article has an original SVG composition that turns a research theme into a typographic teaser. Ace draws on technical and ASCII precision; Arkon arranges type as a spatial scene; Neue Montréal becomes a type specimen; MONOLOG shifts editorial emphasis; Lama Lama uses a pixel identity; Noho tilts its letters around chair-like linework. Research findings brings **TYPE / SPACE / MOTION / INTENT** into alignment as an interpretation of the collection's shared lessons.

These are interpretive artworks. The original website screenshots remain evidence, never teasers; the wordprints do not reproduce the source sites or demonstrate their actual behavior. The existing `visual` frontmatter key selects a composition, with a generic fallback for future entries. Each wordprint is a native button: click, tap, Enter, or Space toggles an alternate composition. Reduced motion uses instant state changes and disables pointer tracking.

## Study stories

Each `/studies/<slug>/` page opens with its hero and the research's style-map row (style, idea, what to borrow, what to watch for, and the count of each kind of interaction evidence). Five chapters follow, each with a different job:

| Chapter   | Demonstration                                                                             |
| --------- | ----------------------------------------------------------------------------------------- |
| Idea      | The recorded desktop capture with numbered notes; every note is printed below the image.  |
| Type      | Every measured role set at its recorded pixel size, switching between desktop and mobile. |
| Motion    | A hands-on illustration of one recorded interaction, paired with the finding it explains. |
| Mobile    | Desktop and mobile captures side by side, with what changed between them.                 |
| Takeaways | Keep and Question, plus all five lessons, each ready to pocket.                           |

The motion chapter teaches through manipulation: choose where Ace's zoom happens; move Arkon's scene between routes; scrub Neue Montréal's recorded weight mapping; point at MONOLOG's services; find all three ways out of a Lama Lama layer; and switch this Noho story to a dark surface or calmer motion. These are labelled illustrations and never claim to reproduce a source implementation or its outcome.

The shared sequence supports distinct visual voices. Preserve the source distinction through composition, color, scale, and interaction while retaining the library identity and clear reading hierarchy. Text, all five chapter destinations, captures and research links are present in exported HTML. Avoid scroll hijacking, timed reading, or hiding conclusions behind a demonstration.

## Signature behaviors

- **Inspect** (`I`, or the scan icon): dashed redlines and labels with computed `size / line height · weight · tracking`, plus measure for opening paragraphs, over a faint blueprint grid. Labels update on resize, so fluid type can be watched. Headings and first paragraphs are measured automatically; add `data-inspect="Role"` to name a role. Mark overlays with `data-inspect-ignore`.
- **Pocket and notebook** (`N`): lessons save to `localStorage` through an external store, so prerendered markup never depends on them. The notebook is a native modal dialog with removal, Markdown copy and clear. Nothing leaves the browser.
- **Keyboard:** `/` search, `I` inspect, `N` notebook, `J`/`K` chapters, `?` help. Shortcuts ignore typing contexts and open dialogs.

## Interaction and responsive behavior

Motion explains relationships: a card leaves in the direction it was flicked, rows travel to their new rank, markers travel from desktop to mobile, and the artwork steps aside when a lens is chosen. Every effect has a reduced-motion equivalent, and nothing essential depends on hover. Menus are disclosures that close on Escape, outside clicks and navigation, returning focus to their button.

Article explorers use the same paper surfaces, green ink and fine rules, with square controls. Readers can switch between recorded desktop and mobile screenshots, compare measured type sizes on a shared scale, and inspect trigger and response findings. The visualizations supplement the complete article; they do not recreate live websites or simulate untested behavior.

Library and documentation focus uses one 2px green outline with a small gap. Story focus indicators contrast with their theme. Reading targets reached by skip links or chapter links take focus without an outline. Selected state and keyboard focus remain distinct.

At narrow widths the header keeps the brand, the menu and search; the lens toolbar scrolls horizontally; the index becomes labelled rows; chart values stack beside their track; and captures stay side by side. Check 320px as well as 390px. Use SVG icons so symbols keep their intended appearance across platforms.

## Carry the system forward

Give each new study a useful title, a specific description that states what is distinctive, meaningful tags, and evidence that earns its place. To join the interactive layer, add its findings, profile and capture notes, then its story. Use screenshots to substantiate findings and keep decorative media separate from research evidence. Reuse the existing type, spacing, color, shape and evidence conventions before introducing new ones.

Keep the library's open spacing and regular-weight headings, while giving dense reports enough reading room. Every future addition should remain understandable with motion reduced, without JavaScript, and on a narrow screen.
