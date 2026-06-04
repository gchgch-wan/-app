// ============================================================
// Vercel Serverless Function — AI API 安全代理
// 隐藏 API Key，添加速率限制，输入验证
// ============================================================
import type { VercelRequest, VercelResponse } from '@vercel/node';

// 速率限制（简单内存版，生产环境应使用 Redis）
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 30;    // 每IP每分钟最多30次
const RATE_WINDOW = 60000; // 1分钟窗口

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// 输入净化：防止注入
function sanitizeInput(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[`$()|\&\;]/g, '')
    .slice(0, 1000); // 最大1000字符
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — 只允许自己的域名
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://nebulafit.vercel.app',
    'https://www.nebulafit.cn',
    'http://localhost:5173',
    'http://localhost:4173',
  ];

  if (origin && !allowedOrigins.includes(origin) && !origin.endsWith('.vercel.app')) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  // OPTIONS 预检
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // 速率限制
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: '请求太频繁，请稍后再试', retryAfter: 60 });
    return;
  }

  // 输入验证
  const { messages, persona, context } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  // 净化所有消息内容
  const cleanMessages = messages.slice(-10).map((m: any) => ({
    role: m.role === 'user' || m.role === 'assistant' ? m.role : 'user',
    content: sanitizeInput(String(m.content || '')),
  }));

  const systemPrompt = persona?.systemPrompt
    ? sanitizeInput(String(persona.systemPrompt))
    : '你是一个健身教练AI助手';

  const userContext = context
    ? `\n用户信息：等级${context.level || 0}，连续训练${context.streak || 0}天`
    : '';

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt + userContext },
          ...cleanMessages,
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('DeepSeek API error:', response.status, errText);
      res.status(502).json({ error: 'AI服务暂时不可用' });
      return;
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || '抱歉，我现在无法回答。';

    res.status(200).json({ reply });
  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(502).json({ error: 'AI服务暂时不可用' });
  }
}
