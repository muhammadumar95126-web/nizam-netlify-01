# NIZAM — Built for Every Operation

Launch website for **NIZAM**, the enterprise operations platform. Matte-black
editorial design, cinematic scroll storytelling, animated route transitions,
and a signature interactive **Operations Explorer**.

**Pages:** `/` · `/platform` · `/solutions` · `/industries` · `/pricing` ·
`/about` · `/roadmap` · `/contact` · `/book-demo` · `/waitlist`

## Stack

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **Tailwind CSS v4** — design tokens in `app/globals.css`
- **GSAP 3.15** (+ ScrollTrigger, SplitText) via `@gsap/react`
- **Lenis** smooth scrolling (synced to ScrollTrigger in `components/providers/SmoothScroll.tsx`)
- **Framer Motion** — menu overlay, Explorer transitions, accordions
- **Lucide** icons

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Architecture

```
app/
  layout.tsx            fonts, metadata, Navbar/Footer + PageTransition (persist across routes)
  page.tsx + <route>/   ten pages composing section components (dynamic imports below the fold)
  globals.css           design tokens, buttons, reveals, grain, reduced-motion rules
  api/{waitlist,demo,contact}/route.ts   intakes ← wire to CRM/DB before launch
components/
  providers/            SmoothScroll (Lenis+ScrollTrigger) · PageTransition (route curtain)
  canvas/Meridian.tsx   the brand object — 2D-canvas 3D wireframe sphere, mouse-reactive
  sections/             Hero · ImageMarquee · About · AboutStory · Problems ·
                        SolutionPillars · Industries (cursor-preview list) ·
                        Modules (pinned horizontal) · PlatformModules · HowItWorks ·
                        Explorer (signature dial) · Dashboard · AI · Pricing ·
                        GovernmentBand · Roadmap · FAQ · Waitlist · WaitlistPerks ·
                        Demo · ContactSection
  ui/                   Reveal · FadeIn · Magnetic · Marquee · CustomCursor ·
                        TransitionLink · PageHero · ParallaxImage · CTABand
lib/data.ts             all copy: modules, industries, solutions, values, pricing, roadmap, FAQ
public/images/          16 curated Unsplash photos (duotone-treated at render)
```

## Design system

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0b0b0a` | matte black base |
| `--coal` / `--smoke` | `#141413` / `#1d1d1b` | charcoal surfaces |
| `--paper` | `#efede7` | warm off-white (light sections) |
| `--fog` / `--grey` | `#a3a09a` / `#6f6c66` | muted text |
| `--accent` | `#c2a878` | champagne — used sparingly |

Light sections opt in with `data-theme="light"`; all tokens flip via CSS variables.

## Notes

- Every animation respects `prefers-reduced-motion`.
- Forms currently log server-side and return `{ ok: true }` — swap in your
  CRM/email provider in the three API routes.
- Navigation routes through a curtain transition (`PageTransition` +
  `TransitionLink`); real `<Link>` anchors underneath keep prefetch and SEO.
- Photography is downloaded from Unsplash (commercial-friendly license) into
  `public/images/` and served through `next/image`; the Meridian and dashboard
  visuals remain procedural. No third-party requests at runtime.
- Pricing: Starter $49 · Professional $149 · Business $299 · Enterprise custom
  (government engagements run under Enterprise — no public government price).
