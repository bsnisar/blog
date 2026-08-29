import type { MDXComponents } from 'mdx/types'
import { Coda, Lede } from '@/components/editorial'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Lede,
    Coda,
    ...components,
  }
}
