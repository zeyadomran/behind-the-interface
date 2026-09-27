import type { SiteKey } from "./article-visual-data";
import type { EvidenceKind } from "./evidence";

// Compact, sourced summaries for navigation and at-a-glance comparison.
// The five original rows come from the research findings style map and
// desktop-to-mobile table; Noho's row summarizes its own September 20 study.
// Capture notes point at features the research discusses. Coordinates are
// percentages of the recorded desktop screenshot.

export interface CaptureNote {
  x: number;
  y: number;
  title: string;
  note: string;
  evidence: EvidenceKind;
}

export interface StudyProfile {
  slug: SiteKey;
  style: string;
  idea: string;
  borrow: string;
  tension: string;
  mobileShift: { label: string; text: string }[];
  captureNotes: CaptureNote[];
}

export const studyProfiles: Record<SiteKey, StudyProfile> = {
  ace: {
    slug: "ace",
    style: "Technical editorial, dark studio, ASCII and lime",
    idea: "Precision, systems and small-team expertise",
    borrow: "A quiet technical identity and a persistent conversion rail",
    tension: "Mobile execution and inconsistent navigation",
    mobileShift: [
      {
        label: "Navigation",
        text: "Full nav and CTAs become a logo and a partial-height menu.",
      },
      {
        label: "Composition",
        text: "The fixed rail is removed; cards and stats stack.",
      },
      {
        label: "Interaction",
        text: "The menu exposes extra routes; case metadata gets disclosures in source.",
      },
      {
        label: "Watch for",
        text: "The 640px introduction clips at 390px, and Works misroutes.",
      },
    ],
    captureNotes: [
      {
        x: 48.9,
        y: 14.1,
        title: "Lime marks the way in",
        note: "Only the first service phrase is lime. In this review's reading order, it is the entry point ahead of the white statements beside it.",
        evidence: "interpretation",
      },
      {
        x: 19.4,
        y: 27.9,
        title: "A seal that speeds up",
        note: "The rotating globe reads “Product experience for AI-native teams.” Rotation was seen live; source sets hoverBoost:100, doubling its speed on hover.",
        evidence: "mixed",
      },
      {
        x: 19.3,
        y: 83,
        title: "The fixed rail",
        note: "Roughly two-fifths of the desktop stays put: a short introduction plus Get Started and Read Notes, beside the scrolling work.",
        evidence: "observed",
      },
      {
        x: 66,
        y: 76.5,
        title: "Counters that settle",
        note: "The stats count up and stop at 3, 56, $20B+ and 150+. The count-up was observed and configured in source; the figures are the site’s own claims.",
        evidence: "mixed",
      },
    ],
  },
  "arkon-digital": {
    slug: "arkon-digital",
    style: "Cinematic creative coding, iridescent 3D, terminal type",
    idea: "The site itself demonstrates the developer’s craft",
    borrow: "A persistent 3D scene that connects every route",
    tension: "Spectacle competes with text, especially on mobile",
    mobileShift: [
      {
        label: "Navigation",
        text: "The three route links stay visible instead of collapsing.",
      },
      {
        label: "Composition",
        text: "The title moves up, the biography moves down, the sphere stays central.",
      },
      {
        label: "Interaction",
        text: "Gallery controls persist; previous and next get smaller.",
      },
      {
        label: "Watch for",
        text: "Unstable text contrast over the sphere, and a zoom restriction.",
      },
    ],
    captureNotes: [
      {
        x: 19.1,
        y: 41,
        title: "A 162px script",
        note: "“Creative” is Bonheur Royale at about 162px on an 80px line box, so it locks into “DEVELOPER.” below it.",
        evidence: "observed",
      },
      {
        x: 50,
        y: 50,
        title: "One scene, three routes",
        note: "The shader sphere lives in a persistent React Three Fiber scene. On Projects and Services it becomes a particle cloud.",
        evidence: "mixed",
      },
      {
        x: 79,
        y: 44.5,
        title: "A 12px biography",
        note: "The paragraph that explains who this is measures 12px in JetBrains Mono: about a thirteenth of the script’s size.",
        evidence: "observed",
      },
      {
        x: 72.5,
        y: 60,
        title: "A 1.05 nudge",
        note: "View My Work scaled to 1.05 on hover in the live follow-up, matching the hover styles in source.",
        evidence: "mixed",
      },
      {
        x: 7.7,
        y: 95,
        title: "Time in the margins",
        note: "Hong Kong time sits in the corner. Source updates the clock every 60 seconds.",
        evidence: "mixed",
      },
    ],
  },
  "neue-montreal": {
    slug: "neue-montreal",
    style: "Swiss editorial, printed travel guide, type exhibition",
    idea: "The typeface becomes the content and the interaction",
    borrow: "Product-led motion and long-form art direction",
    tension: "A very long journey, and custom-control accessibility",
    mobileShift: [
      {
        label: "Navigation",
        text: "The central chapter pill disappears; the purchase button stays.",
      },
      {
        label: "Composition",
        text: "A long vertical specimen; circles stack; some comparisons stay paired.",
      },
      {
        label: "Interaction",
        text: "The city accordion becomes horizontal rows; tilt is greatly reduced.",
      },
      {
        label: "Watch for",
        text: "Orientation on a very long page, and custom-control semantics.",
      },
    ],
    captureNotes: [
      {
        x: 49.4,
        y: 4.9,
        title: "Chapters in a pill",
        note: "Desktop navigation is a central pill of chapters: Story, In use, Weights and more. At mobile width it disappears.",
        evidence: "observed",
      },
      {
        x: 20,
        y: 19,
        title: "An overlap at 1280px",
        note: "At 1280×720 the cover’s introduction and rules overlapped on repeat visits. At 1440×1000 it resolved; the cause wasn’t diagnosed.",
        evidence: "observed",
      },
      {
        x: 45,
        y: 62,
        title: "The name is the specimen",
        note: "The product name fills the cover, so the typeface introduces itself before any explanation does.",
        evidence: "interpretation",
      },
      {
        x: 90.5,
        y: 4.9,
        title: "Purchase, always in reach",
        note: "Get PP Neue Montreal stays visible while you explore. On hover, its letters roll upward one by one.",
        evidence: "observed",
      },
    ],
  },
  monolog: {
    slug: "monolog",
    style: "Warm monochrome, brutalist editorial, cinematic texture",
    idea: "A premium independent partner with a personal point of view",
    borrow: "Sales narrative, work presentation and founder presence",
    tension: "Secondary-page completeness and experimental discoverability",
    mobileShift: [
      {
        label: "Navigation",
        text: "Adds a Menu button; Start a project remains in the header.",
      },
      {
        label: "Composition",
        text: "A tall hero; the About panel fills the full width.",
      },
      {
        label: "Interaction",
        text: "Large menu links and a full-width biography.",
      },
      {
        label: "Watch for",
        text: "Placeholder menu cards and incomplete published case routes.",
      },
    ],
    captureNotes: [
      {
        x: 49.4,
        y: 25.7,
        title: "Atmosphere first",
        note: "A wireframe torus floats over grain and halftone. The hero opens with texture before it makes an argument.",
        evidence: "observed",
      },
      {
        x: 49.4,
        y: 40.7,
        title: "A quiet h1",
        note: "The page’s h1 is this small statement: about 17.75px, centered in a box roughly 252px wide.",
        evidence: "observed",
      },
      {
        x: 26,
        y: 78,
        title: "The wordmark carries the weight",
        note: "The giant wordmark has the strongest visual presence, while the document’s main heading is the small statement above it.",
        evidence: "interpretation",
      },
      {
        x: 91.5,
        y: 5.3,
        title: "Start a project, everywhere",
        note: "The call to action stays in the header, and keeps its place on mobile beside Menu.",
        evidence: "observed",
      },
    ],
  },
  "lama-lama": {
    slug: "lama-lama",
    style: "Swiss agency system, pixel graphics, cinematic presentation",
    idea: "An expressive agency identity applied to every interface layer",
    borrow: "Coherent brand behavior and layered portfolio exploration",
    tension: "Many modes and controls increase the learning effort",
    mobileShift: [
      {
        label: "Navigation",
        text: "The compact menu expands to nearly the full width.",
      },
      {
        label: "Composition",
        text: "The hero stacks, work rows grow, services become horizontal cards.",
      },
      {
        label: "Interaction",
        text: "The inline case preview becomes a direct case page.",
      },
      {
        label: "Watch for",
        text: "Very small labels, and different exits for each layer.",
      },
    ],
    captureNotes: [
      {
        x: 50,
        y: 5.7,
        title: "A header that’s an object",
        note: "The menu is a compact floating panel, at most 438px wide, with the pixel logo and a phrase that changes with context.",
        evidence: "mixed",
      },
      {
        x: 28.9,
        y: 74.3,
        title: "A declaration in one block",
        note: "72px uppercase on 57.6px leading (0.8) packs the headline into a single dense shape.",
        evidence: "observed",
      },
      {
        x: 92.4,
        y: 27.8,
        title: "Floating utilities",
        note: "Get in touch and a portrait card float on the right. Neither appears in the first mobile view.",
        evidence: "observed",
      },
      {
        x: 8,
        y: 95.3,
        title: "10px labels",
        note: "Mono labels measure 10px on desktop and on mobile: consistent, and very small on a phone.",
        evidence: "observed",
      },
    ],
  },
  noho: {
    slug: "noho",
    style: "Warm product concept, playful photography, oversized type",
    idea: "A brand value becomes a choice inside the interface",
    borrow: "Visible preference controls and product-led imagery",
    tension: "Concept status, switch semantics and unmeasured claims",
    mobileShift: [
      {
        label: "Navigation",
        text: "The horizontal strip becomes a broad menu with product imagery.",
      },
      {
        label: "Composition",
        text: "The split hero becomes a text-first stack, photos below.",
      },
      {
        label: "Interaction",
        text: "Energy usage moves into the narrow top strip beside the burger.",
      },
      {
        label: "Watch for",
        text: "Touch, short screens and overlay exits remain untested.",
      },
    ],
    captureNotes: [
      {
        x: 18.4,
        y: 24,
        title: "Big type that stays big",
        note: "Switzer 600 at about 60px, tightly set. At 390px wide it stays about 60px; the line breaks change instead.",
        evidence: "observed",
      },
      {
        x: 75,
        y: 28.4,
        title: "Chairs with character",
        note: "People lift, wear and sit on the furniture. The photography shows personality before the copy explains it.",
        evidence: "interpretation",
      },
      {
        x: 96.6,
        y: 4.8,
        title: "A compact burger",
        note: "On desktop the burger opens a horizontal strip of section links. The energy controls live in their own panel.",
        evidence: "observed",
      },
      {
        x: 25,
        y: 65,
        title: "Quiet surfaces",
        note: "Warm off-white panels keep interface color out of the way, so the photographs supply it.",
        evidence: "interpretation",
      },
    ],
  },
};
