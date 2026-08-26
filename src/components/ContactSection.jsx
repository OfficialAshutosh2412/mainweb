import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit form data here (e.g. using axios to an API)
    console.log('Submitting', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="p-3 rounded-full bg-ambient-blue/10 text-ambient-blue"
          >
            <Mail size={32} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Get In Touch</h2>
          <p className="text-gray-400 max-w-lg">Have a project in mind, want to hire me, or just want to chat? Drop me a message below.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 p-8 rounded-2xl bg-dark-surface border border-white/5 space-y-8"
          >
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-gray-400">Feel free to reach out via email or phone. I'm always open to discussing new opportunities or creative designs.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-ambient-blue">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">EMAIL ME</div>
                  <a href="mailto:hello@creator.com" className="text-white hover:text-ambient-blue transition-colors">hello@creator.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-ambient-blue">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">CALL ME</div>
                  <a href="tel:+1234567890" className="text-white hover:text-ambient-blue transition-colors">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-ambient-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">LOCATION</div>
                  <span className="text-white">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 p-8 rounded-2xl bg-dark-surface border border-white/5 relative overflow-hidden"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-2xl font-bold">✓</div>
                <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ambient-blue transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ambient-blue transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ambient-blue transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ambient-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
