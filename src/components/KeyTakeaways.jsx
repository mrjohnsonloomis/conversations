const placeholderItems = [
  'Stop penalizing students harshly for minor or ambiguous AI use — build clearer, fairer policies.',
  'Start investing in structured AI literacy education for both students and faculty.',
  'Continue the conversation: this workshop is a starting point, not a conclusion.',
]

const pullQuote = {
  text: 'Stop demonizing AI and start teaching us how to use it responsibly.',
  color: '#85E0A3',
}

export default function KeyTakeaways() {
  return (
    <section
      id="takeaways"
      className="graph-paper"
      style={{ padding: '6rem 2rem', minHeight: '60vh' }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.5rem',
            color: 'var(--dark)',
          }}
        >
          Key Takeaways &amp; Next Steps
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#666',
            marginBottom: '3rem',
            fontSize: '1.05rem',
          }}
        >
          Key findings and next steps will be added here once the data is fully analyzed. The
          placeholders below reflect early themes from the STOP responses.
        </p>

        <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {placeholderItems.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'var(--dark)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: ['var(--coral)', 'var(--green)', 'var(--blue)'][i],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--dark)',
                  marginTop: '0.15rem',
                }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <blockquote
          style={{
            margin: 0,
            padding: '1.5rem 2rem',
            borderLeft: `5px solid ${pullQuote.color}`,
            background: '#fff',
            borderRadius: '0 8px 8px 0',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.5rem',
              lineHeight: 1.4,
              color: 'var(--dark)',
              margin: 0,
            }}
          >
            "{pullQuote.text}"
          </p>
          <footer
            style={{
              marginTop: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: '#888',
            }}
          >
            — Workshop participant
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
