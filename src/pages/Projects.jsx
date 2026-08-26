import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import { 
  ArrowLeft, Code, Box, Layers, Cpu, Atom, CheckCircle, Database, ShieldCheck, Radio, FileCode, Terminal, Globe 
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

  // Build project list — only minor (no major) after mock data change
  const allProjects = [
    ...data.showcaseProjects.map(p => ({ ...p, category: 'showcase' })),
    ...(data.storeProjects.minor ?? []).map(p => ({
      ...p, category: 'minor', hasDoc: p.hasDocumentation, hasThesis: p.hasThesis
    })),
  ];

  const tabs = ['all', 'showcase', 'minor'];

  const filteredProjects = allProjects.filter(p => filter === 'all' || p.category === filter);

  return (
    <div className="bg-dark-bg text-white flex flex-col min-h-screen selection:bg-ambient-blue relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-ambient-glow/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 max-w-6xl mx-auto px-6 pt-32 pb-24 w-full relative z-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            <span className="text-ambient-blue font-black">&lt;</span>
            <span className="text-white">All Projects</span>
            <span className="text-ambient-blue font-black ml-1">/&gt;</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl">
            Explore my entire collection of projects — from live showcase items to downloadable premium source-code assets.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all border cursor-pointer ${
                filter === tab
                  ? 'bg-ambient-blue border-ambient-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab === 'showcase' ? 'Showcase & Certified' : tab === 'minor' ? 'Store Projects' : 'All Projects'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <RevealingCard key={project.id || `${project.category}-${i}`} delay={i * 0.05}>
              <div className="p-8 h-full rounded-2xl bg-dark-surface border border-white/5 flex flex-col justify-between relative overflow-hidden group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.category === 'showcase' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {project.type || (project.category === 'minor' ? 'Store Asset' : project.category)}
                    </span>
                    {project.price && (
                      <span className="text-xl font-black text-ambient-blue">{project.price}</span>
                    )}
                  </div>

                  {/* JSX-bracket title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-ambient-blue transition-colors">
                    <span className="text-ambient-blue font-black">&lt;</span>
                    {project.title}
                    <span className="text-ambient-blue font-black ml-0.5">/&gt;</span>
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {project.tech && (
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs text-gray-500">Tech Stack:</span>
                      <div className="flex gap-2.5">
                        {project.tech.map((t) => (
                          <div key={t} title={t} className="p-2 bg-black/40 rounded-lg border border-white/5 hover:border-ambient-blue/40 transition-colors">
                            {getTechIcon(t)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(project.hasDoc || project.hasThesis) && (
                    <ul className="space-y-2 mb-6 text-xs text-gray-500">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" /> Source Code Included
                      </li>
                      {project.hasDoc && (
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" /> Complete Documentation
                        </li>
                      )}
                      {project.hasThesis && (
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" /> Academic Thesis Included
                        </li>
                      )}
                    </ul>
                  )}

                  {project.price ? (
                    <button className="w-full py-3 bg-ambient-blue hover:bg-blue-600 rounded-xl font-bold text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer">
                      Purchase Project
                    </button>
                  ) : (
                    <a href="#" className="inline-flex items-center gap-2 text-sm text-ambient-blue hover:text-white font-semibold transition-colors group/link">
                      Learn More <ArrowLeft size={14} className="rotate-180 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </RevealingCard>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
