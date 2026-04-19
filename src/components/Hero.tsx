import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Sparkles, Code2, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { assetPath } from '../utils/asset';
import { useEffect, useState, useMemo } from 'react';

export const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const controls = useAnimation();

  const roles = useMemo(() => ['Software Engineer', 'Freelancer', 'Entrepreneur', 'AI Developer', '3D Innovator'], []);

  // Loading effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (isLoading) return;

    let currentIndex = 0;
    const currentRole = roles[roleIndex];

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentRole.length) {
        setDisplayedText(currentRole.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [roleIndex, isLoading, roles]);

  useEffect(() => {
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity }
    });
  }, [controls]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = assetPath('/Chanuka-Devin-CV-2026.pdf');
    link.download = 'Chanuka_Devin_CV.pdf';
    link.click();
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <Code2 className="text-red-600 w-16 h-16 mx-auto" strokeWidth={2} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-6 tracking-wider"
            >
              Loading Portfolio
            </motion.h2>

            {/* Linear Progress Bar */}
            <div className="w-80 h-1 bg-gray-800 mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-white to-red-600"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-gray-400 mt-4 font-mono text-sm">{loadingProgress}%</p>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        {/* Animated Video-like Background with Code Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated diagonal stripes */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`stripe-${i}`}
                className="absolute h-full w-1 bg-gradient-to-b from-transparent via-red-900/10 to-transparent"
                style={{
                  left: `${i * 5}%`,
                  transform: 'skewX(-20deg)',
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  x: [-100, 100],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Matrix-style falling code */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`code-${i}`}
                className="absolute text-red-600 font-mono text-xs whitespace-nowrap"
                style={{
                  left: `${(i * 3.5) % 100}%`,
                  top: `-10%`,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                }}
                transition={{
                  duration: Math.random() * 8 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              >
                {'01010101 <code/> function() {} const x = 0; if (true) {}'}
              </motion.div>
            ))}
          </div>

          {/* Geometric grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Red accent glows */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Rotating geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 border border-red-600/20 hidden lg:block"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 border border-white/10 rotate-45 hidden lg:block"
          animate={{
            rotate: 405,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Welcome Badge */}
              <motion.div
                className="mb-8 flex justify-center items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-red-600" size={20} strokeWidth={2} />
                </motion.div>
                <span className="text-gray-500 font-light text-xs uppercase tracking-[0.25em]">
                  Software Engineer
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-red-600 to-transparent" />
              </motion.div>

              {/* Name with linear style */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-none">
                {portfolioData.personal.name.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.05,
                      duration: 0.5,
                    }}
                    className="inline-block text-white hover:text-red-600 transition-colors duration-300 cursor-default"
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>

              {/* Role with typing effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mb-10"
              >
                <div className="flex items-center justify-center gap-2 text-xl md:text-3xl">
                  <span className="text-red-600 font-mono">{'<'}</span>
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-light inline-flex items-center gap-2"
                  >
                    {displayedText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-0.5 h-7 bg-red-600"
                    />
                  </motion.span>
                  <span className="text-red-600 font-mono">{'/>'}</span>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-base md:text-lg mb-12 text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
              >
                {portfolioData.personal.tagline}
              </motion.p>

              {/* CTA Buttons - Linear Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              >
                {/* Primary Red Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="group relative px-8 py-3.5 bg-red-600 text-white font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:bg-red-700"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Talk
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                {/* White Outline Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCV}
                  className="px-8 py-3.5 bg-transparent text-white font-medium text-sm tracking-wide uppercase border-2 border-white hover:border-white transition-all duration-300 flex items-center gap-2"
                >
                  <Download size={16} strokeWidth={2} />
                  Download CV
                </motion.button>

                {/* Black Button with Red Border */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#dc2626",
                    color: "#dc2626",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProjects}
                  className="px-8 py-3.5 bg-black text-white font-medium text-sm tracking-wide uppercase border-2 border-gray-800 transition-all duration-300"
                >
                  View Projects
                </motion.button>
              </motion.div>

              {/* Stats - Linear Layout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-gray-800"
              >
                {[
                  { num: '2+', label: 'Years' },
                  { num: '50+', label: 'Projects' },
                  { num: '10+', label: 'Clients' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + i * 0.2 }}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2"
                      animate={controls}
                    >
                      <span className="text-red-600">{stat.num}</span>
                    </motion.div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-light">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-600 text-xs font-light uppercase tracking-wider">Scroll</span>
            <ChevronDown className="text-red-600" size={24} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
