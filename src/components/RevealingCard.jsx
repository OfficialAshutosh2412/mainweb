import { motion } from 'framer-motion';

const RevealingCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(59,130,246,0.35)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
    >
      {/* Animated Trace Border */}
      <motion.div 
        initial={{ width: 0, height: 0, opacity: 0 }}
        whileInView={{ width: "100%", height: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeInOut" }}
        className="absolute top-0 left-0 border-t-2 border-l-2 border-ambient-blue/60 rounded-2xl pointer-events-none z-20"
      />
      <motion.div 
        initial={{ width: 0, height: 0, opacity: 0 }}
        whileInView={{ width: "100%", height: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 border-b-2 border-r-2 border-ambient-blue/60 rounded-2xl pointer-events-none z-20"
      />
      {children}
    </motion.div>
  );
};

export default RevealingCard;
