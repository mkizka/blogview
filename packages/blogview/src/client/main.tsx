import { StrictMode } from "react";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import { App } from "./App";
import { HotReloadRoot } from "./hooks/useLocalFileChangedEffect";

render(
  <StrictMode>
    <HotReloadRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HotReloadRoot>
  </StrictMode>,
  document.getElementById("root")
);
