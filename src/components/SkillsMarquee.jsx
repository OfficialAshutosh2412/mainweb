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

const dotStyle = {
  display: 'inline-block',
  flexShrink: 0,
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '0 22px',
  background: 'radial-gradient(circle, rgba(156,135,255,1) 0%, rgba(34,211,238,0.7) 55%, transparent 100%)',
  boxShadow: '0 0 10px rgba(156,135,255,0.9), 0 0 22px rgba(156,135,255,0.4)',
};

const Dot = () => <span style={dotStyle} aria-hidden="true" />;

const SkillPill = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', flexShrink: 0, cursor: 'default', padding: '6px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
        background: `radial-gradient(circle, ${skill.color}30 0%, ${skill.color}0a 100%)`,
        boxShadow: `0 0 20px ${skill.color}45`,
        border: `1px solid ${skill.color}25`,
      }}>
        <Icon size={22} style={{ color: skill.color }} />
      </div>
      <span style={{
        fontSize: '17px', fontWeight: 700,
        color: 'rgba(245,246,250,0.85)', whiteSpace: 'nowrap',
        letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)',
      }}>
        {skill.name}
      </span>
    </div>
  );
};

const MarqueeTrack = ({ items, reverse = false, speed = 60 }) => {
  const track = [...items, ...items, ...items];
  const animName = reverse ? 'skills-marquee-rtl' : 'skills-marquee-ltr';
  return (
    <div style={{ display: 'flex', overflow: 'hidden', width: '100%', userSelect: 'none', padding: '16px 0' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', flexShrink: 0, paddingLeft: '22px', paddingRight: '22px',
        animation: `${animName} ${speed}s linear infinite`,
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}>
        {track.map((skill, i) => (
          <span key={`${skill.name}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <SkillPill skill={skill} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsMarquee = () => (
  <div style={{
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '36px 0',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, transparent 0%, rgba(118,84,232,0.04) 50%, transparent 100%)',
  }}>
    {/* Left fade */}
    <div style={{
      position: 'absolute', top: 0, bottom: 0, left: 0,
      width: '200px', zIndex: 10, pointerEvents: 'none',
      background: 'linear-gradient(to right, var(--void) 0%, transparent 100%)',
    }} />
    {/* Right fade */}
    <div style={{
      position: 'absolute', top: 0, bottom: 0, right: 0,
      width: '200px', zIndex: 10, pointerEvents: 'none',
      background: 'linear-gradient(to left, var(--void) 0%, transparent 100%)',
    }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <MarqueeTrack items={row1} reverse={false} speed={60} />
      <MarqueeTrack items={row2} reverse={true}  speed={48} />
    </div>
  </div>
);

export default SkillsMarquee;

