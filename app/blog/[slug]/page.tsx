
import dynamic from "next/dynamic";
type BlogPageProps = { params: { slug: string } };


export default function BlogPage({ params }: BlogPageProps) {
  const BlogMarkdown = dynamic(() => import("@/blog/posts/" + params.slug + ".mdx"));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl">{params.slug}</h2>
      <BlogMarkdown />
    </div>
  );
}