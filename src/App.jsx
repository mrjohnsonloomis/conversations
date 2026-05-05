import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import Hero from './components/Hero.jsx'
import StickyNotesWall from './components/StickyNotesWall.jsx'
import Visualizations from './components/Visualizations.jsx'
import KeyTakeaways from './components/KeyTakeaways.jsx'

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('./data/responses.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((csv) => {
        const result = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim().toLowerCase(),
        })
        setData(result.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load CSV:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: 'var(--dark)',
          gap: '1rem',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: '3rem' }}>📋</div>
        <div>Loading responses…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'var(--font-body)',
          color: 'var(--dark)',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ fontSize: '2rem' }}>⚠️</div>
        <div>Could not load data: {error}</div>
      </div>
    )
  }

  return (
    <>
      <nav className="sticky-nav">
        <a href="#home" className="nav-brand">LC AI Workshop</a>
        <ul className="nav-links">
          <li><a href="#data">The Data</a></li>
          <li><a href="#visualizations">Visualizations</a></li>
          <li><a href="#takeaways">Key Takeaways</a></li>
        </ul>
      </nav>

      <main>
        <section id="home" style={{ padding: 0 }}>
          <Hero />
        </section>

        <StickyNotesWall data={data} />

        <Visualizations data={data} />

        <KeyTakeaways />
      </main>
    </>
  )
}
