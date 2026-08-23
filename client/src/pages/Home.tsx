/*
 * ═══════════════════════════════════════════════════════════════
 * TAMERIAN MATERIALS — GOD-TIER VISUAL STORYTELLING
 * Design: Cinematic Science Documentary
 * Typography: Playfair Display + Source Sans 3 + JetBrains Mono
 * Palette: Deep void with teal/purple/gold/pink light accents
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useSound } from "@/contexts/SoundContext";
import { soundEngine } from "@/lib/soundEngine";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicIntro from "@/components/CinematicIntro";
import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import TechModal from "@/components/TechModal";
import MagneticCursor from "@/components/MagneticCursor";
import SectionIndicator from "@/components/SectionIndicator";
import GlowDivider from "@/components/GlowDivider";
import ScrollToTop from "@/components/ScrollToTop";
import SoundToggle from "@/components/SoundToggle";
import TiltCard from "@/components/TiltCard";
import TextReveal from "@/components/TextReveal";
import FloatingElements from "@/components/FloatingElements";
import TypewriterText from "@/components/TypewriterText";
import AnimatedCounter from "@/components/AnimatedCounter";
import ResearchProgress from "@/components/ResearchProgress";
import { useInView } from "@/hooks/useInView";
import {
  TECH_CARDS,
  MFG_STEPS,
  APPS,
  CLAIMS,
  COMPOSITION,
  ORBITAL_NODES,
  IMAGES,
  STATS,
} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ─── Stagger Reveal Wrapper ───
function StaggerReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ───
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})`, opacity: 0.38 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,8,0.3) 0%, rgba(3,3,8,0.6) 40%, rgba(3,3,8,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Floating ambient hexagons */}
      <FloatingElements count={5} color="#45e8d8" type="hex" />
      <FloatingElements count={2} color="#a485ff" type="ring" />

      <motion.div
        className="relative z-10 px-[5vw] md:px-[7vw] max-w-[900px]"
        style={{ opacity, y: textY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2.5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.2 }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block animate-pulse"
            style={{ background: "#45e8d8", boxShadow: "0 0 14px #45e8d8" }}
          />
          <span
            className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#45e8d8",
            }}
          >
            Patent Pending · U.S. App. No. 63/934,269
          </span>
        </motion.div>

        {/* Title with character reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 4.3 }}
        >
          <h1
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.06] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <TextReveal
              text="Where Carbon"
              style={{ color: "var(--qg)" }}
              delay={4.4}
              stagger={0.03}
              force
            />
            <br />
            <TextReveal
              text="Meets "
              style={{ color: "var(--qg)" }}
              delay={4.7}
              stagger={0.03}
              force
            />
            <TextReveal
              text="Crystal"
              delay={4.9}
              stagger={0.04}
              force
              style={{ fontStyle: "italic" }}
              charStyle={{
                background:
                  "linear-gradient(135deg, #45e8d8, #a485ff, #ff7eb6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl leading-[1.9] max-w-[640px] mb-8"
          style={{ color: "var(--t2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5.5 }}
        >
          Hemp-derived carbon matrices with embedded piezoelectric,
          thermoelectric, magnetic, and quantum-active crystalline phases — a
          single composite for simultaneous energy harvesting and
          room-temperature quantum sensing.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5.8 }}
        >
          <motion.a
            href="#tech"
            onClick={e => {
              e.preventDefault();
              document
                .querySelector("#tech")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.08em] uppercase px-8 py-4 relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #45e8d8, #28c8b8)",
              color: "var(--void)",
              boxShadow: "0 4px 20px rgba(69,232,216,0.3)",
            }}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 40px rgba(69,232,216,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => {
              try {
                soundEngine.play("hover");
              } catch {}
            }}
          >
            <span className="relative z-10">Explore the Science ↓</span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
          <motion.a
            href="#ip"
            onClick={e => {
              e.preventDefault();
              document
                .querySelector("#ip")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-semibold tracking-[0.06em] uppercase py-4 relative group"
            style={{ color: "var(--t2)" }}
            whileHover={{ color: "#45e8d8" }}
          >
            View All 25 Claims →
            <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#45e8d8] group-hover:w-full transition-all duration-400" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.8, duration: 1 }}
      >
        <span
          className="text-[0.6rem] tracking-[0.2em] uppercase"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--t3)",
          }}
        >
          Scroll to Explore
        </span>
        <motion.div
          className="w-[1px] h-10"
          style={{
            background: "linear-gradient(to bottom, #45e8d8, transparent)",
          }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

// ─── Patent Bar ───
function PatentBar() {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      className="relative z-10 flex items-center justify-center gap-4 md:gap-7 flex-wrap px-[4vw] py-5"
      style={{
        borderTop: "1px solid var(--bd)",
        borderBottom: "1px solid var(--bd)",
        background: "rgba(10,10,18,0.7)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {[
        ["Application", "No. 63/934,269"],
        ["Filed", "Dec 11, 2025"],
        ["Claims", "25"],
        ["Confirm.", "#6305"],
        ["Status", "Patent Pending"],
      ].map(([k, v], i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          {i > 0 && (
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "var(--tmd)" }}
            />
          )}
          <span
            className="text-[0.6rem] font-medium tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--t3)",
            }}
          >
            {k}
          </span>
          <span
            className="text-[0.75rem] font-semibold ml-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: k === "Status" ? "#45e8d8" : "var(--qu)",
            }}
          >
            {v}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Stats Row ───
function StatsRow() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="relative z-10 grid grid-cols-2 md:grid-cols-5 py-4"
      style={{ borderBottom: "1px solid var(--bd)" }}
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center py-6 px-3 relative group cursor-default"
          style={{
            borderRight: i < STATS.length - 1 ? "1px solid var(--bd)" : "none",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.12 }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(69,232,216,0.04), transparent 70%)",
            }}
          />
          <div
            className="text-3xl md:text-4xl font-semibold relative"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qg)",
            }}
          >
            {stat.isStatic ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
              >
                {stat.value}
              </motion.span>
            ) : stat.countFrom ? (
              <span>
                <AnimatedCounter
                  end={stat.countFrom}
                  trigger={inView}
                  color="var(--qg)"
                />
                –
                <AnimatedCounter
                  end={stat.countTo!}
                  trigger={inView}
                  color="var(--qg)"
                  suffix="%"
                />
              </span>
            ) : (
              <AnimatedCounter
                end={stat.countTo!}
                trigger={inView}
                color="var(--qg)"
              />
            )}
          </div>
          <div
            className="text-[0.6rem] font-medium tracking-[0.1em] uppercase mt-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--t3)",
            }}
          >
            {stat.label}
          </div>
          {/* Bottom accent line on hover */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-12 transition-all duration-400"
            style={{ background: "#45e8d8" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tech Cards Section ───
function TechSection({ onCardClick }: { onCardClick: (idx: number) => void }) {
  return (
    <Section
      id="tech"
      eyebrow="Core Innovation"
      title="Four Technologies, One Material"
      subtitle="Click any card to explore specs, patent claims, and performance data."
      dark
    >
      <FloatingElements count={4} color="#45e8d8" type="hex" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {TECH_CARDS.map((card, i) => (
          <TechCard
            key={card.id}
            card={card}
            index={i}
            onClick={() => onCardClick(i)}
          />
        ))}
      </div>
    </Section>
  );
}

function TechCard({
  card,
  index,
  onClick,
}: {
  card: (typeof TECH_CARDS)[number];
  index: number;
  onClick: () => void;
}) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { play } = useSound();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <TiltCard
        className="cursor-pointer group"
        style={{
          padding: "2rem",
          borderTop: `3px solid ${card.color}40`,
          borderRight: `1px solid ${hovered ? "var(--bdh)" : "var(--bd)"}`,
          borderBottom: `1px solid ${hovered ? "var(--bdh)" : "var(--bd)"}`,
          borderLeft: `1px solid ${hovered ? "var(--bdh)" : "var(--bd)"}`,
          background: hovered ? "var(--lat)" : "var(--gra)",
          transition: "background 0.3s, border-color 0.3s",
        }}
        onClick={onClick}
        aria-label={`${card.num}. ${card.title} — view technical specifications and patent claims`}
        intensity={8}
      >
        <div
          onMouseEnter={() => {
            setHovered(true);
            play("hover");
          }}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Background glow on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at center, ${card.color}0a, transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Number */}
          <div
            className="absolute top-3 right-5 text-6xl font-bold transition-all duration-500"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: hovered ? `${card.color}18` : "rgba(240,232,216,0.03)",
            }}
          >
            {card.num}
          </div>

          {/* Topic-owned visual: the image is bound to this exact technology. */}
          <div
            className="relative w-full h-36 md:h-40 mb-5 overflow-hidden"
            style={{
              border: `1px solid ${card.color}24`,
              background: "var(--void)",
            }}
          >
            <motion.img
              src={
                card.id === "matrix"
                  ? IMAGES.hemp
                  : card.id === "crystals"
                    ? IMAGES.crystal
                    : card.id === "harvest"
                      ? IMAGES.energy
                      : IMAGES.quantum
              }
              alt={`${card.title} visualization`}
              className="w-full h-full object-cover"
              style={{ opacity: hovered ? 0.78 : 0.58 }}
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.45 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, var(--gra), transparent 58%), radial-gradient(circle at 75% 25%, ${card.color}18, transparent 38%)`,
              }}
            />
            <span
              className="absolute bottom-3 left-3 text-[0.55rem] font-semibold tracking-[0.12em] uppercase px-2 py-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: card.color,
                background: "rgba(3,3,8,0.78)",
                border: `1px solid ${card.color}30`,
              }}
            >
              {card.title}
            </span>
          </div>

          {/* Animated dot */}
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
            style={{
              background: card.color + "14",
              border: `1px solid ${card.color}30`,
            }}
            animate={
              hovered
                ? { scale: 1.1, boxShadow: `0 0 20px ${card.color}30` }
                : { scale: 1, boxShadow: "none" }
            }
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="w-3 h-3 rounded-full block"
              style={{ background: card.color }}
              animate={hovered ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
            />
          </motion.div>

          <h3
            className="text-xl font-semibold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qu)",
            }}
          >
            {card.title}
          </h3>
          <p
            className="text-base leading-[1.75] mb-4"
            style={{ color: "var(--t2)" }}
          >
            {card.short}
          </p>

          <div className="flex justify-between items-center">
            <span
              className="text-[0.6rem] font-semibold tracking-[0.06em] uppercase px-2 py-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--tmd)",
                border: "1px solid rgba(69,232,216,0.15)",
              }}
            >
              {card.claim} · {card.vol}
            </span>
            <motion.span
              className="text-[0.65rem] font-semibold tracking-[0.06em]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#45e8d8",
              }}
              animate={{ x: hovered ? 6 : 0 }}
            >
              EXPLORE →
            </motion.span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Composition Section ───
function CompositionSection() {
  const [active, setActive] = useState(COMPOSITION[0]?.m ?? "q");
  const { play: playSound } = useSound();
  const selected =
    COMPOSITION.find(item => item.m === active) ?? COMPOSITION[0];

  return (
    <Section
      id="comp"
      eyebrow="Composite Architecture — Claim 15"
      title="Engineered Across Three Scales"
      subtitle="A material architecture instrument: structural carbon, micron-scale crystals, and nanoscale functional phases mapped as one interacting system."
    >
      <div
        className="grid gap-8 lg:grid-cols-[1.08fr_.92fr]"
        data-prestige-material-architecture="v1"
      >
        <StaggerReveal>
          <div
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border p-6 md:p-8"
            style={{
              borderColor: "rgba(69,232,216,.18)",
              background:
                "radial-gradient(circle at 48% 42%, rgba(69,232,216,.08), transparent 26%), radial-gradient(circle at 68% 64%, rgba(164,133,255,.07), transparent 28%), linear-gradient(145deg,rgba(10,13,21,.96),rgba(4,6,11,.98))",
              boxShadow: "0 34px 100px rgba(0,0,0,.34)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#45e8d8]/80">
                  MATERIAL ATLAS /// LIVE PHASE MAP
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white md:text-3xl">
                  {selected?.n}
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] tracking-[0.16em] text-white/55">
                {selected?.p}
              </div>
            </div>

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-[30rem]">
              <motion.div
                className="absolute inset-[8%] rounded-full border border-[#45e8d8]/18"
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[18%] rounded-full border border-[#a485ff]/18"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[30%] rounded-full border border-[#e8c44a]/18"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[39%] rounded-full bg-[radial-gradient(circle,#fff_0_2%,#45e8d8_4%,rgba(69,232,216,.18)_24%,transparent_70%)] shadow-[0_0_80px_rgba(69,232,216,.22)]" />
              {COMPOSITION.map((item, index) => {
                const angle =
                  (index / COMPOSITION.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 39;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                const chosen = item.m === active;
                return (
                  <motion.button
                    key={item.m}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => {
                      setActive(item.m);
                      playSound("click");
                    }}
                    className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-xs font-bold uppercase backdrop-blur-md md:h-16 md:w-16"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      borderColor: chosen
                        ? "rgba(69,232,216,.75)"
                        : "rgba(255,255,255,.14)",
                      background: chosen
                        ? "radial-gradient(circle,rgba(69,232,216,.22),rgba(6,10,16,.9))"
                        : "rgba(5,8,13,.78)",
                      color: chosen ? "#bffaf3" : "rgba(255,255,255,.58)",
                      boxShadow: chosen
                        ? "0 0 34px rgba(69,232,216,.28)"
                        : undefined,
                    }}
                    animate={chosen ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{
                      duration: 1.8,
                      repeat: chosen ? Infinity : 0,
                    }}
                  >
                    {item.m}
                  </motion.button>
                );
              })}
              <div className="pointer-events-none absolute inset-[4%] rounded-full bg-[repeating-conic-gradient(from_0deg,transparent_0_13deg,rgba(255,255,255,.025)_14deg_15deg,transparent_16deg_30deg)] opacity-70" />
            </div>

            <motion.div
              key={selected?.m}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-start"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#45e8d8]/75">
                FUNCTION
              </span>
              <p className="text-sm leading-relaxed text-white/68">
                {selected?.d}
              </p>
            </motion.div>
          </div>
        </StaggerReveal>

        <StaggerReveal delay={0.1}>
          <div className="space-y-3">
            <div className="mb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
                COMPOSITION INSTRUMENTS
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                Select a phase to isolate its role in the hierarchy. The visual
                field responds as a system, not a list of ingredients.
              </p>
            </div>
            {COMPOSITION.map((item, index) => {
              const chosen = item.m === active;
              return (
                <motion.button
                  key={item.m}
                  type="button"
                  onClick={() => {
                    setActive(item.m);
                    playSound("click");
                  }}
                  aria-pressed={chosen}
                  className="group relative w-full overflow-hidden rounded-2xl border p-5 text-left"
                  style={{
                    borderColor: chosen
                      ? "rgba(69,232,216,.42)"
                      : "rgba(255,255,255,.09)",
                    background: chosen
                      ? "linear-gradient(130deg,rgba(69,232,216,.075),rgba(255,255,255,.018))"
                      : "linear-gradient(130deg,rgba(255,255,255,.025),rgba(255,255,255,.012))",
                    boxShadow: chosen
                      ? "0 20px 54px rgba(69,232,216,.08)"
                      : undefined,
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/25 font-mono text-[10px] text-[#45e8d8]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-serif text-lg font-semibold text-white/90">
                          {item.n}
                        </h4>
                        <span className="font-mono text-[9px] text-white/40">
                          {item.p}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/58">
                        {item.d}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </StaggerReveal>
      </div>
    </Section>
  );
}

// ─── Energy Section ───
function EnergySection() {
  return (
    <Section
      id="energy"
      eyebrow="Energy Harvesting — Claim 6"
      title="Three Conversion Modes"
      subtitle="Hover chart data points for exact values."
      dark
    >
      <FloatingElements count={4} color="#e8c44a" type="dot" />

      {/* Cinematic image with parallax */}
      <motion.div
        className="relative w-full h-48 md:h-72 mt-6 mb-8 overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <motion.img
          src={IMAGES.energy}
          alt="Energy harvesting visualization"
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
          whileInView={{ scale: [1.05, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--carbon), transparent 30%, transparent 70%, var(--carbon))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--carbon), transparent 20%, transparent 80%, var(--carbon))",
          }}
        />
      </motion.div>

      {/* Three mechanism cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: "⚡",
            title: "Piezoelectric",
            range: "50–500 μW/cm²",
            desc: "Quartz + tourmaline under 10–100 MPa cyclic stress at 0.1–100 Hz",
            color: "#45e8d8",
            detail: "d₃₃ ~2.3–10 pC/N",
          },
          {
            icon: "🔥",
            title: "Thermoelectric",
            range: "ZT 1.0–2.5",
            desc: "Carbon-crystal interfaces at 250–350K with spin-Seebeck enhancement",
            color: "#a485ff",
            detail: "5–10× Bi₂Te₃",
          },
          {
            icon: "🧲",
            title: "Spin-Seebeck",
            range: "+40–60%",
            desc: "Magnetite nanoparticle network adds thermal conversion beyond conventional",
            color: "#e8c44a",
            detail: "Fe₃O₄ 10–200nm",
          },
        ].map((mech, i) => (
          <motion.div
            key={i}
            className="p-6 text-center relative overflow-hidden group"
            style={{ border: "1px solid var(--bd)", background: "var(--gra)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -4, borderColor: "var(--bdh)" }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${mech.color}60, transparent)`,
              }}
            />
            <div className="text-3xl mb-3">{mech.icon}</div>
            <div
              className="text-sm font-semibold tracking-[0.06em] uppercase mb-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: mech.color,
              }}
            >
              {mech.title}
            </div>
            <div
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--qg)",
              }}
            >
              {mech.range}
            </div>
            <p
              className="text-xs leading-[1.65] mb-2"
              style={{ color: "var(--t3)" }}
            >
              {mech.desc}
            </p>
            <span
              className="text-[0.55rem] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 inline-block"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: mech.color,
                border: `1px solid ${mech.color}30`,
                background: `${mech.color}08`,
              }}
            >
              {mech.detail}
            </span>
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${mech.color}06, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ChartBox
          title="Piezoelectric — Claim 6(a)"
          color="#45e8d8"
          note="Formulation D (30% quartz, 15% tourmaline, optimized)"
          type="piezo"
        />
        <ChartBox
          title="Thermoelectric — Claim 6(b)"
          color="#a485ff"
          note="12% magnetite optimized vs Bi₂Te₃ reference"
          type="thermo"
        />
      </div>

      {/* Combined output */}
      <motion.div
        className="mt-8 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden"
        style={{
          border: "1px solid var(--bd)",
          background:
            "linear-gradient(135deg, rgba(69,232,216,0.03), rgba(164,133,255,0.02))",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, #45e8d8, #a485ff, #e8c44a)",
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div>
          <h3
            className="text-2xl font-semibold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qg)",
            }}
          >
            Combined Output — Claim 6(c)
          </h3>
          <p className="text-base" style={{ color: "var(--t2)" }}>
            Simultaneous mechanical + thermal loading
          </p>
        </div>
        <div className="text-right">
          <div
            className="text-4xl md:text-5xl font-bold leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #45e8d8, #a485ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            80–800
          </div>
          <div
            className="text-[0.55rem] font-semibold tracking-[0.12em] uppercase mt-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--t3)",
            }}
          >
            μW/cm² Combined
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function ChartBox({
  title,
  color,
  note,
  type,
}: {
  title: string;
  color: string;
  note: string;
  type: "piezo" | "thermo";
}) {
  const [ref, inView] = useInView();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const { play: playSound } = useSound();
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setAnimProgress(p);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  const w = 360,
    h = 220,
    px = 48,
    py = 24;
  const cw = w - px - 14,
    ch = h - py - 30;

  const isPiezo = type === "piezo";
  const data = isPiezo
    ? [
        [0, 0],
        [0.1, 0.8],
        [0.2, 2.2],
        [0.3, 3.5],
        [0.4, 5.5],
        [0.5, 7.8],
        [0.6, 9.5],
        [0.7, 11],
        [0.8, 12.5],
        [0.9, 14],
        [1, 15],
      ]
    : [
        [0, 0.95],
        [0.125, 1.05],
        [0.25, 1.15],
        [0.375, 1.35],
        [0.5, 1.55],
        [0.625, 1.75],
        [0.75, 1.9],
        [0.875, 2.05],
        [1, 2.2],
      ];
  const labels = isPiezo
    ? [
        "0V @ 0 MPa",
        "0.8V @ 10",
        "2.2V @ 20",
        "3.5V @ 30",
        "5.5V @ 40",
        "7.8V @ 50",
        "9.5V @ 60",
        "11V @ 70",
        "12.5V @ 80",
        "14V @ 90",
        "15V @ 100",
      ]
    : [
        "ZT 0.95 @ 250K",
        "ZT 1.05 @ 275K",
        "ZT 1.15 @ 300K",
        "ZT 1.35 @ 325K",
        "ZT 1.55 @ 350K",
        "ZT 1.75 @ 375K",
        "ZT 1.9 @ 400K",
        "ZT 2.05 @ 425K",
        "ZT 2.2 @ 450K",
      ];
  const yMax = isPiezo ? 15 : 2.5;
  const xLabels = isPiezo ? ["0", "100 MPa"] : ["250K", "450K"];
  const yLabel = isPiezo ? "PIEZOELECTRIC VOLTAGE" : "THERMOELECTRIC ZT";

  const refData = !isPiezo
    ? [
        [0, 0.12],
        [0.25, 0.18],
        [0.5, 0.24],
        [0.75, 0.32],
        [1, 0.4],
      ]
    : null;

  // Animate points appearing based on progress
  const visibleCount = Math.floor(animProgress * data.length);
  const visibleData = data.slice(0, visibleCount + 1);

  const pts = visibleData
    .map(d => `${px + d[0] * cw},${py + ch - (d[1] / yMax) * ch}`)
    .join(" ");
  const areaPoints =
    visibleData.length > 1
      ? `${px},${py + ch} ${pts} ${px + visibleData[visibleData.length - 1][0] * cw},${py + ch}`
      : "";

  const refPts = refData
    ? refData
        .map(d => `${px + d[0] * cw},${py + ch - (d[1] / yMax) * ch}`)
        .join(" ")
    : "";

  // Grid lines
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const yVal = (yMax / 4) * i;
    const yPos = py + ch - (yVal / yMax) * ch;
    return { yPos, label: isPiezo ? yVal.toFixed(0) : yVal.toFixed(1) };
  });

  return (
    <motion.div
      ref={ref}
      className="p-5 relative overflow-hidden group"
      style={{ border: "1px solid var(--bd)", background: "var(--gra)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ borderColor: "var(--bdh)" }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />

      <h4
        className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase mb-4"
        style={{ fontFamily: "'JetBrains Mono', monospace", color }}
      >
        {title}
      </h4>

      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          {/* Y label */}
          <text
            x={px + cw / 2}
            y="14"
            textAnchor="middle"
            fill="#a8a0b8"
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="600"
            letterSpacing="0.5"
          >
            {yLabel}
          </text>
          {/* Grid lines */}
          {gridLines.map((gl, i) => (
            <g key={i}>
              <line
                x1={px}
                y1={gl.yPos}
                x2={px + cw}
                y2={gl.yPos}
                stroke="#706888"
                strokeWidth="0.3"
                strokeDasharray="2,4"
              />
              <text
                x={px - 6}
                y={gl.yPos + 3}
                textAnchor="end"
                fill="#706888"
                fontSize="7.5"
                fontWeight="500"
              >
                {gl.label}
              </text>
            </g>
          ))}
          {/* Axes */}
          <line
            x1={px}
            y1={py}
            x2={px}
            y2={py + ch}
            stroke="#706888"
            strokeWidth="0.6"
          />
          <line
            x1={px}
            y1={py + ch}
            x2={px + cw}
            y2={py + ch}
            stroke="#706888"
            strokeWidth="0.6"
          />
          {/* X labels */}
          <text x={px} y={py + ch + 14} fill="#a8a0b8" fontSize="8">
            {xLabels[0]}
          </text>
          <text
            x={px + cw}
            y={py + ch + 14}
            textAnchor="end"
            fill="#a8a0b8"
            fontSize="8"
          >
            {xLabels[1]}
          </text>

          {/* Reference line for thermo */}
          {refData && (
            <>
              <polyline
                fill="none"
                stroke="#706888"
                strokeWidth="1"
                strokeDasharray="4,3"
                points={refPts}
              />
              <text
                x={px + cw - 25}
                y={py + ch - (refData[refData.length - 1][1] / yMax) * ch - 6}
                fill="#706888"
                fontSize="7"
                fontWeight="500"
              >
                Bi₂Te₃ ref
              </text>
            </>
          )}

          {/* Area fill */}
          {areaPoints && <polygon fill={color + "12"} points={areaPoints} />}

          {/* Line */}
          {visibleData.length > 1 && (
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="2"
              points={pts}
              strokeLinejoin="round"
            />
          )}

          {/* Glow line */}
          {visibleData.length > 1 && (
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="4"
              points={pts}
              strokeLinejoin="round"
              opacity="0.15"
            />
          )}

          {/* Data points */}
          {visibleData.map((d, i) => {
            const cx = px + d[0] * cw;
            const cy = py + ch - (d[1] / yMax) * ch;
            return (
              <g key={i}>
                {/* Glow ring */}
                <circle cx={cx} cy={cy} r="8" fill={color} opacity="0.08" />
                <circle
                  cx={cx}
                  cy={cy}
                  r="4.5"
                  fill="var(--gra)"
                  stroke={color}
                  strokeWidth="2"
                  className="cursor-pointer"
                  style={{ transition: "r 0.2s" }}
                  onMouseEnter={e => {
                    (e.target as SVGCircleElement).setAttribute("r", "7");
                    setTooltip({ x: cx, y: cy - 18, text: labels[i] });
                    playSound("data_point");
                  }}
                  onMouseLeave={e => {
                    (e.target as SVGCircleElement).setAttribute("r", "4.5");
                    setTooltip(null);
                  }}
                />
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 50}
                y={tooltip.y - 12}
                width="100"
                height="18"
                rx="3"
                fill="var(--lat)"
                stroke={color}
                strokeWidth="0.5"
              />
              <text
                x={tooltip.x}
                y={tooltip.y + 1}
                textAnchor="middle"
                fill="var(--qg)"
                fontSize="9"
                fontWeight="700"
                fontFamily="'JetBrains Mono', monospace"
              >
                {tooltip.text}
              </text>
            </g>
          )}
        </svg>
      </div>

      <p className="text-sm mt-2" style={{ color: "var(--t3)" }}>
        {note}
      </p>
    </motion.div>
  );
}

// ─── Manufacturing Section ───
function ManufacturingSection() {
  const [step, setStep] = useState(0);
  const { play: playSound } = useSound();
  const current = MFG_STEPS[step];

  return (
    <Section
      id="mfg"
      eyebrow="Manufacturing — Claim 16"
      title="Seven Controlled Transformations"
      subtitle="Manufacturing is presented as a state-changing process chain: feedstock becomes conductive architecture, crystals become functional phases, and the composite becomes a qualified device material."
    >
      <div
        className="grid gap-7 lg:grid-cols-[.72fr_1.28fr]"
        data-prestige-manufacturing="v1"
      >
        <StaggerReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,13,20,.96),rgba(4,6,10,.99))] p-5 md:p-6">
            <div className="absolute bottom-6 left-[2.05rem] top-6 w-px bg-gradient-to-b from-[#45e8d8]/55 via-[#a485ff]/35 to-[#e8c44a]/45" />
            <p className="mb-5 pl-12 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
              PROCESS SPINE
            </p>
            <div className="space-y-2">
              {MFG_STEPS.map((item, index) => {
                const active = step === index;
                const complete = index < step;
                return (
                  <button
                    key={item.n}
                    type="button"
                    onClick={() => {
                      setStep(index);
                      playSound("click");
                    }}
                    className="group relative flex w-full items-start gap-4 rounded-2xl p-3 text-left transition"
                    style={{
                      background: active
                        ? "rgba(69,232,216,.055)"
                        : "transparent",
                    }}
                    aria-pressed={active}
                  >
                    <motion.span
                      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[#070b10] font-mono text-[9px]"
                      style={{
                        borderColor: active
                          ? "rgba(69,232,216,.8)"
                          : complete
                            ? "rgba(164,133,255,.55)"
                            : "rgba(255,255,255,.13)",
                        color: active
                          ? "#a9f6ed"
                          : complete
                            ? "#c9baff"
                            : "rgba(255,255,255,.38)",
                        boxShadow: active
                          ? "0 0 24px rgba(69,232,216,.28)"
                          : undefined,
                      }}
                      animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                      transition={{
                        duration: 1.8,
                        repeat: active ? Infinity : 0,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block font-mono text-[9px] tracking-[0.16em] text-white/34">
                        STEP {item.n}
                      </span>
                      <span
                        className={`mt-1 block text-sm font-semibold ${active ? "text-white" : "text-white/62"}`}
                      >
                        {item.t}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </StaggerReveal>

        <StaggerReveal delay={0.08}>
          <motion.div
            key={current.n}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-[#45e8d8]/15 bg-[linear-gradient(145deg,rgba(9,14,22,.97),rgba(3,5,9,.99))] p-6 shadow-[0_35px_110px_rgba(0,0,0,.38)] md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_70%_30%,black,transparent_75%)]" />
            <div className="relative flex flex-col gap-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#45e8d8]/75">
                    TRANSFORMATION {current.n}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold text-white md:text-5xl">
                    {current.t}
                  </h3>
                </div>
                <span className="font-serif text-6xl font-semibold text-white/[0.045] md:text-8xl">
                  {String(step + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative min-h-[17rem] overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/25">
                <motion.div
                  className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#45e8d8]/60 to-transparent"
                  animate={{
                    scaleX: [0.25, 1, 0.25],
                    opacity: [0.2, 0.9, 0.2],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.i
                    key={i}
                    className="absolute h-2.5 w-2.5 rounded-full bg-[#45e8d8] shadow-[0_0_18px_rgba(69,232,216,.7)]"
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${36 + ((i + step) % 3) * 14}%`,
                    }}
                    animate={{
                      y: [0, -10 - (i % 3) * 3, 0],
                      opacity: [0.35, 1, 0.35],
                      scale: [0.7, 1.25, 0.7],
                    }}
                    transition={{
                      duration: 2.3 + (i % 3) * 0.35,
                      delay: i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35 md:inset-x-8">
                  <span>INPUT STATE</span>
                  <span>CONTROL WINDOW</span>
                  <span>OUTPUT STATE</span>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-[1.85] text-white/68">
                {current.d}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["PROCESS STATE", `${step + 1} / ${MFG_STEPS.length}`],
                  [
                    "MATERIAL MEMORY",
                    step < 2
                      ? "FORMATION"
                      : step < 5
                        ? "INTEGRATION"
                        : "QUALIFICATION",
                  ],
                  [
                    "NEXT TRANSITION",
                    step === MFG_STEPS.length - 1
                      ? "DEVICE READY"
                      : MFG_STEPS[step + 1].t.toUpperCase(),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <div className="font-mono text-[8px] tracking-[0.18em] text-white/35">
                      {label}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-white/75">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </StaggerReveal>
      </div>
    </Section>
  );
}

// ─── Quantum Sensing Section ───
function QuantumSection() {
  return (
    <Section
      id="quantum"
      eyebrow="Quantum Sensing — Claim 7"
      title="Room-Temperature Quantum Coherence"
    >
      <FloatingElements count={6} color="#ff7eb6" type="ring" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 mt-8 items-center">
        {/* Quantum image */}
        <motion.div
          className="relative overflow-hidden aspect-square max-w-[440px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={IMAGES.quantum}
            alt="Rare-earth quantum sensing visualization"
            className="w-full h-full object-cover"
            style={{ opacity: 0.7 }}
            whileInView={{ scale: [1.05, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 25%, var(--void) 100%)",
            }}
          />
          {/* Floating labels with pulse */}
          {[
            { label: "Eu³⁺", top: "18%", left: "22%", color: "#ff7eb6" },
            { label: "Nd³⁺", top: "32%", left: "68%", color: "#a485ff" },
            { label: "Er³⁺", top: "58%", left: "38%", color: "#45e8d8" },
            { label: "T₂ > 500ns", top: "76%", left: "56%", color: "#e8c44a" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2.5 py-1"
              style={{
                top: item.top,
                left: item.left,
                fontFamily: "'JetBrains Mono', monospace",
                color: item.color,
                border: `1px solid ${item.color}40`,
                background: `${item.color}0c`,
                backdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.15,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.15,
                boxShadow: `0 0 20px ${item.color}30`,
              }}
            >
              {item.label}
              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-sm"
                style={{ border: `1px solid ${item.color}` }}
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div>
          <motion.p
            className="text-lg leading-[1.9] mb-6"
            style={{ color: "var(--t2)" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Rare-earth doped crystalline particles embedded in the composite
            host quantum spin centers that exhibit coherence at room
            temperature. Because the composite itself harvests energy, the
            quantum sensors are entirely self-powered — no external batteries or
            cables required.
          </motion.p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Dopants", value: "Eu³⁺, Nd³⁺, Er³⁺, Yb³⁺, Ce³⁺" },
              { label: "Host Matrix", value: "Quartz (SiO₂)" },
              { label: "Coherence T₂", value: "> 500 ns (target 1–10 μs)" },
              { label: "Operating Temp", value: "Room Temperature (300K)" },
              { label: "Self-Powered", value: "Yes — same composite" },
              { label: "Sensing", value: "Magnetic, Temp, Strain" },
            ].map((spec, i) => (
              <motion.div
                key={i}
                className="px-3 py-2.5 relative overflow-hidden group"
                style={{ background: "var(--lat)" }}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="text-[0.55rem] font-semibold tracking-[0.08em] uppercase mb-0.5"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--t3)",
                  }}
                >
                  {spec.label}
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "var(--qu)" }}
                >
                  {spec.value}
                </div>
                {/* Left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff7eb6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Insight */}
          <motion.div
            className="mt-6 p-4 text-sm leading-[1.8] relative overflow-hidden"
            style={{
              color: "var(--t1)",
              background: "rgba(255,126,182,0.04)",
              borderLeft: "3px solid rgba(255,126,182,0.25)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Europium ions substituted into the quartz lattice create optically
            addressable quantum centers. Under optical pumping, these centers
            exhibit spin coherence sensitive to local magnetic fields,
            temperature shifts, and mechanical strain — enabling quantum-limited
            sensing powered by the composite's own energy harvesting.
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── Applications Section ───
function ApplicationsSection() {
  const [activeApp, setActiveApp] = useState(0);
  const app = APPS[activeApp];

  return (
    <Section
      id="apps"
      eyebrow="Applications — Claims 19–25"
      title="From Material System to Device Architecture"
      subtitle="The composite is not presented as a generic material catalog. Each application is framed as a distinct device topology with a different load, environment, and sensing or energy role."
    >
      <div
        className="grid gap-7 lg:grid-cols-[1.12fr_.88fr]"
        data-prestige-device-gallery="v1"
      >
        <StaggerReveal>
          <motion.div
            key={app.t}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,12,19,.97),rgba(3,5,9,.99))] p-6 md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(164,133,255,.09),transparent_26%),radial-gradient(circle_at_28%_70%,rgba(69,232,216,.07),transparent_24%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff7eb6]/75">
                    DEVICE TYPOLOGY {String(activeApp + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 max-w-2xl font-serif text-3xl font-semibold text-white md:text-5xl">
                    {app.t}
                  </h3>
                  <p className="mt-3 font-mono text-[9px] tracking-[0.16em] text-white/35">
                    {app.cl}
                  </p>
                </div>
                <div
                  className="text-5xl text-[#45e8d8]/75 md:text-7xl"
                  aria-hidden
                >
                  {app.icon}
                </div>
              </div>

              <div className="relative my-9 flex min-h-[14rem] flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/25">
                <motion.div
                  className="absolute h-48 w-48 rounded-full border border-[#45e8d8]/18"
                  animate={{ rotate: 360, scale: [0.92, 1.06, 0.92] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute h-32 w-56 rounded-[50%] border border-[#a485ff]/18"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute h-20 w-20 rotate-45 border border-[#ff7eb6]/25 bg-[#ff7eb6]/[0.025]"
                  animate={{ rotate: [45, 225, 405], scale: [0.9, 1.12, 0.9] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#45e8d8]/35 bg-[#061116] text-2xl text-[#45e8d8] shadow-[0_0_48px_rgba(69,232,216,.2)]">
                  {app.icon}
                </div>
                <div className="absolute inset-x-5 bottom-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-white/28">
                  <span>HARVEST</span>
                  <span>SENSE</span>
                  <span>TRANSMIT</span>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-[1.85] text-white/68">
                {app.d}
              </p>
            </div>
          </motion.div>
        </StaggerReveal>

        <StaggerReveal delay={0.1}>
          <div className="space-y-3">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/38">
              APPLICATION ATLAS
            </p>
            {APPS.map((item, index) => {
              const selected = activeApp === index;
              return (
                <motion.button
                  key={item.t}
                  type="button"
                  onClick={() => setActiveApp(index)}
                  aria-pressed={selected}
                  whileHover={{ x: 4 }}
                  className="w-full rounded-2xl border p-5 text-left"
                  style={{
                    borderColor: selected
                      ? "rgba(255,126,182,.38)"
                      : "rgba(255,255,255,.09)",
                    background: selected
                      ? "linear-gradient(130deg,rgba(255,126,182,.06),rgba(255,255,255,.018))"
                      : "rgba(255,255,255,.018)",
                    boxShadow: selected
                      ? "0 18px 50px rgba(255,126,182,.07)"
                      : undefined,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-2xl ${selected ? "text-[#45e8d8]" : "text-white/35"}`}
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-serif text-lg font-semibold text-white/88">
                          {item.t}
                        </h4>
                        <span className="font-mono text-[8px] text-white/30">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#ff7eb6]/60">
                        {item.cl}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </StaggerReveal>
      </div>
    </Section>
  );
}

// ─── IP / Patents Section ───
function PatentsSection() {
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const { play: playSound } = useSound();

  const groups = [
    {
      k: "composition" as const,
      t: "Composition & Material Claims (1–15)",
      c: "#45e8d8",
      count: 15,
    },
    {
      k: "methods" as const,
      t: "Manufacturing Method Claims (16–18)",
      c: "#a485ff",
      count: 3,
    },
    {
      k: "devices" as const,
      t: "Device & System Claims (19–25)",
      c: "#e8c44a",
      count: 7,
    },
  ];

  return (
    <Section
      id="ip"
      eyebrow="Intellectual Property"
      title="25 Claims, Patent Pending"
      subtitle="Expand each category below to read every claim."
    >
      {/* Patent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <TiltCard
          className="relative overflow-hidden"
          style={{
            border: "1px solid var(--bd)",
            background: "var(--gra)",
            padding: "1.5rem",
          }}
          intensity={6}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, #45e8d8, #a485ff)" }}
          />
          <span
            className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 inline-block mb-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#45e8d8",
              border: "1px solid rgba(69,232,216,0.25)",
              background: "rgba(69,232,216,0.06)",
            }}
          >
            USPTO Filed
          </span>
          <h3
            className="text-lg font-semibold leading-[1.35] mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qu)",
            }}
          >
            Multi-Modal Energy Harvesting Composite from Hemp-Derived Carbon
          </h3>
          <div className="flex flex-col gap-1.5">
            {[
              ["Application", "No. 63/934,269"],
              ["Filed", "December 11, 2025"],
              ["Inventor", "Jonathan Peoples"],
              ["Claims", "25"],
              ["Confirm.", "#6305 · Micro Entity"],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-2 text-sm">
                <span
                  className="text-[0.6rem] font-semibold tracking-[0.06em] uppercase min-w-[85px]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--t3)",
                  }}
                >
                  {l}
                </span>
                <span className="font-medium" style={{ color: "var(--qu)" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </TiltCard>

        <TiltCard
          className="relative overflow-hidden"
          style={{
            border: "1px solid var(--bd)",
            background: "var(--gra)",
            padding: "1.5rem",
          }}
          intensity={6}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, #e8c44a, #ff7eb6)" }}
          />
          <span
            className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 inline-block mb-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#e8c44a",
              border: "1px solid rgba(232,196,74,0.25)",
              background: "rgba(232,196,74,0.06)",
            }}
          >
            In Development
          </span>
          <h3
            className="text-lg font-semibold leading-[1.35] mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qu)",
            }}
          >
            Hemp-Derived Carbon Substrates for DNA Data Storage with CRISPR
          </h3>
          <div className="flex flex-col gap-1.5">
            {[
              ["Status", "Provisional in Prep"],
              ["Inventor", "Jonathan Peoples"],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-2 text-sm">
                <span
                  className="text-[0.6rem] font-semibold tracking-[0.06em] uppercase min-w-[85px]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--t3)",
                  }}
                >
                  {l}
                </span>
                <span className="font-medium" style={{ color: "var(--qu)" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-2 mt-8">
        {groups.map(g => (
          <div key={g.k}>
            <motion.button
              className="w-full px-5 py-4 text-left flex justify-between items-center relative overflow-hidden"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                background: openAcc === g.k ? "var(--lat)" : "var(--gra)",
                border: `1px solid ${openAcc === g.k ? "var(--bdh)" : "var(--bd)"}`,
                borderLeft: `3px solid ${g.c}50`,
                color: "var(--qu)",
              }}
              onClick={() => {
                setOpenAcc(openAcc === g.k ? null : g.k);
                playSound("accordion");
              }}
              whileHover={{ background: "var(--lat)" }}
            >
              <span className="flex items-center gap-3">
                {g.t}
                <span
                  className="text-[0.55rem] font-semibold tracking-[0.08em] uppercase px-1.5 py-0.5"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: g.c,
                    border: `1px solid ${g.c}30`,
                    background: `${g.c}08`,
                  }}
                >
                  {g.count}
                </span>
              </span>
              <motion.span
                className="text-sm"
                style={{ color: g.c }}
                animate={{ rotate: openAcc === g.k ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {openAcc === g.k && (
                <motion.div
                  className="flex flex-col gap-1 overflow-hidden"
                  style={{
                    borderLeft: `3px solid ${g.c}50`,
                    borderBottom: "1px solid var(--bd)",
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="p-2 flex flex-col gap-1">
                    {CLAIMS[g.k].map((claim, i) => (
                      <motion.div
                        key={i}
                        className="px-4 py-2.5 text-sm leading-[1.65] relative overflow-hidden group"
                        style={{ color: "var(--t2)", background: "var(--lat)" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        {claim}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: g.c }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── About Section ───
function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="Founder"
      title="Built by an Engineer-Inventor"
      dark
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 mt-8 items-start">
        <div>
          <motion.div
            className="text-3xl font-bold mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--qg)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Jonathan Peoples
          </motion.div>
          <div
            className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase mb-6"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#45e8d8",
            }}
          >
            <TypewriterText text="Founder & Chief Engineer" speed={50} />
          </div>
          {[
            {
              c: "#45e8d8",
              t: "U.S. Navy Veteran · Operation Enduring Freedom",
            },
            { c: "#a485ff", t: "IT & Cybersecurity Specialist · NPower NC" },
            { c: "#e8c44a", t: "CompTIA Security+ Candidate (Current Cohort)" },
            { c: "#ff7eb6", t: "CompTIA A+ · CompTIA Tech+ Certified" },
            { c: "#f0e8d8", t: "14+ Professional Certifications" },
            { c: "#28a89c", t: "Concord, North Carolina" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 mb-2.5 text-sm group cursor-default"
              style={{ color: "var(--t2)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: item.c }}
                whileHover={{ scale: 1.5, boxShadow: `0 0 10px ${item.c}` }}
              />
              <span className="group-hover:text-[var(--qu)] transition-colors duration-200">
                {item.t}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              text: "Tamerian Materials was founded on one conviction: advanced functional materials should begin with the earth, not a petroleum refinery.",
              highlight: true,
            },
            {
              text: "Jonathan Peoples brings U.S. Navy service (Operation Enduring Freedom), IT, and cybersecurity — currently in cohort for CompTIA Security+ alongside materials science research. He applies operational discipline to rational composite design.",
            },
            {
              text: "His research produced patent application No. 63/934,269 — 25 claims with no prior art combining all four technologies, validated across 51 peer-reviewed papers.",
            },
            {
              text: "Every Tamerian composite starts carbon-negative. Hemp sequesters CO₂ during growth; the composite locks it into stable material with net sequestration exceeding 0.5 tons CO₂ per ton produced.",
            },
          ].map((p, i) => (
            <motion.p
              key={i}
              className="text-base leading-[1.9]"
              style={{
                color: p.highlight ? "var(--qu)" : "var(--t2)",
                fontWeight: p.highlight ? 500 : 400,
                fontSize: p.highlight ? "1.15rem" : "1.05rem",
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {p.text}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact / CTA Section ───
function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Connect"
      title="Partnerships & Collaboration"
      subtitle="Universities, national labs, industry, and investors."
      className="text-center"
    >
      <div className="flex flex-col items-center mt-6">
        <motion.a
          href="mailto:aitconsult22@gmail.com"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.08em] uppercase px-10 py-5 relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #45e8d8, #28c8b8)",
            color: "var(--void)",
            boxShadow: "0 4px 20px rgba(69,232,216,0.3)",
          }}
          whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(69,232,216,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Start a Conversation →</span>
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.a>
        <div
          className="mt-6 text-sm flex flex-wrap items-center justify-center gap-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--t3)",
          }}
        >
          <motion.a
            href="mailto:aitconsult22@gmail.com"
            className="font-semibold transition-colors duration-300"
            style={{
              color: "#45e8d8",
              borderBottom: "1px solid rgba(69,232,216,0.3)",
            }}
            whileHover={{ color: "#6ff0e4" }}
          >
            aitconsult22@gmail.com
          </motion.a>
          <span>·</span>
          <motion.a
            href="tel:+12163070174"
            className="font-semibold transition-colors duration-300"
            style={{
              color: "#45e8d8",
              borderBottom: "1px solid rgba(69,232,216,0.3)",
            }}
            whileHover={{ color: "#6ff0e4" }}
          >
            (216) 307-0174
          </motion.a>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-col md:flex-row justify-between items-center px-[7vw] py-8 gap-4"
      style={{ borderTop: "1px solid var(--bd)" }}
    >
      <span
        className="text-[0.6rem] font-medium"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--t3)",
        }}
      >
        © 2026 Tamerian Materials. Patent Pending No. 63/934,269.
      </span>
      <div className="flex gap-6">
        {["Technology", "Patents", "About", "Contact"].map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={e => {
              e.preventDefault();
              const id =
                label === "Technology"
                  ? "tech"
                  : label === "Patents"
                    ? "ip"
                    : label.toLowerCase();
              document
                .querySelector(`#${id}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[0.58rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-300 relative group"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--t3)",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#45e8d8")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}
          >
            {label}
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#45e8d8] group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─── Cinematic Image Divider ───
function ImageDivider({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="relative z-10 w-full h-48 md:h-72 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ opacity: 0.35 }}
        whileInView={{ scale: [1.08, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 2.5 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--void), transparent 25%, transparent 75%, var(--void))",
        }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN HOME COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [modalCard, setModalCard] = useState<number | null>(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Initialize GSAP ScrollTrigger refresh after intro
  useEffect(() => {
    if (introComplete) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [introComplete]);

  return (
    <div className="relative" style={{ background: "var(--void)" }}>
      {/* Cinematic intro */}
      <CinematicIntro onComplete={handleIntroComplete} />

      {/* Background layers */}
      <ParticleCanvas />
      <div className="grain" />
      <MagneticCursor />

      {/* Scroll progress */}
      {introComplete && <ScrollProgress />}

      {/* Navigation */}
      <Navigation visible={introComplete} />
      <SectionIndicator />
      <ScrollToTop />
      <SoundToggle />
      <ResearchProgress enabled={introComplete} />

      {/* Content */}
      <HeroSection />
      <PatentBar />
      <StatsRow />
      <TechSection onCardClick={i => setModalCard(i)} />
      <GlowDivider variant="circuit" color="#45e8d8" />
      <CompositionSection />
      <GlowDivider variant="hex" color="#a485ff" />
      <EnergySection />
      <GlowDivider variant="circuit" color="#e8c44a" />
      <ManufacturingSection />
      <GlowDivider variant="hex" color="#ff7eb6" />
      <QuantumSection />
      <GlowDivider variant="circuit" color="#ff7eb6" />
      <ApplicationsSection />
      <GlowDivider variant="hex" color="#45e8d8" />
      <PatentsSection />
      <AboutSection />
      <ContactSection />
      <Footer />

      {/* Tech Modal */}
      <TechModal
        card={modalCard !== null ? TECH_CARDS[modalCard] : null}
        onClose={() => setModalCard(null)}
      />
    </div>
  );
}
