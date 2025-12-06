// blog/utils.ts
import { notFound } from "next/navigation";

import { ALL_POSTS } from "@/lib/posts-runtime/posts.generated";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

// export function getBlogPosts() {
//   const dir = getPostsDir();
//   return getMDXData(dir);
// }

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

export type PostMetadata = Metadata & {
  title: string;
  description: string;
};

export type BlogPostData = {
  slug: string;
  metadata: Metadata;
};

export async function getBlogPostMetadata(slug: string): Promise<BlogPostData> {
  try {
    const file = await import("@/posts/" + slug + ".mdx");

    if (file?.metadata) {
      if (!file.metadata.title || !file.metadata.description) {
        throw new Error(`Missing some required metadata fields in: ${slug}`);
      }

      return {
        slug,
        metadata: file.metadata,
      };
    } else {
      throw new Error(`Unable to find metadata for ${slug}.mdx`);
    }
  } catch (error: any) {
    console.error(error?.message);
    return notFound();
  }
}


export async function getBlogPosts(): Promise<BlogPostData[]> {
  const data: BlogPostData[] = [];
  for (const post of ALL_POSTS) {
    const { slug, metadata } = await getBlogPostMetadata(post.slug);
    data.push({ slug, metadata });
  }
  data.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });
  return data;
}
