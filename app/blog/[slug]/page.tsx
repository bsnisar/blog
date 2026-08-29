import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'
import { ALL_POSTS } from '@/lib/posts-runtime/posts.generated'
import { formatDate, formatDateNumeric, getBlogPostMetadata } from '@/lib/utils'
import { baseUrl } from '@/app/sitemap'

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
  const image =
    metadata.image ?? `/og?title=${encodeURIComponent(metadata.title)}`

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: metadata.title,
      description: metadata.description,
      publishedTime: metadata.publishedAt,
      url,
      images: [{ url: image }],
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
  const { metadata } = await getBlogPostMetadata(slug)
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
            url: `${baseUrl}/blog/${slug}`,
            author: { '@type': 'Person', name: 'Bohdan Snisar' },
          }),
        }}
      />

      <header className="max-w-measure">
        <h1 className="text-h1 tracking-h1">{metadata.title}</h1>
        <p className="mt-4 border-b border-rule pb-4 font-mono text-label tracking-label uppercase text-muted">
          <time dateTime={metadata.publishedAt} title={formatDate(metadata.publishedAt)}>
            {formatDateNumeric(metadata.publishedAt)}
          </time>
        </p>
      </header>

      <div className="article mt-10">
        <Post />
      </div>
    </article>
  )
}
