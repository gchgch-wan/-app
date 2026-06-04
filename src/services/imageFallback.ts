// 国内可用图片占位生成器 — 不依赖任何外部CDN

const GRADIENTS = [
  ['#6c5ce7', '#a855f7'],
  ['#00f0ff', '#3b82f6'],
  ['#ff6b35', '#ff00e5'],
  ['#00ff88', '#00c48c'],
  ['#f59e0b', '#ef4444'],
  ['#8b5cf6', '#ec4899'],
  ['#06b6d4', '#3b82f6'],
  ['#84cc16', '#22c55e'],
];

// 生成教练头像 SVG Data URI
export function coachAvatar(name: string, index: number): string {
  const [c1, c2] = GRADIENTS[index % GRADIENTS.length];
  const initial = name.charAt(0).toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/>
  </linearGradient></defs>
  <rect width="200" height="200" fill="url(#g)" rx="20"/>
  <text x="100" y="115" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white" opacity="0.9">${escapeXml(initial)}</text>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// 生成训练图片占位 SVG
export function workoutPlaceholder(category: string): string {
  const map: Record<string, [string, string, string]> = {
    hiit: ['#ff4d2e', '#ff6b4a', '🔥'],
    yoga: ['#7c5cfc', '#a78bfa', '🧘'],
    strength: ['#ff6b35', '#ff8c5a', '🏋️'],
    cardio: ['#00c48c', '#34d399', '🏃'],
    dance: ['#ff4081', '#ff6b9d', '💃'],
    stretch: ['#00e5ff', '#00f0ff', '😌'],
  };
  const [c1, c2, icon] = map[category] || ['#6c5ce7', '#a855f7', '💪'];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/>
  </linearGradient></defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <text x="300" y="220" text-anchor="middle" font-size="100">${icon}</text>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// 蜕变照片占位
export function transformPlaceholder(name: string, index: number): string {
  const [c1, c2] = GRADIENTS[(index + 3) % GRADIENTS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/>
  </linearGradient></defs>
  <rect width="500" height="600" fill="url(#g)"/>
  <text x="250" y="240" text-anchor="middle" font-size="120">💪</text>
  <text x="250" y="340" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold" fill="white">${escapeXml(name)}</text>
  <text x="250" y="400" text-anchor="middle" font-family="Arial" font-size="28" fill="white" opacity="0.6">Before → After</text>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
