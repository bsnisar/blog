import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostList } from '@/components/posts'
import { getSeries, SERIES, unitLabel } from '@/lib/series'
import { getSeriesPosts } from '@/lib/utils'
import { baseUrl } from '@/app/sitemap'

type SeriesPageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const withPosts = await Promise.all(
    SERIES.map(async (series) => ({
      slug: series.slug,
      count: (await getSeriesPosts(series.slug)).length,
    }))
  )

  // A series defined but not yet written into gets no page until it has one.
  return withPosts.filter((s) => s.count > 0).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params
  const series = getSeries(slug)
  if (!series) return {}

  const url = `${baseUrl}/series/${slug}`

  return {
    title: series.title,
    description: series.description,
    alternates: { canonical: url },
    openGraph: {
      title: series.title,
      description: series.description,
      url,
      images: [{ url: `/og?title=${encodeURIComponent(series.title)}` }],
    },
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params
  const series = getSeries(slug)
  if (!series) notFound()

  const posts = await getSeriesPosts(slug)
  if (posts.length === 0) notFound()

  return (
    <section>
      <p className="font-mono text-label tracking-label uppercase text-muted">
        Series
      </p>
      <h1 className="mt-4 text-h1 tracking-h1">{series.title}</h1>
      <p className="mt-4 max-w-measure text-title tracking-title text-muted">
        {series.description}
      </p>

      <div className="mt-12 flex items-baseline justify-between border-b border-ink pb-3 font-mono text-label tracking-label uppercase text-muted">
        <span>In order</span>
        <span>
          {posts.length} {unitLabel(series, posts.length)}
        </span>
      </div>

      <div className="mt-2">
        <PostList posts={posts} rail="part" showSeries={false} />
      </div>
    </section>
  )
}
