import './global.css'
import type { Metadata } from 'next'
import { Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { baseUrl } from './sitemap'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
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
    default: 'Bohdan Snisar',
    template: '%s | Bohdan Snisar',
  },
  description:
    'Writing about building AI products, startup execution, and the mindset shift from engineer to founder.',
  openGraph: {
    title: 'Bohdan Snisar',
    description:
      'Writing about building AI products, startup execution, and the mindset shift from engineer to founder.',
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
    <html lang="en" className={`${sourceSerif.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <div className="mx-auto flex min-h-dvh max-w-shell flex-col px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
          <Navbar />
          <main className="flex-auto pt-10 sm:pt-14">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
