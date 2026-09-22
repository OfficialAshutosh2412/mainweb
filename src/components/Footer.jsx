import { Link } from 'react-router-dom';
import { UserCheck, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="shell site-footer flex-col sm:flex-row gap-4 py-8 border-t border-line">
      <div className="text-xs text-muted">
        ASHUTOSH PRASAD <span className="footer-dot">•</span> LUCKNOW, UP <span className="footer-dot">•</span> C# / .NET DEVELOPER
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Link
          to="/portfolio"
          className="button button-primary text-xs py-1.5 px-3.5 gap-1.5 cursor-pointer"
        >
          <UserCheck size={14} />
          <span>View Portfolio &amp; Resume</span>
          <ArrowUpRight size={13} />
        </Link>
        <a
          href="https://github.com/OfficialAshutosh2412"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white text-xs text-muted transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ashutosh-prasad-0449181ba"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white text-xs text-muted transition-colors"
        >
          LinkedIn
        </a>
        <button onClick={scrollToTop} className="cursor-pointer text-xs text-muted hover:text-white">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;

