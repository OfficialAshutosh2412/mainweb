import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ContactDrawer from './ContactDrawer';
import { ContactProvider } from '../context/ContactContext';

const Layout = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Respect the OS-level reduced motion preference by default */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const pageContent = (
    <div className={`portfolio-shell ${reducedMotion ? 'motion-reduced' : ''}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <Navbar reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} />
      <div className="app-content flex flex-col w-full relative z-10">
        {children}
      </div>
      <ContactDrawer />
    </div>
  );

  return (
    <ContactProvider>
      <div className="app-root w-full relative">{pageContent}</div>
    </ContactProvider>
  );
};

export default Layout;

