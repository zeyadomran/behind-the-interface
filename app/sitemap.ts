import { source } from "@/lib/source";
import { studyStories } from "@/lib/study-stories";
import { absoluteURL } from "@/lib/site";

export default function sitemap() {
  const paths = [
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
  return [...new Set(paths)].map((path) => ({ url: absoluteURL(path) }));
}
