import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import SVGRope from '../components/SVGRope';
import RoleDial from '../components/RoleDial';
import { useContactDrawer } from '../context/ContactContext';
import { getTechIcon } from './Projects';

import {
  ArrowRight, FileText, Play, ShoppingCart, Mail,
  Code, ShieldCheck, CheckCircle, Sparkles, Hexagon, Triangle, Circle, User
} from 'lucide-react';



/* ─────────── JSX-bracket section heading ─────────── */
const SectionHeading = ({ icon: Icon, title, id }) => (
  <div id={id} className="flex items-center gap-3 mb-8 md:mb-12 scroll-mt-24">
    {Icon && (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Icon className="w-7 h-7 md:w-10 md:h-10 text-ambient-blue shrink-0" />
      </motion.div>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
      <span className="text-ambient-blue font-black">&lt;</span>
      <span className="text-white">{title}</span>
      <span className="text-ambient-blue font-black ml-1">/&gt;</span>
    </h2>
  </div>
);

/* ─────────── Floating bg icons ─────────── */
const FloatingBgIcons = () => {
  const icons = [
    { Icon: Sparkles, top: '15%', left: '8%', delay: 0 },
    { Icon: Hexagon,  top: '35%', right: '12%', delay: 1 },
    { Icon: Triangle, top: '65%', left: '15%', delay: 2 },
    { Icon: Circle,   top: '80%', right: '8%', delay: 1.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-ambient-blue/20"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={{ y: [0, -40, 0], rotate: [0, 360], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        >
          <item.Icon size={72} />
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────── "See More" animated link ─────────── */
const SeeMoreLink = ({ to, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex justify-center mt-12"
  >
    <Link
      to={to}
      className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:border-ambient-blue bg-white/5 hover:bg-ambient-blue/10 text-white font-semibold transition-all duration-300"
    >
      {label}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>
);

/* ─────────── Store item card ─────────── */
const StoreItem = ({ project, delay }) => (
  <RevealingCard delay={delay} className="h-full">
    <div className="p-6 rounded-2xl h-full flex flex-col justify-between bg-dark-surface border border-white/5 hover:border-ambient-blue/40 transition-all duration-300 group">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-bold group-hover:text-ambient-blue transition-colors line-clamp-2">{project.title}</h4>
          <span className="text-xl font-black text-ambient-blue ml-2 shrink-0">{project.price}</span>
        </div>
        <p className="text-gray-400 mb-4 text-xs sm:text-sm leading-relaxed">{project.description}</p>
        
        {project.tech && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {project.tech.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-black/50 border border-white/5 text-[11px] text-gray-300 font-mono flex items-center gap-1.5">
                {getTechIcon(t)}
                {t}
              </span>
            ))}
          </div>
        )}

        <ul className="space-y-1.5 mb-6 text-xs text-gray-500">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Source Code
          </li>
          {project.hasDocumentation && (
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Complete Documentation
            </li>
          )}
          {project.hasThesis && (
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Academic Thesis Included
            </li>
          )}
        </ul>
      </div>
      <button className="w-full py-3 rounded-xl font-bold transition-all bg-white/10 text-white hover:bg-ambient-blue hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer text-xs sm:text-sm">
        Purchase Blueprint
      </button>
    </div>
  </RevealingCard>
);

/* ─────────────────── Main Component ─────────────────── */
const MainSite = () => {
  const [data, setData] = useState(null);
  const { scrollY } = useScroll();
  const heroY        = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity  = useTransform(scrollY, [0, 500], [1, 0]);
  const location     = useLocation();

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
    <div className="bg-dark-bg text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-x-hidden">

      <SVGRope />
      <FloatingBgIcons />

      {/* ── Hero ── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 pt-16 sm:pt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ambient-glow/40 via-dark-bg to-dark-bg opacity-40 pointer-events-none z-0" />

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

      {/* ── Content Sections ── */}
      <div className="flex-1 relative z-10 pb-20 md:pb-32 max-w-6xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-36 md:space-y-48 w-full">

        {/* Showcase Projects */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {data.showcaseProjects.map((project, i) => (
              <RevealingCard key={project.id} delay={i * 0.1}>
                <div className="p-8 h-full rounded-2xl bg-gradient-to-br from-dark-surface to-black relative overflow-hidden transition-all group">
                  <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {project.type === 'Certified'
                        ? <ShieldCheck className="w-48 h-48 text-ambient-blue" />
                        : <Code className="w-48 h-48 text-ambient-blue" />}
                    </motion.div>
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${project.type === 'Certified' ? 'bg-purple-500/20 text-purple-400' : 'bg-ambient-blue/20 text-ambient-blue'}`}>
                        {project.type}
                      </span>
                      {/* JSX-bracket card title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 group-hover:text-ambient-blue transition-colors">
                        <span className="text-ambient-blue font-black text-xl sm:text-2xl">&lt;</span>
                        {project.title}
                        <span className="text-ambient-blue font-black text-xl sm:text-2xl ml-1">/&gt;</span>
                      </h3>
                      <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500 mr-1">Tech:</span>
                      {project.tech.map(t => (
                        <div key={t} title={t} className="p-2 bg-black/40 rounded-lg border border-white/5 hover:border-ambient-blue/40 transition-colors flex items-center gap-1.5 text-xs text-gray-300">
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

        {/* Notes Section */}
        <section>
          <SectionHeading icon={FileText} title="My Notes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {previewNotes.map((note, i) => (
              <RevealingCard key={note.id} delay={i * 0.1} className="h-full">
                <div className="p-6 h-full rounded-2xl bg-dark-surface cursor-pointer">
                  <div className="text-sm text-ambient-blue mb-4 font-mono">{note.date}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-ambient-blue transition-colors">{note.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{note.snippet}</p>
                </div>
              </RevealingCard>
            ))}
          </div>
          <SeeMoreLink to="/notes" label="See More Notes" />
        </section>

        {/* YouTube Section */}
        <section>
          <SectionHeading icon={Play} title="Latest Videos" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {previewVideos.map((video, i) => (
              <RevealingCard key={video.id} delay={i * 0.1}>
                <div className="aspect-video rounded-2xl overflow-hidden bg-dark-surface p-2">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </RevealingCard>
            ))}
          </div>
          <SeeMoreLink to="/videos" label="See More Videos" />
        </section>

        {/* Code Vault */}
        <section>
          <SectionHeading id="store" icon={ShoppingCart} title="Code Vault" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {previewStore.map((project, i) => (
              <StoreItem key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
          <SeeMoreLink to="/store" label="Browse the Full Vault" />
        </section>

        {/* Contact Banner CTA */}
        <section id="contact" className="scroll-mt-24">
          <RevealingCard delay={0.1}>
            <div className="p-6 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-r from-ambient-blue/20 via-dark-surface to-black border border-ambient-blue/30 relative overflow-hidden flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8 group hover:border-ambient-blue/60 transition-all duration-300 text-center md:text-left">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20 text-xs font-mono font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  Have a Project or Opportunity?
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Let's Build Something Great Together
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Click below to slide open my contact form. I'm available for full-time roles, freelance projects, and collaboration.
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

        {/* CTA to Portfolio — Themed pill button */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-6 flex justify-center"
        >
          {/* Extra padding wrapper so the glow doesn't get clipped */}
          <div className="p-3">
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center"
            >
              {/* Outer ambient glow — needs room to breathe, not clipped */}
              <span className="absolute inset-[-10px] rounded-full bg-ambient-blue/50 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 pointer-events-none" />

              {/* Main pill button — site ambient-blue theme */}
              <span className="relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-ambient-blue border border-blue-400/30 shadow-[0_0_24px_rgba(59,130,246,0.45)] group-hover:shadow-[0_0_44px_rgba(59,130,246,0.75)] group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-105">
                {/* Icon badge */}
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                  <User className="w-4 h-4 text-white" />
                </span>
                <span className="font-bold text-base text-white tracking-wide whitespace-nowrap">View My Portfolio</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors duration-300 shrink-0">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
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
