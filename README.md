# portfolio

Il sito personale di Alessio Grilli: progetti raccontati come casi studio, con demo da provare, in stile Josh Comeau.
Palette ispirata a Sanzo Wada, *A Dictionary of Color Combinations* (anni '30).

## Stack

| | |
| --- | --- |
| UI | Vue 3 + Vite + TypeScript |
| Routing | vue-router |
| Test | Vitest |

## Dev

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # logica delle demo
npm run build      # typecheck + build in dist/
```

## Struttura

```
src/
├── styles/        # tokens.css (palette, tipografia, spazi) e base.css
├── composables/   # usePalette: la combinazione di colori scelta
├── data/          # progetti e note mostrati in homepage
├── components/    # header, card, timbro, palette switcher
│   └── demos/     # demo interattive dei casi studio (logica in .ts, vista in .vue)
└── views/         # HomeView, TracciaView
```

## Da completare

Cerca `TODO` e `[...]` nel codice: città, ruolo, foto, email, LinkedIn, "Chi sono" e "Cosa ho imparato".

## Pubblicazione

A ogni push su `main`, `.github/workflows/pages.yml` esegue i test, fa la build con base `/portfolio/` e pubblica su GitHub Pages: https://grillia.github.io/portfolio/

Una volta sola, in **Settings → Pages**, imposta **Source: GitHub Actions**.
`404.html` è una copia di `index.html`, così anche i link diretti (es. `/portfolio/progetti/traccia`) funzionano.
