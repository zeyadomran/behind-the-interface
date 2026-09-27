import NotFound from "@/app/not-found";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { readResearchContent, source } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { ArticleExplorer } from "@/components/article-explorer";
import { getStudyStory } from "@/lib/study-stories";
import { SourceCredit } from "@/components/source-credit";
import { StudyModeSwitch } from "@/components/study-mode-switch";
import { getLibraryEntries, formatDate } from "@/lib/library";
import { StructuredData } from "@/components/structured-data";
import { getResearchSites } from "@/lib/research-sites";
import { pageMetadata, researchSchema } from "@/lib/seo";
import "@/app/article-visuals.css";

interface PageProps {
  slug?: string[];
}

export function getResearchMetadata(slug?: string[]) {
  const page = source.getPage(slug);
  if (!page) return undefined;
  return pageMetadata({
    title:
      page.data.kind === "study"
        ? `${page.data.title} UI/UX Study`
        : page.data.title,
    description:
      page.data.description ??
      `Explore ${page.data.title} in the Behind the Interface research library.`,
    path: `/docs/${slug?.length ? `${slug.join("/")}/` : ""}`,
    article: page.data.kind !== "guide",
  });
}

export default function ResearchPage({ slug }: PageProps) {
  const page = source.getPage(slug);
  if (!page) return <NotFound />;
  const content = readResearchContent(page);
  const MDX = content.body;
  const story = getStudyStory((slug ?? []).join("/"));
  const sites = getResearchSites(page.data.sites);
  const slugPath = (slug ?? []).join("/");
  const entry = getLibraryEntries().find((item) => item.slug === slugPath);

  return (
    <DocsPage
      toc={content.toc.filter((item) => item.depth === 2)}
      tableOfContent={{ style: "normal" }}
    >
      <StructuredData
        data={researchSchema({
          title:
            page.data.kind === "study"
              ? `${page.data.title} UI/UX Study`
              : page.data.title,
          description:
            page.data.description ??
            `Explore ${page.data.title} in the Behind the Interface research library.`,
          path: `/docs/${slug?.length ? `${slug.join("/")}/` : ""}`,
          section: "docs",
          article: page.data.kind !== "guide",
          sites,
          image: page.data.cover,
        })}
      />
      <div
        id="main-content"
        tabIndex={-1}
        className="article-heading"
        data-site={entry ? entry.slug : undefined}
      >
        <div className="article-heading-bar">
          <div className="article-meta">
            <span className="eyebrow">
              {entry ? (
                <span className="article-swatch" aria-hidden="true" />
              ) : (
                <span className="tiny-square" />
              )}{" "}
              {page.data.kind === "study"
                ? `Website study${entry?.number ? ` ${entry.number}` : ""}`
                : page.data.kind === "report"
                  ? "Research report"
                  : "The notebook"}
            </span>
            {page.data.date && (
              <time dateTime={page.data.date}>
                {formatDate(page.data.date, "long")}
              </time>
            )}
          </div>
          {story && (
            <StudyModeSwitch
              slug={story.slug}
              name={page.data.title}
              current="research"
            />
          )}
        </div>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        {page.data.tags.length > 0 && (
          <div className="article-tags">
            {page.data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <SourceCredit sites={sites} />
      </div>
      {page.data.visual && (
        <ArticleExplorer
          site={
            page.data.visual === "collection" ? undefined : page.data.visual
          }
          initialView={page.data.visualView}
        />
      )}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
