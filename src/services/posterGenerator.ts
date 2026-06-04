// 视频封面生成器 — 生成精美SVG封面图
// 每个分类不同配色，带图标和文字

const PALETTES: Record<string, { bg1: string; bg2: string; accent: string }> = {
  hiit:     { bg1: '#ff4d2e', bg2: '#1a0510', accent: '#ff6b4a' },
  yoga:     { bg1: '#7c5cfc', bg2: '#0a0a1a', accent: '#a78bfa' },
  strength: { bg1: '#ff6b35', bg2: '#1a0d00', accent: '#ff8c5a' },
  cardio:   { bg1: '#00c48c', bg2: '#001a10', accent: '#34d399' },
  abs:      { bg1: '#e040fb', bg2: '#12001a', accent: '#ea80fc' },
  fullbody: { bg1: '#448aff', bg2: '#000a1a', accent: '#5c9cff' },
  stretch:  { bg1: '#00e5ff', bg2: '#001a1f', accent: '#00f0ff' },
  dance:    { bg1: '#ff4081', bg2: '#1a0010', accent: '#ff6b9d' },
  pilates:  { bg1: '#69f0ae', bg2: '#001a0d', accent: '#8cf5c2' },
};

const ICONS: Record<string, string> = {
  hiit: '🔥', yoga: '🧘', strength: '🏋️', cardio: '🏃',
  abs: '💪', fullbody: '🏋️', stretch: '🧘', dance: '💃', pilates: '🤸',
};

export function generatePoster(
  title: string,
  category: string,
  duration: number,
  difficulty: string,
): string {
  const palette = PALETTES[category] || PALETTES.hiit;
  const icon = ICONS[category] || '🎬';
  const diffLabel = difficulty === 'beginner' ? '入门' : difficulty === 'intermediate' ? '进阶' : '高级';
  const diffColor = difficulty === 'beginner' ? '#4ade80' : difficulty === 'intermediate' ? '#facc15' : '#f87171';

  // 截断标题
  const shortTitle = title.length > 12 ? title.slice(0, 12) + '...' : title;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.bg1};stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${palette.bg2};stop-opacity:1"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <!-- 背景 -->
  <rect width="640" height="360" fill="url(#bg)" rx="12"/>
  <!-- 装饰圆 -->
  <circle cx="500" cy="100" r="180" fill="${palette.accent}" opacity="0.15"/>
  <circle cx="150" cy="280" r="120" fill="${palette.accent}" opacity="0.1"/>
  <circle cx="580" cy="300" r="80" fill="${palette.accent}" opacity="0.08"/>
  <!-- 中央图标 -->
  <text x="320" y="160" text-anchor="middle" font-size="80" filter="url(#glow)">${icon}</text>
  <!-- 播放按钮 -->
  <circle cx="320" cy="150" r="36" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <polygon points="312,132 312,168 338,150" fill="white" opacity="0.9"/>
  <!-- 标题 -->
  <text x="320" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="white" filter="url(#shadow)">${escapeXml(shortTitle)}</text>
  <!-- 底部信息栏 -->
  <rect x="20" y="295" width="600" height="45" rx="8" fill="rgba(0,0,0,0.4)"/>
  <text x="40" y="324" font-family="Arial,sans-serif" font-size="14" fill="${palette.accent}" font-weight="bold">${duration}min</text>
  <text x="160" y="324" font-family="Arial,sans-serif" font-size="14" fill="${diffColor}">${diffLabel}</text>
  <text x="560" y="324" text-anchor="end" font-family="Arial,sans-serif" font-size="14" fill="white" opacity="0.8">NebulaFit</text>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
