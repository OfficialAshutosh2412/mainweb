import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import TiltCard from '../components/TiltCard';
import RoleDial from '../components/RoleDial';
import { useContactDrawer } from '../context/ContactContext';
import { getTechIcon } from './Projects';

import {
  ArrowRight, FileText, Play, ShoppingCart, Mail,
  Code, ShieldCheck, CheckCircle, Sparkles, User,
  Zap, Clock
} from 'lucide-react';
import contactParallaxBg from '../assets/contact_parallax_bg.jpg';

/* ─────────── JSX-bracket section heading with 3D glow ─────────── */
const SectionHeading = ({ icon: Icon, title, id }) => (
  <div id={id} className="flex items-center gap-3 mb-8 md:mb-12 scroll-mt-28">
    {Icon && (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="p-2.5 rounded-2xl bg-ambient-blue/10 border border-ambient-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-ambient-blue shrink-0"
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </motion.div>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
      <span className="text-ambient-blue font-black">&lt;</span>
      <span className="text-white">{title}</span>
      <span className="text-ambient-blue font-black ml-1">/&gt;</span>
    </h2>
  </div>
);

/* ─────────── "See More" 3D animated link ─────────── */
const SeeMoreLink = ({ to, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex justify-center mt-12"
  >
    <Link
      to={to}
      className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 hover:border-ambient-blue/60 bg-white/5 hover:bg-ambient-blue/15 text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span>{label}</span>
      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300 text-ambient-blue group-hover:text-white" />
    </Link>
  </motion.div>
);

/* ─────────── 3D Store item card ─────────── */
const StoreItem = ({ project, delay }) => {
  return (
    <TiltCard delay={delay} className="h-full">
      <div className="p-6 rounded-2xl h-full flex flex-col justify-between glass-card border border-white/10 hover:border-ambient-blue/50 transition-all duration-300 group">
        <div className="flex-1">
          {/* Title in one line */}
          <div className="mb-4">
            <h4
              className="text-base sm:text-lg font-bold text-white group-hover:text-ambient-blue transition-colors truncate"
              title={project.title}
            >
              {project.title}
            </h4>
          </div>

          {project.tech && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {project.tech.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] text-gray-300 font-mono flex items-center gap-1.5 shadow-sm">
                  {getTechIcon(t)}
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul className="space-y-2 mb-6 text-xs text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Source Code Included
            </li>
            {project.hasDocumentation && (
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Full Architecture Docs
              </li>
            )}
            {project.hasThesis && (
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Academic Project Blueprint
              </li>
            )}
          </ul>
        </div>

        {/* Repositioned Pricing and Action Button */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">Price</span>
            <span className="text-xl font-black text-ambient-blue">{project.price}</span>
          </div>
          <button className="flex-1 py-3 px-3.5 rounded-xl font-bold transition-all bg-white/10 text-white hover:bg-ambient-blue hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2">
            <ShoppingCart size={15} />
            <span>Purchase Thesis & Code</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
};

/* ─────────── Redesigned 2-Section Contact Banner with Parallax ─────────── */
const ContactSplitBanner = ({ onOpenContact }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* ── Left Section: Dark Mode with Fixed on Scroll Parallax Background Image & Overlaid Details ── */}
      <div
        ref={containerRef}
        className="lg:col-span-7 rounded-3xl relative overflow-hidden border border-ambient-blue/30 transition-colors duration-500 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-8 sm:p-10"
      >
        {/* Parallax Background Image (Driven purely by scroll, no hover tracking or hover scale) */}
        <motion.div
          style={{ y: scrollParallaxY }}
          className="absolute -top-12 -bottom-12 inset-x-0 w-full pointer-events-none"
        >
          <img
            src={contactParallaxBg}
            alt="Futuristic cybernetic city grid"
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15]"
          />
        </motion.div>

        {/* Dark Vignette / Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/75 to-dark-bg/40 backdrop-blur-[1.5px] pointer-events-none" />

        {/* Content Over the Background */}
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ambient-blue/25 text-ambient-blue border border-ambient-blue/40 text-xs font-mono font-semibold backdrop-blur-md">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiry & Collaboration</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
            Let's Build Something <br className="hidden sm:inline" />
            <span className="text-ambient-blue">Exceptional</span> Together
          </h3>

          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-normal">
            Available for full-time software engineering roles, technical architecture consulting, full-stack web platforms, and cutting-edge UI engineering.
          </p>
        </div>

        {/* Highlights / Details Over the Background */}
        <div className="relative z-10 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-200">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Response time: &lt; 24 hours</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-ambient-blue shrink-0" />
            <span>Open to Remote & Global Work</span>
          </div>
        </div>
      </div>

      {/* ── Right Section: Background Coloured Theme Hub ── */}
      <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-blue-700 via-ambient-blue to-blue-900 border border-blue-400/50 p-8 sm:p-10 flex flex-col justify-between items-center text-center relative overflow-hidden group shadow-[0_20px_50px_-15px_rgba(59,130,246,0.5)] text-white">
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />

        <div className="space-y-4 my-auto py-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/30 text-white mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)] group-hover:scale-110 transition-transform duration-300">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Start a Conversation
          </h4>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto font-normal">
            Ready to discuss a new project, technical requirements, or immediate opportunities? Let's connect.
          </p>
        </div>

        <div className="w-full pt-4 space-y-3 relative z-10">
          <button
            onClick={onOpenContact}
            className="w-full py-4 px-6 bg-white hover:bg-blue-50 text-blue-950 font-black rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-95 text-sm sm:text-base group/btn"
          >
            <Mail className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300 text-blue-900" />
            <span>Contact Me Now</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 text-blue-900" />
          </button>

          <p className="text-[11px] text-blue-200 font-mono">
            Opens instant direct messenger
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── Main Component ─────────────────── */
const MainSite = () => {
  const [data, setData] = useState(null);
  const heroRef = useRef(null);

  // Smooth mouse tracking for Hero 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRotateX = useSpring(useTransform(mouseY, [-300, 300], [7, -7]), { stiffness: 120, damping: 20 });
  const heroRotateY = useSpring(useTransform(mouseX, [-500, 500], [-7, 7]), { stiffness: 120, damping: 20 });
  const heroParallaxX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), { stiffness: 120, damping: 20 });
  const heroParallaxY = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), { stiffness: 120, damping: 20 });

  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 1000], [0, 220]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const location    = useLocation();

  const { openContactDrawer } = useContactDrawer();

  useEffect(() => {
    fetchMainData().then(res => setData(res.data));
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

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  // Limit items shown on home page
  const previewNotes  = data.notes.slice(0, 3);
  const previewVideos = data.youtubeVideos.slice(0, 3);
  const previewStore  = data.storeProjects.minor.slice(0, 3);

  return (
    <div className="bg-transparent text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-x-hidden">

      {/* ── 3D Parallax Hero Section ── */}
      <motion.section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 pt-24 sm:pt-28 pb-12 perspective-1000"
      >
        {/* Floating 3D Status Radar Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ x: heroParallaxX, y: heroParallaxY }}
          className="mb-8 z-20"
        >
          <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:border-ambient-blue/50 transition-all duration-300 group cursor-pointer"
               onClick={openContactDrawer}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="text-xs font-semibold text-gray-200 tracking-wide">Available for Full-Time & Freelance Projects</span>
            <Sparkles className="w-3.5 h-3.5 text-ambient-blue group-hover:rotate-12 transition-transform" />
          </div>
        </motion.div>

        {/* Hero Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center z-10 w-full max-w-6xl mx-auto"
        >
          {/* Full-Screen Liquid Typography Role Revealer Carousel */}
          <RoleDial />
        </motion.div>
      </motion.section>

      {/* ── Main Content Sections ── */}
      <div className="flex-1 relative z-10 pb-20 md:pb-32 max-w-6xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-36 md:space-y-48 w-full">

        {/* Showcase Projects with 3D Tilt Cards */}
        <section>
          <div className="flex flex-wrap justify-between items-end mb-0 gap-2">
            <SectionHeading id="showcase" icon={Code} title="Showcase Projects" />
            <Link
              to="/projects"
              className="text-ambient-blue hover:text-white font-semibold transition-colors flex items-center gap-2 group mb-8 md:mb-12 text-sm"
            >
              See All Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {data.showcaseProjects.map((project, i) => (
              <RevealingCard key={project.id} delay={i * 0.1}>
                <div className={`p-8 h-full rounded-2xl relative overflow-hidden transition-all group flex flex-col justify-between min-h-[380px] ${
                  i === 0
                    ? 'bg-gradient-to-br from-[#0e1118]/95 to-black/95 border border-white/10'
                    : 'bg-gradient-to-br from-blue-950/70 via-blue-900/30 to-[#0e1118]/95 border border-ambient-blue/50 shadow-[0_10px_35px_-10px_rgba(59,130,246,0.3)]'
                }`}>
                  {/* Floating 3D Tech Watermark */}
                  <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {project.type === 'Certified'
                        ? <ShieldCheck className="w-52 h-52 text-ambient-blue" />
                        : <Code className="w-52 h-52 text-ambient-blue" />}
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          project.type === 'Certified' 
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                            : 'bg-ambient-blue/20 text-ambient-blue border border-ambient-blue/30'
                        }`}>
                          <Zap size={12} />
                          {project.type}
                        </span>
                      </div>

                      {/* JSX-bracket card title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 group-hover:text-ambient-blue transition-colors">
                        <span className="text-ambient-blue font-black text-xl sm:text-2xl">&lt;</span>
                        {project.title}
                        <span className="text-ambient-blue font-black text-xl sm:text-2xl ml-1">/&gt;</span>
                      </h3>
                      <p className="text-gray-300 mb-6 text-sm leading-relaxed">{project.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-400 mr-1 font-mono">Stack:</span>
                      {project.tech.map(t => (
                        <div key={t} title={t} className="px-2.5 py-1.5 bg-black/60 rounded-lg border border-white/10 hover:border-ambient-blue/40 transition-colors flex items-center gap-1.5 text-xs text-gray-300 shadow-sm">
                          {getTechIcon(t)}
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealingCard>
            ))}
          </div>
        </section>

        {/* Notes Section with 3D Glass Cards */}
        <section>
          <SectionHeading icon={FileText} title="My Notes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {previewNotes.map((note, i) => (
              <RevealingCard key={note.id} delay={i * 0.1} className="h-full">
                <div className="p-7 h-full rounded-2xl glass-card hover:border-ambient-blue/50 cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-ambient-blue mb-4 font-mono font-bold tracking-wider">{note.date}</div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-ambient-blue transition-colors text-white">{note.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{note.snippet}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-ambient-blue group-hover:translate-x-1 transition-transform gap-1">
                    <span>Read Full Note</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </RevealingCard>
            ))}
          </div>
          <SeeMoreLink to="/notes" label="See More Notes" />
        </section>

        {/* YouTube Section with 3D Video Glass Frames */}
        <section>
          <SectionHeading icon={Play} title="Latest Videos" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {previewVideos.map((video, i) => (
              <RevealingCard key={video.id} delay={i * 0.1}>
                <div className="aspect-video rounded-2xl overflow-hidden glass-card p-2 group hover:border-ambient-blue/50 transition-all">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full rounded-xl shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </RevealingCard>
            ))}
          </div>
          <SeeMoreLink to="/videos" label="See More Videos" />
        </section>

        {/* Code Vault with 3D Store Cards */}
        <section>
          <SectionHeading id="store" icon={ShoppingCart} title="Code Vault" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {previewStore.map((project, i) => (
              <StoreItem key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
          <SeeMoreLink to="/store" label="Browse the Full Vault" />
        </section>

        {/* Redesigned Right-Left Contact Section with Parallax */}
        <section id="contact" className="scroll-mt-28">
          <ContactSplitBanner onOpenContact={openContactDrawer} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MainSite;
