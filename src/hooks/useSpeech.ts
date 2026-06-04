import { useState, useCallback, useEffect } from 'react';
import { useAIStore } from '../stores/useAIStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { VOICE_PROFILES, speakText, startSpeechRecognition, stopSpeechRecognition, preloadVoices } from '../services/speech';

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const language = useSettingsStore((s) => s.language);
  const activePersona = useAIStore((s) => s.activePersona);
  const profile = VOICE_PROFILES.find((p) => p.personaId === activePersona)!;

  useEffect(() => { preloadVoices(); }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!voiceEnabled) return;
      setIsSpeaking(true);
      try {
        await speakText(text, language, profile, () => setIsSpeaking(false));
      } catch {
        setIsSpeaking(false);
      }
      // Safety timeout
      setTimeout(() => setIsSpeaking(false), text.length * 100 + 5000);
    },
    [language, profile, voiceEnabled]
  );

  const listen = useCallback(
    (onResult: (text: string) => void) => {
      setIsListening(true);
      startSpeechRecognition(
        language,
        (text) => { setIsListening(false); onResult(text); },
        () => setIsListening(false),
        () => setIsListening(false)
      );
    },
    [language]
  );

  return {
    isListening, isSpeaking, voiceEnabled, autoSpeak,
    setVoiceEnabled, setAutoSpeak, speak, listen,
    stopListen: stopSpeechRecognition,
  };
}
