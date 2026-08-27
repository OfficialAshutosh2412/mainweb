import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import TiltCard from '../components/TiltCard';
import SVGRope from '../components/SVGRope';
import RoleDial from '../components/RoleDial';
import { useContactDrawer } from '../context/ContactContext';
import { getTechIcon } from './Projects';

import {
  ArrowRight, FileText, Play, ShoppingCart, Mail,
  Code, ShieldCheck, CheckCircle, Sparkles, User,
  Zap
} from 'lucide-react';

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
const StoreItem = ({ project, delay }) => (
  <TiltCard delay={delay} className="h-full" maxTilt={10}>
    <div className="p-6 rounded-2xl h-full flex flex-col justify-between glass-card border border-white/10 hover:border-ambient-blue/50 transition-all duration-300 group">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-bold text-white group-hover:text-ambient-blue transition-colors line-clamp-2">{project.title}</h4>
          <span className="text-xl font-black text-ambient-blue ml-2 shrink-0">{project.price}</span>
        </div>
        <p className="text-gray-400 mb-4 text-xs sm:text-sm leading-relaxed">{project.description}</p>
        
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
      <button className="w-full py-3.5 rounded-xl font-bold transition-all bg-white/10 text-white hover:bg-ambient-blue hover:text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2">
        <ShoppingCart size={15} />
        Purchase Blueprint
      </button>
    </div>
  </TiltCard>
);

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

      <SVGRope />

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

        {/* 3D Tilted Hero Interactive Container */}
        <motion.div
          style={{
            rotateX: heroRotateX,
            rotateY: heroRotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center z-10 w-full max-w-6xl mx-auto preserve-3d"
        >
          {/* Full-Screen Liquid Typography Role Revealer Carousel */}
          <RoleDial />
        </motion.div>

        {/* Hero Bottom Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase">Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-ambient-blue shadow-[0_0_8px_#3b82f6]"
            />
          </div>
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
                <div className="p-8 h-full rounded-2xl bg-gradient-to-br from-dark-surface/90 to-black/90 relative overflow-hidden transition-all group flex flex-col justify-between min-h-[380px]">
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

        {/* 3D Contact Banner CTA */}
        <section id="contact" className="scroll-mt-28">
          <TiltCard delay={0.1} maxTilt={6}>
            <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-ambient-blue/25 via-dark-surface to-black/90 border border-ambient-blue/40 relative overflow-hidden flex flex-col items-center justify-between gap-8 md:flex-row group hover:border-ambient-blue/70 transition-all duration-500 text-center md:text-left shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-ambient-blue/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="space-y-4 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 text-xs font-mono font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  Have a Project or Opportunity?
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Let's Build Something Exceptional Together
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Available for full-time roles, freelance projects, technical consulting, and architectural collaboration.
                </p>
              </div>

              <button
                onClick={openContactDrawer}
                className="px-8 py-4 bg-gradient-to-r from-ambient-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] transition-all flex items-center gap-3 shrink-0 cursor-pointer hover:scale-105 active:scale-95 text-base relative z-10"
              >
                <Mail className="w-5 h-5" />
                Contact Me Now
              </button>
            </div>
          </TiltCard>
        </section>

        {/* CTA to Portfolio — 3D Parallax Pill Button */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-6 flex justify-center"
        >
          <div className="p-3">
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center"
            >
              {/* Outer ambient glow */}
              <span className="absolute inset-[-10px] rounded-full bg-ambient-blue/50 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 pointer-events-none" />

              {/* Main 3D Pill button */}
              <span className="relative flex items-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-ambient-blue to-blue-600 border border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] transition-all duration-300 group-hover:scale-105 active:scale-95">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                  <User className="w-4 h-4 text-white" />
                </span>
                <span className="font-bold text-base text-white tracking-wide whitespace-nowrap">View My Portfolio</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-white/30 transition-colors duration-300 shrink-0">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </span>
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default MainSite;
