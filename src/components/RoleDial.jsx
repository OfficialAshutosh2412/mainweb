import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Code2, ShieldCheck, Layers, Globe, Cpu, Atom, FileCode, Sparkles, Radio, Database, Wrench 
} from "lucide-react";

const ROLES = [
  { 
    id: "fullstack", 
    label: "FULLSTACK DEV",   
    sub: "End-to-End Web & Cloud Systems",             
    color: "#1d4ed8",
    icons: [Layers, Globe, Cpu]
  },
  { 
    id: "backend",   
    label: "BACKEND DEV",     
    sub: "Scalable RESTful APIs & Microservices",     
    color: "#1d4ed8",
    icons: [Terminal, Code2, ShieldCheck]
  },
  { 
    id: "frontend",  
    label: "FRONTEND DEV",    
    sub: "Interactive React.js & Modern UIs",          
    color: "#1d4ed8",
    icons: [Atom, FileCode, Sparkles]
  },
  { 
    id: "api",       
    label: "API ARCHITECT",   
    sub: "Secure JWT Auth & SignalR Services",        
    color: "#1d4ed8",
    icons: [Globe, ShieldCheck, Radio]
  },
  { 
    id: "database",  
    label: "DATABASE DEV",    
    sub: "SQL Server & Entity Framework Core",        
    color: "#1d4ed8",
    icons: [Database, Layers, Wrench]
  },
];

const DWELL_MS = 3400;

/* ─────────────────────────────────────────────────────────────
   Realistic Water Wave Typography Component (Half-Height Water Level)
─────────────────────────────────────────────────────────────── */
const generateRealWavePath = (offset, amplitude = 14, frequency = 0.012, yLevel = 126) => {
  let path = `M 0 ${yLevel}`;
  for (let x = 0; x <= 1200; x += 8) {
    const y = yLevel + Math.sin((x + offset) * frequency) * amplitude + Math.cos((x - offset * 0.5) * 0.02) * (amplitude * 0.3);
    path += ` L ${x} ${y}`;
  }
  path += ` L 1200 300 L 0 300 Z`;
  return path;
};

const LiquidText = ({ role }) => {
  const containerRef = useRef(null);
  const frontPathRef = useRef(null);
  const backPathRef = useRef(null);
  const crestPathRef = useRef(null);

  // High-performance direct DOM wave motion loop (0 React re-renders, desktop only)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    let start;
    let isVisible = true;
    let animId;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      } else if (isVisible && !animId) {
        animId = requestAnimationFrame(step);
      }
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const step = (timestamp) => {
      if (!isVisible) return;
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const offset = progress * 0.14;

      const fWave = generateRealWavePath(offset, 16, 0.012, 126);
      const bWave = generateRealWavePath(-offset * 0.75 + 100, 12, 0.016, 120);

      if (frontPathRef.current) frontPathRef.current.setAttribute('d', fWave);
      if (crestPathRef.current) crestPathRef.current.setAttribute('d', fWave);
      if (backPathRef.current) backPathRef.current.setAttribute('d', bWave);

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [role.id]);

  const Icon0 = role.icons[0] || Sparkles;
  const Icon1 = role.icons[1] || Code2;
  const Icon2 = role.icons[2] || Globe;

  const maskId = `real-water-mask-${role.id}`;
  const gradId = `water-grad-${role.id}`;

  const initialFrontWave = generateRealWavePath(0, 16, 0.012, 126);
  const initialBackWave  = generateRealWavePath(100, 12, 0.016, 120);

  const fontSize = role.label.length > 13 ? "80px" : "100px";

  return (
    <div ref={containerRef} className="relative w-full max-w-[1150px] mx-auto flex flex-col items-center justify-center select-none py-3 sm:py-6 px-2 overflow-visible">
      
      {/* Dynamic Ambient Color Bloom (Desktop Only for GPU performance) */}
      <motion.div
        key={`bloom-${role.id}`}
        className="hidden md:block absolute inset-0 m-auto w-full max-w-[800px] h-[300px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${role.color}45 0%, ${role.color}15 45%, transparent 75%)`,
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
      />

      {/* ── Mobile View: High-contrast, large, bold crisp typography (Zero lag & high visibility) ── */}
      <div className="md:hidden flex flex-col items-center justify-center py-4 px-2 text-center w-full z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ambient-blue/15 border border-ambient-blue/30 text-ambient-blue text-xs font-mono font-bold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SPECIALIZATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-ambient-blue font-bold mr-1">&lt;</span>
          {role.label}
          <span className="text-ambient-blue font-bold ml-1">/&gt;</span>
        </h2>
      </div>

      {/* ── Desktop View Floating Tech Icons (Desktop Only) ── */}
      {/* Icon 0: Top-Left Floating */}
      <motion.div
        key={`icon-tl-${role.id}`}
        initial={{ scale: 0, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: [0, -8, 0], opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          scale: { type: "spring", stiffness: 220, damping: 18, delay: 0.1 },
          y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden md:block absolute -top-4 left-4 sm:left-12 md:left-20 z-20 pointer-events-none p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl"
        style={{
          borderColor: `${role.color}40`,
          boxShadow: `0 0 25px ${role.color}30`,
        }}
      >
        <Icon0 className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" style={{ color: role.color, filter: `drop-shadow(0 0 10px ${role.color})` }} />
      </motion.div>

      {/* Icon 1: Top-Right Floating */}
      <motion.div
        key={`icon-tr-${role.id}`}
        initial={{ scale: 0, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: [0, 8, 0], opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          scale: { type: "spring", stiffness: 220, damping: 18, delay: 0.2 },
          y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }}
        className="hidden md:block absolute -top-4 right-4 sm:right-12 md:right-20 z-20 pointer-events-none p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl"
        style={{
          borderColor: `${role.color}40`,
          boxShadow: `0 0 25px ${role.color}30`,
        }}
      >
        <Icon1 className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" style={{ color: role.color, filter: `drop-shadow(0 0 10px ${role.color})` }} />
      </motion.div>

      {/* Icon 2: Bottom-Right Floating */}
      <motion.div
        key={`icon-br-${role.id}`}
        initial={{ scale: 0, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: [0, -6, 0], opacity: 0.9 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          scale: { type: "spring", stiffness: 220, damping: 18, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }}
        className="hidden md:block absolute -bottom-4 right-8 sm:right-24 z-20 pointer-events-none p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl"
        style={{
          borderColor: `${role.color}30`,
        }}
      >
        <Icon2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: role.color }} />
      </motion.div>

      {/* ── Real Water Wave Typography SVG (Desktop Only) ── */}
      <svg
        viewBox="0 0 1200 240"
        className="hidden md:block w-full max-w-[1100px] h-auto overflow-visible relative z-10 pointer-events-none filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2"
        style={{ maxHeight: "45vh" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={role.color} stopOpacity="0.95" />
            <stop offset="50%" stopColor={role.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0.9" />
          </linearGradient>

          <mask id={maskId}>
            <text
              x="600"
              y="120"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              style={{
                fontSize,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              {role.label}
            </text>
          </mask>
        </defs>

        {/* 1. Upper Half Clear Faded Letter Outline & Backdrop */}
        <text
          x="600"
          y="120"
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255,255,255,0.05)"
          stroke={role.color}
          strokeWidth="1.8"
          strokeOpacity="0.4"
          style={{
            fontSize,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
          }}
        >
          {role.label}
        </text>

        {/* 2. Secondary Back Real Water Wave Path */}
        <path
          ref={backPathRef}
          d={initialBackWave}
          fill={role.color}
          opacity="0.4"
          mask={`url(#${maskId})`}
        />

        {/* 3. Primary Front Real Water Wave Fill Path */}
        <path
          ref={frontPathRef}
          d={initialFrontWave}
          fill={`url(#${gradId})`}
          mask={`url(#${maskId})`}
        />

        {/* 4. Real Water Surface White Reflection Crest Line */}
        <path
          ref={crestPathRef}
          d={initialFrontWave}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.9"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
          mask={`url(#${maskId})`}
        />

        {/* 5. Sharp Glowing Text Outline Frame */}
        <text
          x="600"
          y="120"
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke={role.color}
          strokeWidth="2.5"
          strokeOpacity="0.85"
          style={{
            fontSize,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            filter: `drop-shadow(0 0 16px ${role.color})`,
          }}
        >
          {role.label}
        </text>
      </svg>

    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Main Role Revealer Component
─────────────────────────────────────────────────────────────── */
const RoleDial = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const total = ROLES.length;

  // Track viewport visibility to pause autoplay when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.05 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Infinite Autoplay Loop - runs only when visible in viewport
  useEffect(() => {
    if (isPaused || !isInView) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, DWELL_MS);
    return () => clearInterval(interval);
  }, [isPaused, isInView, total]);

  const activeRole = ROLES[active];

  return (
    <div ref={containerRef} className="relative w-full min-h-[220px] sm:min-h-[300px] md:min-h-[48vh] flex flex-col items-center justify-between py-2 select-none overflow-visible">

      {/* Center Cinematic Role Typography Display */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10 px-2 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole.id}
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Real Water Wave Text (50% Water Height) & Surrounding Icons */}
            <LiquidText role={activeRole} />

            {/* Role Subtitle Caption */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm sm:text-lg md:text-xl font-medium tracking-wide text-gray-300 mt-1 text-center max-w-xl px-4"
            >
              <span className="font-semibold" style={{ color: activeRole.color }}>
                {activeRole.sub}
              </span>
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleDial;
