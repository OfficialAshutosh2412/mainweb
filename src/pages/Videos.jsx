import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, Play, Film } from 'lucide-react';

const Videos = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

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
            YouTube Showcase<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            A curated directory of video tutorials, architectural walkthroughs, workstation setups, and visual demonstrations.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.youtubeVideos.map((video, i) => (
            <TiltCard key={video.id} delay={i * 0.1} maxTilt={8}>
              <div className="p-5 rounded-2xl glass-card border border-white/10 group relative overflow-hidden hover:border-ambient-blue/50 transition-all shadow-xl flex flex-col justify-between h-full">
                <div className="aspect-video rounded-xl overflow-hidden bg-black/60 mb-5 border border-white/10 shadow-inner">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start gap-3.5 p-1">
                  <div className="p-2.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 mt-0.5 group-hover:scale-110 group-hover:bg-ambient-blue group-hover:text-white transition-all shadow-sm">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 font-mono flex items-center gap-1">
                      <Film size={12} /> EMBEDDED MEDIA ASSET
                    </p>
                  </div>
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

export default Videos;
