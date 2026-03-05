import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center border-0"
          style={{
            background: "rgba(69,232,216,0.1)",
            border: "1px solid rgba(69,232,216,0.25)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ background: "rgba(69,232,216,0.2)", y: -2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#45e8d8" strokeWidth="2">
            <path d="M10 16V4M4 10l6-6 6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
