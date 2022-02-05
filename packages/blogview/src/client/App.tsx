import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { TopPage } from "./pages/top";
import { EntryPage } from "./pages/entry";
import { ConfigResponse } from "../common/types";

export function App() {
  const [config, setConfig] = useState<ConfigResponse | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((result) => result.json())
      .then(setConfig);
  }, []);

  if (config == null) {
    return null;
  }

  return (
    <BrowserRouter>
      <Helmet>
        {config.styles.map((body, i) => (
          <style key={i}>{body}</style>
        ))}
      </Helmet>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/entry/*" element={<EntryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
