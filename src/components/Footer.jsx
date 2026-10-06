import { Link } from 'react-router-dom';
import { UserCheck, ArrowUpRight } from 'lucide-react';
import { prefetchRoute } from '../prefetchRoute';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="shell site-footer border-t border-line">
      <div className="site-footer-brand">
        ASHUTOSH PRASAD <span className="footer-dot">•</span> LUCKNOW, UP{' '}
        <span className="footer-dot">•</span> C# / .NET DEVELOPER
      </div>

      <nav className="site-footer-links" aria-label="Footer navigation">
        <Link
          to="/portfolio"
          onMouseEnter={() => prefetchRoute('/portfolio')}
          onTouchStart={() => prefetchRoute('/portfolio')}
          className="button button-primary site-footer-cta"
        >
          <UserCheck size={14} />
          <span>View Portfolio &amp; Resume</span>
          <ArrowUpRight size={13} />
        </Link>
        <a
          href="https://github.com/OfficialAshutosh2412"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ashutosh-prasad-0449181ba"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-link"
        >
          LinkedIn
        </a>
        <button onClick={scrollToTop} className="site-footer-link cursor-pointer">
          Back to top ↑
        </button>
      </nav>
    </footer>
  );
};

export default Footer;

