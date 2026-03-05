/*
 * MagneticCursor — Premium cursor effect
 * Shows a glowing dot that follows the mouse with smooth lag
 * Creates a "magnetic" feel on the page
 */
import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let animId: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] transition-opacity duration-300"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#45e8d8",
          boxShadow: "0 0 12px rgba(69,232,216,0.6)",
          opacity: visible ? 1 : 0,
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] transition-opacity duration-300"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(69,232,216,0.25)",
          opacity: visible ? 1 : 0,
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
