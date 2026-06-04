export type PersonaId = 'abyss' | 'fire' | 'moon' | 'storm' | 'sweet';

export interface Persona {
  id: PersonaId;
  name: string;
  emoji: string;
  color: string;
  description: string;
  voiceStyle: string;
  systemPrompt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  personaId?: PersonaId;
}

export type AIMood = 'energetic' | 'neutral' | 'tired' | 'unmotivated';
export type QuickAction = 'motivate' | 'celebrate' | 'vent' | 'miss' | 'flirt';
