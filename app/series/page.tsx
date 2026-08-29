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
      <h1 className="text-h1 tracking-h1">Series</h1>
      <p className="mt-4 max-w-measure text-title tracking-title text-muted">
        Longer arcs, written to be read in order.
      </p>

      <ul className="mt-12 flex flex-col border-t border-ink">
        {series.map((entry) => (
          <li key={entry.slug} className="group border-b border-hair py-6">
            <div className="grid gap-2 sm:grid-cols-[var(--rail)_minmax(0,1fr)] sm:gap-8">
              <p className="font-mono text-label tracking-label uppercase tabular-nums text-muted sm:pt-1">
                {entry.posts.length} {unitLabel(entry, entry.posts.length)}
              </p>

              <div>
                <h2 className="text-title font-medium tracking-title text-ink">
                  <Link
                    href={`/series/${entry.slug}`}
                    className="underline-offset-4 group-hover:underline"
                  >
                    {entry.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-measure text-caption text-muted">
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
