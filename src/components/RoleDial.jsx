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
    color: "#fb923c",
    icons: [Layers, Globe, Cpu]
  },
  { 
    id: "backend",   
    label: "BACKEND DEV",     
    sub: "Scalable RESTful APIs & Microservices",     
    color: "#34d399",
    icons: [Terminal, Code2, ShieldCheck]
  },
  { 
    id: "frontend",  
    label: "FRONTEND DEV",    
    sub: "Interactive React.js & Modern UIs",          
    color: "#a78bfa",
    icons: [Atom, FileCode, Sparkles]
  },
  { 
    id: "api",       
    label: "API ARCHITECT",   
    sub: "Secure JWT Auth & SignalR Services",        
    color: "#f472b6",
    icons: [Globe, ShieldCheck, Radio]
  },
  { 
    id: "database",  
    label: "DATABASE DEV",    
    sub: "SQL Server & Entity Framework Core",        
    color: "#facc15",
    icons: [Database, Layers, Wrench]
  },
];

const DWELL_MS = 3400;

/* ─────────────────────────────────────────────────────────────
   Realistic Water Wave Typography Component (Half-Height Water Level)
─────────────────────────────────────────────────────────────── */
const LiquidText = ({ role }) => {
  const [waveOffset, setWaveOffset] = useState(0);
  const animRef = useRef(null);

  // Smooth real water fluid wave motion loop
  useEffect(() => {
    let start;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      setWaveOffset(progress * 0.14);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const Icon0 = role.icons[0] || Sparkles;
  const Icon1 = role.icons[1] || Code2;
  const Icon2 = role.icons[2] || Globe;

  const maskId = `real-water-mask-${role.id}`;
  const gradId = `water-grad-${role.id}`;

  const generateRealWavePath = (offset, amplitude = 14, frequency = 0.012, yLevel = 126) => {
    let path = `M 0 ${yLevel}`;
    for (let x = 0; x <= 1200; x += 8) {
      const y = yLevel + Math.sin((x + offset) * frequency) * amplitude + Math.cos((x - offset * 0.5) * 0.02) * (amplitude * 0.3);
      path += ` L ${x} ${y}`;
    }
    path += ` L 1200 300 L 0 300 Z`;
    return path;
  };

  const frontWave = generateRealWavePath(waveOffset, 16, 0.012, 126);
  const backWave  = generateRealWavePath(-waveOffset * 0.75 + 100, 12, 0.016, 120);

  const fontSize = role.label.length > 13 ? "80px" : "100px";

  return (
    <div className="relative w-full max-w-[1150px] mx-auto flex flex-col items-center justify-center select-none py-6 px-2 overflow-visible">
      
      {/* Dynamic Ambient Color Bloom */}
      <motion.div
        key={`bloom-${role.id}`}
        className="absolute inset-0 m-auto w-full max-w-[800px] h-[300px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${role.color}45 0%, ${role.color}15 45%, transparent 75%)`,
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
      />

      {/* ── Floating Tech Icons Surrounding the Role Text ── */}
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
        className="absolute -top-4 left-4 sm:left-12 md:left-20 z-20 pointer-events-none p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl"
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
        className="absolute -top-4 right-4 sm:right-12 md:right-20 z-20 pointer-events-none p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl"
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
        className="absolute -bottom-4 right-8 sm:right-24 z-20 pointer-events-none p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl"
        style={{
          borderColor: `${role.color}30`,
        }}
      >
        <Icon2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: role.color }} />
      </motion.div>

      {/* ── Real Water Wave Typography SVG (Half-Height Water Fill) ── */}
      <svg
        viewBox="0 0 1200 240"
        className="w-full max-w-[1100px] h-auto overflow-visible relative z-10 pointer-events-none filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2"
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
          d={backWave}
          fill={role.color}
          opacity="0.4"
          mask={`url(#${maskId})`}
        />

        {/* 3. Primary Front Real Water Wave Fill Path */}
        <path
          d={frontWave}
          fill={`url(#${gradId})`}
          mask={`url(#${maskId})`}
        />

        {/* 4. Real Water Surface White Reflection Crest Line */}
        <path
          d={frontWave}
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
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = ROLES.length;

  // Infinite Autoplay Loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, DWELL_MS);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const activeRole = ROLES[active];

  return (
    <div className="relative w-full min-h-[48vh] sm:min-h-[54vh] flex flex-col items-center justify-between py-2 select-none overflow-visible">

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

      {/* ─────────────────────────────────────────────────────────────
         Bottom Role Navigation Bar (Transparent Container + Sliding Highlight Box)
      ─────────────────────────────────────────────────────────────── */}
      <div 
        className="w-full max-w-5xl mx-auto px-2 mt-6 relative z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center justify-center flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 p-1.5 bg-transparent w-full">
          {ROLES.map((role, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={role.id}
                onClick={() => setActive(idx)}
                className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap overflow-hidden ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {/* Sliding Animated Active Role Box */}
                {isActive && (
                  <motion.div
                    layoutId="activeRoleHighlightBox"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.12)] pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Glowing Active Role Indicator Dot */}
                <span
                  className={`w-2 h-2 rounded-full shrink-0 relative z-10 transition-all duration-300 ${
                    isActive ? "scale-125" : "opacity-40"
                  }`}
                  style={{
                    backgroundColor: role.color,
                    boxShadow: isActive ? `0 0 10px 2px ${role.color}` : "none",
                  }}
                />

                <span className="whitespace-nowrap tracking-wide relative z-10">{role.label}</span>

                {/* Animated Progress Line under Active Role */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2.5px] rounded-full z-10"
                    style={{ backgroundColor: role.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: DWELL_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default RoleDial;
