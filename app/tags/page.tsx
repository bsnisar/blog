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
      <h1 className="text-display tracking-display">Tags</h1>
      <p className="mt-4 text-title text-muted">
        Every topic written about, ordered by how much there is to read.
      </p>

      <ul className="mt-12 flex flex-col">
        {tags.map((tag) => (
          <li key={tag.slug} className="group border-b border-hair last:border-0">
            <Link
              href={`/tags/${tag.slug}`}
              className="flex items-baseline justify-between gap-6 py-4"
            >
              <span className="text-caption text-muted group-hover:text-ink">
                {tag.label}
              </span>
              <span className="text-label tabular-nums text-faint">
                {tag.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
