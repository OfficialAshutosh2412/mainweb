import { ReactLenis } from 'lenis/react';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import ContactDrawer from './ContactDrawer';
import { ContactProvider } from '../context/ContactContext';

const Layout = ({ children }) => {
  return (
    <ContactProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
        <ScrollProgress />
        <Navbar />
        <div className="flex flex-col min-h-screen w-full relative overflow-x-hidden">
          {children}
        </div>
        <ContactDrawer />
      </ReactLenis>
    </ContactProvider>
  );
};

export default Layout;

