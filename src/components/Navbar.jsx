import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Braces, Menu, X, Download } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';
import { prefetchRoute } from '../App';

const navItems = [
  ['home', 'Main Site', '/'],
  ['store', 'Code Vault', '/store'],
  ['notes', 'Notes', '/notes'],
  ['videos', 'Videos', '/videos'],
];

/* Shared spring for the mobile drawer — snappy but not abrupt. */
const drawerSpring = { type: 'spring', stiffness: 380, damping: 34, mass: 0.7 };

/* Staggered entrance for each drawer row. */
const rowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.04 },
  },
};

const rowItem = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

const Navbar = ({ reducedMotion, setReducedMotion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactDrawer } = useContactDrawer();

  /* Close the mobile menu whenever the route changes */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* Close the mobile menu when the viewport grows past the mobile breakpoint,
     otherwise the overlay would stay stuck open on rotate / resize. */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mq = window.matchMedia('(min-width: 769px)');
    const handleChange = (e) => { if (e.matches) setMobileMenuOpen(false); };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [mobileMenuOpen]);

  /* Close on Escape for keyboard users */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  /* Prevent background scroll while the mobile menu is open.
     Both html and body are locked — on iOS Safari body alone leaks. */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [mobileMenuOpen]);

  /* Navigate + close. The mobile drawer uses this so taps actually route —
     previously the buttons only closed the menu. */
  const goTo = useCallback((path) => {
    setMobileMenuOpen(false);
    if (path === '/') {
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(path);
    }
  }, [navigate]);

  /* Honour the user's motion preference: skip the slide/scale, keep a fade. */
  const variants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, height: 0, y: -10 },
        animate: { opacity: 1, height: 'auto', y: 0 },
        exit: { opacity: 0, height: 0, y: -10 },
        transition: drawerSpring,
      };

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
          aria-label="Go to homepage"
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
          <span>Available for .NET &amp; Full-Stack roles</span>
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
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          data-testid="mobile-menu-toggle-button"
        >
          {/* Morphing hamburger ⇄ X, driven by the same open state */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileMenuOpen ? 'close' : 'open'}
              className="mobile-menu-icon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Nav Drawer — animated open/close */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            id="mobile-navigation"
            className="mobile-nav shell"
            data-testid="mobile-navigation"
            variants={reducedMotion ? undefined : rowVariants}
            initial="hidden"
            animate="show"
            exit={reducedMotion ? { opacity: 0 } : undefined}
            style={{ overflow: 'hidden' }}
          >
            <motion.div {...variants} className="mobile-nav-inner">
              {navItems.map(([id, label, path]) => (
                <motion.button
                  key={id}
                  variants={reducedMotion ? undefined : rowItem}
                  onMouseEnter={() => prefetchRoute(path)}
                  onTouchStart={() => prefetchRoute(path)}
                  onClick={() => goTo(path)}
                  className={location.pathname === path ? 'active' : ''}
                  aria-current={location.pathname === path ? 'page' : undefined}
                  data-testid={`mobile-nav-${id}-button`}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                variants={reducedMotion ? undefined : rowItem}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContactDrawer();
                }}
              >
                Contact
              </motion.button>
              <motion.a
                variants={reducedMotion ? undefined : rowItem}
                href="/resume.pdf"
                download
                className="mobile-resume-link cursor-pointer"
              >
                <Download size={14} />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

