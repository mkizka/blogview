import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EntryPage } from "./pages/entry";
import "@exampledev/new.css";

import { HotReloadRoot } from "./hooks/useLocalFileChangedEffect";

ReactDOM.render(
  <React.StrictMode>
    <HotReloadRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/entry/:slug" element={<EntryPage />} />
        </Routes>
      </BrowserRouter>
    </HotReloadRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
