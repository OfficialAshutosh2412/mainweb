import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMainData } from '../api';
import { videoEmbedUrl } from '../api/mockData';
import { playlistEpisodes } from '../api/playlistEpisodes';
import { prefetchRoute } from '../App';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, Play, Film, ListVideo, ExternalLink } from 'lucide-react';

/* One series: the first episode plays inline, the playlist is offered as a
   card below it. `rel=0` is baked into the embed URL by `videoEmbedUrl`. */
const ShowcaseCard = ({ item, delay }) => {
  /* Episode count comes from the playlist index so the card can advertise
     the series length without a second lookup in the parent. */
  const episodeCount = playlistEpisodes[item.slug]?.length ?? 0;

  return (
  <TiltCard delay={delay} className="h-full" maxTilt={3.5}>
    <article className="card-body video-card p-4 sm:p-5 rounded-2xl glass-card border border-white/10 group relative hover:border-ambient-blue/50 transition-all shadow-xl flex flex-col h-full">
      <div className="aspect-video rounded-xl overflow-hidden bg-black/60 mb-4 sm:mb-5 border border-white/10 shadow-inner">
        <iframe
          src={videoEmbedUrl(item.videoId)}
          title={`${item.title} — episode 1`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="flex items-start gap-3 min-w-0 mb-4">
        <div className="video-play shrink-0 p-2.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 mt-0.5">
          <Play size={16} fill="currentColor" />
        </div>
        <div className="min-w-0">
          <h3 className="card-title text-base sm:text-lg font-bold text-white group-hover:text-ambient-blue transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-400 text-[11px] sm:text-xs mt-1 font-mono flex items-center gap-1">
            <Film size={12} className="shrink-0" /> EPISODE 1 · PLAYLIST SERIES
          </p>
        </div>
      </div>

      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Tech badges */}
      {item.tech && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-gray-300 text-[11px] font-mono truncate"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Playlist card — links to the on-site episode listing */}
      <div className="playlist-card mt-auto rounded-xl border border-white/10 bg-black/40 p-3.5 flex items-center gap-3 min-w-0 hover:border-ambient-blue/50 transition-colors">
        <div className="shrink-0 p-2.5 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30">
          <ListVideo size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            Full Playlist
          </p>
          <p className="text-sm font-bold text-white truncate">
            {episodeCount > 0
              ? `${episodeCount} ${episodeCount === 1 ? 'episode' : 'episodes'} in this series`
              : 'Full playlist series'}
          </p>
        </div>
        <Link
          to={`/video/${item.slug}`}
          onMouseEnter={() => prefetchRoute(`/video/${item.slug}`)}
          className="btn-slide-blue shrink-0 py-2 px-3.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 border border-ambient-blue/50 active:scale-95 transition-all"
        >
          View <ExternalLink size={13} />
        </Link>
      </div>
    </article>
  </TiltCard>
  );
};

const Videos = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMainData().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-dark-bg" />;

  const showcase = data.youtubeShowcase;

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
            YouTube Showcase<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Full build walkthroughs of my projects — the first episode of every series plays
            right here, and the complete playlist is one click away.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {showcase.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Videos;
