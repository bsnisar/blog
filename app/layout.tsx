import './global.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { baseUrl } from './sitemap'

/*
 * CMU Serif, the Unicode build of Knuth's Computer Modern: the face of
 * every LaTeX paper. SIL Open Font License; the files come from the
 * computer-modern package on npm. Its 500 cut is the book weight, so it
 * is declared as 400 to be what plain text uses.
 */
const cmuSerif = localFont({
  src: [
    { path: './fonts/cmu-serif-500-roman.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cmu-serif-500-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/cmu-serif-700-roman.woff2', weight: '700', style: 'normal' },
    { path: './fonts/cmu-serif-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-cmu',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
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
    <html lang="en" className={`${cmuSerif.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <div className="mx-auto flex min-h-dvh max-w-shell flex-col px-5 pt-12 pb-12 sm:px-8 sm:pt-16">
          <Navbar />
          <main className="flex-auto pt-16 sm:pt-20">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
