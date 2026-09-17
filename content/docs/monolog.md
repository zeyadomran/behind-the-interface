---
title: "MONOLOG"
description: "Warm editorial confidence: typography, narrative, interaction, responsive behavior, and public-source evidence for MONOLOG."
date: "2026-09-16"
kind: "study"
cover: "/research/five-websites/screenshots/monolog-desktop.jpg"
visual: "monolog"
tags: ["Creative direction", "Typography", "Interaction", "Responsive design"]
sites: ["https://bymonolog.com/"]
---

Reviewed September 15–16, 2026 · [Live website](https://bymonolog.com/) · [Research findings](/docs/research-findings/)

This page brings together the website review, typography follow-up, and public-source findings for MONOLOG. Observed behavior, source-confirmed implementation, hook-only findings, and interpretation remain distinct. Viewports and shared coverage limits are recorded in [Reading this research](/docs/research-findings/#reading-this-research).

## Website review

**Creative assessment.** MONOLOG balances a strong designer's voice with a recognizable sales journey. It is less about a single hero effect than a sequence: problem, credibility, work, services, process, objections, invitation. The warm neutrals, founder presence and unusual display lettering make that familiar structure feel personal. Its published secondary routes currently weaken the impression of completeness. [Live site](https://bymonolog.com/)

### Typography, palette and layout

- **Type:** KHTeka for primary interface/body and bold statements, Animo Normal Regular for expressive display, Suisse Intl Mono for metadata. CSS defines display sizes roughly 5–9.25rem and very tight tracking/leading; these are system ranges, not one screenshot measurement.
- **Color:** warm black `#080807`, dark cards `#181715`, beige `#e8e8e3` and intermediate warm grays. This tonal warmth distinguishes it from a pure black/white tech portfolio.
- **Texture:** grain/halftone and cinematic moving imagery give the background a tactile quality. A wireframe torus appears above the central hero copy; the huge wordmark anchors the bottom.
- **Composition:** small left-side annotations or testimonials counterbalance larger statements and media on the right. Light work sections interrupt dark chapters. The design uses asymmetry consistently rather than arbitrarily.

![MONOLOG desktop](/research/five-websites/screenshots/monolog-desktop.jpg)

### Narrative and secondary surfaces

The hero establishes the studio's positioning, then a founder/problem statement and smaller credibility elements explain why the visitor should care. Large expressive words with changing images lead into a light portfolio section. Project presentations combine prominent imagery with short summaries and outcome language. Services return to dark, large type with contextual imagery; process steps use real working material and links to timestamped video explanations. FAQs handle practical questions before the large closing CTA.

About is an independently scrolling cream panel over a blurred/darkened page. It contains founder context, imagery, client/award material and values. The desktop panel occupies approximately the right half; **Escape successfully closed it**. Its presentation makes the founder feel present without requiring a conventional About route.

The [Work index](https://bymonolog.com/work) has a cream background, seven-project grid and service filters. I selected Brand Strategy and the grid reduced to OH Architecture and Mammoth Murals. The large heading count stayed “07,” which can be read as total archive size but is ambiguous beside a filtered set. Clarify total versus results rather than leaving users to infer the distinction.

The work cards inspected link to external client websites. Separately, all seven `/projects/…` URLs listed in the sitemap returned generic old navigation/footer shells in source. I opened [OH Architecture's project route](https://bymonolog.com/projects/oh-architecture) in-browser and confirmed the absence of a case study. This is a published-route/content problem; it is not evidence that the primary external work-card links all fail.

### Interaction and motion inventory

| Trigger               | Response                                               | Evidence                                                    | Design assessment                                                                |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| About                 | Cream biography panel overlays the page                | Observed                                                    | Strong personal layer with preserved page context                                |
| Escape in About       | Panel closes                                           | Observed                                                    | Good keyboard exit convention                                                    |
| Service pointer state | Current service brightens and related image changes    | Observed state + matching hooks                             | Gives a sparse list visual depth                                                 |
| FAQ selection         | Row highlights beige; answer expands                   | Observed pricing question                                   | Clear disclosure and readable state contrast                                     |
| Work service filter   | Grid narrows to matching projects                      | Observed                                                    | Useful for prospective-client relevance                                          |
| Process preview       | Links to a corresponding video timestamp               | Link targets observed                                       | Makes process claims more tangible; videos not played here                       |
| Footer hold area      | “Hold to disrupt” cursor prompt; canvas texture reacts | Prompt observed, drag partially probed, handler unavailable | Memorable optional experiment; exact sustained-press behavior not fully verified |
| AI service icon       | Opens a prefilled external evaluation prompt           | Link targets observed                                       | Unusual partner-research aid; not an on-site chatbot                             |

The AI links include Claude, Gemini, ChatGPT, Grok and Perplexity. Their role is to invite outside evaluation of the studio. They were inspected without sending anything. A short label explaining the destination would improve clarity for people who do not recognize the icons.

A sound toggle is present and initially off. I did not turn it on, so this report does not describe the audio design as heard. Source loads GSAP/ScrollTrigger/SplitText/Flip, Three.js, Lenis, Howler and Barba. MONOLOG's custom bundle rejected direct HTTP access with an invalid-referrer response; no bypass was attempted. Consequently testimonial automation, values-accordion details and the precise footer shader behavior remain hook-only unless specifically observed above. [Source details](#public-source-audit)

![MONOLOG footer experiment](/research/five-websites/screenshots/monolog-footer.jpg)

### Mobile changes and issues

The mobile header keeps logo, sound control and Start a project, then adds Menu. The hero becomes a tall composition with small centered copy and the large wordmark near the bottom. The menu opens a dark panel with large About/Work/Process/Services/Contact links. About changes from a side panel to a full-width reading surface, preserving its close control.

The menu also exposed two small editorial/news cards with a duplicated headline and placeholder `#` links. One displayed a future September 21, 2026 date relative to this review. This may be scheduled or unfinished content; the duplicated/placeholder presentation is the stronger finding. Clean these secondary surfaces, because visitors exploring a craft-focused studio are particularly likely to notice them.

![MONOLOG mobile](/research/five-websites/screenshots/monolog-mobile.jpg)

**What I would keep:** the warm palette, narrative order, light/dark chapter rhythm, personal About panel and practical FAQ. **What I would change first:** generic project routes, menu placeholders and filtered-result labeling. Then make experimental/AI affordances understandable without relying entirely on cursor text or brand-icon recognition.

## Typography and pointer behavior

Type was sampled at **1440×1000 desktop** and **390×844 mobile** viewports. The table gives computed **size / line height** in CSS pixels. These are observed roles, not an exhaustive token specification or proof of a separate font file for each computed weight. [Measurement method and limitations](/docs/research-findings/#what-was-measured-and-tested) · [Raw computed-style samples](/research/five-websites/typography-measurements.json).

| Site and role             | Typeface / weight          | Desktop        | Mobile        | What the difference does                                                         |
| ------------------------- | -------------------------- | -------------- | ------------- | -------------------------------------------------------------------------------- |
| MONOLOG hero positioning  | KHTeka 500                 | 17.75 / 19.53  | 14.11 / 15.52 | Small centered statement lets the wordmark and atmosphere dominate               |
| MONOLOG founder statement | KHTeka 700                 | 45 / 49.5      | 25.31 / 29.11 | A stronger reading beat immediately after the restrained hero copy               |
| MONOLOG service names     | KHTeka 700                 | 94 / 94        | 33.31 / 33.31 | Large scale supplies hierarchy; hover adds another emphasis layer                |
| MONOLOG process display   | Animo, computed weight 500 | 139.5 / 125.55 | 83.72 / 75.35 | A distinct display voice marks a new chapter; rendered glyphs can be transformed |

### Attention and reading order

The hero gives first priority to atmosphere and the graphic wordmark. Its meaningful h1 is intentionally small: a two-part positioning statement centered in a roughly 252px desktop box, reduced to about 200px on mobile. That builds intrigue, but the practical offer asks for closer reading.

The following founder statement is much larger, and the page then moves through work, service capability, process, objections and contact. This is a deliberate persuasive sequence: establish a point of view, substantiate it, explain the engagement, then answer practical concerns.

The work presentation separates project image, brief context, service information and results. This lets a visitor scan visually and then choose whether to read. The service section places customer testimony alongside the large capability list, pairing “what we do” with “why believe us.”

### Type and local hierarchy

KHTeka moves from approximately 17.75px/19.53px hero copy to 45px/49.5px founder copy and 94px/94px service names. Mobile values are about 14.11px, 25.31px and 33.31px respectively. The hero therefore stays noticeably restrained compared with the page's later statements.

The 94px service names use −.03em tracking; their silhouette becomes a major graphic element. Suisse Mono annotations are around 11.8px in the measured desktop service section, which clearly distinguishes supporting labels from persuasive content. Animo's much larger process display creates a chapter break through letterform personality as well as size.

There is also a **dynamic hierarchy**: the hovered service has opacity 1 while the other five sit at .3. This is far more consequential than a decorative hover color; it tells the visitor which item the adjacent image belongs to.

### Newly tested pointer details

- Hovering **Website Design**, then **3D Development**, changed the active text and contextual preview. This was verified by both the screenshot and the corresponding opacity changes.
- The testimonial beside the service list advanced while the page remained there. Its progression is independent of the service hover, so the quote should not be interpreted as a one-to-one testimonial for the selected service.
- The footer's **Hold to disrupt** prompt follows the pointer. Moving from one canvas region to another moved the label from approximately x=252 to x=1081. Leaving for an AI icon removed it from the canvas area.
- That confirms the instructional cursor behavior. The exact sustained-press distortion remains incompletely exercised; ordinary ambient canvas motion is not sufficient evidence of the hold effect.

![MONOLOG: hovered service gains emphasis and shows its preview](/research/five-websites/screenshots/monolog-service-hover.jpg)

**Direction I would give the team:** preserve the contrast between quiet positioning and large proof. Make sure the hero statement stays comfortably readable on mobile. Keep service emphasis linked clearly to the preview, and avoid making an independently cycling testimonial appear contextually tied to that same hover.

## Public-source audit

These findings come from public HTML, CSS, JavaScript, and sitemaps. A shipped definition does not prove an active feature: **configured** means an invocation or page markup is present; **implemented** means its handler was inspected; **hook only** means the custom handler was unavailable. [Source scope and limitations](/docs/research-findings/#evidence-and-boundaries).

- MONOLOG HTML: [https://bymonolog.com/](https://bymonolog.com/); CSS [https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/css/bym0n0l0g.webflow.shared.1ee2b3b31.min.css](https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/css/bym0n0l0g.webflow.shared.1ee2b3b31.min.css).

### Verified design system

Webflow-generated stylesheet defines primary **KHTeka** (CSS family `Khteka`, 500/700), secondary **Animo Normal Regular** 400, tertiary **Suisse Intl Mono Regular** (CSS family `Suisse Mono`, 400). Actual typography variables assign these roles. Main body token scales 1–1.125rem, text small .875–1rem, display 5–9.25rem, h1 5–6rem, h2 3–4.75rem, h3 2–3.5rem. Tight tracking tokens include -.03, -.015, -.01em; display line-height includes .9.

Palette: near black `#080807`, card black `#181715`, dark warm gray `#393632`, middle grays `#524d47`, `#6b645c`, `#938f8a`; beige steps `#e8e8e3`, `#ddddd5`, `#d1d1c7`, `#bfbfb1`. The system is warm and tonal, not mathematically pure black/white. Styles contain fine/coarse pointer and hover/no-hover branches, plus breakpoints 479, 767, 991, 1440 and 1920.

### Interaction inventory, explicitly marked hook-only

The page loads GSAP 3.15 with ScrollTrigger, SplitText, CustomEase and Flip; Three.js 0.160.1; Lenis; Howler 2.2.4; Barba. GSAP plugins are registered and Barba wrapper/container namespaces are in the page. These imports do not independently prove every feature is active.

The actual custom script URL is assembled as `https://cdn.odyn.dev/p/3pc9/bundle.js`. Public HTTP access returned `Access denied - Invalid referrer`. This audit stopped there and did not bypass it. Consequently these are verified **markup hooks and intended affordances**, to confirm with live browser:

- `data-open-modal`, `data-close-modal`, and `data-about-status`: about/biography modal.
- `data-menu-btn`, `data-navigation-status`: menu state.
- `data-hero-canvas`, overlay-scroll and hero-translate attributes: animated canvas hero and scroll overlays.
- `data-slider-prev/next/item`, headshot/message, progress start/end and dynamic counter: testimonial slider.
- `data-stacking-cards-item`: stacked work cards.
- `data-content-trigger` paired with `data-content-image`: services/content hover switching.
- `data-accordion-close-siblings="true"`, active/not-active state, toggle and hover-highlight: one-at-a-time values accordion.
- `data-video="playpause"` and `data-sound-hover`: video hover/play and possible audio cues. No claim that sound is actually audible/default-on.
- Process cards have cursor labels “See step 01/02/03 in action” and link to time-stamped YouTube segments.
- `data-theme-section` light/dark and nav theme hooks: section-dependent chrome.
- Footer parallax, live time/date/year and top-arrow hooks.
- Footer canvas has the actual cursor instruction **“Hold to disrupt”**, with left/right canvas-content regions. This is the best target for a long pointer press test.
- Footer has real links to Claude, Gemini search, ChatGPT, Grok and Perplexity prefilled with a prompt asking the AI to evaluate MONOLOG as a potential partner. This is a distinctive trust/conversion affordance, not an on-site AI chatbot. Do not activate/send the prompt without authorization.

### Routes

[Sitemap](https://bymonolog.com/sitemap.xml): home, `/work`, and seven `/projects/` pages: backhouse, hiss-university-of-sydney, mammoth-murals, oh-architecture, slik, squiggle-university-of-sydney, supersolid. Main home anchors work/process/services. Booking goes to `cal.com/byhuy/project-intro-call` (another CTA has duration=45); mail is `hello@bymonolog.com`. Site routes are distinct from linked client sites/live work.

## Route inventory

Public route responses and selected component code were inspected on September 16, 2026. HTTP 200 does not establish content completeness or working interactions. These tables are source findings, not a claim that every listed page or control was exercised live. [Inventory scope and limitations](/docs/research-findings/#coverage-limits-and-reading-guidance).

### MONOLOG route families

The `/work` archive adds service filters to the home visual system: all projects, brand strategy, visual identity, website strategy, website design, website development. It has `data-filter-target-match="multi"` and `data-filter-name-match="multi"`, active/transition-out/not-active states, result-count hooks and a grid layout state. Project cards collect multiple category values, and some include `3d-development` even though no separate 3D filter is displayed in the extracted filter row. These are markup-confirmed controls; their JavaScript custom bundle remained unavailable to direct source access as explained in the [public-source audit](#public-source-audit).

Archive cards include project year, brief, service tags and View project affordance. Footer retains the AI-evaluation links and “Hold to disrupt” canvas from the homepage. Case pages lack that richer contemporary footer and show an older generic navigation/footer instead. This is an unusually strong template consistency concern.

| Exact URL                                                                                                            | Template / content structure                                           | Extra controls / difference                                                                 | Status                                             |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [bymonolog.com/work](https://bymonolog.com/work)                                                                     | Filterable seven-project archive with service tags and short summaries | Service filters, result count, filter transition states, grid state, home footer experiment | 200, populated                                     |
| [bymonolog.com/projects/backhouse](https://bymonolog.com/projects/backhouse)                                         | Generic navigation/footer shell                                        | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/hiss-university-of-sydney](https://bymonolog.com/projects/hiss-university-of-sydney)         | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/mammoth-murals](https://bymonolog.com/projects/mammoth-murals)                               | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/oh-architecture](https://bymonolog.com/projects/oh-architecture)                             | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/slik](https://bymonolog.com/projects/slik)                                                   | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/squiggle-university-of-sydney](https://bymonolog.com/projects/squiggle-university-of-sydney) | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/supersolid](https://bymonolog.com/projects/supersolid)                                       | Same generic shell                                                     | No case-specific heading/content in response                                                | 200, incomplete-looking source; runtime unverified |

## Read across the collection

[Research findings](/docs/research-findings/) · [Compare typography](/docs/research-findings/#measured-type-hierarchy) · [Research methodology](/docs/methodology/)
