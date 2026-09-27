import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { withBasePath } from "@/lib/paths";
import { InspectProvider } from "@/components/inspect-mode";
import { NotebookProvider } from "@/components/notebook";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { Provider } from "./provider";
import "./globals.css";
import "./focus.css";
import "./fonts.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Provider>
        <InspectProvider>
          <NotebookProvider>
            {children}
            <KeyboardShortcuts />
          </NotebookProvider>
        </InspectProvider>
      </Provider>
      <Analytics route={pathname} path={withBasePath(pathname)} />
      <SpeedInsights route={pathname} />
    </>
  );
}
