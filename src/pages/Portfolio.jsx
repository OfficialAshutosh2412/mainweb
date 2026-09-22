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
import { downloadResume } from "../components/Navbar";
import { portfolioData } from "../api/mockData";
import avatarPhoto from "../assets/photo_one.png";

/* ── Random gradient pool for academic project cards ── */
const projectGradients = [
  {
    bg: 'linear-gradient(135deg, rgba(118,84,232,0.14) 0%, rgba(34,211,238,0.10) 100%)',
    border: '1px solid rgba(118,84,232,0.32)',
    accent: '#9c87ff',
    eyebrowColor: '#9c87ff',
  },
  {
    bg: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(16,185,129,0.14) 100%)',
    border: '1px solid rgba(34,211,238,0.30)',
    accent: '#22d3ee',
    eyebrowColor: '#22d3ee',
  },
  {
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.14) 100%)',
    border: '1px solid rgba(168,85,247,0.30)',
    accent: '#c084fc',
    eyebrowColor: '#c084fc',
  },
  {
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(239,68,68,0.14) 100%)',
    border: '1px solid rgba(245,158,11,0.28)',
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

/* ── Inf/* Proficiency lookup (out of 100) */
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
              <TiltCard key={cert.id} className="h-full w-full" maxTilt={3.5}>
                <div className="h-full w-full p-8 rounded-2xl glass-card border border-white/10 relative overflow-hidden z-10 group hover:border-ambient-blue/50 transition-all duration-300 flex flex-col justify-between shadow-xl min-h-\[220px]\">
                  <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                    <AnimatedIcon
                      Icon={cert.type === "Bootcamp" ? BookOpen : Award}
                      className="w-32 h-32 text-ambient-blue"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-ambient-blue bg-ambient-blue/15 px-3.5 py-1 rounded-full uppercase tracking-wider border border-ambient-blue/30 shadow-sm">
                        {cert.type}
                      </span>
                      <span className="text-ambient-blue font-bold font-mono text-sm">
                        {cert.year}
                      </span>
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
          {currentPage * 2 + 1}-
          {Math.min((currentPage + 1) * 2, certificates.length)} /{" "}
          {certificates.length}
        </span>
      </div>
    </div>
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
    <div className="portfolio-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {/* ── Portfolio Hero Section — Two-Column: Left Text + Right Avatar ── */}
      <section className="shell hero-section" style={{ minHeight: 'auto', padding: '100px 0 60px' }}>
        {/* LEFT — Big text copy */}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> ACADEMIC &amp; RESUME PORTFOLIO
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Engineering<br />
            <span>credentials</span><br />
            built on proof.
          </h1>
          <p className="hero-lede hero-lede-large" style={{ marginTop: '22px' }}>
            MCA graduate &amp; Full-Stack .NET Engineer. Verified academic record,
            project blueprints, industrial training &amp; technical skills.
          </p>

          <div className="hero-actions">
            <button
              className="button button-primary cursor-pointer"
              onClick={downloadResume}
            >
              <Download size={16} /> Download résumé
            </button>
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

          {/* 3D Orbit Rings */}
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="orbit orbit-three" aria-hidden="true" />

          {/* Central Floating Avatar (replaces core-card) */}
          <div className="portfolio-avatar-core">
            <div className="avatar-image-wrap">
              <img src={avatarPhoto} alt="Ashutosh Prasad" />
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

          {/* Stage Caption */}
          <div className="stage-caption">
            <span>ASHUTOSH</span> ACADEMIC PORTFOLIO · VERIFIED
          </div>
        </div>
      </section>

      {/* ── Main Content Container (Contained Shell Width) ── */}
      <div className="shell page-content space-y-16">

        {/* ─────────────────────────────────────────────────────────────
           SECTION 01: PROFESSIONAL SUMMARY
        ─────────────────────────────────────────────────────────────── */}
        <section id="summary" className="section scroll-mt-28">
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
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 02: ACADEMIC & SHOWCASE PROJECTS
        ─────────────────────────────────────────────────────────────── */}
        <section id="projects" className="section scroll-mt-28">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">02</span>
              <h2>Academic <em>Showcase Projects</em></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(data.academicProjects || []).map((item, i) => {
              const gStyle = projectGradients[i % projectGradients.length];
              return (
                <article
                  key={item.id}
                  className="project-card academic-project-card"
                  style={{ background: gStyle.bg, border: gStyle.border }}
                >
                  {/* Visual header strip — same style as MainSite cards */}
                  <div className="project-visual" style={{ minHeight: '110px' }}>
                    <span className="project-index">0{i + 1}</span>
                    <a
                      href="https://github.com/OfficialAshutosh2412"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-open"
                      title="View Repository"
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
                  <div className="project-body">
                    <div className="flex justify-between items-center mb-2">
                      <div className="project-eyebrow" style={{ color: gStyle.eyebrowColor }}>ACADEMIC &amp; THESIS</div>
                      <span className="text-xs font-mono" style={{ color: gStyle.accent }}>2023–2024</span>
                    </div>

                    <h3>{item.title}</h3>

                    {/* Only 2 lines of description */}
                    <p className="project-description" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {(item.bullets || []).join(' — ')}
                    </p>

                    {/* Tech stack as plain text tags — no white border */}
                    <div className="project-footer" style={{ marginTop: 'auto' }}>
                      <div className="stack-list">
                        {(item.techStack || []).slice(0, 5).map((tech, tIdx) => (
                          <span key={tIdx}>{tech}</span>
                        ))}
                      </div>
                      <a
                        href="https://github.com/OfficialAshutosh2412"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-quiet text-xs py-1.5 px-3 min-h-0"
                        style={{ fontSize: '11px', gap: '5px' }}
                      >
                        <GitHubIcon className="w-3 h-3" />
                        <span>Repository</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 03: TECHNICAL SKILLS MATRIX
        ─────────────────────────────────────────────────────────────── */}
        {/* Full-width marquee OUTSIDE shell — bleeds edge to edge */}
        <div id="skills" className="scroll-mt-28" style={{ marginTop: '121px' }}>
          <SkillsMarquee />

          {/* Title + Slider inside shell, BELOW the marquee */}
          <div className="shell" style={{ marginTop: '48px' }}>
            <div className="section-heading split-heading">
              <div>
                <span className="section-number">03</span>
                <h2>Technical <em>Skills Matrix</em></h2>
              </div>
            </div>
            <SkillsSlider categories={skillCategories} />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 04: INTERNSHIP & INDUSTRIAL TRAINING
        ─────────────────────────────────────────────────────────────── */}
        <section id="experience" className="section scroll-mt-28">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">04</span>
              <h2>Experience &amp; <em>Industrial Training</em></h2>
            </div>
          </div>

          <div className="space-y-6">
            {(data.experience || []).map((item) => {
              const ExpIcon = getExpIcon(item.role, item.company);
              return (
                <div
                  key={item.id}
                  className="project-card accent-cyan p-8 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(9, 10, 15, 0.95), rgba(34, 211, 238, 0.06))',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-line">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-purple/15 text-purple-bright border border-purple/30 shrink-0">
                        <ExpIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {item.role}
                        </h3>
                        <div className="text-purple-bright text-xs font-mono flex items-center gap-2">
                          <span>{item.company}</span>
                          <span>•</span>
                          <span className="text-muted">{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan bg-cyan/10 px-3 py-1.5 rounded-full border border-cyan/20">
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-gray-300 text-sm leading-relaxed">
                    {(item.bullets || []).map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 05: EDUCATION & CERTIFICATIONS
        ─────────────────────────────────────────────────────────────── */}
        <section id="education" className="section scroll-mt-28">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">05</span>
              <h2>Education &amp; <em>Certifications</em></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {(data.education || []).map((item) => {
              const SchoolIcon = getSchoolIcon(item.iconType);
              return (
                <div
                  key={item.id}
                  className="project-card p-8 rounded-2xl flex flex-col justify-between"
                  style={{
                    background: 'linear-gradient(135deg, rgba(9, 10, 15, 0.95), rgba(118, 84, 232, 0.08))',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 rounded-xl bg-purple/15 text-purple-bright border border-purple/30">
                        <SchoolIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-purple-bright bg-purple/10 px-3 py-1 rounded-full border border-purple/20">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.degree}
                    </h3>
                    <p className="text-xs text-muted mb-4">{item.institution}</p>
                  </div>

                  {item.score && (
                    <div className="pt-3 border-t border-line flex justify-between items-center text-xs font-mono">
                      <span className="text-muted">Academic Score:</span>
                      <span className="font-bold text-green">{item.score}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <CertificateCarousel certificates={data.certificates} />
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 06: CONTACT CTA BANNER
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
                <button
                  className="button button-quiet cursor-pointer"
                  onClick={downloadResume}
                >
                  <Download size={15} /> Download résumé
                </button>
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
