import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { ArticleExplorer } from "@/components/article-explorer";
import { getStudyStory } from "@/lib/study-stories";
import { SourceCredit } from "@/components/source-credit";
import { StructuredData } from "@/components/structured-data";
import { getResearchSites } from "@/lib/research-sites";
import { pageMetadata, researchSchema } from "@/lib/seo";
import "@/app/article-visuals.css";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
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

export default async function ResearchPage({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const MDX = page.data.body;
  const story = getStudyStory((slug ?? []).join("/"));
  const sites = getResearchSites(page.data.sites);

  return (
    <DocsPage
      toc={page.data.toc.filter((item) => item.depth === 2)}
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
      <div id="main-content" tabIndex={-1} className="article-heading">
        <div className="article-meta">
          <span className="eyebrow">
            <span className="tiny-square" />{" "}
            {page.data.kind === "study"
              ? "Website study"
              : page.data.kind === "report"
                ? "Research report"
                : "The notebook"}
          </span>
          {page.data.date && (
            <time dateTime={page.data.date}>
              {new Intl.DateTimeFormat("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(`${page.data.date}T00:00:00Z`))}
            </time>
          )}
        </div>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        {story && (
          <Link className="article-story-link" href={`/studies/${story.slug}/`}>
            Explore the story <span>Five interactive chapters</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        )}
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
