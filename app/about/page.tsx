import Link from 'next/link'
import { SOCIAL } from '@/lib/social'
import { alternates } from '@/lib/metadata'

export const metadata = {
  alternates: alternates('/about'),
  title: 'About',
  description:
    'Bohdan Snisar, founder and engineer, building CutCraft and Cutleap and writing about AI products and the shift from engineer to founder.',
}

export default function AboutPage() {
  return (
    <article>
      <h1 className="text-[2.375rem] leading-[1.12] font-normal sm:text-h1">About</h1>

      <div className="article mt-8">
        <p>
          I am Bohdan Snisar, an engineer who became a founder. I write about
          building AI products, and about the mindset shift that move takes:
          clarity over complexity, pace over perfection, decisions over theory.
        </p>

        <p>
          My first startup failed. We had cloud credits, enterprise experience
          and a proper architecture, and we built it well. That was the
          problem, and I wrote about it in{' '}
          <Link href="/blog/KISS-or-Die">KISS or Die</Link>.
        </p>

        <p>
          Now I am building an agentic video editor.{' '}
          <a href="https://prefix-tree.github.io/cutcraft/">CutCraft</a> is its
          open-source foundation, a video editor as code, and{' '}
          <a href="https://cutleap.com/">Cutleap</a> is the editor built on top
          of it. Why it starts with source code is in{' '}
          <Link href="/blog/An-Agentic-Video-Editor-Starts-With-Source-Code">
            this post
          </Link>
          .
        </p>

        <p>
          You can find me on{' '}
          {SOCIAL.map((link, i) => (
            <span key={link.href}>
              {i > 0 && (i === SOCIAL.length - 1 ? ' and ' : ', ')}
              <a href={link.href} rel="me noopener noreferrer" target="_blank">
                {link.label}
              </a>
            </span>
          ))}
          , or follow the writing by <Link href="/rss">RSS</Link>.
        </p>
      </div>
    </article>
  )
}
