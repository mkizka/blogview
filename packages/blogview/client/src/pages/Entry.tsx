import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { entries } from "../utils/entries";
import { md2html } from "../utils/transformers";

function useEntryId() {
  const { entryId } = useParams();
  if (typeof entryId == "string" && entryId in entries) {
    return entryId;
  }
  throw new Error(`entry/${entryId}.mdが存在しません`);
}

function Entry() {
  const [content, setContent] = useState<string | null>(null);
  const entryId = useEntryId();

  useEffect(() => {
    md2html(entries[entryId]).then(setContent);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content! }} />;
}

export { Entry };
