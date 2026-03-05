/*
 * GlowDivider — Animated glowing line between sections
 * Creates a cinematic energy circuit feel
 */
import { motion } from "framer-motion";

interface Props {
  color?: string;
  variant?: "line" | "hex" | "circuit";
}

export default function GlowDivider({ color = "#45e8d8", variant = "line" }: Props) {
  if (variant === "hex") {
    return (
      <div className="relative z-10 flex items-center justify-center py-12">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
          <svg viewBox="0 0 40 40" className="w-6 h-6">
            <path
              d="M20 4L36 12v16L20 36 4 28V12z"
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle cx="20" cy="20" r="2" fill={color} opacity="0.6" />
          </svg>
          <div className="w-24 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
        </motion.div>
      </div>
    );
  }

  if (variant === "circuit") {
    return (
      <div className="relative z-10 flex items-center justify-center py-8 overflow-hidden">
        <motion.div
          className="w-full max-w-3xl h-[1px] relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${color}20, transparent)` }} />
          <motion.div
            className="absolute top-0 h-full w-20"
            style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Circuit nodes */}
          {[20, 40, 60, 80].map((pct) => (
            <div
              key={pct}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
              style={{ left: `${pct}%`, background: color, opacity: 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex items-center justify-center py-6">
      <motion.div
        className="w-full max-w-xl h-[1px]"
        style={{ background: `linear-gradient(to right, transparent, ${color}30, transparent)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}
