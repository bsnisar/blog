import { formatDateLong, minutesToRead, type BlogPostData } from '@/lib/utils'

/** "9 November 2026  1462 words  7 minutes to read", in the muted voice. */
export function PostMeta({ post, className = '' }: { post: BlogPostData; className?: string }) {
  const minutes = minutesToRead(post.words)
  return (
    <p className={`flex flex-wrap gap-x-4 font-sans text-meta tracking-label tabular-nums text-muted ${className}`}>
      <time dateTime={post.metadata.publishedAt}>
        {formatDateLong(post.metadata.publishedAt)}
      </time>
      <span>{post.words} words</span>
      <span>
        {minutes} {minutes === 1 ? 'minute' : 'minutes'} to read
      </span>
    </p>
  )
}
