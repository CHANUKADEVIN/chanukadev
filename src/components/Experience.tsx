import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-black" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Professional <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Experience</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 pb-12 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="absolute -left-[13px] top-0 w-6 h-6 bg-gradient-to-r from-red-600 to-red-500 rounded-full border-4 border-white dark:border-gray-950 shadow-lg"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase size={12} className="text-white" />
                </div>
              </motion.div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all">
                <span className="text-sm text-red-600 dark:text-red-500 font-semibold">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1 text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 font-medium">
                  {exp.company}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
