import NotFound from "@/app/not-found";
import { StudyStoryExperience } from "@/components/study-story";
import { getStudyStory, studyStories } from "@/lib/study-stories";
import { source } from "@/lib/source";
import { getResearchSites } from "@/lib/research-sites";
import { pageMetadata, researchSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import "@/app/stories.css";

export function getStoryMetadata(slug: string) {
  const story = getStudyStory(slug);
  if (!story || !source.getPage([slug])) return undefined;
  return pageMetadata({
    title: `${story.name} Design Story`,
    description: story.subtitle,
    path: `/studies/${story.slug}/`,
    article: true,
  });
}

export default function StudyPage({ slug }: { slug: string }) {
  const story = getStudyStory(slug);
  const research = source.getPage([slug]);
  if (!story || !research) return <NotFound />;
  const publishedStories = studyStories.filter((item) =>
    source.getPage([item.slug]),
  );
  const next =
    publishedStories[
      (publishedStories.indexOf(story) + 1) % publishedStories.length
    ];
  return (
    <>
      <StructuredData
        data={researchSchema({
          title: `${story.name}: ${story.title}`,
          description: story.subtitle,
          path: `/studies/${story.slug}/`,
          section: "stories",
          article: true,
          sites: getResearchSites(research.data.sites),
          image: research.data.cover,
        })}
      />
      <StudyStoryExperience
        key={story.slug}
        story={story}
        next={{ name: next.name, slug: next.slug }}
      />
    </>
  );
}
