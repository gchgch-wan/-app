export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: {
          base: '#0a0a1a',
          card: '#0d0d26',
          elevated: '#12122e',
          border: '#1a1a3e',
        },
        neon: {
          cyan: '#00f0ff',
          pink: '#ff00e5',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          green: '#00ff88',
        },
        accent: {
          primary: '#6c5ce7',
          secondary: '#a855f7',
          glow: '#00f0ff',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at center, #1a1a4e 0%, #0a0a1a 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(109, 92, 231, 0.1) 0%, rgba(0, 240, 255, 0.05) 100%)',
        'glow-gradient': 'linear-gradient(135deg, #00f0ff, #8b5cf6, #ff00e5)',
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)',
        'neon-pink': '0 0 15px rgba(255, 0, 229, 0.3), 0 0 30px rgba(255, 0, 229, 0.1)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 40px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'particle': 'particle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        particle: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-30px) scale(1.5)', opacity: '0.2' },
        },
      },
    },
  },
  plugins: [],
};
