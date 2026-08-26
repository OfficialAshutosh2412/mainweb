import { 
  Atom, ShieldCheck, Radio, FileCode, Code2, GitBranch, Terminal, 
  Database, Cloud, Wrench, Globe, Layers, Sparkles
} from 'lucide-react';

const techSkills = [
  { name: 'C#', category: 'Language' },
  { name: 'ASP.NET Core', category: 'Backend' },
  { name: 'ASP.NET MVC', category: 'Backend' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'SQL Server', category: 'Database' },
  { name: 'Entity Framework', category: 'Backend' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'RESTful APIs', category: 'Backend' },
  { name: 'JWT Auth', category: 'Security' },
  { name: 'SignalR', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'ADO.NET', category: 'Backend' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'Swagger / OpenAPI', category: 'Tools' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Vercel / Render', category: 'Tools' },
  { name: 'Supabase', category: 'Database' },
];

const SkillIcon = ({ name, className = "w-9 h-9" }) => {
  const n = (name || '').toLowerCase();
  if (n.includes('react')) return <Atom className={`${className} text-cyan-400`} />;
  if (n.includes('sql') || n.includes('database') || n.includes('postgres') || n.includes('mysql')) return <Database className={`${className} text-amber-400`} />;
  if (n.includes('jwt') || n.includes('security') || n.includes('auth')) return <ShieldCheck className={`${className} text-emerald-400`} />;
  if (n.includes('signalr')) return <Radio className={`${className} text-purple-400`} />;
  if (n.includes('html') || n.includes('css') || n.includes('bootstrap') || n.includes('tailwind')) return <FileCode className={`${className} text-sky-400`} />;
  if (n.includes('git')) return <GitBranch className={`${className} text-orange-400`} />;
  if (n.includes('python')) return <Terminal className={`${className} text-yellow-400`} />;
  if (n.includes('c#') || n.includes('.net') || n.includes('asp') || n.includes('entity') || n.includes('ado')) return <Code2 className={`${className} text-blue-400`} />;
  if (n.includes('vercel') || n.includes('render') || n.includes('supabase') || n.includes('cloud')) return <Cloud className={`${className} text-indigo-400`} />;
  if (n.includes('postman') || n.includes('swagger')) return <Wrench className={`${className} text-rose-400`} />;
  if (n.includes('restful') || n.includes('api')) return <Globe className={`${className} text-teal-400`} />;
  return <Layers className={`${className} text-ambient-blue`} />;
};

const SkillsMarquee = () => {
  // Duplicate array twice to ensure smooth infinite seamless scroll loop
  const marqueeItems = [...techSkills, ...techSkills];

  return (
    <div className="w-full py-2 my-2 relative overflow-hidden group">
      {/* Infinite Scrolling Track with Native CSS Mask */}
      <div 
        className="flex overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
        }}
      >
        <div className="animate-marquee flex items-center gap-5 py-3 shrink-0">
          {marqueeItems.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="flex flex-col items-center justify-center p-4 min-w-[110px] rounded-2xl bg-transparent border border-ambient-blue/40 hover:border-ambient-blue backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group/pill shrink-0 cursor-default space-y-2.5"
            >
              {/* Icon Container */}
              <div className="p-3 rounded-2xl bg-transparent border border-ambient-blue/30 group-hover/pill:border-ambient-blue group-hover/pill:scale-110 transition-all duration-300 flex items-center justify-center">
                <SkillIcon name={skill.name} className="w-9 h-9" />
              </div>
              
              {/* Small Compact Title */}
              <span className="text-[11px] font-semibold text-gray-200 group-hover/pill:text-white transition-colors tracking-tight text-center whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
