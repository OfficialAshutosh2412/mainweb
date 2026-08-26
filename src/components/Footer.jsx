import { useContactDrawer } from '../context/ContactContext';

const Footer = () => {
  const { openContactDrawer } = useContactDrawer();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/50 py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()}&nbsp;
          <span className="text-ambient-blue font-bold">&lt;Dev.io /&gt;</span>
          &nbsp;All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <a href="https://github.com/OfficialAshutosh2412" target="_blank" rel="noopener noreferrer" className="hover:text-ambient-blue transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/ashutosh-prasad-0449181ba" target="_blank" rel="noopener noreferrer" className="hover:text-ambient-blue transition-colors">LinkedIn</a>
          <button onClick={openContactDrawer} className="hover:text-ambient-blue transition-colors cursor-pointer">Contact</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

