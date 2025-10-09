import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../data/portfolio';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          About <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {portfolioData.personal.bio}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">Full-stack web applications</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">AI-integrated systems</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">Real-time multimedia software</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">3D animation & capture systems</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-2xl opacity-30"></div>
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name}
                className="relative rounded-2xl shadow-2xl w-full object-fill aspect-square border-4 border-white dark:border-gray-800"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
