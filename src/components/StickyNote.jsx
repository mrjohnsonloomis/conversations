import { useLayoutEffect, useRef } from 'react'

const CATEGORY_COLORS = {
  STOP: '#FFAFA3',
  START: '#85E0A3',
  CONTINUE: '#80CAFF',
}

function useFitText(response) {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const style = getComputedStyle(container)
    const padV = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    const padH = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const availH = (container.clientHeight - padV) * 0.88
    const availW = container.clientWidth - padH

    // Measure off-screen using a clone so we don't fight the container's overflow
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
    probe.textContent = response
    document.body.appendChild(probe)

    let lo = 11, hi = 88
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2)
      probe.style.fontSize = `${mid}px`
      if (probe.offsetHeight <= availH) lo = mid
      else hi = mid - 1
    }

    document.body.removeChild(probe)
    text.style.fontSize = `${lo}px`
  }, [response])

  return { containerRef, textRef }
}

export default function StickyNote({ response, category, flag, index }) {
  const { containerRef, textRef } = useFitText(response)
  const bgColor = CATEGORY_COLORS[category] ?? '#FDF5A3'
  const rotation = ((index * 7 + 3) % 9) - 4
  const isFlagged = flag && flag.trim() !== ''

  return (
    <div
      ref={containerRef}
      style={{
        background: bgColor,
        borderRadius: 2,
        padding: '1.4rem 1.25rem',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
        opacity: isFlagged ? 0.6 : 1,
        position: 'relative',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.04)`
        e.currentTarget.style.boxShadow = '4px 8px 24px rgba(0,0,0,0.22)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`
        e.currentTarget.style.boxShadow = '2px 4px 12px rgba(0,0,0,0.15)'
        e.currentTarget.style.zIndex = ''
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 7,
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '2px 2px 0 0',
        }}
      />

      {isFlagged && (
        <span
          title="Partial / illegible"
          style={{
            position: 'absolute',
            top: '0.7rem', right: '0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-body)',
            color: '#666',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: 4,
            padding: '1px 5px',
          }}
        >
          ~partial
        </span>
      )}

      <p
        ref={textRef}
        style={{
          fontFamily: 'var(--font-hand)',
          fontWeight: 600,
          fontSize: '1rem',
          lineHeight: 1.3,
          color: '#1a1a1a',
          margin: 0,
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {response}
      </p>
    </div>
  )
}
