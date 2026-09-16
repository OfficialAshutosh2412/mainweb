import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import TiltCard from '../components/TiltCard';
import HeroSection from '../components/HeroSection';
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
      className="btn-slide-blue group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-ambient-blue/40 hover:border-ambient-blue text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(29,78,216,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
    >
      <span>{label}</span>
      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300 text-blue-200 group-hover:text-white" />
    </Link>
  </motion.div>
);

/* ─────────── 3D Store item card ─────────── */
const StoreItem = ({ project, delay }) => {
  const [mobileActive, setMobileActive] = useState(false);

  return (
    <TiltCard delay={delay} className="h-full">
      <div 
        onClick={() => setMobileActive(!mobileActive)}
        className={`group relative rounded-2xl h-[420px] overflow-hidden border border-white/10 hover:border-ambient-blue/60 transition-all duration-400 ease-out cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(29,78,216,0.35)] hover:-translate-y-1.5 ${
          mobileActive ? '-translate-y-1.5 border-ambient-blue/60 shadow-[0_20px_40px_rgba(29,78,216,0.35)]' : ''
        }`}
      >
        {/* 1. Background Thumbnail Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-dark-surface">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Dark vignette overlay for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/60 to-transparent" />
        </div>

        {/* 2. Default State Content (Visible when NOT hovering / inactive) */}
        <div className={`absolute inset-0 z-10 p-6 flex flex-col justify-between transition-opacity duration-300 ${
          mobileActive ? 'opacity-0 pointer-events-none' : 'group-hover:opacity-0 group-hover:pointer-events-none'
        }`}>
          {/* Top Badge area */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 text-ambient-blue border border-ambient-blue/30 backdrop-blur-md shadow-sm">
              Blueprint
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-black text-white bg-ambient-blue shadow-[0_0_15px_rgba(29,78,216,0.5)]">
              {project.price}
            </span>
          </div>

          {/* Bottom Default Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight line-clamp-1">
              {project.title}
            </h4>

            {project.tech && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 text-[10px] text-gray-200 font-mono flex items-center gap-1 backdrop-blur-sm shadow-sm">
                    {getTechIcon(t)}
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] font-mono text-gray-400">+{project.tech.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Hover / Touch Revealed Semi-Transparent Gradient Details Panel (300-450ms Ease-Out) */}
        <div className={`absolute inset-0 z-20 p-6 bg-[#0a0c14]/90 backdrop-blur-md border-t border-white/15 flex flex-col justify-between transition-all duration-400 ease-out transform ${
          mobileActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
        }`}>
          <div>
            {/* Header in Panel */}
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                {project.title}
              </h4>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black text-blue-200 bg-ambient-blue/40 border border-ambient-blue/60 shrink-0 ml-2">
                {project.price}
              </span>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* 3 Key Features */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-mono font-bold text-ambient-blue uppercase tracking-wider">Key Features</div>
              {(project.features || [
                "Full Source Code & Database Scripts",
                "Architectural Documentation & Setup Guide",
                "Academic Thesis Blueprint & Diagrams"
              ]).slice(0, 3).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            {project.tech && (
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-gray-300 font-mono flex items-center gap-1">
                    {getTechIcon(t)}
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Small note indicating thumbnail is AI generated */}
            <div className="text-[10px] font-mono text-gray-400/90 italic flex items-center justify-center gap-1 mb-2">
              <Sparkles className="w-3 h-3 text-ambient-blue shrink-0 animate-pulse" />
              <span>* Preview thumbnail AI-generated</span>
            </div>

            {/* Action CTA Button */}
            <Link
              to="/store"
              className="btn-slide-blue w-full py-3 px-4 rounded-xl font-bold text-white text-xs sm:text-sm flex items-center justify-between gap-2 shadow-lg border border-ambient-blue/50 cursor-pointer active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={15} />
                <span>Get Bundle</span>
              </div>
              <div className="flex items-center gap-1 text-blue-200 font-mono text-xs">
                <span>{project.price}</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
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
          style={{ y: scrollParallaxY, willChange: 'transform' }}
          className="absolute -top-12 -bottom-12 inset-x-0 w-full pointer-events-none gpu-layer"
        >
          <img
            src={contactParallaxBg}
            alt="Futuristic cybernetic city grid"
            loading="lazy"
            decoding="async"
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
            className="btn-slide-white w-full py-4 px-6 bg-white hover:bg-blue-50 text-blue-950 hover:text-blue-950 font-black rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-95 text-sm sm:text-base group/btn"
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

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  // Limit items shown on home page
  const previewNotes  = data.notes.slice(0, 3);
  const previewVideos = data.youtubeVideos.slice(0, 3);
  const previewStore  = data.storeProjects.minor.slice(0, 3);

  return (
    <div className="bg-transparent text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-x-hidden">

      {/* ── Split-Screen Darkfolio Hero Section ── */}
      <HeroSection />

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
