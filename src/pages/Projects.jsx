import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { 
  ArrowLeft, ArrowRight, Code, Layers, Atom, CheckCircle, Database, ShieldCheck, Radio, FileCode, Terminal, Globe, ShoppingCart 
} from 'lucide-react';

export const getTechIcon = (techName) => {
  const name = (techName || '').toLowerCase();
  if (name.includes('react')) return <Atom size={18} className="text-[#61dafb] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('c#') || name.includes('.net') || name.includes('asp') || name.includes('ef') || name.includes('ado')) 
    return <Code size={18} className="text-[#38bdf8] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('sql') || name.includes('db') || name.includes('postgres')) 
    return <Database size={18} className="text-[#f59e0b] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('jwt') || name.includes('auth') || name.includes('security')) 
    return <ShieldCheck size={18} className="text-[#10b981] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('signalr')) 
    return <Radio size={18} className="text-[#c084fc] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('tailwind') || name.includes('css') || name.includes('bootstrap') || name.includes('html')) 
    return <FileCode size={18} className="text-[#38bdf8] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('js') || name.includes('javascript')) 
    return <Terminal size={18} className="text-[#facc15] opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('api') || name.includes('rest')) 
    return <Globe size={18} className="text-[#14b8a6] opacity-80 group-hover:opacity-100 transition-opacity" />;
  return <Layers size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
};

const Projects = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (data && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location, data]);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  const allProjects = [
    ...data.showcaseProjects.map(p => ({ ...p, category: 'showcase' })),
    ...(data.storeProjects.minor ?? []).map(p => ({
      ...p, category: 'minor', hasDoc: p.hasDocumentation, hasThesis: p.hasThesis
    })),
  ];

  const tabs = ['all', 'showcase', 'minor'];
  const filteredProjects = allProjects.filter(p => filter === 'all' || p.category === filter);

  return (
    <div className="bg-transparent text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-hidden">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 w-full relative z-10">
        
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter">
            <span className="text-ambient-blue font-black">&lt;</span>
            <span className="text-white">All Projects</span>
            <span className="text-ambient-blue font-black ml-1">/&gt;</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Explore my entire collection of projects — from production showcase applications to downloadable premium source code blueprints.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold capitalize transition-all border cursor-pointer active:scale-95 ${
                filter === tab
                  ? 'bg-ambient-blue border-ambient-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                  : 'glass-pill text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab === 'showcase' ? 'Showcase & Certified' : tab === 'minor' ? 'Store Projects' : 'All Projects'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id || `${project.category}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard delay={i * 0.05} className="h-full" maxTilt={8}>
                  <div className="p-8 h-full rounded-2xl glass-card border border-white/10 flex flex-col justify-between relative overflow-hidden group min-h-[380px] shadow-xl">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.category === 'showcase' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-ambient-blue/20 text-ambient-blue border border-ambient-blue/30'
                        }`}>
                          {project.type || (project.category === 'minor' ? 'Store Asset' : project.category)}
                        </span>
                        {project.price && (
                          <span className="text-xl font-black text-ambient-blue">{project.price}</span>
                        )}
                      </div>

                      {/* JSX-bracket title */}
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-ambient-blue transition-colors text-white">
                        <span className="text-ambient-blue font-black">&lt;</span>
                        {project.title}
                        <span className="text-ambient-blue font-black ml-0.5">/&gt;</span>
                      </h3>
                      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {project.tech && (
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                          <span className="text-xs text-gray-400 font-mono">Stack:</span>
                          <div className="flex gap-2 flex-wrap">
                            {project.tech.map((t) => (
                              <div key={t} title={t} className="px-2.5 py-1 bg-black/60 rounded-lg border border-white/10 hover:border-ambient-blue/40 transition-colors flex items-center gap-1 text-xs text-gray-300 shadow-sm">
                                {getTechIcon(t)}
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(project.hasDoc || project.hasThesis) && (
                        <ul className="space-y-1.5 mb-6 text-xs text-gray-400">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-emerald-400" /> Source Code Included
                          </li>
                          {project.hasDoc && (
                            <li className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-emerald-400" /> Complete Documentation
                            </li>
                          )}
                          {project.hasThesis && (
                            <li className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-emerald-400" /> Academic Thesis Included
                            </li>
                          )}
                        </ul>
                      )}

                      {project.price ? (
                        <button className="w-full py-3.5 bg-gradient-to-r from-ambient-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] cursor-pointer flex items-center justify-center gap-2 active:scale-95 text-sm">
                          <ShoppingCart size={15} />
                          Purchase Blueprint
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-sm text-ambient-blue hover:text-white font-semibold transition-colors group/link cursor-pointer">
                          <span>Explore Project Details</span>
                          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
