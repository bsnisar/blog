import { baseUrl } from "@/app/sitemap";

/**
 * Page-level `alternates` replaces the root layout's wholesale rather than
 * merging into it, so a page that declares only a canonical silently drops
 * the RSS link — and a root-layout canonical would mark every page that
 * forgets to override it as a duplicate of the homepage.
 *
 * Build the whole object here so neither half can be forgotten.
 */
export function alternates(canonical: string) {
  return {
    canonical,
    types: { "application/rss+xml": `${baseUrl}/rss` },
  };
}
