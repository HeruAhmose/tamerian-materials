/*
 * TiltCard — 3D perspective tilt on mouse hover
 * Creates a premium, tactile feel for interactive cards
 */
import { useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
  glare?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function TiltCard({
  children,
  className = "",
  style,
  intensity = 10,
  glare = true,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -intensity,
      y: (x - 0.5) * intensity,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      onClick={onClick}
      // A div with only a mouse onClick is invisible to keyboard users
      // (WCAG 2.1.1). When this card is clickable, make it a real
      // keyboard-operable control instead of a mouse-only trap.
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? ariaLabel : undefined}
      onKeyDown={
        onClick
          ? e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovering ? 0.08 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.6), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
