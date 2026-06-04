import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout, WorkoutSession, WorkoutStatus } from '../types/workout';

interface WorkoutState {
  favorites: string[];
  history: WorkoutSession[];
  activeWorkout: Workout | null;
  timerState: { currentExercise: number; timeLeft: number; isRest: boolean; status: WorkoutStatus };
  toggleFavorite: (workoutId: string) => void;
  isFavorite: (workoutId: string) => boolean;
  startWorkout: (workout: Workout) => void;
  addSession: (session: WorkoutSession) => void;
  getTodaySessions: () => WorkoutSession[];
  getStreak: () => number;
  resetTimer: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      activeWorkout: null,
      timerState: { currentExercise: 0, timeLeft: 0, isRest: false, status: 'idle' },

      toggleFavorite: (id: string) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),

      isFavorite: (id: string) => get().favorites.includes(id),

      startWorkout: (workout: Workout) =>
        set({
          activeWorkout: workout,
          timerState: {
            currentExercise: 0,
            timeLeft: workout.exercises[0]?.duration || 0,
            isRest: false,
            status: 'active',
          },
        }),

      addSession: (session: WorkoutSession) =>
        set((s) => ({ history: [...s.history, session] })),

      getTodaySessions: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().history.filter((s) => s.date === today);
      },

      getStreak: () => {
        const history = get().history;
        if (history.length === 0) return 0;
        const dates = [...new Set(history.map((s) => s.date))].sort().reverse();
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < dates.length; i++) {
          const expected = new Date(today);
          expected.setDate(expected.getDate() - i);
          if (dates[i] === expected.toISOString().split('T')[0]) streak++;
          else break;
        }
        return streak;
      },

      resetTimer: () =>
        set({ activeWorkout: null, timerState: { currentExercise: 0, timeLeft: 0, isRest: false, status: 'idle' } }),
    }),
    { name: 'nebula-fit-workouts' }
  )
);
