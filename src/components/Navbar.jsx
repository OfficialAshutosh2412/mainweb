import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Braces,
  Menu,
  X,
  ChevronRight,
  Home,
  Briefcase,
  Code2,
  BookOpen,
  Film,
  Mail,
} from 'lucide-react';
import { useContactActions } from '../context/ContactContext';
import { prefetchRoute } from '../prefetchRoute';

const navItems = [
  ['home', 'Main Site', '/', Home],
  ['store', 'Code Vault', '/store', Code2],
  ['notes', 'Notes', '/notes', BookOpen],
  ['videos', 'Videos', '/videos', Film],
  ['portfolio', 'Visit Portfolio', '/portfolio', Briefcase],
];

const isNavActive = (pathname, path) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path);

const Navbar = ({ reducedMotion, setReducedMotion }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactDrawer } = useContactActions();

  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [drawerOpen]);

  const goTo = useCallback((path) => {
    setDrawerOpen(false);
    if (path === '/' && window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  }, [navigate]);

  return (
    <>
      <header className="site-header" data-testid="site-header">
        <div className="shell header-inner">
          {/* Brand Lockup — left */}
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

          {/* Spacer pushes hamburger to the right */}
          <div style={{ flex: 1 }} />

          {/* Hamburger — always visible, far right */}
          <button
            className="nav-hamburger cursor-pointer"
            onClick={() => setDrawerOpen(v => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            data-testid="nav-hamburger-button"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={drawerOpen ? 'close' : 'open'}
                style={{ display: 'grid', placeItems: 'center' }}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {drawerOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Sliding Nav Drawer (right side) ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] cursor-pointer"
              style={{
                background: 'rgba(5, 6, 12, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />

            {/* Panel — single solid dark color, no gradient */}
            <motion.nav
              key="nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full z-[60] flex flex-col justify-between overflow-x-hidden overflow-y-auto no-scrollbar"
              style={{
                width: '100%',
                maxWidth: '420px',
                background: '#090a0f',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.85)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                overflowX: 'hidden',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              aria-label="Main navigation"
            >
              {/* Top Bar with Stable, Non-Flickering Close Button */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: '24px 28px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-white border border-white/10 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation container - NO padding, strictly clipped horizontally */}
              <motion.div
                variants={{
                  open: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
                initial="closed"
                animate="open"
                exit="closed"
                style={{
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                {navItems.map(([id, label, path, Icon]) => {
                  const active = isNavActive(location.pathname, path);
                  return (
                    <motion.button
                      key={id}
                      variants={{
                        open: { opacity: 1, x: 0, filter: 'blur(0px)' },
                        closed: { opacity: 0, x: 40, filter: 'blur(5px)' },
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => prefetchRoute(path)}
                      onTouchStart={() => prefetchRoute(path)}
                      onClick={() => goTo(path)}
                      className={`nav-drawer-item group cursor-pointer ${active ? 'is-active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      data-testid={`nav-drawer-${id}-link`}
                    >
                      <span className="nav-drawer-fill" />
                      <span className="nav-drawer-label flex items-center gap-3">
                        <Icon
                          size={18}
                          className="text-purple-400 group-hover:text-white transition-colors duration-200 shrink-0"
                        />
                        <span>{label}</span>
                      </span>
                      <ChevronRight
                        size={18}
                        className="nav-drawer-icon"
                        style={{
                          color: active ? '#ffffff' : 'rgba(255,255,255,0.4)',
                        }}
                      />
                    </motion.button>
                  );
                })}

              </motion.div>

              {/* Contact Button at the end — styled as a prominent CTA button */}
              <div style={{ padding: '24px 28px 32px' }}>
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setDrawerOpen(false);
                    openContactDrawer();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 shadow-[0_8px_24px_rgba(118,84,232,0.35)] hover:shadow-[0_12px_32px_rgba(156,135,255,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                  data-testid="nav-drawer-contact-button"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  <span>Contact Me</span>
                </motion.button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
