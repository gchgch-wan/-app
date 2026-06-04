import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  language: string;
  soundEnabled: boolean;
  particleDensity: 'low' | 'medium' | 'high';
  setLanguage: (lang: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setParticleDensity: (density: 'low' | 'medium' | 'high') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'zh-CN',
      soundEnabled: true,
      particleDensity: 'medium',
      setLanguage: (language) => set({ language }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setParticleDensity: (particleDensity) => set({ particleDensity }),
    }),
    { name: 'nebula-fit-settings' }
  )
);
