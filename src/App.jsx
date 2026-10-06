import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Layout from './components/Layout';

/* ── Code-split routes for instant initial bundle loading ── */
const MainSite = lazy(() => import('./pages/MainSite'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Projects = lazy(() => import('./pages/Projects'));
const Notes = lazy(() => import('./pages/Notes'));
const Videos = lazy(() => import('./pages/Videos'));
const Store = lazy(() => import('./pages/Store'));
const PlaylistVideo = lazy(() => import('./pages/PlaylistVideo'));

/* ── Route prefetching lives in ../prefetchRoute.js (own module so no one
   has to import App.jsx and recreate the Layout → Navbar cycle). ── */

/* Sleek Cyber Suspense Fallback (Zero CLS) */
const PageFallback = () => (
  <div className="w-full min-h-[60vh] flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
      <span className="text-[11px] font-mono tracking-widest text-gray-500 uppercase">
        Loading...
      </span>
    </div>
  </div>
);

/* Scroll to top automatically on route changes */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* App routes — PageRevealer is a persistent singleton, no remounting */
const AppInner = () => (
  <>
    <ScrollToTop />
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/videos" element={<Videos />} />
          {/* Playlist detail: /video/<playlist_name> */}
          <Route path="/video/:slug" element={<PlaylistVideo />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Suspense>
    </Layout>
  </>
);

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
