import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, Check, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { assetPath } from '../utils/asset';
import { SectionHeader } from './ui/SectionHeader';

/* ─── Types ───────────────────────────────────────────── */
interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'system';
  content: string | string[];
  actionType?: 'contact' | 'social' | 'resume';
}

/* ─── Command Registry ────────────────────────────────── */
const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '┌──────────────────────────────────────────────┐',
    '│           DEVIN OS — COMMAND REFERENCE        │',
    '├──────────────────────────────────────────────┤',
    '│  devin --contact    Open contact channels     │',
    '│  devin --resume     Download CV / Resume      │',
    '│  devin --projects   List engineering projects  │',
    '│  devin --skills     Display tech stack HUD    │',
    '│  devin --status     System & availability     │',
    '│  devin --social     Social links              │',
    '│  clear              Clear terminal            │',
    '│  help               Show this message         │',
    '└──────────────────────────────────────────────┘',
  ],
  'devin --contact': () => [
    '// CONTACT CHANNELS & PROFILES',
    '─────────────────────────────────────────────────',
    `✉  Email    : ${portfolioData.personal.email}`,
    `🔗 LinkedIn : ${portfolioData.social.linkedin}`,
    `🐙 GitHub   : ${portfolioData.social.github}`,
    '─────────────────────────────────────────────────',
    '→ Click any link below or quick buttons to navigate/copy.',
  ],
  'devin --resume': () => [
    '// RESUME DOWNLOAD',
    'Fetching Chanuka_Devin_CV.pdf...',
    '[████████████████████] 100%',
    '✓ Download initiated.',
  ],
  'devin --projects': () => [
    '// ENGINEERING PROJECTS',
    '─────────────────────────────────────────────────',
    '01 · AuralFlix Multimedia Player     [Go/React]',
    '02 · 3D Animation Capture System     [Python/CV]',
    '03 · E-Net LMS Platform              [MERN]',
    '04 · AI Script Automation Engine     [FastAPI]',
    '05 · Inventory Management System     [MERN]',
    '─────────────────────────────────────────────────',
    '→ Scroll ↑ to view interactive project case studies.',
  ],
  'devin --skills': () => [
    '// TECH STACK HUD',
    '─────────────────────────────────────────────────',
    'FRONTEND   : React · Next.js · TypeScript · Tailwind',
    'BACKEND    : Go · Node.js · Python · FastAPI · Spring',
    'CLOUD      : AWS · Docker · Linux',
    'DATABASES  : MongoDB · PostgreSQL · MySQL · Firebase',
    'TOOLS      : Git · GSAP · Framer Motion · Lenis',
    '─────────────────────────────────────────────────',
    '→ Scroll ↑ to interact with the skill HUD.',
  ],
  'devin --status': () => [
    '// SYSTEM STATUS',
    '─────────────────────────────────────────────────',
    '● STATUS    : AVAILABLE FOR HIRE',
    '● LATENCY   : 24ms',
    '● REGION    : Sri Lanka · Global Remote',
    '● UPTIME    : 99.9% reliability',
    '● TIMEZONE  : IST (UTC+5:30)',
    '─────────────────────────────────────────────────',
    '→ Open to full-time, contract & freelance roles.',
  ],
  'devin --social': () => [
    '// SOCIAL PROFILES',
    '─────────────────────────────────────────────────',
    `LinkedIn  → ${portfolioData.social.linkedin}`,
    `GitHub    → ${portfolioData.social.github}`,
    `Email     → ${portfolioData.personal.email}`,
  ],
};

const AUTOCOMPLETE_LIST = Object.keys(COMMANDS).concat(['clear']);

const BOOT_LINES = [
  '[ DEVIN OS v2.6 — Interactive Shell ]',
  'Kernel: chanuka.devin/2026',
  'All systems nominal.',
  '─────────────────────────────────',
  'Type `help` to see available commands.',
  '',
];

let lineIdCounter = 100;

/* ─── CLI Terminal Component ──────────────────────────── */
export const Contact = () => {
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    BOOT_LINES.map((c) => ({ id: lineIdCounter++, type: 'system', content: c }))
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const pushLine = (line: Omit<TerminalLine, 'id'>) => {
    setLines((prev) => [...prev, { ...line, id: lineIdCounter++ }]);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard?.writeText(portfolioData.personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    pushLine({ type: 'input', content: trimmed });

    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev].slice(0, 50));
    setHistIdx(-1);

    if (trimmed === 'clear') {
      setLines(BOOT_LINES.map((c) => ({ id: lineIdCounter++, type: 'system', content: c })));
      return;
    }

    const lower = trimmed.toLowerCase();
    const handler = COMMANDS[lower];

    if (handler) {
      const result = handler();

      // Side effects
      if (lower === 'devin --contact' || lower === 'devin --social') {
        copyEmailToClipboard();
      }
      if (lower === 'devin --resume') {
        const a = document.createElement('a');
        a.href = assetPath('/Chanuka-Devin-CV-2026.pdf');
        a.download = 'Chanuka_Devin_CV.pdf';
        a.click();
      }

      setTimeout(() => {
        pushLine({ type: 'output', content: result, actionType: lower === 'devin --contact' ? 'contact' : undefined });
      }, 80);
    } else {
      setTimeout(() => {
        pushLine({
          type: 'error',
          content: `command not found: ${trimmed} — try 'help'`,
        });
      }, 80);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AUTOCOMPLETE_LIST.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  const lineColor = (type: TerminalLine['type']): string => {
    switch (type) {
      case 'input': return '#ccff00';
      case 'error': return '#ff6b6b';
      case 'success': return '#00f0ff';
      case 'info': return '#a78bfa';
      case 'system': return '#4a4a5a';
      default: return '#e8e8f0';
    }
  };

  // Helper to format line output with clickable links & copy action
  const renderLineContent = (str: string) => {
    if (str.includes(portfolioData.social.linkedin)) {
      const parts = str.split(portfolioData.social.linkedin);
      return (
        <span>
          {parts[0]}
          <a
            href={portfolioData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline inline-flex items-center gap-1 font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            {portfolioData.social.linkedin} <ExternalLink size={10} />
          </a>
          {parts[1]}
        </span>
      );
    }

    if (str.includes(portfolioData.social.github)) {
      const parts = str.split(portfolioData.social.github);
      return (
        <span>
          {parts[0]}
          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-volt hover:underline inline-flex items-center gap-1 font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            {portfolioData.social.github} <ExternalLink size={10} />
          </a>
          {parts[1]}
        </span>
      );
    }

    if (str.includes(portfolioData.personal.email)) {
      const parts = str.split(portfolioData.personal.email);
      return (
        <span>
          {parts[0]}
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyEmailToClipboard();
            }}
            className="text-neon-volt hover:underline inline-flex items-center gap-1 font-bold cursor-pointer bg-neon-volt/10 px-1 py-0.5 rounded"
            title="Click to copy email"
          >
            {portfolioData.personal.email}
            {copied ? <Check size={10} className="text-neon-volt" /> : <Copy size={10} />}
          </button>
          {parts[1]}
        </span>
      );
    }

    return str;
  };

  return (
    <section id="contact" className="py-32 bg-obsidian">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <SectionHeader
          index="05"
          title="CLI TERMINAL & CONTACT"
          subtitle="Interactive shell — click profiles to navigate or copy contact details directly."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="border border-grid-line relative overflow-hidden"
          style={{ background: 'rgba(6,6,10,0.95)' }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-grid-line">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-neon-volt/60" />
            </div>
            <span className="font-mono text-xs text-dim-gray">
              devin@portfolio:~$ — bash
            </span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-volt animate-pulse" />
              <span className="text-neon-volt">LIVE</span>
            </div>
          </div>

          {/* Output area */}
          <div
            className="p-5 font-mono text-sm overflow-y-auto scanline"
            style={{ minHeight: '380px', maxHeight: '480px' }}
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mb-0.5 leading-relaxed"
                >
                  {line.type === 'input' ? (
                    <div>
                      <span style={{ color: '#00f0ff' }}>devin</span>
                      <span style={{ color: '#4a4a5a' }}>@portfolio</span>
                      <span style={{ color: '#4a4a5a' }}>:~$</span>
                      <span className="text-ghost-white"> {line.content as string}</span>
                    </div>
                  ) : Array.isArray(line.content) ? (
                    <div style={{ color: lineColor(line.type) }}>
                      {(line.content as string[]).map((l, i) => (
                        <div key={i}>{renderLineContent(l) || <br />}</div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: lineColor(line.type) }}>
                      {renderLineContent(line.content as string)}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Prompt + Input */}
            {booted && (
              <div className="flex items-center mt-2">
                <span style={{ color: '#00f0ff' }}>devin</span>
                <span style={{ color: '#4a4a5a' }}>@portfolio:~$</span>
                <span className="text-ghost-white ml-1">&nbsp;</span>
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    autoFocus
                    id="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none text-ghost-white font-mono text-sm w-full caret-transparent"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span
                    className="terminal-cursor absolute"
                    style={{ left: `${input.length}ch` }}
                  />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick command & Action Bar */}
          <div className="border-t border-grid-line px-5 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* Command Shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-dim-gray mr-1">COMMANDS:</span>
              {['help', 'devin --contact', 'devin --resume', 'devin --projects'].map((cmd) => (
                <button
                  key={cmd}
                  id={`terminal-quick-${cmd.replace(/[\s-]/g, '_')}`}
                  onClick={() => {
                    execute(cmd);
                    inputRef.current?.focus();
                  }}
                  className="font-mono text-xs px-2.5 py-1 border border-grid-line text-dim-gray hover:text-neon-volt hover:border-neon-volt/40 transition-all duration-200"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Direct Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Copy Email Button */}
              <button
                onClick={copyEmailToClipboard}
                id="terminal-action-copy-email"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 border border-neon-volt/40 text-neon-volt bg-neon-volt/10 hover:bg-neon-volt/20 transition-all duration-200"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
              </button>

              {/* LinkedIn Link */}
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="terminal-action-linkedin"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 border border-cyber-cyan/40 text-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 transition-all duration-200"
              >
                <Linkedin size={11} />
                <span>LINKEDIN</span>
                <ExternalLink size={10} />
              </a>

              {/* GitHub Link */}
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                id="terminal-action-github"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 border border-dim-gray/40 text-ghost-white bg-white/5 hover:border-ghost-white/40 transition-all duration-200"
              >
                <Github size={11} />
                <span>GITHUB</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 font-mono text-xs text-dim-gray text-center">
          <span className="text-neon-volt">TAB</span> to autocomplete ·{' '}
          <span className="text-neon-volt">↑↓</span> command history ·{' '}
          <span className="text-neon-volt">ENTER</span> to execute
        </p>
      </div>
    </section>
  );
};
