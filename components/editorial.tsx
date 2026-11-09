/**
 * Recurring furniture for dispatch-style posts. Available to every MDX file
 * through mdx-components.tsx, so a post uses <Lede> and <Coda> without
 * importing anything.
 */

/**
 * The opening: the argument stated before the evidence. It reads as the
 * first paragraphs of the post, with no box or rule around it, so the home
 * page excerpt and the page itself open the same way.
 */
export function Lede({ children }: { children: React.ReactNode }) {
  return <div className="lede">{children}</div>
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
    <div className="mt-14">
      <div className="coda text-title italic text-ink">{children}</div>
      {next ? <p className="mt-4 font-sans text-meta tracking-label text-muted">Next: {next}</p> : null}
    </div>
  )
}
