import { BlogPosts } from '@/components/posts'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/blog'),
  title: 'Blog',
  description:
    'Writing on AI engineering, startup execution, and the mental models behind building products.',
}

export default function Page() {
  return (
    <section>
      <h1 className="text-h1 tracking-h1">Writing</h1>
      <p className="mt-4 max-w-measure text-title tracking-title text-muted">
        On AI engineering, startup execution, and the mental models that decide
        whether a company survives its founders.
      </p>

      <div className="mt-12 border-t border-ink pt-2">
        <BlogPosts />
      </div>
    </section>
  )
}
