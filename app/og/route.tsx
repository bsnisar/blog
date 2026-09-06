import { ImageResponse } from 'next/og'
import { OgCard } from '@/components/og-card'

export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || 'Bohdan Snisar'

  return new ImageResponse(<OgCard title={title} />, {
    width: 1200,
    height: 630,
  })
}
