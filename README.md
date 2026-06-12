# Save The World — React

Recreation of the landing page, rebuilt from vanilla HTML/CSS/JS into **React + Vite**.

## Run

```bash
npm install
npm run dev      # dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  main.jsx              entry, wraps <App> in <AppProvider>
  App.jsx               layout + smooth-scroll + anchor handling
  index.css             global styles (ported 1:1)
  i18n.jsx              translations (EN/FR/UK) + language context
  hooks/
    useInView.js        one-shot IntersectionObserver hook
    useSmoothScroll.js  lerp scroll + parallax + ResizeObserver
  components/
    primitives.jsx      Reveal, RevealHtml, LineTitle, Counter, Marquee
    Preloader.jsx  Cursor.jsx  Header.jsx
    Hero.jsx  HowToDonate.jsx  StemCells.jsx  World.jsx
    Patients.jsx  Join.jsx  Newsletter.jsx  Footer.jsx
```

## Notes
- Language choice persists in `localStorage` (`stw-lang`).
- The smooth scroller uses a `ResizeObserver`, so language/height changes keep
  the footer reachable automatically.
- Reveal state lives in React state, so switching language never re-hides
  already-revealed content.
