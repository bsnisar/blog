import './global.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import {Footer} from '@/components/footer'
import { baseUrl } from './sitemap'
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
})

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-serif',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Bohdan Snisar — Founder, Engineer',
    template: '%s | Bohdan Snisar',
  },
  description:
    'Founder and AI architect writing about building products, mindset shifts, and the craft of creating in the era of LLMs.',
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

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        plexSans.variable,
        plexSerif.variable,
        plexMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
