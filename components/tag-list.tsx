import Link from 'next/link'
import { tagSlug } from '@/lib/utils'

/**
 * Tags read as data, so they sit in the mono register alongside dates.
 * A hairline box gives them a tap target without becoming a pill —
 * the system's corners stay square.
 */
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
            className="block border border-rule px-2 py-0.5 font-mono text-label tracking-label uppercase text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}
