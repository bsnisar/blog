import Link from 'next/link'
import { SOCIAL } from '@/lib/social'

const links = [...SOCIAL, { href: '/rss', label: 'RSS' }]

export function Footer() {
  return (
    <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-rule pt-4 text-label text-muted">
      <div className="flex flex-wrap gap-5">
        {links.map(({ href, label }) => {
          const external = href.startsWith('http')
          return (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="hover:text-ink"
            >
              {label}
            </Link>
          )
        })}
      </div>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  )
}
