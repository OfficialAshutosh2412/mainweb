import { Link } from 'react-router-dom';
import { mainWebsiteData, getShowcaseById } from '../api/mockData';

import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import { ArrowLeft, ShoppingCart, Sparkles, Code, FileText, Play, Wrench } from 'lucide-react';
import { getTechIcon } from './Projects';

/* Projects link to their YouTube series through `youtubeId` in the data.
   Resolving it here keeps the store card free of URL-building logic. */
const StoreCard = ({ project, delay }) => {
  const series = getShowcaseById(project.youtubeId);

  return (
    <TiltCard delay={delay} className="h-full flex flex-col" maxTilt={3.5}>
      <div className="store-card rounded-2xl border border-white/10 hover:border-ambient-blue/50 bg-[#0d101a]/85 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 shadow-xl hover:shadow-[0_16px_36px_rgba(29,78,216,0.25)] hover:-translate-y-1 group">
        <div className="flex flex-col flex-1">
          {/* Top Badge area */}
          <div className="flex justify-between items-start gap-2 mb-4">
            <span className="store-badge-soft px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 backdrop-blur-md shadow-sm">
              Architecture Code
            </span>
            <span className="store-price-pill px-3 py-1 rounded-full text-xs font-mono font-black text-white bg-ambient-blue shadow-[0_0_15px_rgba(29,78,216,0.4)] shrink-0">
              {project.price}
            </span>
          </div>

          {/* Title */}
          <h3 className="store-card-title text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-ambient-blue transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
              {project.description}
            </p>
          )}

          {/* Features list if available */}
          {project.features && project.features.length > 0 && (
            <ul className="space-y-1.5 mb-4 text-xs text-gray-300 font-medium">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Sparkles size={12} className="text-ambient-blue shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Badges */}
          {project.tech && (
            <div className="flex items-center gap-1.5 flex-wrap mb-5 mt-auto pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="store-tech-pill px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-gray-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  {getTechIcon(t)}
                  <span className="truncate">{t}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons permanently visible at bottom */}
        <div className="pt-4 border-t border-white/10 mt-auto">
          <div className="flex gap-2">
            <button className="btn-slide-blue flex-1 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-lg border border-ambient-blue/50 cursor-pointer active:scale-95 transition-all min-w-0">
              <ShoppingCart size={15} className="shrink-0" />
              <span className="truncate">Get Bundle</span>
            </button>
            {series ? (
              <a
                href={series.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-ambient-blue border border-ambient-blue/40 hover:bg-ambient-blue/15 hover:border-ambient-blue/70 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-xs min-w-0"
              >
                <Play size={14} className="shrink-0" />
                <span className="truncate">Demo</span>
              </a>
            ) : (
              /* No series published yet — the slot stays, but inert. */
              <span
                aria-disabled="true"
                title="No public demo for this bundle yet"
                className="flex-1 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-gray-500 border border-white/10 flex items-center justify-center gap-1.5 cursor-not-allowed text-xs min-w-0"
              >
                <Play size={14} className="shrink-0" />
                <span className="truncate">No Demo</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Store = () => {
  const data = mainWebsiteData;

  const products = data.storeProjects.minor;

  return (
    <div className="page-stack">
      <div className="page-stack-body">
        
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-ambient-blue hover:text-white transition-colors mb-6 group glass-pill px-4 py-2 rounded-full w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter">
            The Code Forge<span className="text-ambient-blue">.</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Download premium production blueprints, microservice starters, UI systems, and academic code architectures.
          </p>

          {/* Bundle Content Inclusion Banner */}
          <div className="mt-8 p-4 rounded-2xl glass-card border border-ambient-blue/30 bg-ambient-blue/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm shadow-lg">
            <div className="flex items-center gap-2 font-mono font-bold text-ambient-blue">
              <Sparkles className="w-4 h-4 text-ambient-blue animate-pulse" />
              <span>Each Bundle Includes:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-gray-200 font-medium">
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Code className="w-3.5 h-3.5 text-ambient-blue" /> Code
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <FileText className="w-3.5 h-3.5 text-ambient-blue" /> Thesis
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Play className="w-3.5 h-3.5 text-ambient-blue" /> Demo
              </span>
              <span className="text-gray-500 font-black">+</span>
              <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-white/10">
                <Wrench className="w-3.5 h-3.5 text-ambient-blue" /> Installation Guide
              </span>
            </div>
          </div>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {products.map((project, i) => (
            <StoreCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Store;
