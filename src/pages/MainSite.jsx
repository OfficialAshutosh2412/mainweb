import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useContactDrawer } from '../context/ContactContext';
import { portfolioData, mainWebsiteData } from '../api/mockData';
import { downloadResume } from '../components/Navbar';
import {
  ArrowRight, ArrowUpRight, Check, Copy, Database, Layers, Mail,
  MapPin, Phone, ShieldCheck, Sparkles, Terminal, Code2, Server, ExternalLink,
  BookOpen, Play, ShoppingCart, CheckCircle, Zap
} from 'lucide-react';

/* ── Selling / Blueprint Projects for Main Landing Page ── */
const sellingBlueprints = mainWebsiteData.storeProjects.minor;

const cardGradients = [
  {
    bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(118, 84, 232, 0.22))',
    border: '1px solid rgba(34, 211, 238, 0.35)',
    priceColor: '#22d3ee',
    accent: 'accent-cyan'
  },
  {
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.22))',
    border: '1px solid rgba(168, 85, 247, 0.35)',
    priceColor: '#c084fc',
    accent: 'accent-purple'
  },
  {
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 184, 166, 0.22))',
    border: '1px solid rgba(16, 185, 129, 0.35)',
    priceColor: '#34d399',
    accent: 'accent-green'
  },
  {
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(239, 68, 68, 0.22))',
    border: '1px solid rgba(245, 158, 11, 0.35)',
    priceColor: '#fbbf24',
    accent: 'accent-amber'
  }
];

const MainSite = () => {
  const [projectFilter, setProjectFilter] = useState('All');
  const [copied, setCopied] = useState(false);
  const { openContactDrawer } = useContactDrawer();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (id === 'contact') {
        openContactDrawer();
      } else {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [location, openContactDrawer]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.header.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="portfolio-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {/* ── 3D Interactive Canvas Hero Section (Contained Shell Width) ── */}
      <HeroSection />

      {/* ── Main Content Container ── */}
      <div className="shell page-content">

        {/* ─────────────────────────────────────────────────────────────
           SECTION 01: FEATURED SHOWCASE & CODE VAULT BLUEPRINTS
        ─────────────────────────────────────────────────────────────── */}
        <section id="projects" className="section">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">01</span>
              <h2>Featured <em>Vault &amp; Showcases</em></h2>
            </div>
            <Link to="/store" className="text-xs text-purple-bright hover:underline flex items-center gap-1">
              Browse Vault <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {sellingBlueprints.slice(0, 4).map((project, idx) => {
              const gStyle = cardGradients[idx % cardGradients.length];
              return (
                <article
                  key={project.id}
                  className={`project-card ${gStyle.accent}`}
                  style={{ background: gStyle.bg, border: gStyle.border }}
                >
                  <div className="project-visual">
                    <span className="project-index">0{idx + 1}</span>
                    <Link to="/store" className="project-open" title="Get Blueprint">
                      <ArrowUpRight size={15} />
                    </Link>

                    {/* 3D Window Graphic */}
                    <div className="visual-window">
                      <div className="window-bar">
                        <span /><span /><span />
                      </div>
                      <div className="visual-lines">
                        <i /><i /><i /><i /><i /><i />
                      </div>
                    </div>
                    <div className="visual-node node-a" />
                    <div className="visual-node node-b" />
                    <div className="visual-connector" />
                  </div>

                  <div className="project-body">
                    <div className="flex justify-between items-center mb-2">
                      <div className="project-eyebrow">BLUEPRINT &amp; SOURCE CODE</div>
                      <span className="text-sm font-bold font-mono" style={{ color: gStyle.priceColor }}>
                        {project.price}
                      </span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="space-y-1.5 mb-4">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-muted">
                          <CheckCircle size={13} className="text-green shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="project-footer">
                      <div className="stack-list">
                        {project.tech.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                      <Link
                        to="/store"
                        className="button button-primary text-xs py-1.5 px-3 min-h-0"
                      >
                        <ShoppingCart size={13} />
                        <span>{project.price}</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 02: DEVELOPER NOTES & ARTICLES
        ─────────────────────────────────────────────────────────────── */}
        <section id="notes" className="section">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">02</span>
              <h2>Developer <em>Notes &amp; Articles</em></h2>
            </div>
            <Link to="/notes" className="text-xs text-purple-bright hover:underline flex items-center gap-1">
              All Notes <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {mainWebsiteData.notes.slice(0, 3).map((note) => (
              <div key={note.id} className="project-card p-6 flex flex-col justify-between h-full hover:border-line-bright transition-all">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-purple-bright border border-purple/30 px-2 py-0.5 rounded">
                      {note.tech}
                    </span>
                    <span className="text-xs font-mono text-faint">{note.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{note.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-4">{note.snippet}</p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-purple-bright font-medium">
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 03: YOUTUBE TUTORIALS & VIDEOS
        ─────────────────────────────────────────────────────────────── */}
        <section id="videos" className="section">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">03</span>
              <h2>YouTube <em>Tutorials</em></h2>
            </div>
            <Link to="/videos" className="text-xs text-purple-bright hover:underline flex items-center gap-1">
              All Videos <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {mainWebsiteData.youtubeVideos.map((video) => (
              <div key={video.id} className="project-card overflow-hidden">
                <div className="aspect-video w-full">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-white line-clamp-2">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
           SECTION 04: CONTACT & COLLABORATION BANNER
        ─────────────────────────────────────────────────────────────── */}
        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div className="contact-stamp">
              <span>ASHUTOSH PRASAD</span>
              <br />
              LUCKNOW, INDIA
              <br />
              OPEN TO WORK
            </div>

            <div className="contact-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" /> GET IN TOUCH
              </div>
              <h2>Let’s Build Something Exceptional Together</h2>
              <p>
                Available for full-time software engineering roles, .NET backend development, and web application projects.
              </p>

              <div className="contact-actions">
                <button
                  className="button button-primary cursor-pointer"
                  onClick={openContactDrawer}
                >
                  <Mail size={16} /> Contact Me Now
                </button>
                <button
                  className="button button-quiet cursor-pointer"
                  onClick={copyEmail}
                >
                  {copied ? <Check size={15} className="text-green" /> : <Copy size={15} />}
                  <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
                </button>
                <button
                  className="button button-quiet cursor-pointer"
                  onClick={downloadResume}
                >
                  Download résumé
                </button>
              </div>
            </div>

            <div className="contact-meta">
              <span><MapPin size={12} /> {portfolioData.header.location}</span>
              <a href={`mailto:${portfolioData.header.email}`}>
                <Mail size={12} /> {portfolioData.header.email}
              </a>
              <a href={`tel:${portfolioData.header.phone}`}>
                <Phone size={12} /> {portfolioData.header.phone}
              </a>
              <a href={portfolioData.header.github} target="_blank" rel="noopener noreferrer">
                <Code2 size={12} /> GitHub
              </a>
              <a href={portfolioData.header.linkedin} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default MainSite;


