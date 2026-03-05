import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  count?: number;
  color?: string;
  type?: "hex" | "ring" | "dot";
}

export default function FloatingElements({ count = 5, color = "#45e8d8", type = "hex" }: Props) {
  const elements = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 8,
      dur: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      drift: Math.random() * 40 + 20,
      rot: Math.random() * 360,
      opacity: Math.random() * 0.06 + 0.02,
    })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
          }}
          animate={{
            y: [-el.drift, el.drift, -el.drift],
            x: [-el.drift * 0.3, el.drift * 0.3, -el.drift * 0.3],
            rotate: [el.rot, el.rot + 180, el.rot + 360],
            opacity: [el.opacity, el.opacity * 1.5, el.opacity],
          }}
          transition={{
            duration: el.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
        >
          {type === "hex" && (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.5" opacity="0.6">
              <path d="M12 2L22 7.5v9L12 22 2 16.5v-9z" />
            </svg>
          )}
          {type === "ring" && (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="5" opacity="0.3" />
            </svg>
          )}
          {type === "dot" && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}40, transparent)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
