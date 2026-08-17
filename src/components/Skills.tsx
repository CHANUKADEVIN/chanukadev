import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './ui/SectionHeader';

type Category = 'FRONTEND' | 'BACKEND' | 'CLOUD_DEVOPS' | 'DATABASES';

interface SkillNode {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  layer: string;
  useCase: string;
  category: Category;
  color: string;
}

const SKILLS: SkillNode[] = [
  // Frontend
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 90, layer: 'UI/UX Layer', useCase: 'SPA dashboards, portfolio, LMS interfaces', category: 'FRONTEND', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiency: 85, layer: 'Type Safety', useCase: 'All production front/backend code', category: 'FRONTEND', color: '#3178C6' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', proficiency: 78, layer: 'SSR/SSG Layer', useCase: 'SEO-critical pages, server components', category: 'FRONTEND', color: '#ffffff' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', proficiency: 92, layer: 'Styling System', useCase: 'Rapid UI prototyping, design systems', category: 'FRONTEND', color: '#38BDF8' },
  { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 80, layer: 'Animation Layer', useCase: 'Micro-interactions, page transitions', category: 'FRONTEND', color: '#ccff00' },

  // Backend
  { name: 'Go (Golang)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', proficiency: 82, layer: 'Core Services', useCase: 'High-performance APIs, desktop with Wails', category: 'BACKEND', color: '#00ADD8' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', proficiency: 88, layer: 'API Gateway', useCase: 'REST APIs, webhooks, middleware', category: 'BACKEND', color: '#8CC84B' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 85, layer: 'AI/ML Engine', useCase: 'FastAPI, ML pipelines, automation scripts', category: 'BACKEND', color: '#F7C948' },
  { name: 'Java Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', proficiency: 72, layer: 'Enterprise Layer', useCase: 'LMS backend, workflow automation (NCAS)', category: 'BACKEND', color: '#6DB33F' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 80, layer: 'Async Services', useCase: 'ML model serving, automation engine', category: 'BACKEND', color: '#009688' },

  // Cloud & DevOps
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', proficiency: 78, layer: 'Containerization', useCase: 'Microservice packaging, local dev parity', category: 'CLOUD_DEVOPS', color: '#2496ED' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', proficiency: 65, layer: 'Cloud Infra', useCase: 'S3, EC2, Lambda functions', category: 'CLOUD_DEVOPS', color: '#FF9900' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiency: 92, layer: 'Version Control', useCase: 'All projects, CI/CD branching strategies', category: 'CLOUD_DEVOPS', color: '#F05032' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', proficiency: 75, layer: 'OS / Server', useCase: 'VPS management, shell scripting', category: 'CLOUD_DEVOPS', color: '#FCC624' },

  // Databases
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', proficiency: 85, layer: 'Document Store', useCase: 'MERN apps, flexible schema projects', category: 'DATABASES', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', proficiency: 78, layer: 'Relational DB', useCase: 'Production SaaS, analytics queries', category: 'DATABASES', color: '#336791' },
  { name: 'MySQL / SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', proficiency: 82, layer: 'Relational DB', useCase: 'LMS timetables, inventory systems', category: 'DATABASES', color: '#4479A1' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 80, layer: 'Realtime / Auth', useCase: 'Push notifications, live features, auth', category: 'DATABASES', color: '#FFCA28' },
];

const CATEGORIES: { key: Category; label: string; color: string }[] = [
  { key: 'FRONTEND', label: 'FRONTEND', color: '#00f0ff' },
  { key: 'BACKEND', label: 'BACKEND', color: '#ccff00' },
  { key: 'CLOUD_DEVOPS', label: 'CLOUD / DEVOPS', color: '#ff6b6b' },
  { key: 'DATABASES', label: 'DATABASES', color: '#a78bfa' },
];

interface HoverState {
  skill: SkillNode | null;
}

const SkillNodeItem = ({
  skill,
  onHover,
  isHovered,
}: {
  skill: SkillNode;
  onHover: (s: SkillNode | null) => void;
  isHovered: boolean;
}) => (
  <motion.div
    className="relative flex flex-col items-center gap-2 cursor-pointer group"
    onMouseEnter={() => onHover(skill)}
    onMouseLeave={() => onHover(null)}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.1 }}
  >
    {/* Node circle */}
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative"
      style={{
        background: isHovered ? `${skill.color}18` : 'rgba(22,24,29,0.9)',
        borderColor: isHovered ? skill.color : 'rgba(26,26,36,0.8)',
        boxShadow: isHovered ? `0 0 20px ${skill.color}50` : 'none',
      }}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-7 h-7 object-contain"
        style={{ filter: isHovered ? 'none' : 'grayscale(0.5)' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y="18" font-size="16">⚙</text></svg>';
        }}
      />
      {/* Proficiency ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28" cy="28" r="25"
          fill="none"
          stroke={skill.color}
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <circle
          cx="28" cy="28" r="25"
          fill="none"
          stroke={skill.color}
          strokeOpacity={isHovered ? 0.8 : 0.4}
          strokeWidth="1.5"
          strokeDasharray={`${(skill.proficiency / 100) * 157} 157`}
          strokeLinecap="round"
          style={{ transition: 'all 0.4s ease' }}
        />
      </svg>
    </div>

    {/* Label */}
    <span
      className="font-mono text-xs text-center leading-tight transition-colors duration-200"
      style={{ color: isHovered ? skill.color : '#4a4a5a', maxWidth: '70px' }}
    >
      {skill.name}
    </span>
  </motion.div>
);

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('FRONTEND');
  const [hovered, setHovered] = useState<HoverState>({ skill: null });

  const filtered = SKILLS.filter((s) => s.category === activeCategory);
  const catConfig = CATEGORIES.find((c) => c.key === activeCategory)!;

  return (
    <section id="skills" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <SectionHeader
          index="02"
          title="TECH STACK HUD"
          subtitle="Interactive skill matrix — hover nodes to inspect proficiency & production use cases."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map(({ key, label, color }) => (
            <button
              key={key}
              id={`skill-tab-${key}`}
              onClick={() => setActiveCategory(key)}
              className="font-mono text-xs px-5 py-2 border transition-all duration-300 tracking-widest"
              style={{
                borderColor: activeCategory === key ? color : 'rgba(26,26,36,0.8)',
                color: activeCategory === key ? color : '#4a4a5a',
                background: activeCategory === key ? `${color}12` : 'transparent',
                boxShadow: activeCategory === key ? `0 0 12px ${color}30` : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Node Grid */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 p-8 border border-grid-line relative"
                style={{ background: 'rgba(10,10,15,0.5)' }}
              >
                {/* Category label */}
                <div
                  className="absolute top-3 right-4 font-mono text-xs opacity-40"
                  style={{ color: catConfig.color }}
                >
                  {catConfig.label}
                </div>

                {filtered.map((skill) => (
                  <SkillNodeItem
                    key={skill.name}
                    skill={skill}
                    onHover={(s) => setHovered({ skill: s })}
                    isHovered={hovered.skill?.name === skill.name}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hover Info Panel */}
          <div
            className="border border-grid-line p-6 font-mono relative overflow-hidden"
            style={{ background: 'rgba(10,10,15,0.7)', minHeight: '300px' }}
          >
            {/* Scanline */}
            <div className="absolute inset-0 scanline pointer-events-none" />

            <div className="text-xs text-dim-gray tracking-widest mb-4">// SKILL INSPECTOR</div>

            <AnimatePresence mode="wait">
              {hovered.skill ? (
                <motion.div
                  key={hovered.skill.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Skill name */}
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: hovered.skill.color }}
                  >
                    {hovered.skill.name}
                  </h3>

                  {/* Layer */}
                  <div className="text-xs text-dim-gray mb-4">{hovered.skill.layer}</div>

                  {/* Proficiency */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-dim-gray">PROFICIENCY</span>
                      <span style={{ color: hovered.skill.color }}>{hovered.skill.proficiency}%</span>
                    </div>
                    <div className="h-1 bg-grid-line w-full">
                      <motion.div
                        className="h-full"
                        style={{ background: hovered.skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${hovered.skill.proficiency}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <div className="text-xs text-dim-gray mb-1">ARCH LAYER</div>
                    <span
                      className="text-xs px-2 py-0.5 border"
                      style={{
                        borderColor: `${hovered.skill.color}40`,
                        color: hovered.skill.color,
                      }}
                    >
                      {hovered.skill.category.replace('_', ' / ')}
                    </span>
                  </div>

                  {/* Production use case */}
                  <div>
                    <div className="text-xs text-dim-gray mb-1">PRODUCTION USE</div>
                    <p className="text-xs text-ghost-white leading-relaxed">{hovered.skill.useCase}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-48 text-center"
                >
                  <div className="text-dim-gray text-xs leading-relaxed">
                    <span className="text-neon-volt">_</span> Hover a skill node<br />
                    to inspect details
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
