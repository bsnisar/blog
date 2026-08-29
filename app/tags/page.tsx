import Link from 'next/link'
import { getAllTags } from '@/lib/utils'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/tags'),
  title: 'Tags',
  description: 'Every topic written about, by how much there is to read.',
}

export default async function TagsIndex() {
  const tags = await getAllTags()

  return (
    <section>
      <h1 className="text-h1 tracking-h1">Tags</h1>
      <p className="mt-4 max-w-measure text-title tracking-title text-muted">
        Every topic written about, ordered by how much there is to read.
      </p>

      <ul className="mt-12 flex flex-col border-t border-ink">
        {tags.map((tag) => (
          <li key={tag.slug} className="group border-b border-hair">
            <Link
              href={`/tags/${tag.slug}`}
              className="flex items-baseline justify-between gap-6 py-4"
            >
              <span className="font-mono text-label tracking-label uppercase text-muted transition-colors group-hover:text-ink">
                {tag.label}
              </span>
              <span className="font-mono text-label tabular-nums text-faint">
                {tag.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
