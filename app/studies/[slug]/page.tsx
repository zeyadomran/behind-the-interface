import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudyStoryExperience } from "@/components/study-story";
import { getStudyStory, studyStories } from "@/lib/study-stories";
import { source } from "@/lib/source";
import { getResearchSites } from "@/lib/research-sites";
import { pageMetadata, researchSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import "@/app/stories.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return studyStories
    .filter((story) => source.getPage([story.slug]))
    .map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStudyStory(slug);
  const research = source.getPage([slug]);
  if (!story || !research) notFound();
  return pageMetadata({
    title: `${story.name} Design Story`,
    description: story.subtitle,
    path: `/studies/${story.slug}/`,
    article: true,
  });
}

export default async function StudyPage({ params }: Props) {
  const { slug } = await params;
  const story = getStudyStory(slug);
  const research = source.getPage([slug]);
  if (!story || !research) notFound();
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
