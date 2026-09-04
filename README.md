# Tamerian Materials — Where Carbon Meets Crystal

**Bio-derived multifunctional composites for self-powered sensing**

U.S. Patent Application No. 63/934,269 · Filed December 11, 2025 · 25 Claims · Patent Pending

Inventor: Jonathan Peoples · Concord, NC

**Proprietary:** This repository is not open source. See [`LICENSE`](LICENSE) and [`PROPRIETARY.md`](PROPRIETARY.md).

[![CI](https://github.com/HeruAhmose/tamerian-materials/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/HeruAhmose/tamerian-materials/actions/workflows/ci.yml)

**Security:** [`SECURITY.md`](SECURITY.md) — report vulnerabilities privately (GitHub Security tab or maintainer contact).

---

## Overview

Tamerian Materials is a cinematic research interface for a patent-pending composite architecture: hemp-derived carbon matrices with proposed piezoelectric, thermoelectric, magnetic, and rare-earth-doped crystalline phases.

The application defines composition, process, performance, and device targets. Filing those claims does not establish achieved performance. The integrated composite has not been independently validated; room-temperature coherence, same-composite self-power, and lifecycle sequestration remain research hypotheses or targets until measured.

## Part of TRAI

Tamerian Materials is organ 01 (Skeleton) of TRAI — the Tamerian Renaissance Alliance Initiative — one living Sovereignty Stack expressed through seven independently viable, mutually reinforcing organs. [`peoples-portfolio`](https://github.com/HeruAhmose/peoples-portfolio) is the entry gate that names and links all seven.

| #      | Organ · role                        | Venture                | Status                                                          | Where it lives                                                                                                                                              |
| ------ | ----------------------------------- | ---------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01** | **Skeleton — material sovereignty** | **Tamerian Materials** | **U.S. provisional filed**                                      | **you are here** · also linked from the gate: [`peoples-portfolio`](https://github.com/HeruAhmose/peoples-portfolio) at `/materials`                        |
| 02     | Heart — biological sovereignty      | True Mélange Φ         | Formulation set · entity pending                                | own repo: [`blue-gold-daily`](https://github.com/HeruAhmose/blue-gold-daily) → heruahmose.github.io/blue-gold-daily/layers.html                             |
| 03     | Brain — cognitive sovereignty       | Queen Califia          | Human-authorized command demo                                   | own repo: [`QueenCalifia-CyberAI`](https://github.com/HeruAhmose/QueenCalifia-CyberAI) → [GitHub Pages](https://heruahmose.github.io/QueenCalifia-CyberAI/) |
| 04     | Vessels — mobility sovereignty      | Mela Nation            | EIN filed · early development                                   | a page inside [`trai-portfolio`](https://github.com/HeruAhmose/trai-portfolio) (the estate) — no separate repo                                              |
| 05     | Skin — identity sovereignty         | MeLaNiNa               | EIN filed · early development                                   | a page inside [`trai-portfolio`](https://github.com/HeruAhmose/trai-portfolio) (the estate) — no separate repo                                              |
| 06     | Hands — community reach             | TechBridge Collective  | Designed · not yet operating                                    | own repo: [`techbridge-collective`](https://github.com/HeruAhmose/techbridge-collective) → techbridge-collective.org                                        |
| 07     | Lymphatic — regenerative return     | The Peoples Foundation | Operating under §508(c)(1)(A); no IRS determination represented | a page inside [`trai-portfolio`](https://github.com/HeruAhmose/trai-portfolio) (the estate) — no separate repo                                              |

## Features

- **Cinematic Intro** — Particle crystallization animation with hexagonal logo reveal
- **Web Audio Sound Engine** — 14 procedurally generated sounds (bass rumble, crystal chimes, whoosh, UI feedback, ambient drone) with mute toggle
- **Interactive Particle Canvas** — Mouse-reactive particle system with connection lines
- **3D Tilt Cards** — Perspective-based hover effects on technology cards
- **Character-Level Text Reveals** — GSAP-style letter-by-letter animations
- **Interactive Composition Orbital** — Clickable material nodes with detail panels
- **Illustrative Design Envelopes** — Clearly labeled concept curves for application targets, not measured data
- **7-Step Manufacturing Stepper** — Interactive process walkthrough
- **Quantum Sensing Section** — Floating spec labels with animated reveal
- **Patent Accordions** — Expandable sections with all 25 claims
- **Scroll-Driven Animations** — Section reveals, parallax depth, floating elements
- **Magnetic Cursor** — Premium cursor interaction effects
- **Sound Design** — Immersive audio feedback on every interaction

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** — Animations and transitions
- **GSAP** + **ScrollTrigger** — Scroll-driven animations
- **Web Audio API** — Procedural sound synthesis
- **Vite 8** — Build tooling

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
client/
  src/
    pages/Home.tsx          — Main page with all sections
    components/
      CinematicIntro.tsx    — Loading sequence
      ParticleCanvas.tsx    — Background particle system
      Navigation.tsx        — Sticky nav bar
      Section.tsx           — Scroll-triggered section wrapper
      TechModal.tsx         — Detailed technology modal
      TiltCard.tsx          — 3D perspective card
      TextReveal.tsx        — Character-level animation
      AnimatedCounter.tsx   — Number counting animation
      FloatingElements.tsx  — Ambient floating particles
      SoundToggle.tsx       — Mute/unmute button
      GlowDivider.tsx       — Glowing section divider
      SectionIndicator.tsx  — Floating table of contents
      ScrollProgress.tsx    — Top scroll progress bar
      MagneticCursor.tsx    — Cursor interaction effect
    contexts/
      SoundContext.tsx       — Global sound state
    hooks/
      useInView.ts          — Intersection Observer hook
      useCounter.ts         — Animated counter hook
      useGsapScroll.ts      — GSAP scroll animation hook
    lib/
      soundEngine.ts        — Web Audio API sound synthesis
      data.ts               — All patent/tech/composition data
server/
  index.ts                  — Express static server
```

## Patent Information

- **Title**: Multi-Modal Energy Harvesting Composite from Hemp-Derived Carbon
- **Provisional Application**: No. 63/934,269
- **Filed**: December 11, 2025
- **Claims**: 25 (Composition 1-15, Manufacturing 16-18, Device & System 19-25)
- **Status**: Patent Pending; integrated performance not independently validated

## License

All rights reserved. © 2025 Tamerian Materials / Jonathan Peoples
