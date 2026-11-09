import Link from 'next/link'
import { formatPart, type SeriesContext } from '@/lib/utils'
import { unitLabel, type Series } from '@/lib/series'

/** The line above a post title: which arc it belongs to, and where in it. */
export function SeriesBadge({
  series,
  part,
  total,
}: {
  series: Series
  part: number
  total: number
}) {
  return (
    <p className="text-meta text-muted">
      {unitLabel(series)} {part} of {total} in{' '}
      <Link
        href={`/series/${series.slug}`}
        className="text-accent underline underline-offset-4 hover:text-ink"
      >
        {series.title}
      </Link>
    </p>
  )
}

/** A quieter marker for list rows. */
export function SeriesMarker({
  series,
  part,
}: {
  series: Series
  part: number
}) {
  return (
    <p className="text-label text-muted">
      {series.title} &middot; {unitLabel(series)} {formatPart(part)}
    </p>
  )
}

/** Read-next navigation. */
export function SeriesNav({ context }: { context: SeriesContext }) {
  const { previous, next, series } = context

  if (!previous && !next) return null

  return (
    <nav
      aria-label={`More in ${series.title}`}
      className="mt-16"
    >
      <p className="text-label text-muted">
        More in{' '}
        <Link
          href={`/series/${series.slug}`}
          className="text-accent underline underline-offset-3 hover:text-ink"
        >
          {series.title}
        </Link>
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between">
        {previous ? (
          <SeriesLink post={previous} series={series} direction="Previous" />
        ) : (
          <div />
        )}
        {next ? (
          <SeriesLink
            post={next}
            series={series}
            direction="Next"
            align="right"
          />
        ) : null}
      </div>
    </nav>
  )
}

function SeriesLink({
  post,
  series,
  direction,
  align = 'left',
}: {
  post: NonNullable<SeriesContext['previous']>
  series: Series
  direction: 'Previous' | 'Next'
  align?: 'left' | 'right'
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <span
        className={`block text-label text-muted ${
          align === 'right' ? 'sm:text-right' : ''
        }`}
      >
        {direction === 'Previous' ? '← ' : ''}
        {unitLabel(series)} {formatPart(post.metadata.series!.part)}
        {direction === 'Next' ? ' →' : ''}
      </span>
      <span
        className={`mt-1 block text-caption text-ink group-hover:text-accent ${
          align === 'right' ? 'sm:text-right' : ''
        }`}
      >
        {post.metadata.title}
      </span>
    </Link>
  )
}
