import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { X, Calendar, Tag, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { assetPath } from '../utils/asset';
import { SectionHeader } from './ui/SectionHeader';

/* ─── Types ───────────────────────────────────────────── */
type FilterTag = 'ALL' | 'HACKATHONS' | 'MILESTONES' | 'SPEAKING';

interface GalleryItem {
  title: string;
  description: string;
  date: string;
  image: string;
  tag: FilterTag;
  metric?: string;
  location?: string;
  coords?: string;
}

/* ─── Data ─────────────────────────────────────────────── */
const GALLERY_ITEMS: GalleryItem[] = [
  { title: 'Code & Conquer Hackathon 2024 — Team Collaboration', description: portfolioData.gallery[0].description, date: 'January 2025', image: assetPath('/events/slass.jpeg'), tag: 'HACKATHONS', metric: 'Top 10 Teams', location: 'Sri Lanka', coords: 'COL · LK' },
  { title: 'Code & Conquer Hackathon — Networking & Learning', description: portfolioData.gallery[1].description, date: 'January 2025', image: assetPath('/events/slass2.jpeg'), tag: 'HACKATHONS', metric: 'SLASSCOM × LSEG', location: 'Colombo', coords: 'COL · LK' },
  { title: 'Code & Conquer — Innovation in Action', description: portfolioData.gallery[2].description, date: 'January 2025', image: assetPath('/events/slass3.jpeg'), tag: 'HACKATHONS', metric: 'Team Build', location: 'Colombo', coords: 'COL · LK' },
  { title: 'Research Presentation — Prof. Anuradha Jayakodi', description: portfolioData.gallery[3].description, date: '2025', image: assetPath('/events/research1.jpeg'), tag: 'MILESTONES', metric: 'Published Research', location: 'SLIIT', coords: 'SLIIT · LK' },
  { title: 'InnovateX Grand Finale Preparation', description: portfolioData.gallery[4].description, date: 'January 2025', image: assetPath('/events/inovtex.jpg'), tag: 'MILESTONES', metric: 'Grand Finalist', location: 'Sri Lanka', coords: 'COL · LK' },
  { title: 'Mastering the Startup Journey — IITM Pravartak', description: portfolioData.gallery[5].description, date: '2026', image: assetPath('/events/final iitm.jpg'), tag: 'MILESTONES', metric: 'Certificate · Govt. of India', location: 'Chennai, India', coords: 'CHN · IN' },
  { title: 'IITM Pravartak — Certificate of Completion', description: portfolioData.gallery[6].description, date: '2026', image: assetPath('/events/IITM certificate.jpeg'), tag: 'MILESTONES', metric: 'Top 25 Startups', location: 'Chennai, India', coords: 'CHN · IN' },
  { title: 'Session with Prof. Gaurav Raina — AI-OS @ IIT Madras', description: portfolioData.gallery[7].description, date: '2026', image: assetPath('/events/rayna.jpg'), tag: 'SPEAKING', metric: 'AI Systems Talk', location: 'IIT Madras', coords: 'IIT-M · IN' },
  { title: 'Mentoring Session — Abhisekh Bohra · Startup Strategy', description: portfolioData.gallery[8].description, date: '2026', image: assetPath('/events/abishek.jpeg'), tag: 'SPEAKING', metric: 'Hyperscale Mentoring', location: 'IIT Madras', coords: 'IIT-M · IN' },
  { title: 'Week 1 at IIT Madras — People & Perspectives', description: portfolioData.gallery[9].description, date: '2026', image: assetPath('/events/wikram.jpeg'), tag: 'SPEAKING', metric: 'First 25 Startups', location: 'Chennai, India', coords: 'CHN · IN' },
  { title: 'ICAC 2025 — Research Paper Presentation', description: portfolioData.gallery[10].description, date: '2025', image: assetPath('/events/icac (1).jpeg'), tag: 'MILESTONES', metric: "Int'l Conference", location: 'ICAC 2025', coords: 'INTL · 2025' },
  { title: 'ICAC 2025 — AI-Driven 3D Avatar for Sign Language', description: portfolioData.gallery[11].description, date: '2025', image: assetPath('/events/icac (2).jpeg'), tag: 'MILESTONES', metric: 'Published Paper', location: 'ICAC 2025', coords: 'INTL · 2025' },
  { title: 'ICAC 2025 — Team & Research Milestone', description: portfolioData.gallery[12].description, date: '2025', image: assetPath('/events/icac (3).jpeg'), tag: 'MILESTONES', metric: 'Team Collab', location: 'ICAC 2025', coords: 'INTL · 2025' },
];

const FILTERS: { key: FilterTag; label: string; color: string }[] = [
  { key: 'ALL', label: 'ALL', color: '#e8e8f0' },
  { key: 'HACKATHONS', label: 'HACKATHONS', color: '#ccff00' },
  { key: 'MILESTONES', label: 'MILESTONES', color: '#00f0ff' },
  { key: 'SPEAKING', label: 'SPEAKING / COMMUNITY', color: '#a78bfa' },
];

const tagColor = (tag: FilterTag): string => {
  if (tag === 'HACKATHONS') return '#ccff00';
  if (tag === 'SPEAKING') return '#a78bfa';
  return '#00f0ff';
};

/* ─── Gallery Card ──────────────────────────────────────── */
const GalleryCard = ({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(-10);

  const startScan = () => {
    let y = -10;
    const id = setInterval(() => { y += 2; if (y > 110) clearInterval(id); setScanY(y); }, 16);
  };

  const color = tagColor(item.tag);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer overflow-hidden group"
      style={{ width: 'min(320px, 80vw)', height: '420px', border: `1px solid ${hovered ? color + '50' : 'rgba(26,26,36,0.8)'}`, background: 'rgba(22,24,29,0.7)', transition: 'border-color 0.3s ease' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); startScan(); }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img src={item.image} alt={item.title} className="w-full h-full object-cover"
          animate={{ filter: hovered ? 'contrast(1.1) saturate(0.9) brightness(0.75)' : 'contrast(1.0) saturate(0.6) brightness(0.6)', scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />

        {hovered && (
          <div className="absolute left-0 right-0 h-10 pointer-events-none" style={{ top: `${scanY}%`, background: `linear-gradient(180deg, transparent, ${color}18, ${color}08, transparent)`, transition: 'none' }} />
        )}

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)' }} />

        <div className="absolute top-2 left-2 w-5 h-5 border-t border-l pointer-events-none" style={{ borderColor: color, opacity: hovered ? 0.9 : 0.3, transition: 'opacity 0.3s' }} />
        <div className="absolute top-2 right-2 w-5 h-5 border-t border-r pointer-events-none" style={{ borderColor: color, opacity: hovered ? 0.9 : 0.3, transition: 'opacity 0.3s' }} />

        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <span className="font-mono text-xs px-2 py-0.5" style={{ background: `${color}20`, border: `1px solid ${color}50`, color, backdropFilter: 'blur(4px)' }}>
            {item.tag}
          </span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 p-3 font-mono" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95), transparent)' }}>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1" style={{ color }}><Calendar size={9} /> YEAR: {item.date}</span>
                {item.coords && <span className="flex items-center gap-1 text-dim-gray"><MapPin size={9} /> {item.coords}</span>}
                {item.metric && <span className="flex items-center gap-1 text-cyber-cyan"><Tag size={9} /> {item.metric}</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        <h3 className="font-display text-sm font-bold text-ghost-white leading-snug mb-2 line-clamp-2">{item.title}</h3>
        <p className="font-body text-xs text-dim-gray leading-relaxed line-clamp-3 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-dim-gray">{item.date}</span>
          <span className="font-mono text-xs flex items-center gap-1" style={{ color }}>VIEW <ExternalLink size={9} /></span>
        </div>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: color }}
        animate={{ opacity: hovered ? 1 : 0, boxShadow: hovered ? `0 0 8px ${color}` : 'none' }} transition={{ duration: 0.3 }} />
    </motion.div>
  );
};

/* ─── Full-Screen Lightbox ──────────────────────────────── */
const Lightbox = ({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [zoomed, setZoomed] = useState(false);
  const color = tagColor(item.tag);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'z' || e.key === 'Z') setZoomed((z) => !z);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Reset zoom when item changes
  useEffect(() => { setZoomed(false); }, [item]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(4,4,8,0.97)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${color}25`, background: 'rgba(8,8,14,0.9)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tag + counter */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs px-2 py-0.5 border" style={{ borderColor: `${color}50`, color, background: `${color}10` }}>
            #{item.tag}
          </span>
          <span className="font-mono text-xs text-dim-gray">
            <span style={{ color }}>{index + 1}</span>
            <span className="opacity-40"> / {total}</span>
          </span>
        </div>

        {/* Keyboard hints */}
        <span className="font-mono text-xs text-dim-gray hidden md:flex items-center gap-3">
          <span><span className="text-neon-volt">←→</span> navigate</span>
          <span className="text-grid-line">·</span>
          <span><span className="text-neon-volt">Z</span> zoom</span>
          <span className="text-grid-line">·</span>
          <span><span className="text-neon-volt">ESC</span> close</span>
        </span>

        {/* Close button */}
        <button
          id="lightbox-close"
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center border border-dim-gray/40 text-dim-gray hover:text-ghost-white hover:border-ghost-white/60 transition-all duration-200"
          style={{ background: 'rgba(22,24,29,0.6)' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Full image area ── */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0 px-16 py-6"
        onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
        style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in', overflow: zoomed ? 'auto' : 'hidden' }}
      >
        {/* Prev arrow */}
        <button
          id="lightbox-prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 z-10 w-11 h-11 flex items-center justify-center border text-dim-gray hover:text-ghost-white hover:border-ghost-white/50 transition-all duration-200"
          style={{ borderColor: 'rgba(74,74,90,0.4)', background: 'rgba(8,8,14,0.7)', backdropFilter: 'blur(8px)' }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next arrow */}
        <button
          id="lightbox-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 z-10 w-11 h-11 flex items-center justify-center border text-dim-gray hover:text-ghost-white hover:border-ghost-white/50 transition-all duration-200"
          style={{ borderColor: 'rgba(74,74,90,0.4)', background: 'rgba(8,8,14,0.7)', backdropFilter: 'blur(8px)' }}
        >
          <ChevronRight size={22} />
        </button>

        {/* ── The image — CLEAN, NO FILTERS, full-size ── */}
        <AnimatePresence mode="wait">
          <motion.img
            key={item.image}
            src={item.image}
            alt={item.title}
            draggable={false}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoomed ? 1.7 : 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="select-none"
            style={{
              maxHeight: 'calc(100vh - 168px)',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              // No filter — clean, natural image
              boxShadow: `0 0 80px rgba(0,0,0,0.8), 0 0 2px ${color}30`,
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
          />
        </AnimatePresence>

        {/* Subtle HUD corner brackets framing the viewport */}
        <div className="absolute top-6 left-16 w-8 h-8 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: `${color}40` }} />
        <div className="absolute top-6 right-16 w-8 h-8 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: `${color}40` }} />
        <div className="absolute bottom-6 left-16 w-8 h-8 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: 'rgba(0,240,255,0.3)' }} />
        <div className="absolute bottom-6 right-16 w-8 h-8 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: 'rgba(0,240,255,0.3)' }} />

        {/* Zoom indicator */}
        {zoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs pointer-events-none"
            style={{ color, textShadow: `0 0 8px ${color}` }}>
            ZOOMED · click to reset
          </motion.div>
        )}
      </div>

      {/* ── Bottom info drawer ── */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ borderTop: `1px solid ${color}20`, background: 'rgba(8,8,14,0.9)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Text info */}
          <div className="flex-1 min-w-0">
            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 mb-1.5 font-mono text-xs">
              <span className="flex items-center gap-1" style={{ color }}>
                <Calendar size={10} /> {item.date}
              </span>
              {item.location && (
                <span className="flex items-center gap-1 text-dim-gray">
                  <MapPin size={10} /> {item.location}
                </span>
              )}
              {item.metric && (
                <span className="flex items-center gap-1 text-cyber-cyan">
                  <Tag size={10} /> {item.metric}
                </span>
              )}
            </div>
            <h2 className="font-display text-sm font-bold text-ghost-white leading-snug mb-0.5 truncate">{item.title}</h2>
            <p className="font-body text-xs text-dim-gray leading-relaxed line-clamp-2">{item.description}</p>
          </div>

          {/* Dot navigation indicators */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {Array.from({ length: Math.min(total, 15) }, (_, i) => (
              <div key={i} className="rounded-full transition-all duration-200"
                style={{
                  width: i === index ? '20px' : '6px',
                  height: '6px',
                  background: i === index ? color : 'rgba(74,74,90,0.4)',
                  boxShadow: i === index ? `0 0 8px ${color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Journey Gallery ───────────────────────────────────── */
export const JourneyGallery = () => {
  const [filter, setFilter] = useState<FilterTag>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const filtered = filter === 'ALL' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.tag === filter);
  const filterColor = FILTERS.find((f) => f.key === filter)?.color ?? '#e8e8f0';

  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextItem = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  const dragWidth = filtered.length * (320 + 24) - (typeof window !== 'undefined' ? window.innerWidth : 1200) + 128;

  return (
    <section id="gallery" className="py-32 overflow-hidden" style={{ background: 'rgba(8,8,16,1)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <SectionHeader
          index="07"
          title="MEMORY LOG"
          subtitle="Journey archives — hackathons, milestones, speaking engagements & community moments."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map(({ key, label, color }) => {
            const isActive = filter === key;
            return (
              <button key={key} id={`gallery-filter-${key}`}
                onClick={() => setFilter(key)}
                className="font-mono text-xs px-5 py-2 border tracking-widest transition-all duration-300"
                style={{ borderColor: isActive ? color : 'rgba(26,26,36,0.8)', color: isActive ? color : '#4a4a5a', background: isActive ? `${color}10` : 'transparent', boxShadow: isActive ? `0 0 16px ${color}25` : 'none' }}>
                {isActive && (
                  <motion.span layoutId="filter-dot" className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: color }} />
                )}
                {label}
                <span className="ml-2 opacity-40">
                  {key === 'ALL' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.tag === key).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Draggable carousel */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-16 pr-24"
            drag="x"
            dragConstraints={{ left: -Math.max(dragWidth, 0), right: 0 }}
            style={{ x }}
            dragElastic={0.08}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {filtered.map((item, i) => (
              <GalleryCard key={`${item.title}-${i}`} item={item} index={i} onClick={() => setLightboxIndex(i)} />
            ))}

            <div className="flex-shrink-0 w-48 h-[420px] flex flex-col items-center justify-center border border-dashed border-grid-line text-center px-4" style={{ opacity: 0.4 }}>
              <div className="font-mono text-xs text-dim-gray mb-2">END OF LOG</div>
              <div className="font-mono text-xs text-neon-volt">{filtered.length} entries</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(8,8,16,1), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(270deg, rgba(8,8,16,1), transparent)' }} />
      </div>

      {/* Drag hint */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-8 flex items-center gap-4 font-mono text-xs text-dim-gray">
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>←</motion.span>
        <span>DRAG TO EXPLORE</span>
        <div className="h-px flex-1 bg-grid-line" />
        <span style={{ color: filterColor }}>{filtered.length} MEMORIES</span>
        <motion.span animate={{ x: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            index={lightboxIndex}
            total={filtered.length}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
