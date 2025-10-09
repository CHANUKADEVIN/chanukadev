import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Featured <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(index)}
              className="relative bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-500 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* GitHub repo link (small icon bottom-right) */}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${project.title} on GitHub`}
                    title="View code on GitHub"
                    className="absolute right-4 bottom-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black flex items-center justify-center text-white shadow-lg transition-opacity"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.525.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.653 1.65.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.096.81 2.21 0 1.595-.015 2.877-.015 3.27 0 .32.215.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.63.297 12 .297z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-red-600 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <img
              src={portfolioData.projects[selectedProject].image}
              alt={portfolioData.projects[selectedProject].title}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {portfolioData.projects[selectedProject].title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {portfolioData.projects[selectedProject].description}
              </p>
              <div className="flex flex-wrap gap-3">
                {portfolioData.projects[selectedProject].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-500 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
