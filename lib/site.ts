import { withBasePath } from "./paths";

export const SITE_NAME = "Behind the Interface";
export const SITE_DESCRIPTION =
  "Explore the stories behind interesting websites: interactive studies of typography, motion, layout, and the design decisions that shape the experience.";
export const AUTHOR = { name: "Zeyad Omran", url: "https://zeyadomran.com" };

const configuredURL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://design.zeyadomran.com",
);
if (
  !["http:", "https:"].includes(configuredURL.protocol) ||
  configuredURL.pathname !== "/" ||
  configuredURL.search ||
  configuredURL.hash ||
  configuredURL.username ||
  configuredURL.password
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin with no path. Use NEXT_PUBLIC_BASE_PATH for a subdirectory.",
  );
}

export const SITE_ORIGIN = configuredURL.origin;
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export const SOCIAL_IMAGE = "/og/behind-the-interface.png";

/** Source paths are unprefixed; add the hosting base path exactly once. */
export function absoluteURL(path = "/"): string {
  return new URL(withBasePath(path), `${SITE_ORIGIN}/`).href;
}
