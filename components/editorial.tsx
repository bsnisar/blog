/**
 * Recurring furniture for dispatch-style posts. Available to every MDX file
 * through mdx-components.tsx, so a post uses <Lede> and <Coda> without
 * importing anything.
 */

/**
 * The standfirst: the argument stated before the evidence. Set larger than
 * body text and closed with a rule, so a reader who stops here still leaves
 * with the position.
 */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <div className="lede border-b border-ink pb-8 text-title tracking-title text-ink">
      {children}
    </div>
  )
}

/**
 * The sign-off: the standing maxim, and what the next issue takes on.
 */
export function Coda({
  next,
  children,
}: {
  next?: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-16 border-t border-ink pt-6">
      <div className="coda max-w-measure text-title tracking-title text-ink">
        {children}
      </div>
      {next ? (
        <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-label tracking-label uppercase text-faint">
            Next
          </span>
          <span className="text-caption text-muted">{next}</span>
        </p>
      ) : null}
    </div>
  )
}
