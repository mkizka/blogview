import { useState } from "react";
import { useParams } from "react-router-dom";

import { useLocalFileChangedEffect } from "../hooks/useLocalFileChangedEffect";
import { Entry } from "../../common/types";

function EntryPage() {
  const [entry, setEntry] = useState<Entry | null>(null);
  const { slug } = useParams();

  useLocalFileChangedEffect(async () => {
    const result = await fetch(`/api/entry/${slug}`);
    setEntry(await result.json());
  });

  if (entry == null) return <div>loading...</div>;

  return <div dangerouslySetInnerHTML={{ __html: entry.html }} />;
}

export { EntryPage };
