import Link from 'next/link'
import { unitLabel } from '@/lib/series'
import { getPublishedSeries } from '@/lib/utils'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/series'),
  title: 'Series',
  description:
    'Ordered arcs of writing on AI engineering and the mental models behind building products.',
}

export default async function SeriesIndex() {
  const series = await getPublishedSeries()

  return (
    <section>
      <h1 className="text-display tracking-display">Series</h1>
      <p className="mt-4 text-title text-muted">
        Longer arcs, written to be read in order.
      </p>

      <ul className="mt-12 flex flex-col">
        {series.map((entry) => (
          <li key={entry.slug} className="group border-b border-hair py-6 last:border-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="shrink-0 text-label tabular-nums text-muted sm:w-[var(--rail)]">
                {entry.posts.length} {unitLabel(entry, entry.posts.length)}
              </p>

              <div>
                <h2 className="text-title font-bold text-ink">
                  <Link
                    href={`/series/${entry.slug}`}
                    className="hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </h2>
                <p className="mt-1 text-caption text-muted">
                  {entry.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
