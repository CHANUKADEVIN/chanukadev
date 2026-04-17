import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolio';

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

const aboutImages = [
  { src: `${base}/profile/me.jpg`,  alt: 'Chanuka Devin – Graduation' },
  { src: `${base}/profile/me2.jpg`, alt: 'Chanuka Devin – Graduation Day' },
  { src: `${base}/profile/me3.jpg`, alt: 'Chanuka Devin – University' },
  { src: `${base}/profile/me4.jpg`, alt: 'Chanuka Devin – Campus' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { personal } = portfolioData;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const DURATION = 4000;

  const goTo = useCallback((i: number) => {
    setCurrent((i + aboutImages.length) % aboutImages.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    setProgress(0);
    const prog = setInterval(() => setProgress(p => Math.min(p + 100 / (DURATION / 50), 100)), 50);
    const slide = setInterval(() => { setCurrent(c => (c + 1) % aboutImages.length); setProgress(0); }, DURATION);
    return () => { clearInterval(prog); clearInterval(slide); };
  }, [current]);

  return (
    <section id="about" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden" ref={ref}>

      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest text-red-500 uppercase">Get To Know</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-1">
            About <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
        </motion.div>

        {/* Two-col layout */}
        <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">

          {/* ── Left: Photo carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative w-full max-w-xs mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-br from-red-600/15 to-transparent rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-red-500/25 shadow-xl bg-gray-900"
                style={{ aspectRatio: '3/4', maxHeight: '460px' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={aboutImages[current].src}
                    alt={aboutImages[current].alt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  />
                </AnimatePresence>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                  <div className="h-full bg-red-500 transition-all" style={{ width: `${progress}%` }} />
                </div>

                {/* Arrows */}
                <button onClick={() => goTo(current - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => goTo(current + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {aboutImages.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-red-500' : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600'}`} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-5"
          >
            {/* Intro */}
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-3">
                {personal.bioIntro}
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {personal.bio}
              </p>
            </div>

            {/* Current focus — subtle, inline */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-red-500 pl-3 italic">
              {personal.bioFocus}
            </p>

            {/* Tech stack */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {personal.techStack.map((tech) => (
                  <span key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-red-600/35 hover:scale-105 transition-all duration-300">
              Let's Work Together
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
