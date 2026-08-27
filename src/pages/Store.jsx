import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, ShoppingCart, CheckCircle, ExternalLink } from 'lucide-react';
import { getTechIcon } from './Projects';

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
          className="mb-14"
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
        </motion.div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((project, i) => (
            <TiltCard key={project.id} delay={i * 0.08} maxTilt={8}>
              <div className="rounded-2xl glass-card border border-ambient-blue/30 hover:border-ambient-blue/60 flex flex-col justify-between h-full relative overflow-hidden group min-h-[400px] shadow-xl transition-all duration-300">
                {/* Theme gradient top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-ambient-blue to-transparent opacity-80 group-hover:opacity-100 group-hover:h-[4px] transition-all duration-300" />

                <div className="flex-grow p-7 pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-xl font-black text-ambient-blue ml-2 shrink-0">{project.price}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {project.tech && (
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
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
                      <CheckCircle size={14} className="text-emerald-400" /> Full Source Code
                    </li>
                    {project.hasDocumentation && (
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-400" /> Architectural Documentation
                      </li>
                    )}
                    {project.hasThesis && (
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-400" /> Academic Project Blueprint
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 p-7 pt-0">
                  <button className="flex-1 py-3.5 bg-gradient-to-r from-ambient-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm">
                    <ShoppingCart size={15} />
                    Purchase
                  </button>
                  <button className="flex-1 py-3.5 rounded-xl font-bold text-ambient-blue border border-ambient-blue/40 hover:bg-ambient-blue/15 hover:border-ambient-blue/70 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm">
                    <ExternalLink size={15} />
                    View Demo
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Store;
