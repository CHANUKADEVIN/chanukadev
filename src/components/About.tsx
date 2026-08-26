import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { assetPath } from '../utils/asset';
import { SectionHeader } from './ui/SectionHeader';

const TimelineItem = ({
  item,
  index,
}: {
  item: { title: string; company: string; period: string; description: string; location?: string };
  index: number;
}) => (
  <motion.div
    className="relative pl-8 pb-10 last:pb-0"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-grid-line" />
    {/* Node */}
    <div
      className="absolute left-[-4px] top-1 w-2 h-2 border border-neon-volt"
      style={{ background: '#0a0a0f', boxShadow: '0 0 8px rgba(204,255,0,0.4)' }}
    />

    <div className="border border-grid-line p-5 card-hover" style={{ background: 'rgba(22,24,29,0.5)' }}>
      <div className="flex flex-wrap gap-2 items-start justify-between mb-2">
        <div>
          <h3 className="font-display text-base font-bold text-ghost-white">{item.title}</h3>
          <p className="font-mono text-xs text-cyber-cyan mt-0.5">{item.company}</p>
        </div>
        <span className="font-mono text-xs text-dim-gray border border-grid-line px-2 py-1 whitespace-nowrap">
          {item.period}
        </span>
      </div>
      <p className="font-body text-sm text-dim-gray leading-relaxed">{item.description}</p>
    </div>
  </motion.div>
);

export const About = () => {
  return (
    <section id="about" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <SectionHeader index="01" title="ABOUT" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Bio side */}
          <div>
            {/* Profile */}
            <motion.div
              className="flex items-center gap-5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                {/* HUD frame */}
                <div className="absolute inset-0 border border-neon-volt/40" />
                <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t border-l border-neon-volt" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b border-r border-neon-volt" />
                <img
                  src={assetPath('/profile/me.jpg')}
                  alt="Chanuka Devin, Software Engineer based in Sri Lanka"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(0.2) contrast(1.05)' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ghost-white">
                  {portfolioData.personal.name}
                </h3>
                <p className="font-mono text-xs text-cyber-cyan mt-1">
                  {portfolioData.personal.title.split('|')[0].trim()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-volt animate-pulse" />
                  <span className="font-mono text-xs text-neon-volt">Available · Sri Lanka</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4 mb-8"
            >
              <p className="font-body text-dim-gray leading-relaxed">
                {portfolioData.personal.bioIntro}
              </p>
              <p className="font-body text-dim-gray leading-relaxed">
                {portfolioData.personal.bio}
              </p>
              <p className="font-mono text-xs text-cyber-cyan">
                {portfolioData.personal.bioFocus}
              </p>
            </motion.div>

            {/* Domain tags */}
            <div className="flex flex-wrap gap-2">
              {portfolioData.personal.domains.map((d) => (
                <span
                  key={d}
                  className="font-mono text-xs px-3 py-1 border border-neon-volt/30 text-neon-volt"
                  style={{ background: 'rgba(204,255,0,0.06)' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline side */}
          <div>
            <div className="font-mono text-xs text-dim-gray tracking-widest mb-6">// EXPERIENCE TIMELINE</div>
            {portfolioData.experience.map((exp, i) => (
              <TimelineItem key={i} item={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
