import { BlogPosts } from '@/components/posts'

export default function Page() {
  return (
    <main className="max-w-2xl">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Hi, I'm Bohdan, engineer, founder and explorer. 

      </h1>

      <p className="mb-4">
        I began in corporate engineering and consulting. Later I moved into startups and started building my own products — and the shift changed how I think.
      </p>

      <p className="mb-4">
        In startups, mindset becomes infrastructure: clarity beats complexity, pace beats perfection and decisions beat theory.
      </p>


      <p className="mb-4">Here, I write about:</p>

      <ul className="mb-4 ml-6 list-disc space-y-1">
        <li>Building AI products with speed and precision</li>
        <li>The mindset shift from engineer to founder</li>
        <li>Systems and mental models that drive momentum</li>
        <li>Lessons from creating two AI startups back-to-back</li>
      </ul>



      <p className="mt-6 font-medium">
        If you're building and thinking long-term — welcome.
      </p>


      <div className="my-8">
        <BlogPosts />
      </div>
    </main>
  )
}