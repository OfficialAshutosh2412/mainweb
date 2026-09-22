import { ArrowUpRight, Download, Code2, Database, Cloud, Terminal, ShieldCheck, Cpu, Layers, Sparkles } from 'lucide-react';
import { downloadResume } from './Navbar';

const orbitTech = [
  { name: 'C#', class: 'tech-csharp', icon: Code2, index: 0 },
  { name: 'ASP.NET', class: 'tech-dotnet', icon: Terminal, index: 1 },
  { name: 'SQL Server', class: 'tech-sql', icon: Database, index: 2 },
  { name: 'Azure / Cloud', class: 'tech-azure', icon: Cloud, index: 3 },
  { name: 'React.js', class: 'tech-react', icon: Layers, index: 4 },
  { name: 'EF Core', class: 'tech-docker', icon: Cpu, index: 5 },
  { name: 'SignalR', class: 'tech-redis', icon: Sparkles, index: 6 },
  { name: 'JWT Auth', class: 'tech-grpc', icon: ShieldCheck, index: 7 }
];

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="shell hero-section" data-testid="hero-section">
      {/* Left Column: Hero Text Copy & CTAs */}
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-line" /> FULL-STACK .NET ENGINEER
        </div>
        <h1 data-testid="hero-heading">
          I build software<br />
          <span>people can trust.</span>
        </h1>
        <p className="hero-lede hero-lede-large" data-testid="hero-description">
          I design &amp; build dependable software — from high-throughput .NET backend APIs to modern, responsive React web platforms.
        </p>

        <div className="hero-actions">
          <button
            className="button button-primary cursor-pointer"
            onClick={scrollToProjects}
            data-testid="hero-projects-button"
          >
            See selected work <ArrowUpRight size={17} />
          </button>
          <button
            className="button button-quiet cursor-pointer"
            onClick={downloadResume}
            data-testid="hero-resume-download-button"
          >
            <Download size={16} /> Download résumé
          </button>
        </div>

        <div className="hero-proof" data-testid="hero-proof-row">
          <div>
            <strong>3+</strong>
            <span>Years Shipping</span>
          </div>
          <div>
            <strong>15+</strong>
            <span>Projects Built</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>API Reliability</span>
          </div>
        </div>
      </div>

      {/* Right Column: 3D Interactive Stage Architecture Canvas */}
      <div className="hero-stage-wrap">
        {/* Perspective Grid */}
        <div className="hero-stage-grid" aria-hidden="true" />

        {/* 3D Orbit Rings */}
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="orbit orbit-three" aria-hidden="true" />

        {/* Central 3D Floating Core Card */}
        <div className="core-card">
          <div className="core-card-top">
            <Code2 size={13} />
            <span>.NET 8.0 ARCH</span>
            <span className="core-version">v8.0.4</span>
          </div>
          <div className="core-symbol">&#123; &#125;</div>
          <div className="core-title">ASP.NET Core API</div>
          <div className="core-subtitle">RESTful & Event-Driven Layer</div>
          <div className="core-code">
            <span>builder</span>.Services.AddScoped&lt;<b>IApiService</b>&gt;();
          </div>
        </div>

        {/* Tech Badges floating along orbital paths */}
        {orbitTech.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.name}
              className={`tech-badge ${item.class}`}
              style={{ '--badge-index': item.index }}
            >
              <div className="tech-badge-icon">
                <IconComp size={13} />
              </div>
              <span>{item.name}</span>
            </div>
          );
        })}

        {/* Stage Caption */}
        <div className="stage-caption">
          <span>INTERACTIVE</span> 3D PLATFORM ARCHITECTURE
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

