import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MembershipTier = 'free' | 'monthly' | 'yearly' | 'lifetime';

interface MembershipState {
  tier: MembershipTier;
  dailyAiMessages: number;
  lastAiResetDate: string;
  // Premium feature flags
  canUseAi: () => boolean;
  canUseAllPersonas: () => boolean;
  canUseCustomWorkouts: () => boolean;
  canBookCoach: () => boolean;
  canUseHdVideos: () => boolean;
  // Actions
  upgradeTo: (tier: MembershipTier) => void;
  useAiMessage: () => boolean;
  resetDailyMessages: () => void;
  getRemainingAiMessages: () => number;
}

const DAILY_FREE_AI_LIMIT = 10;

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set, get) => ({
      tier: 'free',
      dailyAiMessages: 0,
      lastAiResetDate: '',

      canUseAi: () => {
        const { tier, dailyAiMessages, lastAiResetDate } = get();
        const today = new Date().toISOString().split('T')[0];
        if (lastAiResetDate !== today) return true; // not yet checked today
        if (tier !== 'free') return true;
        return dailyAiMessages < DAILY_FREE_AI_LIMIT;
      },

      canUseAllPersonas: () => get().tier !== 'free',
      canUseCustomWorkouts: () => get().tier === 'yearly' || get().tier === 'lifetime',
      canBookCoach: () => get().tier === 'yearly' || get().tier === 'lifetime',
      canUseHdVideos: () => get().tier !== 'free',

      upgradeTo: (tier) => set({ tier }),

      useAiMessage: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];

        // Reset daily counter if it's a new day
        let newCount = state.dailyAiMessages;
        if (state.lastAiResetDate !== today) {
          newCount = 0;
        }

        if (state.tier === 'free' && newCount >= DAILY_FREE_AI_LIMIT) {
          return false; // limit reached
        }

        set({
          dailyAiMessages: newCount + 1,
          lastAiResetDate: today,
        });
        return true;
      },

      resetDailyMessages: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ dailyAiMessages: 0, lastAiResetDate: today });
      },

      getRemainingAiMessages: () => {
        const { tier, dailyAiMessages, lastAiResetDate } = get();
        const today = new Date().toISOString().split('T')[0];
        if (tier !== 'free') return Infinity;
        if (lastAiResetDate !== today) return DAILY_FREE_AI_LIMIT;
        return Math.max(0, DAILY_FREE_AI_LIMIT - dailyAiMessages);
      },
    }),
    { name: 'nebula-fit-membership' }
  )
);
