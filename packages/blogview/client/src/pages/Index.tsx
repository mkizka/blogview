import { Link } from "react-router-dom";

import { entries } from "../utils/entries";
import { md2frontmatter } from "../utils/transformers";

function Index() {
  const pages = Object.entries(entries)
    .map(([entryId, entry]) => {
      return {
        path: `/entry/${entryId}`,
        meta: md2frontmatter(entry),
      };
    })
    .sort((a, b) => {
      return +new Date(b.meta.date) - +new Date(a.meta.date);
    });
  return (
    <ul>
      {pages.map((page) => (
        <li key={page.path}>
          <Link to={page.path}>{page.meta.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export { Index };
