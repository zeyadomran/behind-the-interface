import type { MetadataRoute } from "next";
import { absoluteURL, IS_PREVIEW } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PREVIEW
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: withBasePath("/"),
          disallow: [
            withBasePath("/api/"),
            withBasePath("/404.html"),
            withBasePath("/404/"),
          ],
        },
    sitemap: absoluteURL("/sitemap.xml"),
  };
}
