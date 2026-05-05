import { useState, useMemo } from 'react'
import StickyNote from './StickyNote.jsx'

const FILTERS = ['ALL', 'STOP', 'START', 'CONTINUE']

const FILTER_COLORS = {
  ALL: '#FBD767',
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

// Deterministic Fisher-Yates-style shuffle using a numeric seed
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

export default function StickyNotesWall({ data }) {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [shuffleKey, setShuffleKey] = useState(1)

  const filtered = useMemo(() => {
    const base = activeFilter === 'ALL'
      ? data
      : data.filter((d) => d.category === activeFilter)
    return seededShuffle(base, shuffleKey)
  }, [data, activeFilter, shuffleKey])

  const handleShuffle = () => {
    setShuffleKey((k) => k + 1)
  }

  return (
    <section
      id="data"
      style={{
        background: '#FAFAF8',
        padding: '5rem 2rem',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              letterSpacing: '-0.03em',
              margin: '0 0 0.5rem',
              color: 'var(--dark)',
            }}
          >
            The Data
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#666',
              margin: 0,
            }}
          >
            Browse all {data.length} responses from the workshop. Filter by category or shuffle for a fresh view.
          </p>
        </div>

        {/* Controls row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          {/* Filter pills */}
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.875rem',
                padding: '0.45rem 1.1rem',
                borderRadius: 999,
                border: '2px solid',
                borderColor: activeFilter === f ? 'transparent' : 'var(--gray)',
                background: activeFilter === f ? FILTER_COLORS[f] : 'white',
                color: 'var(--dark)',
                cursor: 'pointer',
                transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
                boxShadow: activeFilter === f ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== f) {
                  e.currentTarget.style.background = FILTER_COLORS[f]
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f) {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = 'var(--gray)'
                }
              }}
            >
              {f === 'ALL' ? 'All' : f}
            </button>
          ))}

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 24,
              background: 'var(--gray)',
              margin: '0 0.25rem',
            }}
          />

          {/* Shuffle button */}
          <button
            onClick={handleShuffle}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.875rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 999,
              border: '2px solid var(--gray)',
              background: 'white',
              color: 'var(--dark)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'background 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--yellow)'
              e.currentTarget.style.borderColor = 'transparent'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = 'var(--gray)'
            }}
          >
            <span role="img" aria-label="shuffle">🔀</span> Shuffle
          </button>

          {/* Count badge */}
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: '#888',
            }}
          >
            Showing {filtered.length} note{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Notes grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={`${item.id}-${shuffleKey}`}
              className="fade-in-up"
              style={{
                animationDelay: `${Math.min(idx, 50) * 30}ms`,
              }}
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
    </section>
  )
}
