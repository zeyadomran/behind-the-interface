import {
  absoluteURL,
  AUTHOR,
  IS_PREVIEW,
  SITE_NAME,
  SOCIAL_IMAGE,
} from "./site";

interface PageSEO {
  title: string;
  description: string;
  path: string;
  article?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  article = false,
}: PageSEO) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const image = {
    url: absoluteURL(SOCIAL_IMAGE),
    width: 1200,
    height: 630,
    alt: `${SITE_NAME}: the stories behind interesting websites`,
  };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteURL(path) },
    robots: {
      index: !IS_PREVIEW,
      follow: !IS_PREVIEW,
      googleBot: {
        index: !IS_PREVIEW,
        follow: !IS_PREVIEW,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      type: article ? "article" : "website",
      title: fullTitle,
      description,
      url: absoluteURL(path),
      siteName: SITE_NAME,
      images: [image],
      ...(article ? { authors: [AUTHOR.url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteURL()}#website`,
    name: SITE_NAME,
    url: absoluteURL(),
    description:
      "Interactive website design stories and detailed UI/UX research by Zeyad Omran.",
    inLanguage: "en",
    publisher: { "@type": "Person", ...AUTHOR },
  };
}

interface ResearchSchema extends PageSEO {
  sites?: { name: string; url: string }[];
  section: "stories" | "docs";
  image?: string;
}

export function researchSchema({
  title,
  description,
  path,
  article,
  sites = [],
  section,
  image,
}: ResearchSchema) {
  const url = absoluteURL(path);
  const crumbs = [{ name: SITE_NAME, item: absoluteURL() }];
  if (section === "docs" && path !== "/docs/") {
    crumbs.push({ name: "UI/UX research", item: absoluteURL("/docs/") });
  }
  crumbs.push({ name: title, item: url });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": article ? "Article" : "WebPage",
        "@id": `${url}#${article ? "article" : "page"}`,
        url,
        ...(article
          ? {
              headline: title,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
            }
          : { name: title }),
        description,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${absoluteURL()}#website`,
          name: SITE_NAME,
          url: absoluteURL(),
        },
        author: { "@type": "Person", ...AUTHOR },
        publisher: { "@type": "Person", ...AUTHOR },
        image: absoluteURL(image ?? SOCIAL_IMAGE),
        ...(sites.length
          ? {
              about: sites.map((site) => ({
                "@type": "WebSite",
                name: site.name,
                url: site.url,
              })),
              citation: sites.map((site) => site.url),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...crumb,
        })),
      },
    ],
  };
}

export type PageMetadata = ReturnType<typeof pageMetadata>;
