import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../data/portfolio';

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-black" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Technical <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {portfolioData.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)"
              }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-center h-16 mb-3 group-hover:scale-110 transition-transform">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="hidden text-4xl">
                  {skill.icon.includes('react') ? '⚛️' :
                    skill.icon.includes('typescript') ? '📘' :
                      skill.icon.includes('javascript') ? '💛' :
                        skill.icon.includes('python') ? '🐍' :
                          skill.icon.includes('django') ? '🎸' :
                            skill.icon.includes('blender') ? '🎨' :
                              skill.icon.includes('docker') ? '🐳' :
                                skill.icon.includes('golang') || skill.icon.includes('go') ? '🔵' :
                                  skill.icon.includes('node') ? '💚' :
                                    skill.icon.includes('git') ? '📚' :
                                      skill.icon.includes('tailwind') ? '🌊' :
                                        skill.icon.includes('mongo') ? '🍃' :
                                          skill.icon.includes('postgres') ? '🐘' :
                                            skill.icon.includes('linux') ? '🐧' :
                                              '🔧'}
                </div>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
