import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, ShoppingCart, CheckCircle, ExternalLink, Sparkles, Code, FileText, Play, Wrench } from 'lucide-react';
import { getTechIcon } from './Projects';

const StoreCard = ({ project, delay }) => {
  const [mobileActive, setMobileActive] = useState(false);

  return (
    <TiltCard delay={delay} maxTilt={3.5}>
      <div 
        onClick={() => setMobileActive(!mobileActive)}
        className={`group relative rounded-2xl h-[440px] overflow-hidden border border-white/10 hover:border-ambient-blue/60 transition-all duration-400 ease-out cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(29,78,216,0.35)] hover:-translate-y-1.5 ${
          mobileActive ? '-translate-y-1.5 border-ambient-blue/60 shadow-[0_20px_40px_rgba(29,78,216,0.35)]' : ''
        }`}
      >
        {/* 1. Background Thumbnail Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-dark-surface">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/60 to-transparent" />
        </div>

        {/* 2. Default State Content */}
        <div className={`absolute inset-0 z-10 p-6 flex flex-col justify-between transition-opacity duration-300 ${
          mobileActive ? 'opacity-0 pointer-events-none' : 'group-hover:opacity-0 group-hover:pointer-events-none'
        }`}>
          {/* Top Badge area */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 text-ambient-blue border border-ambient-blue/30 backdrop-blur-md shadow-sm">
              Architecture Code
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-black text-white bg-ambient-blue shadow-[0_0_15px_rgba(29,78,216,0.5)]">
              {project.price}
            </span>
          </div>

          {/* Bottom Default Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight line-clamp-1">
              {project.title}
            </h3>

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
              <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                {project.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black text-blue-200 bg-ambient-blue/40 border border-ambient-blue/60 shrink-0 ml-2">
                {project.price}
              </span>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* 3 Key Features */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-mono font-bold text-ambient-blue uppercase tracking-wider">Key Capabilities</div>
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

            {/* Action CTAs */}
            <div className="flex gap-2.5">
              <button className="btn-slide-blue flex-[1.4] py-3 px-3 rounded-xl font-bold text-white text-xs flex items-center justify-between gap-1.5 shadow-lg border border-ambient-blue/50 cursor-pointer active:scale-95 transition-all">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart size={15} />
                  <span>Get Bundle</span>
                </div>
                <span className="bg-black/25 px-2 py-0.5 rounded text-[11px] font-mono font-black text-blue-100">{project.price}</span>
              </button>
              <button className="flex-1 py-3 rounded-xl font-bold text-ambient-blue border border-ambient-blue/40 hover:bg-ambient-blue/15 hover:border-ambient-blue/70 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-xs">
                <ExternalLink size={14} />
                <span>Demo</span>
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
    <div className="bg-transparent min-h-screen text-white flex flex-col justify-between relative overflow-hidden selection:bg-ambient-blue">
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 relative z-10">
        
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
