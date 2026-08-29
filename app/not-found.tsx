import Link from 'next/link'

export const metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return (
    <section className="max-w-measure">
      <p className="font-mono text-label tracking-label uppercase text-muted">
        Error 404
      </p>
      <h1 className="mt-4 text-h1 tracking-h1">This page doesn't exist</h1>
      <p className="mt-4 text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block border-b border-current text-accent"
      >
        Read the writing instead
      </Link>
    </section>
  )
}
