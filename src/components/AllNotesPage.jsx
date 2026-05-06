import { useState, useMemo, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'
import StickyNote from './StickyNote.jsx'

const FILTERS = ['ALL', 'STOP', 'START', 'CONTINUE']
const FILTER_COLORS = {
  ALL: '#FBD767',
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

const PAGE_SIZE = 120

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
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const inputRef = useRef(null)

  // Build Fuse index once
  const fuse = useMemo(() => new Fuse(data, {
    keys: ['response'],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  }), [data])

  // Base pool: filter by category
  const pool = useMemo(() => {
    const base = activeFilter === 'ALL' ? data : data.filter(d => d.category === activeFilter)
    return seededShuffle(base, shuffleKey)
  }, [data, activeFilter, shuffleKey])

  // Search results with scores
  const searchResults = useMemo(() => {
    if (!query.trim()) return null
    // Run fuse over the full dataset, then filter by active category
    const raw = fuse.search(query.trim())
    const filtered = activeFilter === 'ALL'
      ? raw
      : raw.filter(r => r.item.category === activeFilter)
    return filtered // [{item, score}, ...]
  }, [query, fuse, activeFilter])

  const isSearching = searchResults !== null

  // Items to render
  const allItems = isSearching
    ? searchResults.map(r => ({ ...r.item, _score: r.score }))
    : pool

  const displayed = allItems.slice(0, page * PAGE_SIZE)
  const hasMore = displayed.length < allItems.length

  const handleFilterChange = (f) => {
    setActiveFilter(f)
    setPage(1)
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const clearSearch = useCallback(() => {
    setQuery('')
    setPage(1)
    inputRef.current?.focus()
  }, [])

  const counts = useMemo(() => ({
    ALL: data.length,
    STOP: data.filter(d => d.category === 'STOP').length,
    START: data.filter(d => d.category === 'START').length,
    CONTINUE: data.filter(d => d.category === 'CONTINUE').length,
  }), [data])

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
        padding: '0.75rem 2rem',
      }}>
        {/* Top row: back + title + category filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
              padding: '0.4rem 0.9rem', borderRadius: 999,
              border: '1.5px solid var(--gray)', background: 'white',
              color: 'var(--dark)', cursor: 'pointer',
            }}
          >
            ← Back
          </button>

          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1rem', color: 'var(--dark)', letterSpacing: '-0.01em',
          }}>
            All Responses
          </span>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginLeft: 'auto', alignItems: 'center' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem',
                  padding: '0.35rem 0.85rem', borderRadius: 999,
                  border: '1.5px solid',
                  borderColor: activeFilter === f ? 'transparent' : 'var(--gray)',
                  background: activeFilter === f ? FILTER_COLORS[f] : 'white',
                  color: 'var(--dark)', cursor: 'pointer',
                  transition: 'background 0.12s, border-color 0.12s',
                }}
              >
                {f === 'ALL' ? `All (${counts.ALL})` : `${f} (${counts[f]})`}
              </button>
            ))}
            <button
              onClick={() => { setShuffleKey(k => k + 1); setPage(1) }}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem',
                padding: '0.35rem 0.85rem', borderRadius: 999,
                border: '1.5px solid var(--gray)', background: 'white',
                color: 'var(--dark)', cursor: 'pointer',
              }}
            >
              🔀
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
            fontSize: '1.1rem', pointerEvents: 'none', color: '#888',
          }}>
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search responses… try "policy", "essays", "trust", "flint""
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              padding: '0.7rem 3rem 0.7rem 2.6rem',
              borderRadius: 10,
              border: `2px solid ${query ? 'var(--dark)' : 'var(--gray)'}`,
              background: 'white',
              color: 'var(--dark)',
              outline: 'none',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--dark)'}
            onBlur={e => { if (!query) e.target.style.borderColor = 'var(--gray)' }}
          />
          {query && (
            <button
              onClick={clearSearch}
              style={{
                position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.1rem', color: '#aaa', lineHeight: 1, padding: '0.2rem',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Results summary ── */}
      <div style={{ padding: '1.25rem 2rem 0', maxWidth: 1400, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#888', margin: 0 }}>
          {isSearching
            ? <>Found <strong style={{ color: 'var(--dark)' }}>{allItems.length}</strong> match{allItems.length !== 1 ? 'es' : ''} for "<em>{query}</em>"</>
            : <>{allItems.length} response{allItems.length !== 1 ? 's' : ''}</>
          }
          {displayed.length < allItems.length && ` — showing ${displayed.length}`}
        </p>
      </div>

      {/* ── Grid ── */}
      <div style={{ padding: '1.25rem 2rem 3rem', maxWidth: 1400, margin: '0 auto' }}>
        {allItems.length === 0 && isSearching && (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            fontFamily: 'var(--font-body)', color: '#aaa', fontSize: '1rem',
          }}>
            No responses matched "<em>{query}</em>". Try a different word.
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.1rem',
          alignItems: 'start',
        }}>
          {displayed.map((item, idx) => {
            // Score 0 = perfect match, 1 = no match
            // Dim non-top-matches when searching
            const score = item._score ?? 0
            const isWeak = isSearching && score > 0.45
            return (
              <div
                key={`${item.id}-${shuffleKey}`}
                className={!isSearching ? 'fade-in-up' : undefined}
                style={{
                  animationDelay: !isSearching ? `${Math.min(idx, 40) * 10}ms` : undefined,
                  opacity: isWeak ? 0.18 : 1,
                  transform: isSearching && !isWeak && score < 0.2 ? 'scale(1.03)' : undefined,
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                  zIndex: isSearching && !isWeak ? 1 : 0,
                  position: 'relative',
                }}
              >
                <StickyNote
                  response={item.response}
                  category={item.category}
                  flag={item.flag}
                  index={parseInt(item.id, 10) || idx}
                />
              </div>
            )
          })}
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => setPage(p => p + 1)}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.95rem',
                padding: '0.7rem 2rem', borderRadius: 999,
                border: '2px solid var(--dark)', background: 'transparent',
                color: 'var(--dark)', cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--dark)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)' }}
            >
              Load more ({allItems.length - displayed.length} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
