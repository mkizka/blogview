import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@exampledev/new.css";

import { HotReloadRoot } from "./hooks/useLocalFileChangedEffect";
import { TopPage } from "./pages/top";
import { EntryPage } from "./pages/entry";

ReactDOM.render(
  <React.StrictMode>
    <HotReloadRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/entry/:slug" element={<EntryPage />} />
        </Routes>
      </BrowserRouter>
    </HotReloadRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
