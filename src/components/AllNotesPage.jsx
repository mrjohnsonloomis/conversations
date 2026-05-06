import { useState, useMemo } from 'react'
import StickyNote from './StickyNote.jsx'

const FILTERS = ['ALL', 'STOP', 'START', 'CONTINUE']
const FILTER_COLORS = {
  ALL: '#FBD767',
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = ((s * 1664525) + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function AllNotesPage({ data, onBack }) {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [shuffleKey, setShuffleKey] = useState(1)

  const visible = useMemo(() => {
    const base = activeFilter === 'ALL'
      ? data
      : data.filter((d) => d.category === activeFilter)
    return seededShuffle(base, shuffleKey)
  }, [data, activeFilter, shuffleKey])

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Header bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0 2rem',
          height: 56,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={onBack}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '0.875rem',
            padding: '0.4rem 0.9rem',
            borderRadius: 999,
            border: '1.5px solid var(--gray)',
            background: 'white',
            color: 'var(--dark)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          ← Back
        </button>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--dark)',
            letterSpacing: '-0.01em',
          }}
        >
          All Responses
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.8rem',
                padding: '0.35rem 0.9rem',
                borderRadius: 999,
                border: '1.5px solid',
                borderColor: activeFilter === f ? 'transparent' : 'var(--gray)',
                background: activeFilter === f ? FILTER_COLORS[f] : 'white',
                color: 'var(--dark)',
                cursor: 'pointer',
              }}
            >
              {f === 'ALL' ? `All (${data.length})` : `${f} (${data.filter(d => d.category === f).length})`}
            </button>
          ))}
          <button
            onClick={() => setShuffleKey((k) => k + 1)}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.8rem',
              padding: '0.35rem 0.9rem',
              borderRadius: 999,
              border: '1.5px solid var(--gray)',
              background: 'white',
              color: 'var(--dark)',
              cursor: 'pointer',
            }}
          >
            🔀 Shuffle
          </button>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#888', marginBottom: '1.5rem' }}>
          Showing {visible.length} response{visible.length !== 1 ? 's' : ''}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          {visible.map((item, idx) => (
            <div
              key={`${item.id}-${shuffleKey}`}
              className="fade-in-up"
              style={{ animationDelay: `${Math.min(idx, 40) * 15}ms` }}
            >
              <StickyNote
                response={item.response}
                category={item.category}
                flag={item.flag}
                index={parseInt(item.id, 10) || idx}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
