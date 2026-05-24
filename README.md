# CikguSync — A4a prototype

Offline-first CPD companion for rural Sabah teachers. Group 3, ICT for the Global South.

## Run locally

The project is a static site — no build step. Open `index.html` directly or serve the folder:

```bash
python3 -m http.server 8765
# then http://localhost:8765/
```

`index.html` loads the `.jsx` sources via Babel-standalone in the browser, so any edit to the source files takes effect on a hard refresh.

## Deploy

It's a static site, so any static host works.

- **Netlify Drop** — drag the folder onto https://app.netlify.com/drop
- **GitHub Pages** — enable Pages on `main` / root
- **Cloudflare Pages** — `wrangler pages deploy .`

## File map

| File | What it holds |
| --- | --- |
| `index.html` | Dev shell: loads React + Babel-standalone + every `.jsx` file in order |
| `theme.jsx` | CSS-variable theme, design tokens, mock data (modules, schools, SGM domains), copy strings (BM + EN) |
| `android-frame.jsx` | Reusable phone-frame component (status bar, notch, gesture nav) |
| `teacher.jsx` | Teacher persona shell: `HomeScreen`, `ModulesScreen`, `BottomNav`, `StatusPill` |
| `teacher-detail.jsx` | `ModuleDetailScreen`, `CaptureScreen`, `RecordScreen`, `ProfileScreen` |
| `screens-extra.jsx` | `WelcomeScreen`, `SyncQueueScreen`, `EdgeCaseScreen` (4 states), `DataUseReceipt` — the screens drawn in Figures 1, 2 and 4 that were not yet in the prototype |
| `leader.jsx` | Guru Besar persona: Telegram digest + school summary (Figure 3 left) |
| `district.jsx` | PPD officer persona: desktop dashboard, KPIs, schools table, export modal (Figure 3 right) |
| `app.jsx` | Root `App`, top bar persona switcher, demo panel (Scenarios / Edge cases / Requirements / Contributions / Intro), routing |
| `docs/` | Assignment 2 + Assignment 3 + A4 sources (PDF + extracted txt) |
| `screenshots/` | Reference screenshots from previous design iterations |

## Personas

| Persona | Surface | Entry point |
| --- | --- | --- |
| Cikgu Liana (teacher) | Android PWA, mobile | `Welcome → Home → Modules / Add / Sync / Record / Profile` |
| Guru Besar Jainal (school leader) | Telegram bot weekly digest, taps into mobile summary | `Chat → Open school summary` |
| Pegawai Norhaida (district officer) | Desktop browser dashboard | District tab, top-right |

## Demo panel

The right-hand panel walks through:
- **Scenarios** — four scripted walkthroughs (s1 Liana offline, s2 Jainal digest, s3 Norhaida export, s4 edge cases)
- **Edge cases** — system limits and what the prototype does about them
- **Requirements** — Assignment 2 §6 functional + non-functional requirements traced to the screens that demonstrate each
- **Contributions** — per-team-member focus areas
- **Intro** — 2-min brief

## Standalone bundles

`CikguSync Prototype.html` and `CikguSync Prototype _standalone_.html` are older single-file builds (base64-packed assets, no external CDNs). They are kept for reference but `index.html` is the source of truth now.
