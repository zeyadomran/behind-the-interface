import { lazy, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FrameworkProvider, type Framework } from "fumadocs-core/framework";
import { RootProvider } from "fumadocs-ui/provider/base";
import Link from "@/components/link";

const ResearchSearch = lazy(() => import("@/components/research-search"));

// The built-in React Router provider assumes a data router. This static site
// uses BrowserRouter/StaticRouter and only needs navigation and location hooks.
const framework: Framework = {
  usePathname() {
    return useLocation().pathname;
  },
  useParams() {
    return Object.fromEntries(
      Object.entries(useParams()).filter(
        (entry): entry is [string, string] => entry[1] !== undefined,
      ),
    );
  },
  useRouter() {
    const navigate = useNavigate();
    return useMemo(
      () => ({
        push: (url: string) => navigate(url),
        refresh: () => window.location.reload(),
      }),
      [navigate],
    );
  },
  Link({ href = "#", prefetch: _prefetch, ...props }) {
    return <Link href={href} {...props} />;
  },
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <FrameworkProvider {...framework}>
      <RootProvider
        theme={{ enabled: false }}
        search={{ SearchDialog: ResearchSearch }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  );
}
