import Link from 'next/link'
import { formatDateNumeric, getBlogPosts } from '@/lib/utils'

export async function BlogPosts() {
  const posts = await getBlogPosts()

  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-hair last:border-0">
          <Link href={`/blog/${post.slug}`} className="group block py-6">
            <div className="grid gap-2 sm:grid-cols-[var(--rail)_minmax(0,1fr)] sm:gap-8">
              <time
                dateTime={post.metadata.publishedAt}
                className="font-mono text-label tabular-nums text-muted sm:pt-1"
              >
                {formatDateNumeric(post.metadata.publishedAt)}
              </time>

              <div>
                <h2 className="text-title font-medium tracking-title text-ink underline-offset-4 group-hover:underline">
                  {post.metadata.title}
                </h2>
                <p className="mt-2 max-w-measure text-caption text-muted">
                  {post.metadata.description}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
