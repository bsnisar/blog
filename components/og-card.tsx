const PAPER = '#FBFBFA'
const INK = '#14161A'
const MUTED = '#6B7078'
const RULE = '#E4E4E1'
const ACCENT = '#C0292F'

type OgCardProps = {
  title: string
  label?: string
}

export function OgCard({ title, label = 'Essay' }: OgCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: PAPER,
        color: INK,
        padding: '72px 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: `2px solid ${INK}`,
          paddingBottom: 20,
          fontSize: 22,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: MUTED,
        }}
      >
        <span>Bohdan Snisar</span>
        <span>{label}</span>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 70 ? 60 : 76,
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          fontWeight: 600,
          maxWidth: 960,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: `1px solid ${RULE}`,
          paddingTop: 20,
          fontSize: 22,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: MUTED,
        }}
      >
        <span
          style={{
            width: 28,
            height: 3,
            backgroundColor: ACCENT,
            marginRight: 20,
          }}
        />
        <span>b128s.dev</span>
      </div>
    </div>
  )
}
