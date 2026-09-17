---
title: "Methodology"
description: "How this collection separates observations, source evidence, and design interpretation."
sites:
  [
    "https://acedesign.io/",
    "https://arkon.digital/",
    "https://neuemontreal.com/",
    "https://bymonolog.com/",
    "https://lamalama.com/",
  ]
---

The reports examine websites as designed products: what they communicate, how the visual system supports that purpose, what interaction adds, and where the experience becomes harder to use.

## Evidence categories

| Category             | What it establishes                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Observed**         | A live page was inspected or the named control was exercised. The report records the tested state and viewport where relevant.                          |
| **Source-confirmed** | Public HTML, CSS, or JavaScript supports a specific configuration or implementation. Source presence alone does not establish visible runtime behavior. |
| **Hook only**        | Markup suggests an interaction, but its custom implementation or outcome was not confirmed.                                                             |
| **Interpretation**   | A qualitative assessment of creative direction, hierarchy, or usability. It is not a measured business result.                                          |

The source audit makes an additional distinction: **configured** means a component invocation or page markup is present; **implemented** means the matching handler or component was inspected. A library appearing in a bundle is not sufficient evidence that a feature is active.

## What the first study covered

The [research across five websites](/docs/research-findings/) was conducted on September 15–16, 2026. All five homepages were explored through their major sections, along with navigation, menus, galleries, accordions, and representative secondary templates.

Desktop inspection chiefly used 1280×720 and 1440px-wide views, with some larger-window observations. Typography samples used 1440×1000 desktop and 390×844 mobile viewports. Mobile inspection used responsive browser views with pointer and keyboard input; it was not physical iPhone or Android testing.

The separate [route inventory](/docs/research-findings/#route-inventory) records 65 public response checks across Ace, MONOLOG, and Lama Lama. These establish response and template findings, with selected interaction modules inspected. They do not represent 65 complete browser interaction audits. An HTTP 200 response does not establish that a page is complete.

## Reading measurements and screenshots

Typography measurements are computed CSS values, not estimates from screenshots. The [raw samples](/research/five-websites/typography-measurements.json) also contain offscreen elements and animation wrappers. Use the curated tables in the [shared typography findings](/docs/research-findings/#measured-type-hierarchy) for the visible roles discussed there.

A screenshot captures one state of a moving composition. It does not establish an animation's complete behavior. Likewise, changing frames alone do not prove pointer response. Reading-order assessments are based on size, placement, contrast, and motion; no eye-tracking study was conducted.

## Scope and limits

The first study did not submit forms, make bookings or purchases, send AI prompts, or grant camera access. External client sites, every media item, alternate-language routes, and every control state were not exhaustively tested.

There was no private repository access, Lighthouse benchmark, conversion measurement, or full accessibility certification. Performance and business figures quoted from a website remain that website's claims unless the report explicitly establishes otherwise.

The published evidence consists of the reports, 21 screenshots, computed-style samples, and inline public-source references. Temporary source captures and extraction manifests are not included. Versioned public asset URLs and live pages may change or disappear after the research date.

## Keeping later research clear

Each new entry should identify its research date, scope, tested viewports, evidence categories, sources, and unresolved questions. Keep an observed defect separate from a source-only concern, and preserve uncertainty when an interaction could not be exercised. New observations should carry their own date rather than silently changing what an earlier session established.
