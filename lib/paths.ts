export function normalizeBasePath(value: string | undefined): string {
  const path = (value ?? "").trim().replace(/^\/+|\/+$/g, "");
  return path ? `/${path}` : "";
}

export const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

/** Prefix raw asset/fetch URLs. Next Link and router URLs stay unprefixed. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE_PATH}${path}`;
}
