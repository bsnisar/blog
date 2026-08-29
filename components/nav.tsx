'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/series', label: 'Series' },
  { href: 'https://www.linkedin.com/in/bsnisar/', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-3">
      <Link
        href="/"
        className="text-caption font-semibold tracking-title text-ink"
      >
        Bohdan Snisar
      </Link>

      <nav className="flex gap-6 text-small">
        {navItems.map(({ href, label }) => {
          const external = href.startsWith('http')
          const current =
            !external && (href === '/' ? pathname === '/' : pathname.startsWith(href))

          return (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-current={current ? 'page' : undefined}
              className={
                current
                  ? 'text-ink shadow-[inset_0_-1px_0_var(--color-accent)]'
                  : 'text-muted transition-colors hover:text-ink'
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
