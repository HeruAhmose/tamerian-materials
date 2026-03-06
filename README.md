# Tamerian Materials — Where Carbon Meets Crystal

A God-tier visual storytelling website showcasing patent-pending multi-modal energy harvesting composite technology. Built as an immersive cinematic science documentary experience.

**U.S. Patent Application No. 63/934,269** | Filed: December 11, 2025 | Inventor: Jonathan Peoples

---

## Overview

Tamerian Materials is a hemp-derived carbon composite that integrates four breakthrough technologies into a single material: piezoelectric energy harvesting, thermoelectric conversion, spin-Seebeck amplification, and quantum sensing via nitrogen-vacancy centers. This website presents the science, patent claims, and applications through a cinematic, interactive experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion + GSAP ScrollTrigger |
| Audio | Web Audio API (procedurally generated) |
| Typography | Playfair Display + Source Sans 3 + JetBrains Mono |
| Deployment | Cloudflare Pages |

## Features

**Cinematic Experience:** Particle crystallization intro sequence, character-level text reveal animations, GSAP scroll-driven storytelling, parallax depth layers, 3D tilt cards, magnetic cursor effects, floating ambient particles, and cinematic section transitions.

**Immersive Sound Design:** 14 procedurally generated sounds via the Web Audio API — deep bass rumble, crystallization chimes, whoosh transitions, UI click/hover feedback, modal effects, step progression sounds, ambient atmospheric drone, and more. All synthesized in real-time with zero external audio files.

**Interactive Data Visualization:** Animated piezoelectric voltage and thermoelectric ZT curves, interactive orbital composition diagram, 7-step manufacturing stepper, expandable patent accordions with all 25 claims, and animated counters.

**Quantum-Hardened Security:** Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), anti-clickjacking protections, DOM mutation observer for patent data integrity, console injection warnings, external link hardening, and Permissions-Policy restricting dangerous browser APIs.

## Security Hardening

This site implements comprehensive security measures to protect patent-pending intellectual property:

| Protection | Implementation |
|-----------|---------------|
| Transport Security | HSTS with 2-year max-age, preload, includeSubDomains |
| Content Security Policy | Strict CSP allowing only self, Google Fonts, CDN images, Web Audio |
| Anti-Clickjacking | X-Frame-Options DENY + frame-ancestors 'none' |
| MIME Protection | X-Content-Type-Options nosniff |
| XSS Protection | X-XSS-Protection 1; mode=block |
| Referrer Policy | strict-origin-when-cross-origin |
| Permissions Policy | Restricts camera, microphone, geolocation, payment, USB, etc. |
| Cross-Origin Policies | COOP, COEP, CORP configured |
| DOM Integrity | MutationObserver monitors patent numbers, claim counts, inventor name |
| Link Hardening | Auto-adds noopener noreferrer to all external links |
| Console Protection | Warning message in DevTools console |
| Selection Protection | Patent-critical data elements are non-selectable |
| Image Protection | Right-click disabled on images and protected elements |

See [SECURITY.md](SECURITY.md) for the full security policy and vulnerability reporting.

## Local Development

```bash
git clone https://github.com/HeruAhmose/tamerian-materials.git
cd tamerian-materials
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
pnpm build
```

Output is generated in the `dist/` directory, ready for static hosting.

## Cloudflare Pages Deployment

| Setting | Value |
|---------|-------|
| Build command | `pnpm install && pnpm build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

The `_headers` file in `client/public/` provides all security headers automatically on Cloudflare Pages. The `_redirects` file handles SPA routing.

## Project Structure

```
client/
  public/           <- Static files (_headers, _redirects, robots.txt)
  src/
    components/     <- UI components (ParticleCanvas, CinematicIntro, TiltCard, etc.)
    contexts/       <- React contexts (Theme, Sound)
    hooks/          <- Custom hooks (useInView, useCounter, useGsapScroll)
    lib/            <- Data constants, sound engine, security module, utilities
    pages/          <- Page components (Home.tsx - the main experience)
    App.tsx         <- Root component with security initialization
    index.css       <- Global styles, CSS custom properties, animations
server/             <- Express static server (for local development)
shared/             <- Shared constants
```

## Patent Information

| Field | Value |
|-------|-------|
| Title | Multi-Modal Energy Harvesting Composite from Hemp-Derived Carbon |
| Application | No. 63/934,269 |
| Filed | December 11, 2025 |
| Claims | 25 (Composition 1-15, Manufacturing 16-18, Device and System 19-25) |
| Inventor | Jonathan Peoples |
| Status | Patent Pending |

## Intellectual Property

All content, patent claims, technical specifications, and composite formulations are protected under U.S. Patent Application No. 63/934,269. See [LICENSE](LICENSE) for terms.

## Contact

**Tamerian Materials**
Email: tamerianmaterials@gmail.com

---

*Built with precision. Protected by design.*
