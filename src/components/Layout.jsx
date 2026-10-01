import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import ContactDrawer from './ContactDrawer';
import { ContactProvider } from '../context/ContactContext';

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Lenis smooth scrolling hijacks touch gestures, so it is disabled on
     small screens and for users who prefer reduced motion. We track this
     with matchMedia listeners rather than a resize handler so the
     breakpoint reacts instantly to orientation changes too. */
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 768px)');
    const coarse = window.matchMedia('(pointer: coarse)');

    const update = () => setIsMobile(narrow.matches || coarse.matches);

    update();
    narrow.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => {
      narrow.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
    };
  }, []);

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
      <ScrollProgress />
      <Navbar reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} />
      <div className="app-content flex flex-col w-full relative z-10">
        {children}
      </div>
      <ContactDrawer />
    </div>
  );

  return (
    <ContactProvider>
      {isMobile || reducedMotion ? (
        <div className="app-root w-full relative">{pageContent}</div>
      ) : (
        <ReactLenis
          root
          options={{
            /* Tuned for a smooth but responsive feel: enough smoothing to
               feel "premium", not so much that input feels laggy. */
            lerp: 0.1,
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            /* Native touch scrolling is faster and more predictable on
               phones, so Lenis stays out of the way there. */
            syncTouch: false,
            infinite: false,
          }}
        >
          {pageContent}
        </ReactLenis>
      )}
    </ContactProvider>
  );
};

export default Layout;

