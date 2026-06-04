import { ChatMessage, Persona } from '../types/ai';

// 生产环境使用安全代理，开发环境直连
const API_URL = import.meta.env.PROD
  ? '/api/ai'  // Vercel Serverless — API Key 安全隐藏
  : 'https://api.deepseek.com/v1/chat/completions';

const API_KEY = import.meta.env.DEV ? (import.meta.env.VITE_DEEPSEEK_API_KEY || '') : '';

interface AIContext {
  name: string;
  level: number;
  streak: number;
  totalWorkouts: number;
  language: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  persona: Persona,
  context: AIContext
): Promise<string> {
  // 生产环境：走安全代理
  if (import.meta.env.PROD) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content,
          })),
          persona: {
            systemPrompt: persona.systemPrompt + `\n用${persona.voiceStyle}的风格回复，50字以内。`,
          },
          context: {
            name: context.name,
            level: context.level,
            streak: context.streak,
          },
        }),
      });

      if (!response.ok) throw new Error(`Proxy error: ${response.status}`);
      const data = await response.json();
      return data.reply || getFallbackResponse(persona, context);
    } catch (error) {
      console.warn('AI proxy failed, using fallback:', error);
      return getFallbackResponse(persona, context);
    }
  }

  // 开发环境：直连 DeepSeek
  const systemPrompt = persona.systemPrompt + `\n\n当前用户信息：\n- 名字：${context.name}\n- 等级：${context.level}\n- 连续训练天数：${context.streak}\n- 累计训练次数：${context.totalWorkouts}\n请根据用户信息，用${persona.voiceStyle}的风格回复。`;

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.warn('DeepSeek API failed, using fallback:', error);
    return getFallbackResponse(persona, context);
  }
}

function getFallbackResponse(persona: Persona, context: AIContext): string {
  const fallbacks: Record<string, string[]> = {
    abyss: [
      `哼，${context.name}，你还知道来找我？${context.streak > 0 ? `连续${context.streak}天？勉强合格。` : '连一天都坚持不了吗？'}去吧，别让我失望。`,
      `啧，又是这副样子。不过...你能坚持${context.totalWorkouts}次也算有进步。休息一下，我在看着你。`,
    ],
    fire: [
      `YEAHHH！${context.name}！！你已经连续${context.streak}天没停了！这股气势，简直燃爆了！！💥🔥`,
      `听好了${context.name}！你已经完成了${context.totalWorkouts}次训练！这不是普通人能做到的！`,
    ],
    moon: [
      `${context.name}，你今天看起来真棒呢~ 已经坚持了${context.streak}天，我为你感到骄傲 🌙`,
      `啊，${context.name}来了呢~ 累计${context.totalWorkouts}次训练，你的努力我都看在眼里哦~`,
    ],
    storm: [
      `哈？${context.name}，就这点程度？${context.streak}天了不起啊？...好吧，确实还行。别得意忘形！`,
      `喂，${context.totalWorkouts}次训练就满足了？还差得远呢！...不过，比上次好了一点点。就一点点！`,
    ],
    sweet: [
      `${context.name}酱~~~ 你好棒！连续${context.streak}天了耶！(≧▽≦) 快让糖心给你一个大大的拥抱！💕`,
      `哇哇哇！${context.name}已经完成了${context.totalWorkouts}次训练！太厉害了吧！💖✨`,
    ],
  };
  const pool = fallbacks[persona.id] || fallbacks.fire;
  return pool[Math.floor(Math.random() * pool.length)];
}
