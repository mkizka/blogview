import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocalFileChangedEffect } from "../hooks/useLocalFileChangedEffect";
import { EntryResponse } from "../../common/types";

export function EntryPage() {
  const [entry, setEntry] = useState<EntryResponse | null>(null);
  const { slug } = useParams();

  useLocalFileChangedEffect(async () => {
    const result = await fetch(`/api/entry/${slug}`);
    setEntry(await result.json());
  });

  useEffect(() => {
    // @ts-ignore
    twttr.widgets.load(
      document.getElementsByClassName("twitter-tweet-container")
    );
  }, [entry]);

  if (entry == null) return <div>loading...</div>;

  return <div dangerouslySetInnerHTML={{ __html: entry.html }} />;
}
