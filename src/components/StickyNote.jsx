const CATEGORY_COLORS = {
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

const CATEGORY_DOTS = {
  STOP: '#e85d4a',
  START: '#2eaa60',
  CONTINUE: '#1a8cd8',
}

export default function StickyNote({ response, category, flag, index }) {
  const bgColor = CATEGORY_COLORS[category] ?? '#FDF5A3'
  const dotColor = CATEGORY_DOTS[category] ?? '#888'

  // Deterministic rotation between -4 and +4 degrees
  const rotation = ((index * 7 + 3) % 9) - 4

  const isFlagged = flag && flag.trim() !== ''

  return (
    <div
      style={{
        background: bgColor,
        borderRadius: 2,
        padding: '1.1rem 1rem 1rem',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
        opacity: isFlagged ? 0.6 : 1,
        position: 'relative',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.04)`
        e.currentTarget.style.boxShadow = '4px 8px 24px rgba(0,0,0,0.22)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`
        e.currentTarget.style.boxShadow = '2px 4px 12px rgba(0,0,0,0.15)'
        e.currentTarget.style.zIndex = ''
      }}
    >
      {/* Top strip (mimics sticky note adhesive edge) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `rgba(0,0,0,0.04)`,
          borderRadius: '2px 2px 0 0',
        }}
      />

      {/* Header row: category dot + flag indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: dotColor,
            flexShrink: 0,
          }}
          title={category}
        />
        {isFlagged && (
          <span
            title="Partial / illegible"
            style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-body)',
              color: '#666',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: 4,
              padding: '1px 5px',
              letterSpacing: '0.04em',
            }}
          >
            ~partial
          </span>
        )}
      </div>

      {/* Response text */}
      <p
        style={{
          fontFamily: 'var(--font-hand)',
          fontSize: '1.25rem',
          lineHeight: 1.45,
          color: '#1a1a1a',
          margin: 0,
          flex: 1,
          wordBreak: 'break-word',
        }}
      >
        {response}
      </p>
    </div>
  )
}
