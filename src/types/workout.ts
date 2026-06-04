export type WorkoutCategory = 'hiit' | 'yoga' | 'strength' | 'cardio' | 'dance' | 'stretch';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutStatus = 'idle' | 'active' | 'rest' | 'completed';

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  nameJa: string;
  duration: number;
  restDuration: number;
  description: string;
  emoji: string;
  sets?: number;
  reps?: number;
}

export interface Workout {
  id: string;
  category: WorkoutCategory;
  title: string;
  titleEn: string;
  titleJa: string;
  description: string;
  descriptionEn: string;
  descriptionJa: string;
  difficulty: Difficulty;
  durationMinutes: number;
  caloriesBurn: number;
  emoji: string;
  imageUrl: string;
  exercises: Exercise[];
  equipment: string[];
  tags: string[];
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: string;
  durationMinutes: number;
  xpEarned: number;
  completed: boolean;
  category: WorkoutCategory;
}
