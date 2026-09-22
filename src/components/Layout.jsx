import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import ContactDrawer from './ContactDrawer';
import { ContactProvider } from '../context/ContactContext';

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pageContent = (
    <div className={`portfolio-shell ${reducedMotion ? 'motion-reduced' : ''}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <ScrollProgress />
      <Navbar reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} />
      <div className="flex flex-col min-h-screen w-full relative overflow-x-hidden z-10">
        {children}
      </div>
      <ContactDrawer />
    </div>
  );

  return (
    <ContactProvider>
      {isMobile ? (
        <div className="w-full min-h-screen relative overflow-x-hidden">
          {pageContent}
        </div>
      ) : (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
          {pageContent}
        </ReactLenis>
      )}
    </ContactProvider>
  );
};

export default Layout;

