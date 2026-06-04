import { Difficulty } from '../types/workout';

const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  beginner: 1.0,
  intermediate: 1.5,
  advanced: 2.0,
};

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.5;
  if (streak >= 14) return 2.0;
  if (streak >= 7) return 1.6;
  if (streak >= 3) return 1.3;
  return 1.0;
}

export function calculateXP(
  durationMinutes: number,
  difficulty: Difficulty,
  streak: number
): number {
  const base = durationMinutes * DIFFICULTY_MULTIPLIERS[difficulty];
  const streakMultiplier = getStreakMultiplier(streak);
  return Math.floor(base * streakMultiplier);
}

export function calculateLevel(totalXp: number): number {
  return Math.floor(Math.sqrt(totalXp / 100));
}

export function xpForNextLevel(level: number): number {
  return (level + 1) * (level + 1) * 100;
}

export function xpProgressInLevel(totalXp: number): number {
  const level = calculateLevel(totalXp);
  const currentLevelXp = level * level * 100;
  const nextLevelXp = xpForNextLevel(level);
  return totalXp - currentLevelXp;
}

export function xpProgressPercent(totalXp: number): number {
  const level = calculateLevel(totalXp);
  const currentLevelXp = level * level * 100;
  const nextLevelXp = xpForNextLevel(level);
  return Math.floor(((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);
}
