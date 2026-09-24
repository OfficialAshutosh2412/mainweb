import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Braces, Menu, X, Download } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';
import { prefetchRoute } from '../App';

const navItems = [
  ['home', 'Main Site', '/'],
  ['portfolio', 'Portfolio', '/portfolio'],
  ['store', 'Code Vault', '/store'],
  ['notes', 'Notes', '/notes'],
  ['videos', 'Videos', '/videos'],
];



const Navbar = ({ reducedMotion, setReducedMotion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactDrawer } = useContactDrawer();

  return (
    <header className="site-header" data-testid="site-header">
      <div className="shell header-inner">
        {/* Brand Lockup */}
        <button
          className="brand-lockup cursor-pointer"
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          data-testid="brand-home-button"
        >
          <span className="brand-mark">
            <Braces size={19} strokeWidth={2.5} />
          </span>
          <span className="brand-name">
            ashutosh<span>.dev</span>
          </span>
        </button>

        {/* Live Status Chip */}
        <div className="status-chip" data-testid="api-status-indicator">
          <span className="status-dot" />
          <span>Available for .NET & Full-Stack roles</span>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Primary navigation" data-testid="desktop-navigation">
          {navItems.map(([id, label, path]) => (
            <Link
              key={id}
              to={path}
              onMouseEnter={() => prefetchRoute(path)}
              onTouchStart={() => prefetchRoute(path)}
              className={`cursor-pointer ${location.pathname === path ? 'active' : ''}`}
              data-testid={`nav-${id}-link`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={openContactDrawer}
            className="cursor-pointer"
            data-testid="nav-contact-button"
          >
            Contact
          </button>
        </nav>

        {/* Motion Toggle */}
        <button
          className="motion-toggle cursor-pointer"
          onClick={() => setReducedMotion && setReducedMotion(v => !v)}
          aria-pressed={reducedMotion}
          data-testid="motion-toggle-button"
          title="Toggle 3D Stage Motion"
        >
          <span className={`toggle-indicator ${reducedMotion ? 'is-on' : ''}`} />
          <span>{reducedMotion ? 'Still mode' : 'Motion on'}</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button cursor-pointer"
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          data-testid="mobile-menu-toggle-button"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav shell" data-testid="mobile-navigation">
          {navItems.map(([id, label, path]) => (
            <button
              key={id}
              onMouseEnter={() => prefetchRoute(path)}
              onTouchStart={() => prefetchRoute(path)}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(path);
              }}
              data-testid={`mobile-nav-${id}-button`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openContactDrawer();
            }}
          >
            Contact
          </button>
          <a href='resume' download={true}
            className="mobile-resume-link cursor-pointer"

          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

