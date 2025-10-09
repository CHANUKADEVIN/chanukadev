import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Award, FileText, Trophy, ExternalLink, Image as ImageIcon, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Research = () => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeTab, setActiveTab] = useState<'publications' | 'gallery'>('publications');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const iconMap = {
        publication: FileText,
        award: Award,
        competition: Trophy,
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500; // Adjust scroll distance
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
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
        // Initialize scroll buttons on mount
        checkScrollButtons();

        // Add resize listener
        const handleResize = () => checkScrollButtons();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [activeTab]);

    return (
        <section id="research" className="py-20 bg-white dark:bg-black" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Research & <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Achievements</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Academic contributions, publications, and event memories
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex bg-gray-100 dark:bg-gray-900 rounded-2xl p-2 border-2 border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setActiveTab('publications')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'publications'
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            Publications & Awards
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'gallery'
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <ImageIcon className="w-5 h-5" />
                            Event Gallery
                        </button>
                    </div>
                </motion.div>

                {/* Publications Tab - Horizontal Scroll */}
                {activeTab === 'publications' && (
                    <div className="relative">
                        {/* Left Scroll Button */}
                        {showLeftButton && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onClick={() => handleScroll('left')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                        )}

                        {/* Right Scroll Button */}
                        {showRightButton && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={() => handleScroll('right')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        )}

                        {/* Gradient Overlays */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

                        {/* Scrolling Container */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={checkScrollButtons}
                            className="overflow-x-auto scrollbar-hide pb-8"
                        >
                            <motion.div
                                className="flex gap-6 px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
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
                                                {/* Header with Icon and Badge */}
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

                                                {/* Content */}
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-red-600 dark:text-red-500 font-semibold text-sm mb-3 flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {item.venue} • {item.date}
                                                    </p>
                                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="px-2.5 py-1 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {item.tags.length > 3 && (
                                                        <span className="px-2.5 py-1 text-gray-500 dark:text-gray-500 text-xs">
                                                            +{item.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Link */}
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold text-sm hover:gap-3 transition-all group/link"
                                                    >
                                                        <span>View Details</span>
                                                        <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Scroll Hint */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-center text-gray-500 dark:text-gray-600 text-sm mt-4 flex items-center justify-center gap-2"
                        >
                            <span className="hidden md:inline">Use arrow buttons or scroll horizontally</span>
                            <span className="md:hidden">Swipe to explore more</span>
                            <span className="text-red-500">→</span>
                        </motion.p>
                    </div>
                )}

                {/* Gallery Tab - Masonry Layout */}
                {activeTab === 'gallery' && (
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {portfolioData.gallery.map((item, index) => {
                                // Alternate heights for masonry effect
                                const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-72', 'h-80', 'h-96', 'h-64'];
                                const heightClass = heights[index % heights.length];

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 cursor-pointer break-inside-avoid mb-6"
                                        onClick={() => setSelectedImage(item.image)}
                                    >
                                        {/* Image */}
                                        <div className={`${heightClass} overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 relative`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        </div>

                                        {/* Info Overlay - Always visible at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                                            <div className="flex items-center gap-2 text-red-400 text-xs mb-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="font-semibold">{item.date}</span>
                                            </div>
                                            <h3 className="text-white font-bold text-base mb-1.5 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Hover Zoom Icon */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                            <ImageIcon className="w-5 h-5 text-white" />
                                        </div>

                                        {/* Subtle border glow on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.3)]" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-full object-contain rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};
