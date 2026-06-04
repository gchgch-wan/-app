import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStats, DEFAULT_USER } from '../types/user';

interface UserStore extends UserStats {
  setName: (name: string) => void;
  addXP: (amount: number) => void;
  completeWorkout: (durationMinutes: number) => void;
  addStreakFreeze: (amount: number) => void;
  useStreakFreeze: () => boolean;
  setLanguage: (language: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_USER,

      setName: (name: string) => set({ name }),

      addXP: (amount: number) => {
        const state = get();
        const newTotalXp = state.totalXp + amount;
        const newLevel = Math.floor(Math.sqrt(newTotalXp / 100));
        const levelXp = newTotalXp - (newLevel * newLevel * 100);
        set({
          xp: levelXp,
          totalXp: newTotalXp,
          level: newLevel,
        });
      },

      completeWorkout: (durationMinutes: number) => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        let newStreak = state.streak;
        if (state.lastWorkoutDate === today) {
          // Already worked out today
        } else if (state.lastWorkoutDate === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }

        set({
          streak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastWorkoutDate: today,
          totalWorkouts: state.totalWorkouts + 1,
          totalMinutes: state.totalMinutes + durationMinutes,
        });
      },

      addStreakFreeze: (amount: number) =>
        set((s) => ({ streakFreezes: s.streakFreezes + amount })),

      useStreakFreeze: () => {
        const state = get();
        if (state.streakFreezes > 0) {
          set({ streakFreezes: state.streakFreezes - 1 });
          return true;
        }
        return false;
      },

      setLanguage: (language: string) =>
        set((s) => ({ preferences: { ...s.preferences, language } })),

      setSoundEnabled: (enabled: boolean) =>
        set((s) => ({ preferences: { ...s.preferences, soundEnabled: enabled } })),

      isLoggedIn: () => get().name.length > 0,
    }),
    { name: 'nebula-fit-user' }
  )
);
