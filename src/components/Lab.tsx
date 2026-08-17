import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Play, Eye, Crosshair } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

/* ─── Particle Simulator ──────────────────────────────── */
const ParticleSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    type P = { x: number; y: number; vx: number; vy: number; hue: number; life: number };
    const particles: P[] = [];

    const add = () => {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        hue: Math.random() > 0.5 ? 72 : 186, // neon volt ~72, cyan ~186
        life: 1,
      });
    };

    const tick = () => {
      ctx.fillStyle = 'rgba(10,10,15,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 150 && Math.random() < 0.3) add();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // gravity
        p.life -= 0.008;

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

/* ─── Sorting Visualizer ──────────────────────────────── */
const SortingVisualizer = () => {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 40 }, () => Math.floor(Math.random() * 90) + 10)
  );
  const [sorting, setSorting] = useState(false);
  const [activeIdx, setActiveIdx] = useState<[number, number]>([-1, -1]);

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...bars];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIdx([j, j + 1]);
        await new Promise((r) => setTimeout(r, 20));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setBars([...arr]);
        }
      }
    }
    setActiveIdx([-1, -1]);
    setSorting(false);
  };

  const reset = () => {
    setBars(Array.from({ length: 40 }, () => Math.floor(Math.random() * 90) + 10));
    setActiveIdx([-1, -1]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3 mb-4">
        <button
          onClick={bubbleSort}
          disabled={sorting}
          id="lab-sort-run"
          className="flex items-center gap-2 font-mono text-xs px-4 py-2 bg-neon-volt text-obsidian disabled:opacity-40 hover:opacity-90 transition"
        >
          <Play size={10} /> RUN BUBBLE SORT
        </button>
        <button
          onClick={reset}
          disabled={sorting}
          id="lab-sort-reset"
          className="font-mono text-xs px-4 py-2 border border-grid-line text-dim-gray hover:text-ghost-white hover:border-dim-gray transition disabled:opacity-40"
        >
          RESET
        </button>
      </div>
      <div className="flex-1 flex items-end gap-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-20"
            style={{
              height: `${h}%`,
              background:
                activeIdx[0] === i || activeIdx[1] === i ? '#00f0ff' : '#ccff0060',
              boxShadow:
                activeIdx[0] === i || activeIdx[1] === i
                  ? '0 0 8px rgba(0,240,255,0.8)'
                  : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Cyber HUD Cursor Sandbox ───────────────────────── */
const HudCursorSandbox = () => {
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'COMPLETE'>('IDLE');
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    if (scanState === 'SCANNING') return;
    setScanState('SCANNING');
    setScanProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setScanState('COMPLETE');
        setTimeout(() => setScanState('IDLE'), 2000);
      }
    }, 20);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-cyber-grid p-6">
      <div className="font-mono text-xs text-cyber-cyan tracking-widest mb-2 flex items-center gap-2">
        <Crosshair size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
        <span>CYBER HUD INTERFACE STAGE</span>
      </div>
      <h3 className="font-display text-xl font-bold text-ghost-white mb-2">
        // RETICLE & TELEMETRY TARGET STAGE
      </h3>
      <p className="font-mono text-xs text-dim-gray max-w-md mb-6 leading-relaxed">
        Move your pointer over this stage to test target tracking, reticle scaling, click lock-on burst, and coordinates readout.
      </p>

      {/* Target Button */}
      <button
        onClick={startScan}
        id="lab-hud-target-btn"
        className="target relative px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 border"
        style={{
          borderColor: scanState === 'SCANNING' ? '#ccff00' : '#00f0ff',
          color: scanState === 'SCANNING' ? '#ccff00' : '#00f0ff',
          background: scanState === 'SCANNING' ? 'rgba(204,255,0,0.1)' : 'rgba(0,240,255,0.06)',
          boxShadow: scanState === 'SCANNING' ? '0 0 24px rgba(204,255,0,0.3)' : '0 0 12px rgba(0,240,255,0.15)',
        }}
      >
        {scanState === 'IDLE' && '► INITIATE SCAN'}
        {scanState === 'SCANNING' && `SCANNING... ${scanProgress}%`}
        {scanState === 'COMPLETE' && '✓ TARGET ACQUIRED'}
      </button>

      {/* Scan Progress Bar */}
      {scanState === 'SCANNING' && (
        <div className="w-64 h-1 bg-grid-line mt-4 overflow-hidden">
          <div
            className="h-full bg-neon-volt transition-all duration-75"
            style={{ width: `${scanProgress}%`, boxShadow: '0 0 8px #ccff00' }}
          />
        </div>
      )}

      {/* Stage Telemetry footer */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between font-mono text-xs text-dim-gray">
        <span>MODE: REAL-TIME TRACKING</span>
        <span className="text-neon-volt">EASE: 0.18 · TICK: 60FPS</span>
      </div>
    </div>
  );
};

/* ─── Source Code Samples ─────────────────────────────── */
const SOURCE_SAMPLES: Record<string, string> = {
  particles: `// Particle System — Physics Engine
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  hue: number; life: number;
}

const tick = () => {
  // Trail effect via semi-transparent clear
  ctx.fillStyle = 'rgba(10,10,15,0.15)';
  ctx.fillRect(0, 0, w, h);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.01; // gravity
    p.life  -= 0.008;

    if (p.life <= 0) {
      particles.splice(i, 1); return;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = \`hsla(\${p.hue}, 100%, 60%, \${p.life})\`;
    ctx.fill();
  });

  requestAnimationFrame(tick);
};`,
  sorting: `// Bubble Sort — O(n²) Visualizer
const bubbleSort = async (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setActiveIdx([j, j + 1]);
      await sleep(20); // animation delay

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];
        setBars([...arr]);
      }
    }
  }
};`,
  hudcursor: `<!-- Cyber-HUD Cursor — Pure HTML/CSS/JS Rig -->
<div id="cursor-root">
  <div class="c-layer c-brackets" id="brackets">
    <span></span><span></span><span></span><span></span>
  </div>
  <div class="c-layer c-ring" id="ring"></div>
  <div class="c-layer c-dot" id="dot"></div>
  <div class="c-layer c-readout" id="readout">
    X <span id="rx">0000</span> Y <span id="ry">0000</span><br>
    <span class="status" id="rstatus">TRACKING</span>
  </div>
  <div class="c-layer c-lock" id="lock"></div>
</div>

<script>
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0, angle = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = \`translate(\${mouseX}px, \${mouseY}px) translate(-50%,-50%)\`;
    brackets.style.transform = \`translate(\${mouseX}px, \${mouseY}px) translate(-50%,-50%)\`;
    readout.style.transform = \`translate(\${mouseX+22}px, \${mouseY+22}px)\`;
    rx.textContent = String(Math.round(mouseX)).padStart(4,'0');
    ry.textContent = String(Math.round(mouseY)).padStart(4,'0');
  });

  function raf() {
    ringX += (mouseX - ringX) * 0.18; // Eased lerp
    ringY += (mouseY - ringY) * 0.18;
    angle += 1.2;
    ring.style.transform = \`translate(\${ringX}px, \${ringY}px) translate(-50%,-50%) rotate(\${angle}deg)\`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
</script>`,
};

type LabKey = 'particles' | 'sorting' | 'hudcursor';

const LABS = [
  { key: 'particles' as LabKey, label: 'PARTICLE SYSTEM', sub: 'Physics Engine' },
  { key: 'sorting' as LabKey, label: 'SORTING VIZ', sub: 'Bubble Sort O(n²)' },
  { key: 'hudcursor' as LabKey, label: 'CYBER HUD CURSOR', sub: 'Reticle & Telemetry Rig' },
];

export const Lab = () => {
  const [activeTab, setActiveTab] = useState<LabKey>('particles');
  const [mode, setMode] = useState<'interactive' | 'source'>('interactive');

  return (
    <section id="lab" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <SectionHeader
          index="04"
          title="INTERACTIVE LAB"
          subtitle="Sandboxed demos — toggle between live view and source code."
        />

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
          {/* Lab tabs */}
          <div className="flex flex-wrap gap-2">
            {LABS.map(({ key, label, sub }) => (
              <button
                key={key}
                id={`lab-tab-${key}`}
                onClick={() => setActiveTab(key)}
                className="text-left px-5 py-3 border font-mono text-xs transition-all duration-200"
                style={{
                  borderColor: activeTab === key ? '#ccff00' : 'rgba(26,26,36,0.8)',
                  background: activeTab === key ? 'rgba(204,255,0,0.08)' : 'transparent',
                }}
              >
                <div style={{ color: activeTab === key ? '#ccff00' : '#4a4a5a' }}>{label}</div>
                <div className="text-dim-gray mt-0.5" style={{ fontSize: '10px' }}>
                  {sub}
                </div>
              </button>
            ))}
          </div>

          {/* Mode toggle */}
          <div className="flex border border-grid-line self-start">
            <button
              id="lab-mode-interactive"
              onClick={() => setMode('interactive')}
              className="flex items-center gap-2 px-5 py-2 font-mono text-xs transition-all duration-200"
              style={{
                background: mode === 'interactive' ? 'rgba(0,240,255,0.1)' : 'transparent',
                color: mode === 'interactive' ? '#00f0ff' : '#4a4a5a',
              }}
            >
              <Eye size={12} /> INTERACTIVE
            </button>
            <div className="w-px bg-grid-line" />
            <button
              id="lab-mode-source"
              onClick={() => setMode('source')}
              className="flex items-center gap-2 px-5 py-2 font-mono text-xs transition-all duration-200"
              style={{
                background: mode === 'source' ? 'rgba(204,255,0,0.08)' : 'transparent',
                color: mode === 'source' ? '#ccff00' : '#4a4a5a',
              }}
            >
              <Code2 size={12} /> SOURCE
            </button>
          </div>
        </div>

        {/* Sandbox */}
        <div
          className="border border-grid-line relative overflow-hidden"
          style={{ height: '420px', background: 'rgba(10,10,15,0.7)' }}
        >
          {/* Header bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-grid-line">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-neon-volt/60" />
            </div>
            <span className="font-mono text-xs text-dim-gray ml-2">
              devin_lab / {activeTab}.{activeTab === 'hudcursor' ? 'html' : 'tsx'} —{' '}
              {mode === 'interactive' ? '▶ RUNNING' : '⌥ SOURCE'}
            </span>
          </div>

          <div className="h-[calc(100%-40px)] p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {mode === 'interactive' ? (
                  activeTab === 'particles' ? (
                    <ParticleSimulator />
                  ) : activeTab === 'sorting' ? (
                    <SortingVisualizer />
                  ) : (
                    <HudCursorSandbox />
                  )
                ) : (
                  <div className="h-full overflow-auto">
                    <pre
                      className="font-mono text-xs leading-relaxed"
                      style={{ color: '#e8e8f0' }}
                    >
                      {SOURCE_SAMPLES[activeTab].split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span
                            className="text-dim-gray select-none mr-4 text-right"
                            style={{ minWidth: '24px' }}
                          >
                            {i + 1}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(/\/\/.+/g, '<span style="color:#4a4a5a">$&</span>')
                                .replace(
                                  /(const|let|async|await|if|for|return|interface|type|new|void|function)\b/g,
                                  '<span style="color:#00f0ff">$1</span>'
                                )
                                .replace(
                                  /(".*?"|'.*?'|`.*?`)/g,
                                  '<span style="color:#ccff00">$1</span>'
                                )
                                .replace(/\b(\d+)\b/g, '<span style="color:#a78bfa">$1</span>'),
                            }}
                          />
                        </div>
                      ))}
                    </pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-dim-gray">
          <span className="text-neon-volt">//</span> More experiments at{' '}
          <a
            href="https://github.com/h2oalphaYT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline"
          >
            github.com/h2oalphaYT
          </a>
        </p>
      </div>
    </section>
  );
};
