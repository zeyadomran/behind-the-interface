import { getResearchEntries } from "./source";
import { getStudyStory, type StudyStory } from "./study-stories";

export interface LibraryEntry {
  slug: string;
  title: string;
  description: string;
  url: string;
  story?: StudyStory;
  storyUrl?: string;
  date: string;
  kind: "study" | "report";
  /** Studies are numbered like a series; reports are not. */
  number?: string;
  visual?: string;
  sites: string[];
  tags: string[];
  newest: boolean;
}

/**
 * One order for the homepage, the studies menu and story pages: oldest first,
 * so a study keeps its number as the library grows. Registered stories keep
 * their edition; later studies continue the sequence.
 */
export function getLibraryEntries(): LibraryEntry[] {
  const pages = getResearchEntries().map((page) => {
    const slug = page.slugs.join("/");
    return { page, slug, story: getStudyStory(slug) };
  });
  pages.sort(
    (left, right) =>
      (left.page.data.date ?? "").localeCompare(right.page.data.date ?? "") ||
      Number(left.page.data.kind === "report") -
        Number(right.page.data.kind === "report") ||
      (left.story?.edition ?? "99").localeCompare(
        right.story?.edition ?? "99",
      ) ||
      left.page.data.title.localeCompare(right.page.data.title),
  );
  const newestDate = pages.reduce(
    (latest, { page }) =>
      page.data.kind === "study" && (page.data.date ?? "") > latest
        ? (page.data.date ?? "")
        : latest,
    "",
  );
  let lastNumber = Math.max(
    0,
    ...pages.map(({ story }) => Number(story?.edition ?? 0)),
  );
  return pages.map(({ page, slug, story }) => {
    const kind = page.data.kind === "study" ? "study" : "report";
    const number =
      kind === "report"
        ? undefined
        : (story?.edition ?? String(++lastNumber).padStart(2, "0"));
    return {
      slug,
      title: page.data.title,
      description: page.data.description ?? "",
      url: page.url,
      story,
      storyUrl: story ? `/studies/${slug}/` : undefined,
      date: page.data.date!,
      kind,
      number,
      visual: page.data.visual,
      sites: page.data.sites,
      tags: page.data.tags,
      newest: kind === "study" && page.data.date === newestDate,
    };
  });
}

export function formatDate(date: string, month: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

const numberWords = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];

export function numberWord(value: number) {
  return numberWords[value] ?? String(value);
}
