import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'
import { ALL_POSTS } from '@/lib/posts-runtime/posts.generated'
import { getBlogPostMetadata, getSeriesContext } from '@/lib/utils'
import { PostMeta } from '@/components/post-meta'
import { getSeries } from '@/lib/series'
import { SeriesBadge, SeriesNav } from '@/components/series-parts'
import { TagList } from '@/components/tag-list'
import { FollowBlock } from '@/components/follow'
import { baseUrl } from '@/app/sitemap'
import { alternates } from '@/lib/metadata'

type BlogPageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return ALL_POSTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await getBlogPostMetadata(slug)

  const url = `${baseUrl}/blog/${slug}`
  const image = metadata.image ?? `${url}/opengraph-image`

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: alternates(url),
    openGraph: {
      type: 'article',
      title: metadata.title,
      description: metadata.description,
      publishedTime: metadata.publishedAt,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${metadata.title} — Bohdan Snisar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [image],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getBlogPostMetadata(slug)
  const { metadata } = post
  const seriesContext = await getSeriesContext(post)
  const series = metadata.series ? getSeries(metadata.series.slug) : undefined
  const Post = nextDynamic(() => import('@/posts/' + slug + '.mdx'))

  return (
    <article>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: metadata.title,
            description: metadata.description,
            datePublished: metadata.publishedAt,
            keywords: metadata.tags?.join(', ') || undefined,
            url: `${baseUrl}/blog/${slug}`,
            author: { '@type': 'Person', name: 'Bohdan Snisar' },
          }),
        }}
      />

      <header>
        <h1 className="text-[2.375rem] leading-[1.12] font-normal sm:text-h1">{metadata.title}</h1>

        <PostMeta post={post} className="mt-3" />

        {series && metadata.series && seriesContext ? (
          <div className="mt-2">
            <SeriesBadge
              series={series}
              part={metadata.series.part}
              total={seriesContext.total}
            />
          </div>
        ) : null}

        <TagList tags={metadata.tags ?? []} className="mt-5" />
      </header>

      <div className="article mt-8">
        <Post />
      </div>

      {seriesContext ? <SeriesNav context={seriesContext} /> : null}

      <FollowBlock />
    </article>
  )
}
