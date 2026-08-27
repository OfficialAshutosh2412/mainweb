import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RevealingCard = ({ 
  children, 
  delay = 0, 
  className = '', 
  tilt = true, 
  maxTilt = 8,
  glowColor = 'rgba(59, 130, 246, 0.35)',
  ...props 
}) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tilt ? maxTilt : 0, tilt ? -maxTilt : 0]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [tilt ? -maxTilt : 0, tilt ? maxTilt : 0]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group rounded-2xl ${className}`}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full relative rounded-2xl overflow-hidden glass-card glass-card-hover"
      >
        {/* Animated Trace Border on Entrance */}
        <motion.div 
          initial={{ width: 0, height: 0, opacity: 0 }}
          whileInView={{ width: "100%", height: "100%", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeInOut" }}
          className="absolute top-0 left-0 border-t-2 border-l-2 border-ambient-blue/70 rounded-2xl pointer-events-none z-20"
        />
        <motion.div 
          initial={{ width: 0, height: 0, opacity: 0 }}
          whileInView={{ width: "100%", height: "100%", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 border-b-2 border-r-2 border-ambient-blue/70 rounded-2xl pointer-events-none z-20"
        />

        {/* Dynamic Specular Glare */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(500px circle at ${gx} ${gy}, rgba(255, 255, 255, 0.12), transparent 70%)`
            ),
          }}
        />

        {/* Ambient Hover Glow behind card */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Card Content with 3D depth */}
        <div className="w-full h-full relative preserve-3d">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RevealingCard;
