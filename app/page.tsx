import { BlogPosts } from '@/components/posts'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/'),
}

export default function Page() {
  return (
    <>
      <section className="max-w-measure">
        <h1 className="text-display tracking-display">
          Engineer, founder, explorer.
        </h1>

        <p className="mt-8 text-title tracking-title text-muted">
          I write about building AI products, and about the mindset shift from
          engineer to founder. Clarity beats complexity, pace beats perfection,
          decisions beat theory.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="border-b border-ink pb-3 font-mono text-label tracking-label uppercase text-muted">
          Writing
        </h2>
        <div className="mt-2">
          <BlogPosts />
        </div>
      </section>
    </>
  )
}
