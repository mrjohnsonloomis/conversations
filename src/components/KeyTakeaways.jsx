const TAKEAWAYS = [
  {
    color: 'var(--blue)',
    heading: 'Our community thinks we should be talking about this.',
    body: '148 responses cite the importance of having conversations, hosting workshops, and learning from students. Notably, 102 of those are CONTINUE responses — people feel these conversations are already happening and want more of them. This workshop itself is proof of concept.',
  },
  {
    color: 'var(--coral)',
    heading: 'Our community wants clarity around expectations for AI use — for both students and teachers.',
    body: "268 responses — over 1 in 5 — reference guidelines, policies, expectations, boundaries, or rules around AI. It's the single most prevalent theme in the data, and 138 of those are START responses, making it the most requested new action by a wide margin. 35 responses specifically ask for expectations to be stated on each assignment. The message is consistent: don't make us guess.",
  },
  {
    color: 'var(--green)',
    heading: 'Our community wants AI use to be transparent and open — in both directions.',
    bodyJSX: true,
    body: "It shouldn't be taboo, and we shouldn't have to guess. 63 responses reference transparency, stigma, or openness around AI. This goes both ways: students want to be honest about how they use AI without fear, and they want teachers to be transparent about how they use it too. 33 responses specifically address teacher use of AI — for grading, writing comments, or creating assignments — and ask that the same standards apply to everyone.",
    emphasisWord: 'they',
    emphasisContext: 'how they use it',
  },
  {
    color: 'var(--gold)',
    heading: 'Our community sees AI as a learning tool — and wants the conversation to feel less charged.',
    body: 'Over 100 responses reference AI as a study resource: tutoring, study guides, review, Flint. At the same time, 42 responses — 37 of them STOP responses — specifically ask that AI not be "demonized," "villainized," or treated as taboo. Students aren\'t asking for a free-for-all, but are rather asking for thoughtful boundaries.',
  },
  {
    color: 'var(--purple)',
    heading: "Our community deeply values human expression and connection and wants to make sure we don't lose sight of that.",
    body: '39 responses reference authenticity, voice, original thought, creativity, or human connection. This showed up across all three categories — people want AI in the picture, but they don\'t want it to replace the things that make this place feel human.',
  },
  {
    color: 'var(--cyan)',
    heading: 'Our community represents a wide array of viewpoints and experiences with and around AI.',
    body: "There is tension: 53 entries explicitly lean toward more openness with AI, 55 lean toward more restriction. There's no consensus position here — and that's okay. What people do agree on is that we should keep talking, keep clarifying, and keep listening.",
  },
]

const PULL_QUOTE = {
  text: 'Stop demonizing AI and start teaching us how to use it responsibly.',
  color: 'var(--green)',
}

function TakeawayBody({ item }) {
  if (item.bodyJSX) {
    // Render the "they" in italic for item 3
    const parts = item.body.split('how they use it')
    return (
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: '#444', margin: 0 }}>
        {parts[0]}how <em>they</em> use it{parts[1]}
      </p>
    )
  }
  return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: '#444', margin: 0 }}>
      {item.body}
    </p>
  )
}

export default function KeyTakeaways() {
  return (
    <section
      id="takeaways"
      className="graph-paper"
      style={{ padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            color: 'var(--dark)',
          }}
        >
          Key Takeaways
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#666',
            marginBottom: '3.5rem',
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}
        >
          Six themes that emerged from the data — written by Matt J, with Claude helping surface the numbers.
        </p>

        <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 3.5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          {TAKEAWAYS.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--dark)',
                  marginTop: '0.2rem',
                }}
              >
                {i + 1}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--dark)',
                    margin: '0 0 0.5rem',
                    lineHeight: 1.35,
                  }}
                >
                  {item.heading}
                </p>
                <TakeawayBody item={item} />
              </div>
            </li>
          ))}
        </ol>

        <blockquote
          style={{
            margin: 0,
            padding: '1.5rem 2rem',
            borderLeft: `5px solid ${PULL_QUOTE.color}`,
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
            &ldquo;{PULL_QUOTE.text}&rdquo;
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
