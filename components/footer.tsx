/** One quiet line under everything. The header already carries the links. */
export function Footer() {
  return (
    <footer className="mt-28 text-center text-meta text-muted">
      <p>© {new Date().getFullYear()} Bohdan Snisar</p>
    </footer>
  )
}
