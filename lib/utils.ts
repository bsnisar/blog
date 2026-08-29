import { notFound } from "next/navigation";

import { ALL_POSTS } from "@/lib/posts-runtime/posts.generated";

export type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  image?: string;
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

function toDate(date: string) {
  return new Date(date.includes("T") ? date : `${date}T00:00:00`);
}

export type BlogPostData = {
  slug: string;
  metadata: Metadata;
};

export async function getBlogPostMetadata(slug: string): Promise<BlogPostData> {
  try {
    const file = await import("@/posts/" + slug + ".mdx");
    const metadata = file?.metadata;

    if (!metadata) {
      throw new Error(`Unable to find metadata for ${slug}.mdx`);
    }

    // Posts have been written with `description`; the starter read `summary`.
    // Accept either so older posts keep working.
    const description = metadata.description ?? metadata.summary;

    if (!metadata.title || !metadata.publishedAt || !description) {
      throw new Error(
        `Missing required metadata (title, publishedAt, description) in: ${slug}`
      );
    }

    return { slug, metadata: { ...metadata, description } };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return notFound();
  }
}

export async function getBlogPosts(): Promise<BlogPostData[]> {
  const posts = await Promise.all(
    ALL_POSTS.map((post) => getBlogPostMetadata(post.slug))
  );

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}
