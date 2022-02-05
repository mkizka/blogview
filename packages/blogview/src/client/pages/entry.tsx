import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocalFileChangedEffect } from "../hooks/useLocalFileChangedEffect";
import { EntryResponse } from "../../common/types";

export function EntryPage() {
  const [entry, setEntry] = useState<EntryResponse | null>(null);
  const params = useParams();

  useLocalFileChangedEffect(async () => {
    const result = await fetch(`/api/entry/${params["*"]}`);
    setEntry(await result.json());
  });

  useEffect(() => {
    // @ts-ignore
    twttr.widgets.load();
  }, [entry]);

  if (entry == null) return <div>loading...</div>;

  return <div dangerouslySetInnerHTML={{ __html: entry.html }} />;
}
