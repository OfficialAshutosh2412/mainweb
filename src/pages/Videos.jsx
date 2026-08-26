import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import RevealingCard from '../components/RevealingCard';
import { ArrowLeft, Play } from 'lucide-react';

const Videos = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  return (
    <div className="bg-dark-bg min-h-screen text-white flex flex-col justify-between relative overflow-hidden selection:bg-ambient-blue">
      {/* Ambient background glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-ambient-glow/10 rounded-full blur-[140px] pointer-events-none" />

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
            YouTube Showcase<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base">
            A curated directory of video tutorials, workstation setups, framework guides, and visual demonstrations.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {data.youtubeVideos.map((video, i) => (
            <RevealingCard key={video.id} delay={i * 0.1}>
              <div className="p-4 rounded-2xl bg-dark-surface border border-white/5 group relative overflow-hidden">
                <div className="aspect-video rounded-xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start gap-3 p-2">
                  <div className="p-2.5 rounded-lg bg-ambient-blue/10 text-ambient-blue mt-1">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-mono">EMBEDDED MEDIA ASSET</p>
                  </div>
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

export default Videos;
