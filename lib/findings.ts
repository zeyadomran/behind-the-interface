import type { SiteKey } from "./article-visual-data";
import type { EvidenceKind } from "./evidence";

// Single, sourced sentences from the research documents. Each anchor points to
// the section that supports the claim; the static-build tests verify them.
export interface Finding {
  id: string;
  site: SiteKey;
  text: string;
  evidence: EvidenceKind;
  anchor: string;
}

export const findings: Finding[] = [
  {
    id: "ace-640px",
    site: "ace",
    text: "Ace’s mobile introduction keeps its 640px desktop width inside a 390px screen, so its sentences are cut off mid-line.",
    evidence: "observed",
    anchor: "mobile-changes-and-issues",
  },
  {
    id: "monolog-opacity",
    site: "monolog",
    text: "Hover a MONOLOG service and it stays at full opacity while the other five drop to 0.3, tying the name to its preview.",
    evidence: "observed",
    anchor: "type-and-local-hierarchy",
  },
  {
    id: "neue-weights",
    site: "neue-montreal",
    text: "Neue Montréal’s weight chapter maps Display 900 → 100 against Text 200 → 700, and finishes at 70% of its scroll.",
    evidence: "mixed",
    anchor: "verified-custom-motion-and-interaction",
  },
  {
    id: "lama-filter-url",
    site: "lama-lama",
    text: "Lama Lama’s work filter writes ?type=e-commerce into the address, so a filtered view of six projects can be shared.",
    evidence: "mixed",
    anchor: "page-sequence-and-secondary-templates",
  },
  {
    id: "arkon-13x",
    site: "arkon-digital",
    text: "Arkon’s “Creative” script measures about 162px. The biography beside it is 12px: a thirteen-fold jump.",
    evidence: "observed",
    anchor: "type-and-hierarchy",
  },
  {
    id: "noho-energy-note",
    site: "noho",
    text: "Noho’s energy note grows on mobile, from 10.5px to 16.3px. Utility text gets its own responsive rule.",
    evidence: "observed",
    anchor: "typography-and-pointer-behavior",
  },
  {
    id: "monolog-shells",
    site: "monolog",
    text: "All seven /projects/ pages in MONOLOG’s sitemap returned the same generic shell in source; one was confirmed live without a case study.",
    evidence: "mixed",
    anchor: "route-inventory",
  },
  {
    id: "lama-escape",
    site: "lama-lama",
    text: "Lama Lama’s ten-slide pitch deck closes with its X, but Escape did not close it in the tested desktop state.",
    evidence: "observed",
    anchor: "hidden-interfaces-and-motion",
  },
  {
    id: "ace-image-zoom",
    site: "ace",
    text: "Hovering an Ace project image settles it at 1.05 scale while its card stays put, so the response never reflows the grid.",
    evidence: "observed",
    anchor: "newly-tested-pointer-details",
  },
  {
    id: "arkon-zoom",
    site: "arkon-digital",
    text: "Arkon’s viewport tag sets user-scalable=no and maximum-scale=1, which restricts pinch zoom.",
    evidence: "source-confirmed",
    anchor: "typography-layout-and-color",
  },
  {
    id: "noho-hero",
    site: "noho",
    text: "Noho’s hero is 60.05px on desktop and 60.67px on mobile. The composition adapts; the headline barely changes.",
    evidence: "observed",
    anchor: "attention-and-reading-order",
  },
  {
    id: "neue-orbit",
    site: "neue-montreal",
    text: "Neue Montréal’s orbiting images have no drag handlers. They rotate once every 40 seconds and pause offscreen.",
    evidence: "source-confirmed",
    anchor: "verified-custom-motion-and-interaction",
  },
  {
    id: "monolog-ai-links",
    site: "monolog",
    text: "MONOLOG’s footer links to five AI assistants with a prompt asking each to evaluate the studio as a partner.",
    evidence: "observed",
    anchor: "interaction-and-motion-inventory",
  },
  {
    id: "lama-awards",
    site: "lama-lama",
    text: "On desktop, Lama Lama’s awards appear only while you hold the mouse down. On mobile, a button keeps them open to read.",
    evidence: "mixed",
    anchor: "newly-tested-pointer-details",
  },
  {
    id: "ace-menu-routes",
    site: "ace",
    text: "In Ace’s mobile menu, Works led to /notes and the Lab link pointed to /404.",
    evidence: "observed",
    anchor: "mobile-changes-and-issues",
  },
  {
    id: "noho-concept",
    site: "noho",
    text: "Noho’s first Buy button opens a disclosure that identifies the whole site as a design concept.",
    evidence: "observed",
    anchor: "page-sequence-and-intent",
  },
  {
    id: "arkon-scene",
    site: "arkon-digital",
    text: "Arkon keeps one 3D scene across routes: the sphere becomes particles over a configured 1.5-second morph.",
    evidence: "mixed",
    anchor: "actual-interaction-architecture",
  },
  {
    id: "monolog-accordion",
    site: "monolog",
    text: "MONOLOG’s markup suggests a one-at-a-time values accordion, but its script refused direct access, so the behavior stays unconfirmed.",
    evidence: "hook-only",
    anchor: "interaction-and-motion-inventory",
  },
  {
    id: "lama-cubby",
    site: "lama-lama",
    text: "Lama Lama’s Cubby case study opens its main narrative with lorem ipsum.",
    evidence: "source-confirmed",
    anchor: "page-sequence-and-secondary-templates",
  },
  {
    id: "neue-mobile-nav",
    site: "neue-montreal",
    text: "On a roughly 17,000px mobile page, Neue Montréal’s chapter navigation disappears, and no replacement section menu was found.",
    evidence: "observed",
    anchor: "mobile-changes-and-issues",
  },
  {
    id: "noho-switches",
    site: "noho",
    text: "Noho’s energy switches are clickable sections with tabIndex −1: they work with a pointer but lack native keyboard semantics.",
    evidence: "observed",
    anchor: "attention-and-reading-order",
  },
  {
    id: "monolog-filter-count",
    site: "monolog",
    text: "Filtering MONOLOG’s work to Brand Strategy left two projects, while the large count still read “07.”",
    evidence: "observed",
    anchor: "narrative-and-secondary-surfaces",
  },
  {
    id: "lama-labels",
    site: "lama-lama",
    text: "Lama Lama’s mono action labels are 10px on desktop and still 10px on a 390px phone.",
    evidence: "observed",
    anchor: "type-and-information-density",
  },
  {
    id: "ace-ascii",
    site: "ace",
    text: "Ace’s ASCII artwork is configured with Floyd dithering, the characters @%#*+=-:. and a 12px mono grid.",
    evidence: "source-confirmed",
    anchor: "verified-hidden-interaction-implementations",
  },
];
