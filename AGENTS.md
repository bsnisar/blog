# Project Design Direction

The blog reads like a paper set in LaTeX, after yegor256.com: the writing is the design.

- One face for reading: CMU Serif (Computer Modern), loaded from `app/fonts/` in `app/layout.tsx`. Titles and headings use the book weight (400), not bold.
- One centred column (`--container-shell`, 40rem). The masthead is centred: the round photo (links to `/about`), the icon row, then the four sections.
- White paper, near-black ink, one red accent for links. Links are red words, underlined only on hover. Muted grey carries the meta line (date, word count, minutes to read).
- The home page is a feed: title, meta line, opening paragraphs, "Continue...". Other lists are a title with its date beneath.
- Tags are small grey typewriter labels. Code sits on a light grey slab in IBM Plex Mono.
- Colours, sizes and fonts are tokens in `app/global.css`. Add one there rather than writing a raw value into a component.
- Avoid cards, shadows, gradients, rounded boxes, uppercase tracked labels, decorative icons and anything that makes the page look designed rather than written.
