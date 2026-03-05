import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[999] pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #45e8d8, #a485ff, #e8c44a)",
        boxShadow: "0 0 14px rgba(69,232,216,0.6)",
      }}
    />
  );
}
