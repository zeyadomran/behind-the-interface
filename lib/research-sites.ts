export interface ResearchSite {
  slug: string;
  name: string;
  url: string;
}

// Original website URLs recorded in the corresponding research documents.
export const researchSites: ResearchSite[] = [
  { slug: "noho", name: "Noho", url: "https://noho.ink/" },
  { slug: "ace", name: "Ace", url: "https://acedesign.io/" },
  {
    slug: "arkon-digital",
    name: "Arkon Digital",
    url: "https://arkon.digital/",
  },
  {
    slug: "neue-montreal",
    name: "Neue Montréal",
    url: "https://neuemontreal.com/",
  },
  { slug: "monolog", name: "MONOLOG", url: "https://bymonolog.com/" },
  { slug: "lama-lama", name: "Lama Lama", url: "https://lamalama.com/" },
];

export function getResearchSite(slug: string): ResearchSite | undefined {
  return researchSites.find((site) => site.slug === slug);
}

function normalize(value: string) {
  return value.trim().replace(/\/$/, "").toLocaleLowerCase("en");
}

/** Resolve frontmatter URLs or registered names; new website URLs work without a registry entry. */
export function getResearchSites(names: string[]): ResearchSite[] {
  const result: ResearchSite[] = [];

  for (const value of names) {
    let site = researchSites.find((candidate) =>
      [candidate.url, candidate.name, candidate.slug].some(
        (name) => normalize(name) === normalize(value),
      ),
    );

    if (!site) {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) continue;
        const name = url.hostname.replace(/^www\./, "");
        site = { slug: name, name, url: url.href };
      } catch {
        continue;
      }
    }

    if (!result.some((candidate) => candidate.url === site.url))
      result.push(site);
  }

  return result;
}
