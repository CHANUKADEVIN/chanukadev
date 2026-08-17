import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Award, Trophy, BookOpen } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const badgeIcon = (type: string) => {
  if (type === 'award') return <Award size={12} />;
  if (type === 'competition') return <Trophy size={12} />;
  return <BookOpen size={12} />;
};

const badgeColor = (badge?: string) => {
  if (!badge) return '#4a4a5a';
  if (badge.includes('1st') || badge.includes('Winner')) return '#ccff00';
  if (badge.includes('Featured')) return '#00f0ff';
  return '#a78bfa';
};

export const Research = () => (
  <section id="research" className="py-32 bg-obsidian">
    <div className="max-w-7xl mx-auto px-6 md:px-16">
      <SectionHeader
        index="06"
        title="RESEARCH & AWARDS"
        subtitle="Published work, competition wins, and academic contributions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.research.map((item, i) => (
          <motion.div
            key={i}
            className="border border-grid-line p-6 card-hover relative overflow-hidden hud-corner"
            style={{ background: 'rgba(22,24,29,0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            {item.badge && (
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 border"
                style={{
                  color: badgeColor(item.badge),
                  borderColor: `${badgeColor(item.badge)}40`,
                  background: `${badgeColor(item.badge)}10`,
                }}
              >
                {badgeIcon(item.type)}
                {item.badge}
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-dim-gray">{item.type.toUpperCase()}</span>
              <div className="h-px flex-1 bg-grid-line" />
              <span className="font-mono text-xs text-dim-gray">{item.date}</span>
            </div>

            <h3 className="font-display text-base font-bold text-ghost-white mb-1 pr-20">{item.title}</h3>
            <p className="font-mono text-xs text-cyber-cyan mb-3">{item.venue}</p>
            <p className="font-body text-sm text-dim-gray leading-relaxed mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-dim-gray px-2 py-0.5 border border-grid-line">
                  {tag}
                </span>
              ))}
            </div>

            {item.link && item.link !== '#' && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-neon-volt hover:glow-volt-text transition-all"
              >
                <ExternalLink size={10} /> VIEW PAPER
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
