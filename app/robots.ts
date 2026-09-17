import { absoluteURL, IS_PREVIEW } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

export default function robots() {
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
