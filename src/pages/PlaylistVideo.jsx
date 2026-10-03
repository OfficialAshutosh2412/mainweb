import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShowcaseBySlug, videoEmbedUrl, playlistEmbedUrl } from '../api/mockData';
import { playlistEpisodes } from '../api/playlistEpisodes';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, Play, ListVideo, ExternalLink, Film } from 'lucide-react';

/* Zero-padded index so a 13-episode series reads 01…13 in order rather
   than sorting as 1, 10, 11, 12, 13, 2. */
const pad = (n) => String(n).padStart(2, '0');

/* One episode: number badge + embedded player + title, with a link out
   to YouTube for anyone the embed cannot play. */
const EpisodeCard = ({ episode }) => (
  <TiltCard className="h-full" maxTilt={2}>
    <article className="episode-card h-full rounded-2xl glass-card border border-white/10 hover:border-ambient-blue/50 transition-all shadow-xl overflow-hidden flex flex-col">
      <div className="relative">
        <div className="aspect-video bg-black/60">
          <iframe
            src={videoEmbedUrl(episode.videoId)}
            title={`Episode ${episode.n}: ${episode.title}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
        {/* Episode number — overlaid, never clipped by the frame */}
        <span className="episode-badge absolute top-3 left-3 font-mono text-xs font-black text-white bg-ambient-blue/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 shadow-lg">
          EP {pad(episode.n)}
        </span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3 min-w-0">
        <div className="flex items-start gap-3 min-w-0">
          <div className="video-play shrink-0 p-2 rounded-xl bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 mt-0.5">
            <Play size={14} fill="currentColor" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white leading-snug break-words">
              {episode.title}
            </h2>
            <p className="text-gray-500 text-[11px] mt-1 font-mono flex items-center gap-1.5 flex-wrap">
              <Film size={11} className="shrink-0" />
              EPISODE {episode.n}
              {episode.published && <span>· {episode.published}</span>}
            </p>
          </div>
        </div>

        {/* mt-auto pins the link to the bottom so cards align in the grid */}
        <a
          href={`https://youtu.be/${episode.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-3 border-t border-white/10 text-xs font-semibold text-ambient-blue hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          Watch on YouTube <ExternalLink size={12} />
        </a>
      </div>
    </article>
  </TiltCard>
);

const PlaylistVideo = () => {
  const { slug } = useParams();

  /* Resolve the route param and its episode list together; an unknown
     slug yields no series, which renders the not-found state below. */
  const { series, episodes } = useMemo(() => {
    const found = getShowcaseBySlug(slug);
    if (!found) return { series: null, episodes: [] };
    return { series: found, episodes: playlistEpisodes[found.slug] ?? [] };
  }, [slug]);

  if (!series) {
    return (
      <div className="page-stack">
        <div className="page-stack-body">
          <div className="glass-card border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Playlist not found<span className="text-ambient-blue">.</span>
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              No series matches <code className="font-mono text-ambient-blue">/video/{slug}</code>.
            </p>
            <Link
              to="/videos"
              className="btn-slide-blue inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white border border-ambient-blue/50"
            >
              <ArrowLeft size={15} /> Back to YouTube Showcase
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="page-stack-body">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Showcase
          </Link>

          <p className="font-mono text-[11px] text-ambient-blue uppercase tracking-widest mb-3">
            Playlist ·{' '}
            {episodes.length > 0
              ? `${episodes.length} ${episodes.length === 1 ? 'episode' : 'episodes'}`
              : 'Full series'}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter break-words">
            {series.title}<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            {series.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {series.tech?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-gray-300 text-[11px] font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={series.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-ambient-blue border border-ambient-blue/40 hover:bg-ambient-blue/15 hover:border-ambient-blue/70 transition-all active:scale-95"
          >
            <ListVideo size={16} /> Open full playlist on YouTube
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Episode grid — numbered, ordered oldest-first. A series with no
            baked index falls back to YouTube's own playlist player so the
            visitor still gets the full list instead of an empty page. */}
        {episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.videoId} episode={ep} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl glass-card border border-white/10 overflow-hidden max-w-3xl">
            <div className="aspect-video bg-black/60">
              <iframe
                src={playlistEmbedUrl(series.playlistId)}
                title={`${series.title} — full playlist`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <p className="p-4 text-xs text-gray-400 font-mono">
              Episode index unavailable — playing the full playlist on YouTube.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlaylistVideo;
