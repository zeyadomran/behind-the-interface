import { loader, type StaticSource } from "fumadocs-core/source";
import browserCollections from "../.source/browser";
import { researchMeta, researchPages } from "../.source/research";
import { filterPublishedContent } from "./published-content.mjs";

async function loadContent(path: string) {
  const load =
    browserCollections.docs.raw[path] ??
    browserCollections.docs.raw[`./${path}`];
  if (!load) throw new Error(`Research content is missing: ${path}`);
  const content = await load();
  return {
    body: content.default,
    toc: content.toc,
    structuredData: content.structuredData,
  };
}

function info(path: string) {
  return { path, fullPath: `content/docs/${path}` };
}

// Filter once, before building routes, navigation, the library, and search.
// The generated browser entries also exclude drafts at compilation time.
const published = filterPublishedContent(
  researchPages.map(({ path, data }) => ({
    ...data,
    info: info(path),
    load: () => loadContent(path),
    structuredData: async () => (await loadContent(path)).structuredData,
  })),
  researchMeta.map(({ path, data }) => ({ ...data, info: info(path) })),
);

const researchSource: StaticSource<{
  pageData: (typeof published.pages)[number];
  metaData: (typeof published.meta)[number];
}> = {
  files: [
    ...published.pages.map((data) => ({
      type: "page" as const,
      path: data.info.path,
      absolutePath: data.info.fullPath,
      data,
    })),
    ...published.meta.map((data) => ({
      type: "meta" as const,
      path: data.info.path,
      absolutePath: data.info.fullPath,
      data,
    })),
  ],
};

export const source = loader({
  baseUrl: "/docs",
  source: researchSource,
});
export type ResearchPage = typeof source.$inferPage;

export function getResearchEntries(): ResearchPage[] {
  return source
    .getPages()
    .filter((page) => page.data.kind === "study" || page.data.kind === "report")
    .sort(
      (left, right) =>
        (right.data.date ?? "").localeCompare(left.data.date ?? "") ||
        left.data.title.localeCompare(right.data.title),
    );
}

// Share a stable promise and its resolved body between prerendering, hydration,
// and client navigation. Article bodies are separate Vite chunks.
type ResearchContent = Awaited<ReturnType<ResearchPage["data"]["load"]>>;
type ContentState = {
  promise: Promise<ResearchContent>;
  content?: ResearchContent;
  error?: unknown;
};
const contentCache = new Map<string, ContentState>();

function contentState(page: ResearchPage): ContentState {
  const cached = contentCache.get(page.path);
  if (cached) return cached;

  const state: ContentState = {
    promise: page.data.load().then(
      (content) => {
        state.content = content;
        return content;
      },
      (error: unknown) => {
        state.error = error;
        throw error;
      },
    ),
  };
  contentCache.set(page.path, state);
  return state;
}

/** Load the matched document before rendering or hydrating its static HTML. */
export async function preloadResearchPage(slug?: string[]) {
  const page = source.getPage(slug);
  if (page) await contentState(page).promise;
}

/** Suspend only when navigating to a document that has not been loaded yet. */
export function readResearchContent(page: ResearchPage): ResearchContent {
  const state = contentState(page);
  if (state.content) return state.content;
  if (state.error !== undefined) throw state.error;
  throw state.promise;
}
