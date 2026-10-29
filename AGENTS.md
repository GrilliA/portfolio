# AGENTS.md — portfolio

Leggi prima di cambiare il codice.

## Comandi

```bash
npm run dev        # Vite :5173
npm test           # Vitest
npm run build      # vue-tsc + vite build
```

## Regole

- I testi del sito sono in **italiano**.
- Colori, font e spazi vengono solo da `src/styles/tokens.css`. `--accent`, `--second` e `--third` cambiano con la combinazione scelta: usali per ciò che deve seguire la palette, i pigmenti fissi (`--shu`, `--konjo`…) per il resto.
- Ogni demo interattiva tiene la logica in un file `.ts` puro (stato in ingresso, stato in uscita, niente Vue) con i suoi test, e la vista in un `.vue`.
- Un nuovo caso studio: una view in `src/views/`, una route in `src/router.ts`, il campo `route` del progetto in `src/data/projects.ts`.
- Animazioni piccole e con `--ease-spring`; tutto rispetta `prefers-reduced-motion`.
- Accessibilità: bottoni veri, `aria-label` sui bottoni con sole icone, contrasto testo almeno 4.5:1, nessuno scroll orizzontale a 390px.
