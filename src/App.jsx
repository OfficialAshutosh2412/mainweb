import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import PageRevealer from './components/PageRevealer';

/* ── Code-split routes for instant initial bundle loading ── */
const MainSite = lazy(() => import('./pages/MainSite'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Projects = lazy(() => import('./pages/Projects'));
const Notes = lazy(() => import('./pages/Notes'));
const Videos = lazy(() => import('./pages/Videos'));
const Store = lazy(() => import('./pages/Store'));

/* ── Prefetch functions on link hover / interaction for 0ms route transitions ── */
export const prefetchRoute = (path) => {
  switch (path) {
    case '/portfolio':
      import('./pages/Portfolio');
      break;
    case '/projects':
      import('./pages/Projects');
      break;
    case '/notes':
      import('./pages/Notes');
      break;
    case '/videos':
      import('./pages/Videos');
      break;
    case '/store':
      import('./pages/Store');
      break;
    case '/':
    default:
      import('./pages/MainSite');
      break;
  }
};

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
    {/* Single persistent overlay — watches location internally */}
    <PageRevealer />
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/videos" element={<Videos />} />
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
