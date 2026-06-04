export const colors = {
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
    orange: '#ff6b35',
  },
  accent: {
    primary: '#6c5ce7',
    secondary: '#a855f7',
    glow: '#00f0ff',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0c0',
    muted: '#606080',
  },
} as const;

export const gradients = {
  hero: 'radial-gradient(ellipse at center, #1a1a4e 0%, #0a0a1a 70%)',
  card: 'linear-gradient(135deg, rgba(109,92,231,0.1) 0%, rgba(0,240,255,0.05) 100%)',
  glow: 'linear-gradient(135deg, #00f0ff, #8b5cf6, #ff00e5)',
  text: 'linear-gradient(135deg, #00f0ff, #a855f7)',
} as const;

export const shadows = {
  'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)',
  'neon-pink': '0 0 15px rgba(255, 0, 229, 0.3), 0 0 30px rgba(255, 0, 229, 0.1)',
  card: '0 4px 30px rgba(0, 0, 0, 0.4)',
  glow: '0 0 40px rgba(0, 240, 255, 0.15)',
} as const;
