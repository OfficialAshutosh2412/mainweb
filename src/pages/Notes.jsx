import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, Download, Atom, Wind, Code, Sparkles, Cpu, Layers } from 'lucide-react';

const getNoteIcon = (tech) => {
  const name = tech.toLowerCase();
  if (name.includes('react')) return <Atom size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('tailwind')) return <Wind size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('typescript')) return <Code size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('motion') || name.includes('framer')) return <Sparkles size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('node')) return <Cpu size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  return <Layers size={42} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
};

const DownloadButton = () => {
  const [status, setStatus] = useState('idle');

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    setTimeout(() => {
      setStatus('complete');
      setTimeout(() => setStatus('idle'), 2500);
    }, 2000);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full relative overflow-hidden bg-white/5 border border-white/10 hover:border-ambient-blue hover:bg-ambient-blue/20 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group mt-auto cursor-pointer shadow-sm active:scale-95 text-xs sm:text-sm"
    >
      {status === 'idle' && (
        <>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center"
          >
            <Download size={16} className="text-ambient-blue" />
          </motion.div>
          <span>Download PDF Note</span>
        </>
      )}
      {status === 'downloading' && (
        <>
          <span className="relative z-10 text-ambient-blue font-semibold">Generating PDF...</span>
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '0%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 left-0 bg-ambient-blue/30 w-full z-0"
          />
        </>
      )}
      {status === 'complete' && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 text-emerald-400 font-semibold"
        >
          <span>✓</span>
          <span>Downloaded!</span>
        </motion.div>
      )}
    </button>
  );
};

const Notes = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  return (
    /* `.page-stack` fills the 100dvh ancestor and lets the document own
       the scroll, so no phantom space appears below the footer. */
    <div className="page-stack">
      <div className="page-stack-body">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter break-words">
            Technical Notes<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            A comprehensive reference library of quick snippets, compiler features, optimization blueprints, and layout mechanics.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {data.notes.map((note, i) => (
            <TiltCard key={note.id} delay={i * 0.08} className="h-full flex flex-col" maxTilt={3.5}>
              <div className="card-body p-5 sm:p-7 rounded-2xl glass-card border border-white/10 hover:border-ambient-blue/50 flex flex-col justify-between h-full relative group shadow-xl">
                {/* Tech Icon background float */}
                <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
                  {getNoteIcon(note.tech)}
                </div>

                <div className="mb-5 sm:mb-6 flex-grow min-w-0">
                  <div className="card-meta-row mb-3">
                    <div className="text-xs text-ambient-blue font-mono font-semibold">{note.date}</div>
                    <span className="inline-block px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-bold bg-white/5 border border-white/10 text-gray-300 truncate max-w-full">
                      {note.tech}
                    </span>
                  </div>
                  <h3 className="card-title text-lg sm:text-xl font-bold text-white mb-2.5 sm:mb-3 group-hover:text-ambient-blue transition-colors">
                    {note.title}
                  </h3>
                  <p className="card-list text-gray-300 text-[13px] sm:text-sm leading-relaxed">
                    {note.snippet}
                  </p>
                </div>

                <DownloadButton />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notes;
