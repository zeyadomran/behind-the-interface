// Dated research data from content/docs/<site>.md.
// Typography is the complete curated table for each site: computed CSS pixels at
// 1440x1000 desktop and 390x844 mobile, not an exhaustive design-token inventory.
// Interaction evidence retains each study's recorded scope and date.

export type SiteKey =
  "ace" | "arkon-digital" | "neue-montreal" | "monolog" | "lama-lama" | "noho";

// Preserve the scope of the original September 15–16 comparison.
export const comparisonSites: SiteKey[] = [
  "ace",
  "arkon-digital",
  "neue-montreal",
  "monolog",
  "lama-lama",
];
export const originalResearchDate = "September 15–16, 2026";

export interface TypeRole {
  label: string;
  family: string;
  desktop: { size: number; lineHeight: number | "normal" };
  mobile: { size: number | null; lineHeight: number | "normal" | null };
  note: string;
}

export interface InteractionFinding {
  label: string;
  trigger: string;
  response: string;
  evidence: "observed" | "source-confirmed" | "hook-only" | "mixed";
  detail: string;
}

export interface ArticleVisualData {
  name: string;
  researchDate?: string;
  screenshots: {
    desktop: { src: string; alt: string };
    mobile: { src: string; alt: string };
  };
  typography: TypeRole[];
  interactions: InteractionFinding[];
}

export const articleVisualData: Record<SiteKey, ArticleVisualData> = {
  noho: {
    name: "Noho",
    researchDate: "September 20, 2026",
    screenshots: {
      desktop: {
        src: "/research/noho/screenshots/noho-desktop.jpg",
        alt: "Noho at 1440 × 1000: large type and a staggered furniture image grid share a split hero.",
      },
      mobile: {
        src: "/research/noho/screenshots/noho-mobile.jpg",
        alt: "Noho at 390 × 844: the energy control sits in the header, with large type above the image grid.",
      },
    },
    typography: [
      {
        label: "Noho hero",
        family: "Switzer 600",
        desktop: { size: 60.048, lineHeight: 60.048 },
        mobile: { size: 60.6684, lineHeight: 57.635 },
        note: "Keeps the headline large while changing its line breaks and composition",
      },
      {
        label: "Noho section heading",
        family: "Switzer 600",
        desktop: { size: 60.048, lineHeight: 60.048 },
        mobile: { size: 51.9987, lineHeight: 49.3988 },
        note: "Gives section openings a smaller but still emphatic mobile scale",
      },
      {
        label: "Noho supporting line",
        family: "Switzer 400",
        desktop: { size: 18.72, lineHeight: 18.72 },
        mobile: { size: 16.2513, lineHeight: 16.2513 },
        note: "Preserves a quieter reading voice below the headline",
      },
      {
        label: "Noho energy note",
        family: "Switzer 400",
        desktop: { size: 10.512, lineHeight: 10.512 },
        mobile: { size: 16.2513, lineHeight: 16.2513 },
        note: "Enlarges explanatory utility text in the narrow energy panel",
      },
    ],
    interactions: [
      {
        label: "Energy controls",
        trigger: "Open Energy usage and select its two switches.",
        response:
          "Dark mode changes the palette; selecting both preferences changes the displayed rating to Low.",
        evidence: "observed",
        detail:
          "Pointer controls and preference persistence were exercised. Battery savings and complete animation suppression were not measured.",
      },
      {
        label: "Concept disclosure",
        trigger: "Select Buy on the first product.",
        response:
          "A centered overlay identifies the site as a design concept and credits the brand imagery.",
        evidence: "observed",
        detail:
          "No purchase was made. The tested action opened a disclosure, not a checkout.",
      },
      {
        label: "Reduction storage",
        trigger: "Toggle the manual reduced-animation preference.",
        response:
          "The public bundle stores nohoReduceAnimations and invokes registered reduction or restoration handlers.",
        evidence: "source-confirmed",
        detail:
          "The handler was inspected; operating-system preference support and renderer power consumption remain untested.",
      },
    ],
  },
  ace: {
    name: "Ace",
    screenshots: {
      desktop: {
        src: "/research/five-websites/screenshots/ace-desktop.jpg",
        alt: "Ace desktop homepage with a fixed studio rail and scrolling project content.",
      },
      mobile: {
        src: "/research/five-websites/screenshots/ace-mobile.jpg",
        alt: "Ace at a 390px viewport, showing the clipped introductory text.",
      },
    },
    typography: [
      {
        label: "Ace service headlines",
        family: "Anton 400",
        desktop: {
          size: 40,
          lineHeight: 42,
        },
        mobile: {
          size: 40,
          lineHeight: 42,
        },
        note: "Keeps the same emphatic type size; changes arrangement rather than scale",
      },
      {
        label: "Ace explanatory heading",
        family: "GT America Regular 400",
        desktop: {
          size: 16,
          lineHeight: 22.4,
        },
        mobile: {
          size: 16,
          lineHeight: 22.4,
        },
        note: "Reading size stays sensible, but the retained 640px box clips on mobile",
      },
      {
        label: "Ace fixed-rail prose",
        family: "GT America Light 300",
        desktop: {
          size: 14,
          lineHeight: 21,
        },
        mobile: {
          size: null,
          lineHeight: null,
        },
        note: "Quiet supporting context beside the dominant work stream",
      },
      {
        label: "Ace chapter labels",
        family: "GT America Mono Light 300",
        desktop: {
          size: 12,
          lineHeight: 12,
        },
        mobile: {
          size: 12,
          lineHeight: 12,
        },
        note: "+.1em spacing makes small labels feel like technical annotations",
      },
    ],
    interactions: [
      {
        label: "Principle row",
        trigger: "Move the pointer over a principle.",
        response: "The full row becomes lime with dark text.",
        evidence: "observed",
        detail:
          "The live hover state supplied immediate emphasis across the whole row.",
      },
      {
        label: "Project image",
        trigger: "Hover the Scout project image.",
        response:
          "The inner image reaches a 1.05 scale; leaving releases the hover state.",
        evidence: "observed",
        detail:
          "The outer card stayed in its grid position, so the image response did not rearrange the reading order.",
      },
      {
        label: "Globe seal",
        trigger: "Hover the rotating globe seal.",
        response:
          "The configured hover boost doubles globe speed while the text ring rotates independently.",
        evidence: "mixed",
        detail:
          "Rotation was observed. Acceleration is supported by the inspected component and hoverBoost:100 setting, not a separately verified live speed measurement.",
      },
      {
        label: "Portrait pixelation",
        trigger: "Move over or touch the footer portrait.",
        response:
          "The implementation switches the opacity of a pixelated canvas layer above the image.",
        evidence: "source-confirmed",
        detail:
          "The actual component uses an 80px pixel size and a 500ms delay when clearing touch state. These are code settings; physical-device touch behavior was not tested.",
      },
    ],
  },
  "arkon-digital": {
    name: "Arkon Digital",
    screenshots: {
      desktop: {
        src: "/research/five-websites/screenshots/arkon-desktop.jpg",
        alt: "Arkon Digital desktop homepage with a central 3D sphere, large role title, and biography.",
      },
      mobile: {
        src: "/research/five-websites/screenshots/arkon-mobile.jpg",
        alt: "Arkon Digital mobile homepage with white biography text crossing the bright 3D scene.",
      },
    },
    typography: [
      {
        label: "Arkon “Creative”",
        family: "Bonheur Royale 400",
        desktop: {
          size: 161.54,
          lineHeight: 80,
        },
        mobile: {
          size: 121.15,
          lineHeight: 80,
        },
        note: "Script ascenders/descenders visually interlock with the following line",
      },
      {
        label: "Arkon “Developer”",
        family: "Bebas Neue 400",
        desktop: {
          size: 107.69,
          lineHeight: 107.69,
        },
        mobile: {
          size: 80.77,
          lineHeight: 80.77,
        },
        note: "Condensed capitals keep a forceful title within limited width",
      },
      {
        label: "Arkon biography",
        family: "JetBrains Mono 400",
        desktop: {
          size: 12,
          lineHeight: "normal",
        },
        mobile: {
          size: 12,
          lineHeight: "normal",
        },
        note: "The explanatory text remains small even when the mobile navigation grows",
      },
      {
        label: "Arkon navigation",
        family: "JetBrains Mono 300, active/hover emphasis",
        desktop: {
          size: 12,
          lineHeight: 16.8,
        },
        mobile: {
          size: 16,
          lineHeight: 22.4,
        },
        note: "Mobile route links are easier to target/read than the biography",
      },
    ],
    interactions: [
      {
        label: "Shared scene",
        trigger: "Navigate from Home to Projects or Services.",
        response:
          "The solid sphere yields to particles and the composition shifts.",
        evidence: "mixed",
        detail:
          "The route transition was observed and its implementation inspected. The 1.5s particle transformation is a configured duration, not a performance benchmark.",
      },
      {
        label: "Project gallery",
        trigger: "Click a secondary Modern Interior thumbnail.",
        response: "The selected thumbnail replaces the large project image.",
        evidence: "observed",
        detail:
          "This specific thumbnail change was exercised live. The separate external Live Demo sites were outside the audit.",
      },
      {
        label: "Primary action",
        trigger: "Hover View My Work.",
        response: "The CTA scales to 1.05.",
        evidence: "mixed",
        detail:
          "The 1.05 scale was measured in the live follow-up and is also present in the inspected hover styles.",
      },
      {
        label: "Pointer lighting",
        trigger: "Move the pointer across the scene.",
        response:
          "The scene implementation interpolates the spotlight target from pointer movement.",
        evidence: "source-confirmed",
        detail:
          "Ambient animation made frame comparisons insufficient to isolate this effect. The lighting response remains supported by code, not a separately proven visual observation.",
      },
    ],
  },
  "neue-montreal": {
    name: "Neue Montréal",
    screenshots: {
      desktop: {
        src: "/research/five-websites/screenshots/neue-desktop.jpg",
        alt: "Neue Montréal desktop cover presenting the typeface as an editorial specimen.",
      },
      mobile: {
        src: "/research/five-websites/screenshots/neue-mobile.jpg",
        alt: "Neue Montréal mobile cover with its responsive type specimen composition.",
      },
    },
    typography: [
      {
        label: "Neue cover title",
        family: "PP Neue Montreal Bold 700",
        desktop: {
          size: 74.08,
          lineHeight: 66.67,
        },
        mobile: {
          size: 29.6,
          lineHeight: 26.64,
        },
        note: "Compact .9 leading makes the title a single graphic block",
      },
      {
        label: "Neue cover explanation / Story label",
        family: "PP Neue Montreal Text Regular 400",
        desktop: {
          size: 24,
          lineHeight: 24,
        },
        mobile: {
          size: 15,
          lineHeight: 15,
        },
        note: "Editorial density comes from 1.0 leading and −.03em tracking",
      },
    ],
    interactions: [
      {
        label: "Variable weights",
        trigger: "Scroll through the weight chapter.",
        response:
          "Display changes from Black to Hairline while Text becomes heavier.",
        evidence: "mixed",
        detail:
          "The change was observed. Source maps Display weight 900 to 100 and Text weight 200 to 700, completing at 0.7 of the configured scroll progress.",
      },
      {
        label: "City stories",
        trigger: "Click a colored city panel.",
        response: "The selected story opens while the other panels compress.",
        evidence: "observed",
        detail:
          "This combines a type specimen with editorial discovery. The mobile layout uses stacked vertical panels.",
      },
      {
        label: "Specimen controls",
        trigger: "Choose a weight or switch from Display to Text.",
        response:
          "The main specimen updates; switching families changes the available weights.",
        evidence: "observed",
        detail:
          "Weight selection and the Display-to-Text switch were exercised live. Purchasing and license transactions were not tested.",
      },
      {
        label: "Postcard tilt",
        trigger: "Move over a postcard, then leave it.",
        response:
          "The postcard tilts and enlarges toward the pointer; its return is implemented on pointer leave.",
        evidence: "mixed",
        detail:
          "Tilt and enlargement were observed in the follow-up. The return-to-zero behavior is source-confirmed. No separate click outcome was established.",
      },
    ],
  },
  monolog: {
    name: "MONOLOG",
    screenshots: {
      desktop: {
        src: "/research/five-websites/screenshots/monolog-desktop.jpg",
        alt: "MONOLOG desktop homepage with warm monochrome styling and restrained hero positioning.",
      },
      mobile: {
        src: "/research/five-websites/screenshots/monolog-mobile.jpg",
        alt: "MONOLOG mobile homepage with its scaled editorial typography.",
      },
    },
    typography: [
      {
        label: "MONOLOG hero positioning",
        family: "KHTeka 500",
        desktop: {
          size: 17.75,
          lineHeight: 19.53,
        },
        mobile: {
          size: 14.11,
          lineHeight: 15.52,
        },
        note: "Small centered statement lets the wordmark and atmosphere dominate",
      },
      {
        label: "MONOLOG founder statement",
        family: "KHTeka 700",
        desktop: {
          size: 45,
          lineHeight: 49.5,
        },
        mobile: {
          size: 25.31,
          lineHeight: 29.11,
        },
        note: "A stronger reading beat immediately after the restrained hero copy",
      },
      {
        label: "MONOLOG service names",
        family: "KHTeka 700",
        desktop: {
          size: 94,
          lineHeight: 94,
        },
        mobile: {
          size: 33.31,
          lineHeight: 33.31,
        },
        note: "Large scale supplies hierarchy; hover adds another emphasis layer",
      },
      {
        label: "MONOLOG process display",
        family: "Animo, computed weight 500",
        desktop: {
          size: 139.5,
          lineHeight: 125.55,
        },
        mobile: {
          size: 83.72,
          lineHeight: 75.35,
        },
        note: "A distinct display voice marks a new chapter; rendered glyphs can be transformed",
      },
    ],
    interactions: [
      {
        label: "Service preview",
        trigger: "Hover Website Design, then 3D Development.",
        response:
          "The active service brightens and its contextual preview changes.",
        evidence: "observed",
        detail:
          "Screenshots and computed opacity confirmed the response: the active item reached 1 while the other five sat at 0.3. The nearby testimonial progressed independently.",
      },
      {
        label: "About panel",
        trigger: "Open About, then press Escape.",
        response:
          "A cream biography panel overlays the page; Escape closes it.",
        evidence: "observed",
        detail:
          "Both opening and keyboard dismissal were exercised, with the underlying page context preserved.",
      },
      {
        label: "Footer experiment",
        trigger: "Move the pointer across the footer canvas.",
        response:
          "A Hold to disrupt prompt follows the pointer and leaves the canvas when the pointer moves to an AI icon.",
        evidence: "mixed",
        detail:
          "The instructional cursor was observed and matching markup found. Sustained-press distortion was incompletely exercised; its custom handler was unavailable.",
      },
      {
        label: "Values accordion",
        trigger: "Use a values-accordion control.",
        response:
          "Markup suggests a one-at-a-time disclosure with active and hover-highlight states.",
        evidence: "hook-only",
        detail:
          "The data-accordion-close-siblings hook was present, but the custom bundle was unavailable. The audit did not confirm the values accordion behavior live.",
      },
    ],
  },
  "lama-lama": {
    name: "Lama Lama",
    screenshots: {
      desktop: {
        src: "/research/five-websites/screenshots/lama-desktop.jpg",
        alt: "Lama Lama desktop homepage showing its agency typography and media-led composition.",
      },
      mobile: {
        src: "/research/five-websites/screenshots/lama-mobile.jpg",
        alt: "Lama Lama mobile homepage with its responsive agency layout.",
      },
    },
    typography: [
      {
        label: "Lama hero headline",
        family: "Suisse BP Intl 700",
        desktop: {
          size: 72,
          lineHeight: 57.6,
        },
        mobile: {
          size: 40,
          lineHeight: 32,
        },
        note: ".8 leading creates a dense, emphatic uppercase shape",
      },
      {
        label: "Lama hero explanation",
        family: "Suisse BP Intl 400",
        desktop: {
          size: 20.04,
          lineHeight: 24.05,
        },
        mobile: {
          size: 16,
          lineHeight: 19.2,
        },
        note: "Readable sentence rhythm contrasts with the tightly packed title",
      },
      {
        label: "Lama mono action labels",
        family: "Sometype 500",
        desktop: {
          size: 10,
          lineHeight: 18,
        },
        mobile: {
          size: 10,
          lineHeight: 18,
        },
        note: "Consistent instrument-like voice, but mobile labels remain very small",
      },
    ],
    interactions: [
      {
        label: "Work filter",
        trigger: "Select E-commerce in the work index.",
        response:
          "Matching rows, result count, and the query parameter update.",
        evidence: "mixed",
        detail:
          "The E-commerce filter was observed with six projects. Source confirms the selected type is stored in the URL and read on load.",
      },
      {
        label: "Awards access",
        trigger:
          "Hold the desktop awards image or select View our awards on mobile.",
        response:
          "Desktop code reveals awards while pressed; the mobile button opens a persistent description and table.",
        evidence: "mixed",
        detail:
          "The desktop handler was inspected, but a prolonged hold was not exercised. Mobile expansion was observed, including the plus changing to minus.",
      },
      {
        label: "Team portraits",
        trigger: "Hover Lisa Stegers, then Tim Koree.",
        response:
          "The portrait and active row change, with a personal caption near the pointer.",
        evidence: "mixed",
        detail:
          "The live follow-up observed both people and their different captions. Source also confirms hover can temporarily override the scroll-selected team member.",
      },
      {
        label: "Camera grid",
        trigger: "Activate the camera on the contact page.",
        response:
          "The implementation requests a front-facing camera stream and renders it through the branded grid.",
        evidence: "source-confirmed",
        detail:
          "Camera access was deliberately not activated. Source shows that reverting stops all stream tracks and clears the video source.",
      },
    ],
  },
};
