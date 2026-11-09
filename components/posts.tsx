import Link from 'next/link'
import { getSeries, unitLabel } from '@/lib/series'
import {
  formatDateLong,
  formatPart,
  getBlogPosts,
  type BlogPostData,
} from '@/lib/utils'
import { PostMeta } from '@/components/post-meta'

/**
 * The home page: each post opens the way it opens on its own page, with
 * its title, its meta line and its first paragraphs, then "Continue...".
 */
export function PostFeed({ posts }: { posts: BlogPostData[] }) {
  return (
    <div className="flex flex-col gap-20">
      {posts.map((post) => (
        <article key={post.slug}>
          <h2 className="text-[2.375rem] leading-[1.12] font-normal sm:text-h1">
            <Link href={`/blog/${post.slug}`} className="text-ink hover:text-accent">
              {post.metadata.title}
            </Link>
          </h2>

          <PostMeta post={post} className="mt-3" />

          <div className="justified mt-5 flex flex-col gap-4">
            {(post.excerpt.length > 0 ? post.excerpt : [post.metadata.description]).map(
              (paragraph, i) => (
                <p key={i}>{paragraph}</p>
              )
            )}
          </div>

          <p className="mt-5">
            <Link
              href={`/blog/${post.slug}`}
              className="text-ink underline underline-offset-4 hover:text-accent"
            >
              Continue...
            </Link>
          </p>
        </article>
      ))}
    </div>
  )
}

type PostListProps = {
  posts: BlogPostData[]
  /** Show the part number instead of the date. Series pages. */
  rail?: 'date' | 'part'
  /** Kept for callers; the plain list shows no series marker. */
  showSeries?: boolean
  showTags?: boolean
}

/** Every other list: a title and the date beneath it, nothing else. */
export function PostList({ posts, rail = 'date' }: PostListProps) {
  return (
    <ul className="flex flex-col gap-7">
      {posts.map((post) => {
        const series = post.metadata.series
          ? getSeries(post.metadata.series.slug)
          : undefined

        return (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-title text-ink hover:text-accent"
            >
              {post.metadata.title}
            </Link>
            <p className="mt-1 font-sans text-meta tracking-label tabular-nums text-muted">
              {rail === 'part' && series && post.metadata.series ? (
                <span>
                  {unitLabel(series)} {formatPart(post.metadata.series.part)}
                </span>
              ) : (
                <time dateTime={post.metadata.publishedAt}>
                  {formatDateLong(post.metadata.publishedAt)}
                </time>
              )}
            </p>
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
