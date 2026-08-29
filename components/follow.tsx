import Link from 'next/link'
import { FOLLOW_LINKS } from '@/lib/social'

/**
 * A single quiet line under the nav. It borrows the tag chip's form — the
 * system already uses a hairline box for small interactive labels — so it
 * reads as part of the furniture rather than as a banner.
 */
export function FollowStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="font-mono text-label tracking-label uppercase text-faint">
        Follow
      </span>
      <ul className="flex flex-wrap gap-2">
        {FOLLOW_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="block border border-rule px-2 py-0.5 font-mono text-label tracking-label uppercase text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {link.label}
              <span aria-hidden> ↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The end-of-post prompt, where a reader who finished is most likely to act.
 * Handles are shown because they are data, and data is where this design is
 * most itself.
 */
export function FollowBlock() {
  return (
    <section
      aria-labelledby="follow-heading"
      className="mt-20 border-t border-ink pt-6"
    >
      <h2
        id="follow-heading"
        className="font-mono text-label tracking-label uppercase text-muted"
      >
        Follow along
      </h2>

      <p className="mt-4 max-w-measure text-title tracking-title text-ink">
        New writing on LinkedIn and X, or subscribe by RSS.
      </p>

      <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-3">
        {FOLLOW_LINKS.map((link) => (
          <li key={link.href} className="bg-paper">
            <Link
              href={link.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 px-4 py-4 transition-colors hover:bg-raised"
            >
              <span>
                <span className="block text-caption font-medium tracking-title text-ink">
                  {link.label}
                </span>
                <span className="mt-1 block font-mono text-label text-muted">
                  {link.handle}
                </span>
              </span>
              <span
                aria-hidden
                className="font-mono text-label text-faint transition-colors group-hover:text-ink"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}

        <li className="bg-paper">
          <Link
            href="/rss"
            className="group flex items-baseline justify-between gap-4 px-4 py-4 transition-colors hover:bg-raised"
          >
            <span>
              <span className="block text-caption font-medium tracking-title text-ink">
                RSS
              </span>
              <span className="mt-1 block font-mono text-label text-muted">
                /rss
              </span>
            </span>
            <span
              aria-hidden
              className="font-mono text-label text-faint transition-colors group-hover:text-ink"
            >
              →
            </span>
          </Link>
        </li>
      </ul>
    </section>
  )
}
