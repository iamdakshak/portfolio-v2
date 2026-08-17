# dakshaknagrale.in

Personal portfolio — a single-page site for my work as a frontend engineer.
Built with React 19, TypeScript and Vite, with the motion and 3D work doing
most of the talking.

**Live:** [dakshaknagrale.in](https://dakshaknagrale.in)

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Motion | Framer Motion, GSAP |
| Scroll | Lenis (smooth scroll) |
| 3D | Three.js via `@react-three/fiber`, `drei`, `postprocessing` |
| Particles | `@tsparticles/react` (slim bundle) |
| Hosting | GitHub Pages, custom domain via `public/CNAME` |

## Getting started

Requires Node 20.19+ or 22.12+ (Vite 8).

```bash
npm install
npm run dev      # dev server with HMR
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` typecheck, then production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint across the project |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch |

## Structure

```
src/
  App.tsx                  routes between the portfolio and the edit page
  main.tsx                 entry point
  index.css                Tailwind layer + design tokens
  data/
    resume.ts              all site content lives here
  components/
    sections/              Hero, Projects, About, Experience, Skills, Contact
    SmoothScroll.tsx       Lenis wrapper
    Loader.tsx             font-ready progress loader
    Cursor.tsx             custom cursor
    Navigation.tsx         section nav
    ParticlesField.tsx     background particle field
    SplineCharacter.tsx    3D scene
    Magnetic.tsx           magnetic hover wrapper
    Tilt.tsx               pointer-tilt wrapper
    Typewriter.tsx         typed-text effect
    ProjectCover.tsx       generated project cover art
    Logo.tsx               wordmark
    AdminPage.tsx          passphrase-gated project editor
public/
  CNAME                    custom domain for GitHub Pages
  favicon.svg
```

`@` is aliased to `src/`, so imports read `@/components/...`.

## Content

Everything the site renders comes from **`src/data/resume.ts`** — profile,
experience, timeline milestones, featured projects, skill groups, achievements
and nav items. Editing copy means editing that one file; no component changes
needed.

## The edit page

Visiting `/edit` or `?edit=1` opens a small editor for the **featured
projects** list — add, edit or delete entries and copy the result out as JSON.
Saved changes go to `localStorage`, so they're per-browser previews, not
a CMS; to make a change permanent, paste the exported JSON back into
`DEFAULT_FEATURED_PROJECTS` in `src/data/resume.ts`.

It's gated by a passphrase read from `VITE_ADMIN_PASS`:

```bash
cp .env.example .env.local   # then set VITE_ADMIN_PASS
```

This is a convenience gate on a static site, not a security boundary — the
value ships in the client bundle, and with no variable set it falls back to
`admin`. Don't reuse a real password.

## Build notes

- `manualChunks` splits `three`, `@react-three/*` and `gsap` into their own
  chunks so the 3D work doesn't bloat the initial payload.
- `build.target` is `esnext`; heavy motion and 3D deps are pre-bundled via
  `optimizeDeps.include` to keep dev-server reloads quick.

## License

No license granted. The code is here to be read, not reused — the content,
copy and design are mine.
