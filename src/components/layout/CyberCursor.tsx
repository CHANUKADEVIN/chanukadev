import { useEffect, useRef, useState } from 'react';

export const CyberCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<'TRACKING' | 'LOCKED'>('TRACKING');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const angleRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const lastTrailRef = useRef(0);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover / fine pointers
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (bracketsRef.current) {
        bracketsRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (readoutRef.current) {
        readoutRef.current.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
      }
      if (lockRef.current) {
        lockRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      spawnTrail(e.clientX, e.clientY);
    };

    const handleMouseDown = () => {
      setStatus('LOCKED');
      if (lockRef.current) {
        lockRef.current.classList.remove('fire');
        void lockRef.current.offsetWidth; // force reflow
        lockRef.current.classList.add('fire');
      }
    };

    const handleMouseUp = () => {
      setStatus('TRACKING');
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest('a, button, input, textarea, select, [role="button"], .magnetic-btn, .card-hover, .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const spawnTrail = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastTrailRef.current < 25) return;
      lastTrailRef.current = now;

      if (!rootRef.current) return;
      const trail = document.createElement('div');
      trail.className = 'c-layer c-trail';
      trail.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      rootRef.current.appendChild(trail);

      let opacity = 0.8;
      let scale = 1;
      const anim = () => {
        opacity -= 0.05;
        scale -= 0.03;
        trail.style.opacity = opacity.toString();
        trail.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        if (opacity > 0) {
          requestAnimationFrame(anim);
        } else {
          trail.remove();
        }
      };
      requestAnimationFrame(anim);
    };

    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
      angleRef.current += 1.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) rotate(${angleRef.current}deg)`;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleOver);
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div id="cursor-root" ref={rootRef}>
      <div
        ref={bracketsRef}
        className={`c-layer c-brackets ${isHovered ? 'hovered' : ''}`}
      >
        <span />
        <span />
        <span />
        <span />
      </div>
      <div
        ref={ringRef}
        className={`c-layer c-ring ${isHovered ? 'hovered' : ''}`}
      />
      <div
        ref={dotRef}
        className={`c-layer c-dot ${isHovered ? 'hovered' : ''}`}
      />
      <div ref={readoutRef} className="c-layer c-readout">
        X {String(coords.x).padStart(4, '0')} Y {String(coords.y).padStart(4, '0')}
        <br />
        <span className={`status ${status === 'LOCKED' ? 'locked' : ''}`}>
          {status}
        </span>
      </div>
      <div ref={lockRef} className="c-layer c-lock" />
    </div>
  );
};
