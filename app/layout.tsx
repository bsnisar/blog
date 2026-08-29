import './global.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { baseUrl } from './sitemap'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Bohdan Snisar — Founder, Engineer',
    template: '%s | Bohdan Snisar',
  },
  description:
    'Founder and AI architect writing about building products, mindset shifts, and the craft of creating in the era of LLMs.',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${baseUrl}/rss` },
  },
  openGraph: {
    title: 'Bohdan Snisar — Insights on AI, Product Building, and Founder Mindset',
    description:
      'Sharp, practical writing on AI engineering, startup execution, and the mindset behind building meaningful products.',
    url: baseUrl,
    siteName: 'Bohdan Snisar',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <div className="mx-auto flex min-h-dvh max-w-shell flex-col px-5 pt-12 pb-16 sm:px-8">
          <Navbar />
          <main className="flex-auto pt-12">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
