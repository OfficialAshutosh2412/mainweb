import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchPortfolioData } from '../api';
import { 
  ArrowLeft, GraduationCap, Award, Briefcase, BookOpen, Layers, Sparkles, 
  Hexagon, Triangle, Circle, School, Building2, Library, ChevronLeft, ChevronRight,
  UserCheck, Code2, Terminal, Database, Wrench, MapPin, Mail, Phone, CheckCircle2,
  Atom, ShieldCheck, Radio, FileCode, GitBranch, Cloud, Globe
} from 'lucide-react';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
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


/* ── Floating ambient background icons ── */
const FloatingBgIcons = () => {
  const icons = [
    { Icon: Sparkles, top: '10%', left: '5%', delay: 0 },
    { Icon: Hexagon,  top: '40%', right: '8%', delay: 1 },
    { Icon: Triangle, top: '70%', left: '12%', delay: 2 },
    { Icon: Circle,   top: '85%', right: '6%', delay: 1.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-ambient-blue/15"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={{ y: [0, -30, 0], rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        >
          <item.Icon size={64} />
        </motion.div>
      ))}
    </div>
  );
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
  <div id={id} className="flex items-center gap-3 mb-8 md:mb-12 scroll-mt-24">
    {Icon && <AnimatedIcon Icon={Icon} className="w-6 h-6 md:w-8 md:h-8 text-ambient-blue shrink-0" />}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
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

/* ── Infinite Carousel for Technical Skill Category Cards (2 cards per slide) ── */
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
      className="relative w-full mt-6"
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full"
          >
            {currentCards.map((cat) => (
              <div
                key={cat.title}
                className="h-full w-full p-6 rounded-2xl bg-dark-surface border border-white/10 hover:border-ambient-blue/50 transition-all duration-300 relative z-10 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-ambient-blue transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-ambient-blue/50 hover:bg-ambient-blue/10 transition-all group/skill cursor-default"
                      >
                        <SkillIcon name={skill} className="w-4 h-4 text-ambient-blue shrink-0 group-hover/skill:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-gray-300 group-hover/skill:text-white transition-colors whitespace-nowrap">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Navigation */}
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-xl bg-dark-surface border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-xl bg-dark-surface border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
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
                  ? "w-8 h-2.5 rounded-full bg-ambient-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]"
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

/* ── Infinite Carousel for Training & Certifications (2 cards per slide) ── */
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
      {/* Cards Slider Wrapper */}
      <div className="relative overflow-hidden px-1 py-3">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full"
          >
            {currentCards.map((cert) => (
              <div 
                key={cert.id} 
                className="h-full w-full p-7 rounded-2xl bg-dark-surface border border-white/10 relative overflow-hidden z-10 group hover:border-ambient-blue/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                  <AnimatedIcon Icon={cert.type === 'Bootcamp' ? BookOpen : Award} className="w-32 h-32 text-ambient-blue" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-ambient-blue bg-ambient-blue/10 px-3 py-1 rounded-full uppercase tracking-wider border border-ambient-blue/20">
                      {cert.type}
                    </span>
                    <span className="text-ambient-blue font-bold font-mono text-sm">{cert.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 pr-6 group-hover:text-ambient-blue transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex justify-between items-end text-sm text-gray-400 mt-6 pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Award className="w-4 h-4 text-ambient-blue" />
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">Verified</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: Dots & Arrows */}
      <div className="flex items-center justify-between mt-8 px-2">
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-xl bg-dark-surface border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-xl bg-dark-surface border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Clickable Dots */}
        <div className="flex items-center gap-2.5">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx > currentPage ? 1 : -1, idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === currentPage
                  ? "w-8 h-2.5 rounded-full bg-ambient-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]"
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
    <div className="bg-dark-bg text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-hidden">

      <SVGRope />

      {/* Ambient glows */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-ambient-glow rounded-full blur-[150px] opacity-15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-ambient-glow/30 rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <FloatingBgIcons />

      {/* ── Main Content ── */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 w-full relative z-10">

        {/* Hero / Header Section */}
        <div className="flex flex-col mb-20 gap-6">
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
              </motion.div>
            </div>
          </div>

          {/* Quick Contact & Links Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 pt-4 border-t border-white/10"
          >
            {headerInfo.location && (
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <MapPin className="w-4 h-4 text-ambient-blue" />
                {headerInfo.location}
              </span>
            )}
            {headerInfo.phone && (
              <a href={`tel:${headerInfo.phone}`} className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-ambient-blue/50 transition-colors">
                <Phone className="w-4 h-4 text-ambient-blue" />
                {headerInfo.phone}
              </a>
            )}
            {headerInfo.email && (
              <a 
                href={`mailto:${headerInfo.email}`} 
                onClick={(e) => {
                  window.location.href = `mailto:${headerInfo.email}`;
                }}
                className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-ambient-blue/50 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-ambient-blue" />
                {headerInfo.email}
              </a>
            )}
            {headerInfo.linkedin && (
              <a href={headerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-ambient-blue/10 text-ambient-blue px-3 py-1.5 rounded-full border border-ambient-blue/30 hover:bg-ambient-blue hover:text-white transition-all">
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {headerInfo.github && (
              <a href={headerInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            )}
          </motion.div>
        </div>

        {/* Full Page Sections - Maintained in Resume Order */}
        <div className="space-y-20 sm:space-y-28">

          {/* 1. PROFESSIONAL SUMMARY */}
          <section id="summary" className="scroll-mt-24">
            <SectionHeading icon={UserCheck} title="Professional Summary" />
            <RevealingCard delay={0.1}>
              <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-dark-surface to-black/80 border border-white/10 relative overflow-hidden group hover:border-ambient-blue/40 transition-all duration-300">
                <div className="flex gap-5 items-start">
                  <div className="w-1.5 h-20 rounded-full bg-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.8)] shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
                      {data.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["C#", "ASP.NET Core Web API", "ASP.NET MVC", "React.js", "SQL Server", "Entity Framework Core", "RESTful APIs"].map((tag, idx) => (
                        <span key={idx} className="text-xs font-mono px-3 py-1 rounded-full bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20">
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
          <section id="skills" className="scroll-mt-24">
            <SectionHeading icon={Code2} title="Technical Skills" />
            <SkillsMarquee />
            <SkillsSlider categories={skillCategories} />
          </section>

          {/* 3. INTERNSHIP & TRAINING EXPERIENCE */}
          <section id="experience" className="scroll-mt-24">
            <SectionHeading icon={Briefcase} title="Internship & Training Experience" />
            <div className="flex flex-col space-y-10">
              {(data.experience || []).map((item, i) => {
                const isEven = i % 2 === 0;
                const ExpIcon = getExpIcon(item.role, item.company);
                return (
                  <div 
                    key={item.id} 
                    className={`w-full md:w-[88%] ${isEven ? 'self-start md:mr-auto' : 'self-end md:ml-auto'}`}
                  >
                    <RevealingCard delay={i * 0.1}>
                      <div className="p-6 md:p-8 rounded-2xl bg-dark-surface border border-white/10 relative z-10 group hover:border-ambient-blue/50 transition-all duration-300 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                          <div className="flex items-start gap-3.5">
                            <div className="p-3 rounded-xl bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                              <ExpIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 group-hover:text-ambient-blue transition-colors">
                                {item.role}
                              </h3>
                              <div className="text-ambient-blue font-semibold text-sm sm:text-base flex flex-wrap items-center gap-1 sm:gap-2">
                                <span>{item.company}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-400 text-sm font-normal">{item.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-ambient-blue text-xs font-bold font-mono bg-ambient-blue/10 px-3.5 py-1.5 rounded-full border border-ambient-blue/20 inline-block shrink-0">
                            {item.period}
                          </div>
                        </div>

                        <ul className="space-y-3 mt-4 text-gray-300 text-sm leading-relaxed">
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
          <section id="certificates" className="scroll-mt-24">
            <SectionHeading icon={Award} title="Training & Certifications" />
            <CertificateCarousel certificates={data.certificates} />
          </section>

          {/* 5. ACADEMIC PROJECTS (Spacious & Larger Cards) */}
          <section id="projects" className="scroll-mt-24">
            <SectionHeading icon={Layers} title="Academic Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {(data.academicProjects || []).map((item, i) => (
                <RevealingCard key={item.id} delay={i * 0.15}>
                  <div className="h-full w-full p-8 sm:p-10 md:p-12 min-h-[380px] rounded-3xl bg-dark-surface border border-white/10 relative z-10 group hover:border-ambient-blue/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
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
                          <span key={tIdx} className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-xl bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20 flex items-center gap-1.5">
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

          {/* 6. EDUCATION (With School & College Icons) */}
          <section id="timeline" className="scroll-mt-24">
            <SectionHeading icon={GraduationCap} title="Education" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {(data.education || []).map((item, i) => {
                const SchoolIcon = getSchoolIcon(item.iconType);
                return (
                  <RevealingCard key={item.id} delay={i * 0.15}>
                    <div className="h-full w-full p-8 rounded-2xl bg-dark-surface border border-white/5 relative z-10 overflow-hidden flex flex-col justify-between group hover:border-ambient-blue/40 transition-all duration-300">
                      {/* Background Watermark Icon */}
                      <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                        <SchoolIcon className="w-40 h-40 text-ambient-blue" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-ambient-blue/10 border border-ambient-blue/30 flex items-center justify-center text-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:scale-110 group-hover:bg-ambient-blue group-hover:text-white transition-all duration-300">
                              <SchoolIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20">
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
                        <div className="text-xs text-gray-300 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 mt-4 flex items-center justify-between">
                          <span className="text-gray-400 font-medium">Academic Score:</span>
                          <span className="font-semibold text-ambient-blue">{item.score}</span>
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
          className="mt-16 sm:mt-20 flex flex-col items-center gap-4 py-8 sm:py-10 border-t border-b border-white/10"
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
            className="inline-flex items-center gap-3 px-10 py-4 bg-ambient-blue text-white font-bold text-lg rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_45px_rgba(59,130,246,0.65)] transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
            Download Resume
          </motion.a>
          <p className="text-xs text-gray-500 font-mono">Opens as PDF in a new tab</p>

          {/* Compact Main Webpage Button immediately below Download Resume */}
          <div className="mt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-dark-surface border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/10 text-gray-300 hover:text-white transition-all text-sm font-semibold group cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Main Webpage</span>
            </Link>
          </div>
        </motion.div>

        {/* Contact CTA (Right after Download Resume section) */}
        <section id="contact" className="mt-16 scroll-mt-24">
          <RevealingCard delay={0.1}>
            <div className="p-6 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-r from-ambient-blue/20 via-dark-surface to-black border border-ambient-blue/30 relative overflow-hidden flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8 group hover:border-ambient-blue/60 transition-all duration-300 text-center md:text-left">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20 text-xs font-mono font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  Looking for a .NET / Full Stack Developer?
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Let's Discuss Opportunities
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Click below to open my contact form drawer. Feel free to reach out regarding job offers, consultations, or technical projects.
                </p>
              </div>

              <button
                onClick={openContactDrawer}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-ambient-blue hover:bg-blue-600 text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all flex items-center gap-3 shrink-0 cursor-pointer hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Contact Me Now
              </button>
            </div>
          </RevealingCard>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
