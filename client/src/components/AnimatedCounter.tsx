/*
 * AnimatedCounter — Animated number counter with glow effect
 * Numbers roll up with easing when scrolled into view
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  trigger: boolean;
  color?: string;
  className?: string;
}

export default function AnimatedCounter({ end, duration = 1500, prefix = "", suffix = "", trigger, color = "var(--qg)", className = "" }: Props) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end, duration]);

  return (
    <motion.span
      className={`tabular-nums ${className}`}
      style={{ color }}
      animate={trigger ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
