---
title: "Study title"
description: "The question this study examines and why it matters."
date: "YYYY-MM-DD"
kind: "study"
draft: true
tags: []
sites: []
# Optional: cover: "/research/study-slug/screenshots/cover.jpg"
---

<!--
Copy this file to content/docs/<study-slug>.md.
Replace every placeholder, set a valid research date, and add site URLs to sites.
Put evidence assets in public/research/<study-slug>/.
Keep one document per website, combining its findings and supporting evidence.
The root content/docs/meta.json includes new pages automatically.
Keep draft: true until the study is ready; then set it to false or remove it.
The page template renders the frontmatter title, so do not add a duplicate h1.
-->

Research conducted [date or date range].

[State the research question, the sites or product being examined, and the reason for choosing them.]

## Scope and method

- **Pages and states:** [What was inspected, including secondary routes.]
- **Viewports and devices:** [Exact CSS-pixel sizes; distinguish browser emulation from physical-device testing.]
- **Inputs exercised:** [Pointer, keyboard, touch, or other inputs actually tested.]
- **Outside scope:** [Untested actions, inaccessible states, and limits.]

Label the evidence for each finding: **Observed**, **Source-confirmed**, **Hook only**, or **Interpretation**. A source declaration or loaded library does not establish that a feature was active.

## Main findings

[Explain the important decisions and their effects. Keep measured results, site claims, and your interpretation distinct.]

| Finding            | Evidence                                  | Implication                        |
| ------------------ | ----------------------------------------- | ---------------------------------- |
| [Specific finding] | [Category, state or viewport, and source] | [What it means for the experience] |

## Visual system

[Describe type roles, hierarchy, color roles, spacing, content measure, imagery, and recurring components. Include exact values only when measured or source-supported.]

## Interaction and navigation

| Trigger            | Response                                  | Evidence                       | Assessment                      |
| ------------------ | ----------------------------------------- | ------------------------------ | ------------------------------- |
| [Action performed] | [Result observed or implementation found] | [Evidence category and source] | [What works or needs attention] |

## Responsive behavior

[Compare the tested widths and input modes. Record overflow, reading order, hidden content, changed navigation, and differences between controls and labels.]

<!-- Example image syntax after the asset exists:
![Describe the observed state](/research/study-slug/screenshots/example.jpg)
Follow it with the site, capture date, viewport, and finding it illustrates.
-->

## Lessons to carry forward

[Explain the transferable design principles and when they would apply. Avoid treating one site's aesthetic as a universal solution.]

## Sources and remaining questions

[Link the exact pages and public assets used. Identify what was unavailable, inferred, or left untested. If measurements are supplied, explain what the raw data includes.]

## Updates

[Date each follow-up. Preserve the distinction between the original session and later observations.]
