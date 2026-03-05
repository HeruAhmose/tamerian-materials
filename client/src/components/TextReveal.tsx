/*
 * TextReveal — Character-level text reveal animation
 * Each character animates in with stagger for cinematic effect
 * Use `force` prop to bypass IntersectionObserver (e.g., for hero section)
 * Use `charStyle` to apply styles to individual characters (e.g., gradient text)
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState, useEffect, type CSSProperties, type ElementType } from "react";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  charStyle?: CSSProperties;
  stagger?: number;
  delay?: number;
  force?: boolean;
}

export default function TextReveal({ text, as: Tag = "span", className = "", style, charStyle, stagger = 0.02, delay = 0, force = false }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [forceVisible, setForceVisible] = useState(false);

  // For force mode, trigger after the specified delay
  useEffect(() => {
    if (!force) return;
    const timer = setTimeout(() => setForceVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [force, delay]);

  const shouldAnimate = force ? forceVisible : inView;

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`inline-block ${className}`} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => {
            const globalIndex = words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + ci;
            return (
              <motion.span
                key={`${wi}-${ci}`}
                className="inline-block"
                style={charStyle}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.4,
                  delay: force ? globalIndex * stagger : delay + globalIndex * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
