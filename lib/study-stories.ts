import type { SiteKey } from "./article-visual-data";

// Editorial paths through the existing September 15–16, 2026 research.
// These stories summarize that dated evidence; they are not fresh site audits.
export type StoryChapterId =
  "idea" | "type" | "motion" | "mobile" | "takeaways";

export interface StoryChapter {
  id: StoryChapterId;
  label: string;
  title: string;
  intro: string;
  paragraphs: string[];
  lesson: string;
  researchAnchor: string;
}

export interface StudyStory {
  slug: SiteKey;
  name: string;
  edition: string;
  title: string;
  subtitle: string;
  thesis: string;
  chapters: StoryChapter[];
  keep: string;
  question: string;
  closing: string;
}

export const studyStories: StudyStory[] = [
  {
    slug: "ace",
    name: "Ace",
    edition: "01",
    title: "Precision Lives in the Details",
    subtitle:
      "A technical studio identity built from narrow letters, quiet rules and a few well-placed signals.",
    thesis: "Small decisions can carry an entire identity.",
    chapters: [
      {
        id: "idea",
        label: "Idea",
        title: "Two lanes. One clear character.",
        intro:
          "Ace gives the desktop two jobs. A fixed rail holds the studio's identity and invitation to act, while the work unfolds beside it. Fine rules, corner marks and occasional lime connect those lanes into a precise visual language.",
        paragraphs: [
          "The dark palette alone is familiar. The specificity comes from how the pieces agree: technical annotations, outlined blocks, deliberately empty grid cells and images that supply most of the color.",
          "In the September 2026 review, that structure made the studio feel selective and composed. It also created two competing reading lanes, so the usefulness of the fixed context depends on keeping its message brief.",
        ],
        lesson:
          "Assign each part of the layout a job before giving it a style.",
        researchAnchor: "website-review",
      },
      {
        id: "type",
        label: "Type",
        title: "Statement, explanation, annotation.",
        intro:
          "The hierarchy has three voices. Condensed Anton makes the service statements decisive. GT America gives the explanation room to breathe. Mono labels supply a technical undertone, useful until a substantial piece of evidence gets treated like a footnote.",
        paragraphs: [
          "The service headlines measured 40px on both desktop and mobile. Their force comes from condensed uppercase forms and tight spacing as much as size. The explanation stays at a calmer 16px.",
          "Project names and categories sit on separate lines beneath images, making each card easy to parse. Long testimonials are less comfortable in small uppercase mono; the quotation deserves more reading priority than its attribution.",
        ],
        lesson:
          "Use different typographic voices for different kinds of information.",
        researchAnchor: "typography-and-pointer-behavior",
      },
      {
        id: "motion",
        label: "Motion",
        title: "A response at the right scale.",
        intro:
          "Ace's effects belong to its material language. The image can become characters, the portrait can become pixels, and the seal keeps turning. Beside those treatments, a lime button state or a small image zoom provides immediate, understandable feedback.",
        paragraphs: [
          "The review observed the Notes button turn lime and a project image settle at 1.05 scale while its card stayed in place. Neither response rearranged the page or interrupted the reading order.",
          "Public code confirmed the configured ASCII inversion, portrait pixelation and globe hover acceleration. Those details have stronger implementation evidence than visual test coverage; custom reduced-motion behavior was not established.",
        ],
        lesson:
          "Let a small interaction reinforce the material already on the page.",
        researchAnchor: "interaction-and-motion-inventory",
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "The type fits. Its box doesn't.",
        intro:
          "On mobile, Ace removes the fixed rail and stacks the work. But one inner constraint survives: the introduction still occupies a 640px box inside a 390px viewport. The clipped sentences expose the difference between rearranging a page and finishing its responsive design.",
        paragraphs: [
          "The measured text begins at x=24 and extends beyond the screen. Its 16px type is a reasonable reading size; the container width causes the failure. Fixing that constraint comes before changing the visual direction.",
          "The same review found Works leading to Notes in the mobile menu, a Lab link pointing to /404, and an empty direct Works route. A composed homepage still needs dependable destinations.",
        ],
        lesson:
          "Audit inner widths and navigation after the outer layout changes.",
        researchAnchor: "mobile-changes-and-issues",
      },
      {
        id: "takeaways",
        label: "Takeaways",
        title: "Carry the discipline all the way.",
        intro:
          "The useful reference is Ace's consistency: restrained color, technical texture and stable project framing. Borrow that discipline across the whole experience. A clipped paragraph or unexplained destination can undo the confidence established by many carefully aligned details.",
        paragraphs: [
          "Keep the fixed context where space supports it. On a smaller screen, provide a clear contact path near the work and let important proof use comfortable reading typography.",
          "These priorities come from the September 15–16, 2026 observations and public-source inspection. They describe this review's evidence, without making a conversion, performance or accessibility certification claim.",
        ],
        lesson: "Precision is the quality of the reading and navigation, too.",
        researchAnchor: "mobile-changes-and-issues",
      },
    ],
    keep: "Give context a stable place beside the work.",
    question: "Can every sentence and destination survive a narrow screen?",
    closing: "Take the restraint. Apply it to every edge of the experience.",
  },
  {
    slug: "arkon-digital",
    name: "Arkon Digital",
    edition: "02",
    title: "A Portfolio With Its Own Gravity",
    subtitle:
      "One persistent scene turns a developer's capability into something you can move through.",
    thesis: "The setting can demonstrate the skill.",
    chapters: [
      {
        id: "idea",
        label: "Idea",
        title: "Enter the demonstration.",
        intro:
          "A hovering sphere takes the center. A large role title stands to the left, a compact biography to the right, and small details occupy the edges. Arkon arranges a portfolio like an exhibition, with the work of creative development already happening in front of you.",
        paragraphs: [
          "The reflective ground and shifting color give the object a place to inhabit. The scene makes the claim of creative-development capability tangible before the visitor reads a project description.",
          "Its strongest structural decision is continuity. Projects and Services stay inside the same world, changing the object and composition as the visitor changes routes.",
        ],
        lesson:
          "Make the central idea demonstrate something you want the visitor to believe.",
        researchAnchor: "website-review",
      },
      {
        id: "type",
        label: "Type",
        title: "The title performs a duet.",
        intro:
          "Flowing script and compressed capitals divide the role into two distinct gestures: Creative and Developer. JetBrains Mono gives the surrounding facts a quieter technical voice. The contrast is memorable, but it leaves the practical explanation working at a much smaller scale.",
        paragraphs: [
          "At the measured desktop viewport, the script was about 162px, Developer about 108px and the biography 12px. The tight script line box lets the title interlock as a deliberate graphic composition.",
          "That hierarchy suits the exhibition idea, but the biography carries essential context. It needs its own clear reading space even when the title and sphere remain the main attraction.",
        ],
        lesson:
          "Strong contrast needs a readable bridge between the spectacle and the explanation.",
        researchAnchor: "typography-and-pointer-behavior",
      },
      {
        id: "motion",
        label: "Motion",
        title: "Change the scene, keep the world.",
        intro:
          "Navigation changes the composition instead of abandoning it. The solid sphere gives way to particles, and the scene shifts around the new content. This gives movement a structural role: it helps three routes feel like parts of one continuous portfolio.",
        paragraphs: [
          "The research observed the scene changes and exercised project thumbnails and Next Project. Familiar gallery controls anchor the more expressive environment in ordinary, understandable actions.",
          "Public code explains the React Three Fiber scene, pointer-linked spotlight and configured 1.5-second particle transformations. The lighting response was not isolated reliably in the visual test, and frame rate was not benchmarked.",
        ],
        lesson:
          "Use motion to explain the relationship between places in the interface.",
        researchAnchor: "actual-interaction-architecture",
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "Leave a quiet place to read.",
        intro:
          "The mobile composition moves the title upward and the biography downward, while the sphere keeps its central presence. That is a deliberate rearrangement. The trouble begins where white body text crosses the object's brightest surface and its contrast changes with the scene.",
        paragraphs: [
          "Navigation grows from 12px to 16px in the measured mobile view, but the biography stays at 12px. A stable background and a stronger reading size would protect the information without removing the object.",
          "The source also contained zoom-restricting viewport settings. The review recommends allowing zoom and testing reflow, plus checking the persistent scene on ordinary phones; it did not measure actual device performance.",
        ],
        lesson: "Reserve text-safe space inside an expressive composition.",
        researchAnchor: "mobile-changes-and-issues",
      },
      {
        id: "takeaways",
        label: "Takeaways",
        title: "Let the exhibit support the visit.",
        intro:
          "Arkon shows how a portfolio can make a skill visible through its own construction. The next design challenge is practical: help the visitor understand the offer, browse the work and reach the primary action while the scene remains the signature.",
        paragraphs: [
          "Keep the shared world and the contrasting title voices. Give the biography reliable contrast, distinguish service labels from controls, and check link semantics and keyboard activation alongside their visible hover treatment.",
          "This interpretation draws on the September 2026 main-site review. External Live Demo projects were outside the audit, so their advertised interactions are not additional proof of behavior tested here.",
        ],
        lesson:
          "A memorable setting works best when the visitor can still find the way.",
        researchAnchor: "mobile-changes-and-issues",
      },
    ],
    keep: "Use a shared scene to connect separate routes.",
    question: "Does the explanation remain readable at the brightest moment?",
    closing: "Build the world, then give the visitor a clear place within it.",
  },
  {
    slug: "neue-montreal",
    name: "Neue Montréal",
    edition: "03",
    title: "The Typeface Becomes the Journey",
    subtitle:
      "A travel guide turns font features into places to explore, compare and understand.",
    thesis: "The product can supply the story and its movement.",
    chapters: [
      {
        id: "idea",
        label: "Idea",
        title: "Open a specimen. Find a city.",
        intro:
          "Neue Montréal gives a type specimen the shape of a travel guide. A red cover leads into postcards, city stories, tickets and enormous letters. The editorial setting makes a long technical explanation feel like a sequence of discoveries with a shared destination.",
        paragraphs: [
          "The journey becomes progressively more specific: meet the family, explore its weights, compare optical styles, inspect glyphs and languages, then find the product. Each chapter answers a different question about the same typeface.",
          "Printed textures and saturated chapter colors keep that structure lively. The strongest idea is the connection between the story being told and the product doing the telling.",
        ],
        lesson:
          "Organize product education as a sequence of questions worth exploring.",
        researchAnchor: "website-review",
      },
      {
        id: "type",
        label: "Type",
        title: "The letters are the evidence.",
        intro:
          "PP Neue Montreal and its Text family carry both the interface and the demonstration. Huge specimens show character; ruled columns explain the family. The hierarchy changes through alignment, density and scale, giving the same product several different ways to introduce itself.",
        paragraphs: [
          "In the Story section, similarly sized columns remain legible because position and rules separate their roles. A new heading does not always need a louder size to be understood.",
          "The measured explanatory style uses tight 1.0 leading and negative tracking, producing a printed texture. That density belongs to this specimen's purpose; sustained prose elsewhere may need more breathing room.",
        ],
        lesson:
          "Use alignment and spacing to organize information before increasing its size.",
        researchAnchor: "typography-and-pointer-behavior",
      },
      {
        id: "motion",
        label: "Motion",
        title: "Make the feature change in view.",
        intro:
          "Scroll changes weight. A split character exposes differences between optical styles. Punctuation alternates between constructions. Here, movement makes a font property visible, giving visitors something more useful than a claim that the family is versatile: an opportunity to see what versatility means.",
        paragraphs: [
          "The configured scroll specimen moves Display from 900 to 100 while Text moves from 200 to 700. These are actual variable-font settings, so the interaction demonstrates the product's design space.",
          "Postcard tilt was observed, while source inspection explained its return behavior. The orbiting image component pauses offscreen and has no inspected drag handlers; its rotation should not be mistaken for a draggable gallery.",
        ],
        lesson:
          "Choose an interaction that reveals a property of the product itself.",
        researchAnchor: "verified-custom-motion-and-interaction",
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "Fold the guide a different way.",
        intro:
          "The city accordion keeps its color and weight concept while changing its geometry. Narrow vertical panels become stacked horizontal rows, making each place easier to select and read on a phone. The idea survives because its presentation is allowed to change.",
        paragraphs: [
          "The mobile Biosphere story opened successfully in the review. Ligature circles stack, postcard tilt is reduced, and selected comparisons remain paired because seeing both sides is part of their meaning.",
          "Orientation becomes the tradeoff: the central chapter navigation disappears on a page measured at roughly 17,000px tall. A compact chapter menu would support return visits as well as leisurely scrolling.",
        ],
        lesson:
          "Preserve the meaning of a comparison while changing how it fits and opens.",
        researchAnchor: "mobile-changes-and-issues",
      },
      {
        id: "takeaways",
        label: "Takeaways",
        title: "Make room for the return visit.",
        intro:
          "The first visit can be a journey. The second may be a search for one weight, comparison or glyph. Neue Montréal is a rich reference for serving both kinds of reader, provided exploration is paired with a direct route back to the useful detail.",
        paragraphs: [
          "Keep the travel-guide structure and motion that demonstrates the typeface. Add mobile chapter access and verify keyboard behavior, focus and selected states for the custom specimen controls.",
          "The September 2026 review captured cover overlap at 1280×720, while 1440×1000 resolved cleanly. That is a specific viewport finding with an undiagnosed cause, rather than a universal description of the cover.",
        ],
        lesson: "A good product story also works as a useful reference.",
        researchAnchor: "mobile-changes-and-issues",
      },
    ],
    keep: "Turn each product feature into something a visitor can inspect.",
    question:
      "Can a returning reader reach one specimen without repeating the journey?",
    closing:
      "Let the product tell the story, and give every chapter an address.",
  },
  {
    slug: "monolog",
    name: "MONOLOG",
    edition: "04",
    title: "A Conversation in Changing Light",
    subtitle:
      "Warm surfaces, personal context and a deliberate reading rhythm make a studio's offer feel human.",
    thesis: "Trust grows through the order of the story.",
    chapters: [
      {
        id: "idea",
        label: "Idea",
        title: "Let the introduction take its time.",
        intro:
          "MONOLOG opens with atmosphere and a restrained positioning statement. The founder's voice becomes stronger as the page unfolds, followed by work, services, process and practical questions. Warm neutrals and changing light make a familiar sales journey feel like a considered personal introduction.",
        paragraphs: [
          "Small annotations sit beside larger statements; cream work sections interrupt darker chapters. The shifts create a reading rhythm that gives each part of the offer its own moment.",
          "The About panel brings founder context into the same experience. On desktop it opens as a cream surface over the page, keeping a sense of where the visitor came from.",
        ],
        lesson:
          "Build confidence in an order that follows the visitor's questions.",
        researchAnchor: "website-review",
      },
      {
        id: "type",
        label: "Type",
        title: "Quiet introduction. Larger proof.",
        intro:
          "The biggest mark is not the longest explanation. MONOLOG lets its wordmark and atmosphere introduce the mood, then gives the founder statement and service names more reading weight. KHTeka, expressive Animo and mono annotations each have a different part in that rhythm.",
        paragraphs: [
          "The measured desktop hierarchy moves from roughly 18px positioning copy to 45px founder copy and 94px service names. Animo introduces another chapter through the shape of its letters as well as its larger scale.",
          "The service list also changes hierarchy in response to the pointer. One name becomes fully opaque while the other five dim, helping associate the active service with its preview.",
        ],
        lesson: "Give the evidence enough presence to carry the promise.",
        researchAnchor: "typography-and-pointer-behavior",
      },
      {
        id: "motion",
        label: "Motion",
        title: "A little guidance, close at hand.",
        intro:
          "The most useful interactions stay close to the visitor's intent. A service gains emphasis beside its image, a question opens its answer, and About adds a personal layer. Each gesture helps someone read more of the story at the moment they want it.",
        paragraphs: [
          "The review verified service preview changes, a pricing FAQ opening and Escape closing About. The nearby testimonial advanced independently of service hover, so the two should not imply a direct endorsement relationship.",
          "The footer's following hold instruction was observed, but the sustained distortion remained incompletely tested. The custom script was unavailable to source inspection; markup hooks alone do not establish every intended animation.",
        ],
        lesson:
          "Keep feedback clearly attached to the content it actually controls.",
        researchAnchor: "interaction-and-motion-inventory",
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "Make the personal layer comfortable.",
        intro:
          "On a phone, About fills the available width and the menu offers large links through the story. Start a project remains in the header. The adaptation preserves the studio's tone while giving the visitor a more direct way to choose what comes next.",
        paragraphs: [
          "The hero stays tall, with small centered positioning copy and the wordmark near the bottom. That quiet copy still has to earn its place through comfortable reading size and contrast.",
          "The September 2026 mobile menu also exposed duplicate editorial headlines with placeholder links. Those small unfinished surfaces matter because they appear precisely when an interested visitor starts exploring beyond the main page.",
        ],
        lesson:
          "Treat menus and secondary panels as part of the same authored experience.",
        researchAnchor: "mobile-changes-and-issues",
      },
      {
        id: "takeaways",
        label: "Takeaways",
        title: "Finish the places curiosity leads.",
        intro:
          "MONOLOG's strongest lesson is its persuasive sequence: a point of view, visible work, an explanation of the engagement and answers to practical doubts. That sense of care needs to extend to every published destination, including the ones outside the main narrative.",
        paragraphs: [
          "All seven published case URLs returned generic shells during the source review; one was also confirmed live without a case study. The main work cards linked to external client sites, so those are separate findings.",
          "Keep the warmth, About panel and practical FAQ. Complete the case destinations and menu content, clarify filtered counts, and explain the external AI-evaluation links in words a visitor can understand.",
        ],
        lesson:
          "The depth of the experience should match the care of its introduction.",
        researchAnchor: "route-inventory",
      },
    ],
    keep: "Pair a personal point of view with work and practical answers.",
    question: "Does every path reward the curiosity the homepage creates?",
    closing:
      "Build trust through the story, then honor it at every destination.",
  },
  {
    slug: "lama-lama",
    name: "Lama Lama",
    edition: "05",
    title: "A Brand With Room to Play",
    subtitle:
      "Pixels, compact controls and personal surprises turn an agency identity into a shared way of behaving.",
    thesis:
      "Personality becomes stronger when its interactions belong together.",
    chapters: [
      {
        id: "idea",
        label: "Idea",
        title: "One identity, many little invitations.",
        intro:
          "Lama Lama's pixel logo is only the beginning. The same character appears in image treatments, mono text reveals, contextual messages and compact controls. The result feels like an agency with a way of doing things, extending its personality from the hero into the smallest interaction.",
        paragraphs: [
          "A centered menu floats as a small object over cinematic media. Below, compact work rows give way to broad images and offset culture photographs, changing the pace without losing the shared visual language.",
          "The work index makes that personality useful. Names, categories and image strips support quick scanning, with more narrative and media available once a project catches the visitor's interest.",
        ],
        lesson:
          "Choose a small set of brand behaviors that can travel across the interface.",
        researchAnchor: "website-review",
      },
      {
        id: "type",
        label: "Type",
        title: "A declaration and its small print.",
        intro:
          "The headline arrives as a dense uppercase shape. The explanation uses more open sentence spacing. Around them, small mono labels name categories and actions. This contrast gives Lama Lama its mix of confidence and precision, with careful distinctions needed where metadata becomes a control.",
        paragraphs: [
          "The hero measured 72px with 57.6px leading on desktop and 40px with 32px leading on mobile. Body copy has more breathing room, and both its width and position change for the narrow layout.",
          "Mono action labels remain 10px on both measured viewports. Brackets, outlines and arrows help separate roles, but important mobile actions may need a more comfortable size to make that distinction clear.",
        ],
        lesson:
          "Let expressive headlines and practical reading text use different rules.",
        researchAnchor: "typography-and-pointer-behavior",
      },
      {
        id: "motion",
        label: "Motion",
        title: "The interface has a playful streak.",
        intro:
          "A work row opens into a preview. A team name brings up a portrait and a personal caption. A compact hub can become a presentation or an inquiry flow. These discoveries share a visual character, making the surprises feel like parts of the same place.",
        paragraphs: [
          "The desktop Neurons Lab preview and draggable gallery were exercised, along with team portrait changes. The pitch deck was a functioning ten-slide presentation, and its explicit close control worked.",
          "The contact camera treatment was confirmed in public code but never activated. The review also found that Escape did not close the desktop deck in its tested state: more modes bring more conventions to keep consistent.",
        ],
        lesson:
          "Make discovery rewarding, and make leaving each discovered layer obvious.",
        researchAnchor: "hidden-interfaces-and-motion",
      },
      {
        id: "mobile",
        label: "Mobile",
        title: "Same character. A different gesture.",
        intro:
          "Lama Lama gives touch its own interactions. Service columns become a horizontal strip, and the tested mobile work row opens a dedicated case. Awards use a persistent disclosure that stays open for reading, preserving the discovery without asking the visitor to keep holding.",
        paragraphs: [
          "The review verified the mobile service drag and awards expansion. Desktop awards use a temporary press-and-hold reveal in the inspected implementation; that sustained desktop gesture was not fully exercised live.",
          "The deck also has mobile-specific swipe and tap-zone behavior in source, with incomplete physical-device testing. The broader lesson is to choose a suitable gesture per surface and verify its entry, exit and reading state.",
        ],
        lesson:
          "Translate the intent of an interaction into a gesture that suits the device.",
        researchAnchor: "mobile-changes-and-issues",
      },
      {
        id: "takeaways",
        label: "Takeaways",
        title: "Give the play a dependable frame.",
        intro:
          "The strongest thing to borrow is the relationship between Lama Lama's effects. The pixels, labels, previews and presentation mode reinforce one character. Keep that coherence, then make the practical frame equally dependable: clear controls, readable labels and predictable ways back to the page.",
        paragraphs: [
          "The persistent work filter is a useful example: selecting E-commerce updated the URL, count and matching rows. Personality and a shareable, understandable state can live in the same component.",
          "The September 2026 review prioritizes consistent modal exits, clearer field errors and incomplete content, including the sparse AI page and placeholder Cubby narrative. Its source coverage does not certify every interaction or device.",
        ],
        lesson:
          "A playful system earns its freedom through dependable controls.",
        researchAnchor: "directors-interpretation-and-test-priorities",
      },
    ],
    keep: "Repeat a few distinctive behaviors until they become a recognizable language.",
    question: "Can someone discover, use and leave every layer without a hint?",
    closing: "Keep the surprises. Give them a consistent way in and out.",
  },
];

export function getStudyStory(slug: string): StudyStory | undefined {
  return studyStories.find((story) => story.slug === slug);
}
