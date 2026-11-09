import Link from 'next/link'
import { AVATAR, SOCIAL } from '@/lib/social'
import { IconSvg, type ICONS } from '@/components/icons'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/series', label: 'Series' },
  { href: '/tags', label: 'Tags' },
]

const ICON_FOR: Record<string, keyof typeof ICONS> = {
  LinkedIn: 'linkedin',
  X: 'x',
  GitHub: 'github',
}

const iconLinks = [
  ...SOCIAL.map((link) => ({ href: link.href, label: link.label, icon: ICON_FOR[link.label] })),
  { href: '/rss', label: 'RSS', icon: 'rss' as const },
].filter((link) => link.icon)

/**
 * The masthead, centred like a book's title page: the photo, the places to
 * follow, and the four sections.
 */
export function Navbar() {
  return (
    <header className="flex flex-col items-center text-center">
      <Link href="/about" aria-label="About Bohdan Snisar" title="About me" className="block">
        {AVATAR ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={AVATAR}
            alt="Bohdan Snisar"
            width={112}
            height={112}
            className="size-24 rounded-full object-cover grayscale sm:size-28"
          />
        ) : (
          <span className="flex size-24 items-center justify-center rounded-full bg-ink text-[2.25rem] text-paper sm:size-28 sm:text-[2.75rem]">
            BS
          </span>
        )}
      </Link>

      <ul className="mt-6 flex items-center gap-5">
        {iconLinks.map((link) => {
          const external = link.href.startsWith('http')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'me noopener noreferrer' : undefined}
                aria-label={link.label}
                title={link.label}
                className="block text-ink hover:text-accent"
              >
                <IconSvg name={link.icon} className="size-6" />
              </Link>
            </li>
          )
        })}
      </ul>

      <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-nav">
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href} className="text-ink hover:text-accent">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
