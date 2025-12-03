import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mb-16 mt-20 text-sm text-neutral-500">
      <div className="flex flex-wrap gap-4">
        <Link
          href="https://x.com/BSnisar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-700"
        >
          ↗ X
        </Link>
        <Link
          href="https://www.linkedin.com/in/bsnisar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-700"
        >
          ↗ LinkedIn
        </Link>
        <Link
          href="https://github.com/bsnisar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-700"
        >
          ↗ GitHub
        </Link>
        <Link href="/blog" className="hover:text-neutral-700">
          ↗ Blog
        </Link>
      </div>

      <p className="mt-4">
        © {new Date().getFullYear()} Bohdan Snisar — All Rights Reserved
      </p>
    </footer>
  )
}
