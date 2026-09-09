import { motion } from 'framer-motion';

const RevealingCard = ({ 
  children, 
  delay = 0, 
  className = '', 
  tilt = false, 
  maxTilt = 0,
  glowColor = 'rgba(59, 130, 246, 0.25)',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay }}
      className={`relative group rounded-2xl ${className}`}
      {...props}
    >
      <div className="w-full h-full relative rounded-2xl overflow-hidden glass-card glass-card-hover transition-all duration-300">
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

        {/* Ambient Hover Glow behind card */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Card Content */}
        <div className="w-full h-full relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default RevealingCard;
