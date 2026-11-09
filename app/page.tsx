import { BlogPosts } from '@/components/posts'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/'),
}

export default function Page() {
  return (
    <>
      <section>
        <h1 className="text-display tracking-display">
          Bohdan Snisar
        </h1>
        <p className="mt-4 text-title text-muted">
          I write about building AI products, startup execution, and the
          mindset shift from engineer to founder.
        </p>
      </section>

      <section className="mt-14">
        <BlogPosts />
      </section>
    </>
  )
}
