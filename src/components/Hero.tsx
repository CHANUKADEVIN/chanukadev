import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Wifi, Globe, Activity, Crosshair, Shield, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { assetPath } from '../utils/asset';
import { MagneticButton } from './ui/MagneticButton';

/* ─── Particle Canvas ──────────────────────────────────────────────── */
interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); };
    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 16000);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectDist = 110, repelDist = 75;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelDist) { const f = (repelDist - dist) / repelDist; p.vx += (dx / dist) * f * 0.4; p.vy += (dy / dist) * f * 0.4; }
        p.vx *= 0.98; p.vy *= 0.98; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < repelDist * 1.5 ? `rgba(0,240,255,${p.opacity * 1.5})` : `rgba(204,255,0,${p.opacity})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]; const qd = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
          if (qd < connectDist) { const a = (1 - qd / connectDist) * 0.12; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(0,240,255,${a})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize(); draw();
    return () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(animRef.current); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />;
};

/* ─── Boot Loader ──────────────────────────────────────────────────── */
const BootLoader = ({ progress }: { progress: number }) => (
  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian">
    <div className="w-96 font-mono text-sm">
      <div className="text-neon-volt mb-6 text-lg font-bold tracking-widest">DEVIN_OS v2.6</div>
      <div className="space-y-1 text-dim-gray mb-6">
        {progress > 10 && <div><span className="text-cyber-cyan">►</span> Initializing portfolio kernel...</div>}
        {progress > 30 && <div><span className="text-cyber-cyan">►</span> Loading project manifests...</div>}
        {progress > 55 && <div><span className="text-cyber-cyan">►</span> Mounting skill nodes...</div>}
        {progress > 75 && <div><span className="text-cyber-cyan">►</span> Calibrating HUD interface...</div>}
        {progress > 90 && <div><span className="text-neon-volt">►</span> System ready.</div>}
      </div>
      <div className="w-full h-px bg-grid-line mb-2">
        <motion.div className="h-full bg-neon-volt" style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(204,255,0,0.5)' }} transition={{ duration: 0.05 }} />
      </div>
      <div className="flex justify-between text-xs"><span className="text-dim-gray">BOOT SEQUENCE</span><span className="text-neon-volt">{progress}%</span></div>
    </div>
  </motion.div>
);

/* ─── HUD Portrait ─────────────────────────────────────────────────── */
const HUDPortrait = () => {
  const [hovered, setHovered] = useState(false);
  const [scanPos, setScanPos] = useState(0);

  // Scanline sweep on hover
  useEffect(() => {
    if (!hovered) { setScanPos(0); return; }
    let pos = 0;
    const interval = setInterval(() => {
      pos += 1.5;
      if (pos > 110) pos = -10;
      setScanPos(pos);
    }, 16);
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <motion.div
      className="relative select-none"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer ambient glow ring */}
      <motion.div
        className="absolute -inset-6 rounded-none pointer-events-none"
        animate={{
          boxShadow: hovered
            ? '0 0 60px rgba(0,240,255,0.25), 0 0 120px rgba(204,255,0,0.10)'
            : '0 0 30px rgba(0,240,255,0.10), 0 0 60px rgba(204,255,0,0.04)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* HUD frame container */}
      <div className="relative w-72 md:w-80 lg:w-96" style={{ aspectRatio: '3/4' }}>

        {/* ── The photograph ── */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Chromatic aberration layers on hover */}
          {hovered && (
            <>
              <img src={assetPath('/profile.jpg')} alt=""
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                style={{ mixBlendMode: 'screen', filter: 'saturate(2)', transform: 'translate(-2px, 1px)', opacity: 0.35, color: 'red' }}
              />
              <img src={assetPath('/profile.jpg')} alt=""
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                style={{ mixBlendMode: 'screen', filter: 'saturate(2) hue-rotate(120deg)', transform: 'translate(2px, -1px)', opacity: 0.25 }}
              />
            </>
          )}

          {/* Main image */}
          <motion.img
            src={assetPath('/profile.jpg')}
            alt="Chanuka Devin"
            className="w-full h-full object-cover object-top"
            animate={{
              filter: hovered
                ? 'contrast(1.15) saturate(0.8) brightness(0.85)'
                : 'contrast(1.05) saturate(0.9) brightness(0.95)',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Scanline sweep on hover */}
          {hovered && (
            <div
              className="absolute left-0 right-0 h-8 pointer-events-none"
              style={{
                top: `${scanPos}%`,
                background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.12), rgba(0,240,255,0.06), transparent)',
                transition: 'none',
              }}
            />
          )}

          {/* Persistent CRT scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Bottom gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 100%)' }} />
        </div>

        {/* ── HUD Corner Brackets ── */}
        {/* TL */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 pointer-events-none"
          style={{ borderColor: '#ccff00', filter: 'drop-shadow(0 0 4px #ccff00)' }} />
        {/* TR */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 pointer-events-none"
          style={{ borderColor: '#ccff00', filter: 'drop-shadow(0 0 4px #ccff00)' }} />
        {/* BL */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 pointer-events-none"
          style={{ borderColor: '#00f0ff', filter: 'drop-shadow(0 0 4px #00f0ff)' }} />
        {/* BR */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 pointer-events-none"
          style={{ borderColor: '#00f0ff', filter: 'drop-shadow(0 0 4px #00f0ff)' }} />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ border: '1px solid rgba(0,240,255,0.2)' }}
          animate={{ borderColor: hovered ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.15)' }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Crosshair Targeting ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          {/* Horizontal line */}
          <div className="absolute w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)' }} />
          {/* Vertical line */}
          <div className="absolute h-full w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.6), transparent)' }} />
          {/* Center circle */}
          <div className="w-12 h-12 rounded-full border border-cyber-cyan opacity-50" />
          <div className="absolute w-3 h-3 rounded-full border border-cyber-cyan" />
        </div>

        {/* ── Top status bar ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: '#ccff00', textShadow: '0 0 8px rgba(204,255,0,0.6)' }}>
            <Crosshair size={10} />
            <span>TGT: LOCK</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-volt animate-pulse" style={{ boxShadow: '0 0 4px #ccff00' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-volt" style={{ opacity: 0.4 }} />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-volt" style={{ opacity: 0.2 }} />
          </div>
        </div>

        {/* ── Corner tick marks ── */}
        {[['top-3', 'left-10'], ['top-3', 'right-10'], ['bottom-3', 'left-10'], ['bottom-3', 'right-10']].map(([y, x], i) => (
          <div key={i} className={`absolute ${y} ${x} w-2 h-px pointer-events-none`}
            style={{ background: '#ccff00', opacity: 0.6 }} />
        ))}
        {[['left-3', 'top-10'], ['right-3', 'top-10'], ['left-3', 'bottom-10'], ['right-3', 'bottom-10']].map(([x, y], i) => (
          <div key={i} className={`absolute ${x} ${y} h-2 w-px pointer-events-none`}
            style={{ background: '#ccff00', opacity: 0.6 }} />
        ))}

        {/* ── Grid lines overlay ── */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ── Bottom HUD overlays ── */}
        <div className="absolute bottom-5 left-3 right-3 pointer-events-none">
          {/* ID badge */}
          <div className="flex items-center gap-2 mb-2">
            <Shield size={10} style={{ color: '#ccff00' }} />
            <span className="font-mono text-xs" style={{ color: '#ccff00', textShadow: '0 0 6px rgba(204,255,0,0.5)' }}>
              ENGINEER ID: DEV-01
            </span>
          </div>
          {/* Status row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-volt animate-pulse" />
              <span className="font-mono text-xs text-neon-volt">STATUS: ONLINE</span>
            </div>
            <span className="font-mono text-xs text-cyber-cyan opacity-60">v2.6</span>
          </div>
          {/* Name tag */}
          <div className="mt-2 pt-2 border-t border-neon-volt/20">
            <div className="font-mono text-xs text-dim-gray">CHANUKA DEVIN</div>
            <div className="font-mono text-xs text-cyber-cyan opacity-70">SOFTWARE ENGINEER · SRI LANKA</div>
          </div>
        </div>

        {/* ── Hover scan indicator ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 font-mono text-xs pointer-events-none flex items-center gap-1"
              style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,0.8)' }}
            >
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                ■
              </motion.span>
              REC
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Side data stream lines ── */}
        <div className="absolute -left-4 top-1/4 bottom-1/4 w-px pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(204,255,0,0.4), transparent)' }}>
          <motion.div className="w-full h-6 bg-neon-volt opacity-60"
            animate={{ y: ['-100%', '400%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        </div>
        <div className="absolute -right-4 top-1/3 bottom-1/3 w-px pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.4), transparent)' }}>
          <motion.div className="w-full h-4 bg-cyber-cyan opacity-60"
            animate={{ y: ['400%', '-100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.8 }} />
        </div>

        {/* ── Floating metric HUD tags ── */}
        <motion.div
          className="absolute -right-2 top-1/4 pointer-events-none"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="font-mono text-xs px-2 py-1 border-l-2"
            style={{ background: 'rgba(10,10,15,0.85)', borderColor: '#ccff00', color: '#ccff00', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '9px', color: '#4a4a5a' }}>LATENCY</div>
            <div>24ms</div>
          </div>
        </motion.div>
        <motion.div
          className="absolute -left-2 top-1/2 pointer-events-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="font-mono text-xs px-2 py-1 border-r-2"
            style={{ background: 'rgba(10,10,15,0.85)', borderColor: '#00f0ff', color: '#00f0ff', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '9px', color: '#4a4a5a' }}>REGION</div>
            <div>LK</div>
          </div>
        </motion.div>

        {/* ── Rotating orbit ring ── */}
        <div className="absolute -inset-8 pointer-events-none">
          <motion.div
            className="w-full h-full rounded-none absolute inset-0"
            style={{
              border: '1px dashed rgba(204,255,0,0.12)',
              borderRadius: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Telemetry Badge ──────────────────────────────────────────────── */
interface TelemetryBadgeProps { icon: React.ReactNode; label: string; value: string; pulse?: boolean; color?: 'volt' | 'cyan'; }
const TelemetryBadge = ({ icon, label, value, pulse = false, color = 'cyan' }: TelemetryBadgeProps) => {
  const accent = color === 'volt' ? '#ccff00' : '#00f0ff';
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs border"
      style={{ background: 'rgba(22,24,29,0.8)', borderColor: `${accent}30`, color: accent, backdropFilter: 'blur(8px)' }}>
      {pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />}
      <span className="text-dim-gray">{icon}</span>
      <span className="text-dim-gray">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

/* ─── Hero ─────────────────────────────────────────────────────────── */
export const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const roles = useMemo(
    () => ['Software Engineer', 'Go Developer', 'Full-Stack Architect', 'AI/ML Developer', '3D Innovator'],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) { clearInterval(timer); setTimeout(() => setIsLoading(false), 400); return 100; }
        return prev + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    let i = 0;
    const role = roles[roleIndex];
    const interval = setInterval(() => {
      if (i <= role.length) { setDisplayedText(role.slice(0, i)); i++; }
      else { clearInterval(interval); setTimeout(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2200); }
    }, 80);
    return () => clearInterval(interval);
  }, [roleIndex, isLoading, roles]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const downloadCV = () => { const a = document.createElement('a'); a.href = assetPath('/Chanuka-Devin-CV-2026.pdf'); a.download = 'Chanuka_Devin_CV.pdf'; a.click(); };

  if (isLoading) return <BootLoader progress={loadingProgress} />;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
      {/* Canvas */}
      <ParticleCanvas />
      {/* Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, transparent 20%, rgba(10,10,15,0.7) 100%)' }} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: 600, height: 600, top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(204,255,0,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: '-10%', right: '5%', background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      </div>

      {/* ── 2-Column Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left: Content ─── */}
          <div>
            {/* Terminal header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="font-mono text-xs text-dim-gray mb-8 flex items-center gap-3">
              <span className="text-neon-volt">[SYSTEM]</span>
              <span className="opacity-50">&gt;</span>
              <span>portfolio.init() — build 2026.08</span>
              <span className="ml-auto flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 opacity-70" />
                <span className="w-2 h-2 rounded-full bg-yellow-500 opacity-70" />
                <span className="w-2 h-2 rounded-full bg-neon-volt opacity-70" />
              </span>
            </motion.div>

            {/* Name + slash */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="font-display font-bold text-ghost-white leading-none tracking-tighter mb-1"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                {portfolioData.personal.name.split('').map((ch, i) => (
                  <motion.span key={i} className="inline-block hover:text-neon-volt transition-colors duration-150 cursor-default"
                    whileHover={{ y: -6, transition: { duration: 0.12 } }}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </h1>
              {/* Slash separator */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-neon-volt opacity-60 text-lg">//</span>
                <span className="font-display text-dim-gray font-light text-lg tracking-wide">Software Engineer</span>
                <div className="h-px flex-1 bg-gradient-to-r from-neon-volt/30 to-transparent" />
              </div>
            </motion.div>

            {/* Typing role */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 mb-6">
              <span className="font-mono text-cyber-cyan text-lg">&gt;_</span>
              <span className="font-mono text-ghost-white text-lg" style={{ minWidth: '260px' }}>
                {displayedText}<span className="terminal-cursor ml-0.5" />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
              className="font-body text-dim-gray text-base max-w-md mb-8 leading-relaxed">
              {portfolioData.personal.tagline}
            </motion.p>

            {/* Telemetry */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-10">
              <TelemetryBadge icon={<Activity size={10} />} label="STATUS" value="AVAILABLE" pulse color="volt" />
              <TelemetryBadge icon={<Wifi size={10} />} label="LATENCY" value="24ms" color="cyan" />
              <TelemetryBadge icon={<Globe size={10} />} label="REGION" value="GLOBAL · LK" color="cyan" />
              <TelemetryBadge icon={<Cpu size={10} />} label="STACK" value="Go · React · AI" color="cyan" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12">
              <MagneticButton id="hero-cta-engage" onClick={() => scrollTo('contact')}
                className="group relative flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-medium tracking-wider text-obsidian bg-neon-volt overflow-hidden"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' } as React.CSSProperties}>
                <span>ENGAGE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton id="hero-cta-cv" onClick={downloadCV}
                className="flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-medium tracking-wider text-ghost-white border border-ghost-white/20 hover:border-neon-volt/50 hover:text-neon-volt transition-colors duration-300">
                <Download size={14} /><span>DOWNLOAD CV</span>
              </MagneticButton>

              <MagneticButton id="hero-cta-work" onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-7 py-3.5 font-mono text-sm font-medium tracking-wider text-dim-gray hover:text-cyber-cyan border border-transparent hover:border-cyber-cyan/30 transition-all duration-300">
                <span className="text-cyber-cyan">[</span><span>VIEW_WORK</span><span className="text-cyber-cyan">]</span>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-grid-line">
              {[
                { value: '2+', label: 'Years XP', color: '#ccff00' },
                { value: '50+', label: 'Projects', color: '#ccff00' },
                { value: '10+', label: 'Clients', color: '#00f0ff' },
                { value: '2', label: 'Papers', color: '#00f0ff' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }}
                  className="cursor-default group">
                  <div className="font-display text-3xl font-bold transition-all duration-200"
                    style={{ color: stat.color, textShadow: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.textShadow = `0 0 20px ${stat.color}80`)}
                    onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-dim-gray tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: HUD Portrait ─── */}
          <div className="flex justify-center lg:justify-end">
            <HUDPortrait />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => scrollTo('about')}>
        <span className="font-mono text-xs text-dim-gray tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-neon-volt to-transparent" />
      </motion.div>
    </section>
  );
};
