import { notFound } from "next/navigation";

import { ALL_POSTS } from "@/lib/posts-runtime/posts.generated";
import { getSeries, type Series } from "@/lib/series";

export type SeriesRef = {
  slug: string;
  part: number;
};

export type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  image?: string;
  series?: SeriesRef;
  tags?: string[];
};

/** Long form, for prose: "December 3, 2025". */
export function formatDate(date: string, includeRelative = false) {
  const targetDate = toDate(date);

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  const currentDate = new Date();
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let relative = "Today";
  if (yearsAgo > 0) {
    relative = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    relative = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    relative = `${daysAgo}d ago`;
  }

  return `${fullDate} (${relative})`;
}

/**
 * Short form, for the mono rail: "2025.12.03".
 * Tabular by construction — every date is the same width.
 */
export function formatDateNumeric(date: string) {
  const target = toDate(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${target.getFullYear()}.${pad(target.getMonth() + 1)}.${pad(
    target.getDate()
  )}`;
}

/** Two digits, so part numbers line up in the rail: "01", "02". */
export function formatPart(part: number) {
  return String(part).padStart(2, "0");
}

function toDate(date: string) {
  return new Date(date.includes("T") ? date : `${date}T00:00:00`);
}

/**
 * Tags are written naturally in post metadata ("Mental Models") and
 * slugified for URLs ("mental-models"). The written form is what readers see.
 */
export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type BlogPostData = {
  slug: string;
  metadata: Metadata;
};

/**
 * Read and validate one post. Throws a Error naming the file and the
 * problem — never notFound(), so a malformed post fails the build with a
 * message that points at the post rather than at whichever route happened
 * to read it first.
 */
async function readPost(slug: string): Promise<BlogPostData> {
  let file: { metadata?: Record<string, unknown> };

  try {
    file = await import("@/posts/" + slug + ".mdx");
  } catch {
    throw new Error(`posts/${slug}.mdx could not be imported.`);
  }

  const metadata = file?.metadata as Partial<Metadata> & {
    summary?: string;
  };

  if (!metadata) {
    throw new Error(
      `posts/${slug}.mdx exports no \`metadata\`. Every post needs ` +
        `title, publishedAt and description.`
    );
  }

  // Posts have been written with `description`; the starter read `summary`.
  // Accept either so older posts keep working.
  const description = metadata.description ?? metadata.summary;

  const missing = [
    !metadata.title && "title",
    !metadata.publishedAt && "publishedAt",
    !description && "description",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `posts/${slug}.mdx is missing required metadata: ${missing.join(", ")}.`
    );
  }

  if (metadata.series && !getSeries(metadata.series.slug)) {
    throw new Error(
      `posts/${slug}.mdx references unknown series ` +
        `"${metadata.series.slug}". Add it to lib/series.ts.`
    );
  }

  return {
    slug,
    metadata: { ...metadata, description, tags: metadata.tags ?? [] },
  } as BlogPostData;
}

/**
 * For the post route: an unreadable slug is a 404 for that URL alone.
 */
export async function getBlogPostMetadata(slug: string): Promise<BlogPostData> {
  try {
    return await readPost(slug);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return notFound();
  }
}

/**
 * For every list, feed and sitemap. A malformed post throws rather than
 * 404ing the caller, so one bad file cannot take the blog index, the RSS
 * feed and every tag page down with it.
 */
export async function getBlogPosts(): Promise<BlogPostData[]> {
  const posts = await Promise.all(ALL_POSTS.map((post) => readPost(post.slug)));

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

/* ------------------------------------------------------------------ */
/* Series                                                              */
/* ------------------------------------------------------------------ */

export type SeriesWithPosts = Series & {
  posts: BlogPostData[];
};

/** Posts in a series, ordered by their declared part number. */
export async function getSeriesPosts(slug: string): Promise<BlogPostData[]> {
  const posts = await getBlogPosts();

  return posts
    .filter((post) => post.metadata.series?.slug === slug)
    .sort((a, b) => a.metadata.series!.part - b.metadata.series!.part);
}

/**
 * Every series that has at least one post. A series defined in the registry
 * but not yet written into stays out of the index until its first post lands.
 */
export async function getPublishedSeries(): Promise<SeriesWithPosts[]> {
  const posts = await getBlogPosts();
  const { SERIES } = await import("@/lib/series");

  return SERIES.map((series) => ({
    ...series,
    posts: posts
      .filter((post) => post.metadata.series?.slug === series.slug)
      .sort((a, b) => a.metadata.series!.part - b.metadata.series!.part),
  })).filter((series) => series.posts.length > 0);
}

export type SeriesContext = {
  series: Series;
  part: number;
  total: number;
  previous?: BlogPostData;
  next?: BlogPostData;
};

/** Where a post sits in its series, and what reads before and after it. */
export async function getSeriesContext(
  post: BlogPostData
): Promise<SeriesContext | null> {
  const ref = post.metadata.series;
  if (!ref) return null;

  const series = getSeries(ref.slug);
  if (!series) return null;

  const posts = await getSeriesPosts(ref.slug);
  const index = posts.findIndex((entry) => entry.slug === post.slug);

  return {
    series,
    part: ref.part,
    total: posts.length,
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Tags                                                                */
/* ------------------------------------------------------------------ */

export type TagSummary = {
  slug: string;
  label: string;
  count: number;
};

/**
 * Every tag in use, most-written-about first. The label is taken from the
 * most recent post carrying the tag, so a rename propagates forward.
 */
export async function getAllTags(): Promise<TagSummary[]> {
  const posts = await getBlogPosts();
  const tags = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      const slug = tagSlug(tag);
      if (!slug) continue;

      const existing = tags.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { slug, label: tag, count: 1 });
      }
    }
  }

  return Array.from(tags.values()).sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label)
  );
}

export async function getPostsByTag(slug: string): Promise<BlogPostData[]> {
  const posts = await getBlogPosts();

  return posts.filter((post) =>
    (post.metadata.tags ?? []).some((tag) => tagSlug(tag) === slug)
  );
}
