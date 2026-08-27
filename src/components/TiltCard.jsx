import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard: 3D interactive tilt card component with spring physics, 
 * dynamic specular reflection glare, and true 3D spatial depth.
 */
const TiltCard = ({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.15,
  scale = 1.02,
  perspective = 1000,
  glowColor = 'rgba(59, 130, 246, 0.4)',
  style = {},
  ...props
}) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Dynamic glare coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

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
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative group ${className}`}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale }}
        transition={{ duration: 0.2 }}
        className="w-full h-full relative rounded-2xl transition-shadow duration-300"
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(600px circle at ${gx} ${gy}, rgba(255, 255, 255, ${glareOpacity}), transparent 70%)`
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

        {/* Card Content with 3D preservation */}
        <div className="w-full h-full relative preserve-3d">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
