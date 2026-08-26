import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import { ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react';
import { getTechIcon } from './Projects';

const Store = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  const products = data.storeProjects.minor;

  return (
    <div className="bg-dark-bg min-h-screen text-white flex flex-col justify-between relative overflow-hidden selection:bg-ambient-blue">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-ambient-glow/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter">
            The Code Forge<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base">
            Download premium templates, UI components, booster boilers, and helper packages with clean implementations.
          </p>
        </motion.div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {products.map((project, i) => (
            <RevealingCard key={project.id} delay={i * 0.08}>
              <div className="p-6 rounded-2xl bg-dark-surface border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group min-h-[340px]">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-xl font-black text-ambient-blue ml-2 shrink-0">{project.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

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

                  <ul className="space-y-2 mb-8 text-xs text-gray-500">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" /> Source Code
                    </li>
                    {project.hasDocumentation && (
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
                </div>

                <button className="w-full py-4 bg-ambient-blue hover:bg-blue-600 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 group cursor-pointer">
                  <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                  Purchase Blueprint
                </button>
              </div>
            </RevealingCard>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Store;
