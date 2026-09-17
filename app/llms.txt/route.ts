import { getResearchSites } from "@/lib/research-sites";
import { absoluteURL, AUTHOR, SITE_NAME } from "@/lib/site";
import { source, type ResearchPage } from "@/lib/source";
import { studyStories } from "@/lib/study-stories";

export const dynamic = "force-static";

// Keep metadata on one Markdown line, even when future frontmatter uses
// multiline descriptions or punctuation with special Markdown meaning.
function inline(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\\\[\]*_`]/g, "\\$&");
}

function link(title: string, url: string, note: string): string {
  const destination = url.replaceAll("(", "%28").replaceAll(")", "%29");
  return `- [${inline(title)}](${destination}): ${inline(note)}`;
}

function documentLink(page: ResearchPage): string {
  const path = `/docs/${page.slugs.length ? `${page.slugs.join("/")}/` : ""}`;
  const note = [
    page.data.description || "Published research page.",
    page.data.date ? `Research date: ${page.data.date}.` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  return link(page.data.title, absoluteURL(path), note);
}

export function GET() {
  // The shared source excludes drafts before routes or discovery files exist.
  const pages = source
    .getPages()
    .toSorted(
      (left, right) =>
        (right.data.date ?? "").localeCompare(left.data.date ?? "") ||
        left.data.title.localeCompare(right.data.title),
    );
  const stories = studyStories.filter((story) => source.getPage([story.slug]));
  const sites = getResearchSites(pages.flatMap((page) => page.data.sites));
  const sections: [string, string[]][] = [
    [
      "Start here",
      pages.filter((page) => page.data.kind === "guide").map(documentLink),
    ],
    [
      "Shared findings",
      pages.filter((page) => page.data.kind === "report").map(documentLink),
    ],
    [
      "Website research",
      pages.filter((page) => page.data.kind === "study").map(documentLink),
    ],
    [
      "Interactive stories",
      stories.map((story) =>
        link(
          `${story.name}: ${story.title}`,
          absoluteURL(`/studies/${story.slug}/`),
          `${story.subtitle} Chapters: ${story.chapters.map((chapter) => chapter.label).join(", ")}. Follow the chapter research links for evidence.`,
        ),
      ),
    ],
    [
      "Original websites",
      sites.map((site) =>
        link(
          site.name,
          site.url,
          "Original website credited by the research. Its current design may differ from the recorded study.",
        ),
      ),
    ],
    [
      "Optional",
      [
        link(
          "Homepage and library",
          absoluteURL(),
          "Browse and filter the published studies and reports.",
        ),
        link(
          "Sitemap",
          absoluteURL("/sitemap.xml"),
          "Complete canonical page inventory, regenerated with each build.",
        ),
        link(
          "Robots",
          absoluteURL("/robots.txt"),
          "Crawling directives for this deployment.",
        ),
        link(
          `${AUTHOR.name}'s portfolio`,
          AUTHOR.url,
          "About the researcher and contact details.",
        ),
      ],
    ],
  ];

  const guide = [
    `# ${SITE_NAME}`,
    "",
    `> Independent website design research by ${AUTHOR.name}, exploring typography, layout, motion, interaction, and responsive behavior.`,
    "",
    "Read the methodology first. Use the shared findings for comparisons, then the individual /docs/ articles for detailed observations, measurements, screenshots, public-source references, and limitations. The /studies/ stories offer a guided introduction; their interactive illustrations are interpretations, not evidence captures or replicas of the original websites.",
    "",
    "The links below lead to public HTML pages. Read their main article content, headings, tables, figure captions, and source links; the research text is available without JavaScript or a login. No Markdown mirror or public content API is advertised. Follow the published links rather than guessing .md URLs. For new entries, refresh this guide or the sitemap; both are generated from published content, excluding drafts.",
    "",
    "When answering with this research, cite the specific article's canonical URL (and a relevant heading anchor), attribute the analysis to Zeyad Omran, and preserve the original website credits. Include the recorded research date and tested scope when they affect the claim. Distinguish observed behavior, source-confirmed implementation, hook-only evidence, and interpretation as defined in the methodology. Do not turn an untested interaction, a website owner's claim, or a design opinion into a verified outcome. Check the original website separately before describing an old finding as current.",
    "",
    "Website designs, names, imagery, and captured content belong to their respective owners; no affiliation or endorsement is implied. This discovery guide does not grant a reuse license for the analysis, screenshots, source websites, or fonts. Respect robots.txt when crawling.",
    ...sections
      .filter(([, entries]) => entries.length)
      .flatMap(([heading, entries]) => ["", `## ${heading}`, "", ...entries]),
    "",
  ].join("\n");

  return new Response(guide, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
