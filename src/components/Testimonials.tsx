import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Quote, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimationControls();
    const [cardWidth, setCardWidth] = useState(400);

    // Duplicate testimonials for infinite scroll effect
    const testimonials = [...portfolioData.testimonials, ...portfolioData.testimonials];

    useEffect(() => {
        const updateCardWidth = () => {
            if (window.innerWidth < 768) {
                setCardWidth(Math.min(window.innerWidth - 80, 400));
            } else if (window.innerWidth < 1024) {
                setCardWidth(Math.min((window.innerWidth - 100) / 2, 400));
            } else {
                setCardWidth(Math.min((window.innerWidth - 150) / 3, 400));
            }
        };

        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);
        return () => window.removeEventListener('resize', updateCardWidth);
    }, []);

    useEffect(() => {
        if (isInView) {
            const gap = window.innerWidth < 768 ? 16 : 24;
            const totalWidth = (testimonials.length / 2) * (cardWidth + gap);

            controls.start({
                x: [0, -totalWidth],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 50,
                        ease: "linear",
                    },
                },
            });
        }
    }, [isInView, controls, testimonials.length, cardWidth]);

    const handleMouseEnter = () => {
        controls.stop();
    };

    const handleMouseLeave = () => {
        const gap = window.innerWidth < 768 ? 16 : 24;
        const totalWidth = (testimonials.length / 2) * (cardWidth + gap);

        controls.start({
            x: [0, -totalWidth],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                },
            },
        });
    };

    return (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-black overflow-hidden" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        What People <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Say</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Testimonials from colleagues, mentors, and clients
                    </p>
                </motion.div>

                {/* Infinite Scroll Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Gradient Overlays for smooth fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Testimonials Wrapper */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-4 md:gap-6"
                            animate={controls}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="group relative flex-shrink-0"
                                    style={{ width: `${cardWidth}px` }}
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                                    <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 h-full flex flex-col">
                                        {/* Quote Icon */}
                                        <div className="mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Quote className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-grow italic text-sm">
                                            "{testimonial.text}"
                                        </p>

                                        {/* Author Info */}
                                        <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-200 dark:border-gray-800">
                                            <div className="flex-shrink-0">
                                                {testimonial.image ? (
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-red-500 dark:border-red-600"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-red-500 dark:border-red-600">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-grow min-w-0">
                                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors text-sm truncate">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                    {testimonial.role}
                                                </p>
                                                <p className="text-xs text-red-600 dark:text-red-500 font-semibold truncate">
                                                    {testimonial.company}
                                                </p>
                                            </div>

                                            {/* LinkedIn Icon */}
                                            {testimonial.linkedin && (
                                                <a
                                                    href={testimonial.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Pause on Hover Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center text-gray-500 dark:text-gray-600 text-sm mt-8"
                >
                    Hover to pause • Auto-scrolling testimonials
                </motion.p>
            </div>
        </section>
    );
};
