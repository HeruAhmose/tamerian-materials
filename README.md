# Tamerian Materials — Where Carbon Meets Crystal

**Multi-Functional Carbon Composites with Embedded Functional Crystals**

U.S. Patent Application No. 63/934,269 · Filed December 11, 2025 · 25 Claims · Patent Pending

Inventor: Jonathan Peoples · Concord, NC

---

## Overview

Tamerian Materials is a cinematic, immersive website showcasing a patent-pending multi-modal energy harvesting composite made from hemp-derived carbon matrices with embedded piezoelectric, thermoelectric, magnetic, and quantum-active crystalline phases.

## Features

- **Cinematic Intro** — Particle crystallization animation with hexagonal logo reveal
- **Web Audio Sound Engine** — 14 procedurally generated sounds (bass rumble, crystal chimes, whoosh, UI feedback, ambient drone) with mute toggle
- **Interactive Particle Canvas** — Mouse-reactive particle system with connection lines
- **3D Tilt Cards** — Perspective-based hover effects on technology cards
- **Character-Level Text Reveals** — GSAP-style letter-by-letter animations
- **Interactive Composition Orbital** — Clickable material nodes with detail panels
- **Animated SVG Charts** — Piezoelectric voltage and thermoelectric ZT curves with hover tooltips
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
- **Vite 7** — Build tooling

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
- **Application**: No. 63/934,269
- **Filed**: December 11, 2025
- **Claims**: 25 (Composition 1-15, Manufacturing 16-18, Device & System 19-25)
- **Status**: Patent Pending

## License

All rights reserved. © 2025 Tamerian Materials / Jonathan Peoples
