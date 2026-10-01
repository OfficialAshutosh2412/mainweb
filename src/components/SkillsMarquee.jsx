import {
  Atom, ShieldCheck, Radio, FileCode, Code2, GitBranch, Terminal,
  Database, Cloud, Wrench, Globe, Layers, Server
} from 'lucide-react';

const row1 = [
  { name: 'C#',               icon: Code2,       color: '#9c87ff' },
  { name: 'ASP.NET Core',    icon: Server,      color: '#22d3ee' },
  { name: 'React.js',        icon: Atom,        color: '#61dafb' },
  { name: 'SQL Server',      icon: Database,    color: '#e07b3f' },
  { name: 'Entity Framework',icon: Layers,      color: '#9c87ff' },
  { name: 'JavaScript',      icon: Code2,       color: '#f7df1e' },
  { name: 'RESTful APIs',    icon: Globe,       color: '#22d3ee' },
  { name: 'JWT Auth',        icon: ShieldCheck, color: '#31d39a' },
  { name: 'SignalR',         icon: Radio,       color: '#ff6b6b' },
  { name: 'Python',          icon: Terminal,    color: '#3572a5' },
];

const row2 = [
  { name: 'Tailwind CSS',     icon: FileCode,    color: '#38bdf8' },
  { name: 'PostgreSQL',       icon: Database,    color: '#336791' },
  { name: 'MySQL',            icon: Database,    color: '#4479a1' },
  { name: 'ADO.NET',          icon: Server,      color: '#9c87ff' },
  { name: 'Git & GitHub',     icon: GitBranch,   color: '#f97316' },
  { name: 'Postman',          icon: Wrench,      color: '#ef5f1d' },
  { name: 'Swagger / OpenAPI',icon: Globe,       color: '#31d39a' },
  { name: 'Bootstrap',        icon: FileCode,    color: '#7952b3' },
  { name: 'Vercel / Render',  icon: Cloud,       color: '#22d3ee' },
  { name: 'Supabase',         icon: Database,    color: '#3ecf8e' },
  { name: 'ASP.NET MVC',     icon: Layers,      color: '#9c87ff' },
];

/* Separator dot between pills — sized entirely in CSS so it can scale
   down on small devices without inline-style overrides. */
const Dot = () => <span className="marquee-dot" aria-hidden="true" />;

const SkillPill = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="skill-pill">
      <div
        className="skill-pill-icon"
        style={{
          background: `radial-gradient(circle, ${skill.color}30 0%, ${skill.color}0a 100%)`,
          boxShadow: `0 0 20px ${skill.color}45`,
          border: `1px solid ${skill.color}25`,
        }}
      >
        <Icon className="skill-pill-svg" size={22} style={{ color: skill.color }} />
      </div>
      <span className="skill-pill-name">{skill.name}</span>
    </div>
  );
};

const MarqueeTrack = ({ items, reverse = false, speed = 60 }) => {
  const track = [...items, ...items, ...items];
  const animName = reverse ? 'skills-marquee-rtl' : 'skills-marquee-ltr';
  return (
    <div className="marquee-track">
      <div
        className="marquee-run"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {track.map((skill, i) => (
          <span key={`${skill.name}-${i}`} className="marquee-item">
            <SkillPill skill={skill} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsMarquee = () => (
  <div
    className="skills-marquee"
    role="region"
    aria-label="Technology skills"
  >
    {/* Left fade */}
    <div className="marquee-fade marquee-fade-left" aria-hidden="true" />

    {/* Right fade */}
    <div className="marquee-fade marquee-fade-right" aria-hidden="true" />

    <div className="marquee-rows">
      <MarqueeTrack items={row1} reverse={false} speed={60} />
      <MarqueeTrack items={row2} reverse={true}  speed={48} />
    </div>
  </div>
);

export default SkillsMarquee;

