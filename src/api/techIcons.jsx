import { Atom, Code, Layers, Database, ShieldCheck, Radio, FileCode, Terminal, Globe } from 'lucide-react';

/* Tech-stack icon resolver, shared by the Projects grid and the Store cards.
   Own module so Store doesn't drag the whole Projects page (and its chunk)
   into its own bundle. */
export const getTechIcon = (techName) => {
  const name = (techName || '').toLowerCase();
  if (name.includes('react')) return <Atom size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('c#') || name.includes('.net') || name.includes('asp') || name.includes('ef') || name.includes('ado'))
    return <Code size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('sql') || name.includes('db') || name.includes('postgres'))
    return <Database size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('jwt') || name.includes('auth') || name.includes('security'))
    return <ShieldCheck size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('signalr'))
    return <Radio size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('tailwind') || name.includes('css') || name.includes('bootstrap') || name.includes('html'))
    return <FileCode size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('js') || name.includes('javascript'))
    return <Terminal size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  if (name.includes('api') || name.includes('rest'))
    return <Globe size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
  return <Layers size={18} className="text-ambient-blue opacity-80 group-hover:opacity-100 transition-opacity" />;
};