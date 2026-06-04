import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, PersonaId } from '../types/ai';

interface AIState {
  messages: ChatMessage[];
  activePersona: PersonaId;
  isTyping: boolean;
  isOpen: boolean;
  setPersona: (persona: PersonaId) => void;
  addMessage: (msg: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  clearMessages: () => void;
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      messages: [],
      activePersona: 'fire',
      isTyping: false,
      isOpen: false,

      setPersona: (persona) => set({ activePersona: persona }),
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      setTyping: (typing) => set({ isTyping: typing }),
      toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'nebula-fit-ai',
      partialize: (state) => ({ activePersona: state.activePersona, messages: state.messages.slice(-50) }),
    }
  )
);
