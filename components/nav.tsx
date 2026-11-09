'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/series', label: 'Series' },
  { href: '/tags', label: 'Tags' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-6">
      <Link href="/" className="text-title font-bold text-ink">
        Bohdan Snisar
      </Link>

      <nav className="flex gap-5 text-caption">
        {navItems.map(({ href, label }) => {
          const current =
            href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? 'page' : undefined}
              className={
                current
                  ? 'text-ink underline underline-offset-4'
                  : 'text-muted hover:text-ink'
              }
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
