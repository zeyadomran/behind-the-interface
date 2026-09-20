import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useLocation, useNavigationType } from "react-router";
import RootLayout from "@/app/layout";
import { resolvePage } from "./routes";
import { updateMetadata } from "./metadata";

class PageBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main
          id="main-content"
          className="min-h-[70vh] px-[var(--gutter)] py-24"
        >
          <h1 className="text-4xl">This page could not load.</h1>
          <p className="mt-4">Please reload to try again.</p>
          <a
            className="text-link mt-6 inline-flex"
            href={typeof window === "undefined" ? "/" : window.location.href}
          >
            Reload page
          </a>
        </main>
      );
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();
  const navigation = useNavigationType();
  const initial = useRef(true);
  const page = useMemo(
    () => resolvePage(location.pathname),
    [location.pathname],
  );
  useEffect(() => {
    updateMetadata(page.metadata);
    if (initial.current) {
      initial.current = false;
      return;
    }
    if (location.hash) {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const scroll = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView();
          return true;
        }
        return false;
      };
      if (!scroll()) {
        const observer = new MutationObserver(() => {
          if (scroll()) observer.disconnect();
        });
        observer.observe(document.getElementById("root")!, {
          childList: true,
          subtree: true,
        });
        const timer = window.setTimeout(() => observer.disconnect(), 5000);
        return () => {
          observer.disconnect();
          window.clearTimeout(timer);
        };
      }
    } else if (navigation !== "POP")
      window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.key, location.hash, navigation, page.metadata]);
  return (
    <RootLayout>
      <PageBoundary key={location.pathname}>
        <Suspense
          fallback={
            <main
              id="main-content"
              className="min-h-[70vh] px-[var(--gutter)] py-24"
              aria-busy="true"
            >
              Loading the research…
            </main>
          }
        >
          {page.element}
        </Suspense>
      </PageBoundary>
    </RootLayout>
  );
}
