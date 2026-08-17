/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0f',
        carbon: '#16181d',
        'carbon-light': '#1e2028',
        'neon-volt': '#ccff00',
        'cyber-cyan': '#00f0ff',
        'ghost-white': '#e8e8f0',
        'dim-gray': '#4a4a5a',
        'grid-line': '#1a1a24',
        'muted': '#2a2a38',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-obsidian': `
          linear-gradient(rgba(26,26,36,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,26,36,0.8) 1px, transparent 1px)
        `,
        'grid-cyber': `
          linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)
        `,
        'neon-gradient': 'linear-gradient(135deg, #ccff00, #00f0ff)',
        'obsidian-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '80px 80px',
        'grid-lg': '120px 120px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'data-stream': 'dataStream 3s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(204,255,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(204,255,0,0.6), 0 0 80px rgba(204,255,0,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dataStream: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'neon-volt': '0 0 20px rgba(204,255,0,0.4), 0 0 60px rgba(204,255,0,0.15)',
        'cyber-cyan': '0 0 20px rgba(0,240,255,0.4), 0 0 60px rgba(0,240,255,0.15)',
        'carbon': '0 4px 24px rgba(0,0,0,0.6)',
        'carbon-lg': '0 8px 48px rgba(0,0,0,0.8)',
        'inset-neon': 'inset 0 1px 0 rgba(204,255,0,0.15)',
      },
      dropShadow: {
        'neon-volt': '0 0 12px rgba(204,255,0,0.8)',
        'cyber-cyan': '0 0 12px rgba(0,240,255,0.8)',
      },
      borderColor: {
        'neon-volt': 'rgba(204,255,0,0.4)',
        'cyber-cyan': 'rgba(0,240,255,0.3)',
        'grid': 'rgba(26,26,36,0.8)',
      },
      blur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
