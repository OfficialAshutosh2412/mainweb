import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openContactDrawer } = useContactDrawer();

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

  const linkClass = "relative py-1.5 transition-colors text-gray-300 hover:text-ambient-blue after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-ambient-blue after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-300 cursor-pointer";
  const mobileLinkClass = "block py-3 text-lg font-semibold text-gray-300 hover:text-ambient-blue border-b border-white/5 transition-colors cursor-pointer";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/60 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-white tracking-tighter flex items-center gap-1 group">
          <span className="text-ambient-blue font-bold group-hover:scale-110 transition-transform">&lt;</span>
          Dev.io
          <span className="text-ambient-blue font-bold group-hover:scale-110 transition-transform">/&gt;</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-sm font-semibold text-gray-300">
          {isHome && (
            <>
              <a href="#showcase" onClick={(e) => handleScroll(e, '#showcase')} className={linkClass}>Showcase</a>
              <a href="#store" onClick={(e) => handleScroll(e, '#store')} className={linkClass}>Store</a>
              <Link to="/notes" className={linkClass}>Notes</Link>
              <Link to="/videos" className={linkClass}>Videos</Link>
              <Link to="/portfolio" className={linkClass}>Portfolio</Link>
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
                className="px-5 py-2 bg-ambient-blue text-white text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_28px_rgba(59,130,246,0.55)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
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
              <button onClick={openContactDrawer} className="text-ambient-blue hover:text-white transition-colors relative py-1.5 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-ambient-blue after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-300 cursor-pointer">Contact</button>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden text-gray-300 hover:text-ambient-blue transition-colors focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[61px] left-0 right-0 bg-dark-bg/95 border-b border-white/10 backdrop-blur-lg px-6 py-6 md:hidden transition-all duration-300">
          <div className="flex flex-col space-y-2">
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
                  className="mt-3 flex items-center justify-center gap-2 py-3 px-6 bg-ambient-blue text-white font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;

