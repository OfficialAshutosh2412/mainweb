import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1];

/* ─────────────────────────────────────────────────────────────
   Page Revealer — Persistent overlay that watches route changes.
   Flow: route changes → panels slide IN (cover screen) → 
         200ms hold showing brand text → panels slide OUT (reveal).
   Single instance, no remount jitter.
─────────────────────────────────────────────────────────────── */
const PageRevealer = () => {
  const location = useLocation();
  const [covering, setCovering] = useState(false);
  const [showText, setShowText] = useState(false);
  const prevPath = useRef(location.pathname);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip animation on very first mount
    if (isFirst.current) {
      isFirst.current = false;
      prevPath.current = location.pathname;
      return;
    }
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // 1. Panels slide IN
    setCovering(true);
    setShowText(false);

    // 2. Show brand text while covered
    const t1 = setTimeout(() => setShowText(true), 120);

    // 3. Panels slide OUT after hold
    const t2 = setTimeout(() => {
      setShowText(false);
      setCovering(false);
    }, 700);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex flex-col overflow-hidden">

      {/* ── Top Black Curtain ── */}
      <motion.div
        className="w-full flex-1 bg-[#050505] origin-top flex items-end justify-center pb-4"
        animate={{ scaleY: covering ? 1 : 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <AnimatePresence>
          {showText && (
            <motion.span
              key="top-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-none select-none"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '0 0 35px rgba(59,130,246,0.95), 0 0 70px rgba(59,130,246,0.4)',
              }}
            >
              &lt;Dev
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Bottom Black Curtain ── */}
      <motion.div
        className="w-full flex-1 bg-[#050505] origin-bottom flex items-start justify-center pt-4"
        animate={{ scaleY: covering ? 1 : 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <AnimatePresence>
          {showText && (
            <motion.span
              key="bottom-text"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none select-none"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#3b82f6',
                textShadow: '0 0 35px rgba(59,130,246,0.95), 0 0 70px rgba(59,130,246,0.4)',
              }}
            >
              .io /&gt;
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default PageRevealer;
