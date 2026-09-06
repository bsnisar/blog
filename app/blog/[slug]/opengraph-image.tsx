import { ImageResponse } from 'next/og'
import { OgCard } from '@/components/og-card'
import { ALL_POSTS } from '@/lib/posts-runtime/posts.generated'
import { getBlogPostMetadata } from '@/lib/utils'

export const alt = 'Bohdan Snisar essay'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamicParams = false

export function generateStaticParams() {
  return ALL_POSTS.map(({ slug }) => ({ slug }))
}

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>
}

export default async function OpenGraphImage({
  params,
}: OpenGraphImageProps) {
  const { slug } = await params
  const { metadata } = await getBlogPostMetadata(slug)

  return new ImageResponse(<OgCard title={metadata.title} />, size)
}
