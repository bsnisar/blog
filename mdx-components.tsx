import type { MDXComponents } from 'mdx/types'
import { Coda, Lede } from '@/components/editorial'
import { XEmbed } from '@/components/x-embed'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Lede,
    Coda,
    XEmbed,
    ...components,
  }
}
