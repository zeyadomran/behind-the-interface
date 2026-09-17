import type { PageMetadata } from "@/lib/seo";
import { AUTHOR, SITE_NAME } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

export function escapeHTML(value: string | number) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function metadataHTML(data: PageMetadata) {
  const meta = (key: string, value: string | number, attribute = "name") =>
    `<meta data-site-meta ${attribute}="${escapeHTML(key)}" content="${escapeHTML(value)}">`;
  const link = (rel: string, href: string, extra = "") =>
    `<link data-site-meta rel="${rel}" href="${escapeHTML(href)}"${extra}>`;
  const robots = (value: { index: boolean; follow: boolean }) =>
    `${value.index ? "index" : "noindex"}, ${value.follow ? "follow" : "nofollow"}`;
  const og = data.openGraph;
  return [
    `<title data-site-meta>${escapeHTML(data.title.absolute)}</title>`,
    meta("description", data.description),
    meta("author", AUTHOR.name),
    meta("application-name", SITE_NAME),
    meta("robots", robots(data.robots)),
    meta(
      "googlebot",
      `${robots(data.robots.googleBot)}, max-image-preview:large`,
    ),
    link("canonical", data.alternates.canonical),
    link("icon", withBasePath("/icon.svg")),
    link("describedby", withBasePath("/llms.txt"), ' type="text/plain"'),
    ...Object.entries({
      "og:type": og.type,
      "og:title": og.title,
      "og:description": og.description,
      "og:url": og.url,
      "og:site_name": og.siteName,
    }).map(([key, value]) => meta(key, value, "property")),
    ...og.images.flatMap((image) =>
      Object.entries({
        "og:image": image.url,
        "og:image:width": image.width,
        "og:image:height": image.height,
        "og:image:alt": image.alt,
      }).map(([key, value]) => meta(key, value, "property")),
    ),
    ...(og.authors ?? []).map((author) =>
      meta("article:author", author, "property"),
    ),
    ...Object.entries({
      "twitter:card": data.twitter.card,
      "twitter:title": data.twitter.title,
      "twitter:description": data.twitter.description,
      "twitter:image": data.twitter.images[0].url,
    }).map(([key, value]) => meta(key, value)),
  ].join("\n");
}

export function updateMetadata(data: PageMetadata) {
  const template = document.createElement("template");
  template.innerHTML = metadataHTML(data);
  document.head
    .querySelectorAll("[data-site-meta]")
    .forEach((node) => node.remove());
  document.head.append(template.content);
}
