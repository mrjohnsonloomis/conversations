const FLOATING_NOTES = [
  { color: '#FFAFA3', rotate: -8, top: '12%', left: '4%', width: 110, text: 'Stop penalizing minor AI use' },
  { color: '#85E0A3', rotate: 5, top: '15%', right: '5%', width: 120, text: 'Start teaching prompt skills' },
  { color: '#80CAFF', rotate: -3, bottom: '22%', left: '6%', width: 105, text: 'Continue open discussion' },
  { color: '#FBD767', rotate: 10, top: '40%', right: '3%', width: 100, text: 'Start clear AI policies' },
  { color: '#D9B8FF', rotate: -6, bottom: '18%', right: '7%', width: 115, text: 'Stop banning tools' },
  { color: '#75D7F0', rotate: 7, top: '60%', left: '3%', width: 108, text: 'Continue innovation' },
]

export default function Hero() {
  return (
    <div
      className="graph-paper"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '7rem 2rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Floating decorative sticky notes */}
      {FLOATING_NOTES.map((note, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: note.top,
            left: note.left,
            right: note.right,
            bottom: note.bottom,
            width: note.width,
            background: note.color,
            borderRadius: 2,
            padding: '10px 12px',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
            transform: `rotate(${note.rotate}deg)`,
            zIndex: 0,
            fontFamily: 'var(--font-hand)',
            fontSize: 13,
            color: '#333',
            lineHeight: 1.35,
            opacity: 0.82,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {note.text}
        </div>
      ))}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.85)',
            border: '1.5px solid var(--gray)',
            borderRadius: 999,
            padding: '0.35rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: '#555',
            marginBottom: '1.5rem',
            letterSpacing: '0.03em',
          }}
        >
          <span>📌</span>
          Loomis Chaffee — AI Workshop Exit Tickets
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: 'var(--dark)',
            margin: '0 0 1.5rem',
          }}
        >
          What should Loomis{' '}
          <span
            style={{
              background: 'linear-gradient(180deg, transparent 55%, var(--green) 55%)',
              paddingBottom: 2,
            }}
          >
            Start
          </span>
          ,{' '}
          <span
            style={{
              background: 'linear-gradient(180deg, transparent 55%, var(--coral) 55%)',
              paddingBottom: 2,
            }}
          >
            Stop
          </span>
          , and{' '}
          <span
            style={{
              background: 'linear-gradient(180deg, transparent 55%, var(--blue) 55%)',
              paddingBottom: 2,
            }}
          >
            Continue
          </span>{' '}
          doing when it comes to AI?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.7,
            color: '#555',
            maxWidth: 620,
            margin: '0 auto 2.5rem',
          }}
        >
          In a recent workshop, students and faculty at Loomis Chaffee shared their thoughts on AI in school.
          Here's what they said — 1,293 responses, unfiltered and searchable.
        </p>

        {/* Stat pills */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { label: 'STOP', count: 419, color: 'var(--coral)' },
            { label: 'START', count: 446, color: 'var(--green)' },
            { label: 'CONTINUE', count: 425, color: 'var(--blue)' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: s.color,
                borderRadius: 999,
                padding: '0.45rem 1.1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--dark)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {s.count} {s.label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#data"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--dark)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '1rem',
            padding: '0.8rem 2rem',
            borderRadius: 999,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.22)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)'
          }}
        >
          Explore the data <span style={{ fontSize: '1.2rem' }}>↓</span>
        </a>
      </div>
    </div>
  )
}
