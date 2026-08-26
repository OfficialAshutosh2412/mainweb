import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SVGRope = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [docHeight, setDocHeight] = useState(4000);

  useEffect(() => {
    const handleResize = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setDocHeight(height || 4000);
    };

    // Run after full initial mount / layout renders
    const timer = setTimeout(handleResize, 600);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateCurlyPath = (height, width = 600) => {
    const mid = width / 2;
    let d = `M ${mid} 0`;
    const step = 350; // height step of each wave
    const amplitude = 180; // horizontal curvature width
    
    let currentY = 0;
    let isLeft = true;
    
    while (currentY < height) {
      const nextY = Math.min(currentY + step, height);
      const cp1x = mid + (isLeft ? amplitude : -amplitude);
      const cp1y = currentY + step / 3;
      const cp2x = mid + (isLeft ? -amplitude : amplitude);
      const cp2y = currentY + (step * 2) / 3;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${mid} ${nextY}`;
      
      currentY = nextY;
      isLeft = !isLeft;
    }
    return d;
  };
  
  const pathD = generateCurlyPath(docHeight);
  
  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-0 opacity-20 flex justify-center overflow-hidden"
      style={{ height: `${docHeight}px` }}
    >
      <svg 
        width="600" 
        height={docHeight} 
        viewBox={`0 0 600 ${docHeight}`} 
        fill="none" 
        preserveAspectRatio="xMidYMin slice"
        style={{ height: `${docHeight}px` }}
      >
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Faded Background Curly Path */}
        <path 
          d={pathD} 
          stroke="rgba(59, 130, 246, 0.1)" 
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Animated Foreground Glowing Progress Path */}
        <motion.path
          d={pathD} 
          stroke="#3b82f6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};

export default SVGRope;