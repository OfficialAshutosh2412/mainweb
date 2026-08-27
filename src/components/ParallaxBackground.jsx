import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Sparkles, Hexagon, Triangle, Circle, Box, Cpu, Atom, Globe } from 'lucide-react';

const ParallaxBackground = () => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Scroll parallax
  const { scrollY } = useScroll();
  const scrollParallaxDeep = useTransform(scrollY, [0, 3000], [0, -400]);
  const scrollParallaxMid = useTransform(scrollY, [0, 3000], [0, -250]);
  const scrollParallaxFast = useTransform(scrollY, [0, 3000], [0, -600]);

  // Transform mouse values into multi-layer parallax shifts
  const mouseDeepX = useTransform(smoothMouseX, [-600, 600], [-30, 30]);
  const mouseDeepY = useTransform(smoothMouseY, [-400, 400], [-30, 30]);

  const mouseMidX = useTransform(smoothMouseX, [-600, 600], [-60, 60]);
  const mouseMidY = useTransform(smoothMouseY, [-400, 400], [-60, 60]);

  const mouseNearX = useTransform(smoothMouseX, [-600, 600], [-100, 100]);
  const mouseNearY = useTransform(smoothMouseY, [-400, 400], [-100, 100]);

  // Spotlight position
  const spotlightX = useTransform(smoothMouseX, (val) => `${val + windowSize.width / 2}px`);
  const spotlightY = useTransform(smoothMouseY, (val) => `${val + windowSize.height / 2}px`);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Floating 3D Geometric shapes
  const deepShapes = [
    { Icon: Hexagon, top: '15%', left: '8%', size: 48, delay: 0, rotateSpeed: 25 },
    { Icon: Box, top: '45%', right: '10%', size: 56, delay: 2, rotateSpeed: 30 },
    { Icon: Triangle, top: '75%', left: '12%', size: 40, delay: 1, rotateSpeed: 20 },
    { Icon: Atom, top: '85%', right: '15%', size: 64, delay: 3, rotateSpeed: 35 },
  ];

  const midShapes = [
    { Icon: Sparkles, top: '25%', right: '18%', size: 36, delay: 1.5, rotateSpeed: 18 },
    { Icon: Globe, top: '60%', left: '20%', size: 44, delay: 2.5, rotateSpeed: 22 },
    { Icon: Cpu, top: '35%', left: '5%', size: 38, delay: 0.5, rotateSpeed: 28 },
    { Icon: Circle, top: '90%', left: '40%', size: 30, delay: 4, rotateSpeed: 15 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ── Background Cyber Grid Plane with Perspective ── */}
      <div 
        className="absolute inset-0 cyber-grid opacity-[0.14] perspective-1000"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* ── Interactive Cursor Spotlight Bloom ── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 blur-[130px]"
        style={{
          left: spotlightX,
          top: spotlightY,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* ── Deep Parallax Layer ── */}
      <motion.div
        style={{
          x: mouseDeepX,
          y: mouseDeepY,
          translateY: scrollParallaxDeep,
        }}
        className="absolute inset-0"
      >
        {deepShapes.map((item, idx) => (
          <motion.div
            key={`deep-${idx}`}
            className="absolute text-ambient-blue/15"
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: item.rotateSpeed,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Mid Parallax Layer ── */}
      <motion.div
        style={{
          x: mouseMidX,
          y: mouseMidY,
          translateY: scrollParallaxMid,
        }}
        className="absolute inset-0"
      >
        {midShapes.map((item, idx) => (
          <motion.div
            key={`mid-${idx}`}
            className="absolute text-ambient-blue/20"
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{
              y: [0, -35, 0],
              rotate: [0, -360],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: item.rotateSpeed,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Foreground Floating Micro Dust / Particles ── */}
      <motion.div
        style={{
          x: mouseNearX,
          y: mouseNearY,
          translateY: scrollParallaxFast,
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-ambient-blue/40 blur-[1px]" />
        <div className="absolute top-[50%] right-[25%] w-2 h-2 rounded-full bg-purple-400/40 blur-[1px]" />
        <div className="absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-ambient-blue/50 blur-[0.5px]" />
        <div className="absolute top-[85%] left-[20%] w-2 h-2 rounded-full bg-cyan-400/30 blur-[1px]" />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
