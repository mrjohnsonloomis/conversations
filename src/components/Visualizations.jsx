import { useEffect, useRef, useState } from 'react'

const CATEGORY_COLORS = {
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

const CATEGORY_DARK = {
  STOP: '#c0392b',
  START: '#27ae60',
  CONTINUE: '#2980b9',
}

function ClusterCard({ cluster, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        border: `2px solid ${color}`,
        padding: '1rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
      }}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
        <span
          style={{
            background: color,
            borderRadius: 999,
            padding: '0.15rem 0.6rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--dark)',
            flexShrink: 0,
          }}
        >
          {cluster.count}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--dark)',
          }}
        >
          {cluster.label}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#aaa' }}>
          {open ? '▲' : '▼'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
        {cluster.terms.slice(0, 5).map((t) => (
          <span
            key={t}
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-body)',
              color: '#666',
              background: '#f5f5f5',
              borderRadius: 4,
              padding: '1px 6px',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {open && cluster.samples.length > 0 && (
        <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {cluster.samples.map((s, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1rem',
                color: '#333',
                margin: 0,
                background: color + '55',
                borderRadius: 6,
                padding: '0.4rem 0.6rem',
                lineHeight: 1.4,
              }}
            >
              "{s}"
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function PhraseBar({ phrase, score, maxScore, color }) {
  const pct = Math.max(6, Math.round((score / maxScore) * 100))
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--dark)',
          width: 160,
          flexShrink: 0,
          textAlign: 'right',
        }}
      >
        {phrase}
      </span>
      <div
        style={{
          height: 18,
          background: color,
          borderRadius: 4,
          width: `${pct}%`,
          transition: 'width 0.6s ease',
          flexShrink: 0,
        }}
      />
    </div>
  )
}

export default function Visualizations() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('STOP')
  const [activePhraseCat, setActivePhraseCat] = useState('STOP')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('./data/analysis.json')
      .then((r) => r.json())
      .then(setAnalysis)
      .catch(() => {})
  }, [])

  const tabBtnStyle = (cat) => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '0.85rem',
    padding: '0.4rem 1rem',
    borderRadius: 999,
    border: '2px solid',
    borderColor: 'transparent',
    background: activeTab === cat ? CATEGORY_COLORS[cat] : '#eee',
    color: 'var(--dark)',
    cursor: 'pointer',
  })

  const phraseBtnStyle = (cat) => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '0.85rem',
    padding: '0.4rem 1rem',
    borderRadius: 999,
    border: '2px solid',
    borderColor: 'transparent',
    background: activePhraseCat === cat ? CATEGORY_COLORS[cat] : '#eee',
    color: 'var(--dark)',
    cursor: 'pointer',
  })

  return (
    <section
      id="visualizations"
      ref={ref}
      style={{
        padding: '5rem 2rem',
        background: '#F5F5F0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            color: 'var(--dark)',
          }}
        >
          Patterns & Themes
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#666',
            marginBottom: '3.5rem',
            fontSize: '1rem',
          }}
        >
          Automatically grouped using TF-IDF clustering. Click any theme to see sample responses.
        </p>

        {/* ── Theme Clustering ── */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: 'var(--dark)',
          }}
        >
          Theme Clusters
        </h3>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['STOP', 'START', 'CONTINUE'].map((cat) => (
            <button key={cat} style={tabBtnStyle(cat)} onClick={() => setActiveTab(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {analysis ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.85rem',
              marginBottom: '4rem',
            }}
          >
            {analysis[activeTab].clusters.map((c) => (
              <ClusterCard key={c.id} cluster={c} color={CATEGORY_COLORS[activeTab]} />
            ))}
          </div>
        ) : (
          <div style={{ color: '#aaa', fontFamily: 'var(--font-body)', marginBottom: '4rem' }}>
            Loading analysis…
          </div>
        )}

        {/* ── Key Phrases ── */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: 'var(--dark)',
          }}
        >
          Key Phrases
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', color: '#777', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Most distinctive words and phrases per category, weighted by TF-IDF score.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['STOP', 'START', 'CONTINUE'].map((cat) => (
            <button key={cat} style={phraseBtnStyle(cat)} onClick={() => setActivePhraseCat(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {analysis ? (() => {
          const phrases = analysis[activePhraseCat].phrases.slice(0, 18)
          const maxScore = phrases[0]?.score ?? 1
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: 700 }}>
              {phrases.map((p) => (
                <PhraseBar
                  key={p.phrase}
                  phrase={p.phrase}
                  score={p.score}
                  maxScore={maxScore}
                  color={CATEGORY_COLORS[activePhraseCat]}
                />
              ))}
            </div>
          )
        })() : (
          <div style={{ color: '#aaa', fontFamily: 'var(--font-body)' }}>Loading analysis…</div>
        )}
      </div>
    </section>
  )
}
