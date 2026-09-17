import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Provider } from "./provider";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "../assets/fonts/PPNeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PPNeueMontreal-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-neue-display",
  display: "swap",
});

const reading = localFont({
  src: [
    {
      path: "../assets/fonts/PPNeueMontrealText-Book.otf",
      weight: "375",
      style: "normal",
    },
    {
      path: "../assets/fonts/PPNeueMontrealText-BookItalic.otf",
      weight: "375",
      style: "italic",
    },
  ],
  variable: "--font-neue-reading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Interesting Designs — UI/UX research by Zeyad Omran",
    template: "%s | Interesting Designs",
  },
  description:
    "An ongoing notebook of website studies, typography, interaction details, and the decisions behind digital experiences.",
  applicationName: "Interesting Designs",
  authors: [{ name: "Zeyad Omran", url: "https://zeyadomran.com" }],
  icons: { icon: withBasePath("/icon.svg") },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${reading.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
