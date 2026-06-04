import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAIStore } from '../../stores/useAIStore';
import { useUserStore } from '../../stores/useUserStore';
import { useMembershipStore } from '../../stores/useMembershipStore';
import { PERSONAS } from '../../data/personas';
import { sendChatMessage } from '../../services/deepseek';
import { useSpeech } from '../../hooks/useSpeech';
import { ChatMessage, QuickAction } from '../../types/ai';

export default function AICoachPanel() {
  const { t, i18n } = useTranslation('ai');
  const isOpen = useAIStore((s) => s.isOpen);
  const toggleOpen = useAIStore((s) => s.toggleOpen);
  const messages = useAIStore((s) => s.messages);
  const addMessage = useAIStore((s) => s.addMessage);
  const activePersona = useAIStore((s) => s.activePersona);
  const setPersona = useAIStore((s) => s.setPersona);
  const isTyping = useAIStore((s) => s.isTyping);
  const setTyping = useAIStore((s) => s.setTyping);

  const { name, level, streak, totalWorkouts } = useUserStore();
  const { tier, useAiMessage, getRemainingAiMessages, canUseAllPersonas } = useMembershipStore();
  const [input, setInput] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const persona = PERSONAS.find((p) => p.id === activePersona)!;
  const remaining = getRemainingAiMessages();
  const isFree = tier === 'free';
  const isZh = i18n.language === 'zh-CN';

  const {
    isListening,
    isSpeaking,
    voiceEnabled,
    autoSpeak,
    setVoiceEnabled,
    setAutoSpeak,
    speak,
    listen,
    stopListen,
  } = useSpeech();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    // Check membership limit
    if (!useAiMessage()) {
      setLimitReached(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    setInput('');
    setTyping(true);

    const context = { name, level, streak, totalWorkouts, language: i18n.language };
    const reply = await sendChatMessage([...messages, userMsg], persona, context);

    const aiMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: reply,
      timestamp: Date.now(),
      personaId: activePersona,
    };
    addMessage(aiMsg);
    setTyping(false);

    if (autoSpeak && voiceEnabled) {
      speak(reply);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    const actions: Record<QuickAction, string> = {
      motivate: '给我打打气！',
      celebrate: '我刚刚完成训练了！',
      vent: '今天真的不想动...',
      miss: '想你了，来陪我聊聊天~',
      flirt: '说点好听的~',
    };
    sendMessage(actions[action]);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListen();
      return;
    }
    listen((text) => {
      setInput(text);
      // Auto-send after voice input
      sendMessage(text);
    });
  };

  const handleSpeakMessage = (content: string) => {
    speak(content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] max-h-[600px] glass-card flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-[#1a1a3e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl relative"
            style={{ background: `${persona.color}20`, boxShadow: `0 0 15px ${persona.color}30` }}>
            {persona.emoji}
            {isSpeaking && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#00ff88] animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {persona.name}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#6c5ce7]/20 text-[#a855f7] ml-1">AI</span>
              {isSpeaking && <span className="text-[10px] text-[#00ff88] ml-1">🔊 说话中</span>}
            </h3>
            <p className="text-xs text-gray-500">{t('subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Voice output toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              voiceEnabled ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-600 hover:text-gray-400'
            }`}
            title={voiceEnabled ? '语音播报已开启' : '语音播报已关闭'}
          >
            {voiceEnabled ? '🔊' : '🔇'}
          </button>
          {/* Auto-speak toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              autoSpeak ? 'text-[#00f0ff] bg-[#00f0ff]/10' : 'text-gray-600 hover:text-gray-400'
            }`}
            title={autoSpeak ? '自动朗读回复' : '点击消息朗读'}
          >
            📢
          </button>
          <button onClick={toggleOpen} className="text-gray-500 hover:text-white text-lg ml-1">✕</button>
        </div>
      </div>

      {/* Persona Switcher */}
      <div className="flex gap-1 px-4 py-2 border-b border-[#1a1a3e] overflow-x-auto">
        {PERSONAS.map((p) => {
          const isFreePersona = p.id === 'fire' || p.id === 'moon';
          const locked = !canUseAllPersonas() && !isFreePersona;
          return (
            <button
              key={p.id}
              onClick={() => {
                if (locked) return;
                setPersona(p.id);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all relative ${
                locked
                  ? 'text-gray-600 cursor-not-allowed'
                  : activePersona === p.id
                    ? 'text-white font-medium'
                    : 'text-gray-500 hover:text-gray-300'
              }`}
              style={!locked && activePersona === p.id ? { background: `${p.color}20`, border: `1px solid ${p.color}40` } : {}}
            >
              <span>{p.emoji}</span> {p.name}
              {locked && <span className="text-[10px] ml-0.5">🔒</span>}
            </button>
          );
        })}
      </div>

      {/* Free tier: message counter */}
      {isFree && (
        <div className="px-4 py-1.5 bg-[#0a0a1a]/50 border-b border-[#1a1a3e] flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {isZh ? '今日AI消息' : 'AI messages today'}:
            <span className={remaining <= 3 ? 'text-red-400 font-bold' : 'text-[#00f0ff] font-bold'}> {remaining}</span>
            <span className="text-gray-600">/10</span>
          </span>
          <Link to="/pricing" className="text-[#a855f7] hover:text-[#c085ff] font-medium">
            {isZh ? '升级无限 →' : 'Unlimited →'}
          </Link>
        </div>
      )}

      {/* Limit reached banner */}
      {limitReached && (
        <div className="px-4 py-3 bg-gradient-to-r from-[#a855f7]/10 to-[#ff00e5]/10 border-b border-[#a855f7]/20">
          <p className="text-sm font-semibold text-[#a855f7] mb-2">
            {isZh ? '今日AI消息已用完 💬' : 'Daily AI messages used up 💬'}
          </p>
          <p className="text-xs text-gray-400 mb-2">
            {isZh
              ? '升级会员即可无限畅聊，解锁全部5个人格'
              : 'Upgrade to chat unlimitedly and unlock all 5 personas'}
          </p>
          <Link
            to="/pricing"
            className="inline-block text-xs px-4 py-1.5 rounded-lg glow-btn"
            onClick={() => setLimitReached(false)}
          >
            {isZh ? '🚀 立即升级 ¥49/月' : '🚀 Upgrade Now ¥49/mo'}
          </Link>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-3">{persona.emoji}</div>
            <p className="text-sm">{t('welcome')}</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `${persona.color}20` }}>
                {persona.emoji}
              </div>
            )}
            <div className="relative">
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-[#6c5ce7]/20 text-white ml-auto'
                  : 'bg-[#0d0d26] text-gray-200'
              }`}>
                {msg.content}
              </div>
              {/* Play button for AI messages */}
              {msg.role === 'assistant' && voiceEnabled && (
                <button
                  onClick={() => handleSpeakMessage(msg.content)}
                  className={`absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs p-1 rounded ${
                    isSpeaking ? 'text-[#00ff88]' : 'text-gray-500 hover:text-[#00ff88]'
                  }`}
                  title="朗读此消息"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 text-gray-500 text-sm">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-[#1a1a3e]">
        {(['motivate', 'celebrate', 'vent', 'miss', 'flirt'] as QuickAction[]).map((action) => (
          <button
            key={action}
            onClick={() => handleQuickAction(action)}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition-all"
          >
            {t(`quickActions.${action}`)}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 pt-2 flex gap-2 items-center">
        {/* Voice Input Button */}
        <button
          onClick={handleVoiceInput}
          disabled={isTyping}
          className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
            isListening
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
              : 'bg-[#0a0a1a] border border-[#1a1a3e] text-gray-400 hover:text-[#00ff88] hover:border-[#00ff88]/30'
          }`}
          title={isListening ? '正在聆听...点击取消' : '语音输入'}
        >
          {isListening ? '⏹' : '🎤'}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder={isListening ? '正在聆听...' : t('placeholder')}
          disabled={isListening}
          className="flex-1 bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-[#6c5ce7] text-white font-semibold hover:bg-[#7c6cf7] disabled:opacity-40 transition-all flex-shrink-0"
        >
          ➤
        </button>
      </div>
    </motion.div>
  );
}
