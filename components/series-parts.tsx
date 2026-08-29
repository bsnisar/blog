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
    <p className="font-mono text-label tracking-label uppercase text-muted">
      <Link
        href={`/series/${series.slug}`}
        className="text-ink underline-offset-4 hover:underline"
      >
        {series.title}
      </Link>
      <span aria-hidden> · </span>
      <span>
        {unitLabel(series)} {formatPart(part)} of {formatPart(total)}
      </span>
    </p>
  )
}

/** A quieter marker for list rows, where the title is already the link. */
export function SeriesMarker({
  series,
  part,
}: {
  series: Series
  part: number
}) {
  return (
    <p className="font-mono text-label tracking-label uppercase text-muted">
      {series.title} · {unitLabel(series)} {formatPart(part)}
    </p>
  )
}

/** Read-next navigation, shown only when the series has somewhere to go. */
export function SeriesNav({ context }: { context: SeriesContext }) {
  const { previous, next, series } = context

  if (!previous && !next) return null

  return (
    <nav
      aria-label={`More in ${series.title}`}
      className="mt-20 border-t border-ink pt-6"
    >
      <p className="font-mono text-label tracking-label uppercase text-muted">
        More in{' '}
        <Link
          href={`/series/${series.slug}`}
          className="text-ink underline-offset-4 hover:underline"
        >
          {series.title}
        </Link>
      </p>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {previous ? (
          <SeriesLink post={previous} series={series} direction="Previous" />
        ) : (
          <div aria-hidden />
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
        className={`block font-mono text-label tracking-label uppercase text-muted ${
          align === 'right' ? 'sm:text-right' : ''
        }`}
      >
        {direction === 'Previous' ? '← ' : ''}
        {unitLabel(series)} {formatPart(post.metadata.series!.part)}
        {direction === 'Next' ? ' →' : ''}
      </span>
      <span
        className={`mt-2 block text-caption tracking-title text-ink underline-offset-4 group-hover:underline ${
          align === 'right' ? 'sm:text-right' : ''
        }`}
      >
        {post.metadata.title}
      </span>
    </Link>
  )
}
