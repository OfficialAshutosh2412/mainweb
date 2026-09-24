import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { fetchPortfolioData } from "../api";
import {
  ArrowLeft,
  GraduationCap,
  Award,
  Briefcase,
  BookOpen,
  Layers,
  Sparkles,
  School,
  Building2,
  Library,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Code2,
  Terminal,
  Database,
  Wrench,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Atom,
  ShieldCheck,
  Radio,
  FileCode,
  GitBranch,
  Cloud,
  Globe,
  Download,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

import Footer from "../components/Footer";
import RevealingCard from "../components/RevealingCard";
import TiltCard from "../components/TiltCard";
import SkillsMarquee from "../components/SkillsMarquee";
import { useContactDrawer } from "../context/ContactContext";
import { portfolioData } from "../api/mockData";
import avatarPhoto from "../assets/photo_one.png";

/* ── Random gradient pool for academic project cards ── */
const projectGradients = [
  {
    bg: 'linear-gradient(135deg, rgba(118,84,232,0.18) 0%, rgba(34,211,238,0.12) 100%), #0c101c',
    border: '1px solid rgba(118,84,232,0.36)',
    accent: '#9c87ff',
    eyebrowColor: '#9c87ff',
  },
  {
    bg: 'linear-gradient(135deg, rgba(34,211,238,0.16) 0%, rgba(16,185,129,0.14) 100%), #0c101c',
    border: '1px solid rgba(34,211,238,0.34)',
    accent: '#22d3ee',
    eyebrowColor: '#22d3ee',
  },
  {
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.16) 0%, rgba(236,72,153,0.14) 100%), #0c101c',
    border: '1px solid rgba(168,85,247,0.34)',
    accent: '#c084fc',
    eyebrowColor: '#c084fc',
  },
  {
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(239,68,68,0.14) 100%), #0c101c',
    border: '1px solid rgba(245,158,11,0.32)',
    accent: '#fbbf24',
    eyebrowColor: '#fbbf24',
  },
];

/* ── Social Icon SVG Helpers ── */
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

/* ── Theme-Colour Skill Icon (Lucide-based) ── */
const SkillIcon = ({ name, className = "w-4 h-4" }) => {
  const n = (name || "").toLowerCase();
  if (n.includes("react")) return <Atom className={className} />;
  if (
    n.includes("sql") ||
    n.includes("database") ||
    n.includes("postgres") ||
    n.includes("mysql") ||
    n.includes("pgadmin") ||
    n.includes("ssms")
  )
    return <Database className={className} />;
  if (n.includes("jwt") || n.includes("identity") || n.includes("auth"))
    return <ShieldCheck className={className} />;
  if (n.includes("signalr")) return <Radio className={className} />;
  if (
    n.includes("html") ||
    n.includes("css") ||
    n.includes("bootstrap") ||
    n.includes("tailwind")
  )
    return <FileCode className={className} />;
  if (n.includes("jquery") || n.includes("ajax") || n.includes("javascript"))
    return <Code2 className={className} />;
  if (n.includes("git")) return <GitBranch className={className} />;
  if (n.includes("python") || n.includes("flask") || n.includes("jinja"))
    return <Terminal className={className} />;
  if (
    n.includes("c#") ||
    n.includes("c++") ||
    n.includes(".net") ||
    n.includes("asp") ||
    n.includes("linq") ||
    n.includes("ado") ||
    n.includes("entity")
  )
    return <Code2 className={className} />;
  if (
    n.includes("vercel") ||
    n.includes("render") ||
    n.includes("supabase") ||
    n.includes("cloud")
  )
    return <Cloud className={className} />;
  if (
    n.includes("postman") ||
    n.includes("swagger") ||
    n.includes("studio") ||
    n.includes("visual")
  )
    return <Wrench className={className} />;
  if (n.includes("restful") || n.includes("api"))
    return <Globe className={className} />;
  return <Layers className={className} />;
};

/* ── Animated Icon ── */
const AnimatedIcon = ({ Icon, className }) => (
  <motion.div
    initial={{ scale: 0, rotate: 180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
    case "School":
      return School;
    case "GraduationCap":
      return GraduationCap;
    case "Building2":
      return Building2;
    case "Library":
      return Library;
    default:
      return School;
  }
};

/* ── Experience Icon Helper ── */
const getExpIcon = (role = "", company = "") => {
  const r = role.toLowerCase();
  const c = company.toLowerCase();
  if (r.includes("python") || c.includes("mt academy")) return Terminal;
  if (r.includes("training") && r.includes("python")) return FileCode;
  if (r.includes("mvc") || r.includes("crime")) return ShieldCheck;
  if (r.includes("core") || r.includes("qms")) return Code2;
  return Briefcase;
};

/* ── Experience Tech Stack Helper ── */
const getExpTechStack = (item) => {
  const r = (item?.role || "").toLowerCase();
  if (r.includes("mvc")) {
    return ["ASP.NET MVC", "C#", "SQL Server", "AJAX", "Bootstrap"];
  }
  if (r.includes("core") || r.includes("qms")) {
    return ["ASP.NET Core", "React.js", "JWT Auth", "REST APIs", "SQL Server"];
  }
  if (r.includes("summer internship")) {
    return ["Python", "Tkinter", "MySQL", "Desktop GUI"];
  }
  if (r.includes("python") && r.includes("training")) {
    return ["Python", "Flask", "MySQL", "PhpMyAdmin", "CRUD"];
  }
  return ["Software Development", "C#", "SQL Server"];
};

/* ── Proficiency lookup (out of 100) ── */
const skillLevels = {
  // Languages
  'C#': { pct: 92, label: 'Expert' },
  'JavaScript': { pct: 85, label: 'Advanced' },
  'SQL': { pct: 88, label: 'Advanced' },
  'Python': { pct: 68, label: 'Intermediate' },
  'C': { pct: 60, label: 'Intermediate' },
  'C++': { pct: 58, label: 'Intermediate' },
  // Backend
  'ASP.NET Core Web API': { pct: 90, label: 'Expert' },
  'ASP.NET MVC': { pct: 88, label: 'Advanced' },
  'Entity Framework Core': { pct: 85, label: 'Advanced' },
  'ADO.NET': { pct: 82, label: 'Advanced' },
  'LINQ': { pct: 84, label: 'Advanced' },
  'JWT Auth': { pct: 87, label: 'Advanced' },
  'SignalR': { pct: 75, label: 'Proficient' },
  'RESTful APIs': { pct: 91, label: 'Expert' },
  // Frontend
  'React.js': { pct: 80, label: 'Advanced' },
  'HTML5': { pct: 90, label: 'Expert' },
  'CSS3': { pct: 86, label: 'Advanced' },
  'Tailwind CSS': { pct: 82, label: 'Advanced' },
  'Bootstrap': { pct: 80, label: 'Advanced' },
  'AJAX': { pct: 78, label: 'Proficient' },
  'jQuery': { pct: 76, label: 'Proficient' },
  // Database
  'SQL Server': { pct: 88, label: 'Advanced' },
  'PostgreSQL': { pct: 76, label: 'Proficient' },
  'MySQL': { pct: 74, label: 'Proficient' },
  // Tools
  'Visual Studio': { pct: 92, label: 'Expert' },
  'VS Code': { pct: 90, label: 'Expert' },
  'Git': { pct: 85, label: 'Advanced' },
  'GitHub': { pct: 85, label: 'Advanced' },
  'Postman': { pct: 83, label: 'Advanced' },
  'Swagger': { pct: 80, label: 'Advanced' },
  'SSMS': { pct: 82, label: 'Advanced' },
  'Vercel': { pct: 76, label: 'Proficient' },
  'Render': { pct: 72, label: 'Proficient' },
  'Supabase': { pct: 70, label: 'Proficient' },
};

const getLevelColor = (pct) => {
  if (pct >= 88) return 'var(--purple-bright)';
  if (pct >= 78) return 'var(--cyan)';
  if (pct >= 68) return 'var(--green)';
  return 'var(--muted)';
};

const SkillsSlider = ({ categories = [] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!categories || categories.length === 0) return null;
  const active = categories[activeIdx];
  const IconComp = active.icon;

  return (
    <div className="skills-layout">
      {/* LEFT: Category tabs */}
      <div className="skill-tabs">
        {categories.map((cat, idx) => {
          const CatIcon = cat.icon;
          return (
            <button
              key={cat.title}
              className={`skill-tabs-btn cursor-pointer ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CatIcon size={14} />
                {cat.title}
              </span>
              <span className="skill-count">{cat.items.length}</span>
            </button>
          );
        })}
      </div>

      {/* RIGHT: Skill bars */}
      <div className="skill-list">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <IconComp size={16} style={{ color: 'var(--purple-bright)' }} />
          <span style={{ color: 'var(--text)', fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            {active.title}
          </span>
          <span style={{ marginLeft: 'auto', color: 'var(--faint)', fontSize: '9px', fontFamily: 'var(--font-mono)' }}>
            {active.items.length} SKILLS
          </span>
        </div>

        {active.items.map((skill) => {
          const lvl = skillLevels[skill] || { pct: 70, label: 'Proficient' };
          const color = getLevelColor(lvl.pct);
          return (
            <div key={skill} className="skill-row">
              <div className="skill-row-heading">
                <span>{skill}</span>
                <small>{lvl.label}</small>
              </div>
              <div className="skill-bar">
                <span style={{ width: `${lvl.pct}%`, background: `linear-gradient(90deg, ${color}, var(--cyan))` }} />
              </div>
              <strong style={{ color }}>{lvl.pct}%</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Redesigned 3D Showcase Carousel for Certifications (Theme Card Design) ── */
const CertificateCarousel = ({ certificates = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = certificates.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  if (!certificates || certificates.length === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Track Stage with Smooth Edge Fading */}
      <div
        className="relative w-full h-[370px] sm:h-[350px] flex items-center justify-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Left & Right Soft Fade Overlays for Smooth Ending */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-30 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(9, 10, 15, 0.95) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-30 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(9, 10, 15, 0.95) 0%, transparent 100%)",
          }}
        />
        {certificates.map((cert, idx) => {
          let diff = (idx - activeIndex) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isActive = diff === 0;
          const isPrev = diff === -1;
          const isNext = diff === 1;
          const isVisible = isActive || isPrev || isNext;

          const gStyle = projectGradients[idx % projectGradients.length];

          // Compute animation styles
          let x = "0%";
          let scale = 1;
          let opacity = 1;
          let zIndex = 20;

          if (isActive) {
            x = "0%";
            scale = 1;
            opacity = 1;
            zIndex = 25;
          } else if (isPrev) {
            x = "-74%";
            scale = 0.92;
            opacity = 0.38;
            zIndex = 10;
          } else if (isNext) {
            x = "74%";
            scale = 0.92;
            opacity = 0.38;
            zIndex = 10;
          } else {
            x = diff > 0 ? "150%" : "-150%";
            scale = 0.8;
            opacity = 0;
            zIndex = 1;
          }

          return (
            <motion.div
              key={cert.id}
              initial={false}
              animate={{
                x,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              onClick={() => {
                if (isPrev) prevSlide();
                if (isNext) nextSlide();
              }}
              className={`absolute top-0 bottom-0 m-auto w-[88%] sm:w-[480px] md:w-[540px] max-w-[560px] h-[315px] select-none ${
                isActive ? "pointer-events-auto" : isVisible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
              }`}
              style={{
                filter: "none", // STRICTLY NO BLUR, per user request: "littlle low opcaity but not blur"
              }}
            >
              <article
                className="project-card academic-project-card w-full h-full flex flex-col justify-between"
                style={{
                  background: gStyle.bg,
                  backgroundColor: '#0c101c',
                  border: isActive ? `1.5px solid ${gStyle.accent}` : gStyle.border,
                  opacity: isActive ? 1 : 0.95,
                  boxShadow: isActive
                    ? `0 24px 50px rgba(0,0,0,0.7), 0 0 35px ${gStyle.eyebrowColor}40`
                    : "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                {/* Visual Header Strip — Theme Card Design */}
                <div className="project-visual" style={{ height: "98px" }}>
                  <span className="project-index">CERT · 0{idx + 1}</span>
                  <div
                    className="project-open"
                    style={{ borderColor: gStyle.accent + "60", color: gStyle.accent }}
                  >
                    <AnimatedIcon
                      Icon={cert.type === "Bootcamp" ? BookOpen : Award}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="visual-window">
                    <div className="window-bar"><span /><span /><span /></div>
                    <div className="visual-lines"><i /><i /><i /><i /><i /></div>
                  </div>
                  <div className="visual-node node-a" />
                  <div className="visual-node node-b" />
                  <div className="visual-connector" />
                </div>

                {/* Body — Theme Card Design */}
                <div className="project-body flex-1 flex flex-col justify-between py-4 px-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="project-eyebrow" style={{ color: gStyle.eyebrowColor }}>
                        {cert.type.toUpperCase()}
                      </div>
                      <span className="text-xs font-mono" style={{ color: gStyle.accent }}>
                        {cert.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="project-footer mt-auto pt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
                      <Award className="w-3.5 h-3.5" style={{ color: gStyle.accent }} />
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified Credential
                    </span>
                  </div>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 px-2 max-w-xl mx-auto">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/15 text-gray-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {certificates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "w-8 h-2.5 rounded-full bg-ambient-blue shadow-[0_0_15px_rgba(59,130,246,0.9)]"
                  : "w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-xs text-gray-400 font-mono">
          0{activeIndex + 1} / 0{total}
        </span>
      </div>
    </div>
  );
};

/* ── Academic Project Card with Animated Independent Expansion ── */
const AcademicProjectCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const gStyle = projectGradients[index % projectGradients.length];
  const bullets = item.bullets || [];
  const firstBullet = bullets[0];
  const remainingBullets = bullets.slice(1);

  return (
    <article
      className="project-card academic-project-card flex flex-col justify-between"
      style={{ background: gStyle.bg, border: gStyle.border }}
    >
      {/* Visual Header */}
      <div className="project-visual" style={{ height: "110px" }}>
        <span className="project-index">0{index + 1}</span>
        <a
          href="https://github.com/OfficialAshutosh2412"
          target="_blank"
          rel="noopener noreferrer"
          className="project-open"
          title="View Repository"
          style={{ borderColor: `${gStyle.accent}60`, color: gStyle.accent }}
        >
          <ArrowUpRight size={15} />
        </a>
        <div className="visual-window">
          <div className="window-bar"><span /><span /><span /></div>
          <div className="visual-lines"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="visual-node node-a" />
        <div className="visual-node node-b" />
        <div className="visual-connector" />
      </div>

      {/* Body */}
      <div className="project-body flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="project-eyebrow" style={{ color: gStyle.eyebrowColor }}>
              ACADEMIC &amp; THESIS
            </div>
            <span className="text-xs font-mono" style={{ color: gStyle.accent }}>
              2023–2024
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {item.title}
          </h3>

          {/* First / Primary bullet always shown */}
          {firstBullet && (
            <ul className="space-y-2.5 text-xs md:text-sm text-gray-300 leading-relaxed mb-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: gStyle.accent }} />
                <span>{firstBullet}</span>
              </li>
            </ul>
          )}

          {/* Smooth animated extra bullets */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-2.5 text-xs md:text-sm text-gray-300 leading-relaxed pt-1 pb-3">
                  {remainingBullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: gStyle.accent }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="project-footer mt-auto pt-3 flex items-center justify-between gap-3">
          <div className="stack-list">
            {(item.techStack || []).slice(0, 5).map((tech, tIdx) => (
              <span key={tIdx}>{tech}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {remainingBullets.length > 0 && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="button button-quiet text-xs py-1.5 px-2.5 min-h-0 cursor-pointer"
                style={{ fontSize: "11px", gap: "4px", borderColor: `${gStyle.accent}40`, color: gStyle.accent }}
              >
                <span>{isExpanded ? "See less" : "See more"}</span>
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
            <a
              href="https://github.com/OfficialAshutosh2412"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-quiet text-xs py-1.5 px-3 min-h-0"
              style={{ fontSize: "11px", gap: "5px" }}
            >
              <GitHubIcon className="w-3 h-3" />
              <span>Repository</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ── Experience Card with Animated Independent Expansion ── */
const ExperienceCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ExpIcon = getExpIcon(item.role, item.company);
  const gStyle = projectGradients[index % projectGradients.length];
  const techList = getExpTechStack(item);
  const bullets = item.bullets || [];
  const firstBullet = bullets[0];
  const remainingBullets = bullets.slice(1);

  return (
    <article
      className="project-card academic-project-card flex flex-col justify-between"
      style={{ background: gStyle.bg, border: gStyle.border }}
    >
      <div className="project-visual" style={{ height: "110px" }}>
        <span className="project-index">EXP · 0{index + 1}</span>
        <div
          className="project-open"
          style={{ borderColor: `${gStyle.accent}60`, color: gStyle.accent }}
          title={item.company}
        >
          <ExpIcon size={15} />
        </div>
        <div className="visual-window">
          <div className="window-bar"><span /><span /><span /></div>
          <div className="visual-lines"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="visual-node node-a" />
        <div className="visual-node node-b" />
        <div className="visual-connector" />
      </div>

      <div className="project-body flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="project-eyebrow" style={{ color: gStyle.eyebrowColor }}>
              {item.role.toLowerCase().includes("internship") ? "SUMMER INTERNSHIP" : "INDUSTRIAL TRAINING"}
            </div>
            <span className="text-xs font-mono" style={{ color: gStyle.accent }}>
              {item.period}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.role}</h3>
          <div className="text-xs font-mono text-muted mb-4 flex items-center gap-1.5">
            <Building2 size={13} style={{ color: gStyle.accent }} />
            <span className="text-gray-200 font-semibold">{item.company}</span>
            <span>•</span>
            <span>{item.location}</span>
          </div>

          {/* First bullet always shown */}
          {firstBullet && (
            <ul className="space-y-2.5 text-xs md:text-sm text-gray-300 leading-relaxed mb-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: gStyle.accent }} />
                <span>{firstBullet}</span>
              </li>
            </ul>
          )}

          {/* Smooth animated extra bullets */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-2.5 text-xs md:text-sm text-gray-300 leading-relaxed pt-1 pb-3">
                  {remainingBullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: gStyle.accent }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="project-footer mt-auto pt-3 flex items-center justify-between gap-3">
          <div className="stack-list">
            {techList.map((tech, tIdx) => (
              <span key={tIdx}>{tech}</span>
            ))}
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> Verified Training
            </span>
            {remainingBullets.length > 0 && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="button button-quiet text-xs py-1.5 px-2.5 min-h-0 cursor-pointer"
                style={{ fontSize: "11px", gap: "4px", borderColor: `${gStyle.accent}40`, color: gStyle.accent }}
              >
                <span>{isExpanded ? "See less" : "See more"}</span>
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

/* ══════════════════════════════════════════════ */
const Portfolio = () => {
  const [data, setData] = useState(portfolioData);
  const location = useLocation();
  const { openContactDrawer } = useContactDrawer();

  // Mouse Parallax for Header
  const headerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const headerRotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), {
    stiffness: 100,
    damping: 20,
  });
  const headerRotateY = useSpring(useTransform(mouseX, [-400, 400], [-5, 5]), {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    fetchPortfolioData().then((res) => {
      if (res?.data) setData(res.data);
    });
  }, []);

  useEffect(() => {
    if (location.hash) {
      if (location.hash === "#contact") {
        openContactDrawer();
      } else {
        const el = document.querySelector(location.hash);
        if (el)
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location, openContactDrawer]);

  const rafId = useRef(null);
  const handleHeaderMouseMove = (e) => {
    if (!headerRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    if (rafId.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafId.current = requestAnimationFrame(() => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        mouseX.set(clientX - (rect.left + rect.width / 2));
        mouseY.set(clientY - (rect.top + rect.height / 2));
      }
      rafId.current = null;
    });
  };

  const handleHeaderMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeData = data || portfolioData;
  const headerInfo = activeData.header || {};
  const skillsData = activeData.technicalSkills || {};

  const skillCategories = [
    { title: "Languages", icon: Terminal, items: skillsData.languages || [] },
    { title: "Backend", icon: Code2, items: skillsData.backend || [] },
    { title: "Front-End", icon: Layers, items: skillsData.frontend || [] },
    { title: "Database", icon: Database, items: skillsData.database || [] },
    { title: "Tools", icon: Wrench, items: skillsData.tools || [] },
  ];

  return (
    <div className="portfolio-page-wrapper w-full">

      {/* ── Portfolio Hero Section — Two-Column: Left Text + Right Avatar ── */}
      <section className="shell hero-section" style={{ minHeight: 'auto', padding: '100px 0 60px' }}>
        {/* LEFT — Big text copy */}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> ACADEMIC &amp; RESUME PORTFOLIO
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-normal leading-[1.06]" style={{ overflow: 'visible' }}>
            Engineering<br />
            <span style={{ display: 'inline-block', paddingRight: '0.18em' }}>credentials</span><br />
            built on proof.
          </h1>
          <p className="hero-lede hero-lede-large" style={{ marginTop: '22px' }}>
            MCA graduate &amp; Full-Stack .NET Engineer. Verified academic record,
            project blueprints, industrial training &amp; technical skills.
          </p>

          <div className="hero-actions">
            <a href="/resume.pdf" target='_blank' download
              className="button button-primary cursor-pointer"
            >
              Download Resume
            </a>
            <button
              className="button button-quiet cursor-pointer"
              onClick={openContactDrawer}
            >
              <Mail size={16} /> Contact Me
            </button>
            <Link to="/" className="button button-quiet cursor-pointer">
              <ArrowLeft size={16} /> Back to Main Site
            </Link>
          </div>

          <div className="hero-proof mt-8">
            <div>
              <strong>8.24</strong>
              <span>MCA CGPA (AKTU)</span>
            </div>
            <div>
              <strong>4+</strong>
              <span>Showcase Projects</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Verified Credentials</span>
            </div>
          </div>
        </div>

        {/* RIGHT — 3D Interactive Stage with Avatar (matches MainSite hero) */}
        <div className="hero-stage-wrap portfolio-hero-stage">
          {/* Perspective Grid */}
          <div className="hero-stage-grid" aria-hidden="true" />

          {/* Central Floating Avatar (replaces core-card) */}
          <div className="portfolio-avatar-core">
            <div className="avatar-image-wrap">
              <img
                src={avatarPhoto}
                alt="Ashutosh Prasad"
                width={340}
                height={340}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          {/* Floating credential badges (same pattern as tech-badges) */}
          <div className="tech-badge tech-csharp" style={{ '--badge-index': 0 }}>
            <div className="tech-badge-icon"><GraduationCap size={13} /></div>
            <span>MCA · 8.24</span>
          </div>
          <div className="tech-badge tech-dotnet" style={{ '--badge-index': 1 }}>
            <div className="tech-badge-icon"><Code2 size={13} /></div>
            <span>ASP.NET Core</span>
          </div>
          <div className="tech-badge tech-azure" style={{ '--badge-index': 2 }}>
            <div className="tech-badge-icon"><Database size={13} /></div>
            <span>SQL Server</span>
          </div>
          <div className="tech-badge tech-sql" style={{ '--badge-index': 3 }}>
            <div className="tech-badge-icon"><Atom size={13} /></div>
            <span>React.js</span>
          </div>
          <div className="tech-badge tech-react" style={{ '--badge-index': 4 }}>
            <div className="tech-badge-icon"><Terminal size={13} /></div>
            <span>C# / .NET</span>
          </div>
          <div className="tech-badge tech-docker" style={{ '--badge-index': 5 }}>
            <div className="tech-badge-icon"><ShieldCheck size={13} /></div>
            <span>JWT Auth</span>
          </div>
          <div className="tech-badge tech-redis" style={{ '--badge-index': 6 }}>
            <div className="tech-badge-icon"><Globe size={13} /></div>
            <span>RESTful APIs</span>
          </div>
          <div className="tech-badge tech-grpc" style={{ '--badge-index': 7 }}>
            <div className="tech-badge-icon"><Layers size={13} /></div>
            <span>EF Core</span>
          </div>
        </div>
      </section>

      {/* ── Main Content Container (Contained Shell Width) ── */}
      <div className="shell page-content space-y-16">

        {/* ─────────────────────────────────────────────────────────────
           SECTION 01: PROFESSIONAL SUMMARY
        ─────────────────────────────────────────────────────────────── */}
        {/* <section id="summary" className="section scroll-mt-28">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">01</span>
              <h2>Professional <em>Summary</em></h2>
            </div>
          </div>

          <div
            className="project-card accent-cyan p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(118, 84, 232, 0.16))',
              border: '1px solid rgba(34, 211, 238, 0.28)'
            }}
          >
            <div className="flex gap-6 items-start">
              <div className="w-1.5 h-20 rounded-full bg-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] shrink-0 mt-1" />
              <div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed font-normal">
                  {data.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "C#",
                    "ASP.NET Core Web API",
                    "ASP.NET MVC",
                    "React.js",
                    "SQL Server",
                    "Entity Framework Core",
                    "RESTful APIs",
                    "JWT Auth"
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-purple/15 text-purple-bright border border-purple/30 shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* ─────────────────────────────────────────────────────────────
           SECTION 01: ACADEMIC & SHOWCASE PROJECTS
        ─────────────────────────────────────────────────────────────── */}
        <section id="projects" className="section scroll-mt-28">
          <div className="section-heading split-heading mb-10 md:mb-12">
            <div>
              <span className="section-number">01</span>
              <h2>Academic <em>Showcase Projects</em></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {(data.academicProjects || []).map((item, i) => (
              <AcademicProjectCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 02: TECHNICAL SKILLS MATRIX
        ─────────────────────────────────────────────────────────────── */}
        {/* Full-width marquee OUTSIDE shell — bleeds edge to edge */}
        <div id="skills" className="scroll-mt-28" style={{ marginTop: '121px' }}>
          <SkillsMarquee />

          {/* Title + Slider inside shell, BELOW the marquee */}
          <div className="shell" style={{ marginTop: '56px' }}>
            <div className="section-heading split-heading mb-10 md:mb-12">
              <div>
                <span className="section-number">02</span>
                <h2>Technical <em>Skills Matrix</em></h2>
              </div>
            </div>
            <SkillsSlider categories={skillCategories} />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 03: INTERNSHIP & INDUSTRIAL TRAINING (THEME CARDS)
        ─────────────────────────────────────────────────────────────── */}
        <section id="experience" className="section scroll-mt-28">
          <div className="section-heading split-heading mb-10 md:mb-12">
            <div>
              <span className="section-number">03</span>
              <h2>Experience &amp; <em>Industrial Training</em></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {(data.experience || []).map((item, i) => (
              <ExperienceCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 04: EDUCATION & CERTIFICATIONS (THEME CARDS)
        ─────────────────────────────────────────────────────────────── */}
        <section id="education" className="section scroll-mt-28">
          <div className="section-heading split-heading mb-10 md:mb-12">
            <div>
              <span className="section-number">04</span>
              <h2>Verified <em>Academic Education</em></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
            {(data.education || []).map((item, i) => {
              const SchoolIcon = getSchoolIcon(item.iconType);
              const gStyle = projectGradients[i % projectGradients.length];
              const isMasters = i === 0;

              return (
                <article
                  key={item.id}
                  className="project-card academic-project-card flex flex-col justify-between"
                  style={{ background: gStyle.bg, border: gStyle.border }}
                >
                  <div className="project-visual" style={{ height: '110px' }}>
                    <span className="project-index">EDU · 0{i + 1}</span>
                    <div
                      className="project-open"
                      style={{ borderColor: gStyle.accent + '60', color: gStyle.accent }}
                      title={item.institution}
                    >
                      <SchoolIcon size={15} />
                    </div>
                    <div className="visual-window">
                      <div className="window-bar"><span /><span /><span /></div>
                      <div className="visual-lines"><i /><i /><i /><i /><i /></div>
                    </div>
                    <div className="visual-node node-a" />
                    <div className="visual-node node-b" />
                    <div className="visual-connector" />
                  </div>

                  <div className="project-body flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="project-eyebrow" style={{ color: gStyle.eyebrowColor }}>
                          {isMasters ? 'POSTGRADUATE DEGREE · AKTU' : 'UNDERGRADUATE DEGREE · LU'}
                        </div>
                        <span className="text-xs font-mono" style={{ color: gStyle.accent }}>{item.period}</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.degree}</h3>
                      <div className="text-xs text-muted mb-5 flex items-center gap-1.5">
                        <School size={13} style={{ color: gStyle.accent }} />
                        <span>{item.institution}</span>
                      </div>

                      {item.score && (
                        <div className="p-3 rounded-xl border border-white/5 bg-black/30 mb-6 flex justify-between items-center">
                          <span className="text-xs text-gray-400 font-mono">Official Score Record</span>
                          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {item.score}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="project-footer mt-auto pt-3 flex items-center justify-between">
                      <div className="stack-list">
                        {(isMasters
                          ? ['ASP.NET Core', 'C#', 'SQL Server', 'React.js', 'Data Structures']
                          : ['C / C++', 'Java Basics', 'Database Concepts', 'Web Basics']
                        ).map((tag, tIdx) => (
                          <span key={tIdx}>{tag}</span>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-purple-bright flex items-center gap-1 shrink-0">
                        <GraduationCap size={13} /> Degree Verified
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Subheading for Certifications with generous margin-top and margin-bottom */}
          <div className="mt-14 pt-8 border-t border-white/5">
            <div className="section-heading split-heading mb-10 md:mb-12">
              <div>
                <span className="section-number">04.B</span>
                <h2>Training &amp; <em>Certifications</em></h2>
              </div>
            </div>

            <CertificateCarousel certificates={data.certificates} />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 05: CONTACT CTA BANNER
        ─────────────────────────────────────────────────────────────── */}
        <section id="contact" className="section contact-section scroll-mt-28">
          <div className="contact-card">
            <div className="contact-stamp">
              <span>ASHUTOSH PRASAD</span>
              <br />
              LUCKNOW, INDIA
              <br />
              RESUME &amp; CV PORTFOLIO
            </div>

            <div className="contact-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" /> GET IN TOUCH
              </div>
              <h2>Let’s Discuss Full-Stack &amp; .NET Opportunities</h2>
              <p>
                Available for software engineering roles, C#/.NET backend positions, and technical collaborations.
              </p>

              <div className="contact-actions">
                <button
                  className="button button-primary cursor-pointer"
                  onClick={openContactDrawer}
                >
                  <Mail size={16} /> Contact Me Now
                </button>
                <a href="/resume.pdf" target="_blank" download
                  className="button button-quiet cursor-pointer"
                >
                  Download Resume
                </a>
              </div>
            </div>

            <div className="contact-meta">
              <span><MapPin size={12} /> {portfolioData.header.location}</span>
              <a href={`mailto:${portfolioData.header.email}`}>
                <Mail size={12} /> {portfolioData.header.email}
              </a>
              <a href={`tel:${portfolioData.header.phone}`}>
                <Phone size={12} /> {portfolioData.header.phone}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default Portfolio;
