import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Award, FileText, Trophy, ExternalLink, Image as ImageIcon, Calendar, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

/* ─────────────────────────────────────────────
   Lightbox
───────────────────────────────────────────── */
const Lightbox = ({
  items,
  index,
  onClose,
}: {
  items: typeof portfolioData.gallery;
  index: number;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  const item = items[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors duration-200"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {current + 1} / {items.length}
      </div>

      {/* Image area */}
      <div className="relative flex flex-col items-center w-full h-full px-16 py-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={item.image}
            alt={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="max-h-[68vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Caption */}
        <motion.div
          key={`cap-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-5 max-w-2xl text-center px-4"
        >
          <p className="text-white font-bold text-lg mb-1">{item.title}</p>
          <p className="text-white/50 text-xs font-semibold mb-2">{item.date}</p>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{item.description}</p>
        </motion.div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors duration-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
        {items.map((g, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === current ? 'border-red-500 scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={g.image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Gallery Grid — Bento editorial
───────────────────────────────────────────── */
const ACCENTS = [
  'from-red-600/70', 'from-violet-600/70', 'from-blue-600/70',
  'from-amber-500/70', 'from-emerald-600/70', 'from-pink-600/70',
];

const GCard = ({
  item, index, isInView, onClick, className = '', style,
}: {
  item: (typeof portfolioData.gallery)[number];
  index: number; isInView: boolean; onClick: () => void;
  className?: string; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.45, delay: index * 0.045 }}
    whileHover={{ scale: 1.025, zIndex: 10 }}
    className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl hover:shadow-black/40 transition-shadow duration-300 ${className}`}
    style={style}
    onClick={onClick}
  >
    <img src={item.image} alt={item.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
    <div className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[index % ACCENTS.length]} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-400`} />
    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-white/25 transition-all duration-400 pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
      <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 leading-none mb-0.5">{item.date}</p>
      <h4 className="text-white font-bold text-xs leading-snug line-clamp-2">{item.title}</h4>
    </div>
    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
      <ZoomIn size={12} className="text-white" />
    </div>
  </motion.div>
);

const GalleryGrid = ({ isInView }: { isInView: boolean }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = portfolioData.gallery;
  const g0 = items[0], g1 = items[1], g2 = items[2];
  const row2 = items.slice(3, 6);
  const rest = items.slice(6);

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-2.5">

        {/* ── Bento row 1: large left + 2 stacked right ── */}
        <div className="grid grid-cols-3 gap-2.5" style={{ height: 280 }}>
          {g0 && <GCard item={g0} index={0} isInView={isInView} onClick={() => setLightboxIndex(0)} className="col-span-2 h-full" />}
          <div className="flex flex-col gap-2.5">
            {g1 && <GCard item={g1} index={1} isInView={isInView} onClick={() => setLightboxIndex(1)} style={{ height: 129 }} />}
            {g2 && <GCard item={g2} index={2} isInView={isInView} onClick={() => setLightboxIndex(2)} style={{ height: 129 }} />}
          </div>
        </div>

        {/* ── Row 2: 3 equal cols ── */}
        {row2.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5">
            {row2.map((item, i) => (
              <GCard key={i+3} item={item} index={i+3} isInView={isInView}
                onClick={() => setLightboxIndex(i+3)} style={{ height: 155 }} />
            ))}
          </div>
        )}

        {/* ── Row 3+: 4-col compact ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {rest.map((item, i) => (
              <GCard key={i+6} item={item} index={i+6} isInView={isInView}
                onClick={() => setLightboxIndex(i+6)} style={{ height: 125 }} />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 pt-1">
          Click any photo · {items.length} moments captured
        </p>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

/* ─────────────────────────────────────────────
   Main Research section
───────────────────────────────────────────── */
export const Research = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'publications' | 'gallery'>('publications');
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const iconMap = { publication: FileText, award: Award, competition: Trophy };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + (direction === 'left' ? -500 : 500),
        behavior: 'smooth',
      });
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [activeTab]);

  return (
    <section id="research" className="py-20 bg-white dark:bg-black" ref={ref}>
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Research & <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Academic contributions, publications, and event memories
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 gap-1">
            {([
              { id: 'publications', label: 'Publications & Awards', icon: <FileText size={15} /> },
              { id: 'gallery',      label: 'Event Gallery',         icon: <ImageIcon size={15} /> },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id ? 'text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="research-tab-pill"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">{tab.icon}{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'publications' ? (
            <motion.div key="pub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              <div className="relative">
                {showLeftButton && (
                  <button onClick={() => handleScroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {showRightButton && (
                  <button onClick={() => handleScroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />
                <div ref={scrollContainerRef} onScroll={checkScrollButtons} className="overflow-x-auto scrollbar-hide pb-8">
                  <div className="flex gap-6 px-4">
                    {portfolioData.research.map((item, index) => {
                      const Icon = iconMap[item.type as keyof typeof iconMap];
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative flex-shrink-0 w-[380px] md:w-[450px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                          <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 h-full flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              {item.badge && (
                                <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2">{item.title}</h3>
                              <p className="text-red-600 dark:text-red-500 font-semibold text-sm mb-3 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />{item.venue} • {item.date}
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.slice(0, 3).map((tag, ti) => (
                                <span key={ti} className="px-2.5 py-1 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors">{tag}</span>
                              ))}
                              {item.tags.length > 3 && <span className="px-2.5 py-1 text-gray-500 text-xs">+{item.tags.length - 3}</span>}
                            </div>
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold text-sm hover:gap-3 transition-all group/link">
                                <span>View Details</span>
                                <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-600 text-sm mt-4 flex items-center justify-center gap-2">
                  <span className="hidden md:inline">Use arrow buttons or scroll horizontally</span>
                  <span className="md:hidden">Swipe to explore more</span>
                  <span className="text-red-500">→</span>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="gal" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              <GalleryGrid isInView={isInView} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
