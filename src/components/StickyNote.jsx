const CATEGORY_COLORS = {
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

function fontSizeForLength(len) {
  if (len < 40)  return '1.75rem'
  if (len < 70)  return '1.5rem'
  if (len < 100) return '1.3rem'
  if (len < 140) return '1.1rem'
  if (len < 180) return '0.95rem'
  return '0.82rem'
}

export default function StickyNote({ response, category, flag, index }) {
  const bgColor = CATEGORY_COLORS[category] ?? '#FDF5A3'
  const rotation = ((index * 7 + 3) % 9) - 4
  const isFlagged = flag && flag.trim() !== ''
  const fontSize = fontSizeForLength(response?.length ?? 0)

  return (
    <div
      style={{
        background: bgColor,
        borderRadius: 2,
        padding: '1.4rem 1.25rem',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
        opacity: isFlagged ? 0.6 : 1,
        position: 'relative',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
      {/* Adhesive strip at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 7,
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '2px 2px 0 0',
        }}
      />

      {isFlagged && (
        <span
          title="Partial / illegible"
          style={{
            position: 'absolute',
            top: '0.6rem',
            right: '0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-body)',
            color: '#666',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: 4,
            padding: '1px 5px',
          }}
        >
          ~partial
        </span>
      )}

      <p
        style={{
          fontFamily: 'var(--font-hand)',
          fontSize,
          lineHeight: 1.35,
          color: '#1a1a1a',
          margin: 0,
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {response}
      </p>
    </div>
  )
}
