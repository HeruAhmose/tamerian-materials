/*
 * TypewriterText — Typewriter effect for monospace text
 * Characters appear one by one with a blinking cursor
 */
import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  color?: string;
}

export default function TypewriterText({ text, speed = 40, delay = 0, className = "", color = "#45e8d8" }: Props) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!inView || started) return;
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, started, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        // Keep cursor blinking for a bit then hide
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  useEffect(() => {
    if (!started) return;
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, [started]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontFamily: "'JetBrains Mono', monospace", color }}
    >
      {displayed}
      <span style={{ opacity: showCursor && started ? 1 : 0, transition: "opacity 0.1s" }}>▌</span>
    </span>
  );
}
