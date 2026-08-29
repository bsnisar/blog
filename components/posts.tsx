import Link from 'next/link'
import { getSeries } from '@/lib/series'
import {
  formatDateNumeric,
  formatPart,
  getBlogPosts,
  type BlogPostData,
} from '@/lib/utils'
import { SeriesMarker } from '@/components/series-parts'
import { TagList } from '@/components/tag-list'

type PostListProps = {
  posts: BlogPostData[]
  /** Show the part number in the rail instead of the date. Series pages. */
  rail?: 'date' | 'part'
  /** Hide the series marker where the whole list is one series. */
  showSeries?: boolean
  showTags?: boolean
}

export function PostList({
  posts,
  rail = 'date',
  showSeries = true,
  showTags = true,
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
            className="group border-b border-hair py-6 last:border-0"
          >
            <div className="grid gap-2 sm:grid-cols-[var(--rail)_minmax(0,1fr)] sm:gap-8">
              <div className="font-mono text-label tabular-nums text-muted sm:pt-1">
                {rail === 'part' && post.metadata.series ? (
                  <span className="tracking-label uppercase">
                    Part {formatPart(post.metadata.series.part)}
                  </span>
                ) : (
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDateNumeric(post.metadata.publishedAt)}
                  </time>
                )}
              </div>

              <div>
                {showSeries && series && post.metadata.series ? (
                  <div className="mb-2">
                    <SeriesMarker
                      series={series}
                      part={post.metadata.series.part}
                    />
                  </div>
                ) : null}

                <h2 className="text-title font-medium tracking-title text-ink">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline-offset-4 group-hover:underline"
                  >
                    {post.metadata.title}
                  </Link>
                </h2>

                <p className="mt-2 max-w-measure text-caption text-muted">
                  {post.metadata.description}
                </p>

                {showTags ? (
                  <TagList tags={post.metadata.tags ?? []} className="mt-4" />
                ) : null}
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
