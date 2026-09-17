'use client'

import { useEffect, useRef } from 'react'

type XWidgets = {
  load: (element?: HTMLElement) => void
}

declare global {
  interface Window {
    twttr?: { widgets?: XWidgets }
  }
}

export function XEmbed({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const render = () => window.twttr?.widgets?.load(container)

    if (window.twttr?.widgets) {
      render()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]',
    )

    if (!script) {
      script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      document.body.appendChild(script)
    }

    script.addEventListener('load', render)
    return () => script?.removeEventListener('load', render)
  }, [])

  return (
    <div ref={containerRef} className="x-embed" aria-label="Embedded post from X">
      <blockquote className="twitter-tweet">
        <a href={href}>{label}</a>
      </blockquote>
    </div>
  )
}
