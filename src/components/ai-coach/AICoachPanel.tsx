import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIStore } from '../../stores/useAIStore';
import { useUserStore } from '../../stores/useUserStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { PERSONAS } from '../../data/personas';
import { sendChatMessage } from '../../services/deepseek';
import { ChatMessage, PersonaId, QuickAction } from '../../types/ai';

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
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const persona = PERSONAS.find((p) => p.id === activePersona)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;
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
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: `${persona.color}20`, boxShadow: `0 0 15px ${persona.color}30` }}>
            {persona.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{persona.name} <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#6c5ce7]/20 text-[#a855f7]">AI</span></h3>
            <p className="text-xs text-gray-500">{t('subtitle')}</p>
          </div>
        </div>
        <button onClick={toggleOpen} className="text-gray-500 hover:text-white text-lg">✕</button>
      </div>

      {/* Persona Switcher */}
      <div className="flex gap-1 px-4 py-2 border-b border-[#1a1a3e] overflow-x-auto">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
              activePersona === p.id
                ? 'text-white font-medium'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            style={activePersona === p.id ? { background: `${p.color}20`, border: `1px solid ${p.color}40` } : {}}
          >
            <span>{p.emoji}</span> {p.name}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-3">{persona.emoji}</div>
            <p className="text-sm">{t('welcome')}</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `${persona.color}20` }}>
                {persona.emoji}
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
              msg.role === 'user'
                ? 'bg-[#6c5ce7]/20 text-white ml-auto'
                : 'bg-[#0d0d26] text-gray-200'
            }`}>
              {msg.content}
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

      {/* Input */}
      <div className="p-4 pt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder={t('placeholder')}
          className="flex-1 bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="px-4 py-2 rounded-xl bg-[#6c5ce7] text-white font-semibold hover:bg-[#7c6cf7] disabled:opacity-40 transition-all"
        >
          ➤
        </button>
      </div>
    </motion.div>
  );
}
