import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Research', 'Testimonials', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >

            {/* CD Text with Ocean Wave Animation */}
            <div className="relative overflow-hidden">
              <svg
                className="h-12 md:h-16 w-auto"
                viewBox="0 0 120 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Red wave gradient */}
                  <linearGradient id="redWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>

                  {/* Red gradient for fallback */}
                  <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>

                  {/* Clip path for text */}
                  <clipPath id="textClip">
                    <text
                      x="5"
                      y="42"
                      fontSize="40"
                      fontWeight="800"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      CD
                    </text>
                  </clipPath>
                </defs>

                {/* Base text with gradient */}
                <text
                  x="5"
                  y="42"
                  fontSize="40"
                  fontWeight="800"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fill="url(#redGradient)"
                  className="dark:fill-white"
                >
                  CD
                </text>

                {/* Animated ocean waves clipped to text */}
                <g clipPath="url(#textClip)">
                  {/* Wave 1 */}
                  <path
                    d="M-200,35 Q-150,25 -100,35 T0,35 T100,35 T200,35 T300,35 T400,35 L400,60 L-200,60 Z"
                    fill="url(#redWaveGradient)"
                    opacity="0.6"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0,0"
                      to="200,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Wave 2 - slower */}
                  <path
                    d="M-200,40 Q-150,30 -100,40 T0,40 T100,40 T200,40 T300,40 T400,40 L400,60 L-200,60 Z"
                    fill="#ffffff"
                    opacity="0.3"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0,0"
                      to="200,0"
                      dur="4.5s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Wave 3 - opposite direction */}
                  <path
                    d="M-200,32 Q-150,27 -100,32 T0,32 T100,32 T200,32 T300,32 T400,32 L400,60 L-200,60 Z"
                    fill="#dc2626"
                    opacity="0.4"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="200,0"
                      to="-200,0"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>

                {/* Shine effect */}
                <rect
                  x="-100"
                  y="0"
                  width="50"
                  height="60"
                  fill="white"
                  opacity="0.3"
                  transform="skewX(-20)"
                  clipPath="url(#textClip)"
                >
                  <animate
                    attributeName="x"
                    from="-100"
                    to="200"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item)}
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium"
              >
                {item}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-800 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 px-4 text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
