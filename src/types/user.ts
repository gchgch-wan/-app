export interface UserStats {
  name: string;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  longestStreak: number;
  joinDate: string;
  lastWorkoutDate: string | null;
  totalWorkouts: number;
  totalMinutes: number;
  streakFreezes: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  soundEnabled: boolean;
  particleDensity: 'low' | 'medium' | 'high';
}

export const DEFAULT_USER: UserStats = {
  name: '',
  level: 1,
  xp: 0,
  totalXp: 0,
  streak: 0,
  longestStreak: 0,
  joinDate: new Date().toISOString(),
  lastWorkoutDate: null,
  totalWorkouts: 0,
  totalMinutes: 0,
  streakFreezes: 0,
  preferences: {
    language: 'zh-CN',
    soundEnabled: true,
    particleDensity: 'medium',
  },
};
