import { useContactDrawer } from '../context/ContactContext';

const Footer = () => {
  const { openContactDrawer } = useContactDrawer();

  return (
    <footer className="mt-auto border-t border-white/10 bg-dark-bg/60 backdrop-blur-xl py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
        <div className="flex items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
            <span className="text-ambient-blue font-bold">&lt;Dev.io /&gt;</span>
            &nbsp;Crafted with modern 3D depth & precision.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <a 
            href="https://github.com/OfficialAshutosh2412" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-3 py-1.5 rounded-lg glass-pill hover:text-ambient-blue hover:border-ambient-blue/40 transition-all text-xs font-semibold"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/ashutosh-prasad-0449181ba" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-3 py-1.5 rounded-lg glass-pill hover:text-ambient-blue hover:border-ambient-blue/40 transition-all text-xs font-semibold"
          >
            LinkedIn
          </a>
          <button 
            onClick={openContactDrawer} 
            className="px-3 py-1.5 rounded-lg bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 hover:bg-ambient-blue hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-sm"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
