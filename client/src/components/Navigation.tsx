import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/contexts/SoundContext";

/* ═══════════════════════════════════════════════════════════════
 * FUTURISTIC NAVIGATION — Sci-fi hamburger menu with cinematic
 * fullscreen overlay, particle grid, staggered reveals, HUD frame
 * ═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { href: "#hero", label: "Origin", id: "hero", desc: "Where it begins" },
  { href: "#tech", label: "Technology", id: "tech", desc: "Four core systems" },
  { href: "#comp", label: "Material", id: "comp", desc: "Composite architecture" },
  { href: "#energy", label: "Energy", id: "energy", desc: "Multi-modal harvesting" },
  { href: "#mfg", label: "Manufacturing", id: "mfg", desc: "7-step fabrication" },
  { href: "#quantum", label: "Quantum", id: "quantum", desc: "Room-temp sensing" },
  { href: "#apps", label: "Applications", id: "apps", desc: "Industry verticals" },
  { href: "#ip", label: "Patents", id: "ip", desc: "25 claims filed" },
  { href: "#about", label: "About", id: "about", desc: "The inventor" },
  { href: "#contact", label: "Contact", id: "contact", desc: "Start a conversation" },
];

/* Animated grid background for the overlay */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.04 }}>
      {/* Horizontal lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: `${(i + 1) * 5}%`,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, #45e8d8 20%, #45e8d8 80%, transparent 100%)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i + 1) * 8}%`,
            width: "1px",
            background: "linear-gradient(180deg, transparent 0%, #a485ff 30%, #a485ff 70%, transparent 100%)",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.03, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* HUD corner frame decorations */
function HudCorners() {
  const cornerStyle = "absolute w-12 h-12";
  const lineColor = "rgba(69,232,216,0.15)";
  return (
    <>
      {/* Top-left */}
      <div className={`${cornerStyle} top-6 left-6`}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: lineColor }} />
        <div className="absolute top-0 left-0 w-[1px] h-full" style={{ background: lineColor }} />
        <div className="absolute top-0 left-0 w-2 h-2 rounded-full" style={{ background: "rgba(69,232,216,0.3)" }} />
      </div>
      {/* Top-right */}
      <div className={`${cornerStyle} top-6 right-6`}>
        <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: lineColor }} />
        <div className="absolute top-0 right-0 w-[1px] h-full" style={{ background: lineColor }} />
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ background: "rgba(69,232,216,0.3)" }} />
      </div>
      {/* Bottom-left */}
      <div className={`${cornerStyle} bottom-6 left-6`}>
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: lineColor }} />
        <div className="absolute bottom-0 left-0 w-[1px] h-full" style={{ background: lineColor }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full" style={{ background: "rgba(164,133,255,0.3)" }} />
      </div>
      {/* Bottom-right */}
      <div className={`${cornerStyle} bottom-6 right-6`}>
        <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: lineColor }} />
        <div className="absolute bottom-0 right-0 w-[1px] h-full" style={{ background: lineColor }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full" style={{ background: "rgba(164,133,255,0.3)" }} />
      </div>
    </>
  );
}

/* Scanning line effect */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px]"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(69,232,216,0.15), rgba(164,133,255,0.1), transparent)",
        boxShadow: "0 0 20px rgba(69,232,216,0.1)",
      }}
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function Navigation({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { play } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 260) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ESC key to close menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        play("click");
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen, play]);

  const scrollTo = useCallback((href: string) => {
    play("click");
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, [play]);

  const toggleMenu = useCallback(() => {
    play("click");
    setMenuOpen(prev => !prev);
  }, [play]);

  if (!visible) return null;

  return (
    <>
      {/* ─── TOP BAR ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: scrolled ? "0.7rem 4vw" : "1rem 4vw",
          background: scrolled ? "rgba(3,3,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(240,232,216,0.06)" : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          className="flex items-center gap-3 group"
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
            <path
              d="M16 2L30 10v12L16 30 2 22V10z"
              stroke="rgba(69,232,216,0.5)"
              strokeWidth="0.8"
              className="transition-all duration-300 group-hover:stroke-[#45e8d8]"
            />
            <circle cx="16" cy="16" r="3" fill="rgba(69,232,216,0.6)" className="transition-all duration-300 group-hover:fill-[#45e8d8]" />
          </svg>
          <span
            className="text-lg font-semibold tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f0e8d8" }}
          >
            Tamerian
          </span>
        </a>

        {/* Right side: active section label + hamburger */}
        <div className="flex items-center gap-5">
          {/* Current section indicator (desktop) */}
          <motion.span
            className="hidden sm:block text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(69,232,216,0.4)" }}
            key={activeSection}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection ? NAV_LINKS.find(l => l.id === activeSection)?.label || "" : ""}
          </motion.span>

          {/* ─── HAMBURGER BUTTON ─── */}
          <button
            onClick={toggleMenu}
            className="relative flex items-center justify-center w-12 h-12 bg-transparent border-0 group/burger"
            aria-label="Menu"
            onMouseEnter={() => play("hover")}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(69,232,216,0.12)" }}
              animate={menuOpen
                ? { borderColor: "rgba(69,232,216,0.3)", scale: 1.05 }
                : { borderColor: "rgba(69,232,216,0.12)", scale: 1 }
              }
              whileHover={{ borderColor: "rgba(69,232,216,0.3)", scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />
            {/* Pulse ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(69,232,216,0.08)" }}
              animate={menuOpen ? { scale: [1, 1.4], opacity: [0.3, 0] } : { scale: 1, opacity: 0 }}
              transition={menuOpen ? { duration: 1.5, repeat: Infinity, ease: "easeOut" } : {}}
            />

            {/* Three lines → X morphing */}
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <motion.span
                className="block h-[1.5px] origin-center"
                style={{ background: "#45e8d8" }}
                animate={menuOpen
                  ? { rotate: 45, y: 7.5, width: "100%", background: "#45e8d8" }
                  : { rotate: 0, y: 0, width: "100%", background: "#f0e8d8" }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block h-[1.5px] origin-center"
                style={{ background: "#a485ff" }}
                animate={menuOpen
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 0.7, opacity: 0.6 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="block h-[1.5px] origin-center"
                style={{ background: "#45e8d8" }}
                animate={menuOpen
                  ? { rotate: -45, y: -7.5, width: "100%", background: "#45e8d8" }
                  : { rotate: 0, y: 0, width: "60%", background: "#f0e8d8" }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Glow dot */}
            <motion.div
              className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style={{ background: "#45e8d8" }}
              animate={menuOpen
                ? { opacity: 1, scale: [1, 1.5, 1] }
                : { opacity: 0.5, scale: 1 }
              }
              transition={menuOpen ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ─── FULLSCREEN OVERLAY MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-hidden"
            style={{ background: "rgba(3,3,8,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Backdrop blur layer */}
            <div className="absolute inset-0" style={{ backdropFilter: "blur(40px)" }} />

            {/* Animated grid */}
            <GridBackground />

            {/* Scanning line */}
            <ScanLine />

            {/* HUD corners */}
            <HudCorners />

            {/* ─── MENU CONTENT ─── */}
            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center px-8 lg:px-20 gap-8 lg:gap-20 pt-20">

              {/* Left column: Navigation links */}
              <div className="flex flex-col gap-1 lg:gap-2 w-full lg:w-auto">
                {/* Section label */}
                <motion.div
                  className="mb-4 lg:mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span
                    className="text-[9px] tracking-[0.5em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(69,232,216,0.3)" }}
                  >
                    Navigation
                  </span>
                  <div className="mt-2 w-12 h-[1px]" style={{ background: "rgba(69,232,216,0.2)" }} />
                </motion.div>

                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.id;
                  const isHovered = hoveredIndex === i;

                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      onMouseEnter={() => { setHoveredIndex(i); play("hover"); }}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative flex items-center gap-4 lg:gap-6 py-2 lg:py-3 group/link cursor-pointer"
                      style={{ textDecoration: "none" }}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Index number */}
                      <span
                        className="text-[10px] w-6 text-right tabular-nums"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: isActive ? "#45e8d8" : isHovered ? "rgba(69,232,216,0.6)" : "rgba(240,232,216,0.15)",
                          transition: "color 0.3s",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Vertical separator line */}
                      <div
                        className="w-[1px] h-5 lg:h-6"
                        style={{
                          background: isActive ? "#45e8d8" : isHovered ? "rgba(69,232,216,0.4)" : "rgba(240,232,216,0.06)",
                          transition: "background 0.3s",
                        }}
                      />

                      {/* Link text */}
                      <div className="flex flex-col">
                        <span
                          className="text-xl lg:text-3xl font-semibold tracking-wide uppercase"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: isActive ? "#45e8d8" : isHovered ? "#f0e8d8" : "rgba(240,232,216,0.4)",
                            transition: "color 0.3s",
                          }}
                        >
                          {link.label}
                        </span>
                        {/* Description — shows on hover */}
                        <motion.span
                          className="text-[10px] lg:text-xs tracking-wider"
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            color: isActive ? "rgba(69,232,216,0.5)" : "rgba(164,133,255,0.4)",
                          }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={isHovered || isActive ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.desc}
                        </motion.span>
                      </div>

                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{ background: "#45e8d8", boxShadow: "0 0 8px rgba(69,232,216,0.5)" }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      {/* Hover underline */}
                      <motion.div
                        className="absolute bottom-0 left-10 lg:left-14 right-0 h-[1px]"
                        style={{ background: "rgba(69,232,216,0.1)" }}
                        initial={{ scaleX: 0 }}
                        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        layout
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Right column: Status panel (desktop only) */}
              <motion.div
                className="hidden lg:flex flex-col gap-6 w-72"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Status block */}
                <div
                  className="p-5"
                  style={{
                    border: "1px solid rgba(69,232,216,0.08)",
                    background: "rgba(69,232,216,0.02)",
                  }}
                >
                  <span
                    className="text-[9px] tracking-[0.4em] uppercase block mb-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(69,232,216,0.3)" }}
                  >
                    System Status
                  </span>

                  {[
                    { label: "Patent", value: "Filed", color: "#45e8d8" },
                    { label: "Claims", value: "25", color: "#a485ff" },
                    { label: "App No.", value: "63/934,269", color: "#e8c44a" },
                    { label: "Inventor", value: "J. Peoples", color: "#ff7eb6" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between items-center py-2"
                      style={{ borderBottom: "1px solid rgba(240,232,216,0.04)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    >
                      <span
                        className="text-[10px] tracking-wider uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(240,232,216,0.25)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-semibold tracking-wider"
                        style={{ fontFamily: "'Source Sans 3', sans-serif", color: item.color }}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Hexagonal decoration */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <svg viewBox="0 0 80 80" className="w-16 h-16" style={{ opacity: 0.15 }}>
                    <path d="M40 4L72 22v28L40 76 8 58V22z" fill="none" stroke="#45e8d8" strokeWidth="0.5" />
                    <path d="M40 18L58 28v16L40 62 22 52V28z" fill="none" stroke="#a485ff" strokeWidth="0.3" />
                    <circle cx="40" cy="40" r="3" fill="#45e8d8" opacity="0.4" />
                  </svg>
                </motion.div>

                {/* Bottom tagline */}
                <motion.p
                  className="text-center text-[10px] tracking-[0.2em]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(240,232,216,0.12)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  WHERE CARBON MEETS CRYSTAL
                </motion.p>
              </motion.div>
            </div>

            {/* Bottom bar with keyboard hint */}
            <motion.div
              className="absolute bottom-6 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(240,232,216,0.12)" }}
              >
                Click to navigate · ESC to close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
