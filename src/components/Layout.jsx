import { ReactLenis } from 'lenis/react';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import ContactDrawer from './ContactDrawer';
import ParallaxBackground from './ParallaxBackground';
import { ContactProvider } from '../context/ContactContext';

const Layout = ({ children }) => {
  return (
    <ContactProvider>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothTouch: true }}>
        <ScrollProgress />
        <ParallaxBackground />
        <Navbar />
        <div className="flex flex-col min-h-screen w-full relative overflow-x-hidden z-10">
          {children}
        </div>
        <ContactDrawer />
      </ReactLenis>
    </ContactProvider>
  );
};

export default Layout;
