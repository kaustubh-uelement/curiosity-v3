# Curiosity AI — Website

**Compute AI Infrastructure for Abundant Intelligence.**

Next.js 14 (App Router). Design language modelled on sharplink.com — full-bleed hero,
fullscreen overlay menu, live data strip, sticky stacking cards, numbered FAQ.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

> **Fonts:** loaded via `next/font/google` (Space Grotesk, DM Sans, JetBrains Mono),
> which fetches at build time — the build needs access to `fonts.googleapis.com`.
> For air-gapped CI, switch to `next/font/local` with self-hosted files.

## Palette

| Token        | Hex       | Role                                          |
| ------------ | --------- | --------------------------------------------- |
| `--orchid`   | `#CD82FF` | Highlights, kickers, live indicators, dot art |
| `--violet`   | `#8752FA` | Mid-gradient, marquee bullets                 |
| `--electric` | `#4500F9` | Primary brand, gradient base, platform core   |
| `--mist`     | `#E7EAEE` | Primary button fill, body text base           |
| `--ink`      | `#0A0611` | Page background                               |

Gradients run orchid → violet → electric. The stacking cards walk that ramp as the
stack deepens (`gradientFor()` in `components/StackCards.jsx`).

## SharpLink patterns implemented

| Pattern                                                    | Where                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Full-viewport hero over motion                             | `app/page.jsx` + `components/Mesh.jsx` (animated CSS gradient mesh, no video payload) |
| Masked line-by-line headline rise                          | `.mask` + `Reveal variant="revUp"`                                                    |
| Fullscreen overlay menu, clip-path reveal, staggered links | `components/Nav.jsx`                                                                  |
| Live metrics strip → dashboard link                        | `components/Dashboard.jsx` + `CountUp`                                                |
| Announcement card under hero                               | `ANNOUNCEMENT` in `lib/content.js`                                                    |
| Numbered 01/02/03 cards w/ dot illustrations               | `DotViz` in `app/page.jsx` (generated SVG)                                            |
| Sticky stacking proposition cards                          | `components/StackCards.jsx`                                                           |
| Big gradient statement band                                | `components/Statement.jsx`                                                            |
| Numbered opportunity list                                  | `.oppList` on the homepage                                                            |
| News cards                                                 | `NEWS` in `lib/content.js`                                                            |
| Numbered FAQ accordion                                     | `components/Accordion.jsx`                                                            |
| Newsletter signup + back to top                            | `components/Newsletter.jsx`, `components/Footer.jsx`                                  |

## Structure

```
app/
  layout.jsx        fonts, metadata, Nav + Footer
  page.jsx          Home — full section sequence
  globals.css       entire design system
  platform/ infrastructure/ gpu/ ai-factories/ customers/ company/ contact/
components/
  Nav Mesh Dashboard Marquee StackCards Accordion Flow Statement
  Newsletter Footer Reveal CountUp Logo
lib/content.js      ALL copy and data
```

## Notes

- `Newsletter.jsx` validates client-side and shows a success state; wire `submit()` to
  your ESP or CRM endpoint.
- All motion respects `prefers-reduced-motion` — sticky stacking degrades to a normal
  stacked list, animations collapse to instant.
- The hero mesh is pure CSS. To match SharpLink exactly with video, drop a `.webm` into
  `public/` and swap `<Mesh />` for a `<video autoPlay muted loop playsInline>`.
