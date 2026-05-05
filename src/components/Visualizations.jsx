import { useEffect, useRef, useState } from 'react'

const CATEGORY_COLORS = {
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

const placeholders = [
  {
    title: 'Word Cloud',
    description: 'Most frequent words & phrases, sized by frequency',
    icon: '☁️',
  },
  {
    title: 'Sentiment Analysis',
    description: 'Overall tone per category — positive, neutral, or critical',
    icon: '📊',
  },
  {
    title: 'Theme Clustering',
    description: 'Common themes grouped visually (e.g. "AI policies," "classroom use")',
    icon: '🫧',
  },
  {
    title: 'Key Phrases',
    description: 'Most common verbs and phrases across all responses',
    icon: '🔤',
  },
]

function StatCard({ category, count, color }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: '8px',
        padding: '2rem 2.5rem',
        textAlign: 'center',
        boxShadow: '2px 4px 16px rgba(0,0,0,0.08)',
        flex: '1 1 180px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--dark)',
        }}
      >
        {count}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          fontWeight: 500,
          marginTop: '0.4rem',
          color: 'var(--dark)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {category}
      </div>
    </div>
  )
}

function PlaceholderCard({ title, description, icon, visible }) {
  return (
    <div
      style={{
        border: '2px dashed #ccc',
        borderRadius: '12px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        background: '#fff',
      }}
    >
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--dark)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: '#666',
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
      <div
        style={{
          marginTop: 'auto',
          display: 'inline-block',
          background: 'var(--yellow)',
          color: 'var(--dark)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          alignSelf: 'flex-start',
        }}
      >
        Coming Soon
      </div>
    </div>
  )
}

export default function Visualizations({ data }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const counts = { STOP: 0, START: 0, CONTINUE: 0 }
  data.forEach((r) => {
    const cat = r.category?.toUpperCase()
    if (counts[cat] !== undefined) counts[cat]++
  })

  return (
    <section
      id="visualizations"
      ref={ref}
      style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--dark)',
        }}
      >
        By the Numbers
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: '#555',
          marginBottom: '2.5rem',
          fontSize: '1.05rem',
        }}
      >
        {data.length} total responses from students and faculty.
      </p>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {Object.entries(counts).map(([cat, count]) => (
          <StatCard key={cat} category={cat} count={count} color={CATEGORY_COLORS[cat]} />
        ))}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: 'var(--dark)',
        }}
      >
        Visualizations
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {placeholders.map((p, i) => (
          <PlaceholderCard
            key={p.title}
            {...p}
            visible={visible}
            style={{ transitionDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </section>
  )
}
