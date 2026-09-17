/**
 * Keep sidebar metadata only for directories that contain published pages.
 * Otherwise a draft's meta.json can expose its title as an empty folder.
 *
 * @template {{ draft?: boolean, info: { path: string } }} Page
 * @template {{ info: { path: string } }} Meta
 * @param {Page[]} pages
 * @param {Meta[]} metadata
 * @returns {{ pages: Page[], meta: Meta[] }}
 */
export function filterPublishedContent(pages, metadata) {
  const published = pages.filter((page) => !page.draft);
  const directories = new Set();

  for (const page of published) {
    const parts = page.info.path.replaceAll("\\", "/").split("/");
    for (let depth = 0; depth < parts.length; depth++) {
      directories.add(parts.slice(0, depth).join("/"));
    }
  }

  return {
    pages: published,
    meta: metadata.filter((entry) => {
      const directory = entry.info.path
        .replaceAll("\\", "/")
        .split("/")
        .slice(0, -1)
        .join("/");
      return directories.has(directory);
    }),
  };
}
