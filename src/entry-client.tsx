import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import { BASE_PATH } from "@/lib/paths";
import { preloadPage } from "./routes";

const root = document.getElementById("root")!;
await preloadPage(window.location.pathname.slice(BASE_PATH.length) || "/");
const app = (
  <BrowserRouter basename={BASE_PATH || "/"}>
    <App />
  </BrowserRouter>
);
if (root.hasAttribute("data-prerendered")) hydrateRoot(root, app);
else createRoot(root).render(app);
