import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Sparkles, Hexagon, Triangle, Circle, Box, Cpu, Atom, Globe } from 'lucide-react';

const ParallaxBackground = () => {
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

  useEffect(() => {
    // Skip mouse tracking entirely on touch devices or reduced motion
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
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

      {/* ── Deep Parallax Layer (Hardware Accelerated - Desktop Only) ── */}
      <motion.div
        style={{
          x: mouseDeepX,
          y: mouseDeepY,
          translateY: scrollParallaxDeep,
          willChange: 'transform',
        }}
        className="hidden md:block absolute inset-0 gpu-layer"
      >
        {deepShapes.map((item, idx) => (
          <div
            key={`deep-${idx}`}
            className="absolute text-ambient-blue/15"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animation: `float-rotate-cw ${item.rotateSpeed}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              willChange: 'transform',
            }}
          >
            <item.Icon size={item.size} />
          </div>
        ))}
      </motion.div>

      {/* ── Mid Parallax Layer (Hardware Accelerated - Desktop Only) ── */}
      <motion.div
        style={{
          x: mouseMidX,
          y: mouseMidY,
          translateY: scrollParallaxMid,
          willChange: 'transform',
        }}
        className="hidden md:block absolute inset-0 gpu-layer"
      >
        {midShapes.map((item, idx) => (
          <div
            key={`mid-${idx}`}
            className="absolute text-ambient-blue/20"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animation: `float-rotate-ccw ${item.rotateSpeed}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              willChange: 'transform',
            }}
          >
            <item.Icon size={item.size} />
          </div>
        ))}
      </motion.div>

      {/* ── Foreground Floating Micro Dust / Particles (Desktop Only) ── */}
      <motion.div
        style={{
          x: mouseNearX,
          y: mouseNearY,
          translateY: scrollParallaxFast,
          willChange: 'transform',
        }}
        className="hidden md:block absolute inset-0 gpu-layer"
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
