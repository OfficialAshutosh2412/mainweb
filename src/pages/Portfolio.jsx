import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchPortfolioData } from '../api';
import { 
  ArrowLeft, GraduationCap, Award, Briefcase, BookOpen, Layers, Sparkles, 
  School, Building2, Library, ChevronLeft, ChevronRight,
  UserCheck, Code2, Terminal, Database, Wrench, MapPin, Mail, Phone, CheckCircle2,
  Atom, ShieldCheck, Radio, FileCode, GitBranch, Cloud, Globe, Download
} from 'lucide-react';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import TiltCard from '../components/TiltCard';
import SVGRope from '../components/SVGRope';
import SkillsMarquee from '../components/SkillsMarquee';
import { useContactDrawer } from '../context/ContactContext';

/* ── Social Icon SVG Helpers ── */
const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

/* ── Theme-Colour Skill Icon (Lucide-based) ── */
const SkillIcon = ({ name, className = "w-4 h-4" }) => {
  const n = (name || '').toLowerCase();
  if (n.includes('react'))                                                      return <Atom className={className} />;
  if (n.includes('sql') || n.includes('database') || n.includes('postgres') || n.includes('mysql') || n.includes('pgadmin') || n.includes('ssms')) return <Database className={className} />;
  if (n.includes('jwt') || n.includes('identity') || n.includes('auth'))        return <ShieldCheck className={className} />;
  if (n.includes('signalr'))                                                     return <Radio className={className} />;
  if (n.includes('html') || n.includes('css') || n.includes('bootstrap') || n.includes('tailwind')) return <FileCode className={className} />;
  if (n.includes('jquery') || n.includes('ajax') || n.includes('javascript'))   return <Code2 className={className} />;
  if (n.includes('git'))                                                         return <GitBranch className={className} />;
  if (n.includes('python') || n.includes('flask') || n.includes('jinja'))       return <Terminal className={className} />;
  if (n.includes('c#') || n.includes('c++') || n.includes('.net') || n.includes('asp') || n.includes('linq') || n.includes('ado') || n.includes('entity')) return <Code2 className={className} />;
  if (n.includes('vercel') || n.includes('render') || n.includes('supabase') || n.includes('cloud')) return <Cloud className={className} />;
  if (n.includes('postman') || n.includes('swagger') || n.includes('studio') || n.includes('visual')) return <Wrench className={className} />;
  if (n.includes('restful') || n.includes('api'))                                return <Globe className={className} />;
  return <Layers className={className} />;
};

/* ── Animated Icon ── */
const AnimatedIcon = ({ Icon, className }) => (
  <motion.div
    initial={{ scale: 0, rotate: 180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  >
    <Icon className={className} />
  </motion.div>
);

/* ── JSX-bracket section heading ── */
const SectionHeading = ({ icon: Icon, title, id }) => (
  <div id={id} className="flex items-center gap-3 mb-8 md:mb-12 scroll-mt-28">
    {Icon && (
      <div className="p-2.5 rounded-2xl bg-ambient-blue/10 border border-ambient-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-ambient-blue shrink-0">
        <AnimatedIcon Icon={Icon} className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
      <span className="text-ambient-blue font-black">&lt;</span>
      <span className="text-white">{title}</span>
      <span className="text-ambient-blue font-black ml-1">/&gt;</span>
    </h2>
  </div>
);

/* ── Helper to resolve School/College Icon component ── */
const getSchoolIcon = (type) => {
  switch (type) {
    case 'School': return School;
    case 'GraduationCap': return GraduationCap;
    case 'Building2': return Building2;
    case 'Library': return Library;
    default: return School;
  }
};

/* ── Experience Icon Helper ── */
const getExpIcon = (role = '', company = '') => {
  const r = role.toLowerCase();
  const c = company.toLowerCase();
  if (r.includes('python') || c.includes('mt academy')) return Terminal;
  if (r.includes('training') && r.includes('python')) return FileCode;
  if (r.includes('mvc') || r.includes('crime')) return ShieldCheck;
  if (r.includes('core') || r.includes('qms')) return Code2;
  return Briefcase;
};

/* ── Infinite 3D Carousel for Technical Skill Category Cards ── */
const SkillsSlider = ({ categories = [] }) => {
  const cardsPerPage = 2;
  const pages = [];
  for (let i = 0; i < categories.length; i += cardsPerPage) {
    pages.push(categories.slice(i, i + cardsPerPage));
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = pages.length;

  const paginate = (newDirection, targetPage = null) => {
    setDirection(newDirection);
    if (targetPage !== null) {
      setCurrentPage(targetPage);
    } else {
      setCurrentPage((prev) => {
        if (newDirection > 0) {
          return (prev + 1) % totalPages;
        } else {
          return (prev - 1 + totalPages) % totalPages;
        }
      });
    }
  };

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentPage, isPaused, totalPages]);

  if (!categories || categories.length === 0) return null;
  const currentCards = pages[currentPage] || [];

  return (
    <div 
      className="relative w-full mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden px-1 py-3">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 w-full"
          >
            {currentCards.map((cat) => (
              <TiltCard key={cat.title} className="h-full w-full" maxTilt={8}>
                <div className="h-full w-full p-7 rounded-2xl glass-card border border-white/10 hover:border-ambient-blue/50 transition-all duration-300 relative z-10 flex flex-col justify-between group shadow-xl">
                  <div>
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="p-3 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:scale-110 transition-transform">
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-ambient-blue transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.items.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-ambient-blue/50 hover:bg-ambient-blue/15 transition-all group/skill cursor-default shadow-sm"
                        >
                          <SkillIcon name={skill} className="w-4 h-4 text-ambient-blue shrink-0 group-hover/skill:scale-125 transition-transform" />
                          <span className="text-xs font-semibold text-gray-300 group-hover/skill:text-white transition-colors whitespace-nowrap">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Navigation */}
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx > currentPage ? 1 : -1, idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === currentPage
                  ? "w-8 h-2.5 rounded-full bg-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.9)]"
                  : "w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">
          {currentPage * 2 + 1}-{Math.min((currentPage + 1) * 2, categories.length)} / {categories.length}
        </span>
      </div>
    </div>
  );
};

/* ── 3D Carousel for Training & Certifications ── */
const CertificateCarousel = ({ certificates = [] }) => {
  const cardsPerPage = 2;
  const pages = [];
  for (let i = 0; i < certificates.length; i += cardsPerPage) {
    pages.push(certificates.slice(i, i + cardsPerPage));
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = pages.length;

  const paginate = (newDirection, targetPage = null) => {
    setDirection(newDirection);
    if (targetPage !== null) {
      setCurrentPage(targetPage);
    } else {
      setCurrentPage((prev) => {
        if (newDirection > 0) {
          return (prev + 1) % totalPages;
        } else {
          return (prev - 1 + totalPages) % totalPages;
        }
      });
    }
  };

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentPage, isPaused, totalPages]);

  if (!certificates || certificates.length === 0) return null;
  const currentCards = pages[currentPage] || [];

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden px-1 py-3">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 w-full"
          >
            {currentCards.map((cert) => (
              <TiltCard key={cert.id} className="h-full w-full" maxTilt={8}>
                <div className="h-full w-full p-8 rounded-2xl glass-card border border-white/10 relative overflow-hidden z-10 group hover:border-ambient-blue/50 transition-all duration-300 flex flex-col justify-between shadow-xl min-h-[220px]">
                  <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                    <AnimatedIcon Icon={cert.type === 'Bootcamp' ? BookOpen : Award} className="w-32 h-32 text-ambient-blue" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-ambient-blue bg-ambient-blue/15 px-3.5 py-1 rounded-full uppercase tracking-wider border border-ambient-blue/30 shadow-sm">
                        {cert.type}
                      </span>
                      <span className="text-ambient-blue font-bold font-mono text-sm">{cert.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 pr-6 group-hover:text-ambient-blue transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-end text-sm text-gray-400 mt-6 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-2 font-medium text-gray-300">
                      <Award className="w-4 h-4 text-ambient-blue" />
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx > currentPage ? 1 : -1, idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === currentPage
                  ? "w-8 h-2.5 rounded-full bg-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.9)]"
                  : "w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">
          {currentPage * 2 + 1}-{Math.min((currentPage + 1) * 2, certificates.length)} / {certificates.length}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════ */
const Portfolio = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { openContactDrawer } = useContactDrawer();

  // Mouse Parallax for Header
  const headerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const headerRotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), { stiffness: 100, damping: 20 });
  const headerRotateY = useSpring(useTransform(mouseX, [-400, 400], [-5, 5]), { stiffness: 100, damping: 20 });

  useEffect(() => {
    fetchPortfolioData().then(res => setData(res.data));
  }, []);

  useEffect(() => {
    if (data && location.hash) {
      if (location.hash === '#contact') {
        openContactDrawer();
      } else {
        const el = document.querySelector(location.hash);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location, data, openContactDrawer]);

  const handleHeaderMouseMove = (e) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleHeaderMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  const headerInfo = data.header || {};
  const skillsData = data.technicalSkills || {};

  const skillCategories = [
    { title: "Languages", icon: Terminal, items: skillsData.languages || [] },
    { title: "Backend", icon: Code2, items: skillsData.backend || [] },
    { title: "Front-End", icon: Layers, items: skillsData.frontend || [] },
    { title: "Database", icon: Database, items: skillsData.database || [] },
    { title: "Tools", icon: Wrench, items: skillsData.tools || [] },
  ];

  return (
    <div className="bg-transparent text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-hidden">

      <SVGRope />

      {/* ── Main Content ── */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 w-full relative z-10">

        {/* 3D Hero / Header Section */}
        <motion.div
          ref={headerRef}
          onMouseMove={handleHeaderMouseMove}
          onMouseLeave={handleHeaderMouseLeave}
          style={{
            rotateX: headerRotateX,
            rotateY: headerRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col mb-20 gap-6 perspective-1000 preserve-3d"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-2"
              >
                <span className="text-ambient-blue font-black">&lt;</span>
                <span className="text-white">{headerInfo.name || "ASHUTOSH PRASAD"}</span>
                <span className="text-ambient-blue font-black ml-1">/&gt;</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-xl md:text-2xl font-bold text-ambient-blue flex items-center gap-2"
              >
                <span>{headerInfo.role || "C# / .NET Developer"}</span>
                <Sparkles className="w-5 h-5 text-ambient-blue animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Quick Contact & Links Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-300 pt-4 border-t border-white/10"
          >
            {headerInfo.location && (
              <span className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-ambient-blue" />
                {headerInfo.location}
              </span>
            )}
            {headerInfo.phone && (
              <a href={`tel:${headerInfo.phone}`} className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full hover:border-ambient-blue/50 hover:bg-ambient-blue/10 transition-colors">
                <Phone className="w-4 h-4 text-ambient-blue" />
                {headerInfo.phone}
              </a>
            )}
            {headerInfo.email && (
              <a 
                href={`mailto:${headerInfo.email}`} 
                className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full hover:border-ambient-blue/50 hover:bg-ambient-blue/10 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-ambient-blue" />
                {headerInfo.email}
              </a>
            )}
            {headerInfo.linkedin && (
              <a href={headerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-ambient-blue/15 text-ambient-blue px-3.5 py-1.5 rounded-full border border-ambient-blue/30 hover:bg-ambient-blue hover:text-white transition-all shadow-sm">
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {headerInfo.github && (
              <a href={headerInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/10 text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all shadow-sm">
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Full Page Sections */}
        <div className="space-y-20 sm:space-y-28">

          {/* 1. PROFESSIONAL SUMMARY */}
          <section id="summary" className="scroll-mt-28">
            <SectionHeading icon={UserCheck} title="Professional Summary" />
            <RevealingCard delay={0.1}>
              <div className="p-8 sm:p-10 md:p-12 rounded-3xl glass-card border border-white/10 relative overflow-hidden group hover:border-ambient-blue/40 transition-all duration-300">
                <div className="flex gap-6 items-start">
                  <div className="w-1.5 h-24 rounded-full bg-ambient-blue shadow-[0_0_20px_rgba(59,130,246,0.9)] shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-normal">
                      {data.summary}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2.5">
                      {["C#", "ASP.NET Core Web API", "ASP.NET MVC", "React.js", "SQL Server", "Entity Framework Core", "RESTful APIs"].map((tag, idx) => (
                        <span key={idx} className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 shadow-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealingCard>
          </section>

          {/* 2. TECHNICAL SKILLS */}
          <section id="skills" className="scroll-mt-28">
            <SectionHeading icon={Code2} title="Technical Skills" />
            <SkillsMarquee />
            <SkillsSlider categories={skillCategories} />
          </section>

          {/* 3. INTERNSHIP & TRAINING EXPERIENCE */}
          <section id="experience" className="scroll-mt-28">
            <SectionHeading icon={Briefcase} title="Internship & Training Experience" />
            <div className="flex flex-col space-y-10">
              {(data.experience || []).map((item, i) => {
                const isEven = i % 2 === 0;
                const ExpIcon = getExpIcon(item.role, item.company);
                return (
                  <div 
                    key={item.id} 
                    className={`w-full md:w-[90%] ${isEven ? 'self-start md:mr-auto' : 'self-end md:ml-auto'}`}
                  >
                    <RevealingCard delay={i * 0.1}>
                      <div className="p-8 md:p-10 rounded-2xl glass-card border border-white/10 relative z-10 group hover:border-ambient-blue/50 transition-all duration-300 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/10">
                          <div className="flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                              <ExpIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 group-hover:text-ambient-blue transition-colors">
                                {item.role}
                              </h3>
                              <div className="text-ambient-blue font-semibold text-sm sm:text-base flex flex-wrap items-center gap-1 sm:gap-2">
                                <span>{item.company}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-300 text-sm font-normal">{item.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-ambient-blue text-xs font-bold font-mono bg-ambient-blue/15 px-4 py-2 rounded-full border border-ambient-blue/30 inline-block shrink-0 shadow-sm">
                            {item.period}
                          </div>
                        </div>

                        <ul className="space-y-3.5 mt-4 text-gray-300 text-sm leading-relaxed">
                          {(item.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-ambient-blue shrink-0 mt-1" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </RevealingCard>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. TRAINING & CERTIFICATIONS */}
          <section id="certificates" className="scroll-mt-28">
            <SectionHeading icon={Award} title="Training & Certifications" />
            <CertificateCarousel certificates={data.certificates} />
          </section>

          {/* 5. ACADEMIC PROJECTS */}
          <section id="projects" className="scroll-mt-28">
            <SectionHeading icon={Layers} title="Academic Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {(data.academicProjects || []).map((item, i) => (
                <RevealingCard key={item.id} delay={i * 0.15}>
                  <div className="h-full w-full p-8 sm:p-10 md:p-12 min-h-[380px] rounded-3xl glass-card border border-white/10 relative z-10 group hover:border-ambient-blue/50 transition-all duration-300 flex flex-col justify-between shadow-2xl">
                    <div>
                      <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-5 group-hover:text-ambient-blue transition-colors flex items-center justify-between">
                        <span>
                          <span className="text-ambient-blue font-black">&lt;</span>
                          {item.title}
                          <span className="text-ambient-blue font-black ml-1">/&gt;</span>
                        </span>
                      </h3>

                      {/* Tech Stack Pills with Skill Icons */}
                      <div className="flex flex-wrap gap-2.5 mb-8">
                        {(item.techStack || []).map((tech, tIdx) => (
                          <span key={tIdx} className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 flex items-center gap-1.5 shadow-sm">
                            <SkillIcon name={tech} className="w-4 h-4 text-ambient-blue" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Bullet Points */}
                      <ul className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                        {(item.bullets || []).slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-ambient-blue shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealingCard>
              ))}
            </div>
          </section>

          {/* 6. EDUCATION */}
          <section id="timeline" className="scroll-mt-28">
            <SectionHeading icon={GraduationCap} title="Education" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {(data.education || []).map((item, i) => {
                const SchoolIcon = getSchoolIcon(item.iconType);
                return (
                  <RevealingCard key={item.id} delay={i * 0.15}>
                    <div className="h-full w-full p-8 rounded-2xl glass-card border border-white/10 relative z-10 overflow-hidden flex flex-col justify-between group hover:border-ambient-blue/50 transition-all duration-300 shadow-xl">
                      {/* Background Watermark Icon */}
                      <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                        <SchoolIcon className="w-44 h-44 text-ambient-blue" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-ambient-blue/15 border border-ambient-blue/30 flex items-center justify-center text-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-110 group-hover:bg-ambient-blue group-hover:text-white transition-all duration-300">
                              <SchoolIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold font-mono px-3.5 py-1.5 rounded-full bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30">
                              {item.period}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ambient-blue transition-colors">
                          {item.degree}
                        </h3>

                        <div className="text-ambient-blue font-medium text-sm mb-4 flex items-center gap-2">
                          <School className="w-4 h-4 text-ambient-blue shrink-0" />
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {item.score && (
                        <div className="text-xs text-gray-300 glass-pill px-4 py-2.5 rounded-xl mt-4 flex items-center justify-between">
                          <span className="text-gray-400 font-medium">Academic Score:</span>
                          <span className="font-bold text-ambient-blue">{item.score}</span>
                        </div>
                      )}
                    </div>
                  </RevealingCard>
                );
              })}
            </div>
          </section>

        </div>

        {/* ── Download Resume CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-4 py-10 sm:py-12 border-t border-b border-white/10"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center">
            <span className="text-ambient-blue">&lt;</span> Get my full resume <span className="text-ambient-blue">/&gt;</span>
          </h3>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-ambient-blue to-blue-600 text-white font-bold text-lg rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>
          <p className="text-xs text-gray-500 font-mono">Opens as PDF in a new tab</p>

          <div className="mt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all text-sm font-semibold group cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Main Webpage</span>
            </Link>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <section id="contact" className="mt-16 scroll-mt-28">
          <TiltCard delay={0.1} maxTilt={6}>
            <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-ambient-blue/25 via-dark-surface to-black/90 border border-ambient-blue/40 relative overflow-hidden flex flex-col items-center justify-between gap-8 md:flex-row group hover:border-ambient-blue/70 transition-all duration-300 text-center md:text-left shadow-2xl">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 text-xs font-mono font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  Looking for a .NET / Full Stack Developer?
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Let's Discuss Opportunities
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Available for full-time positions, contractor engagements, and technical collaborations.
                </p>
              </div>

              <button
                onClick={openContactDrawer}
                className="px-8 py-4 bg-gradient-to-r from-ambient-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all flex items-center gap-3 shrink-0 cursor-pointer hover:scale-105 active:scale-95 text-base"
              >
                <Mail className="w-5 h-5" />
                Contact Me Now
              </button>
            </div>
          </TiltCard>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
