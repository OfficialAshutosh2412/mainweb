import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, ShoppingCart, ExternalLink, Sparkles, Code, FileText, Play, Wrench } from 'lucide-react';
import { getTechIcon } from './Projects';

const StoreCard = ({ project, delay }) => {
  const [mobileActive, setMobileActive] = useState(false);

  return (
    <TiltCard delay={delay} className="h-full" maxTilt={3.5}>
      <div
        onClick={() => setMobileActive(!mobileActive)}
        className={`store-card group relative rounded-2xl overflow-hidden border border-white/10 hover:border-ambient-blue/60 transition-all duration-400 ease-out cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(29,78,216,0.35)] hover:-translate-y-1.5 ${
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
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* 2. Default State Content */}
        <div className={`store-card-face absolute inset-0 z-10 flex flex-col justify-between transition-opacity duration-300 ${
          mobileActive ? 'opacity-0 pointer-events-none' : 'group-hover:opacity-0 group-hover:pointer-events-none'
        }`}>
          {/* Top Badge area */}
          <div className="store-card-top flex justify-between items-start gap-2">
            <span className="store-badge-soft px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 text-ambient-blue border border-ambient-blue/30 backdrop-blur-md shadow-sm">
              Architecture Code
            </span>
            <span className="store-price-pill px-3 py-1 rounded-full text-xs font-mono font-black text-white bg-ambient-blue shadow-[0_0_15px_rgba(29,78,216,0.5)] shrink-0">
              {project.price}
            </span>
          </div>

          {/* Bottom Default Info */}
          <div className="min-w-0">
            <h3 className="store-card-title text-xl font-bold text-white mb-3 tracking-tight line-clamp-2">
              {project.title}
            </h3>

            {project.tech && (
              <div className="store-tech-row flex items-center gap-1.5 flex-wrap">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="store-tech-pill px-2 py-1 rounded-lg bg-black/70 border border-white/10 text-gray-200 font-mono flex items-center gap-1 backdrop-blur-sm shadow-sm">
                    {getTechIcon(t)}
                    <span className="truncate">{t}</span>
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] font-mono text-gray-400">+{project.tech.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Hover / Touch Revealed Details Panel.
            The body scrolls internally and the action bar is pinned, so
            nothing is ever clipped off the bottom on small screens. */}
        <div
          role="region"
          aria-label={`${project.title} details`}
          className={`store-card-panel absolute inset-0 z-20 bg-[#0a0c14]/92 backdrop-blur-md border-t border-white/15 flex flex-col transition-all duration-400 ease-out transform ${
            mobileActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          }`}
        >
          {/* Scrollable body keeps every line reachable on small screens.
              Per request the prose description and capability list are
              removed — the card shows title, price and tech stack only. */}
          <div className="store-panel-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain">
            {/* Header in Panel */}
            <div className="store-panel-head flex justify-between items-start gap-2">
              <h3 className="store-card-title text-base sm:text-lg font-bold text-white tracking-tight line-clamp-2 min-w-0">
                {project.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black text-blue-200 bg-ambient-blue/40 border border-ambient-blue/60 shrink-0">
                {project.price}
              </span>
            </div>

            {/* Tech Badges — horizontal scroll strip on phones */}
            {project.tech && (
              <div className="store-panel-tech">
                {project.tech.map(t => (
                  <span key={t} className="store-tech-pill px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-gray-300 font-mono flex items-center gap-1 shrink-0">
                    {getTechIcon(t)}
                    <span className="truncate">{t}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pinned action bar — always visible, never scrolls out of reach */}
          <div className="store-panel-actions shrink-0">
            <div className="store-ai-note text-[10px] font-mono text-gray-400/90 italic flex items-center justify-center gap-1">
              <Sparkles size={12} className="shrink-0 animate-pulse" />
              <span className="truncate">* Preview thumbnail AI-generated</span>
            </div>

            <div className="flex gap-2">
              <button className="btn-slide-blue store-cta-primary flex-1 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-lg border border-ambient-blue/50 cursor-pointer active:scale-95 transition-all min-w-0">
                <ShoppingCart size={15} className="shrink-0" />
                <span className="truncate">Get Bundle</span>
              </button>
              <button className="store-cta-secondary flex-1 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-ambient-blue border border-ambient-blue/40 hover:bg-ambient-blue/15 hover:border-ambient-blue/70 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-xs min-w-0">
                <ExternalLink size={14} className="shrink-0" />
                <span className="truncate">Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Store = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  const products = data.storeProjects.minor;

  return (
    <div className="page-stack">
      <div className="page-stack-body">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter">
            The Code Forge<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Download premium production blueprints, microservice starters, UI systems, and academic code architectures.
          </p>

          {/* Bundle Content Inclusion Banner */}
          <div className="mt-8 p-4 rounded-2xl glass-card border border-ambient-blue/30 bg-ambient-blue/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm shadow-lg">
            <div className="flex items-center gap-2 font-mono font-bold text-ambient-blue">
              <Sparkles className="w-4 h-4 text-ambient-blue animate-pulse" />
              <span>Each Bundle Includes:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-gray-200 font-medium">
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Code className="w-3.5 h-3.5 text-ambient-blue" /> Code
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <FileText className="w-3.5 h-3.5 text-ambient-blue" /> Thesis
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Play className="w-3.5 h-3.5 text-ambient-blue" /> Demo
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Wrench className="w-3.5 h-3.5 text-ambient-blue" /> Installation Guide
              </span>
            </div>
          </div>
        </motion.div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {products.map((project, i) => (
            <StoreCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Store;
