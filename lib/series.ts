/**
 * Series are curated and ordered: a named arc a reader can follow from
 * part one. The registry lives here rather than in post metadata because a
 * series has a title and a description that belong to no single post.
 *
 * A post joins a series through its own metadata:
 *
 *   series: { slug: 'opinionated-ai', part: 2 }
 *
 * Parts are explicit, not chronological — an introduction written after the
 * post it introduces still belongs at the front.
 */

export type Series = {
  slug: string;
  title: string;
  description: string;
  /**
   * What one entry is called. A dispatch has issues; an argument has parts.
   * Pluralised by suffixing "s", which is all these words need.
   */
  unit?: string;
};

export function unitLabel(series: Series, count = 1) {
  const unit = series.unit ?? "Part";
  return count === 1 ? unit : `${unit}s`;
}

export const SERIES: Series[] = [
  {
    slug: "opinionated-ai",
    title: "Opinionated AI",
    description:
      "Strong positions on building with LLMs — what the tooling gets wrong, what actually survives contact with production, and what I would not build again.",
    unit: "Issue",
  },
  {
    slug: "founder-mental-models",
    title: "Founder Mental Models",
    description:
      "The paradigms founders carry without naming them, and how each one quietly becomes a ceiling. These models feel like wisdom; they operate like limits.",
  },
];

const BY_SLUG = new Map(SERIES.map((series) => [series.slug, series]));

export function getSeries(slug: string): Series | undefined {
  return BY_SLUG.get(slug);
}
