import { PersonaId } from '../types/ai';

// ============================================================
// Pollinations.ai TTS — 免费 OpenAI 级别神经网络语音
// 引擎: OpenAI TTS (alloy/echo/fable/nova/onyx/shimmer)
// 支持: 中文/English/日本語 多语言
// 零成本, 零配置, 纯 HTTP
// ============================================================

const TTS_BASE = 'https://text.pollinations.ai';

// ---- 5种人设 → OpenAI 声线映射 ----
export interface VoiceProfile {
  personaId: PersonaId;
  voice: string;    // OpenAI voice name
  rate: number;      // 播放速度 (0.5-2.0)
  description: string;
}

export const VOICE_PROFILES: VoiceProfile[] = [
  {
    personaId: 'abyss',
    voice: 'onyx',        // 深沉的男声，权威感
    rate: 0.85,
    description: '秦彻 — 低沉磁性霸总',
  },
  {
    personaId: 'fire',
    voice: 'echo',        // 有力的男声，充满能量
    rate: 1.15,
    description: '炽阳 — 热血高能教练',
  },
  {
    personaId: 'moon',
    voice: 'nova',        // 温柔的女声，治愈系
    rate: 0.92,
    description: '月白 — 温柔治愈陪练',
  },
  {
    personaId: 'storm',
    voice: 'fable',       // 英伦口音，犀利独特
    rate: 1.25,
    description: '凌风 — 毒舌犀利傲娇',
  },
  {
    personaId: 'sweet',
    voice: 'shimmer',     // 明亮的女声，甜美活泼
    rate: 1.05,
    description: '糖心 — 元气甜心可爱',
  },
];

// ---- 文本预处理（加感情色彩）----
function preprocessText(text: string, personaId: PersonaId, lang: string): string {
  let t = text.replace(/[*#>`\-_~]/g, '').trim();
  if (!t) return t;

  // 为不同人格添加语气色彩
  if (lang === 'zh-CN') {
    switch (personaId) {
      case 'sweet': t = t.replace(/([。！])$/g, '呢$1'); break;
      case 'fire': t = t.replace(/[。]$/, '啊！加油！'); break;
      case 'abyss': if (t.length < 60) t += ' …哼。'; break;
      case 'storm': if (!t.startsWith('啧')) t = '啧… ' + t; break;
      default: break;
    }
  } else if (lang === 'ja') {
    switch (personaId) {
      case 'sweet': t = t.replace(/([。])$/g, 'だよ〜♪'); break;
      case 'fire': t = t.replace(/[。]$/, 'だ！頑張れ！'); break;
      default: break;
    }
  }

  return t;
}

// ---- 音频缓存 ----
const audioCache = new Map<string, string>(); // cacheKey -> blob URL

function cacheKey(text: string, voice: string): string {
  return `${voice}:${text.slice(0, 100)}`;
}

// ---- 主入口：调用 Pollinations API ----
export async function speakText(
  text: string,
  lang: string,
  profile: VoiceProfile,
  onEnd?: () => void
): Promise<void> {
  const processed = preprocessText(text, profile.personaId, lang);
  if (!processed) return;

  // 停止之前的语音
  speechSynthesis.cancel();

  const key = cacheKey(processed, profile.voice);

  try {
    let audioUrl: string;

    if (audioCache.has(key)) {
      audioUrl = audioCache.get(key)!;
    } else {
      // Pollinations TTS API
      // 限制文本长度避免 URL 过长
      const textToSpeak = processed.length > 400 ? processed.slice(0, 400) : processed;
      audioUrl = `${TTS_BASE}/${encodeURIComponent(textToSpeak)}?model=openai-audio&voice=${profile.voice}`;

      // 预检查可用性（可选，缓存用）
      audioCache.set(key, audioUrl);
    }

    const audio = new Audio(audioUrl);
    audio.playbackRate = profile.rate;

    if (onEnd) {
      audio.onended = () => {
        onEnd();
        // 清理旧的缓存 URL
      };
    }

    await audio.play();
  } catch {
    // Pollinations 失败 → 回退到浏览器 TTS
    fallbackToBrowserTTS(processed, lang, profile, onEnd);
  }
}

// ---- 浏览器 TTS 回退 ----
let cachedVoices: SpeechSynthesisVoice[] = [];
const voiceCache: Record<string, SpeechSynthesisVoice | null> = {};

export function preloadVoices(): Promise<void> {
  return new Promise((resolve) => {
    const load = () => {
      cachedVoices = speechSynthesis.getVoices();
      if (cachedVoices.length > 0) { voiceCacheZh = null; resolve(); }
    };
    load();
    speechSynthesis.onvoiceschanged = () => { load(); resolve(); };
  });
}
let voiceCacheZh: any = null;

const RANK: Record<string, string[]> = {
  'zh-CN': ['Xiaoxiao', 'Yunyang', 'Yunxi', 'Xiaoyi', 'Tingting', 'Yaoyao', 'Huihui', 'Meijia'],
  en: ['Jenny', 'Aria', 'Guy', 'Samantha', 'Karen', 'Daniel', 'Moira'],
  ja: ['Nanami', 'Keita', 'Kyoko', 'Otoya'],
};

function getVoice(lang: string): SpeechSynthesisVoice | null {
  if (voiceCache[lang] !== undefined) return voiceCache[lang];
  if (cachedVoices.length === 0) cachedVoices = speechSynthesis.getVoices();
  const key = lang === 'zh-CN' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en';
  const rankings = RANK[key] || [];
  const prefix = key === 'zh-CN' ? 'zh' : key === 'ja' ? 'ja' : 'en';
  for (const name of rankings) {
    const v = cachedVoices.find(v => v.name.includes(name) && v.lang.startsWith(prefix));
    if (v) { voiceCache[lang] = v; return v; }
  }
  const fb = cachedVoices.find(v => v.lang.startsWith(prefix));
  voiceCache[lang] = fb || null;
  return voiceCache[lang];
}

function fallbackToBrowserTTS(
  text: string,
  lang: string,
  profile: VoiceProfile,
  onEnd?: () => void
): void {
  const voice = getVoice(lang);
  const clean = text.replace(/[*#>`\-_~]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(clean);
  if (voice) utterance.voice = voice;
  if (lang === 'zh-CN') { utterance.rate = profile.rate; utterance.lang = 'zh-CN'; }
  else if (lang === 'ja') { utterance.rate = profile.rate; utterance.lang = 'ja-JP'; }
  else { utterance.rate = profile.rate; utterance.lang = 'en-US'; }
  if (onEnd) utterance.onend = onEnd;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// ---- 语音识别 ----
let recognition: SpeechRecognition | null = null;
export const SPEECH_LANG_MAP: Record<string, string> = { 'zh-CN': 'zh-CN', en: 'en-US', ja: 'ja-JP' };

export function startSpeechRecognition(
  lang: string,
  onResult: (text: string) => void,
  onEnd: () => void,
  onError: (error: string) => void
): boolean {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) { onError('浏览器不支持语音识别'); return false; }
  if (recognition) { recognition.abort(); recognition = null; }
  const rec = new SR();
  recognition = rec;
  rec.lang = SPEECH_LANG_MAP[lang] || 'zh-CN';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.continuous = false;
  rec.onresult = (event: any) => { recognition = null; onResult(event.results[0][0].transcript); };
  rec.onend = () => { recognition = null; onEnd(); };
  rec.onerror = (event: any) => { recognition = null; onError(event.error); };
  rec.start();
  return true;
}

export function stopSpeechRecognition(): void {
  if (recognition) { recognition.abort(); recognition = null; }
}
