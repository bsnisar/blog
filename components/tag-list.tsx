import Link from 'next/link'
import { tagSlug } from '@/lib/utils'

/**
 * Tags as plain lowercase links, separated by spaces.
 * No boxes, no borders, no pills.
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
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tagSlug(tag)}`}
            className="text-label lowercase text-muted hover:text-accent"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}
