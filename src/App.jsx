import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import PageRevealer from './components/PageRevealer';
import MainSite from './pages/MainSite';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import Notes from './pages/Notes';
import Videos from './pages/Videos';
import Store from './pages/Store';

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
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/store" element={<Store />} />
      </Routes>
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
