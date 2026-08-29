import { BlogPosts } from '@/components/posts'

export default function Page() {
  return (
    <>
      <section className="max-w-measure">
        <h1 className="text-display tracking-display">
          Engineer, founder, explorer.
        </h1>

        <div className="mt-10 flex flex-col gap-6">
          <p>
            I began in corporate engineering and consulting. Later I moved into
            startups and started building my own products — and the shift changed
            how I think.
          </p>
          <p>
            In startups, mindset becomes infrastructure: clarity beats
            complexity, pace beats perfection, and decisions beat theory.
          </p>
        </div>

        <h2 className="mt-12 font-mono text-label tracking-label uppercase text-muted">
          What I write about
        </h2>

        <ul className="mt-4 flex flex-col gap-2">
          {[
            'Building AI products with speed and precision',
            'The mindset shift from engineer to founder',
            'Systems and mental models that drive momentum',
            'Lessons from creating two AI startups back-to-back',
          ].map((item) => (
            <li key={item} className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-[0.72em] h-px w-2 bg-faint"
              />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-10">
          If you're building and thinking long-term — welcome.
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
