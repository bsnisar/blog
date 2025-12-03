import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block"
        >
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8">
            {/* Left column – Date */}
            <div className="text-neutral-500 dark:text-neutral-400 text-sm tabular-nums leading-relaxed">
              {formatDate(post.metadata.publishedAt, false)}
            </div>

            {/* Right column – Title + summary */}
            <div>
              <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4 decoration-neutral-400/50">
                {post.metadata.title}
              </h2>

              {post.metadata.summary && (
                <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-snug text-sm">
                  {post.metadata.summary}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}