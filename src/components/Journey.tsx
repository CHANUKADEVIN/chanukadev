import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const tabs = [
  { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 'education',  label: 'Education',  icon: <GraduationCap size={16} /> },
] as const;

type TabId = typeof tabs[number]['id'];

/* ── tiny helpers ── */
const statusPill = (status: string) =>
  status === 'Ongoing' || status === 'Present' ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Ongoing
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Completed
    </span>
  );

const InitialsLogo = ({ name }: { name: string }) => {
  const initials = name.split(/[\s,()]+/).filter(Boolean).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm select-none flex-shrink-0">
      {initials}
    </div>
  );
};

/* ── Experience timeline ── */
const ExperienceTab = ({ isInView }: { isInView: boolean }) => (
  <div className="max-w-3xl mx-auto">
    {portfolioData.experience.map((exp, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="relative pl-8 pb-10 border-l-2 border-gray-200 dark:border-gray-800 last:pb-0 last:border-transparent"
      >
        {/* Timeline dot */}
        <motion.div
          whileHover={{ scale: 1.3, rotate: 360 }}
          transition={{ duration: 0.4 }}
          className="absolute -left-[13px] top-0 w-6 h-6 bg-gradient-to-br from-red-600 to-red-400 rounded-full border-4 border-white dark:border-gray-950 shadow flex items-center justify-center"
        >
          <Briefcase size={10} className="text-white" />
        </motion.div>

        <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-red-400/60 dark:hover:border-red-500/60 hover:shadow-lg transition-all duration-300 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
            <span className="text-xs font-semibold text-red-500 whitespace-nowrap">{exp.period}</span>
          </div>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">{exp.company}</p>
          {'location' in exp && (exp as { location?: string }).location && (
            <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {(exp as { location: string }).location}
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ── Education cards ── */
const typeColor: Record<string, string> = {
  degree:    'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
  programme: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800',
  school:    'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800',
};

const EducationTab = ({ isInView }: { isInView: boolean }) => {
  const [logoErr, setLogoErr] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {portfolioData.education.map((edu, i) => {
        const tc = typeColor[edu.type] ?? typeColor.school;
        const hasLogo = !!edu.logo && !logoErr[i];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-red-400/60 dark:hover:border-red-500/60 hover:shadow-lg transition-all duration-300 p-5 flex gap-4"
          >
            {/* Logo */}
            {hasLogo ? (
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
                <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" onError={() => setLogoErr(e => ({ ...e, [i]: true }))} />
              </div>
            ) : (
              <InitialsLogo name={edu.institution} />
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tc}`}>{edu.type.charAt(0).toUpperCase() + edu.type.slice(1)}</span>
                {statusPill(edu.status)}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{edu.degree}</h3>
              <p className="text-sm font-semibold text-red-500 mt-0.5">{edu.institution}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1 mb-3">
                <span>📍 {edu.location}</span>
                <span>📅 {edu.period}</span>
                {'gpa' in edu && (edu as {gpa?:string}).gpa && <span>⭐ GPA: {(edu as {gpa:string}).gpa}</span>}
              </div>
              <ul className="space-y-1.5">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ── Main component ── */
export const Journey = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<TabId>('experience');

  return (
    <section id="journey" className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden" ref={ref}>

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">Career & Studies</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            My{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active === tab.id
                    ? 'text-white shadow-md'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {active === tab.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {active === 'experience' ? (
              <ExperienceTab isInView={isInView} />
            ) : (
              <EducationTab isInView={isInView} />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
