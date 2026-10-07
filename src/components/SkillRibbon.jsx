import { useEffect, useRef } from 'react';
import {
  Code2,
  Terminal,
  Database,
  Cloud,
  Layers,
  Cpu,
  Sparkles,
  Box,
  FileCode,
  Server,
  Workflow,
  GitBranch,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import './SkillRibbon.css';

const SKILLS = [
  { name: 'C#', icon: Code2 },
  { name: 'ASP.NET Core', icon: Terminal },
  { name: 'SQL Server', icon: Database },
  { name: 'Azure Cloud', icon: Cloud },
  { name: 'React.js', icon: Layers },
  { name: 'Entity Framework', icon: Cpu },
  { name: 'SignalR', icon: Sparkles },
  { name: 'Docker', icon: Box },
  { name: 'TypeScript', icon: FileCode },
  { name: 'REST APIs', icon: Server },
  { name: 'Microservices', icon: Workflow },
  { name: 'Git & CI/CD', icon: GitBranch },
  { name: 'JWT Auth', icon: ShieldCheck },
  { name: 'High Throughput', icon: Zap },
];

const SkillRibbon = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      wrapper.classList.add('moving-left');
      return;
    }

    let x = 0;
    let lastScrollY = window.scrollY;
    const baseSpeed = 0.45; // Slow, luxurious glide
    let currentVelocity = -baseSpeed;
    let targetVelocity = -baseSpeed;
    let animationFrameId = null;

    wrapper.classList.add('moving-left');

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(delta) > 0.3) {
        if (delta > 0) {
          // Scrolling down -> moves left
          targetVelocity = -baseSpeed - Math.min(delta * 0.06, 2.0);
          wrapper.classList.remove('moving-right');
          wrapper.classList.add('moving-left');
        } else {
          // Scrolling up -> moves right
          targetVelocity = baseSpeed + Math.min(Math.abs(delta) * 0.06, 2.0);
          wrapper.classList.remove('moving-left');
          wrapper.classList.add('moving-right');
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      const halfWidth = track.scrollWidth / 2;

      // Softly decay target velocity back towards base idle speed
      const activeDir = targetVelocity < 0 ? -1 : 1;
      const idleTarget = activeDir * baseSpeed;
      targetVelocity += (idleTarget - targetVelocity) * 0.035;

      // Silky smooth LERP for current velocity (no sudden jumps)
      currentVelocity += (targetVelocity - currentVelocity) * 0.055;

      x += currentVelocity;

      // Wrap around seamlessly
      if (x <= -halfWidth) {
        x += halfWidth;
      } else if (x >= 0) {
        x -= halfWidth;
      }

      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Duplicate the list 4x so each half is wider than even ultra-wide 4K screens (no gap)
  const displayList = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <div className="skill-ribbon-wrapper" ref={wrapperRef} aria-label="Skills Marquee">
      <div className="skill-ribbon-track" ref={trackRef}>
        {displayList.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={`${skill.name}-${index}`} className="skill-ribbon-item">
              <span className="skill-ribbon-icon">
                <Icon size={34} />
              </span>
              <span>{skill.name}</span>
              <span className="skill-ribbon-arrow-badge" aria-hidden="true">
                <ArrowRight size={24} className="skill-ribbon-arrow" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillRibbon;
