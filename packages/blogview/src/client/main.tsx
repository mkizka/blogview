import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { App } from "./App";
import { HotReloadRoot } from "./hooks/useLocalFileChangedEffect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HotReloadRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HotReloadRoot>
  </StrictMode>
);
