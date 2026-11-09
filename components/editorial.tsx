/**
 * Recurring furniture for dispatch-style posts. Available to every MDX file
 * through mdx-components.tsx, so a post uses <Lede> and <Coda> without
 * importing anything.
 */

/**
 * The standfirst: the argument stated before the evidence. Larger than
 * body text, italic, closed with a rule.
 */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <div className="lede border-b border-rule pb-8 text-title italic text-ink">
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
    <div className="mt-16 border-t border-rule pt-6">
      <div className="coda text-title font-bold text-ink">
        {children}
      </div>
      {next ? (
        <p className="mt-4 text-caption text-muted italic">
          Next: {next}
        </p>
      ) : null}
    </div>
  )
}
