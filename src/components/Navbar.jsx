import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Mail, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactDrawer } from '../context/ContactContext';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const { openContactDrawer } = useContactDrawer();

  // Scroll detection for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme changes with DOM
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Close slide menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSlideMenuOpen(false);
    };
    if (slideMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [slideMenuOpen]);

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    setSlideMenuOpen(false);
    if (targetId === '#contact') {
      openContactDrawer();
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/${targetId}`);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePortfolioScroll = (e, targetId) => {
    e.preventDefault();
    setSlideMenuOpen(false);
    if (targetId === '#contact') {
      openContactDrawer();
      return;
    }
    if (location.pathname !== '/portfolio') {
      navigate(`/portfolio${targetId}`);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';
  const isPortfolio = location.pathname === '/portfolio';
  const isSubPage = !isHome && !isPortfolio;

  // Bottom-to-top animated link style class (clean, borderless, without arrow)
  const menuLinkClass = "nav-link-bottom-to-top group flex items-center w-full px-4 py-3.5 rounded-xl text-base font-semibold text-gray-200 hover:text-white transition-all duration-300 cursor-pointer";

  return (
    <>
      {/* ── Fixed Top Navbar ── */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-[#090b11]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3' 
            : 'bg-transparent border-b border-transparent py-4 sm:py-6'
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => setSlideMenuOpen(false)} 
            className="text-xl sm:text-2xl font-black text-white tracking-tighter flex items-center gap-1 group"
          >
            <span className="text-ambient-blue font-bold group-hover:scale-125 transition-transform duration-300">&lt;</span>
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:to-blue-300 transition-all">
              Dev.io
            </span>
            <span className="text-ambient-blue font-bold group-hover:scale-125 transition-transform duration-300">/&gt;</span>
          </Link>

          {/* Right Header Controls: Contact + Light/Dark Theme + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Contact Button with Bottom-to-Top background animation (Borderless) */}
            <button
              onClick={openContactDrawer}
              className="nav-link-bottom-to-top px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              title="Get in touch"
            >
              <Mail className="w-3.5 h-3.5 text-ambient-blue" />
              <span>Contact</span>
            </button>

            {/* Light/Dark Theme Toggle Icon Button with Bottom-to-Top background animation (Borderless) */}
            <button
              onClick={toggleTheme}
              className="nav-link-bottom-to-top p-2 sm:p-2.5 rounded-xl text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md cursor-pointer flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </motion.div>
            </button>

            {/* Hamburger Menu Button with Bottom-to-Top background animation (Borderless) */}
            <button
              onClick={() => setSlideMenuOpen(true)}
              className="nav-link-bottom-to-top p-2 sm:px-3.5 sm:py-2 rounded-xl text-gray-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-sm group"
              aria-label="Open menu"
              title="Open menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-ambient-blue transition-colors" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Menu</span>
            </button>

          </div>

        </div>
      </header>

      {/* ── Slide Menubar from Right Side ── */}
      <AnimatePresence>
        {slideMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSlideMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            />

            {/* Slide-in Drawer Container */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 27, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[340px] sm:max-w-[400px] bg-[#0c0f18]/95 backdrop-blur-2xl border-l border-white/10 shadow-[-25px_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white tracking-tighter">
                      <span className="text-ambient-blue">&lt;</span>Dev.io<span className="text-ambient-blue">/&gt;</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSlideMenuOpen(false)}
                    className="nav-link-bottom-to-top p-2 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Links with Bottom-to-Top Background Animation */}
                <div className="space-y-2">
                  {isHome && (
                    <>
                      <a href="#showcase" onClick={(e) => handleScrollToSection(e, '#showcase')} className={menuLinkClass}>
                        <span>Showcase Projects</span>
                      </a>
                      <a href="#store" onClick={(e) => handleScrollToSection(e, '#store')} className={menuLinkClass}>
                        <span>Store / Blueprints</span>
                      </a>
                      <Link to="/portfolio" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span className="flex items-center gap-2">
                          <span>Portfolio Resume</span>
                          <Sparkles className="w-3.5 h-3.5 text-ambient-blue" />
                        </span>
                      </Link>
                      <Link to="/notes" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Notes & Articles</span>
                      </Link>
                      <Link to="/videos" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>YouTube Tutorials</span>
                      </Link>
                    </>
                  )}

                  {isPortfolio && (
                    <>
                      <Link to="/" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Home Page</span>
                      </Link>
                      <a href="#summary" onClick={(e) => handlePortfolioScroll(e, '#summary')} className={menuLinkClass}>
                        <span>Executive Summary</span>
                      </a>
                      <a href="#skills" onClick={(e) => handlePortfolioScroll(e, '#skills')} className={menuLinkClass}>
                        <span>Technical Skills</span>
                      </a>
                      <a href="#experience" onClick={(e) => handlePortfolioScroll(e, '#experience')} className={menuLinkClass}>
                        <span>Experience</span>
                      </a>
                      <a href="#certificates" onClick={(e) => handlePortfolioScroll(e, '#certificates')} className={menuLinkClass}>
                        <span>Certificates</span>
                      </a>
                      <a href="#projects" onClick={(e) => handlePortfolioScroll(e, '#projects')} className={menuLinkClass}>
                        <span>Portfolio Projects</span>
                      </a>
                      <a href="#timeline" onClick={(e) => handlePortfolioScroll(e, '#timeline')} className={menuLinkClass}>
                        <span>Education Timeline</span>
                      </a>
                    </>
                  )}

                  {isSubPage && (
                    <>
                      <Link to="/" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Home</span>
                      </Link>
                      <Link to="/portfolio" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Portfolio</span>
                      </Link>
                      <Link to="/notes" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Notes</span>
                      </Link>
                      <Link to="/videos" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Videos</span>
                      </Link>
                      <Link to="/store" onClick={() => setSlideMenuOpen(false)} className={menuLinkClass}>
                        <span>Store</span>
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => {
                      setSlideMenuOpen(false);
                      openContactDrawer();
                    }}
                    className={menuLinkClass}
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-ambient-blue" />
                      <span>Contact / Inquiry</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <button
                  onClick={() => {
                    setSlideMenuOpen(false);
                    openContactDrawer();
                  }}
                  className="btn-slide-blue w-full py-3.5 px-4 bg-ambient-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Send Direct Message</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open to Work</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/OfficialAshutosh2412"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/ashutosh-prasad-0449181ba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
