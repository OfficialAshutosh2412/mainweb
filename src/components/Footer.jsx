import { Link } from 'react-router-dom';
import { useContactDrawer } from '../context/ContactContext';
import { User } from 'lucide-react';

const Footer = () => {
  const { openContactDrawer } = useContactDrawer();

  return (
    <footer className="mt-auto border-t border-white/[0.07] bg-[#0a0c12]/95 backdrop-blur-xl py-10 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
        <div className="flex items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
            <span className="text-ambient-blue font-bold">&lt;Dev.io /&gt;</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
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
            className="px-3 py-1.5 rounded-lg bg-ambient-blue/15 text-ambient-blue border border-ambient-blue/30 hover:bg-ambient-blue hover:text-white transition-all text-xs font-semibold cursor-pointer"
          >
            Contact
          </button>
          <Link
            to="/portfolio"
            className="btn-slide-blue flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all"
          >
            <User size={13} />
            <span>View My Portfolio</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
