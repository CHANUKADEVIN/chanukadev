import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Linkedin, href: portfolioData.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: portfolioData.social.github, label: 'GitHub' },
    { icon: Mail, href: portfolioData.social.email, label: 'Email' },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Get In <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Let's work together
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all group"
                >
                  <div className="p-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white group-hover:shadow-lg group-hover:shadow-red-500/50 transition-shadow">
                    <link.icon size={24} />
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl focus:border-red-500 dark:focus:border-red-500 outline-none transition-colors resize-none text-gray-900 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-500 text-center font-semibold"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
