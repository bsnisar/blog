import Link from 'next/link'
import { getSeries, unitLabel } from '@/lib/series'
import {
  formatDateNumeric,
  formatPart,
  getBlogPosts,
  type BlogPostData,
} from '@/lib/utils'

type PostListProps = {
  posts: BlogPostData[]
  /** Show the part number instead of the date. Series pages. */
  rail?: 'date' | 'part'
  /** Hide the series marker where the whole list is one series. */
  showSeries?: boolean
  showTags?: boolean
}

export function PostList({
  posts,
  rail = 'date',
  showSeries = true,
}: PostListProps) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => {
        const series = post.metadata.series
          ? getSeries(post.metadata.series.slug)
          : undefined

        return (
          <li
            key={post.slug}
            className="group border-b border-hair py-5 last:border-0"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <div className="shrink-0 text-label text-muted sm:w-[var(--rail)]">
                {rail === 'part' && series && post.metadata.series ? (
                  <span>
                    {unitLabel(series)} {formatPart(post.metadata.series.part)}
                  </span>
                ) : (
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDateNumeric(post.metadata.publishedAt)}
                  </time>
                )}
              </div>

              <div>
                <h2 className="text-title font-bold text-ink">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-accent"
                  >
                    {post.metadata.title}
                  </Link>
                </h2>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export async function BlogPosts(props: Omit<PostListProps, 'posts'> = {}) {
  const posts = await getBlogPosts()
  return <PostList posts={posts} {...props} />
}
