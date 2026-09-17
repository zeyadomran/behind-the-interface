import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function createStudy({
  root = process.cwd(),
  slug,
  title,
  date = new Date().toISOString().slice(0, 10),
}) {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "Use a lowercase slug with letters, numbers, and single hyphens.",
    );
  }
  if (!title?.trim()) throw new Error("Provide a study title.");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  ) {
    throw new Error("Use a valid date in YYYY-MM-DD format.");
  }
  const directory = resolve(root, "content/docs");
  const file = resolve(directory, `${slug}.md`);
  const existingPath = [
    file,
    resolve(directory, `${slug}.mdx`),
    resolve(directory, slug),
  ].find(existsSync);
  if (existingPath)
    throw new Error(
      `A page already exists at ${existingPath}. Nothing was changed.`,
    );
  const template = readFileSync(
    resolve(root, "templates/research-entry.md"),
    "utf8",
  );
  const content = template
    .replace('title: "Study title"', `title: ${JSON.stringify(title.trim())}`)
    .replace('date: "YYYY-MM-DD"', `date: ${JSON.stringify(date)}`)
    .replaceAll("<study-slug>", slug)
    .replaceAll("/research/study-slug/", `/research/${slug}/`);
  mkdirSync(directory, { recursive: true });
  writeFileSync(file, content, { flag: "wx" });
  return file;
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  try {
    const file = createStudy({
      slug: process.argv[2],
      title: process.argv.slice(3).join(" "),
    });
    console.log(
      `Created ${file}\nDrafts stay out of the site. Complete the study, then set draft: false to publish it in the next build.`,
    );
  } catch (error) {
    console.error(error.message);
    console.error('Usage: yarn new:study study-slug "Study title"');
    process.exitCode = 1;
  }
}
