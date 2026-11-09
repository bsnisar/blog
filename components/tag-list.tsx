import Link from 'next/link'
import { tagSlug } from '@/lib/utils'

/** Tags as small grey typewriter labels, the way a manuscript is filed. */
export function TagList({
  tags,
  className = '',
}: {
  tags: string[]
  className?: string
}) {
  if (tags.length === 0) return null

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tagSlug(tag)}`}
            className="block bg-raised px-2 py-0.5 font-mono text-label lowercase text-muted hover:text-accent"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}
