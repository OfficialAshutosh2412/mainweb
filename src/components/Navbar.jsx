import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Braces, Menu, X, Download } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';

const navItems = [
  ['home', 'Main Site', '/'],
  ['portfolio', 'Portfolio & CV', '/portfolio'],
  ['store', 'Code Vault', '/store'],
  ['notes', 'Notes', '/notes'],
  ['videos', 'Videos', '/videos'],
];

export const downloadResume = () => {
  const resume = `ASHUTOSH PRASAD
C# / .NET & Full-Stack Developer
Location: Lucknow, Uttar Pradesh | Phone: +91-6386239194
Email: ashutoshprasad2427@gmail.com
LinkedIn: https://linkedin.com/in/ashutosh-prasad-0449181ba
GitHub: https://github.com/OfficialAshutosh2412

SUMMARY
MCA graduate with hands-on experience in C#, ASP.NET MVC, ASP.NET Core Web API, React.js, and SQL Server. Skilled in developing full-stack web applications, RESTful APIs, JWT Authentication, and database-driven applications using Entity Framework Core & ADO.NET.

TECHNICAL SKILLS
- Languages: C#, JavaScript, SQL, Python, C, C++
- Backend: ASP.NET Core Web API, ASP.NET MVC, Entity Framework Core, ADO.NET, LINQ, JWT Auth, SignalR, RESTful APIs
- Frontend: React.js, HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap, AJAX, jQuery
- Databases: SQL Server, PostgreSQL, MySQL
- Tools: Visual Studio, VS Code, Git, GitHub, Postman, Swagger, SSMS, Vercel, Render, Supabase

ACADEMIC & SHOWCASE PROJECTS
- Quality Management System (QMS): Full-Stack ASP.NET Core Web API + React.js + PostgreSQL/SQL Server
- Crime Tracking System (CTS): ASP.NET MVC + C# + EF + AJAX + SQL Server
- SIS Institute Academy Portal: ASP.NET Web Forms + C# + ADO.NET + SQL Server

EDUCATION
- MCA (Master of Computer Applications) — AKTU, Lucknow (CGPA: 8.24)
- BCA (Bachelor of Computer Applications) — Lucknow University (61.02%)
`;
  const blob = new Blob([resume], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'ashutosh-prasad-resume.txt';
  anchor.click();
  URL.revokeObjectURL(url);
};

const Navbar = ({ reducedMotion, setReducedMotion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openContactDrawer } = useContactDrawer();

  return (
    <header className="site-header" data-testid="site-header">
      <div className="shell header-inner">
        {/* Brand Lockup */}
        <button
          className="brand-lockup cursor-pointer"
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          data-testid="brand-home-button"
        >
          <span className="brand-mark">
            <Braces size={19} strokeWidth={2.5} />
          </span>
          <span className="brand-name">
            ashutosh<span>.dev</span>
          </span>
        </button>

        {/* Live Status Chip */}
        <div className="status-chip" data-testid="api-status-indicator">
          <span className="status-dot" />
          <span>Available for .NET & Full-Stack roles</span>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Primary navigation" data-testid="desktop-navigation">
          {navItems.map(([id, label, path]) => (
            <Link
              key={id}
              to={path}
              className={`cursor-pointer ${location.pathname === path ? 'active' : ''}`}
              data-testid={`nav-${id}-link`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={openContactDrawer}
            className="cursor-pointer"
            data-testid="nav-contact-button"
          >
            Contact
          </button>
        </nav>

        {/* Motion Toggle */}
        <button
          className="motion-toggle cursor-pointer"
          onClick={() => setReducedMotion && setReducedMotion(v => !v)}
          aria-pressed={reducedMotion}
          data-testid="motion-toggle-button"
          title="Toggle 3D Stage Motion"
        >
          <span className={`toggle-indicator ${reducedMotion ? 'is-on' : ''}`} />
          <span>{reducedMotion ? 'Still mode' : 'Motion on'}</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button cursor-pointer"
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          data-testid="mobile-menu-toggle-button"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav shell" data-testid="mobile-navigation">
          {navItems.map(([id, label, path]) => (
            <button
              key={id}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(path);
              }}
              data-testid={`mobile-nav-${id}-button`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openContactDrawer();
            }}
          >
            Contact
          </button>
          <button
            className="mobile-resume-link"
            onClick={() => {
              setMobileMenuOpen(false);
              downloadResume();
            }}
            data-testid="mobile-resume-download-button"
          >
            <Download size={15} /> Download résumé
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

