import Link from 'next/link'
import { FOLLOW_LINKS } from '@/lib/social'

/**
 * A quiet line at the end of a post. Just text and links.
 */
export function FollowBlock() {
  return (
    <section className="mt-16 border-t border-rule pt-6">
      <p className="text-caption text-muted">
        Follow on{' '}
        {FOLLOW_LINKS.map((link, i) => (
          <span key={link.href}>
            {i > 0 && ', '}
            <Link
              href={link.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="text-accent underline underline-offset-3 hover:text-ink"
            >
              {link.label}
            </Link>
          </span>
        ))}
        , or{' '}
        <Link
          href="/rss"
          className="text-accent underline underline-offset-3 hover:text-ink"
        >
          RSS
        </Link>
        .
      </p>
    </section>
  )
}
