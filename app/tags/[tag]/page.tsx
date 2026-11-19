import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostList } from '@/components/posts'
import { getAllTags, getPostsByTag } from '@/lib/utils'
import { baseUrl } from '@/app/sitemap'
import { alternates } from '@/lib/metadata'

type TagPageProps = { params: Promise<{ tag: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(({ slug }) => ({ tag: slug }))
}

async function findTag(slug: string) {
  const tags = await getAllTags()
  return tags.find((tag) => tag.slug === slug)
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: slug } = await params
  const tag = await findTag(slug)
  if (!tag) return {}

  const description = `Everything written about ${tag.label}.`
  const url = `${baseUrl}/tags/${tag.slug}`

  return {
    title: tag.label,
    description,
    alternates: alternates(url),
    openGraph: {
      title: tag.label,
      description,
      url,
      images: [{ url: `/og?title=${encodeURIComponent(tag.label)}` }],
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params
  const tag = await findTag(slug)
  if (!tag) notFound()

  const posts = await getPostsByTag(slug)

  return (
    <section>
      <p className="text-label text-muted">Tag</p>
      <h1 className="mt-2 text-display tracking-display">{tag.label}</h1>

      <div className="mt-12 flex items-baseline justify-between pb-3 text-label text-muted">
        <span>Writing</span>
        <span>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      <div>
        <PostList posts={posts} />
      </div>
    </section>
  )
}
