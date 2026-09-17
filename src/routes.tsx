import HomePage, { metadata as homeMetadata } from "@/app/page";
import ResearchPage, { getResearchMetadata } from "@/app/docs/[[...slug]]/page";
import ResearchLayout from "@/app/docs/layout";
import StudyPage, { getStoryMetadata } from "@/app/studies/[slug]/page";
import NotFound from "@/app/not-found";
import { source, preloadResearchPage } from "@/lib/source";
import { studyStories } from "@/lib/study-stories";
import { pageMetadata } from "@/lib/seo";

export function resolvePage(pathname: string) {
  // Malformed escaped URLs are missing pages, never render-time exceptions.
  try {
    decodeURIComponent(pathname);
  } catch {
    pathname = "/404.html";
  }
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/")
    return { element: <HomePage />, metadata: homeMetadata, status: 200 };
  if (path === "/docs" || path.startsWith("/docs/")) {
    const slug = path
      .slice(6)
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);
    const metadata = getResearchMetadata(slug);
    if (metadata)
      return {
        element: (
          <ResearchLayout>
            <ResearchPage slug={slug} />
          </ResearchLayout>
        ),
        metadata,
        status: 200,
        slug,
      };
  }
  const story = /^\/studies\/([^/]+)$/.exec(path);
  if (story) {
    const metadata = getStoryMetadata(story[1]);
    if (metadata)
      return { element: <StudyPage slug={story[1]} />, metadata, status: 200 };
  }
  const metadata = pageMetadata({
    title: "Page not found",
    description:
      "This page is not in the Behind the Interface research library.",
    path: "/404.html",
  });
  metadata.robots.index = false;
  metadata.robots.googleBot.index = false;
  return { element: <NotFound />, metadata, status: 404 };
}

export async function preloadPage(pathname: string) {
  const page = resolvePage(pathname);
  if (page.slug) await preloadResearchPage(page.slug);
  return page;
}

export function publishedPaths() {
  return [
    "/",
    ...source
      .getPages()
      .map(
        (page) =>
          `/docs/${page.slugs.length ? `${page.slugs.join("/")}/` : ""}`,
      ),
    ...studyStories
      .filter((story) => source.getPage([story.slug]))
      .map((story) => `/studies/${story.slug}/`),
  ];
}
