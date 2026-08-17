import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'ABOUT', id: 'about' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'WORK', id: 'projects' },
  { label: 'LAB', id: 'lab' },
  { label: 'RESEARCH', id: 'research' },
  { label: 'JOURNAL', id: 'gallery' },
  { label: 'CONTACT', id: 'contact' },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'lab', 'research', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{
            background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(26,26,36,0.8)' : '1px solid transparent',
            borderRadius: 0,
            transition: 'all 0.4s ease',
            padding: scrolled ? '12px 24px' : '4px 24px',
          }}
        >
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => scrollTo('home')}
            className="font-mono font-bold text-lg group flex items-center gap-2"
          >
            <span className="text-neon-volt glow-volt-text group-hover:animate-flicker">
              [CD]
            </span>
            <span className="text-dim-gray text-xs hidden sm:block">
              &gt; chanuka.devin
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  id={`nav-${id}`}
                  onClick={() => scrollTo(id)}
                  className="relative group px-4 py-2 font-mono text-xs tracking-widest transition-colors duration-200"
                  style={{ color: isActive ? '#ccff00' : '#4a4a5a' }}
                >
                  <span className="group-hover:text-ghost-white transition-colors duration-200">
                    <span className="opacity-0 group-hover:opacity-100 text-cyber-cyan transition-opacity duration-200 mr-1">
                      &gt;
                    </span>
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-neon-volt"
                      style={{ boxShadow: '0 0 6px rgba(204,255,0,0.6)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Status + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
              <span
                className="w-1.5 h-1.5 rounded-full bg-neon-volt animate-pulse"
                style={{ boxShadow: '0 0 6px rgba(204,255,0,0.8)' }}
              />
              <span className="text-neon-volt">AVAILABLE</span>
            </div>
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-dim-gray hover:text-ghost-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-grid-line"
            style={{ background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className="text-left font-mono text-sm text-dim-gray hover:text-neon-volt py-2 border-b border-grid-line/50 last:border-0 flex items-center gap-3 transition-colors duration-200"
                >
                  <span className="text-cyber-cyan text-xs">0{i + 1}</span>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
