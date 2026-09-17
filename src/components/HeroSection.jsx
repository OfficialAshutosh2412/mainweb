import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';
import photoOne from '../assets/photo_one.png';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const ROLES = [
  "Full-Stack Developer",
  "Backend & .NET Engineer",
  "React.js & Frontend Developer",
  "RESTful API Architect",
  "Database & SQL Specialist"
];

/* ─────────────────────────────────────────────────────────────
   Jitter-Free Theme Blue Curtain Revealer
   - Uses precise async animation steps (Curtain IN -> Text Swap -> Curtain OUT)
   - Zero timing drift, zero mid-animation jumps, zero black flushes
─────────────────────────────────────────────────────────────── */
const SlidingRoleRevealer = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-200">
      <span className="text-gray-400 font-normal mr-2.5 sm:mr-3 shrink-0">a</span>
      <div className="relative inline-flex items-center h-[1.4em] overflow-hidden py-0.5 shrink-0 select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={roleIndex}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="text-ambient-blue font-bold inline-block whitespace-nowrap font-name select-none"
          >
            {ROLES[roleIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Split-Screen Hero Component
   - Left div: Photo fitted cleanly with face centered
   - Right div:
     - Line 1: I'm
     - Line 2: Ashutosh Prasad
     - Line 3: Left-to-right role revealer
     - Short paragraph
     - Buttons
     - Social icons (no divider line, no connect label)
─────────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const { openContactDrawer } = useContactDrawer();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const showcase = document.querySelector('#showcase');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-dark-bg">

      {/* ── Left 50%: Clean portrait photo with theme background color overlay ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="w-full lg:w-1/2 h-[60vh] sm:h-[70vh] lg:h-full relative overflow-hidden bg-black shrink-0 flex items-center justify-center order-1"
      >
        <img
          src={photoOne}
          alt="Ashutosh Prasad"
          className="w-full h-full object-cover object-[50%_28%] filter grayscale contrast-[1.08] brightness-[0.93]"
        />

        {/* Theme background color overlay to colorize user image according to theme */}
        <div className="absolute inset-0 bg-[#1F150C]/65 mix-blend-color pointer-events-none" />
        <div className="absolute inset-0 bg-[#412D15]/35 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-ambient-blue/20 mix-blend-overlay pointer-events-none" />

        {/* Edge overlays without gradients */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-8 bg-dark-bg pointer-events-none" />
        <div className="lg:hidden absolute inset-x-0 bottom-0 h-8 bg-dark-bg pointer-events-none" />
      </motion.div>

      {/* ── Right 50%: 3-Line Header (I'm / Name / Role) + Short Bio + Buttons ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-0 relative z-10 space-y-6 sm:space-y-7 order-2"
      >
        {/* 3-Line Title Structure */}
        <div className="space-y-1 sm:space-y-2">
          {/* Line 1: I'm */}
          <div className="font-intro italic text-3xl sm:text-4xl md:text-5xl text-gray-400 tracking-wide">
            I’m
          </div>

          {/* Line 2: Name */}
          <h1 className="font-name text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Ashutosh Prasad
          </h1>

          {/* Line 3: Left-to-Right Role Revealer */}
          <div className="pt-1.5 font-nav">
            <SlidingRoleRevealer />
          </div>
        </div>

        {/* Short, punchy summary */}
        <p className="font-body text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-normal">
          Full-stack software engineer crafting robust .NET architectures, scalable APIs, and modern React experiences.
        </p>

        {/* Both Action Buttons (Sharp Square Edges) */}
        <div className="flex flex-wrap items-center gap-4 pt-1 font-nav">
          <button
            onClick={openContactDrawer}
            className="btn-slide-blue group px-7 py-3.5 font-semibold text-sm sm:text-base hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <a
            href="#showcase"
            onClick={handleScrollToProjects}
            className="px-6 py-3.5 glass-pill text-gray-200 hover:text-white font-medium text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Explore Work
          </a>
        </div>

        {/* Social Links (No divider line, no Connect label) */}
        <div className="flex items-center gap-5 text-gray-400 text-xs sm:text-sm pt-2 font-nav">
          <a
            href="https://github.com/OfficialAshutosh2412"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <GitHubIcon className="w-4 h-4 group-hover:text-ambient-blue transition-colors" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-prasad-0449181ba"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <LinkedInIcon className="w-4 h-4 group-hover:text-ambient-blue transition-colors" />
            <span>LinkedIn</span>
          </a>
        </div>

      </motion.div>

    </section>
  );
};

export default HeroSection;
