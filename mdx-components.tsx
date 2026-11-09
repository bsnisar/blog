import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { Coda, Lede } from '@/components/editorial'
import { XEmbed } from '@/components/x-embed'

/** "01. Title" and "01 — Title", the two ways posts number their sections. */
const SECTION_NUMBER = /^(\d{1,2})(?:\.|\s+[—–-])\s+(.+)$/s

/**
 * A numbered section heading: the number set small in the sans, as a label
 * on the margin of the serif heading, so the two read as data and title.
 */
function SectionHeading({ children, ...props }: ComponentPropsWithoutRef<'h2'>) {
  const match = typeof children === 'string' ? children.match(SECTION_NUMBER) : null
  if (!match) return <h2 {...props}>{children}</h2>

  return (
    <h2 {...props}>
      <span className="section-number">{match[1]}</span>
      {match[2]}
    </h2>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Lede,
    Coda,
    XEmbed,
    h2: SectionHeading,
    ...components,
  }
}
