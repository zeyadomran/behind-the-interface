---
title: "Research findings"
description: "Cross-site findings on creative direction, measured typography, hierarchy, interaction, responsive design, public-source evidence, and route coverage."
date: "2026-09-16"
kind: "report"
visual: "collection"
visualView: "type"
tags:
  [
    "Creative direction",
    "Typography",
    "Interaction",
    "Responsive design",
    "Source evidence",
  ]
sites:
  [
    "https://acedesign.io/",
    "https://arkon.digital/",
    "https://neuemontreal.com/",
    "https://bymonolog.com/",
    "https://lamalama.com/",
  ]
cover: "/research/five-websites/screenshots/lama-desktop.jpg"
---

Desktop and mobile UI/UX research • Reviewed September 15–16, 2026

This review treats each website as a designed product: what it is trying to communicate, how its visual system supports that purpose, what interaction adds, and where the experience breaks down. The strongest shared lesson is that distinctive websites build a repeatable visual language around a specific idea. Oversized type, dark backgrounds and animation alone do not provide that idea.

## Reading this research

**Observed** means I inspected the live page or exercised the control. **Source-confirmed** means public HTML/CSS/JavaScript contains the specific configuration or handler. Within that source evidence, **configured** means an actual component invocation or page markup is present, and **implemented** means a matching handler/component was inspected. **Hook only** means the markup suggests an interaction but its custom implementation was unavailable. **Interpretation** is my creative-direction assessment, not a measured business outcome.

Desktop inspection used chiefly 1280×720 and 1440px-wide views, with some larger-window observations. Mobile inspection used a **390×844 CSS-pixel viewport**. These were responsive browser tests with pointer/keyboard input, not physical iPhone/Android device tests. Screenshot frames show a moment in moving compositions, not the complete animation.

All five homepages were explored through their major sections. Navigation, galleries, menus, accordions and representative secondary templates were inspected. The [route inventory](/docs/research-findings/#route-inventory) covers **65 additional route requests** across Ace, MONOLOG and Lama Lama. It does not mean every case image, browser state, external client site or hardware gesture was tested.

This article brings together the cross-site comparison, [measured type hierarchy](/docs/research-findings/#measured-type-hierarchy), [public-source evidence](/docs/research-findings/#public-source-evidence), and route coverage. The five website reviews contain the detailed browser observations, direct screenshots, implementation findings, and complete website-specific request tables.

## Website reviews

Each website has its own page with its browser review, screenshots, measured typography, public-source evidence, and route findings where available.

- [Ace](/docs/ace/) — technical editorial precision.
- [Arkon Digital](/docs/arkon-digital/) — a portfolio as a real-time scene.
- [Neue Montréal](/docs/neue-montreal/) — a living type specimen.
- [MONOLOG](/docs/monolog/) — warm editorial confidence.
- [Lama Lama](/docs/lama-lama/) — a complete brand behavior system.

## Style map

| Website                               | Style / theme                                                   | Core creative idea                                             | Best reference for                                      | Main tension                                                 |
| ------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| [Ace](/docs/ace/)                     | Technical editorial; dark product studio; ASCII and lime        | Precision, systems and small-team expertise                    | Quiet technical identity; persistent conversion rail    | Mobile execution and inconsistent navigation                 |
| [Arkon Digital](/docs/arkon-digital/) | Cinematic creative coding; iridescent 3D; terminal typography   | The site itself demonstrates the developer's craft             | Persistent 3D scene across routes                       | Spectacle competes with text, especially on mobile           |
| [Neue Montréal](/docs/neue-montreal/) | Swiss editorial; printed travel guide; colorful type exhibition | The typeface becomes the content and the interaction           | Product-led motion and long-form art direction          | Very long journey and custom-control accessibility           |
| [MONOLOG](/docs/monolog/)             | Warm monochrome; brutalist editorial; cinematic texture         | A premium independent partner with a personal point of view    | Sales narrative, work presentation and founder presence | Secondary-page completeness and experimental discoverability |
| [Lama Lama](/docs/lama-lama/)         | Swiss agency system; pixel graphics; cinematic presentation     | An expressive agency identity applied to every interface layer | Coherent brand behavior; layered portfolio exploration  | Many modes and controls increase learning effort             |

## Themes across the collection

### Typography is the main identity system

The sites use remarkably few conventional interface decorations. Their hierarchy comes from font character, scale, spacing, weight and placement. Ace contrasts compressed Anton headings with restrained GT America and mono labels. Arkon uses a deliberate three-way contrast: elegant script, narrow industrial capitals and technical body text. MONOLOG alternates strong sans-serif statements, unusual display lettering and small mono annotations. Lama keeps its main sans family consistent and uses mono labels to make actions feel like instrument controls. Neue Montréal makes one family demonstrate an entire range of personalities.

The useful principle is **assign each typographic voice a job**. An expressive title, a readable explanation and a technical annotation can coexist if their roles stay consistent. Copying all the declared font files would miss the point: shared bundles often contain fonts that are not visibly important.

### Layout alternates restraint and release

Ace's fixed left rail provides stability while the right column changes. Arkon arranges content around a central object like a stage. Neue Montréal alternates dense editorial passages with enormous letterforms and immersive full-screen chapters. MONOLOG's small explanatory columns sit beside oversized statements and generous media. Lama mixes narrow control panels with broad image fields and compact project indexes.

Negative space does structural work. It gives a dominant element room, separates chapters and creates anticipation. It becomes a problem when users cannot tell whether the space is deliberate, content is still loading or an interaction is required. Empty published routes are a separate issue from intentional whitespace.

### Motion should have a reason

Three particularly strong reasons appear here: **demonstration** (Neue Montréal's variable weights), **proof of skill** (Arkon's real-time rendering), and **brand consistency** (Lama's pixel/logo treatment across media and controls). Ace's spinning seal and image degradation add a technical signature with less visual dominance. MONOLOG uses movement to support an editorial and persuasive sequence.

Persistent ambient motion has a different job from a click response. Ambient motion creates atmosphere; click motion should clarify what changed and where the user went. These sites sometimes mix those responsibilities. A morphing scene is memorable, but a clear selected filter, readable label and obvious close control still matter.

### Discovery is enjoyable until it hides the task

The rewarding discoveries include Lama's pitch deck and contact playground, MONOLOG's footer experiment, Neue's city stories and Ace's reactive image treatments. They are optional depth. Navigation, buying, reading and contacting should remain understandable without finding them. In particular, icon-only controls, unexplained horizontal strips and hover-dependent information deserve explicit touch and keyboard alternatives.

### Conversion is woven into the composition

Ace keeps booking beside the work on desktop. Arkon directs attention to the portfolio rather than a long lead form. Neue keeps a purchase link visible while visitors explore the specimen. MONOLOG develops trust through work, outcomes, process and FAQs before its closing invitation. Lama repeats contact access and turns its compact menu into a form/calendar/presentation hub.

These are different strategies for different offerings. A type specimen benefits from letting visitors play with the product; a studio must explain fit and credibility; a developer portfolio can use the interface as a live sample of capability. No conversion rates were measured here.

## What was measured and tested

Type was sampled at **1440×1000 desktop** and **390×844 mobile** viewports. Values below are computed CSS pixels, rounded where appropriate, not estimates from screenshots. Font size and line height are separate measurements; a graphic wordmark or transformed specimen cannot reliably be described by the font size of its surrounding element.

I moved the pointer across titles, buttons, navigation, project imagery, postcards, service names, footer canvas regions and team rows. Browser pointer placement was paired with small wheel increments where needed. I checked the hovered element and resulting styles, alongside screenshots. This establishes hover responses; it does not establish physical-device touch behavior or a sustained mouse-button hold. Continuously animated backgrounds were not treated as proof of pointer response merely because successive frames differed.

The suggested reading orders are a creative-direction assessment based on size, placement, contrast and motion. They are not eye-tracking results. The [raw computed-style samples](/research/five-websites/typography-measurements.json) retain the measurements; they also include offscreen elements and animation wrappers, so the curated tables below are the appropriate reference for visible typography.

## Measured type hierarchy

Numbers shown as **size / line height**. Tracking is letter spacing, expressed in em where useful. These are observed roles at the tested widths, not an exhaustive design-token specification.

| Site and role                        | Typeface / weight                         | Desktop         | Mobile        | What the difference does                                                         |
| ------------------------------------ | ----------------------------------------- | --------------- | ------------- | -------------------------------------------------------------------------------- |
| Ace service headlines                | Anton 400                                 | 40 / 42         | 40 / 42       | Keeps the same emphatic type size; changes arrangement rather than scale         |
| Ace explanatory heading              | GT America Regular 400                    | 16 / 22.4       | 16 / 22.4     | Reading size stays sensible, but the retained 640px box clips on mobile          |
| Ace fixed-rail prose                 | GT America Light 300                      | 14 / 21         | Rail removed  | Quiet supporting context beside the dominant work stream                         |
| Ace chapter labels                   | GT America Mono Light 300                 | 12 / 12         | 12 / 12       | +.1em spacing makes small labels feel like technical annotations                 |
| Arkon “Creative”                     | Bonheur Royale 400                        | 161.54 / 80     | 121.15 / 80   | Script ascenders/descenders visually interlock with the following line           |
| Arkon “Developer”                    | Bebas Neue 400                            | 107.69 / 107.69 | 80.77 / 80.77 | Condensed capitals keep a forceful title within limited width                    |
| Arkon biography                      | JetBrains Mono 400                        | 12 / normal     | 12 / normal   | The explanatory text remains small even when the mobile navigation grows         |
| Arkon navigation                     | JetBrains Mono 300, active/hover emphasis | 12 / 16.8       | 16 / 22.4     | Mobile route links are easier to target/read than the biography                  |
| Neue cover title                     | PP Neue Montreal Bold 700                 | 74.08 / 66.67   | 29.6 / 26.64  | Compact .9 leading makes the title a single graphic block                        |
| Neue cover explanation / Story label | PP Neue Montreal Text Regular 400         | 24 / 24         | 15 / 15       | Editorial density comes from 1.0 leading and −.03em tracking                     |
| MONOLOG hero positioning             | KHTeka 500                                | 17.75 / 19.53   | 14.11 / 15.52 | Small centered statement lets the wordmark and atmosphere dominate               |
| MONOLOG founder statement            | KHTeka 700                                | 45 / 49.5       | 25.31 / 29.11 | A stronger reading beat immediately after the restrained hero copy               |
| MONOLOG service names                | KHTeka 700                                | 94 / 94         | 33.31 / 33.31 | Large scale supplies hierarchy; hover adds another emphasis layer                |
| MONOLOG process display              | Animo, computed weight 500                | 139.5 / 125.55  | 83.72 / 75.35 | A distinct display voice marks a new chapter; rendered glyphs can be transformed |
| Lama hero headline                   | Suisse BP Intl 700                        | 72 / 57.6       | 40 / 32       | .8 leading creates a dense, emphatic uppercase shape                             |
| Lama hero explanation                | Suisse BP Intl 400                        | 20.04 / 24.05   | 16 / 19.2     | Readable sentence rhythm contrasts with the tightly packed title                 |
| Lama mono action labels              | Sometype 500                              | 10 / 18         | 10 / 18       | Consistent instrument-like voice, but mobile labels remain very small            |

Two distinctions matter. First, **computed weight is not proof of a separate font file**: a browser can synthesize a requested weight. Second, “headline” can describe visual prominence without meaning an HTML h1. Ace's 40px service terms are h3 elements, while its explanatory h1 is 16px. MONOLOG's semantic h1 is its small positioning statement, while the huge wordmark carries the strongest visual presence. That separation is not inherently wrong; it means visual hierarchy and document structure must be reviewed independently.

## Information hierarchy compared

| Site          | Primary attention                           | Explanatory information                           | Proof and detail                                           | What interaction adds                                                                |
| ------------- | ------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Ace           | Condensed service statements and lime       | Gray studio introduction; persistent rail         | Project grid, counters, testimonials, principles           | Small feedback and technical texture; limited new content on hover                   |
| Arkon         | 3D object and role title                    | Compact biography; perimeter metadata             | Project descriptions and image galleries                   | Scene continuity and button/link feedback                                            |
| Neue Montréal | Giant specimens and editorial statements    | Ruled columns, family labels and narrative        | Weight controls, optical comparisons, languages and glyphs | Demonstrates product properties and reveals editorial stories                        |
| MONOLOG       | Wordmark, atmosphere, then large statements | Small positioning statement; project/process copy | Outcomes, testimonials, FAQs                               | Changes local emphasis and supplies contextual previews                              |
| Lama Lama     | Uppercase declaration and cinematic media   | Supporting paragraphs and micro labels            | Compact work index, case detail, people and awards         | Reveals previews, portraits, personality captions and alternative presentation modes |

Three levels should be kept distinct when borrowing ideas from these sites. **Page hierarchy** determines which chapters matter. **Component hierarchy** determines how a project, quote or service is understood. **Interaction hierarchy** changes what is emphasized or revealed as the visitor acts. MONOLOG's service list and Lama's team list are clear examples of the third level.

The strongest takeaway is that **hierarchy is not simply a descending list of font sizes**. Alignment can make equally sized text understandable; contrast can turn a list into a selection interface; a hover can introduce a temporary layer of detail. The successful examples preserve a stable reading structure beneath those changes.

## Pointer and interaction findings

The individual website pages document the live pointer evidence: [Ace's project images](/docs/ace/#typography-and-pointer-behavior) zoom to 1.05; [Arkon's CTA](/docs/arkon-digital/#typography-and-pointer-behavior) grows and navigation arrows appear; [Neue's postcards](/docs/neue-montreal/#typography-and-pointer-behavior) tilt and purchase letters roll; [MONOLOG's service list](/docs/monolog/#typography-and-pointer-behavior) changes emphasis with its preview, and its cursor-following instruction was confirmed; and [Lama's team rows](/docs/lama-lama/#typography-and-pointer-behavior) reveal portraits and individual personality captions.

An additional responsive discovery is Lama's awards: desktop uses a press-and-hold reveal in its implementation, while mobile supplies a persistent View our awards disclosure that was opened and verified. The [Lama Lama page](/docs/lama-lama/#typography-and-pointer-behavior) distinguishes that source-confirmed desktop behavior from the live mobile test.

## Desktop → mobile comparison

| Site          | Navigation                                      | Content / composition                                                      | Interaction adaptation                                                                                | Most important mobile concern                               |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Ace           | Full nav/CTAs → logo + partial-height menu      | Fixed rail removed; cards/stats stack                                      | Menu exposes extra routes; case metadata has disclosures in source                                    | 640px intro clipped; Works misroutes                        |
| Arkon         | Three route links stay visible                  | Title up, bio down, central sphere remains dominant                        | Gallery controls persist; prev/next become smaller                                                    | Unstable contrast over sphere; zoom restriction             |
| Neue Montréal | Central chapter pill disappears; purchase stays | Long vertical specimen; circles stack; comparisons selectively stay paired | City accordion becomes horizontal rows; tilt greatly reduced                                          | Long-scroll orientation and custom-control semantics        |
| MONOLOG       | Adds Menu; Start a project remains              | Tall hero; About fills width                                               | Large menu links and full-width biography                                                             | Placeholder menu cards and incomplete published case routes |
| Lama Lama     | Compact menu expands to nearly screen width     | Hero stacks; work rows grow; services become horizontal cards              | Desktop inline case preview → tested direct case navigation; deck has mobile-specific source behavior | Small labels; differing layer/exit conventions              |

Responsive quality here is best judged by **what gets rethought**, not only by whether columns fit. Neue's accordion and Lama's services are strong examples. Ace's introduction demonstrates the opposite: changing the outer layout without releasing an inner fixed width breaks the reading experience.

## What I would send back to the teams

These priorities are editorial recommendations based on observed impact, not formal severity scores from a full QA program.

| Priority  | Site          | Finding                                                       | Evidence / next action                                                                                      |
| --------- | ------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Fix first | Ace           | Mobile introduction is clipped                                | Measured 640px inner width at 390px; use responsive width and recheck wrapping                              |
| Fix first | Ace           | Mobile Works goes to Notes; Lab points to /404; /works empty  | Live navigation/DOM + route source; align links and destinations                                            |
| Fix first | Arkon         | Hero body crosses bright sphere                               | Live mobile screenshot; create a stable text-safe area                                                      |
| Fix first | MONOLOG       | Published case routes show generic shells                     | All seven source responses, one live confirmation; complete, redirect or remove from sitemap as appropriate |
| Fix next  | Arkon         | Zoom-restricting viewport settings                            | Source; allow scaling and test reflow                                                                       |
| Fix next  | Neue Montréal | Desktop cover text/rules overlap at 1280px                    | Repeated captured state; diagnose sizing/animation/font-loading interactions                                |
| Fix next  | Neue Montréal | Mobile long page loses chapter navigation                     | Live responsive header; add compact chapter access                                                          |
| Fix next  | MONOLOG       | Menu content placeholders and unclear filtered count          | Live menu/filter; finish content and distinguish total/results                                              |
| Fix next  | Lama Lama     | Deck Escape exit and form-error clarity                       | Tested state; harmonize layer controls and show errors beside fields                                        |
| Fix next  | Lama Lama     | Cubby placeholder narrative; sparse AI page                   | Source; editorial completion or deliberate removal from published discovery                                 |
| Validate  | All           | Reduced motion, focus, touch, contrast and device performance | Targeted follow-up required; no benchmark or compliance claim in this report                                |

## Principles worth taking into a new design

1. **Choose a concept before choosing effects.** Technical precision, a live coding stage, a travel guide, a founder's editorial voice and a pixel-based agency identity are distinct starting points.
2. **Give motion an explanatory job.** A changing weight shows a font capability; a persistent scene links routes; an opening row exposes portfolio depth. These are easier to justify than an unrelated decorative effect.
3. **Keep a quiet place to read.** Large media can surround the copy, but the copy still needs stable contrast and a sensible line length.
4. **Separate expression from control clarity.** Brand the button's behavior, but preserve recognizable selection, focus, labels and exits.
5. **Design mobile interactions deliberately.** Replace a desktop arrangement when its geometry no longer works. A vertical accordion or horizontal service strip can preserve the idea better than shrinking it.
6. **Make hidden interactions optional rewards.** A visitor should be able to assess the work and contact the team without finding the experiment.
7. **Audit the edges of the experience.** Sitemaps, old project URLs, menus, footer links and validation states are part of the delivered design. The most polished homepage does not compensate for an empty destination.

My strongest references by purpose are **Neue Montréal for product education**, **Lama Lama for a coherent interaction language**, **MONOLOG for narrative and trust**, **Ace for restrained technical art direction**, and **Arkon for demonstrable creative-development skill**. These are qualitative judgments about this research set, not claims about which site converts best.

## Public-source evidence

The public-source inspection, reviewed September 15–16, 2026, explains the fonts, visual tokens, breakpoints, motion settings, and interaction implementations behind the browser observations. All findings come from public HTML, CSS, JavaScript, and sitemaps; no source repository access was available. A shipped definition alone is not proof that a feature is active, and a library import is not proof of a visible effect.

Exact website-specific findings sit under the public-source sections for [Ace](/docs/ace/#public-source-audit), [Arkon Digital](/docs/arkon-digital/#public-source-audit), [Neue Montréal](/docs/neue-montreal/#public-source-audit), [MONOLOG](/docs/monolog/#public-source-audit), and [Lama Lama](/docs/lama-lama/#public-source-audit). The public origins and inspected asset URLs are retained here:

- Ace HTML: [https://acedesign.io/](https://acedesign.io/); page bundle [https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/ZtjpnfryboeNkIbiqgmIC58OsEq7Uq5TjX8rLjG-wag.BV0EGYq6.mjs](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/ZtjpnfryboeNkIbiqgmIC58OsEq7Uq5TjX8rLjG-wag.BV0EGYq6.mjs).
- Arkon HTML: [https://arkon.digital/](https://arkon.digital/); application [https://arkon.digital/index.9bd9d15c.js](https://arkon.digital/index.9bd9d15c.js); CSS [https://arkon.digital/index.eaed5af2.css](https://arkon.digital/index.eaed5af2.css).
- Neue HTML: [https://neuemontreal.com/](https://neuemontreal.com/); application [https://framerusercontent.com/sites/45hQNNcMArzuoHlzx9jZaS/7OrBmzrr11EPkzHu6vKirIbGo0YLgybo7shxc4A6qus.mA0RSvhl.mjs](https://framerusercontent.com/sites/45hQNNcMArzuoHlzx9jZaS/7OrBmzrr11EPkzHu6vKirIbGo0YLgybo7shxc4A6qus.mA0RSvhl.mjs).
- MONOLOG HTML: [https://bymonolog.com/](https://bymonolog.com/); CSS [https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/css/bym0n0l0g.webflow.shared.1ee2b3b31.min.css](https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/css/bym0n0l0g.webflow.shared.1ee2b3b31.min.css).
- Lama HTML: [https://lamalama.com/](https://lamalama.com/); CSS [https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/main-xY9fs9fO.css?ver=7.1](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/main-xY9fs9fO.css?ver=7.1); app [https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/app-B43p2XC9.js](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/app-B43p2XC9.js).

## Evidence and boundaries

Temporary source snapshots, route snapshots, and extraction manifests from the research session are not included in this repository. The public origin URLs and module references are cited above and on the website pages; versioned assets may change or become unavailable. Source bundles are minified, so quoted selectors/function names are more useful retrieval anchors than line numbers. Every inventoried route is itself a primary source, although live content may have changed since inspection.

Screenshots are direct captures from the live research session. No image-generation or remote-media downloads were used, and no font binary downloads were necessary. Some animations, particularly pointer effects and mobile touch handling, were explained from inspected implementation instead of claiming they were all exercised. A font declaration does not establish actual rendered usage.

No forms were submitted, bookings made, external AI prompts sent, purchases performed or camera access granted. No Lighthouse or other performance benchmark was run. This research does not certify color-contrast compliance, screen-reader usability, keyboard coverage, reduced-motion compliance, or that every interaction is usable in every browser or viewport. Real-device Safari/Chrome, sustained long-press, full keyboard traversal, slow-network loading and measured frame rate remain outside this review.

## Route inventory

65 public URL requests completed on **2026-09-16**: **8 Ace, 8 MONOLOG, and 49 Lama Lama routes**, including every English Lama case URL in its sitemap (41 URLs, 40 unique destinations). Every request ended at HTTP 200; that does **not** mean every page is complete. One redirect and several empty/incomplete content templates were found. This inventory describes delivered markup and selectively inspected public component code, not live interaction tests.

### Most consequential findings

- **Ace /works is an empty page component.** The public page bundle creates only a black 1200×1080 div and overlay, with no children. This is stronger than a missing server-rendered text observation. [Page](https://acedesign.io/works), [actual page module](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/_-O8gR8c1zsCDA1oDTiG4BjqGVGy94EE8kathG9Ceps.B_MKTn7O.mjs).
- **Ace /laboratorium is not an experiment gallery.** It is a personal-profile layout: headline, avatar, biography, social links, employment timeline and email CTA. Its content/style differ materially from the main studio site. It may be residual/template content; the source alone cannot establish intent or verify the claimed career history. [Page](https://acedesign.io/laboratorium).
- **MONOLOG's seven case URLs deliver the same generic old-looking shell.** Each has title “MONOLOG,” no case heading/body, a navigation/footer with 2025 copyright, different positioning/contact copy, and the same text. These are incomplete-looking responses despite HTTP 200, not confirmed 404s. Client hydration can alter source responses; the [MONOLOG review](/docs/monolog/#website-review) records a live confirmation for one case, not all seven.
- **Lama /contact has a camera playground.** It obtains a front-facing webcam stream on activation, textures it into the branded WebGL grid, offers grid-size and dark/light controls, and stops camera tracks when reverting. This was source inspected only. [Contact](https://lamalama.com/contact/).
- **Lama /ai is sparse.** Main page content is an AI heading followed by the standard contact/footer, with no substantive AI service content in the delivered markup. [Page](https://lamalama.com/ai/).
- **Lama Cubby case contains lorem ipsum.** Its case introduction is placeholder Latin. [Case](https://lamalama.com/cases/cubby/).
- **Lama has duplicate sitemap destinations.** `/cases/10-10/` redirects to `/cases/10-out-of-10/`; both appear in the source sitemap.

### Route findings by website

The complete request tables are on the corresponding website pages.

| Website   | Requests | Detailed findings                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| Ace       | 8        | [Routes and case templates](/docs/ace/#route-inventory)                              |
| MONOLOG   | 8        | [Archive and case responses](/docs/monolog/#route-inventory)                         |
| Lama Lama | 49       | [Main pages, services, and every English case URL](/docs/lama-lama/#route-inventory) |

Arkon's three main routes and Neue Montréal's one-page structure were inspected separately from these 65 requests. Their observations are on the [Arkon Digital](/docs/arkon-digital/) and [Neue Montréal](/docs/neue-montreal/) pages.

## Coverage limits and reading guidance

This is a public response/template and selectively inspected interaction-module inventory, not a report that all listed media or controls were exercised in a browser. HTTP 200 only proves a response was returned, not that content is complete or interactions work. The [individual website reviews](/docs/research-findings/#website-reviews) supply runtime evidence on main routes.

Third-party client sites, external portfolios/demos and transactional destinations were not exhaustively explored. Form submission, booking, purchases, camera permission, and client project functionality are outside this inventory. English routes were inventoried; alternate Dutch content was not exhaustively duplicated.

HTML snapshots sometimes contain repeated text for responsive variants, animated hover layers or accessibility/display copies. Those source repetitions were not classified as visual duplication defects. Similarity of case templates is intentional system reuse; the substantive concerns are empty/sparse content, placeholder prose, or navigation to a generic shell. Where case copy describes a client tool or creative system, the description is not evidence that the tool can be operated on Lama's case page.

Use the source findings as an investigation map and explanatory evidence alongside the live observations. Where a feature was only identified in markup, retain that distinction when reading or reusing the research.
