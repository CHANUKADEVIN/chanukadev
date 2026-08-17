import { portfolioData } from '../data/portfolio';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-grid-line py-10 bg-obsidian">
    <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="font-mono text-xs text-dim-gray">
        <span className="text-neon-volt">[CD]</span> Chanuka Devin · 2026
        <span className="mx-2 text-grid-line">·</span>
        Built with{' '}
        <Heart size={10} className="inline text-neon-volt" />
        {' '}React + GSAP + Lenis
      </div>

      <div className="flex items-center gap-4">
        <a
          id="footer-github"
          href={portfolioData.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim-gray hover:text-neon-volt transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          id="footer-linkedin"
          href={portfolioData.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim-gray hover:text-cyber-cyan transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          id="footer-email"
          href={portfolioData.social.email}
          className="text-dim-gray hover:text-neon-volt transition-colors duration-200"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>

      <div className="font-mono text-xs text-dim-gray">
        <span className="text-cyber-cyan animate-pulse">●</span> AVAILABLE · LK
      </div>
    </div>
  </footer>
);
