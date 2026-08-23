import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "tamerian-research-progress-v1";

const MISSIONS = [
  {
    id: "tech",
    label: "Core Innovation",
    detail: "Four Technologies, One Material",
    color: "#45e8d8",
  },
  {
    id: "comp",
    label: "Composite Architecture",
    detail: "Engineered at Every Scale",
    color: "#a485ff",
  },
  {
    id: "energy",
    label: "Energy Harvesting",
    detail: "Three Conversion Modes",
    color: "#e8c44a",
  },
  {
    id: "mfg",
    label: "Manufacturing",
    detail: "Seven Steps to Finished Composite",
    color: "#45e8d8",
  },
  {
    id: "quantum",
    label: "Quantum Sensing",
    detail: "Room-Temperature Quantum Coherence",
    color: "#ff7eb6",
  },
  {
    id: "apps",
    label: "Applications",
    detail: "From Infrastructure to Wearables",
    color: "#45e8d8",
  },
  {
    id: "ip",
    label: "Patent Intelligence",
    detail: "25 Claims, Patent Pending",
    color: "#e8c44a",
  },
] as const;

const RANKS = [
  "Research Initiate",
  "Composite Analyst",
  "Quantum Materials Specialist",
  "Tamerian Systems Architect",
] as const;

export default function ResearchProgress({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>(MISSIONS[0].id);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setCompleted(
          parsed.filter((id): id is string =>
            MISSIONS.some(mission => mission.id === id),
          ),
        );
      }
    } catch {
      // Progress persistence is optional. The experience still works without it.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // Ignore storage failures in privacy-restricted browsers.
    }
  }, [completed]);

  useEffect(() => {
    if (!enabled) return;

    const observed = MISSIONS.map(mission => document.getElementById(mission.id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const id = visible.target.id;
        setActiveId(id);
        setCompleted(previous =>
          previous.includes(id) ? previous : [...previous, id],
        );
      },
      { threshold: [0.35, 0.55] },
    );

    observed.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);

  const xp = completed.length * 125;
  const level = Math.min(RANKS.length, Math.floor(xp / 250) + 1);
  const progress = Math.round((completed.length / MISSIONS.length) * 100);
  const currentMission = useMemo(
    () => MISSIONS.find(mission => mission.id === activeId) ?? MISSIONS[0],
    [activeId],
  );

  if (!enabled) return null;

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    setCompleted([]);
    setActiveId(MISSIONS[0].id);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="fixed z-50 left-4 right-4 bottom-20 sm:left-20 sm:right-auto sm:bottom-6 sm:w-[340px] pointer-events-none">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.aside
            key="research-panel"
            className="pointer-events-auto overflow-hidden"
            style={{
              background: "rgba(7,8,14,0.94)",
              border: "1px solid rgba(69,232,216,0.22)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            aria-label="Tamerian research progress"
          >
            <div className="p-4 border-b" style={{ borderColor: "var(--bd)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#45e8d8" }}
                  >
                    Research Console · Level {level}
                  </div>
                  <div
                    className="text-lg font-semibold mt-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: "var(--qg)" }}
                  >
                    {RANKS[level - 1]}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-lg leading-none px-2 py-1"
                  style={{ color: "var(--t3)" }}
                  aria-label="Collapse research console"
                >
                  ×
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-[0.58rem] font-semibold tracking-[0.08em] uppercase">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--t2)" }}>
                  {completed.length}/{MISSIONS.length} missions · {xp} XP
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: currentMission.color }}>
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 mt-2 overflow-hidden" style={{ background: "var(--lat)" }}>
                <motion.div
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, #45e8d8, #a485ff, #ff7eb6)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <div className="max-h-[46vh] overflow-y-auto p-2">
              {MISSIONS.map((mission, index) => {
                const done = completed.includes(mission.id);
                const active = mission.id === activeId;
                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => navigate(mission.id)}
                    className="w-full text-left p-3 flex items-center gap-3 transition-colors"
                    style={{
                      background: active ? `${mission.color}0c` : "transparent",
                      borderLeft: `2px solid ${active ? mission.color : "transparent"}`,
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[0.6rem] font-bold"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: done ? "var(--void)" : mission.color,
                        background: done ? mission.color : `${mission.color}12`,
                        border: `1px solid ${mission.color}45`,
                      }}
                    >
                      {done ? "✓" : String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-[0.62rem] font-semibold tracking-[0.08em] uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: mission.color }}
                      >
                        {mission.label}
                      </span>
                      <span className="block text-xs mt-0.5 truncate" style={{ color: "var(--t2)" }}>
                        {mission.detail}
                      </span>
                    </span>
                    <span
                      className="text-[0.52rem] font-semibold tracking-[0.06em] uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: done ? mission.color : "var(--t3)" }}
                    >
                      {done ? "+125" : "OPEN"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-3 flex items-center justify-between border-t" style={{ borderColor: "var(--bd)" }}>
              <span className="text-[0.55rem]" style={{ color: "var(--t3)" }}>
                Progress is stored only in this browser.
              </span>
              <button
                type="button"
                onClick={reset}
                className="text-[0.55rem] font-semibold tracking-[0.08em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--t3)" }}
              >
                Reset
              </button>
            </div>
          </motion.aside>
        ) : (
          <motion.button
            key="research-pill"
            type="button"
            onClick={() => setOpen(true)}
            className="pointer-events-auto w-full sm:w-auto min-w-[240px] px-4 py-3 flex items-center gap-3"
            style={{
              background: "rgba(7,8,14,0.9)",
              border: "1px solid rgba(69,232,216,0.2)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ y: -2, borderColor: "rgba(69,232,216,0.45)" }}
            aria-label="Open Tamerian research progress"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[0.62rem] font-bold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--void)",
                background: currentMission.color,
                boxShadow: `0 0 18px ${currentMission.color}30`,
              }}
            >
              L{level}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span
                className="block text-[0.58rem] font-semibold tracking-[0.12em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#45e8d8" }}
              >
                Research Progress
              </span>
              <span className="block text-xs truncate" style={{ color: "var(--t2)" }}>
                {completed.length}/{MISSIONS.length} missions · {xp} XP
              </span>
            </span>
            <span
              className="text-[0.58rem] font-semibold"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: currentMission.color }}
            >
              {progress}%
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
