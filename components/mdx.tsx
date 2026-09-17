import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export function getMDXComponents(): MDXComponents {
  return {
    ...defaultComponents,
    a: ({ href = "", children, ...props }) => {
      if (href.startsWith("/docs") || href === "/")
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      return (
        <a href={href.startsWith("/") ? withBasePath(href) : href} {...props}>
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => (
      <span className="research-figure">
        <a
          href={typeof src === "string" ? withBasePath(src) : undefined}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open full-size image: ${alt || "Research screenshot"}`}
        >
          <img
            {...props}
            src={typeof src === "string" ? withBasePath(src) : src}
            alt={alt || ""}
            loading="lazy"
            decoding="async"
          />
        </a>
        {alt && <span className="image-caption">{alt}</span>}
      </span>
    ),
    table: ({ children, ...props }) => (
      <div
        className="research-table"
        tabIndex={0}
        role="region"
        aria-label="Scrollable research table"
      >
        <table {...props}>{children}</table>
      </div>
    ),
  };
}
