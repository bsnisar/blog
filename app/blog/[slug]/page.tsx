import { getBlogPostMetadata ,formatDate } from "@/lib/utils";
import nextDynamic from "next/dynamic";
type BlogPageProps = { params: Promise<{ slug: string }> };

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const BlogMarkdown = nextDynamic(() => import("@/posts/" + slug + ".mdx"));
  const {metadata} = await getBlogPostMetadata(slug);
  return (<>
    <h1 className="text-2xl font-bold mb-2">{metadata.title}</h1>
    <p>{formatDate(metadata.publishedAt)}</p>
    <article className="mt-12 prose lg:prose-lg dark:prose-invert mx-auto py-10">
      <BlogMarkdown />
    </article>
    </>
  );
}

export const dynamicParams = false
