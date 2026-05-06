import { useLayoutEffect, useRef, useState } from 'react'

const FLOATING_NOTES = [
  { color: '#FFAFA3', rotate: -7,  top: '7%',    left: '1%',   text: "Stop treating AI like it's automatically cheating." },
  { color: '#85E0A3', rotate:  5,  top: '5%',    right: '0%',  text: 'Start teaching us how to use AI responsibly.' },
  { color: '#80CAFF', rotate: -4,  top: '36%',   left: '0%',   text: 'Continue having open, honest conversations about AI in school.' },
  { color: '#FBD767', rotate:  8,  top: '34%',   right: '0%',  text: 'Start creating a clear, consistent policy everyone understands.' },
  { color: '#D9B8FF', rotate: -5,  bottom: '8%', left: '1%',   text: 'Stop assuming students only use AI to cheat or avoid work.' },
  { color: '#75D7F0', rotate:  6,  bottom: '6%', right: '0%',  text: 'AI is a tool — ban the misuse, not the tool.' },
]

function FloatNote({ note }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const style = getComputedStyle(container)
    const padV = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    const padH = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const availH = (container.clientHeight - padV) * 0.86
    const availW = container.clientWidth - padH

    const probe = document.createElement('div')
    probe.style.cssText = [
      'position:absolute',
      'visibility:hidden',
      'pointer-events:none',
      `width:${availW}px`,
      'font-family:Caveat,cursive',
      'font-weight:600',
      'line-height:1.3',
      'text-align:center',
      'word-break:break-word',
      'top:-9999px',
      'left:-9999px',
    ].join(';')
    probe.textContent = note.text
    document.body.appendChild(probe)

    let lo = 11, hi = 72
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2)
      probe.style.fontSize = `${mid}px`
      if (probe.offsetHeight <= availH) lo = mid
      else hi = mid - 1
    }

    document.body.removeChild(probe)
    text.style.fontSize = `${lo}px`
  }, [note.text])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: note.top,
        left: note.left,
        right: note.right,
        bottom: note.bottom,
        width: 230,
        height: 230,
        background: note.color,
        borderRadius: 2,
        padding: '18px 16px',
        boxShadow: '3px 6px 20px rgba(0,0,0,0.14)',
        transform: `rotate(${note.rotate}deg)`,
        zIndex: 0,
        opacity: 0.88,
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <p
        ref={textRef}
        style={{
          fontFamily: 'var(--font-hand)',
          fontWeight: 600,
          fontSize: '1rem',
          lineHeight: 1.3,
          color: '#222',
          margin: 0,
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {note.text}
      </p>
    </div>
  )
}

function HowItWasMade() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginTop: '1.25rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '0.82rem',
          padding: '0.4rem 1rem',
          borderRadius: 999,
          border: '1.5px solid var(--purple)',
          background: open ? 'var(--purple)' : 'rgba(217,184,255,0.18)',
          color: 'var(--dark)',
          cursor: 'pointer',
          transition: 'background 0.15s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span>{open ? '▲' : '✦'}</span>
        How was this site made?
      </button>

      {open && (
        <div
          style={{
            marginTop: '0.75rem',
            background: 'rgba(255,255,255,0.92)',
            border: '1.5px solid var(--purple)',
            borderRadius: 14,
            padding: '1.4rem 1.6rem',
            maxWidth: 540,
            margin: '0.75rem auto 0',
            textAlign: 'left',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: '#444', margin: '0 0 0.85rem' }}>
            The conversations produced over 1,200 sticky notes. Each one was read aloud by a human (me) and transcribed using Apple Voice Memos. The raw text was then cleaned and converted into a structured CSV file using Claude.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: '#444', margin: '0 0 0.85rem' }}>
            The data analysis — theme clustering and key phrase extraction — was done using standard Python libraries (scikit-learn, NLTK). The analysis is fairly rudimentary, but it surfaces real patterns in the data.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: '#444', margin: '0 0 0.85rem' }}>
            The website started from a hand-drawn sketch on my iPad and detailed notes about desired functionality. I brought that sketch and the plan to Claude Code, which generated the website. I then configured GitHub to host the page you now see.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: '#444', margin: '0 0 0.85rem' }}>
            The takeaways at the end were written by me. Claude helped surface the data — counts, patterns, and representative quotes — to support the observations.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#666', margin: 0 }}>
            — Matt J
          </p>
        </div>
      )}
    </div>
  )
}

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
      {FLOATING_NOTES.map((note, i) => (
        <FloatNote key={i} note={note} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
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
          <span style={{ background: 'linear-gradient(180deg, transparent 55%, var(--green) 55%)', paddingBottom: 2 }}>
            Start
          </span>
          ,{' '}
          <span style={{ background: 'linear-gradient(180deg, transparent 55%, var(--coral) 55%)', paddingBottom: 2 }}>
            Stop
          </span>
          , and{' '}
          <span style={{ background: 'linear-gradient(180deg, transparent 55%, var(--blue) 55%)', paddingBottom: 2 }}>
            Continue
          </span>{' '}
          doing when it comes to AI?
        </h1>

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

        <HowItWasMade />
      </div>
    </div>
  )
}
