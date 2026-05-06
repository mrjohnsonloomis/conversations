const FLOATING_NOTES = [
  {
    color: '#FFAFA3',
    rotate: -8,
    top: '10%',
    left: '2%',
    text: "Stop treating AI like it's cheating when it could be a learning tool.",
  },
  {
    color: '#85E0A3',
    rotate: 5,
    top: '8%',
    right: '2%',
    text: 'Start teaching us how to use AI responsibly instead of banning it.',
  },
  {
    color: '#80CAFF',
    rotate: -4,
    bottom: '15%',
    left: '1%',
    text: 'Continue having honest conversations about where AI fits in school.',
  },
  {
    color: '#FBD767',
    rotate: 9,
    top: '42%',
    right: '1%',
    text: 'Start creating a clear, consistent policy that everyone understands.',
  },
  {
    color: '#D9B8FF',
    rotate: -6,
    bottom: '12%',
    right: '2%',
    text: 'Stop assuming students are using AI to avoid learning.',
  },
  {
    color: '#75D7F0',
    rotate: 7,
    top: '58%',
    left: '2%',
    text: 'Continue supporting teachers in exploring AI in their classrooms.',
  },
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
            width: 200,
            background: note.color,
            borderRadius: 2,
            padding: '16px 18px',
            boxShadow: '3px 6px 18px rgba(0,0,0,0.15)',
            transform: `rotate(${note.rotate}deg)`,
            zIndex: 0,
            fontFamily: 'var(--font-hand)',
            fontSize: 17,
            color: '#333',
            lineHeight: 1.4,
            opacity: 0.85,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {note.text}
        </div>
      ))}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
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
          At the end of a facilitated conversation between students and faculty about AI at Loomis Chaffee,
          participants shared their thoughts on sticky notes. Here's what they said — unfiltered, in their own words.
        </p>

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
