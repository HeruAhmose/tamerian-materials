import { motion, AnimatePresence } from "framer-motion";
import type { TECH_CARDS } from "@/lib/data";

type TechCard = (typeof TECH_CARDS)[number];

interface Props {
  card: TechCard | null;
  onClose: () => void;
}

export default function TechModal({ card, onClose }: Props) {
  if (!card) return null;

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(3,3,8,0.94)", backdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[860px] max-h-[85vh] overflow-y-auto"
            style={{
              background: "var(--gra)",
              border: "1px solid var(--bdh)",
              padding: "2.5rem",
            }}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-2xl border-0 bg-transparent transition-colors duration-200"
              style={{ color: "var(--t2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--qu)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t2)")}
            >
              ✕
            </button>

            {/* Badges */}
            <div className="flex gap-2 mb-2">
              <span
                className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 border inline-block"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: card.color,
                  borderColor: card.color + "40",
                  background: card.color + "0c",
                }}
              >
                {card.claim}
              </span>
              <span
                className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 border inline-block"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--t3)",
                  borderColor: "var(--bd)",
                }}
              >
                {card.vol}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--qg)" }}
            >
              {card.num}. {card.title}
            </h2>

            {/* Overview */}
            <p className="text-base leading-[1.85] mb-6" style={{ color: "var(--t2)" }}>
              {card.overview}
            </p>

            {/* Specs */}
            <div
              className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#45e8d8" }}
            >
              ── Technical Specifications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-6">
              {card.specs.map(([key, val], i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-3 py-2"
                  style={{ background: "var(--lat)" }}
                >
                  <span
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.05em]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--t3)" }}
                  >
                    {key}
                  </span>
                  <span
                    className="text-[0.78rem] font-semibold"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--qu)" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Claims */}
            <div
              className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#e8c44a" }}
            >
              ── Patent Claims
            </div>
            <div className="flex flex-col gap-1 mb-6">
              {card.claims.map((c, i) => (
                <div
                  key={i}
                  className="px-3 py-2 text-sm leading-[1.65]"
                  style={{
                    borderLeft: "3px solid rgba(232,196,74,0.25)",
                    color: "var(--t2)",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>

            {/* Insight */}
            <div
              className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a485ff" }}
            >
              ── Key Insight
            </div>
            <div
              className="text-base leading-[1.85] p-4"
              style={{
                color: "var(--t1)",
                background: "rgba(164,133,255,0.05)",
                borderLeft: "3px solid rgba(164,133,255,0.25)",
              }}
            >
              {card.insight}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
