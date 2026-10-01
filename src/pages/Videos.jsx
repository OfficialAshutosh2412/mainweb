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
    /* `.page-stack` fills the 100dvh ancestor and lets the document own
       the scroll, so no phantom space appears below the footer. */
    <div className="page-stack">
      <div className="page-stack-body">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter break-words">
            YouTube Showcase<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            A curated directory of video tutorials, architectural walkthroughs, workstation setups, and visual demonstrations.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {data.youtubeVideos.map((video, i) => (
            <TiltCard key={video.id} delay={i * 0.1} className="h-full" maxTilt={3.5}>
              <div className="card-body video-card p-4 sm:p-5 rounded-2xl glass-card border border-white/10 group relative hover:border-ambient-blue/50 transition-all shadow-xl flex flex-col justify-between h-full">
                <div className="aspect-video rounded-xl overflow-hidden bg-black/60 mb-4 sm:mb-5 border border-white/10 shadow-inner">
                  <iframe
                    src={video.url}
                    title={video.title}
                    loading="lazy"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start gap-3 min-w-0">
                  <div className="video-play shrink-0 p-2.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 mt-0.5 transition-all duration-300 group-hover:bg-ambient-blue group-hover:text-white shadow-sm">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="card-title text-base sm:text-lg font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-1 font-mono flex items-center gap-1">
                      <Film size={12} className="shrink-0" /> EMBEDDED MEDIA ASSET
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
