/*
 * SectionIndicator — Floating side dots showing current section
 * Appears on the right edge of the screen on desktop
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "tech", label: "Technology" },
  { id: "comp", label: "Material" },
  { id: "energy", label: "Energy" },
  { id: "mfg", label: "Manufacturing" },
  { id: "quantum", label: "Quantum" },
  { id: "apps", label: "Applications" },
  { id: "ip", label: "Patents" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicator() {
  const [active, setActive] = useState("hero");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 300) {
          current = s.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-end"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : 20 }}
      transition={{ duration: 0.4 }}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            className="group flex items-center gap-2 bg-transparent border-0 p-0"
            onClick={() => scrollTo(s.id)}
            title={s.label}
          >
            <span
              className="text-[0.55rem] font-semibold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: isActive ? "#45e8d8" : "var(--t3)" }}
            >
              {s.label}
            </span>
            <motion.div
              className="rounded-full"
              style={{
                background: isActive ? "#45e8d8" : "var(--lat)",
                boxShadow: isActive ? "0 0 8px rgba(69,232,216,0.5)" : "none",
              }}
              animate={{
                width: isActive ? 12 : 6,
                height: isActive ? 6 : 6,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        );
      })}
    </motion.div>
  );
}
