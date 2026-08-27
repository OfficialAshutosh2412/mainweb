import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactDrawer } from '../context/ContactContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openContactDrawer } = useContactDrawer();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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

  const linkClass = "relative px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5 cursor-pointer flex items-center gap-1 group";
  const mobileLinkClass = "block py-3 text-lg font-semibold text-gray-300 hover:text-ambient-blue border-b border-white/5 transition-colors cursor-pointer";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      <div 
        className={`max-w-6xl mx-auto rounded-2xl px-5 py-3 transition-all duration-300 flex justify-between items-center ${
          scrolled 
            ? 'bg-dark-bg/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)]'
            : 'bg-dark-bg/40 backdrop-blur-md border border-white/5 shadow-lg'
        }`}
      >
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)} 
          className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-1.5 group"
        >
          <span className="text-ambient-blue font-bold group-hover:scale-125 transition-transform duration-300">&lt;</span>
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:to-ambient-blue transition-all">Dev.io</span>
          <span className="text-ambient-blue font-bold group-hover:scale-125 transition-transform duration-300">/&gt;</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center text-sm font-semibold text-gray-300">
          {isHome && (
            <>
              <a href="#showcase" onClick={(e) => handleScroll(e, '#showcase')} className={linkClass}>Showcase</a>
              <a href="#store" onClick={(e) => handleScroll(e, '#store')} className={linkClass}>Store</a>
              <Link to="/notes" className={linkClass}>Notes</Link>
              <Link to="/videos" className={linkClass}>Videos</Link>
              <Link to="/portfolio" className={linkClass}>
                <span>Portfolio</span>
                <Sparkles className="w-3.5 h-3.5 text-ambient-blue opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
              </Link>
              <button onClick={openContactDrawer} className={linkClass}>Contact</button>
            </>
          )}
          {isPortfolio && (
            <>
              <Link to="/" className={linkClass}>Home</Link>
              <a href="#summary" onClick={(e) => handlePortfolioScroll(e, '#summary')} className={linkClass}>Summary</a>
              <a href="#skills" onClick={(e) => handlePortfolioScroll(e, '#skills')} className={linkClass}>Skills</a>
              <a href="#experience" onClick={(e) => handlePortfolioScroll(e, '#experience')} className={linkClass}>Experience</a>
              <a href="#certificates" onClick={(e) => handlePortfolioScroll(e, '#certificates')} className={linkClass}>Certificates</a>
              <a href="#projects" onClick={(e) => handlePortfolioScroll(e, '#projects')} className={linkClass}>Projects</a>
              <a href="#timeline" onClick={(e) => handlePortfolioScroll(e, '#timeline')} className={linkClass}>Education</a>
              
              {/* Hire Me CTA Button */}
              <button
                onClick={openContactDrawer}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-ambient-blue to-blue-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Hire Me
              </button>
            </>
          )}
          {isSubPage && (
            <>
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/portfolio" className={linkClass}>Portfolio</Link>
              <Link to="/notes" className={linkClass}>Notes</Link>
              <Link to="/videos" className={linkClass}>Videos</Link>
              <Link to="/store" className={linkClass}>Store</Link>
              <button 
                onClick={openContactDrawer} 
                className="ml-2 px-4 py-1.5 rounded-lg bg-ambient-blue/20 border border-ambient-blue/40 text-ambient-blue hover:bg-ambient-blue hover:text-white transition-all cursor-pointer font-semibold"
              >
                Contact
              </button>
            </>
          )}
        </nav>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-ambient-blue transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="max-w-6xl mx-auto mt-2 bg-dark-bg/95 border border-white/10 rounded-2xl backdrop-blur-2xl px-6 py-6 md:hidden shadow-2xl transition-all duration-300"
        >
          <div className="flex flex-col space-y-1">
            {isHome && (
              <>
                <a href="#showcase" onClick={(e) => handleScroll(e, '#showcase')} className={mobileLinkClass}>Showcase</a>
                <a href="#store" onClick={(e) => handleScroll(e, '#store')} className={mobileLinkClass}>Store</a>
                <Link to="/notes" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Notes</Link>
                <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Videos</Link>
                <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Portfolio</Link>
                <button onClick={() => { setMobileMenuOpen(false); openContactDrawer(); }} className={`${mobileLinkClass} text-left`}>Contact</button>
              </>
            )}
            {isPortfolio && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Home</Link>
                <a href="#summary" onClick={(e) => handlePortfolioScroll(e, '#summary')} className={mobileLinkClass}>Summary</a>
                <a href="#skills" onClick={(e) => handlePortfolioScroll(e, '#skills')} className={mobileLinkClass}>Skills</a>
                <a href="#experience" onClick={(e) => handlePortfolioScroll(e, '#experience')} className={mobileLinkClass}>Experience</a>
                <a href="#certificates" onClick={(e) => handlePortfolioScroll(e, '#certificates')} className={mobileLinkClass}>Certificates</a>
                <a href="#projects" onClick={(e) => handlePortfolioScroll(e, '#projects')} className={mobileLinkClass}>Projects</a>
                <a href="#timeline" onClick={(e) => handlePortfolioScroll(e, '#timeline')} className={mobileLinkClass}>Education</a>
                <button
                  onClick={() => { setMobileMenuOpen(false); openContactDrawer(); }}
                  className="mt-3 flex items-center justify-center gap-2 py-3 px-6 bg-ambient-blue text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Hire Me
                </button>
              </>
            )}
            {isSubPage && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Home</Link>
                <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Portfolio</Link>
                <Link to="/notes" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Notes</Link>
                <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Videos</Link>
                <Link to="/store" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>Store</Link>
                <button onClick={() => { setMobileMenuOpen(false); openContactDrawer(); }} className={`${mobileLinkClass} text-left`}>Contact</button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
