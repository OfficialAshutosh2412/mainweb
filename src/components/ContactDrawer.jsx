import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, X, MessageSquare } from 'lucide-react';
import { useContactDrawer } from '../context/ContactContext';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const ContactDrawer = () => {
  const { isOpen, closeContactDrawer } = useContactDrawer();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeContactDrawer();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeContactDrawer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Contact Form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeContactDrawer}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 cursor-pointer"
            aria-label="Close modal overlay"
          />

          {/* Sliding Form Panel */}
          <motion.div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl md:max-w-2xl bg-dark-bg/95 border-l border-white/10 shadow-2xl z-50 overflow-y-auto overscroll-contain backdrop-blur-xl flex flex-col justify-between"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 bg-dark-bg/90 backdrop-blur-md px-6 md:px-8 py-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-ambient-blue/10 text-ambient-blue border border-ambient-blue/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span className="text-ambient-blue font-black">&lt;</span>
                    Get In Touch
                    <span className="text-ambient-blue font-black">/&gt;</span>
                  </h2>
                  <p className="text-xs text-gray-400">Drop a message or hire me for your next project</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeContactDrawer}
                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 transition-all duration-300 group cursor-pointer"
                title="Close Contact Form (Esc)"
                aria-label="Close Contact Form"
              >
                <X className="w-6 h-6 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 md:p-8 space-y-8 flex-1">
              {/* Quick Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-dark-surface border border-white/5 flex items-center gap-3 group hover:border-ambient-blue/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-ambient-blue/10 text-ambient-blue shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Direct Email</div>
                    <a
                      href="mailto:ashutoshprasad2427@gmail.com"
                      onClick={() => { window.location.href = 'mailto:ashutoshprasad2427@gmail.com'; }}
                      className="text-xs text-white hover:text-ambient-blue font-semibold transition-colors block truncate cursor-pointer"
                    >
                      ashutoshprasad2427@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-surface border border-white/5 flex items-center gap-3 group hover:border-ambient-blue/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-ambient-blue/10 text-ambient-blue shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Phone / WhatsApp</div>
                    <a
                      href="tel:+916386239194"
                      className="text-xs text-white hover:text-ambient-blue font-semibold transition-colors"
                    >
                      +91 6386239194
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-surface border border-white/5 flex items-center gap-3 group hover:border-ambient-blue/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-ambient-blue/10 text-ambient-blue shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Location</div>
                    <span className="text-xs text-white font-semibold">Lucknow, UP, India</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-surface border border-white/5 flex items-center gap-3 justify-around">
                  <a
                    href="https://linkedin.com/in/ashutosh-prasad-0449181ba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-ambient-blue/10 text-ambient-blue hover:bg-ambient-blue hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/OfficialAshutosh2412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>


              {/* Form Section */}
              <div className="p-6 md:p-8 rounded-2xl bg-dark-surface border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6 text-ambient-blue">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Send Me a Message</h3>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-3xl font-bold border border-green-500/30">
                      ✓
                    </div>
                    <h4 className="text-2xl font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-gray-400 text-sm max-w-md">
                      Thank you for reaching out. I have received your message and will respond as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 font-mono">YOUR NAME</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ambient-blue focus:ring-1 focus:ring-ambient-blue transition-colors"
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 font-mono">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ambient-blue focus:ring-1 focus:ring-ambient-blue transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300 font-mono">YOUR MESSAGE</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ambient-blue focus:ring-1 focus:ring-ambient-blue transition-colors resize-none"
                        placeholder="Hi Ashutosh, I'd like to discuss a project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-ambient-blue hover:bg-blue-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] active:scale-[0.99] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="px-6 md:px-8 py-4 border-t border-white/10 text-center text-xs text-gray-500 font-mono bg-dark-bg/90">
              Press <kbd className="px-2 py-0.5 rounded bg-white/10 text-gray-300 text-[10px]">Esc</kbd> or click top-right button to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactDrawer;
