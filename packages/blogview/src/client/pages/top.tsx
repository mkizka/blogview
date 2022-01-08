import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useLocalFileChangedEffect } from "../hooks/useLocalFileChangedEffect";
import { EntryAllResponse } from "../../common/types";

export function TopPage() {
  const [entries, setEntries] = useState<EntryAllResponse | null>(null);

  useLocalFileChangedEffect(async () => {
    const result = await fetch(`/api/entry`);
    setEntries(await result.json());
  });

  if (entries == null) return <div>loading...</div>;

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link to={`/entry/${entry.slug}`}>{entry.meta.title}</Link>
        </li>
      ))}
    </ul>
  );
}
