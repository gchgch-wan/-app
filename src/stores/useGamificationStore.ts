import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, Challenge, LeaderboardEntry } from '../types/gamification';

interface GamificationState {
  achievements: Achievement[];
  challenges: Challenge[];
  leaderboard: LeaderboardEntry[];
  showLevelUp: boolean;
  levelUpData: { level: number } | null;
  unlockAchievement: (id: string) => void;
  updateChallengeProgress: (id: string, progress: number) => void;
  triggerLevelUp: (level: number) => void;
  dismissLevelUp: () => void;
  setAchievements: (achievements: Achievement[]) => void;
  setChallenges: (challenges: Challenge[]) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      achievements: [],
      challenges: [],
      leaderboard: [],
      showLevelUp: false,
      levelUpData: null,

      unlockAchievement: (id: string) =>
        set((s) => ({
          achievements: s.achievements.map((a) =>
            a.id === id ? { ...a, unlockedAt: new Date().toISOString() } : a
          ),
        })),

      updateChallengeProgress: (id: string, progress: number) =>
        set((s) => ({
          challenges: s.challenges.map((c) =>
            c.id === id ? { ...c, progress, completed: progress >= c.target } : c
          ),
        })),

      triggerLevelUp: (level: number) =>
        set({ showLevelUp: true, levelUpData: { level } }),

      dismissLevelUp: () =>
        set({ showLevelUp: false, levelUpData: null }),

      setAchievements: (achievements) => set({ achievements }),
      setChallenges: (challenges) => set({ challenges }),
      setLeaderboard: (leaderboard) => set({ leaderboard }),
    }),
    { name: 'nebula-fit-gamification' }
  )
);
