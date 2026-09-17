import { Link as RouterLink } from "react-router";
import type { ComponentProps } from "react";

type LinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/** The router owns base paths; external and same-page links stay native. */
export default function Link({ href, ...props }: LinkProps) {
  if (!href.startsWith("/") || href.startsWith("//") || props.download)
    return <a href={href} {...props} />;
  const url = new URL(href, "https://local.invalid");
  if (!url.pathname.endsWith("/") && !/\.[^/]+$/.test(url.pathname))
    url.pathname += "/";
  return (
    <RouterLink to={`${url.pathname}${url.search}${url.hash}`} {...props} />
  );
}
