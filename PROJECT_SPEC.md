# Loomis Chaffee AI Workshop Results — Website Spec

## Project Overview

An interactive, scrollable single-page website presenting the results of a community workshop at Loomis Chaffee. The workshop used a **STOP / START / CONTINUE** protocol as an exit ticket, asking: *"What should Loomis Start, Stop, and Continue doing when it comes to AI?"* Participants (students and faculty, mixed, untagged) wrote responses on post-it notes.

---

## Data

### Source File
- **`responses.csv`** — cleaned CSV with columns: `id`, `category`, `response`, `flag`
- Categories: `STOP`, `START`, `CONTINUE`
- `flag` column: most entries are blank; a few are marked `partial/illegible`

### Data Notes
- Responses vary wildly in length (5 words to 2+ sentences)
- Many responses express similar themes (e.g., dozens of variations of "stop demonizing AI")
- No respondent-type tagging (student vs. faculty is unknown)

---

## Site Architecture (4 Sections)

The site is a **scrollable single-page layout** with a sticky nav or anchor links. Four main sections:

### 1. Hero / Home
- Large heading: **"What should Loomis Start, Stop, and Continue doing when it comes to AI?"**
- Animated/scattered sticky note illustrations (from the provided SVG) float around the heading as visual decoration
- Brief paragraph explaining the activity (user will provide text — use placeholder for now)
- Smooth scroll arrow or CTA to enter the content below
- **Navigation links** to the other three sections: "The Data", "Visualizations", "Key Takeaways / Next Steps"

### 2. The Data — Sticky Notes Wall
- **Interactive sticky note board** where each response is rendered on a sticky note
- Three columns or filterable tabs: **STOP**, **START**, **CONTINUE**
- Each response appears on a sticky note background with a handwriting-style font
- **Color coding by category:**
  - STOP → red/coral tones (e.g., `#FFAFA3`)
  - START → green tones (e.g., `#85E0A3`)
  - CONTINUE → blue tones (e.g., `#80CAFF`)
  - Alternatively, use the full multicolor palette from the SVG and place a small colored dot/tag on each note indicating category
- Notes should have slight random rotation (±2–5°), staggered placement, and subtle drop shadows — mimicking a real post-it wall
- **Shuffle button** to randomize the note layout/order
- Notes are scrollable within the section (not paginated)
- Flagged entries (`partial/illegible`) should render with a subtle visual indicator (e.g., slightly faded, or a small icon)

### 3. Visualizations
- A section with multiple data viz panels. These will be built once all three categories are populated. Placeholder cards for now. Planned visualizations:
  - **Sentiment Analysis** — bar chart or gauge showing overall tone per category
  - **Word Cloud** — most frequent words/phrases, sized by frequency, colored by category
  - **Theme Clustering** — grouped bubbles or treemap of common themes (e.g., "unclear policies," "demonizing AI," "in-class essays," "AI posters," "teacher use of AI")
  - **Response Count** — simple stat cards (e.g., "419 STOP responses, ___ START, ___ CONTINUE")
  - Any other relevant analyses (e.g., most common verbs, comparison across categories)

### 4. Key Takeaways / Next Steps
- Numbered or styled list of key findings (user will provide text — placeholder for now)
- Styled to match the homepage hero — same font, same visual language
- Could include pull-quotes from particularly notable sticky notes

---

## Design Direction

### Aesthetic: "Design-Forward Brainstorm Session"
Think: a polished editorial take on a whiteboard brainstorm. The site should feel like a **work-in-progress made beautiful** — creative, modern, approachable, not corporate.

### Key Visual Elements
- **Graph paper background** — light, subtle grid pattern in sections that are low on content (hero, next steps). Not overwhelming.
- **Highlighter accents** — use semi-transparent highlight strokes (yellow, pink, green) over key text or as decorative underlines. CSS `background-image: linear-gradient(...)` on text or `::after` pseudo-elements.
- **Sticky note SVG** — the provided `stickynotes.svg` contains realistic sticky note shapes with shadows and curl effects. Extract individual note paths to use as backgrounds for the data cards. Each note shape is roughly 390×390 units within the SVG.
- **Handwriting font** for sticky note text — use something like `Caveat`, `Patrick Hand`, `Kalam`, or `Shadows Into Light` from Google Fonts
- **Display font** for headings — something bold and modern with personality. Consider `Syne`, `Clash Display`, `General Sans`, `Satoshi`, or `Cabinet Grotesk`
- **Body font** — clean and readable. `DM Sans`, `Plus Jakarta Sans`, or `Outfit`

### Color Palette (from the SVG)
```
Coral/Red:    #FFAFA3  (STOP notes)
Orange:       #FFC470
Gold:         #FBD767
Yellow:       #FDF5A3
Green:        #85E0A3  (START notes)
Blue:         #80CAFF  (CONTINUE notes)
Cyan:         #75D7F0
Purple:       #D9B8FF
Pink:         #FFBDF2
Gray:         #E6E6E6
Dark text:    #222222
Background:   #FAFAFA or #F5F5F0 (warm off-white)
```

### Interaction & Motion
- Sticky notes on the wall should have a subtle entrance animation (staggered fade-in + slight scale)
- Hover on a sticky note: slight lift (scale + shadow increase), maybe a gentle wobble
- Smooth scrolling between sections
- Shuffle button triggers a playful re-sort animation
- Scroll-triggered reveals for visualization section

### Responsive
- Desktop-first, but must work on mobile (single-column sticky note layout on small screens)

---

## Technical Recommendations

### Deployment
- GitHub Pages

### Stack Options (pick one)
- **React + Vite** — good for component architecture, easy state management for filters/shuffle
- **Next.js** — if static export or future server features are desired
- **Plain HTML/CSS/JS** — totally fine for this scope; simpler deployment

### Data Loading
- Load the CSV at build time or fetch it client-side. Since the CSV will grow (adding START/CONTINUE), a simple `fetch('data/responses.csv')` with Papa Parse is straightforward.
- Alternatively, convert CSV → JSON at build time.


### Visualization Libraries
- **D3.js** for word cloud and custom visualizations
- **Chart.js** or **Recharts** (if React) for bar charts
- **d3-cloud** for word cloud specifically



---

## Suggested File Structure
```
project/
├── public/
│   ├── data/
│   │   └── responses.csv          ← master CSV (STOP + START + CONTINUE)
│   └── assets/
│       └── sticky-notes.svg       ← the provided SVG
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── StickyNotesWall.jsx    ← interactive post-it board
│   │   ├── StickyNote.jsx         ← single note component
│   │   ├── Visualizations.jsx
│   │   ├── WordCloud.jsx
│   │   ├── SentimentChart.jsx
│   │   └── KeyTakeaways.jsx
│   ├── App.jsx
│   ├── index.css                  ← global styles, CSS variables, fonts
│   └── main.jsx
├── PROJECT_SPEC.md                ← this file
└── package.json
```

---

## Assets Provided
1. **`responses.csv`** — cleaned STOP data (419 rows). START and CONTINUE TBD.
2. **`Sticky_note__Community___1_.svg`** — Figma-exported SVG containing ~10 realistic sticky note shapes in various colors with drop shadows and page-curl effects, plus a color swatch row. Individual note shapes can be extracted and used as SVG containers for text.
3. **`post_its_data_website_sketch.pdf`** — hand-drawn wireframe of the site flow.

---

## Sticky Note SVG Technical Details

The SVG is 5300×1560 and contains two panels (left 0–2600, right 2700–5300). Key structure:

**Individual note shapes** are `<path>` elements inside `<g filter="...">` groups. Each note is ~390 units wide and ~390 units tall. Colors and approximate bounding boxes:

| Color   | Hex       | Panel | Approx X range | Approx Y range |
|---------|-----------|-------|-----------------|----------------|
| Blue    | #80CAFF   | Left  | 594–991         | 805–1201       |
| Yellow  | #FDF5A3   | Left  | 129–519         | 574–964        |
| Coral   | #FFAFA3   | Right | 2889–3279       | 354–744        |
| Orange  | #FFC470   | Right | 3347–3737       | 354–744        |
| Gold    | #FBD767   | Right | 3805–4195       | 354–744        |
| Yellow  | #FDF5A3   | Right | 4263–4653       | 354–744        |
| Green   | #85E0A3   | Right | 4721–5111       | 354–744        |
| Gray    | #E6E6E6   | Right | 2889–3279       | 812–1202       |
| Pink    | #FFBDF2   | Right | 3347–3737       | 812–1202       |
| Purple  | #D9B8FF   | Right | 3805–4195       | 812–1202       |
| Blue    | #80CAFF   | Right | 4263–4653       | 812–1202       |
| Cyan    | #75D7F0   | Right | 4721–5111       | 812–1202       |

Each note group includes shadow layers (opacity 0.1 and 0.3 blur filters) and a subtle top-edge darkening strip (opacity 0.02). To extract a single note as a reusable component, grab the `<g filter>` containing the colored `<path>` plus its preceding shadow `<g>` elements.

**Recommendation:** Rather than embedding the full SVG, extract 2–3 note shapes as standalone mini-SVGs (one per category color: coral, green, blue) and use them as repeating card backgrounds via CSS `background-image` or inline `<svg>` wrappers.

---

## Open Items / Placeholders
- [ ] START responses data (to be transcribed and added to CSV)
- [ ] CONTINUE responses data (to be transcribed and added to CSV)
- [ ] Explanatory paragraph text for the hero section
- [ ] Key Takeaways / Next Steps text for the final section
- [ ] Sentiment analysis methodology (simple keyword-based? or use an LLM API?)
- [ ] Decision: category-colored sticky notes OR multicolor notes with category tags?
- [ ] Confirm: does "Flint" in the data refer to Flint AI (the school writing tool)?
- [ ] Confirm: does "level 2" refer to the school's academic integrity violation levels?
