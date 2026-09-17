import { createMDX } from "fumadocs-mdx/next";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
if (basePath && (!basePath.startsWith("/") || /[?#]/.test(basePath))) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must be a path such as /ui-ux-research.",
  );
}

const withMDX = createMDX();

export default withMDX({
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
});
