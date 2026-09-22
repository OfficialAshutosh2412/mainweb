import {
  Atom, ShieldCheck, Radio, FileCode, Code2, GitBranch, Terminal,
  Database, Cloud, Wrench, Globe, Layers, Server
} from 'lucide-react';

const row1 = [
  { name: 'C#',              icon: Code2,       color: '#9c87ff' },
  { name: 'ASP.NET Core',   icon: Server,      color: '#22d3ee' },
  { name: 'React.js',       icon: Atom,        color: '#61dafb' },
  { name: 'SQL Server',     icon: Database,    color: '#e07b3f' },
  { name: 'Entity Framework', icon: Layers,   color: '#9c87ff' },
  { name: 'JavaScript',     icon: Code2,       color: '#f7df1e' },
  { name: 'RESTful APIs',   icon: Globe,       color: '#22d3ee' },
  { name: 'JWT Auth',       icon: ShieldCheck, color: '#31d39a' },
  { name: 'SignalR',        icon: Radio,       color: '#ff6b6b' },
  { name: 'Python',         icon: Terminal,    color: '#3572a5' },
];

const row2 = [
  { name: 'Tailwind CSS',   icon: FileCode,    color: '#38bdf8' },
  { name: 'PostgreSQL',     icon: Database,    color: '#336791' },
  { name: 'MySQL',          icon: Database,    color: '#4479a1' },
  { name: 'ADO.NET',        icon: Server,      color: '#9c87ff' },
  { name: 'Git & GitHub',   icon: GitBranch,   color: '#f97316' },
  { name: 'Postman',        icon: Wrench,      color: '#ef5f1d' },
  { name: 'Swagger / OpenAPI', icon: Globe,   color: '#31d39a' },
  { name: 'Bootstrap',      icon: FileCode,    color: '#7952b3' },
  { name: 'Vercel / Render', icon: Cloud,     color: '#22d3ee' },
  { name: 'Supabase',       icon: Database,    color: '#3ecf8e' },
  { name: 'ASP.NET MVC',   icon: Layers,      color: '#9c87ff' },
];

/* Gradient separator dot between items */
const Dot = () => (
  <span
    className="shrink-0 w-2.5 h-2.5 rounded-full mx-3"
    style={{
      background: 'radial-gradient(circle, rgba(156,135,255,0.9) 0%, rgba(34,211,238,0.6) 60%, transparent 100%)',
      boxShadow: '0 0 8px rgba(156,135,255,0.8)',
    }}
    aria-hidden="true"
  />
);

/* Single skill pill — icon + label, no boxy border */
const SkillPill = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="flex items-center gap-2.5 shrink-0 group/pill cursor-default">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover/pill:scale-110"
        style={{
          background: `radial-gradient(circle, ${skill.color}25 0%, ${skill.color}08 100%)`,
          boxShadow: `0 0 12px ${skill.color}30`,
        }}
      >
        <Icon
          className="w-4 h-4"
          style={{ color: skill.color }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-300 group-hover/pill:text-white transition-colors duration-200 whitespace-nowrap tracking-tight">
        {skill.name}
      </span>
    </div>
  );
};

/* One scrolling track */
const MarqueeTrack = ({ items, reverse = false, speed = 45 }) => {
  // Triplicate for guaranteed seamless loop
  const track = [...items, ...items, ...items];
  const animName = reverse ? 'skills-marquee-rtl' : 'skills-marquee-ltr';
  const duration = `${speed}s`;

  return (
    <div className="flex overflow-hidden select-none w-full">
      <div
        className="flex items-center shrink-0"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          willChange: 'transform',
        }}
      >
        {track.map((skill, i) => (
          <span key={`${skill.name}-${i}`} className="flex items-center">
            <SkillPill skill={skill} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsMarquee = () => (
  <div className="w-full py-6 relative overflow-hidden">
    {/* Edge fade masks */}
    <div
      className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to right, var(--void) 0%, transparent 100%)' }}
    />
    <div
      className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to left, var(--void) 0%, transparent 100%)' }}
    />

    <div className="flex flex-col gap-5">
      <MarqueeTrack items={row1} reverse={false} speed={50} />
      <MarqueeTrack items={row2} reverse={true}  speed={40} />
    </div>
  </div>
);

export default SkillsMarquee;
